export interface PersonalityTrait {
  id: string;
  name: string;
  description: string;
  suggestions: string[];
}

export interface Question {
  id: number;
  text: string;
  traitScores: {
    text: string;
    scores: {
      [key: string]: number;
    };
  }[];
}

export interface QuizResponse {
  questionId: number;
  selectedOptionIndex: number;
}

export interface PersonalityResult {
  dominantTrait: string;
  traits: {
    [key: string]: number;
  };
  suggestions: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  responses: QuizResponse[];
  result: PersonalityResult | null;
}