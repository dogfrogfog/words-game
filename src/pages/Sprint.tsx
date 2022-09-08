import { useEffect, useState, ReactNode, useContext } from 'react';
import { Link, Navigate } from '@tanstack/react-location';
import API from 'API/API';
import { IWord } from 'interfaces/apiData';
import { Routes } from 'constants/routes';
import { BASE_URL } from 'constants/constants';
import rightSound from 'assets/audio/sprinter-right.mp3';
import wrongSound from 'assets/audio/sprinter-wrong.mp3';
import speaker from 'assets/svg/speaker.svg';
import noMusic from 'assets/svg/sprint-no-music.svg';
import allowMusic from 'assets/svg/sprint-music.svg';
import { Context } from 'context/context';
import { Complexity, Error, InitBackground } from 'components/BeforeStartGame';
import { useQuery } from '@tanstack/react-query';

const playPronounce = async (audio: string) => {
  const track = new Audio(`${BASE_URL}${audio}`);

  await track.play();
};

const playAnswer = async (sound: string, isAllow: boolean) => {
  if (!isAllow) return;
  const track = new Audio(sound);

  await track.play();
};

const sortWords = (wordsForSort: IWord[]) => {
  const max = wordsForSort.length - 1;
  return wordsForSort
    .map((word, index) => {
      const rightAnswer = !!Math.round(Math.random());
      if (rightAnswer) {
        return {
          word,
          wordTranslate: word.wordTranslate,
          rightAnswer: true,
        };
      }
      let random = Math.floor(Math.random() * max);
      while (random === index) {
        random = Math.floor(Math.random() * max);
      }
      return {
        word,
        wordTranslate: wordsForSort[random].wordTranslate,
        rightAnswer: false,
      };
    })
    .sort(() => 0.5 - Math.random());
};

interface ITimerProps {
  children: number;
  initCount: number;
  finishGame: () => void;
  setTimerCount: (val: number) => void;
  isEndGame: boolean;
}

const Timer = ({ initCount, finishGame, children, setTimerCount, isEndGame }: ITimerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initCountState, setInitCountState] = useState(initCount);
  const [initTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    const showTimer = () => {
      setTimeLeft(initCount - 1 - Math.floor((Date.now() - initTime) / 1000));
      setTimerCount(timeLeft < 0 ? 0 : timeLeft);
      const InitTimer = setInterval(() => {
        if (isEndGame) {
          clearInterval(InitTimer);
          return;
        }
        if (timeLeft <= 0) {
          finishGame();
          clearInterval(InitTimer);
        }
        setInitCountState(() => timeLeft);
      }, 1000);
      return InitTimer;
    };

    const timer = showTimer();
    return () => clearInterval(timer);
  });

  const calcPercent = () => {
    const percent = Math.floor((timeLeft * 100) / 60);
    const remainder = 100 - percent;
    return {
      percent,
      remainder,
    };
  };
  const { percent, remainder } = calcPercent();
  const timerStyle = `linear-gradient(to left top,#030397 ${percent - 1}%, #adf2f7 ${
    remainder + 1
  }%,#adf2f7 ${remainder}%)`;

  return (
    <span
      style={{
        borderImageSource: timerStyle,
        borderImageSlice: '1',
      }}
      className='flex justify-center items-center w-[50px] h-[50px] mt-2 rotate-45 rounded-full border-4 text-slate-900 transition-all duration-500 text-2xl font-bold'
    >
      <span className='-rotate-45'>{children}</span>
    </span>
  );
};

interface IPronounceProps {
  audio: string;
}
const Pronounce = ({ audio }: IPronounceProps) => (
  <div className='basis-[33%] flex justify-center'>
    <button
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => playPronounce(audio)}
      className='hover:bg-blue-200/80 rounded-lg'
      type='button'
    >
      <img src={speaker} alt='pronounce' className='w-10 h-10' />
    </button>
  </div>
);

interface IProgressProps {
  seqRightAnswers: number;
}

const Progress = ({ seqRightAnswers }: IProgressProps) => {
  const level = seqRightAnswers % 3;
  let firstBg = level >= 0 ? 'bg-blue-600' : 'bg-slate-900/50';
  const secondBg = level >= 1 ? 'bg-blue-600' : 'bg-slate-900/50';
  let thirdBg = level === 2 ? 'bg-blue-600' : 'bg-slate-900/50';

  if (seqRightAnswers > 12) {
    firstBg = 'hidden';
    thirdBg = 'hidden';
  }
  return (
    <div className='basis-[33%] mx-auto flex justify-center items-center gap-[15px]'>
      <div className={`w-[20px] h-[20px] rounded-full ${firstBg}`} />
      <div className={`w-[20px] h-[20px] rounded-full ${secondBg}`} />
      <div className={`w-[20px] h-[20px] rounded-full ${thirdBg}`} />
    </div>
  );
};
interface IPrintResultsBtnProps {
  audio: string;
}
const PrintResultsBtn = ({ audio }: IPrintResultsBtnProps) => (
  <button
    type='button'
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onClick={() => playPronounce(audio)}
    className='hover:bg-blue-200/80 rounded-lg'
  >
    <img src={speaker} alt='Prononce' width={40} height={40} />
  </button>
);
interface IResultsProps {
  wrongAnswers: Array<IWord>;
  rightAnswers: Array<IWord>;
}

const printResults = (arr: Array<IWord>): ReactNode =>
  arr.map((word) => (
    <p className='flex justify-start items-center py-1' key={word.id}>
      <PrintResultsBtn audio={word.audio} />
      <span className='text-lg font-semibold py-1 px-1'>{word.word}</span>
      <span className='text-lg font-semibold py-1 px-1'> - </span>
      <span className='text-lg font-semibold py-1 px-1'>{word.wordTranslate}</span>
    </p>
  ));

const Results = ({ wrongAnswers, rightAnswers }: IResultsProps) => (
  <div className='fixed inset-0 flex justify-center items-center z-50'>
    <div className='w-[500px] h-[500px] bg-white rounded-3xl px-4 flex flex-col justify-evenly items-stretch overflow-auto'>
      <div className='w-full border-b-2 min-h-[30%] border-black overflow-auto'>
        <div className='text-xl font-bold'>
          <span className='w-full border-b-4 border-rose-700'>Wrong answers - </span>
          <span>{wrongAnswers.length}</span>
        </div>
        <div>{printResults(wrongAnswers)}</div>
      </div>

      <div className='w-full min-h-[30%] overflow-auto'>
        <div className='text-xl font-bold'>
          <span className='w-full border-b-4 border-green-600'>Right answers - </span>
          <span>{rightAnswers.length}</span>
        </div>
        <div>{printResults(rightAnswers)}</div>
      </div>

      <Link
        to={Routes.HOME}
        className='mx-auto text-xl font-bold text-blue-500 cursor-pointer underline hover:text-blue-600 transition-color '
      >
        To Home Page
      </Link>
    </div>
  </div>
);

interface IGameProps {
  words: IWord[];
}

const Game = ({ words }: IGameProps) => {
  const [isEndGame, setEndGame] = useState(false);
  const [indexWord, setIndexWord] = useState(0);
  const [sortedArr] = useState(sortWords(words));
  const [audio, setAudio] = useState(sortedArr[indexWord].word.audio);
  const [score, setScore] = useState(0);
  const [scoreLevel, setScoreLevel] = useState(0);
  const [sequenceRightAnswers, setSequenceRightAnswers] = useState(0);
  const [isAllowMusic, setAllowMusic] = useState(true);
  const toggleMusic = () => setAllowMusic((prev) => !prev);
  const scoreKP = [10, 20, 40, 80];
  const finishGame = () => setEndGame(true);
  const [rightAnswers, setRightAnswers] = useState(Array<IWord>);
  const [wrongAnswers, setWrongAnswers] = useState(Array<IWord>);
  const [timerCount, setTimerCount] = useState(60);
  const [isArrowKeyDown, setIsArrowKeyDown] = useState(false);

  const checkAnswer = async (answer: boolean) => {
    if (isEndGame) return;

    const { word, rightAnswer } = sortedArr[indexWord];
    const result = answer === rightAnswer;
    if (!result) {
      setWrongAnswers((prev) => [...prev, word]);
      await playAnswer(wrongSound, isAllowMusic);
      setScoreLevel(0);
      setSequenceRightAnswers(0);
    }
    if (result) {
      setRightAnswers((prev) => [...prev, word]);
      await playAnswer(rightSound, isAllowMusic);
      setSequenceRightAnswers((prev) => prev + 1);
      const s = Math.floor((sequenceRightAnswers + 1) / 3);
      const scoreL = s >= 3 ? 3 : s;
      setScoreLevel(() => scoreL);
      setScore((prev) => prev + scoreKP[scoreL]);
    }

    if (indexWord < sortedArr.length - 1) {
      setIndexWord((prev) => prev + 1);
      setAudio(() => sortedArr[indexWord + 1].word.audio);
    } else {
      setEndGame(true);
    }
  };

  const handleKeypress = async (e: KeyboardEvent) => {
    if (isArrowKeyDown) return;
    setIsArrowKeyDown(true);
    if (e.key === 'ArrowRight') await checkAnswer(true);
    if (e.key === 'ArrowLeft') await checkAnswer(false);
  };
  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') setIsArrowKeyDown(false);
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    document.addEventListener('keydown', handleKeypress);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      document.removeEventListener('keydown', handleKeypress);
      document.removeEventListener('keyup', handleKeyup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexWord, isEndGame, isArrowKeyDown]);

  return (
    <div className='w-full'>
      {isEndGame && <Results wrongAnswers={wrongAnswers} rightAnswers={rightAnswers} />}
      <div className='flex justify-between items-center w-full pb-10'>
        <Timer
          isEndGame={isEndGame}
          initCount={60}
          finishGame={finishGame}
          setTimerCount={(val: number) => setTimerCount(val)}
        >
          {timerCount}
        </Timer>
        <div className='flex justify-center items-center w-[75px] h-[75px] rounded-full border-4 border-blue-600 font-medium text-xl'>
          {score}
        </div>
        <Link
          to={Routes.HOME}
          className='bg-sprint-close w-10 h-10 bg-contain bg-no-repeat hover:invert cursor-pointer'
        />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-end items-center w-[500px] pb-5'>
          <button
            onClick={toggleMusic}
            type='button'
            className='text-3xl font-bold text-blue-400/80 hover:text-blue-500 w-[40px] h-[40px]'
          >
            <img
              src={isAllowMusic ? allowMusic : noMusic}
              alt={isAllowMusic ? 'allow music' : 'ban music'}
            />
          </button>
        </div>

        <div className='flex flex-col justify-evenly items-center border-emerald-600 w-[500px] min-h-[500px] py-5 border-2 rounded-lg bg-slate-100/40'>
          <div className='flex justify-center items-center w-full'>
            <div className='basis-[33%]' />
            <Progress seqRightAnswers={sequenceRightAnswers} />
            <Pronounce audio={audio} />
          </div>

          <div className='w-[250px] pt-[40px]'>
            <div className='flex justify-evenly items-center gap-[15px]'>
              {scoreLevel >= 0 && (
                <span className='bg-sprinter1 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              )}
              {scoreLevel >= 1 && (
                <span className='bg-sprinter2 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              )}
              {scoreLevel >= 2 && (
                <span className='bg-sprinter3 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              )}
              {scoreLevel >= 3 && (
                <span className='bg-sprinter4 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              )}
            </div>
            <div className='-mt-[20px]'>
              <div className='bg-rose-600 w-full h-[10px] border-b-[1px] border-white' />
              <div className='bg-rose-600 w-full h-[10px] border-b-[1px] border-white' />
              <div className='bg-rose-600 w-full h-[10px]' />
            </div>
          </div>

          <span className='text-2xl font-semibold text-center'>
            {sortedArr[indexWord].word.word}
          </span>
          <span className='text-xl font-medium text-center'>
            {sortedArr[indexWord].wordTranslate}
          </span>

          <div className='flex justify-evenly items-center gap-10'>
            <div className='flex flex-col justify-center items-center'>
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => checkAnswer(false)}
                type='button'
                className='w-[100px] h-[40px] rounded-xl bg-rose-400 text-bold hover:bg-rose-500/90'
              >
                wrong
              </button>
              <span className='text-2xl font-bold'>&#8592;</span>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => checkAnswer(true)}
                type='button'
                className='w-[100px] h-[40px] rounded-xl bg-green-400 text-medium hover:bg-green-500/90'
              >
                right
              </button>
              <span className='text-2xl font-bold'>&#8594;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IStartGameProps {
  complexity: number;
}

const StartGame = ({ complexity }: IStartGameProps) => {
  const context = useContext(Context);
  const [isInitBackground, setInitBackgroundShow] = useState(true);
  const { user } = context.state;
  const hideInitBackground = () => setInitBackgroundShow(() => false);

  const filter = JSON.stringify({
    $and: [
      {
        group: complexity - 1,
      },
      {
        userWord: null,
      },
    ],
  });

  const getArrWords = (userId: string, wordsPerPage: string, filterStr: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery(['arranged'], () => API.getFilteredWords(userId, wordsPerPage, filterStr));

  if (!user) {
    return <Navigate to='/401' />;
  }
  const { userId } = user;
  const { isLoading, isError, data, isSuccess } = getArrWords(userId, '200', filter);

  return (
    <>
      {isError && <Error />}
      {!isError && (
        <>
          {isLoading && <p className='text-2xl text-white mx-auto z-50'>Loading, please wait...</p>}
          {(isLoading || isInitBackground) && (
            <InitBackground initCount={4} hideInitBackground={hideInitBackground} />
          )}
          {!isLoading && !isInitBackground && isSuccess && <Game words={data} />}
        </>
      )}
    </>
  );
};

const Sprint = () => {
  const [chosenComplexity, setComplexity] = useState(0);

  return (
    <div className='flex bg-sprint-bg bg-center bg-cover bg-no-repeat fixed z-50 top-0 left-0 w-full h-full pt-10 px-10'>
      {!chosenComplexity && <Complexity setComplexity={(val: number) => setComplexity(val)} />}
      {chosenComplexity && <StartGame complexity={chosenComplexity} />}
    </div>
  );
};

export default Sprint;
