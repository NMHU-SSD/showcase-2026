import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url))


//get projects
function getProjects() {
  const entries: Record<string, string> = {};
  const projectsDir = path.resolve(__dirname, 'public', 'projects');

  // Read directories in 'projects'
  fs.readdirSync(projectsDir).forEach(dir => {
    const indexPath = path.resolve(projectsDir, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
      entries[dir] = indexPath;
    }
  });

  return entries;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
     input:  getProjects(),
     
     
      
    }
  }
})
