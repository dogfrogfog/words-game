import PageTitle from 'components/PageTitle';
import { useEffect, useState } from 'react';

interface IWord {
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

interface IWordProps {
  word: IWord;
}

interface IWordsProps {
  group: number;
  page: number;
}

const GroupSelector = () => (
  <div className='pl-1 pr-1'>
    <select id='group'>
      <option value='0'>Раздел 1</option>
      <option value='1'>Раздел 2</option>
      <option value='2'>Раздел 3</option>
      <option value='3'>Раздел 4</option>
      <option value='4'>Раздел 5</option>
      <option value='5'>Раздел 6</option>
    </select>
  </div>
);

const Pagination = () => (
  <div className='pl-1 pr-1'>
    <button type='button' className='bg-blue-400 leading-4 p-1 rounded'>
      prev
    </button>
    <span className='p-1'>current</span>
    <button type='button' className='bg-blue-400 leading-4 p-1 rounded'>
      next
    </button>
  </div>
);

const Options = () => <div className='pl-1 pr-1'>select options</div>;

const NavBlock = () => (
  <div className='flex'>
    <GroupSelector />
    <Pagination />
    <Options />
  </div>
);

const Word = ({ word }: IWordProps) => (
  <div id={word.id}>
    <p>{word.word}</p>
    <img src={word.image} alt='word' />
  </div>
);

const WordsList = ({ group, page }: IWordsProps) => {
  const src = `
  https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`;
  const [words, setWords] = useState<IWord[]>([]);
  useEffect(() => {
    fetch(src)
      .then((response) => response.json())
      .then((wordsArray: IWord[]) => setWords(wordsArray))
      .catch((e) => console.log(e));
  });

  return (
    <div>
      {words.length ? (
        words.map((word) => <Word word={word} key={word.word} />)
      ) : (
        <img className='w-14' src='https://i.gifer.com/ZZ5H.gif' alt='loader' />
      )}
    </div>
  );
};

const Wordbook = () => (
  <div className='py-2 px-2 w-full'>
    <PageTitle>Wordbook</PageTitle>
    <NavBlock />
    <WordsList group={0} page={0} />
  </div>
);

export default Wordbook;
