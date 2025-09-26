import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/adherence-tracking': 'http://localhost:8787',
      '/proactive-outreach': 'http://localhost:8787',
      '/identity-verification': 'http://localhost:8787',
      '/compliance-plus': 'http://localhost:8787',
      '/testimonials': 'http://localhost:8787',
      '/agent-config': 'http://localhost:8787',
      '/agent-orchestration': 'http://localhost:8787',
      '/rag-knowledge': 'http://localhost:8787',
      '/auth': 'http://localhost:8787',
      '/insurance': 'http://localhost:8787',
      '/adherence': 'http://localhost:8787',
      '/interactions': 'http://localhost:8787',
      '/prior-auth': 'http://localhost:8787',
      '/clinical': 'http://localhost:8787',
      '/knowledge': 'http://localhost:8787',
      '/compliance': 'http://localhost:8787',
      '/payments': 'http://localhost:8787',
      '/roi': 'http://localhost:8787',
      '/omni': 'http://localhost:8787'
    }
  }
});
