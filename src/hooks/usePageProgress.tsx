import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

const PROGRESS_UPDATE_FREQUENCY_TIME_TO_MS = 200;

export interface usePageProgressInterface {
  progress: number;
}

const usePageProgress = (): usePageProgressInterface => {
  const [progress, setReadingTime] = useState<number>(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight || document.body.scrollHeight;
    const percent = (scrollTop / (scrollHeight - el.clientHeight)) * 100;
    setReadingTime(percent);
    console.log(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(scrollHeight, PROGRESS_UPDATE_FREQUENCY_TIME_TO_MS));
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);

  return {
    progress,
  };
};

export default usePageProgress;
