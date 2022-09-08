import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import API from 'API/API';

interface IFilterOptions {
  page?: number | null;
  group: number;
}

function chooseFilter(filterOptions: IFilterOptions) {
  const { page, group } = filterOptions;

  if (page) {
    return `{$"or": [{"$and": [{"page": ${page}},{"group": ${group}},{"userWord.optional.learned" = "false"}]},{"userWord": "null"}]}`;
  }
  return `{"$and":[{"group":${group}}, {"userWord":null}]}`;
}
const useAggrigateWords = (
  userId: string | null,
  filterOptions: IFilterOptions,
  wordsPerPage?: string,
) => {
  const filter = chooseFilter(filterOptions);

  return useQuery(
    ['roundwords', userId, wordsPerPage, filter],
    () => API.getFiltredWords(userId, filter, wordsPerPage),
    {
      onError: (error: AxiosError<string>) => error,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useAggrigateWords;
