import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    build: isLib
      ? {
        // 📦 LIBRARY BUILD
        lib: {
          entry: path.resolve(__dirname, "lib/index.ts"),
          name: "sanmo-ui",
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          external: ["react", "react-dom", "react-router-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react-router-dom": "ReactRouterDOM",
            },
          },
        },
        cssCodeSplit: true,
        sourcemap: true,
        emptyOutDir: true,
      }
      : {
        // 🌐 APP BUILD
        outDir: "dist",
        sourcemap: true,
        emptyOutDir: true,
      },
  };
});

