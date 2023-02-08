import React from 'react';
import MainContent from '../MainContent';

const MainLayout: React.FC = (props) => {

  return (
    <>
      <div className="d-flex h-100">
        <MainContent>
          {props.children}
        </MainContent>
      </div>
    </>
  )
}
export default MainLayout;
