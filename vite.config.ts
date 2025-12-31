import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { analyzer } from 'vite-bundle-analyzer'
import { unstableRolldownAdapter } from 'vite-bundle-analyzer'


export default defineConfig({
  plugins: [svelte(), unstableRolldownAdapter(analyzer())],
});
