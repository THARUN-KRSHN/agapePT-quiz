import { Question, QuizResponse, PersonalityResult, PersonalityTrait } from '../types/quiz';
import { personalityTraits } from '../data/questions';

const personalityDevelopmentSuggestions: { [key: string]: string[] } = {
  openness: [
    'Try new activities or hobbies regularly',
    'Read diverse genres of books or articles',
    'Engage in creative activities',
    'Travel to new places when possible',
    'Learn about different cultures and perspectives'
  ],
  conscientiousness: [
    'Develop a daily routine and stick to it',
    'Break large tasks into smaller, manageable steps',
    'Use planning tools and calendars',
    'Set specific, measurable goals',
    'Practice time management techniques'
  ],
  extraversion: [
    'Join social groups or clubs aligned with your interests',
    'Practice initiating conversations',
    'Participate in group activities',
    'Balance social time with alone time',
    'Take small steps to be more outgoing'
  ],
  agreeableness: [
    'Practice active listening skills',
    'Volunteer for community service',
    'Show empathy in daily interactions',
    'Practice conflict resolution skills',
    'Express gratitude regularly'
  ],
  emotional_stability: [
    'Develop stress management techniques',
    'Practice mindfulness or meditation',
    'Maintain a regular exercise routine',
    'Keep a mood journal',
    'Learn relaxation techniques'
  ]
};

export const analyzeQuizResponses = (
  questions: Question[],
  responses: QuizResponse[]
): PersonalityResult => {
  // Initialize trait scores
  const traitScores: { [key: string]: number } = {};
  personalityTraits.forEach(trait => {
    traitScores[trait.id] = 0;
  });

  // Calculate scores for each trait
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (question) {
      const selectedOption = question.traitScores[response.selectedOptionIndex];
      if (selectedOption) {
        Object.entries(selectedOption.scores).forEach(([trait, score]) => {
          traitScores[trait] += score;
        });
      }
    }
  });

  // Normalize scores (0-100 scale)
  Object.keys(traitScores).forEach(trait => {
    const maxPossibleScore = questions.reduce((total, question) => {
      // Sum the maximum possible score for each trait across all questions
      let maxScoreForQuestionTrait = 0;
      question.traitScores.forEach(option => {
        if (option.scores[trait] !== undefined) {
          maxScoreForQuestionTrait = Math.max(maxScoreForQuestionTrait, option.scores[trait]);
        }
      });
      return total + maxScoreForQuestionTrait;
    }, 0);
    
    if (maxPossibleScore > 0) {
      traitScores[trait] = Math.round((traitScores[trait] / maxPossibleScore) * 100);
    }
  });

  // Find dominant trait
  const dominantTrait = Object.entries(traitScores).reduce(
    (max, [trait, score]) => (score > max.score ? { trait, score } : max),
    { trait: '', score: -1 }
  ).trait;

  // Get suggestions for dominant trait
  const suggestions = personalityDevelopmentSuggestions[dominantTrait] || [];

  return {
    traits: traitScores,
    dominantTrait,
    suggestions
  };
};

export const getTraitDescription = (traitId: string): string => {
  const trait = personalityTraits.find(t => t.id === traitId);
  return trait ? trait.description : '';
};

export const getTraitName = (traitId: string): string => {
  const trait = personalityTraits.find(t => t.id === traitId);
  return trait ? trait.name : traitId;
};