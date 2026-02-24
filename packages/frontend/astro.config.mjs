// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

const production = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  output: "static",
  publicDir: "./public",
  base: production ? "/sleep-outside/" : undefined,
  integrations: [svelte()],
  vite: {
    build: {
      emptyOutDir: true,
    },
  },
});
