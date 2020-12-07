import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as monitorGroupActions from '../actions/monitor-group.action';
import { MonitorGroupModel } from '../domain/monitor-group.model';

export interface State {
  ids: string[];
  entities: {[id: string]: MonitorGroupModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const addMonitorGroups = (state, action) => {
  return {
    ids: [...state.ids],
    entities: {...state.entities},
    selectedId: null
  };
};

const loadMonitorGroups = (state, action) => {
  const projects = action.payload;
  const incomingIds = projects.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(projects).keyBy('id').mapValues(o => o).value();
  // @ts-ignore
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    // @ts-ignore
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

const loadAddMonitorGroups = (state, action) => {
  return {
    ids: [...state.ids],
    entities: {...state.entities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: monitorGroupActions.Actions ): State {
  switch (action.type) {
    case monitorGroupActions.ActionTypes.ADD_SUCCESS: {
      return addMonitorGroups(state, action);
    }
    case monitorGroupActions.ActionTypes.LOAD_SUCCESS: {
      return loadMonitorGroups(state, action);
    }
    case monitorGroupActions.ActionTypes.LOAD_ADD_SUCCESS: {
      return loadAddMonitorGroups(state, action);
    }
    case monitorGroupActions.ActionTypes.SELECT_MONITOR_GROUP: {
      return {...state, selectedId: action.payload + ''};
    }
    case monitorGroupActions.ActionTypes.LOAD_FAIL:
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
