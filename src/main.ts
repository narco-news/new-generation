//
//     main.ts
//
// // // // // // // // // // //
//
// Import CSS styles
import '../node_modules/normalize.css/normalize.css'
import '../src/styles/main.css'
import reframe from 'reframe.js'
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
import VLazyImage from 'v-lazy-image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
import { useGhostStore } from './stores/ghost'
//
//
// i18n
import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from '~/locales'

// Ghost keys
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI

// Dayjs relativeTime plugin
dayjs.extend(relativeTime)
// reframe
// reframe('iframe')

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
  app.use(pinia).use(head).use(MotionPlugin).component(VLazyImage)
  //
  // Create <ClientOnly> component
  app.component(ClientOnly.name, ClientOnly)

  //
  // Load language asyncrhonously to avoid bundling all languages
  await installI18n(app, extractLocaleFromPath(initialRoute.href))

  // Check language to get correct tag for Ghost
  const locale = extractLocaleFromPath(initialRoute.href)
  const filter = ref()
  if (locale === 'es')
    filter.value = 'hash-es'
  else
    filter.value = '-hash-es'

  //
  // IF CLIENT
  // if (isClient) {
  // // if (import.meta.env.SSR) {
  //   pinia.state.value = initialState.pinia
  //   useGhostStore(pinia)
  //   //
  //   // ######################
  //   await axios.get(
  //     `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:${filter.value}&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,custom_excerpt`,
  //   )
  //     .then((response) => {
  //       pinia.state.value.ghostStore.allArticles = response.data.posts
  //       pinia.state.value.ghostStore.latestArticles = response.data.posts
  //       pinia.state.value.ghostStore.allTagArticles = response.data.posts
  //       pinia.state.value.ghostStore.allAuthorArticles = response.data.posts
  //     })

  //   // ######################
  //   router.beforeEach(() => {
  //     useGhostStore(pinia)
  //     NProgress.start()
  //   })
  //   router.afterEach(() => { NProgress.done() })
  // }

  // else {
  //   initialState.pinia = pinia.state.value
  //   // useGhostStore(pinia)
  // }

  if (import.meta.env.SSR) {
    initialState.pinia = pinia.state.value
  }
  else {
    pinia.state.value = initialState.pinia
    useGhostStore(pinia)
    // ######################
    await axios.get(
      `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:${filter.value}&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,custom_excerpt`,
    )
      .then((response) => {
        pinia.state.value.ghostStore.allArticles = response.data.posts
        pinia.state.value.ghostStore.latestArticles = response.data.posts
        pinia.state.value.ghostStore.allTagArticles = response.data.posts
        pinia.state.value.ghostStore.allAuthorArticles = response.data.posts
      })

    // ######################
    router.beforeEach(() => {
      // useGhostStore(pinia)
      NProgress.start()
    })
    router.afterEach(() => { NProgress.done() })
  }

  return {
    head,
  }
})
