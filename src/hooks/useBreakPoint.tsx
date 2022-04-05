import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const useBreakPoint = () => {
  const [mounted, setMounted] = useState(false);
  const [isLargerThan900] = useMediaQuery('(min-width: 900px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? isLargerThan900 : null;
};

export default useBreakPoint;
