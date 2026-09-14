import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  external: [
    "@noncegate/adapters",
    "@noncegate/core",
    "@noncegate/services",
    "undici",
  ],
});
