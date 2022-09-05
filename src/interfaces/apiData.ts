export interface IAuth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IOptional {
  test: number;
}

export interface ISetting {
  wordsPerDay: number;
  optional: IOptional;
}

export interface IStatistic {
  wordsPerDay: number;
  optional: IOptional;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserWord {
  difficulty: string;
  optional: IOptional;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IFiltredWord extends IWord {
  userWord?: Partial<IUserWord>;
}
