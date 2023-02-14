export interface SearchFormValues {
  category: number;
  amount: number;
}

export interface QuizFormValues {
  answers: string[]
}

export interface Questions {
  id: number;
  difficulty: string;
  question: string;
  answer: string;
  options: string[];
}

export interface QuizTimes {
  isValid: boolean;
  seconds: number;
  minutes: number;
}
