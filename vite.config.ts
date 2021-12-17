import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import SSR from 'vite-ssr/plugin'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import ViteFonts from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    target: 'es2015',
    outDir: './_app/dist',
  },
  plugins: [
    vue(),
    SSR(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      // custom resolvers
      resolvers: [
      ],
      dts: 'src/components.d.ts',
    }),
    Pages({
      extensions: ['vue'],
    }),
    Layouts(),
    VueI18n({
      include: [path.resolve(__dirname, 'src/locales/translations/**')],
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Oswald',
            styles: 'wght@400;500;600;700'
          },
          {
            name: 'Noto Serif',
            styles: 'ital,wght@0,400;0,700;1,400;1,700'
          },
          {
            name: 'Noto Serif Display',
            styles: 'ital,wght@0,400;0,500;0,700;1,400;1,500;1,700'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'animate.css',
      'hover.css',
    ],
  },
})
