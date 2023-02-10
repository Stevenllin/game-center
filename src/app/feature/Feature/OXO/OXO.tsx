import React from 'react';
import { motion } from 'framer-motion';

const OXO: React.FC = () => {
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
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div id="oxo" className="oxo-container">
      <motion.div
        className="oxo-background"
        variants={background}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <motion.div key={index} className="oxo-item" variants={item} />
        ))}
      </motion.div>
    </div>
  )
}

export default OXO;
