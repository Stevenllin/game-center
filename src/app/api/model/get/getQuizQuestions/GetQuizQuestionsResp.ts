export interface GetQuizQuestionsResp {
  results: Results[];
}

export interface Results {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
