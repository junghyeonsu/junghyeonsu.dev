import type { WrapPageElementBrowserArgs } from "gatsby";
import React from "react";

import Root from "./src/Root";

export const wrapPageElement = ({ element }: WrapPageElementBrowserArgs) => {
  return <Root>{element}</Root>;
};
