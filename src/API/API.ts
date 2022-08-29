import axios from 'axios';
import { BASE_URL } from 'constants/constants';
import { IUser } from 'interfaces/User.interface';
import { IAuth } from 'interfaces/Auth.interface';
import { ISetting } from 'interfaces/Setting.interface';
import { IStatistic } from 'interfaces/Statictic.interface';
import { IUserWord } from 'interfaces/UserWord.interface';
import { IWord } from 'interfaces/Word.interface';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const requestConfig = config;
  const token = localStorage.getItem('token');

  if (requestConfig.headers && token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const apiService = () => {
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IAuth> => {
    const result = await api.post<IAuth>('signin', {
      email,
      password,
    });
    return result.data;
  };

  const getNewToken = async (id: string): Promise<IAuth> =>
    api.get<IAuth>(`users/${id}/tokens`).then((result) => result.data);

  const createUser = async (user: IUser): Promise<IUser> =>
    api.post<IUser>('users', user).then((result) => result.data);

  const getUser = async (id: string): Promise<IUser> =>
    api.get<IUser>(`users/${id}`).then((result) => result.data);

  const updateUser = async ({
    id,
    email,
    password,
  }: {
    id: string;
    email: string;
    password: string;
  }): Promise<IUser> =>
    api
      .put<IUser>(`users/${id}`, {
        email,
        password,
      })
      .then((result) => result.data);

  const deleteUser = async (id: string): Promise<void> =>
    api.delete<void>(`users/${id}`).then((result) => result.data);

  const getWords = async (group: string, page: string): Promise<IWord[]> =>
    api
      .get<IWord[]>('words', {
        params: {
          group,
          page,
        },
      })
      .then((result) => result.data);

  const getWord = async (id: string): Promise<IWord> =>
    api.get<IWord>(`words/${id}`).then((result) => result.data);

  const getAllUserWords = async (userId: string): Promise<IUserWord[]> =>
    api.get<IUserWord[]>(`words/${userId}`).then((result) => result.data);

  const getUserWord = async (userId: string, wordId: string): Promise<IUserWord> =>
    api.get<IUserWord>(`users/${userId}/words/${wordId}`).then((result) => result.data);

  const createUserWord = async ({
    userId,
    wordId,
    userWord,
  }: {
    userId: string;
    wordId: string;
    userWord: IUserWord;
  }): Promise<IUserWord> =>
    api.post<IUserWord>(`users/${userId}/words/${wordId}`, userWord).then((result) => result.data);

  const updateUserWord = async ({
    userId,
    wordId,
    userWord,
  }: {
    userId: string;
    wordId: string;
    userWord: IUserWord;
  }): Promise<IUserWord> =>
    api.put<IUserWord>(`users/${userId}/words/${wordId}`, userWord).then((result) => result.data);

  const deleteUserWord = async ({
    userId,
    wordId,
  }: {
    userId: string;
    wordId: string;
  }): Promise<void> =>
    api.delete<void>(`users/${userId}/words/${wordId}`).then((result) => result.data);

  const getSettings = async (userId: string): Promise<ISetting> =>
    api.get<ISetting>(`users/${userId}/settings`).then((result) => result.data);

  const updateSettings = async ({
    userId,
    setting,
  }: {
    userId: string;
    setting: ISetting;
  }): Promise<ISetting> =>
    api.put<ISetting>(`users/${userId}/settings`, setting).then((result) => result.data);

  const getStatictics = async (userId: string): Promise<IStatistic> =>
    api.get<IStatistic>(`/users/${userId}/statistics`).then((result) => result.data);

  const updateStatictics = async ({
    userId,
    setting,
  }: {
    userId: string;
    setting: ISetting;
  }): Promise<IStatistic> =>
    api.put<IStatistic>(`/users/${userId}/statistics`, setting).then((result) => result.data);

  return {
    signIn,
    createUser,
    getUser,
    getNewToken,
    updateUser,
    deleteUser,
    getWord,
    getAllUserWords,
    getSettings,
    updateSettings,
    updateStatictics,
    deleteUserWord,
    updateUserWord,
    createUserWord,
    getWords,
    getStatictics,
    getUserWord,
  };
};

const API = apiService();

export default API;
