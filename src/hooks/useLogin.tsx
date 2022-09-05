import type { Action } from 'actions/actions';
import type { Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import API from 'API/API';
import { actions } from 'actions/actions';

const useLogin = (dispatch: Dispatch<Action>) =>
  useMutation(API.logIn, {
    onSuccess: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(actions.authUser(user));
    },
    onError: (error: AxiosError<string>) => error,
  });

export default useLogin;
