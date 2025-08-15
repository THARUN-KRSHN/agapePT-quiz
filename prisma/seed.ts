import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = [
    // Parental Perception Questions (10 questions)
    {
      text: 'How familiar are you with the personality development classes that can help your child improve their confidence, communication skills, and overall personality?',
      options: ['Not familiar at all', 'Somewhat familiar', 'Neutral', 'Fairly familiar', 'Very familiar'],
      category: 'parental_perception',
      type: 'familiarity',
    },
    {
      text: 'How often do you come across any information regarding personality development classes?',
      options: ['Never', 'Rarely', 'Occasionally', 'Frequently', 'Almost Always'],
      category: 'parental_perception',
      type: 'exposure',
    },
    {
      text: 'How important do you think personality development classes are for your child\'s overall growth and development?',
      options: ['Not important at all', 'Somewhat important', 'Neutral', 'Fairly important', 'Very important'],
      category: 'parental_perception',
      type: 'importance',
    },
    {
      text: 'Do you believe that personality development classes can play significant role in shaping your child\'s future success?',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'parental_perception',
      type: 'belief',
    },
    {
      text: 'You think that investing in personality development classes for your child is important .',
      options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      category: 'parental_perception',
      type: 'investment_belief',
    },
    {
      text: 'How likely are you to invest in personality development classes for your child?',
      options: ['Not likely at all', 'Somewhat Likely', 'Neutral', 'Fairly likely', 'Very likely'],
      category: 'parental_perception',
      type: 'likelihood_to_invest',
    },
    {
      text: 'You would prioritize spending on personality development classes over other extra curricular activities for your child',
      options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'parental_perception',
      type: 'prioritization',
    },
    {
      text: 'You do believe that the personality development classes can bring out the best in your child.',
      options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'parental_perception',
      type: 'positive_impact_belief',
    },
    {
      text: 'Personality development classes are a necessity in this highly competitive world. It will make your child more confident and self assured.',
      options: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'parental_perception',
      type: 'necessity_belief',
    },
    {
      text: 'What factors would influence your decision to enroll your child in  personality development classes?',
      options: ['Quality of instructors', 'Curriculum content', 'Cost', 'Location/Accessibility', 'Peer recommendations', 'Child\'s interest', 'Other'],
      category: 'parental_perception',
      type: 'influencing_factors',
    },

    // Personality Trait Questions (10 questions)
    {
      text: 'I am outgoing and enjoy being with people.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'extraversion',
    },
    {
      text: 'I have a lot of energy and make things exciting.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'extraversion',
    },
    {
      text: 'I am kind and considerate to almost everyone.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'agreeableness',
    },
    {
      text: 'I like to cooperate and get along with others.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'agreeableness',
    },
    {
      text: 'I do things carefully and completely.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'conscientiousness',
    },
    {
      text: 'I make plans and stick to them.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'conscientiousness',
    },
    {
      text: 'I get nervous easily.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'neuroticism',
    },
    {
      text: 'I worry a lot.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'neuroticism',
    },
    {
      text: 'I am curious about many different things.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'openness',
    },
    {
      text: 'I am creative and like artistic or imaginative experiences.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'personality_trait',
      type: 'openness',
    },

    // Learning Style & Reflection Questions (16 questions)
    {
      text: 'I understand ideas better when I can discuss them with others.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'auditory_active',
    },
    {
      text: 'I prefer to work alone and figure things out by myself before sharing.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'independent_reflective',
    },
    {
      text: 'I learn best when I can see and touch real objects or do practical activities.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'kinesthetic_concrete',
    },
    {
      text: 'I remember things better when I see diagrams, charts, or visual aids.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'visual',
    },
    {
      text: 'I enjoy listening to lectures, podcasts, or explanations more than reading.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'auditory',
    },
    {
      text: 'I like experimenting and trying things out to see what works.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'active_experimentation',
    },
    {
      text: 'I learn best when I can relate the material to real-life situations.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'situated_concrete',
    },
    {
      text: 'I enjoy exploring abstract theories and concepts, even without direct application.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'learning_style',
      type: 'abstract_conceptualization',
    },
    {
      text: 'I like to make step-by-step plans before starting a task.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'thinking_reflection',
      type: 'sequential_thinking',
    },
    {
      text: 'I often think about “the big picture” rather than focusing only on details.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'thinking_reflection',
      type: 'global_thinking',
    },
    {
      text: 'I prefer facts and data over opinions or emotions when learning.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'thinking_reflection',
      type: 'analytical_thinking',
    },
    {
      text: 'I often learn by connecting new ideas to stories or personal experiences.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'thinking_reflection',
      type: 'narrative_learning',
    },
    {
      text: 'I have learned this way since I was young.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'metacognitive_awareness',
      type: 'stability',
    },
    {
      text: 'My teachers or learning environments have shaped how I prefer to learn.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'metacognitive_awareness',
      type: 'environmental_influence',
    },
    {
      text: 'I adjust my learning style depending on the subject or task.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'metacognitive_awareness',
      type: 'flexibility',
    },
    {
      text: 'My personality affects how I approach learning.',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      category: 'metacognitive_awareness',
      type: 'trait_influence',
    },
  ];

  for (const question of questions) {
    await prisma.question.create({
      data: question,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
