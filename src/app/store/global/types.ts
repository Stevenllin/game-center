import { NavigationStateValuesEnum } from 'app/core/enum/element';
/** Global state */
export interface GlobalState {
  navigationState: NavigationStateValuesEnum | string;
}

/** Actions type constant */
export const GLOBAL__NAVIGATION_STATE = 'GLOBAL__NAVIGATION_STATE';

/** Actions type constant */
export interface SetGlobalNavigationState {
  type: typeof GLOBAL__NAVIGATION_STATE;
  payload: {
    navState: NavigationStateValuesEnum;
  }
}

export type GlobalActions = SetGlobalNavigationState

