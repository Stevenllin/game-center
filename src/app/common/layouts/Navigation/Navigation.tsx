import React from 'react';
import storageService from 'app/core/service/storageService';
import { StorageKeysEnum } from 'app/core/enum/storage';
import { ROUTES } from 'app/core/router/routerPath';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { BiTired } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { NavigationStateValuesEnum } from 'app/core/enum/element/navigation';
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
        routerHistory.push(ROUTES.FEATURES__TZFE);
        break;
      }
      case (NavigationStateValuesEnum.Hang): {
        routerHistory.push(ROUTES.FEATURES__HANG);
        break;
      }
    }
    storageService.setItem(StorageKeysEnum.Navigation, value);
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
            <RxQuestionMarkCircled />
          </motion.button>
        </div>
        <div className="my-4">
          <motion.button
            type="button"
            className={navigationState === NavigationStateValuesEnum.OXO ? 'nav-active' : ''}
            onClick={() => handleSetNavigationState(NavigationStateValuesEnum.OXO)}
            whileHover={{ scale: 1.4, rotate: 360 }}
          >
            <BiX />
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
            <BiTired />
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
