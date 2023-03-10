import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest.json';
import packageJson from './package.json';
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite';

manifest.version = packageJson.version;

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['webextension-polyfill'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    vue(),
    crx({ manifest }),
    ElementPlus(),
    // AutoImport({
    //   resolvers: [
    //     ElementPlusResolver(),

    //     // Auto import icon components
    //     // 自动导入图标组件
    //     IconsResolver({
    //       prefix: 'Icon',
    //     }),
    //   ],
    // }),
    // Components({
    //   resolvers: [
    //     // Auto register icon components
    //     // 自动注册图标组件
    //     IconsResolver({
    //       enabledCollections: ['ep'],
    //     }),
    //     // Auto register Element Plus components
    //     // 自动导入 Element Plus 组件
    //     ElementPlusResolver(),
    //   ],
    // }),
    // Icons({
    //   autoInstall: true,
    //   compiler: 'vue3',
    // }),
  ],
});
