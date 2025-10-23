import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      i18n: path.resolve(__dirname, "i18n"),
      services: path.resolve(__dirname, "services"),
      components: path.resolve(__dirname, "components"),
      utils: path.resolve(__dirname, "utils"),
      styles: path.resolve(__dirname, "styles"),
      data: path.resolve(__dirname, "data"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    environmentOptions: { jsdom: { url: "http://localhost/" } },
    setupFiles: ["./vitest.setup.tsx"],
    css: true,
    testTimeout: 10000,
    exclude: [
      "tests/e2e/**",
      "**/*.spec.*",
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/coverage/**",
      "**/public/**",
      "**/styles/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov"],
      reportsDirectory: "coverage",
      include: ["app/**", "components/**", "utils/**", "services/**"],
      exclude: [
        "tests/e2e/**",
        "**/node_modules/**",
        "**/.next/**",
        "**/dist/**",
        "**/*.d.ts",
        "**/*.test.*",
        "**/*.spec.*",
        "**/vitest.config.*",
        "**/vite.config.*",
        "**/coverage/**",
        "**/public/**",
        "**/styles/**",
      ],
    },
  },
});
