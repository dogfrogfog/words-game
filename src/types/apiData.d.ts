export type Auth = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type Optional = {
  learned: boolean;
  correctAnswers: number;
};

export type Setting = {
  wordsPerDay: number;
  optional: {
    test: string;
  };
};

export type Statistic = {
  learnedWords: number;
  optional: {
    test: string;
  };
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserWord = {
  difficulty: string;
  optional: {
    learned: boolean;
    correctAnswers: number;
  };
};

export type Word = {
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
};
