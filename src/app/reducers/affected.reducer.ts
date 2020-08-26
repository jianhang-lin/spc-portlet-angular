import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as affectedActions from '../actions/affected.action';
import { AffectedModel } from '../domain/affected.model';

export interface State {
  ids: string[];
  entities: {[id: string]: AffectedModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadAffectedList = (state, action) => {
  const afftectedList = action.payload;
  const incomingIds = afftectedList.map(p => p.activityId);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(afftectedList).keyBy('activityId').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: affectedActions.Actions ): State {
  switch (action.type) {
    case affectedActions.ActionTypes.LOAD_AFFECTED_LIST_SUCCESS: {
      return loadAffectedList(state, action);
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
