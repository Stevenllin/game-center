import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OXOBoard } from './types';

const OXO: React.FC = () => {
  const [board, setBoard] = useState<OXOBoard>({
    status: ['', '', '', '', '', '', '', '', '']
  });
  console.log('board', board);
  /* oxo-background animation */
  const background = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  /* oxo-item animation */
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  /* click the item */
  const handleClickItem = (index: number) => {
    console.log('index', index);
  }

  return (
    <div id="oxo" className="oxo-container">
      <motion.div
        className="oxo-background"
        variants={background}
        initial="hidden"
        animate="visible"
      >
        {board.status.map((oxo, index) => (
          <motion.div key={index} className="oxo-item" variants={item} onClick={() => handleClickItem(index)} />
        ))}
      </motion.div>
      <div className="oxo-label">
        1
      </div>
    </div>
  )
}

export default OXO;
