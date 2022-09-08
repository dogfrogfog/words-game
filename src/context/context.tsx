import type { IAuth } from 'interfaces/apiData';
import type { Action } from 'actions/actions';
import type { Dispatch, ReactNode } from 'react';
import { ActionType } from 'constants/actionType';
import { createContext, useMemo, useReducer } from 'react';

export function isAuthType(user: unknown): user is IAuth {
  if ((user as IAuth).token) return true;
  return false;
}

export function isAuth(user: string | null) {
  if (user) {
    const parsedUser: unknown = JSON.parse(user);
    if (isAuthType(parsedUser)) return parsedUser;
  }
  return null;
}

type State = {
  user: IAuth | null;
  menu: boolean;
};

type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const initialState: State = {
  user: isAuth(localStorage.getItem('user')),
  menu: false,
};

export const Context = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const contextReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.AUTH:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  const memoizedState = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <Context.Provider value={memoizedState}>{children}</Context.Provider>;
};
