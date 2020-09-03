import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as paretoChartActions from '../actions/pareto-chart.action';
import { ParetoChartDataModel } from '../domain/pareto-chart-data.model';

export interface State {
  ids: string[];
  entities: {[id: string]: ParetoChartDataModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadParetoChartDataList = (state, action) => {
  const paretoChartDataList = action.payload;
  const incomingIds = paretoChartDataList.map(p => p.position);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(paretoChartDataList).keyBy('position').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: paretoChartActions.Actions ): State {
  switch (action.type) {
    case paretoChartActions.ActionTypes.LOAD_PARETO_CHART_DATA_LIST_SUCCESS: {
      return loadParetoChartDataList(state, action);
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
