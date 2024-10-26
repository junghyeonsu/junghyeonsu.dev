import { Box, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import * as React from "react";

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
}

export const InternalLink: React.FC<InternalLinkProps> = ({ to, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [ogImage, setOgImage] = React.useState<string | null | undefined>(null);
  const [title, setTitle] = React.useState<string | null | undefined>(null);

  React.useEffect(() => {
    (async () => {
      // fetch page data and get og:image
      const response = await fetch(`${document.location.origin}${to}`);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const ogImage = doc.querySelector("meta[property='og:image']");
      const content = ogImage?.getAttribute("content");
      const title = doc.querySelector("title")?.textContent;
      setOgImage(content);
      setTitle(title);
    })();
  }, [to]);

  React.useEffect(() => {
    (async () => {
      // fetch page data and get og:image
      const response = await fetch("https://github.com/daangn/icona");
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const ogImage = doc.querySelector("meta[property='og:image']");
      const content = ogImage?.getAttribute("content");
      const title = doc.querySelector("title")?.textContent;
      console.log(content);
      console.log(title);
    })();
  }, [to]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Popover isOpen={isHovered} placement="bottom-start">
      <PopoverTrigger>
        <Box
          display="inline"
          as="a"
          _hover={{
            textDecoration: "underline",
          }}
          fontWeight="600"
          color="blue.400"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          href={`${document.location.origin}${to}`}
          target="_blank"
        >
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent maxWidth="300px" p={2}>
        {ogImage && <img loading="lazy" src={ogImage} alt="og-image" />}
        {title && <Box fontWeight="700">{title}</Box>}
      </PopoverContent>
    </Popover>
  );
};
