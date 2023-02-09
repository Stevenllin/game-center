export interface GetQuizCategoryResp {
  trivia_categories: Categories[]
}

export interface Categories {
  id: number;
  name: string;
}
