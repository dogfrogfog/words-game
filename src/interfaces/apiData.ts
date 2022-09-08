export interface IAuth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IOptionalWord {
  learned: boolean;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface IOptionalSetting {
  learned: boolean;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface IOptionalStatictics {
  test: false;
}

export interface ISetting {
  wordsPerDay: number;
  optional: IOptionalSetting;
}

export interface IStatistic {
  wordsPerDay: number;
  optional: IOptionalStatictics;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserWord {
  difficulty: string;
  optional: IOptionalWord;
}

export interface IWord {
  _id: string;
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
  userWord?: IUserWord;
}

export interface IFiltredWords {
  paginatedResults: IFiltredWord[];
  totalCount: number[];
}
