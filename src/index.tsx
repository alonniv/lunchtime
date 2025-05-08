import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/*": index,
    "/sw.js": () =>
      new Response(Bun.file("./public/sw.js"), {
        headers: {
          "Content-Type": "text/javascript",
        },
      }),
    "/favicon-192.png": () =>
      new Response(Bun.file("./public/favicon-192.png")),
    "/favicon-512.png": () =>
      new Response(Bun.file("./public/favicon-512.png")),
    "/favicon.ico": () => new Response(Bun.file("./public/favicon.ico")),
    "/manifest.json": () =>
      new Response(Bun.file("./manifest.json"), {
        headers: {
          "Content-Type": "application/json",
        },
      }),
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});
