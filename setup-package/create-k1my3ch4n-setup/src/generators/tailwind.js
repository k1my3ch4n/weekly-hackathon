import fs from "fs-extra";
import path from "path";

export async function generateTailwind(targetDir, framework) {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    ${framework === "next" ? "'./app/**/*.{js,ts,jsx,tsx}'," : ""}
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
