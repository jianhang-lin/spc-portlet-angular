import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as functionStepGridActions from '../actions/function-step-grid.action';
import { FunctionStepGridModel } from '../domain/function-step-grid.model';

export interface State {
  ids: string[];
  entities: {[id: string]: FunctionStepGridModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};


const loadFunctionStepGrids = (state, action) => {
  const functionStepGrids = action.payload;
  const incomingIds = functionStepGrids.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(functionStepGrids).keyBy('id').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

const loadFunction = (state, action) => {
  // const stepGrids = action.payload;
  // const incomingIds = stepGrids.map(p => p.id);
  // const newIds = _.difference(incomingIds, state.ids);
  // const incomingEntities = _.chain(stepGrids).keyBy('id').mapValues(o => o).value();
  // const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  const selectedNum = action.payload as number;
  const selectedId = state.ids.filter(id => state.entities[id].id === selectedNum);
  return {
    ids: [...state.ids],
    entities: {...state.entities},
    selectedId
  };
};

export function reducer(state = initialState, action: functionStepGridActions.Actions): State {
  switch (action.type) {
    case functionStepGridActions.ActionTypes.LOAD_FUNCTION_STEP_GRIDS_SUCCESS: {
      return loadFunctionStepGrids(state, action);
    }
    case functionStepGridActions.ActionTypes.SELECT_FUNCTION_SUCCESS: {
      return loadFunction(state, action);
    }
    case functionStepGridActions.ActionTypes.SELECT_FUNCTION_FAIL: {
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

export const getFunctionStepGrids = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});

