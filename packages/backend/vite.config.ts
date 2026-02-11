import { join } from "node:path";
import { type UserConfig } from "vite";

export default {
  root: join(import.meta.dirname, ".."),
  build: {
    emptyOutDir: true,
    outDir: join(import.meta.dirname, "dist"),
    ssr: join(import.meta.dirname, "src", "server.ts"),
    minify: true,
    rollupOptions: {
      external: [""],
    },
  },
} satisfies UserConfig;
