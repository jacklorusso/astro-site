// Workaround for commonjs issue in prod builds
import * as AtProtoPkg from "@atproto/api";

export const agent = new AtProtoPkg.BskyAgent({
  // AppView URL
  service: "https://api.bsky.app",
});
