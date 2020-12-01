import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as netUserActions from '../actions/net-user.action';
import { NetUserModel } from '../domain/net-user.model';

export interface State {
  ids: string[];
  entities: {[id: string]: NetUserModel};
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const loadNetUserList = (state, action) => {
  const netUserList = action.payload;
  const incomingIds = netUserList.map(p => p.netUserId);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(netUserList).keyBy('netUserId').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer(state = initialState, action: netUserActions.Actions ): State {
  switch (action.type) {
    case netUserActions.ActionTypes.LOAD_NET_USER_SUCCESS: {
      return loadNetUserList(state, action);
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
