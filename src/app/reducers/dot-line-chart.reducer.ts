import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as chartActions from '../actions/dot-line-chart.action';
import { DotLineDataModel } from '../domain/dot-line-data.model';

export interface State {
  ids: string[];
  entities: {[id: string]: DotLineDataModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadDotLineDataList = (state, action) => {
  const monitors = action.payload;
  const incomingIds = monitors.map(p => p.monitorId);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(monitors).keyBy('monitorId').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: chartActions.Actions ): State {
  switch (action.type) {
    case chartActions.ActionTypes.LOAD_DOT_LINE_DATA_SUCCESS: {
      return loadDotLineDataList(state, action);
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
