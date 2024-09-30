import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: 'local.p.ssafy.io', // 원하는 도메인으로 변경
    port: 5173, // 원하는 포트
  },
});
