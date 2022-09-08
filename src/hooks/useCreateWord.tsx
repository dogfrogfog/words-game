import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import API from 'API/API';

const useCreateWord = () =>
  useMutation(API.createUserWord, {
    onError: (error: AxiosError<string>) => error,
    retry: false,
  });

export default useCreateWord;
