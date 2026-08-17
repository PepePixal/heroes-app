import path from "path"
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from 'vitest/config';
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

//import { defineConfig } from 'vite'
import babel from '@rolldown/plugin-babel'

// import react from '@vitejs/plugin-react-swc';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },

});
