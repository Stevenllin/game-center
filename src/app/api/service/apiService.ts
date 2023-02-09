import axios from 'axios';
import { GetQuizCategoryReq, GetQuizCategoryResp } from 'app/api/model/get/getQuizCategory';
import { GetQuizQuestionsReq, GetQuizQuestionsResp } from 'app/api/model/get/getQuizQuestions';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getQuizCategory: async (args: GetQuizCategoryReq) => {
    const argsModel = args;
    return axios.get<GetQuizCategoryResp>('https://opentdb.com/api_category.php', argsModel)
      .then(response => response.data.trivia_categories);
  },
  getQuizQuestions: async (args: GetQuizQuestionsReq) => {
    const argsModel = args;
    return axios.get<GetQuizQuestionsResp>('https://opentdb.com/api.php', argsModel)
      .then(response => response.data.results);
  }
}
