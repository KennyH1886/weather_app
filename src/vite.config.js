import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': process.env,  // This makes sure the environment variables are passed properly
  },
});
