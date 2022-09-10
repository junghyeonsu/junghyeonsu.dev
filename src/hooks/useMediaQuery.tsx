import { useMediaQuery as chakraUseMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export interface useMediaQueryProps {
  mounted: boolean;
  isLargerThan900: boolean;
  isLargerThan1400: boolean;
}

const useMediaQuery = (): useMediaQueryProps => {
  const [mounted, setMounted] = useState(false);
  const [isLargerThan900] = chakraUseMediaQuery('(min-width: 900px)');
  const [isLargerThan1400] = chakraUseMediaQuery('(min-width: 1400px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  return { isLargerThan1400, isLargerThan900, mounted };
};

export default useMediaQuery;
