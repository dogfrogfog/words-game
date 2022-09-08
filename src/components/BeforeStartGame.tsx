import { Link } from '@tanstack/react-location';
import { Routes } from 'constants/routes';
import { useEffect, useState } from 'react';

interface IComplexityProps {
  setComplexity: (val: number) => void;
}

interface IComplexityBtnProps {
  value: number;
  setComplexity: (value: number) => void;
}

interface IInitBackgroundProps {
  initCount: number;
  hideInitBackground: () => void;
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

export const Complexity = ({ setComplexity }: IComplexityProps) => (
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
export const Error = () => (
  <div className='w-full h-full flex flex-col justify-center items-center'>
    <p className='text-2xl mx-auto z-50'>
      Error... Maybe you are not authorized or your token has ended -log in again
    </p>
    <Link
      to={Routes.HOME}
      className='mx-auto text-xl font-bold cursor-pointer text-blue-900 underline hover:text-blue-600 transition-color '
    >
      To Home Page
    </Link>
  </div>
);

export const InitBackground = ({ initCount, hideInitBackground }: IInitBackgroundProps) => {
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
