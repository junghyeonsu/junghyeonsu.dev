import { Heading, Text } from '@chakra-ui/react';

type headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface CustomHeadingProps {
  children: React.ReactNode;
  level: headings;
}

const CustomHeading = ({ children, level }: CustomHeadingProps) => {
  const headingHref = children?.toString().split(' ').join('-');

  return (
    <Heading css={{ '&:hover a': { display: 'inline' } }} id={headingHref} as={level}>
      {children}{' '}
      <Text display="none" as="a" href={`#${headingHref}`} aria-label={headingHref}>
        #
      </Text>
    </Heading>
  );
};

export default CustomHeading;
