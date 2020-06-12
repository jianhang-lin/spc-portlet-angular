import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as stepGridActions from '../actions/step-grid.action';
import { StepGridModel } from '../domain/step-grid.model';

export interface State {
  ids: string[];
  entities: {[id: string]: StepGridModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};


const loadStepGrids = (state, action) => {
  const stepGrids = action.payload;
  const incomingIds = stepGrids.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(stepGrids).keyBy('id').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

const loadEnter = (state, action) => {
  // const stepGrids = action.payload;
  // const incomingIds = stepGrids.map(p => p.id);
  // const newIds = _.difference(incomingIds, state.ids);
  // const incomingEntities = _.chain(stepGrids).keyBy('id').mapValues(o => o).value();
  // const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids],
    entities: {...state.entities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: stepGridActions.Actions): State {
  switch (action.type) {
    case stepGridActions.ActionTypes.LOAD_STEP_GRIDS_SUCCESS: {
      return loadStepGrids(state, action);
    }
    case stepGridActions.ActionTypes.SELECT_ENTER: {
      return loadEnter(state, action);
    }
    case stepGridActions.ActionTypes.SELECT_ENTER_FAIL: {
      return null;
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getStepGrids = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});

