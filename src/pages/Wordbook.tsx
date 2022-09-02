import PageTitle from 'components/PageTitle';
import { useEffect, useState, createRef } from 'react';
import API from 'API/API';
import { IWord } from 'interfaces/apiData';
import playImg from '../assets/png/play-button.png';
import pauseImg from '../assets/png/pause-button.png';
import { BASE_URL } from '../constants/constants';

interface IWordProps {
  word: IWord;
  translate: boolean;
}

interface IWordsListProps {
  group: number;
  page: number;
  translate: boolean;
}

interface IControlBarProps {
  changeGroup: React.Dispatch<React.SetStateAction<number>>;
  changePage: React.Dispatch<React.SetStateAction<number>>;
  changeTranslate: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  translate: boolean;
}

interface IGroupSelectorProps {
  changeGroup: React.Dispatch<React.SetStateAction<number>>;
}

interface IPaginationProps {
  changePage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

interface IOptionsProps {
  changeTranslate: React.Dispatch<React.SetStateAction<boolean>>;
  showTranslate: boolean;
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

const Options = ({ changeTranslate, showTranslate }: IOptionsProps) => {
  const handleChange = () => changeTranslate(!showTranslate);

  return (
    <div>
      <label htmlFor='options'>
        <input type='checkbox' id='options' className='mr-2' onChange={handleChange} />
        Скрыть перевод
      </label>
    </div>
  );
};

const ControlBar = ({
  changeGroup,
  changePage,
  changeTranslate,
  page,
  translate,
}: IControlBarProps) => (
  <div className='flex mb-4 mt-4 text-xl text-center flex-col min-h-[100px] justify-between md:flex-row md:min-h-[28px]'>
    <GroupSelector changeGroup={changeGroup} />
    <Pagination changePage={changePage} page={page} />
    <Options changeTranslate={changeTranslate} showTranslate={translate} />
  </div>
);

const Word = ({ word, translate }: IWordProps) => {
  const groupColors = [
    'bg-[#b1d9a3]',
    'bg-[#cbe8be]',
    'bg-[#e4f2d5]',
    'bg-[#fcf6e1]',
    'bg-[#ffcccb]',
    'bg-[#fcbaba]',
  ];
  const visibilityClass = translate ? ' hidden' : '';
  const subTextStyle = `text-[15px] text-slate-600 italic ${visibilityClass}`;
  const [playMeaning, setPlayMeaning] = useState(false);
  const [playExample, setPlayExample] = useState(false);
  const handlePlayMean = () => setPlayMeaning(!playMeaning);
  const handlePlayExam = () => setPlayExample(!playExample);

  return (
    <div
      className={`p-3 mb-4 text-lg rounded shadow-lg shadow-slate-300 ${groupColors[word.group]}`}
    >
      <img
        src={`${BASE_URL}${word.image}`}
        alt={`${word.word}`}
        className='mx-auto rounded shadow-md shadow-black mb-2'
      />
      <p className='mb-2 font-bold text-center'>
        {`${word.word} - ${word.transcription} - ${word.wordTranslate}`}
      </p>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='w-[100%] md:w-[48%]'>
          <button type='button' onClick={handlePlayMean}>
            <img src={playMeaning ? pauseImg : playImg} alt='player controls' className='h-6' />
          </button>
          <p
            dangerouslySetInnerHTML={{
              __html: word.textMeaning,
            }}
          />
          <p className={`${subTextStyle} mb-2`}>{word.textMeaningTranslate}</p>
        </div>
        <div className='w-[100%] md:w-[48%]'>
          <button type='button' onClick={handlePlayExam}>
            <img src={playExample ? pauseImg : playImg} alt='player controls' className='h-6' />
          </button>
          <p
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

const WordsList = ({ group, page, translate }: IWordsListProps) => {
  const [words, setWords] = useState<IWord[]>([]);
  useEffect(() => {
    API.getWords(group, page)
      .then((wordsArray) => setWords(wordsArray))
      .catch((e: string) => {
        throw new Error(e);
      });
  }, [group, page]);

  return (
    <div className='pl-2 pr-2'>
      {words.length === 20 ? (
        words.map((word) => <Word word={word} key={word.id} translate={translate} />)
      ) : (
        <img className='w-20 block mx-auto ' src='https://i.gifer.com/ZZ5H.gif' alt='loader' />
      )}
    </div>
  );
};

const Wordbook = () => {
  const [groupNum, setGroupNum] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [showTranslate, setShowTranslate] = useState(false);

  return (
    <div className='py-2 px-2 w-full'>
      <PageTitle>Wordbook</PageTitle>
      <ControlBar
        changeGroup={setGroupNum}
        changePage={setPageNum}
        changeTranslate={setShowTranslate}
        page={pageNum}
        translate={showTranslate}
      />
      <WordsList group={groupNum} page={pageNum} translate={showTranslate} />
    </div>
  );
};

export default Wordbook;
