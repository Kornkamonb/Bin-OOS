import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifestForPlugIn: Partial<VitePWAOptions> = {
  // registerType: "prompt" as const,
  registerType: "autoUpdate", // ตั้งค่าให้ Service Worker อัปเดตอัตโนมัติ
  devOptions: {
    enabled: true, // เปิดใช้งาน PWA ระหว่างการพัฒนา (optional)
  },
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "React-template-typescript",
    short_name: "template-typescript",
    description: "I am a React-template-typescript",
    icons: [
      {
        src: "/public/icon/FujiLogo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/public/icon/FujiLogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/public/icon/FujiLogo.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/public/icon/FujiLogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn), tailwindcss(),
  ],
  base: "/template-typescript",
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   port: 3000,
  //   open: true,
  // },
});
