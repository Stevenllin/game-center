import React, { useEffect } from 'react';
import apiService from 'app/api/service/apiService';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';

const Quiz: React.FC = () => {
  const navigationState = useSelector((state: RootState) => state.global.navigationState);
  /** 加入倒數 */
  useEffect(() => {
    (async () => {
      const response = await apiService.getQuizCategory({});
      console.log('response', response);
      console.log(await apiService.getQuizQuestions({
        params: {
          amount: 10,
          category: 9
        }
      }))
    })();
  }, []);

  return (
    <div>123</div>
  )
}

export default Quiz;
