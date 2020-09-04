import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as paretoBeanActions from '../actions/pareto-bean.action';
import { ParetoBeanModel } from '../domain/pareto-bean.model';

export interface State {
  ids: string[];
  entities: {[id: string]: ParetoBeanModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadParetoBeanDataList = (state, action) => {
  const paretoBeanDataList = action.payload;
  const incomingIds = paretoBeanDataList.map(p => p.position);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(paretoBeanDataList).keyBy('position').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: paretoBeanActions.Actions ): State {
  switch (action.type) {
    case paretoBeanActions.ActionTypes.LOAD_PARETO_BEAN_DATA_LIST_SUCCESS: {
      return loadParetoBeanDataList(state, action);
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
