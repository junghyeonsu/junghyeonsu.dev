import type { IconButtonProps } from "@chakra-ui/react";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";

import DarkModeRSS from "./DarkModeRSS";
import LightModeRSS from "./LightModeRSS";

type ThemeModeTogglerProps = Omit<IconButtonProps, "aria-label">;

const Rss: React.FC<ThemeModeTogglerProps> = () => {
  const { colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(DarkModeRSS, LightModeRSS);

  return (
    <Link to="/rss.xml">
      <IconButton
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="2xl"
        borderRadius="3xl"
        variant="unstyled"
        icon={<SwitchIcon />}
        _hover={{
          bg: colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200",
        }}
        _active={{ bg: "transparent" }}
        aria-label="darkmode toggle button"
      />
    </Link>
  );
};

export default Rss;
