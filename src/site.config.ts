interface SiteConfig {
  author: string;
  title: string;
  description: string;
  lang: string;
  ogLocale: string;
  themeColorLight: string;
  themeColorDark: string;
  date: {
    locale: string | string[] | undefined;
    options: Intl.DateTimeFormatOptions;
  };
  webmentions?: {
    link: string;
  };
}

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Jack Lo Russo",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "jacklorusso.com",
  // Meta property used as a default description meta property
  description: "Jack Lo Russo is a software engineer from Sydney, Australia.",
  // HTML lang property, found in src/layouts/Base.astro
  lang: "en-AU",
  // Meta property, found in src/components/BaseHead.astro
  ogLocale: "en_AU",
  // Sets the meta data theme-color, found in src/components/BaseHead.astro L:34. Toggling the dark mode will update the meta content with either light/dark color, implementation in src/layouts/Base.astro.
  themeColorLight: "#ffffff",
  themeColorDark: "#000000",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-AU",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  // Webmentions
  webmentions: {
    link: "https://webmention.io/jacklorusso.com/webmention",
  },
};
