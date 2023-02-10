import React from 'react';
import { ROUTES } from 'app/core/router/routerPath';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { HiCreditCard } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { IoMan } from "react-icons/io5";
import { motion } from "framer-motion";
import { NavigationStateValuesEnum } from 'app/core/enum/element/navigationStateValuesEnum';
import { setGlobalNavigationState } from 'app/store/global/action';

const Navigation: React.FC = () => {
  const routerHistory = useHistory();
  const navigationState = useSelector((state: RootState) => state.global.navigationState);
  const reduxDispatch = useDispatch();
  /**
   * @description 
  */
   const handleSetNavigationState = (value: NavigationStateValuesEnum) => {
    switch (value) {
      case (NavigationStateValuesEnum.Quiz): {
        routerHistory.push(ROUTES.FEATURES__QUIZ);
        break;
      }
      case (NavigationStateValuesEnum.OXO): {
        routerHistory.push(ROUTES.FEATURES__OXO);
        break;
      }
      case (NavigationStateValuesEnum.TWO): {
        routerHistory.push(ROUTES.FEATURES__2048);
        break;
      }
      case (NavigationStateValuesEnum.Hang): {
        routerHistory.push(ROUTES.FEATURES__HANG);
        break;
      }
    }
    reduxDispatch(setGlobalNavigationState(value));
  }
  return (
    <nav>
      <div className="h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="my-4">
          <motion.button
            type="button"
            className={navigationState === NavigationStateValuesEnum.Quiz ? 'nav-active' : ''}
            onClick={() => handleSetNavigationState(NavigationStateValuesEnum.Quiz)}
            whileHover={{ scale: 1.4, rotate: 360 }}
          >
            <HiCreditCard />
          </motion.button>
        </div>
        <div className="my-4">
          <motion.button
            type="button"
            className={navigationState === NavigationStateValuesEnum.OXO ? 'nav-active' : ''}
            onClick={() => handleSetNavigationState(NavigationStateValuesEnum.OXO)}
            whileHover={{ scale: 1.4, rotate: 360 }}
          >
            <FaRegCircle />
          </motion.button>
        </div>
        <div className="my-4">
          <motion.button
            type="button"
            className={navigationState === NavigationStateValuesEnum.TWO ? 'nav-active' : ''}
            onClick={() => handleSetNavigationState(NavigationStateValuesEnum.TWO)}
            whileHover={{ scale: 1.4, rotate: 360 }}
          >
            <BsGridFill />
          </motion.button>
        </div>
        <div className="my-4">
          <motion.button
            type="button"
            className={navigationState === NavigationStateValuesEnum.Hang ? 'nav-active' : ''}
            onClick={() => handleSetNavigationState(NavigationStateValuesEnum.Hang)}
            whileHover={{ scale: 1.4, rotate: 360 }}
          >
            <IoMan />
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
