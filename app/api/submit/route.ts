import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Maps Likert scale responses to numerical values
const likertScaleMapping: { [key: string]: number } = {
  // Parental Perception & Learning Style Ratings
  'Not familiar at all': 1,
  'Somewhat familiar': 2,
  'Neutral': 3,
  'Fairly familiar': 4,
  'Very familiar': 5,
  'Never': 1,
  'Rarely': 2,
  'Occasionally': 3,
  'Frequently': 4,
  'Almost Always': 5,
  'Not important at all': 1,
  'Somewhat important': 2,
  'Strongly Disagree': 1,
  'Disagree': 2,
  'Agree': 4,
  'Strongly Agree': 5,
  'Not likely at all': 1,
  'Fairly likely': 4,
  'Very likely': 5,
};

async function calculateScores(responses: { questionId: number; response: string }[]) {
  const scores: { [key: string]: number } = {
    // Parental Perception
    familiarity: 0,
    exposure: 0,
    importance: 0,
    belief: 0,
    investment_belief: 0,
    likelihood_to_invest: 0,
    prioritization: 0,
    positive_impact_belief: 0,
    necessity_belief: 0,
    influencing_factors: 0, // This is a count of factors, not a sum of Likert scale

    // Personality Traits (Big Five)
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0,

    // Learning Styles (from Section A)
    social_verbal: 0,
    independent: 0,
    kinesthetic: 0,
    visual: 0,
    auditory: 0,
    active_experimentation: 0,
    situated_learning: 0,
    abstract_conceptualization: 0,

    // Thinking & Reflection Styles (from Section B)
    sequential_thinking: 0,
    global_thinking: 0,
    analytical_thinking: 0,
    narrative_learning: 0,

    // Metacognitive Awareness (from Section C)
    stability: 0,
    environmental_influence: 0,
    flexibility: 0,
    trait_influence: 0,

    // Additional scores to facilitate insight generation (not from direct questions)
    abstract_theoretical: 0,
    concrete_practical: 0,
    reflective: 0,
    active: 0,
  };

  const questions = await prisma.question.findMany();
  const questionMap = new Map(questions.map(q => [q.id, q]));

  responses.forEach((userResponse) => {
    const question = questionMap.get(userResponse.questionId);
    if (question) {
      const scoreValue = likertScaleMapping[userResponse.response] || 0;

      if (question.category === 'parental_perception') {
        if (question.type === 'influencing_factors') {
          if (userResponse.response) {
            scores.influencing_factors += 1; 
          }
        } else {
          scores[question.type] = (scores[question.type] || 0) + scoreValue;
        }
      } else if (question.category === 'personality_trait') {
        scores[question.type] = (scores[question.type] || 0) + scoreValue;
      } else if (question.category === 'learning_style') {
        switch (question.type) {
          case 'auditory_active': scores.social_verbal += scoreValue; scores.auditory += scoreValue; scores.active_experimentation += scoreValue; break;
          case 'independent_reflective': scores.independent += scoreValue; scores.reflective += scoreValue; break;
          case 'kinesthetic_concrete': scores.kinesthetic += scoreValue; scores.concrete_practical += scoreValue; break;
          case 'visual': scores.visual += scoreValue; break;
          case 'auditory': scores.auditory += scoreValue; break;
          case 'active_experimentation': scores.active_experimentation += scoreValue; break;
          case 'situated_concrete': scores.situated_learning += scoreValue; scores.concrete_practical += scoreValue; break;
          case 'abstract_conceptualization': scores.abstract_conceptualization += scoreValue; break;
          default: break;
        }
      } else if (question.category === 'thinking_reflection') {
        switch (question.type) {
          case 'sequential_thinking': scores.sequential_thinking += scoreValue; break;
          case 'global_thinking': scores.global_thinking += scoreValue; break;
          case 'analytical_thinking': scores.analytical_thinking += scoreValue; break;
          case 'narrative_learning': scores.narrative_learning += scoreValue; break;
          default: break;
        }
      } else if (question.category === 'metacognitive_awareness') {
        scores[question.type] = (scores[question.type] || 0) + scoreValue;
      }
    }
  });

  // Additional score aggregation for learning styles based on guide
  // Visual: Q4, Q10
  const q4LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I remember things better when I see diagrams, charts, or visual aids.'));
  if (q4LSResponse) { scores.visual += (likertScaleMapping[q4LSResponse.response] || 0); }

  const q10BResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I often think about “the big picture” rather than focusing only on details.'));
  if (q10BResponse) { scores.visual += (likertScaleMapping[q10BResponse.response] || 0); }

  // Auditory: Q5, Q1
  const q5LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I enjoy listening to lectures, podcasts, or explanations more than reading.'));
  if (q5LSResponse) { scores.auditory += (likertScaleMapping[q5LSResponse.response] || 0); }

  const q1LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I understand ideas better when I can discuss them with others.'));
  if (q1LSResponse) { scores.auditory += (likertScaleMapping[q1LSResponse.response] || 0); scores.active += (likertScaleMapping[q1LSResponse.response] || 0);}

  // Kinesthetic: Q3, Q6, Q7
  const q3LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I learn best when I can see and touch real objects or do practical activities.'));
  if (q3LSResponse) { scores.kinesthetic += (likertScaleMapping[q3LSResponse.response] || 0); scores.concrete_practical += (likertScaleMapping[q3LSResponse.response] || 0);}

  const q6LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I like experimenting and trying things out to see what works.'));
  if (q6LSResponse) { scores.kinesthetic += (likertScaleMapping[q6LSResponse.response] || 0); scores.active += (likertScaleMapping[q6LSResponse.response] || 0); }

  const q7LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I learn best when I can relate the material to real-life situations.'));
  if (q7LSResponse) { scores.kinesthetic += (likertScaleMapping[q7LSResponse.response] || 0); scores.concrete_practical += (likertScaleMapping[q7LSResponse.response] || 0);}

  // Abstract/Theoretical: Q8
  const q8LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I enjoy exploring abstract theories and concepts, even without direct application.'));
  if (q8LSResponse) { scores.abstract_theoretical += (likertScaleMapping[q8LSResponse.response] || 0); }

  // Concrete/Practical: Q3, Q7 already covered above
  // Reflective: Q2, Q12
  const q2LSResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I prefer to work alone and figure things out by myself before sharing.'));
  if (q2LSResponse) { scores.reflective += (likertScaleMapping[q2LSResponse.response] || 0); }

  const q12BResponse = responses.find(r => questionMap.get(r.questionId)?.text.includes('I often learn by connecting new ideas to stories or personal experiences.'));
  if (q12BResponse) { scores.reflective += (likertScaleMapping[q12BResponse.response] || 0); }

  // Active: Q1, Q6 already covered above

  return scores;
}

function generatePersonalityInsight(scores: { [key: string]: number }): string {
  let insight = "";

  // Simplified Parental Perception Insight
  if (scores.familiarity >= 4 && scores.importance >= 4) {
    insight += `Parental Perception: Highly engaged and values personality development for children.`;
  } else if (scores.familiarity >= 2 || scores.importance >= 2) {
    insight += `Parental Perception: Shows some awareness and value for personality development.`;
  } else {
    insight += `Parental Perception: May need more information on personality development programs.`;
  }
  insight += `\n\n`;

  // Personality Traits Summary
  const personalityTraits = {
    extraversion: scores.extraversion,
    agreeableness: scores.agreeableness,
    conscientiousness: scores.conscientiousness,
    neuroticism: scores.neuroticism,
    openness: scores.openness,
  };
  const sortedTraits = Object.entries(personalityTraits).sort(([, a], [, b]) => b - a);
  if (sortedTraits[0][1] > 0) {
    insight += `Child's Personality Tendency: Primarily **${sortedTraits[0][0].replace(/_/g, ' ').toUpperCase()}**. `; // e.g., EXTRAVERSION
  } else {
    insight += `Child's Personality Tendency: A balanced blend of traits.`;
  }
  insight += `\n\n`;

  // Learning Styles Summary
  const learningStyles = {
    visual: scores.visual,
    auditory: scores.auditory,
    kinesthetic: scores.kinesthetic,
    abstract_theoretical: scores.abstract_conceptualization + scores.abstract_theoretical,
    concrete_practical: scores.kinesthetic + scores.situated_learning + scores.concrete_practical,
    reflective: scores.independent + scores.narrative_learning + scores.reflective,
    active: scores.social_verbal + scores.active_experimentation + scores.active,
    analytical: scores.analytical_thinking,
    narrative: scores.narrative_learning,
    sequential: scores.sequential_thinking,
    global: scores.global_thinking,
  };

  const preferredLearningStyles = Object.entries(learningStyles)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a);

  if (preferredLearningStyles.length > 0) {
    insight += `Preferred Learning Style: Strong inclination towards **${preferredLearningStyles[0][0].replace(/_/g, ' ').toUpperCase()}** learning.`;
    if (preferredLearningStyles.length > 1) {
      insight += ` Also shows strengths in **${preferredLearningStyles[1][0].replace(/_/g, ' ').toUpperCase()}** approaches.`;
    }
  } else {
    insight += `Preferred Learning Style: Adaptable and shows no single dominant style.`;
  }
  insight += `\n\n`;

  // Recommended Development Approach
  insight += `Recommended Development Approach: Consider programs that ${generateRecommendation(scores)}.`;

  return insight;
}

function generateRecommendation(scores: { [key: string]: number }): string {
  let recommendation = "";

  // Combine insights from personality and learning styles for a holistic recommendation
  if (scores.extraversion > scores.independent) {
    recommendation += "foster social interaction and collaborative learning";
  } else if (scores.independent > scores.extraversion) {
    recommendation += "support independent exploration and deep reflection";
  }

  if (scores.concrete_practical > scores.abstract_theoretical) {
    recommendation += (recommendation ? " and " : "") + "emphasize hands-on activities and real-life applications";
  } else if (scores.abstract_theoretical > scores.concrete_practical) {
    recommendation += (recommendation ? " and " : "") + "encourage conceptual understanding and theoretical exploration";
  }

  if (scores.visual > 0 || scores.auditory > 0 || scores.kinesthetic > 0) {
    const senses = [];
    if (scores.visual > 0) senses.push("visual aids");
    if (scores.auditory > 0) senses.push("auditory methods");
    if (scores.kinesthetic > 0) senses.push("kinesthetic activities");
    recommendation += (recommendation ? " by utilizing " : "utilizing ") + senses.join(" and ");
  }

  if (!recommendation) {
    recommendation = "offer a balanced and adaptable learning environment";
  }

  return recommendation;
}

export async function POST(request: Request) {
  try {
    const { name, age, responses } = await request.json();

    const scores = await calculateScores(responses);
    const insight = generatePersonalityInsight(scores);
    
    // Simplified calculationSteps for the email/log
    const calculationSteps = `Student Name: ${name}, Age: ${age}. \nResponses: ${JSON.stringify(responses)}, \nScores: ${JSON.stringify(scores)}. \nInsight Summary: ${insight.replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim()}`;

    const newSubmission = await prisma.submission.create({
      data: {
        name,
        age,
        scores: JSON.stringify(scores),
        dominantType: insight, // Store full insight in DB
        calculationLog: calculationSteps, // Store brief log for email
        userResponses: {
          create: responses.map((r: any) => ({
            questionId: r.questionId,
            response: r.response,
          })),
        },
      },
    });

    const allQuestions = await prisma.question.findMany();
    const questionMap = new Map(allQuestions.map(q => [q.id, q.text]));

    const quizResponsesFormatted = responses.map(r => {
      const questionText = questionMap.get(r.questionId) || 'Unknown Question';
      return `Q: ${questionText}\n  A: ${r.response}`;
    }).join('\n');

    const logEntry = `Student Name: ${name}\nAge: ${age}\n\nQuiz Responses:\n` +
                     quizResponsesFormatted + `\n\nScores:\n${JSON.stringify(scores, null, 2)}\n\nSimplified Result Summary:\n${insight.replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim()}\n\nSubmission Date: ${newSubmission.submissionDate.toLocaleString()}\n`;

    const logFilePath = path.join(process.cwd(), 'submissions_log.txt');
    await fs.appendFile(logFilePath, logEntry);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Quiz Submission from ${name}`,
      text: logEntry,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Submission successful', submissionId: newSubmission.id });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}
