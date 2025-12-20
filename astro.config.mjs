import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import {
  transformerNotationHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

export default defineConfig({
  site: "https://junghyeonsu.com",
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      transformers: [
        transformerNotationHighlight(),
        transformerNotationDiff(),
      ],
    },
  },
  image: {
    // Skip processing for GIF files to avoid pixel limit errors with large animated GIFs
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },
});
