import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import UnoCSS from "unocss/vite";

function vitePluginAddScriptVersion() {
  return {
    name: "vite-plugin-add-script-version",
    transformIndexHtml(html: string) {
      const timestamp = Date.now();
      return html.replace(
        /(<script\s+.*?src=")(\/iframe\.min\.js)(".*?>)/g,
        `$1$2?v=${timestamp}$3`
      );
    },
  };
}
export default defineConfig({
  envDir: "./env",
  server: {
    port: 80,
    host: true,
  },
  plugins: [react(), UnoCSS(), vitePluginAddScriptVersion()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
