//
//     main.ts
//
// // // // // // // // // // //
//
// Import CSS styles
import '../node_modules/normalize.css/normalize.css'
// import '../node_modules/animate.css/animate.min.css'
import '../node_modules/hover.css/css/hover-min.css'
import '../src/styles/main.css'
//
// Pinia
import { createPinia } from 'pinia'
//
// createHead for <head> tag support
import { createHead } from '@vueuse/head'
//
// viteSSR
import { viteSSR, ClientOnly } from 'vite-ssr/vue'
//
// App.vue
import App from '/src/App.vue'
//
// Import devalue
import devalue from '@nuxt/devalue'
//
// NProgress loading indicator
import NProgress from 'nprogress'
//
//
//
// Layouts
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { MotionPlugin } from '@vueuse/motion'
import { useGhostStore } from './stores/ghost'

//
//
// i18n
import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from '~/locales'

// Routes
const routes = setupLayouts(generatedRoutes)

//
// Declare options
const Options: Parameters<typeof viteSSR>['1'] = {
  routes,
  base: ({ url }) => {
    const locale = extractLocaleFromPath(url.pathname)
    return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
  },
  transformState(state) {
    return import.meta.env.SSR ? devalue(state) : state
  },
  pageProps: {
    passToPage: false,
  },
  routerOptions: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      else {
        return {
          top: 0,
        }
      }
    },
  },
}

//
//
// viteSSR function
// // // // // // // // // // // // // //
export default viteSSR(App, Options, async(params) => {
  //
  // Declare params
  const { app, initialState, initialRoute, isClient, router } = params
  //
  // Declare head
  const head = createHead()
  //
  // Declare pinia
  const pinia = createPinia()

  //
  // Connect head and pinia to App
  app.use(pinia).use(head).use(MotionPlugin)

  //
  // Create <ClientOnly> component
  app.component(ClientOnly.name, ClientOnly)

  //
  // Load language asyncrhonously to avoid bundling all languages
  await installI18n(app, extractLocaleFromPath(initialRoute.href))

  if (isClient) {
    router.beforeEach(() => {
      NProgress.start()
      useGhostStore(pinia)
      // const store = useGhostStore(pinia)
    })
    router.afterEach(() => { NProgress.done() })
    pinia.state.value = initialState.pinia
  }

  else { initialState.pinia = pinia.state.value }

  return {
    head,
  }
})
