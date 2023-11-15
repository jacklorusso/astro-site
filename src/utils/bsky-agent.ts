import { BskyAgent } from "@atproto/api";

export const agent = new BskyAgent({
  // AppView URL
  service: "https://api.bsky.app",
});
