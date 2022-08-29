import { useMutation, useQuery } from '@tanstack/react-query';
import API from 'API/API';

export const useLogin = () =>
  useMutation(API.signIn, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });

export const useRegistration = () => useMutation(API.createUser);

export const useLogaut = () => useMutation(API.deleteUser);

export const useUpdateUser = () => useMutation(API.updateUser);

export const useToken = (userId: string) =>
  useQuery(['token'], () => API.getNewToken(userId), {
    onSuccess: (data) => {
      localStorage.setItem('token', data.refreshToken);
    },
    // retryDelay: 864000000,
  });

export const useUser = (userId: string) => useQuery(['users', userId], () => API.getUser(userId));
