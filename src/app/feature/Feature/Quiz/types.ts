export interface FormValues {
  category: number;
  amount: number;
}

export interface Questions {
  id: number;
  difficulty: string;
  question: string;
  answer: string;
  options: string[];
}