import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useCallback, useEffect } from "react";

const COMMENTS_ID = "comments-container";

const Giscus = (): JSX.Element => {
  const { colorMode } = useColorMode();

  const LoadComments = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "junghyeonsu/junghyeonsu.dev.comment");
    script.setAttribute("data-repo-id", "R_kgDOHH1JSg");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOHH1JSs4COp9e");
    script.setAttribute("data-mapping", "title");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-theme", colorMode === "dark" ? "dark_dimmed" : "light_protanopia");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [colorMode]);

  // Reload on theme change
  useEffect(() => {
    LoadComments();
  }, [LoadComments]);

  return <Box mt="100px" className="giscus" id={COMMENTS_ID} />;
};

export default Giscus;
