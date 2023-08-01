import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/variables" as var; @use "./src/styles/mixins" as mix;`,
      },
    },
  },
  base: "/tic-tac-toe__vue/",
  plugins: [vue()],
});
