import { useEffect, useState } from 'react';

export interface useReadingTimeInterface {
  readingTime: number;
}

const useReadingTime = (post: string): useReadingTimeInterface => {
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    setReadingTime(Math.floor(post.replace(/\s/g, '').length / 300));
  }, [post]);

  return {
    readingTime,
  };
};

export default useReadingTime;
