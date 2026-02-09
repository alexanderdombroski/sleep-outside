import { loadEnvFile } from "node:process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Load environment variables for tests
const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  loadEnvFile(join(__dirname, "packages", "backend", ".env"));
} catch {
  // eslint-disable-next-line no-console
  console.warn("Failed to load env file");
}
