import * as atproto from "@atproto/api";

export const agent = new atproto.BskyAgent({
  // AppView URL
  service: "https://api.bsky.app",
});
