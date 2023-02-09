import { Reducer } from 'redux';
import { GlobalState, GlobalActions, GLOBAL__NAVIGATION_STATE } from './types';
import { NavigationStateValuesEnum } from 'app/core/enum/element/navigationStateValuesEnum';

const initialState: GlobalState = {
  navigationState: NavigationStateValuesEnum.Quiz
}

const globalReducer: Reducer<GlobalState, GlobalActions> = (state = initialState, action): GlobalState => {
  switch (action.type) {
    case GLOBAL__NAVIGATION_STATE: {
      return { ...state, navigationState: action.payload.navState }
    }
    default: 
      return state
  }
}

export default globalReducer;
