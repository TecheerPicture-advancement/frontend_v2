import { defineConfig } from 'vitest/config'; // Vitest의 defineConfig 사용
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',  // Vitest의 브라우저 환경 시뮬레이션
    globals: true,         // Jest와 비슷한 글로벌 API 사용
    setupFiles: './vitest.setup.ts', // 테스트 초기 설정 파일
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
