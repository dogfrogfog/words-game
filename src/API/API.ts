import axios from 'axios';
import { Word, UserWord, Auth, Setting, Statistic, User } from 'types/apiData';
import { BASE_URL } from 'constants/constants';

const ApiService = () => {
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

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Auth> => {
    const result = await api.post<Auth>('signin', {
      email,
      password,
    });
    return result.data;
  };

  const getNewToken = async (id: string): Promise<Auth> => {
    const response = await api.get<Auth>(`users/${id}/tokens`);

    return response.data;
  };
  const createUser = async (user: User): Promise<User> => {
    const response = await api.post<User>('users', user);

    return response.data;
  };

  const getUser = async (id: string): Promise<User> => {
    const response = await api.get<User>(`users/${id}`);

    return response.data;
  };

  const updateUser = async ({
    id,
    email,
    password,
  }: {
    id: string;
    email: string;
    password: string;
  }): Promise<User> => {
    const result = await api.put<User>(`users/${id}`, {
      email,
      password,
    });

    return result.data;
  };

  const deleteUser = async (id: string): Promise<void> =>
    api.delete<void>(`users/${id}`).then((result) => result.data);

  const getWords = async (group: string, page: string): Promise<Word[]> => {
    const result = await api.get<Word[]>('words', {
      params: {
        group,
        page,
      },
    });

    return result.data;
  };

  const getWord = async (id: string): Promise<Word> => {
    const response = await api.get<Word>(`words/${id}`);

    return response.data;
  };

  const getAllUserWords = async (userId: string): Promise<UserWord[]> => {
    const response = await api.get<UserWord[]>(`words/${userId}`);

    return response.data;
  };

  const getUserWord = async (userId: string, wordId: string): Promise<UserWord> => {
    const response = await api.get<UserWord>(`users/${userId}/words/${wordId}`);
    return response.data;
  };

  const createUserWord = async ({
    userId,
    wordId,
    userWord,
  }: {
    userId: string;
    wordId: string;
    userWord: UserWord;
  }): Promise<UserWord> => {
    const response = await api.post<UserWord>(`users/${userId}/words/${wordId}`, userWord);

    return response.data;
  };

  const updateUserWord = async ({
    userId,
    wordId,
    userWord,
  }: {
    userId: string;
    wordId: string;
    userWord: UserWord;
  }): Promise<UserWord> => {
    const response = await api.put<UserWord>(`users/${userId}/words/${wordId}`, userWord);

    return response.data;
  };

  const deleteUserWord = async ({
    userId,
    wordId,
  }: {
    userId: string;
    wordId: string;
  }): Promise<void> => {
    const response = await api.delete<void>(`users/${userId}/words/${wordId}`);

    return response.data;
  };

  const getSettings = async (userId: string): Promise<Setting> => {
    const response = await api.get<Setting>(`users/${userId}/settings`);

    return response.data;
  };

  const updateSettings = async ({
    userId,
    setting,
  }: {
    userId: string;
    setting: Setting;
  }): Promise<Setting> => {
    const response = await api.put<Setting>(`users/${userId}/settings`, setting);

    return response.data;
  };

  const getStatictics = async (userId: string): Promise<Statistic> => {
    const response = await api.get<Statistic>(`/users/${userId}/statistics`);

    return response.data;
  };
  const updateStatictics = async ({
    userId,
    setting,
  }: {
    userId: string;
    setting: Setting;
  }): Promise<Statistic> => {
    const response = await api.put<Statistic>(`/users/${userId}/statistics`, setting);

    return response.data;
  };

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

const api = ApiService();

export default api;
