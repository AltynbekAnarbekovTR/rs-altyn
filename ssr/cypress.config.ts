import { defineConfig } from 'cypress';
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      coverage(on, config);

      return config;
    },
  },
});
