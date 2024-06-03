import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/components/index.js', // Entry point of your library
      name: 'CustomerGluComponents',
      fileName: (format) => `customerglu-components.${format}.js`,
      formats: ['es', 'cjs', 'umd'], // Formats to generate
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Exclude peer dependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
