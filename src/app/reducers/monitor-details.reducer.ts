import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as monitorActions from '../actions/monitor-details.action';
import { MonitorDetailsModel } from '../domain/monitor-details.model';

export interface State {
  ids: string[];
  entities: {[id: string]: MonitorDetailsModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};


const loadMonitorDetails = (state, action) => {
  return {
    ids: [...state.ids],
    entities: {...state.entities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: monitorActions.Actions ): State {
  switch (action.type) {
    case monitorActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return loadMonitorDetails(state, action);
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});

export const getMonitorDetails = (state: State) => state.entities.id;
