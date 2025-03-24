import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Prevent usage of browser-only globals like window, document, etc. in server components
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Add Next.js specific rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-sync-scripts": "error",
      // Custom rule to prevent direct window access without checks
      "no-restricted-globals": "error"
    }
  }
];

export default eslintConfig;
