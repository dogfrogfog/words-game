import PageTitle from 'components/PageTitle';
import { useEffect, useState, createRef } from 'react';
import playImg from '../assets/png/play-button.png';
import pauseImg from '../assets/png/pause-button.png';

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

  const optionStyles = 'pl-2 pr-2';

  return (
    <div className='pl-2 pr-2 border border-blue-400 rounded'>
      <select id='group' onChange={handleChange} ref={selectRef}>
        <option className={optionStyles} value='0'>
          Раздел 1
        </option>
        <option className={optionStyles} value='1'>
          Раздел 2
        </option>
        <option className={optionStyles} value='2'>
          Раздел 3
        </option>
        <option className={optionStyles} value='3'>
          Раздел 4
        </option>
        <option className={optionStyles} value='4'>
          Раздел 5
        </option>
        <option className={optionStyles} value='5'>
          Раздел 6
        </option>
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

  const btnBasic = 'pl-2 pr-2 rounded';
  const btnActive = 'bg-blue-400 hover:bg-blue-300 transition';
  const btnDisabled = 'bg-slate-400';

  return (
    <div className='pl-2 pr-2'>
      <button
        type='button'
        disabled={pageNum === 0}
        onClick={decreasePage}
        className={`${btnBasic} ${pageNum === 0 ? btnDisabled : btnActive}`}
      >
        &lt;
      </button>
      <span className='p-1'>{pageNum + 1}</span>
      <button
        type='button'
        disabled={pageNum === 29}
        onClick={increasePage}
        className={`${btnBasic} ${pageNum === 29 ? btnDisabled : btnActive}`}
      >
        &gt;
      </button>
    </div>
  );
};

const Options = () => <div className='pl-2 pr-2'>select options</div>;

const ControlBar = ({ changeGroup, changePage, page }: IControlBarProps) => (
  <div className='flex mb-4 mt-4 text-xl flex-col min-h-[100px] justify-between md:flex-row md:min-h-[28px]'>
    <GroupSelector changeGroup={changeGroup} />
    <Pagination changePage={changePage} page={page} />
    <Options />
  </div>
);

const Word = ({ word }: IWordProps) => {
  const groupColors = [
    'bg-[#b1d9a3]',
    'bg-[#cbe8be]',
    'bg-[#e4f2d5]',
    'bg-[#fcf6e1]',
    'bg-[#ffcccb]',
    'bg-[#fcbaba]',
  ];
  const subTextStyle = 'text-[15px] text-slate-600 italic';
  const [playMeaning, setPlayMeaning] = useState(false);
  const [playExample, setPlayExample] = useState(false);
  const handlePlayMean = () => setPlayMeaning(!playMeaning);
  const handlePlayExam = () => setPlayExample(!playExample);

  return (
    <div
      className={`p-3 mb-4 text-lg rounded shadow-lg shadow-slate-300 ${groupColors[word.group]}`}
    >
      <div className={`h-40 bg-[url('/${word.image})]`} />
      <p className='mb-2 font-bold text-center'>
        {`${word.word} - ${word.transcription} - ${word.wordTranslate}`}
      </p>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='w-[100%] md:w-[50%]'>
          <button type='button' onClick={handlePlayMean}>
            <img src={playMeaning ? pauseImg : playImg} alt='player controls' className='h-6' />
          </button>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: word.textMeaning,
            }}
          />
          <p className={`${subTextStyle} mb-2`}>{word.textMeaningTranslate}</p>
        </div>
        <div className='w-[100%] md:w-[50%]'>
          <button type='button' onClick={handlePlayExam}>
            <img src={playExample ? pauseImg : playImg} alt='player controls' className='h-6' />
          </button>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: word.textExample,
            }}
          />
          <p className={subTextStyle}>{word.textExampleTranslate}</p>
        </div>
      </div>
    </div>
  );
};

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
    <div className='pl-2 pr-2'>
      {words.length ? (
        words.map((word) => <Word word={word} key={word.id} />)
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
