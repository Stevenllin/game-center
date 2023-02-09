import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';

const Quiz: React.FC = () => {
  const navigationState = useSelector((state: RootState) => state.global.navigationState);
  console.log('navigationState', navigationState);
  return (
    <div>123</div>
  )
}

export default Quiz;
