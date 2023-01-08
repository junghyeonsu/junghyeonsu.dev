import { defineStyleConfig } from "@chakra-ui/react";

// define the base component styles
const baseStyle = {
  borderRadius: "md", // add a border radius
  fontWeight: "light", // change the font weight
  fontSize: "12px", // change the font size
  backgroundColor: "gray.50", // change the background color
  color: "gray.900", // change the text color
};

// export the component theme
export const tooltipTheme = defineStyleConfig({ baseStyle });

export default {
  Tooltip: tooltipTheme,
};
