import * as _ from 'lodash';
import * as pingActions from '../actions/ping.action';
import { PingModel } from '../domain/ping.model';

export interface State {
  pingFlag: PingModel;
}

export const initialState: State = {
  pingFlag: {
    flag: undefined
  },
};

export function reducer(state = initialState, action: pingActions.Actions ): State {
  switch (action.type) {
    case pingActions.ActionTypes.PING_MDS_SUCCESS: {
      return {...state, pingFlag: action.payload as PingModel};
    }
    default: {
      return state;
    }
  }
}

export const getPingFlag = (state: State) => state.pingFlag;
