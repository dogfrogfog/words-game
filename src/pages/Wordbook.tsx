import PageTitle from 'components/PageTitle';
import { useEffect, useState, createRef } from 'react';

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

interface IControlBarProps {
  changeGroup: React.Dispatch<React.SetStateAction<number>>;
  changePage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

interface IGroupSelectorProps {
  changeGroup: React.Dispatch<React.SetStateAction<number>>;
}

interface IPaginationProps {
  changePage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

const GroupSelector = ({ changeGroup }: IGroupSelectorProps) => {
  const selectRef = createRef<HTMLSelectElement>();
  const handleChange = () => {
    changeGroup(+(selectRef.current as HTMLSelectElement).value);
  };

  return (
    <div className='pl-1 pr-1'>
      <select id='group' onChange={handleChange} ref={selectRef}>
        <option value='0'>Раздел 1</option>
        <option value='1'>Раздел 2</option>
        <option value='2'>Раздел 3</option>
        <option value='3'>Раздел 4</option>
        <option value='4'>Раздел 5</option>
        <option value='5'>Раздел 6</option>
      </select>
    </div>
  );
};

const Pagination = ({ changePage, page }: IPaginationProps) => {
  const [pageNum, setPageNum] = useState(page);
  const decreasePage = () => {
    if (pageNum > 0) {
      setPageNum(pageNum - 1);
      changePage(pageNum - 1);
    }
  };

  const increasePage = () => {
    if (page < 29) {
      setPageNum(pageNum + 1);
      changePage(pageNum + 1);
    }
  };

  return (
    <div className='pl-1 pr-1'>
      <button onClick={decreasePage} type='button' className='bg-blue-400 leading-4 p-1 rounded'>
        prev
      </button>
      <span className='p-1'>{pageNum + 1}</span>
      <button onClick={increasePage} type='button' className='bg-blue-400 leading-4 p-1 rounded'>
        next
      </button>
    </div>
  );
};

const Options = () => <div className='pl-1 pr-1'>select options</div>;

const ControlBar = ({ changeGroup, changePage, page }: IControlBarProps) => (
  <div className='flex'>
    <GroupSelector changeGroup={changeGroup} />
    <Pagination changePage={changePage} page={page} />
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
      .catch((e: string) => {
        throw new Error(e);
      });
  }, [src]);

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

const Wordbook = () => {
  const [groupNum, setGroupNum] = useState(0);
  const [pageNum, setPageNum] = useState(0);

  return (
    <div className='py-2 px-2 w-full'>
      <PageTitle>Wordbook</PageTitle>
      <ControlBar changeGroup={setGroupNum} changePage={setPageNum} page={pageNum} />
      <WordsList group={groupNum} page={pageNum} />
    </div>
  );
};

export default Wordbook;
