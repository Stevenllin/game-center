import { GLOBAL__NAVIGATION_STATE } from './types';
import { NavigationStateValuesEnum } from 'app/core/enum/element/navigation/navigationStateValuesEnum';

/**
 * @description set the Navigation State
 * @param response Response
*/
export const setGlobalNavigationState = (navState: NavigationStateValuesEnum) => ({
  type: GLOBAL__NAVIGATION_STATE,
  payload: { navState }
});