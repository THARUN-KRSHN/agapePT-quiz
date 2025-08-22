import { Question, PersonalityTrait } from '../types/quiz';

export const personalityTraits: PersonalityTrait[] = [
  {
    id: 'openness',
    name: 'Openness to Experience',
    description: 'Reflects curiosity, creativity, and preference for variety and novelty.',
    suggestions: [
      'Try new activities or hobbies regularly',
      'Read diverse genres of books or articles',
      'Engage in creative activities',
      'Travel to new places when possible',
      'Learn about different cultures and perspectives'
    ]
  },
  {
    id: 'conscientiousness',
    name: 'Conscientiousness',
    description: 'Indicates organization, responsibility, and goal-oriented behavior.',
    suggestions: [
      'Develop a daily routine and stick to it',
      'Break large tasks into smaller, manageable steps',
      'Use planning tools and calendars',
      'Set specific, measurable goals',
      'Practice time management techniques'
    ]
  },
  {
    id: 'extraversion',
    name: 'Extraversion',
    description: 'Represents sociability, energy, and tendency to seek stimulation in others\'s company.',
    suggestions: [
      'Join social groups or clubs aligned with your interests',
      'Practice initiating conversations',
      'Participate in group activities',
      'Balance social time with alone time',
      'Take small steps to be more outgoing'
    ]
  },
  {
    id: 'agreeableness',
    name: 'Agreeableness',
    description: 'Shows compassion, cooperation, and consideration for others.',
    suggestions: [
      'Practice active listening skills',
      'Volunteer for community service',
      'Show empathy in daily interactions',
      'Practice conflict resolution skills',
      'Express gratitude regularly'
    ]
  },
  {
    id: 'emotional_stability',
    name: 'Emotional Stability',
    description: 'Reflects emotional regulation, resilience, and stress management.',
    suggestions: [
      'Develop stress management techniques',
      'Practice mindfulness or meditation',
      'Maintain a regular exercise routine',
      'Keep a mood journal',
      'Learn relaxation techniques'
    ]
  }
];

export const questions: Question[] = [
  {
    id: 1,
    text: 'How do you typically react to new situations or environments?',
    traitScores: [
      { text: 'Embrace them with enthusiasm', scores: { openness: 3, emotional_stability: 3 } },
      { text: 'Approach cautiously but openly', scores: { openness: 2, emotional_stability: 2 } },
      { text: 'Prefer familiar situations', scores: { openness: 1, emotional_stability: 1 } },
      { text: 'Feel anxious about changes', scores: { openness: 0, emotional_stability: 0 } }
    ]
  },
  {
    id: 2,
    text: 'When working on tasks, how do you prefer to organize your approach?',
    traitScores: [
      { text: 'Detailed planning and schedules', scores: { conscientiousness: 3 } },
      { text: 'Flexible but structured approach', scores: { conscientiousness: 2 } },
      { text: 'Go with the flow', scores: { conscientiousness: 1 } },
      { text: 'Minimal planning', scores: { conscientiousness: 0 } }
    ]
  },
  {
    id: 3,
    text: 'How do you usually spend your free time?',
    traitScores: [
      { text: 'Socializing with many people', scores: { extraversion: 3 } },
      { text: 'Small group activities', scores: { extraversion: 2 } },
      { text: 'Mix of social and alone time', scores: { extraversion: 1 } },
      { text: 'Mostly solitary activities', scores: { extraversion: 0 } }
    ]
  },
  {
    id: 4,
    text: 'When someone disagrees with you, how do you typically respond?',
    traitScores: [
      { text: 'Try to understand their perspective', scores: { agreeableness: 3, emotional_stability: 2 } },
      { text: 'Defend your position calmly', scores: { agreeableness: 2, emotional_stability: 3 } },
      { text: 'Become frustrated but listen', scores: { agreeableness: 1, emotional_stability: 1 } },
      { text: 'Strongly defend your view', scores: { agreeableness: 0, emotional_stability: 0 } }
    ]
  },
  {
    id: 5,
    text: 'How do you handle unexpected challenges?',
    traitScores: [
      { text: 'See them as opportunities', scores: { emotional_stability: 3, openness: 2 } },
      { text: 'Stay calm and analyze', scores: { emotional_stability: 2, openness: 2 } },
      { text: 'Feel stressed but cope', scores: { emotional_stability: 1, openness: 1 } },
      { text: 'Become overwhelmed', scores: { emotional_stability: 0, openness: 0 } }
    ]
  },
  {
    id: 6,
    text: 'When working on a project, what matters most to you?',
    traitScores: [
      { text: 'Following the plan exactly', scores: { conscientiousness: 3 } },
      { text: 'Meeting goals while being flexible', scores: { conscientiousness: 2 } },
      { text: 'Enjoying the process', scores: { conscientiousness: 1 } },
      { text: 'Getting it done quickly', scores: { conscientiousness: 0 } }
    ]
  },
  {
    id: 7,
    text: 'How do you prefer to make decisions?',
    traitScores: [
      { text: 'Consider everyone\'s feelings', scores: { agreeableness: 3 } },
      { text: 'Balance logic and emotions', scores: { agreeableness: 2 } },
      { text: 'Focus on facts only', scores: { agreeableness: 1 } },
      { text: 'Trust your instincts', scores: { agreeableness: 0 } }
    ]
  },
  {
    id: 8,
    text: 'What\'s your approach to trying new things?',
    traitScores: [
      { text: 'Actively seek new experiences', scores: { openness: 3 } },
      { text: 'Open to suggestions', scores: { openness: 2 } },
      { text: 'Need convincing', scores: { openness: 1 } },
      { text: 'Prefer familiar routines', scores: { openness: 0 } }
    ]
  },
  {
    id: 9,
    text: 'In group settings, how do you typically behave?',
    traitScores: [
      { text: 'Take the lead naturally', scores: { extraversion: 3 } },
      { text: 'Contribute actively', scores: { extraversion: 2 } },
      { text: 'Participate when asked', scores: { extraversion: 1 } },
      { text: 'Observe quietly', scores: { extraversion: 0 } }
    ]
  },
  {
    id: 10,
    text: 'How do you handle conflicts?',
    traitScores: [
      { text: 'Seek compromise actively', scores: { agreeableness: 3, emotional_stability: 2 } },
      { text: 'Listen and discuss calmly', scores: { agreeableness: 2, emotional_stability: 3 } },
      { text: 'Try to avoid them', scores: { agreeableness: 1, emotional_stability: 1 } },
      { text: 'Stand your ground firmly', scores: { agreeableness: 0, emotional_stability: 0 } }
    ]
  },
  {
    id: 11,
    text: 'How do you approach deadlines and commitments?',
    traitScores: [
      { text: 'Always ahead of schedule', scores: { conscientiousness: 3 } },
      { text: 'Usually on time', scores: { conscientiousness: 2 } },
      { text: 'Sometimes cut it close', scores: { conscientiousness: 1 } },
      { text: 'Often need extensions', scores: { conscientiousness: 0 } }
    ]
  },
  {
    id: 12,
    text: 'How do you handle stress?',
    traitScores: [
      { text: 'Stay calm and focused', scores: { emotional_stability: 3 } },
      { text: 'Feel pressure but manage', scores: { emotional_stability: 2 } },
      { text: 'Become anxious but cope', scores: { emotional_stability: 1 } },
      { text: 'Get overwhelmed easily', scores: { emotional_stability: 0 } }
    ]
  },
  {
    id: 13,
    text: 'What\'s your preferred learning style?',
    traitScores: [
      { text: 'Explore multiple approaches', scores: { openness: 3 } },
      { text: 'Follow structured methods', scores: { openness: 2 } },
      { text: 'Learn through practice', scores: { openness: 1 } },
      { text: 'Stick to basics', scores: { openness: 0 } }
    ],
  },
  {
    id: 14,
    text: 'How do you prefer to spend weekends?',
    traitScores: [
      { text: 'Large social gatherings', scores: { extraversion: 3 } },
      { text: 'Small group activities', scores: { extraversion: 2 } },
      { text: 'Mix of social and alone time', scores: { extraversion: 1 } },
      { text: 'Quiet time alone', scores: { extraversion: 0 } }
    ]
  },
  {
    id: 15,
    text: 'When someone needs help, how do you respond?',
    traitScores: [
      { text: 'Drop everything to help', scores: { agreeableness: 3 } },
      { text: 'Help if you can', scores: { agreeableness: 2 } },
      { text: 'Help if asked directly', scores: { agreeableness: 1 } },
      { text: 'Suggest other resources', scores: { agreeableness: 0 } }
    ]
  },
  {
    id: 16,
    text: 'How do you keep your personal space?',
    traitScores: [
      { text: 'Extremely organized', scores: { conscientiousness: 3 } },
      { text: 'Generally tidy', scores: { conscientiousness: 2 } },
      { text: 'Somewhat cluttered', scores: { conscientiousness: 1 } },
      { text: 'Very disorganized', scores: { conscientiousness: 0 } }
    ]
  }
];