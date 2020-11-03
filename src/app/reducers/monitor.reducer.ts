import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as monitorActions from '../actions/monitor.action';
import { MonitorModel } from '../domain/monitor.model';

export interface State {
  ids: string[];
  entities: {[id: string]: MonitorModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadMonitors = (state, action) => {
  const monitors = action.payload;
  const incomingIds = monitors.map(p => p.monitorKey);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(monitors).keyBy('monitorKey').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: monitorActions.Actions ): State {
  switch (action.type) {
    case monitorActions.ActionTypes.LOAD_SUCCESS: {
      return loadMonitors(state, action);
    }
    case monitorActions.ActionTypes.SELECT_MONITOR: {
      return {...state, selectedId: action.payload.monitorId + ''};
    }
    case monitorActions.ActionTypes.LOAD_FAIL:
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
