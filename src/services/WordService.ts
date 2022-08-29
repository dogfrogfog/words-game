import { useQuery, useMutation } from '@tanstack/react-query';
import API from 'API/API';

export const useGetWords = (group: '0', page: '0') =>
  useQuery(['words'], () => API.getWords(group, page));

export const useGetWord = (id: string) => useQuery(['words', id], () => API.getWord(id));

export const useGetUserWords = (userid: string) =>
  useQuery(['userWords'], () => API.getAllUserWords(userid));

export const useGetUserWord = (userid: string, wordId: string) =>
  useQuery(['userWords', wordId], () => API.getUserWord(userid, wordId));

export const useUpdateUserWord = () => useMutation(API.updateUserWord);
export const useCreateUserWord = () => useMutation(API.createUserWord);

export const useDeleteUserWord = () => useMutation(API.deleteUserWord);

export const useSettings = (userid: string) =>
  useQuery(['settings'], () => API.getSettings(userid));

export const useUpdateSettings = () => useMutation(API.updateSettings);

export const useStatictics = (userId: string) =>
  useQuery(['statictics'], () => API.getStatictics(userId));

export const useUpdateStatictics = () => useMutation(API.updateStatictics);
