export interface IAuth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IOptional {
  learned: boolean;
  correctAnswers: number;
}

export interface ISetting {
  wordsPerDay: number;
  optional: {
    test: string;
  };
}

export interface IStatistic {
  learnedWords: number;
  optional: {
    test: string;
  };
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserWord {
  difficulty: string;
  optional: {
    learned: boolean;
    correctAnswers: number;
  };
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
