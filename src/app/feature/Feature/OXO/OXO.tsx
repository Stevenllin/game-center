import React, { useState, useEffect } from 'react';
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
    isEnd: false,
    winner: ''
  });

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
  console.log('board', board);
  const handleCheckTargetIsAlreadyExist = (index: number) => {
    return board.status[index] === '' ? false : true;
  }

  useEffect(() => {
    let isWin = false;
    const currentStatus = _.cloneDeep(board.status);
    const currentStatus2D = [currentStatus.splice(0, 3), currentStatus.splice(0, 3), currentStatus.splice(0, 3)];
    /** check the row */
    for (let i = 0; i < currentStatus2D.length; i++) {
      if (handleCheckTarget(currentStatus2D[i])) {
        isWin = true;
      }
    }
    /** check the column */
    for (let i = 0; i < 3; i++) {
      const target = [currentStatus2D[0][i], currentStatus2D[1][i], currentStatus2D[2][i]]
      if (handleCheckTarget(target)) {
        isWin = true
      }
    }
    /** check the diagonal */
    if (handleCheckTarget([currentStatus2D[0][0], currentStatus2D[1][1], currentStatus2D[2][2]])) {
      isWin = true
    }
    if (handleCheckTarget([currentStatus2D[0][2], currentStatus2D[1][1], currentStatus2D[2][0]])) {
      isWin = true
    }
    /** set the board state */
    if (isWin) {
      setBoard({
        round: board.round,
        status: board.status,
        isEnd: isWin,
        winner: board.round === OXOValuesEnum.O ? OXOValuesEnum.X : OXOValuesEnum.O
      })
    }
    console.log('isWin', isWin);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, board.status)

  const handleCheckTarget = (array: string[]) => {
    const target = board.round === OXOValuesEnum.O ? OXOValuesEnum.X : OXOValuesEnum.O;
    const result = array.filter(item => item === target).length === 3 ? true : false;
    return result
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
            isEnd: board.isEnd,
            winner: board.winner
          })
          break;
        }
        case (OXOValuesEnum.X): {
          setBoard({
            round: OXOValuesEnum.O,
            status: statusUpdate,
            isEnd: board.isEnd,
            winner: board.winner
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
