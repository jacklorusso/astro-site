import { defineConfig, sharpImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import remarkUnwrapImages from "remark-unwrap-images";
import { remarkReadingTime } from "./src/utils/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: "https://jacklorusso.com/",
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  image: {
    // https://docs.astro.build/en/guides/assets/#using-sharp
    service: sharpImageService(),
    domains: ["webmention.io"],
  },
  integrations: [
    mdx({}),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    prefetch(),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
