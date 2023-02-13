import React, { useState } from 'react';
import _ from 'lodash';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { FiCircle } from "react-icons/fi";
import { OXOValuesEnum } from "app/core/enum/feature/OXO";
import { OXOBoard } from './types';

const OXO: React.FC = () => {
  const [board, setBoard] = useState<OXOBoard>({
    round: OXOValuesEnum.O,
    status: ['', '', '', '', '', '', '', '', ''],
    isEnd: false
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

  const handleCheckTargetIsAlreadyExist = (index: number) => {
    return board.status[index] === '' ? false : true;
  }

  /* click the item */
  const handleClickItem = (index: number) => {
    if (!handleCheckTargetIsAlreadyExist(index)) {
      const statusUpdate = _.cloneDeep(board.status)
      statusUpdate[index] = board.round

      switch (board.round) {
        case (OXOValuesEnum.O): {
          setBoard({
            round: OXOValuesEnum.X,
            status: statusUpdate,
            isEnd: board.isEnd
          })
          break;
        }
        case (OXOValuesEnum.X): {
          setBoard({
            round: OXOValuesEnum.O,
            status: statusUpdate,
            isEnd: board.isEnd
          })
          break;
        }
      }
    }
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
          <motion.div key={index} className="oxo-item" variants={item} onClick={() => handleClickItem(index)}>
            {
              oxo === OXOValuesEnum.O && (
                <FiCircle />
              )
            }
            {
              oxo === OXOValuesEnum.X && (
                <IoClose />
              )
            }
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default OXO;
