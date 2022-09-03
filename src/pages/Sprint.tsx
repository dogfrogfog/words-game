import { useEffect, useState } from 'react';
import speaker from 'assets/svg/speaker.svg';
import { useLocation } from '@tanstack/react-location';
import API from 'API/API';
import { IWord } from 'interfaces/apiData';

interface IInitBackgroundProps {
  initCount: number;
  hideInitBackground: () => void;
}

const InitBackground = ({ initCount, hideInitBackground }: IInitBackgroundProps) => {
  const [initCountState, setInitCountState] = useState(4);
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
interface ITimerProps {
  initCount: number;
  finishGame: () => void;
}

const Timer = ({ initCount, finishGame }: ITimerProps) => {
  const [initCountState, setInitCountState] = useState(initCount);
  useEffect(() => {
    const showTimer = () => {
      const InitTimer = setTimeout(() => {
        if (initCountState <= 0) {
          finishGame();
          return;
        }
        setInitCountState((prev) => prev - 1);
      }, 1000);
      return InitTimer;
    };

    const timer = showTimer();
    return () => clearTimeout(timer);
  }, [initCountState, finishGame]);

  const calcPercent = () => {
    const percent = Math.floor((initCountState * 100) / 60);
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
      <span className='-rotate-45'>{initCountState}</span>
    </span>
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
interface IGameProps {
  words: IWord[];
}
const Game = ({ words }: IGameProps) => {
  const [endGame, setEndGame] = useState(false);
  const [indexWord, setIndexWord] = useState(0);
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

  const [sortedArr, setSortedArr] = useState(sortWords(words));
  const finishGame = () => setEndGame(true);
  const checkAnswer = (answer: boolean) => {
    const { word, rightAnswer } = sortedArr[indexWord];
    const result = answer === rightAnswer;

    if (indexWord < sortedArr.length - 1) {
      setIndexWord((prev) => prev + 1);
    }
  };
  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') checkAnswer(true);
    if (e.key === 'ArrowLeft') checkAnswer(false);
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeypress);
    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexWord]);

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center w-full pb-10'>
        <Timer initCount={59} finishGame={finishGame} />
        <div className='flex justify-center items-center w-[75px] h-[75px] rounded-full border-4 border-blue-600 font-medium text-xl'>
          0
        </div>
        <div className='bg-sprint-close w-10 h-10 bg-contain bg-no-repeat hover:invert cursor-pointer' />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-end items-center w-[500px] pb-5'>
          <button type='button' className='text-3xl font-bold text-blue-400/80 hover:text-blue-500'>
            &#9835;
          </button>
        </div>

        <div className='flex flex-col justify-evenly items-center border-emerald-600 w-[500px] min-h-[500px] py-5 border-2 rounded-lg bg-slate-100/40'>
          <div className='flex justify-center items-center w-full'>
            <div className='basis-[33%]' />
            <div className='basis-[33%] mx-auto flex justify-center items-center gap-[15px]'>
              <div className='w-[20px] h-[20px] rounded-full bg-slate-900/50' />
              <div className='w-[20px] h-[20px] rounded-full bg-slate-900/50' />
              <div className='w-[20px] h-[20px] rounded-full bg-slate-900/50' />
            </div>
            <div className='basis-[33%] flex justify-center'>
              <button className='cursor-pointer hover:bg-blue-200/80 rounded-lg' type='button'>
                <img src={speaker} alt='pronounce' className='w-10 h-10' />
              </button>
            </div>
          </div>

          <div className='w-[250px] pt-[40px]'>
            <div className='flex justify-evenly items-center gap-[15px]'>
              <span className='bg-sprinter1 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              <span className='bg-sprinter2 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              <span className='bg-sprinter3 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
              <span className='bg-sprinter4 w-[50px] h-[50px] inline-block bg-contain bg-center bg-no-repeat' />
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

// const StartGameFromWordBook = () => {
//   const [initCountState, setInitCountState] = useState(4);
//   useEffect(() => {
//     const showInitBackground = () => {
//       const InitTimer = setInterval(() => {
//         if (initCountState <= 0) {
//           clearInterval(InitTimer);
//           return;
//         }
//         setInitCountState((prev) => prev - 1);
//       }, 1000);
//       return InitTimer;
//     };

//     const timer = showInitBackground();
//     return () => clearInterval(timer);
//   }, [initCountState]);

//   return (
//     <>
//       {initCountState !== 0 && <InitBackground initCount={initCountState} />}
//       {initCountState === 0 && <Game />}
//     </>
//   );
// };

interface IStartGameProps {
  complexity: number;
}

const StartGame = ({ complexity }: IStartGameProps) => {
  const [isInitBackground, setInitBackgroundShow] = useState(true);
  const [words, setWords] = useState(Array<IWord>);
  const hideInitBackground = () => setInitBackgroundShow(() => false);
  useEffect(() => {
    API.getWords(`${complexity - 1}`, '1')
      .then((data) => setWords(data))
      .catch((e: string) => {
        throw new Error(e);
      });
  }, [complexity]);

  return (
    <>
      {isInitBackground && <InitBackground initCount={4} hideInitBackground={hideInitBackground} />}
      {!isInitBackground && <Game words={words} />}
    </>
  );
};

const Sprint = () => {
  const [chosenComplexity, setComplexity] = useState(0);
  // const location = useLocation();
  // if (location.current.search.from !== 'menu') {
  //   return (
  //     <div
  // className='flex bg-sprint-bg bg-center bg-cover bg-no-repeat
  // fixed z-50 top-0 left-0 w-full h-full pt-10 px-10'>
  //       <StartGameFromWordBook />
  //     </div>
  //   );
  // }
  return (
    <div className='flex bg-sprint-bg bg-center bg-cover bg-no-repeat fixed z-50 top-0 left-0 w-full h-full pt-10 px-10'>
      {!chosenComplexity && <Complexity setComplexity={(val: number) => setComplexity(val)} />}
      {chosenComplexity && <StartGame complexity={chosenComplexity} />}
    </div>
  );
};

export default Sprint;
