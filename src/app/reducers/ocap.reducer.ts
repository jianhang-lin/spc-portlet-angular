import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as ocapActions from '../actions/ocap.action';
import { OcapHistoryModel } from '../domain/ocap-history.model';

export interface State {
  ids: string[];
  entities: {[id: string]: OcapHistoryModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadOcapHistoryList = (state, action) => {
  const ocapHistoryList = action.payload;
  const incomingIds = ocapHistoryList.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(ocapHistoryList).keyBy('id').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: ocapActions.Actions ): State {
  switch (action.type) {
    case ocapActions.ActionTypes.LOAD_OCAP_HISTORY_LIST_SUCCESS: {
      return loadOcapHistoryList(state, action);
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
