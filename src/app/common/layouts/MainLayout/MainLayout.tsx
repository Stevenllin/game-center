import React from 'react';
import MainContent from '../MainContent';
import Navigation from '../Navigation';

const MainLayout: React.FC = (props) => {

  return (
    <>
      <div className="d-flex main-layout p-5">
        <Navigation />
        <MainContent>
          {props.children}
        </MainContent>
      </div>
    </>
  )
}
export default MainLayout;
