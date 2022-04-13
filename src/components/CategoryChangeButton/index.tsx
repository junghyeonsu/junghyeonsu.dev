import { Dispatch, SetStateAction } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  category: string;
  currentCategory: string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
}

const CategoryChangeButton = ({ category, currentCategory, setCurrentCategory }: Props) => {
  const onClickButton = () => {
    if (category === '전체') {
      setCurrentCategory(category);
      return;
    }

    if (currentCategory === category) {
      setCurrentCategory('전체');
    } else {
      setCurrentCategory(category);
    }
  };

  return (
    <Button
      bgColor={currentCategory === category ? 'green.300' : 'none'}
      colorScheme={currentCategory === category ? 'green' : undefined}
      onClick={onClickButton}
      style={{ boxShadow: 'none' }}
    >
      {category}
    </Button>
  );
};

export default CategoryChangeButton;
