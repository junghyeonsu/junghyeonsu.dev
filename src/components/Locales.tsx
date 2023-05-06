import { Flex, Text } from "@chakra-ui/react";
import { Link } from "gatsby";

interface LocalesProps {
  currentLocale: string;
  currentSlug: string;
  locales: readonly string[];
}

const Locales = ({ currentLocale, locales, currentSlug }: LocalesProps) => {
  return (
    <Flex alignItems="center" gap={2}>
      <Text fontSize={16} fontWeight="800" color="black.900">
        Locales:
      </Text>
      <Flex overflow="hidden" width="100%" gap={2} fontSize={12}>
        {locales.map((locale) => {
          const to = locale === "ko" ? `/posts/${currentSlug}` : `/${locale}/posts/${currentSlug}`;

          if (locale === currentLocale) {
            return (
              <Text fontSize={16} fontWeight="600" textDecoration="underline" color="black.900">
                {locale}
              </Text>
            );
          }

          return (
            <Link to={to}>
              <Text fontSize={16} color="black.900">
                {locale}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Locales;
