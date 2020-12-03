import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as timeZoneInfoActions from '../actions/time-zone-info.action';
import {TimeZoneInfoModel} from '../domain/time-zone-info.model';

export interface State {
  ids: string[];
  entities: {[id: string]: TimeZoneInfoModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadTimeZoneInfoList = (state, action) => {
  const timeZoneInfoList = action.payload;
  const incomingIds = timeZoneInfoList.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(timeZoneInfoList).keyBy('id').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: timeZoneInfoActions.Actions ): State {
  switch (action.type) {
    case timeZoneInfoActions.ActionTypes.LOAD_TIME_ZONE_INFO_SUCCESS: {
      return loadTimeZoneInfoList(state, action);
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
