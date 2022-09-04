import type { IAuth } from 'interfaces/apiData';
import { ActionType } from 'constants/actionType';

export type Action = AuthUser | LogoutUser;

type AuthUser = {
  type: ActionType.AUTH;
  payload: IAuth;
};

type LogoutUser = {
  type: ActionType.LOGOUT;
  payload: null;
};
export const actions = {
  authUser: (user: IAuth): AuthUser => ({
    type: ActionType.AUTH,
    payload: user,
  }),

  logoutUser: (): LogoutUser => ({
    type: ActionType.LOGOUT,
    payload: null,
  }),
};
