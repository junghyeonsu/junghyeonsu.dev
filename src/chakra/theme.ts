import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import global from "./global";
import semanticTokens from "./semanticTokens";

const theme = {
  styles: {
    global,
  },
  colors,
  semanticTokens: {
    colors: semanticTokens,
  },
  breakpoints: {
    // base: ~ 320px,
    sm: "320px", // 320px ~ 768px
    md: "768px", // 768px ~ 960px
    lg: "960px", // 960px ~ 1200px
    xl: "1200px", // 1200px ~ 1536px
    "2xl": "1536px", // 1536px ~
  },
};

export default extendTheme(theme);
