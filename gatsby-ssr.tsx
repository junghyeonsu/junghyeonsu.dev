import type { WrapPageElementNodeArgs } from "gatsby";
import React from "react";

import Root from "./src/Root";

export const wrapPageElement = ({ element }: WrapPageElementNodeArgs) => {
  return <Root>{element}</Root>;
};
