import { BASE_URL } from 'constants/constants';
import speaker from 'assets/svg/speaker.svg';
import usePlayAudio from 'hooks/usePlayAudio';

interface IPronounceProps {
  audio: string;
}
const Pronounce = ({ audio }: IPronounceProps) => {
  const { refetch } = usePlayAudio(`${BASE_URL}${audio}`);

  return (
    <div className='basis-[33%] flex justify-center'>
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => refetch()}
        className='hover:bg-blue-200/80 rounded-lg'
        type='button'
      >
        <img src={speaker} alt='pronounce' className='w-14 h-14' />
      </button>
    </div>
  );
};

export { Pronounce };
