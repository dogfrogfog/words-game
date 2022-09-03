import type { IAuth } from 'interfaces/apiData';
import { ActionType } from 'constants/actionType';

export type Action = AuthUser | LogautUser;

type AuthUser = {
  type: ActionType.AUTH;
  payload: IAuth;
};

type LogautUser = {
  type: ActionType.LOGAUT;
  payload: null;
};
export const actions = {
  authUser: (user: IAuth): AuthUser => ({
    type: ActionType.AUTH,
    payload: user,
  }),

  logautUser: (): LogautUser => ({
    type: ActionType.LOGAUT,
    payload: null,
  }),
};
