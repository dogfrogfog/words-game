import { useMutation } from '@tanstack/react-query';
import API from 'API/API';
import { AxiosError } from 'axios';

const useRegistration = () =>
  useMutation(API.registration, {
    onSuccess: ({ refreshToken, token }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    },
    onError: (error: AxiosError<string>) => error,
  });

export default useRegistration;
