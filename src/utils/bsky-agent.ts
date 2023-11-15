import * as atproto from "@atproto/api";

export const agent = new atproto.BskyAgent({
  // AppView URL
  service: "https://api.bsky.app",
});

// https://github.com/withastro/astro/issues/3174
// https://github.com/bluesky-social/atproto/issues/330#issuecomment-1536562004
