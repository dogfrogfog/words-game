// eslint-disable-next-line object-curly-newline
import type {
  IWord,
  IUserWord,
  IAuth,
  ISetting,
  IStatistic,
  IUser,
  IFiltredWord,
  // eslint-disable-next-line object-curly-newline
} from 'interfaces/apiData';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { isAuth } from 'context/context';
import { BASE_URL } from 'constants/constants';

const ApiService = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      const requestConfig = config;

      const user = isAuth(localStorage.getItem('user'));

      if (user) {
        const { token } = user;

        if (requestConfig.headers) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error: AxiosError) => error,
  );

  const logIn = async ({
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
  const getNewToken = async (id: string): Promise<IAuth> => {
    const response = await api.get<IAuth>(`users/${id}/tokens`);

    return response.data;
  };
  const createUser = async (user: IUser): Promise<IUser> => {
    const response = await api.post<IUser>('users', user);

    return response.data;
  };

  const registration = async (user: IUser): Promise<IAuth> => {
    await createUser(user);

    const { email, password } = user;

    const result = await logIn({
      email,
      password,
    });

    return result;
  };

  const getUser = async (id: string): Promise<IUser> => {
    const response = await api.get<IUser>(`users/${id}`);

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
  }): Promise<IUser> => {
    const result = await api.put<IUser>(`users/${id}`, {
      email,
      password,
    });

    return result.data;
  };

  const deleteUser = async (id: string): Promise<void> =>
    api.delete<void>(`users/${id}`).then((result) => result.data);

  const getWords = async (group: string, page: string) => {
    const response = await api.get<IWord[]>('words', {
      params: {
        group,
        page,
      },
    });

    return response.data;
  };

  const getWord = async (id: string): Promise<IWord> => {
    const response = await api.get<IWord>(`words/${id}`);

    return response.data;
  };

  const getAllUserWords = async (userId: string): Promise<IUserWord[]> => {
    const response = await api.get<IUserWord[]>(`words/${userId}`);

    return response.data;
  };

  const getUserWord = async (userId: string, wordId: string): Promise<IUserWord> => {
    const response = await api.get<IUserWord>(`users/${userId}/words/${wordId}`);
    return response.data;
  };

  const createUserWord = async ({
    userId,
    wordId,
    userWord,
  }: {
    userId: string;
    wordId: string;
    userWord: IUserWord;
  }): Promise<IUserWord> => {
    const response = await api.post<IUserWord>(`users/${userId}/words/${wordId}`, userWord);

    return response.data;
  };

  const updateUserWord = async ({
    userId,
    wordId,
    userWord,
  }: {
    userId: string;
    wordId: string;
    userWord: IUserWord;
  }): Promise<IUserWord> => {
    const response = await api.put<IUserWord>(`users/${userId}/words/${wordId}`, userWord);

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

  const getFiltredWords = async (
    userId: string,
    wordsPerPage: string,
    filter: string,
  ): Promise<IFiltredWord[]> => {
    const response = await api.get<IFiltredWord[]>(`users/${userId}/aggregatedWords`, {
      params: {
        filter,
        wordsPerPage,
      },
    });
    return response.data;
  };

  const getFiltredWord = async (userId: string, wordsId: string): Promise<IFiltredWord[]> => {
    const response = await api.get<IFiltredWord[]>(`users/${userId}/aggregatedWords/${wordsId}`);
    return response.data;
  };

  const getSettings = async (userId: string): Promise<ISetting> => {
    const response = await api.get<ISetting>(`users/${userId}/settings`);

    return response.data;
  };

  const updateSettings = async ({
    userId,
    setting,
  }: {
    userId: string;
    setting: ISetting;
  }): Promise<ISetting> => {
    const response = await api.put<ISetting>(`users/${userId}/settings`, setting);

    return response.data;
  };

  const getStatictics = async (userId: string): Promise<IStatistic> => {
    const response = await api.get<IStatistic>(`/users/${userId}/statistics`);

    return response.data;
  };
  const updateStatictics = async ({
    userId,
    setting,
  }: {
    userId: string;
    setting: ISetting;
  }): Promise<IStatistic> => {
    const response = await api.put<IStatistic>(`/users/${userId}/statistics`, setting);

    return response.data;
  };

  return {
    getFiltredWords,
    getFiltredWord,
    logIn,
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
    registration,
  };
};

const API = ApiService();

export default API;
