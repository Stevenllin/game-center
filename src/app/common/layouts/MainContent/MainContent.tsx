import React from 'react';

const MainContent: React.FC = (props) => {
  return (
    <main className="w-100 main-content">
      {props.children}
    </main>
  )
}

export default MainContent;