import { useState, useEffect, useContext, useRef } from 'react';
import Timer from 'components/Timer';
import { ROUNDS_CHALLANGE, TIME_ROUND_CHALLANGE } from 'constants/constants';
import { Routes } from 'constants/routes';
import { Link, MakeGenerics, useSearch } from '@tanstack/react-location';
import { Pronounce } from 'components/Pronounce';
import useAggrigateWords from 'hooks/useAggrigateWords';
import { Context } from 'context/context';
import { IFiltredWord } from 'interfaces/apiData';
import useCreateWord from 'hooks/useCreateWord';
import { useUpdateWord, updateOptional } from 'hooks/useUpdateWord';

interface IInitBackgroundProps {
  initCount: number;
  hideInitBackground: () => void;
}

const InitBackground = ({ initCount, hideInitBackground }: IInitBackgroundProps) => {
  const [initCountState, setInitCountState] = useState(initCount);
  useEffect(() => {
    const showInitBackground = () => {
      const InitTimer = setTimeout(() => {
        if (initCountState <= 0) {
          hideInitBackground();
          return;
        }
        setInitCountState((prev) => prev - 1);
      }, 1000);
      return InitTimer;
    };

    const timer = showInitBackground();
    return () => clearTimeout(timer);
  }, [initCountState, hideInitBackground]);

  let borderProgressStyle = '';
  switch (initCountState) {
    case 0:
      borderProgressStyle = 'bg-rose-500 animate-pulse';
      break;
    case 1:
      borderProgressStyle = 'border-teal-600 bg-orange-500 animate-pulse';
      break;
    case 2:
      borderProgressStyle += 'border-b-teal-500 border-r-teal-500 border-t-teal-500';
      break;
    case 3:
      borderProgressStyle += 'border-r-teal-500 border-t-teal-500';
      break;
    case 4:
      borderProgressStyle += 'border-t-teal-500';
      break;
    default:
      break;
  }
  return (
    <div className='w-screen h-screen fixed inset-0 bg-slate-900/90 flex justify-center items-center'>
      <p className='flex flex-col justify-center items-center text-2xl font-bold text-slate-300'>
        <span
          className={`flex justify-center items-center w-[75px] h-[75px] mt-2 rotate-45 rounded-full border-4 transition-all duration-500 border-indigo-200 ${borderProgressStyle}`}
        >
          <span className='-rotate-45'>{initCountState}</span>
        </span>
        <span>get ready</span>
      </p>
    </div>
  );
};

interface IComplexityBtnProps {
  value: number;
  setComplexity: (value: number) => void;
}

const ComplexityBtn = ({ value, setComplexity }: IComplexityBtnProps) => {
  const handleClick = () => {
    setComplexity(value);
  };
  return (
    <button
      onClick={handleClick}
      type='button'
      className='rounded-full w-10 h-10 text-xl font-medium bg-orange-400 hover:bg-orange-500/80 transition-all'
    >
      {value}
    </button>
  );
};
interface IComplexityProps {
  setComplexity: (val: number) => void;
}
const Complexity = ({ setComplexity }: IComplexityProps) => (
  <div className='w-screen h-screen fixed inset-0 bg-slate-900/90 flex justify-center items-center'>
    <div className='w-[500px] h-[500px] text-white flex flex-col justify-center items-center'>
      <h2 className='text-2xl font-semibold pb-10'> Chose Complexity</h2>
      <div className='flex justify-evenly items-center w-[80%] '>
        {[1, 2, 3, 4, 5, 6].map((val) => (
          <ComplexityBtn value={val} setComplexity={setComplexity} key={val} />
        ))}
      </div>
    </div>
  </div>
);

interface IRoundPrors {
  updateStats: (correct: boolean, word: IFiltredWord) => void;
  words: IFiltredWord[];
}

const Round = ({ updateStats, words }: IRoundPrors) => {
  const correctWord = words[Math.floor(Math.random() * 4)];
  const refs = useRef<HTMLButtonElement[]>([]);

  const setColor = (id: number, correct: boolean) => {
    if (correct) {
      refs.current[id].classList.add('correct');
    } else {
      refs.current[id].classList.add('correct');
    }
  };

  const isCorrectAnswer = (word: IFiltredWord) => word._id === correctWord._id;

  const finishRound = (word?: IFiltredWord) => {
    if (word) {
      updateStats(isCorrectAnswer(word), correctWord);
    }

    updateStats(false, correctWord);
  };

  return (
    <div className='flex flex-col justify-center gap-7'>
      <div className='flex justify-center'>
        <Timer
          finish={() => {
            finishRound(correctWord);
          }}
          initTime={TIME_ROUND_CHALLANGE}
        />
      </div>
      <Pronounce audio={correctWord.audio} />

      <div className='flex justify-center items-center gap-2'>
        {words.map((word, id) => (
          <button
            type='button'
            value={word.word}
            key={word._id}
            ref={(el) => {
              if (el) refs.current[id] = el;
            }}
            onClick={() => {
              setColor(id, isCorrectAnswer(word));
              finishRound(word);
            }}
            className='text-xl bg-blue-400 px-3 py-2 transition-colors hover:bg-blue-500 cursor-pointer block mx-auto disabled:bg-blue-200 '
          >
            {word.wordTranslate}
          </button>
        ))}
      </div>
      <div />
    </div>
  );
};

const Game = ({ page, group }: IGameProps) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(ROUNDS_CHALLANGE);
  const [cashedWords, setCashedWords] = useState<IFiltredWord[]>([]);
  const [words, setWords] = useState<IFiltredWord[]>([]);
  const { state } = useContext(Context);
  const userId = state.user ? state.user.userId : null;

  const { mutate: createWord } = useCreateWord();
  const { mutate: updateWord } = useUpdateWord();

  const updateStats = (correct: boolean, word: IFiltredWord) => {
    setCashedWords([...cashedWords, word]);
    setRound(round - 1);
    const getedScore = correct ? 100 : 0;
    if (userId) {
      if (word.userWord) {
        const newUserWord = updateOptional(word.userWord, correct);
        updateWord({
          userId,
          wordId: word._id,
          userWord: newUserWord,
        });
      } else {
        createWord({
          userId,
          wordId: word._id,
          userWord: {
            difficulty: 'easy',
            optional: {
              correctAnswers: correct ? 1 : 0,
              learned: false,
              wrongAnswers: correct ? 0 : 1,
            },
          },
        });
      }
    }
    setScore(getedScore + score);
  };
  const { data } = useAggrigateWords(
    userId,
    {
      page,
      group,
    },
    '20',
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      const pickedWords = data[0].paginatedResults
        .sort(() => 0.5 - Math.random())
        .slice(0, ROUNDS_CHALLANGE);

      const selected = pickedWords.filter((word) => {
        for (let i = 0; i < cashedWords.length; i = +1) {
          if (cashedWords[i]._id === word._id) return false;
        }
        return true;
      });

      setWords(selected.slice(0, 4));
    }
  }, [data, cashedWords]);

  return (
    <div className='w-full flex flex-col gap-[30vh]'>
      <div className='flex  items-center w-full'>
        <div className='flex flex-[1_1_50%] justify-end'>
          <div className='flex justify-center items-center w-[75px] h-[75px] rounded-full border-4 border-blue-600 font-medium text-xl translate-x-1/2'>
            {score}
          </div>
        </div>
        <div className='flex flex-[1_1_50%] justify-end'>
          <Link
            to={Routes.HOME}
            className='flex bg-sprint-close w-10 h-10 bg-contain bg-no-repeat hover:invert cursor-pointer'
          />
        </div>
      </div>

      {words.length === 4 ? <Round updateStats={updateStats} words={words} /> : null}
    </div>
  );
};

interface IGameProps {
  group: number;
  page: number | null;
}

const StartGame = ({ page, group }: IGameProps) => {
  const [isInitBackground, setInitBackgroundShow] = useState(true);
  const hideInitBackground = () => setInitBackgroundShow(() => false);
  return (
    <>
      {isInitBackground && <InitBackground initCount={4} hideInitBackground={hideInitBackground} />}
      {!isInitBackground && <Game page={page} group={group} />}
    </>
  );
};
export type QueryFilters = MakeGenerics<{
  Search: {
    filter?: {
      page: number;
      group: number;
    };
  };
}>;

const Challange = () => {
  const [chosenComplexity, setComplexity] = useState(0);
  const [page, setPage] = useState<number | null>(null);
  const queryParams = useSearch<QueryFilters>();

  if (queryParams.filter) {
    setComplexity(queryParams.filter.group);
    setPage(queryParams.filter.page);
  }

  return (
    <div className='flex bg-sprint-bg bg-center bg-cover bg-no-repeat fixed z-50 top-0 left-0 w-full h-full pt-10 px-10'>
      {!chosenComplexity && <Complexity setComplexity={(val: number) => setComplexity(val)} />}
      {chosenComplexity && <StartGame group={chosenComplexity - 1} page={page} />}
    </div>
  );
};

export default Challange;
