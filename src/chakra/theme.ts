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
};

export default extendTheme(theme);
