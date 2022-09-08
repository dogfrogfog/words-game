import { useMutation } from '@tanstack/react-query';
import { IUserWord } from 'interfaces/apiData';
import { AxiosError } from 'axios';
import API from 'API/API';

const updateOptional = (userWord: IUserWord, correct: boolean) => {
  const { optional } = userWord;

  const newUserWord: IUserWord = {
    ...userWord,
  };

  if (correct) {
    newUserWord.optional.correctAnswers = optional.correctAnswers + 1;

    if (newUserWord.optional.correctAnswers === 5) {
      newUserWord.optional.learned = true;
      newUserWord.difficulty = 'easy';
    }
  } else {
    newUserWord.optional.correctAnswers = 0;
    newUserWord.optional.wrongAnswers = optional.wrongAnswers + 1;
    newUserWord.optional.learned = false;

    if (newUserWord.optional.wrongAnswers === 5) {
      newUserWord.difficulty = 'hard';
      newUserWord.optional.wrongAnswers = 0;
    }
  }
  return newUserWord;
};
const useUpdateWord = () =>
  useMutation(API.updateUserWord, {
    onError: (error: AxiosError<string>) => error,
    retry: false,
  });

export { useUpdateWord, updateOptional };
