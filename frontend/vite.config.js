// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })
///////////////////////////
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://property-app-care-2.onrender.com', // your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    'process.env': {}, // ensures compatibility with packages that use process.env (like OpenAI)
  },
});
///////////////////////////////////
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     // Patch for Firebase/OpenAI packages referencing `process.env`
//     'process.env': {}
//   },
//   server: {
//     port: 3000,
//   },
//   preview: {
//     port: 5000,
//   },
// });

