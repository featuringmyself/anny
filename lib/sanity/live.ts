import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { token } from "./token";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "2026-09-12" }),
  serverToken: token || false,
  browserToken: token || false,
});
