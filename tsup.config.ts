import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/views/**"],
  format: ["esm"],
  minify: true,
  treeshake: true,
  tsconfig: "./tsconfig.json",
});
