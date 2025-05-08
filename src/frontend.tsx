/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { App } from "./App";

const tag = "lunchtime-check";
navigator.serviceWorker
  .register("./sw.js")
  .then(async (registration) => {
    // @ts-expect-error
    await registration.periodicSync.register(tag, {
      minInterval: 60 * 1000,
    });
    await Notification.requestPermission();
  })
  .catch(console.error);

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
