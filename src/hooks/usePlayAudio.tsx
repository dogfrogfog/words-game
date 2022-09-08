import { useQuery } from '@tanstack/react-query';

const usePlayAudio = (audio: string) => {
  const playAudio = async () => {
    const track = new Audio(audio);
    await track.play();
  };
  return useQuery(['track', audio], playAudio, {
    refetchOnWindowFocus: false,
  });
};

export default usePlayAudio;
