import { defineConfig, sharpImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkUnwrapImages from "remark-unwrap-images";
import smartypants from "remark-smartypants";
import { remarkReadingTime } from "./src/utils/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: "https://jacklorusso.com/",
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime, smartypants],
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
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  // vite: {
  //   // ssr: {
  //   //   noExternal: ["@atproto/api"],
  //   // },
  //   optimizeDeps: {
  //     exclude: ["@resvg/resvg-js"],
  //   },
  // },
});
