import fs from "fs-extra";
import path from "path";

export async function generateTailwind(targetDir, framework) {
  const contentPaths =
    framework === "next"
      ? `'./src/**/*.{js,ts,jsx,tsx}'`
      : `'./index.html',\n    './src/**/*.{js,ts,jsx,tsx}'`;

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ${contentPaths}
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

  await fs.writeFile(path.join(targetDir, "tailwind.config.ts"), tailwindConfig);
  await fs.writeFile(path.join(targetDir, "postcss.config.js"), postcssConfig);
}
