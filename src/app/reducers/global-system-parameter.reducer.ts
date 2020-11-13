import * as globalSystemParameterActions from '../actions/global-system-parameter.action';
import { GlobalSystemParameterModel } from '../domain/global-system-parameter.model';


export interface State {
  globalSystemParameter: GlobalSystemParameterModel;
}

export const initialState: State = {
  globalSystemParameter: {
    numberOfActiveThread: 0,
    intervalOfCollectingData: 0,
    emailOpenUrlTemplateData: '',
    emailTitleData: '',
    mesrUrlTemplateData: '',
    intervalOfDeletingLog: 0,
    timgOfLogBeingSaved: 0,
    intervalBetweenLockReviews: 0,
    displayPartFamily: false,
    startTiemOfDataCollection: 0,
    timeOfActiveMonitor: 0,
    timeOfActiveTvMonitor: 0,
    disablePreviousHold: false,
  }
};

export function reducer(state = initialState, action: globalSystemParameterActions.Actions ): State {
  switch (action.type) {
    case globalSystemParameterActions.ActionTypes.LOAD_GLOBAL_SYSTEM_PARAMETER_SUCCESS: {
      return {...state, globalSystemParameter: action.payload as GlobalSystemParameterModel};
    }
    default: {
      return state;
    }
  }
}

export const getGlobalSystemParameter = (state: State) => state.globalSystemParameter;
