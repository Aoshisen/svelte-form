import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte({emitCss: false})],
  build: {
    lib: {
      entry: {
        main: path.resolve(__dirname, 'src/main.ts'),
        form: path.resolve(__dirname, 'src/lib/Form.svelte'),
        form_item: path.resolve(__dirname, 'src/lib/FormItem.svelte'),
        input: path.resolve(__dirname, 'src/lib/Input.svelte')
      },
      formats: ['es'],
    },
    emptyOutDir: true,
  }
});