import { useEffect, useState } from 'react';

export interface useReadingTimeInterface {
  readingTime: number;
}

const ONE_MINUTE_READ_WORD = 400;

const useReadingTime = (post: string): useReadingTimeInterface => {
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    const time = Math.floor(
      post.replace(/\s/g, '').replace(/(?![^\](]\))\w|\d|%|\/|-+/g, '').length /
        ONE_MINUTE_READ_WORD,
    );

    setReadingTime(time);
  }, [post]);

  return {
    readingTime,
  };
};

export default useReadingTime;
