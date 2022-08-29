export interface IUserWord {
  difficulty: string;
  optional: {
    learned: boolean;
    correctAnswers: number;
  };
}
