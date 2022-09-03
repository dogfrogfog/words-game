import { useMutation } from '@tanstack/react-query';
import API from 'API/API';
import { AxiosError } from 'axios';

const useLogin = () =>
  useMutation(API.signIn, {
    onSuccess: ({ token, refreshToken }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    },
    onError: (error: AxiosError<string>) => error,
  });

export default useLogin;
