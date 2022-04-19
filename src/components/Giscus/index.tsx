import Giscus from '@giscus/react';
import { useColorMode } from '@chakra-ui/react';

const GiscusComponent = (): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="comments"
      repo="junghyeonsu/junghyeonsu.dev.comment"
      repoId="R_kgDOHH1JSg"
      category="Announcements"
      categoryId="DIC_kwDOHH1JSs4COp9e"
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={colorMode === 'dark' ? 'dark_dimmed' : 'light_protanopia'}
      lang="ko"
    />
  );
};

export default GiscusComponent;
