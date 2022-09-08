import { useState, useEffect } from 'react';

interface ITimerProps {
  finish: () => void;
  initTime: number;
}

const Timer = ({ initTime, finish }: ITimerProps) => {
  const [time, setTime] = useState(initTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time <= 0) {
        finish();
        clearInterval(timer);
        return;
      }

      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [finish, time]);

  const calcPercent = () => {
    const percent = Math.floor((time * 100) / initTime);
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
      className='flex justify-center items-center w-[30px] h-[px] mt-2 rotate-45 rounded-full border-4 text-slate-900 transition-all duration-500 text-sm font-bold'
    >
      <span className='-rotate-45'>{time}</span>
    </span>
  );
};
export default Timer;
