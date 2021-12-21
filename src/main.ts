//
//     main.ts
//
// // // // // // // // // // //
//
// Import CSS styles
import '../node_modules/normalize.css/normalize.css'
import '../node_modules/animate.css/animate.min.css'
import '../node_modules/hover.css/css/hover-min.css'
// import '../node_modules/pattern.css/dist/pattern.min.css'
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
// Ghost Content API
import GhostContentAPI from '@tryghost/content-api'
//
// NProgress loading indicator
import NProgress from 'nprogress'
//
// Layouts
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
//
//
// i18n
import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from '~/locales'

// Routes
// import { routes } from '~/router/router'
const routes = setupLayouts(generatedRoutes)

//
// Set Ghost creds
const ghost = new GhostContentAPI({
  url: String(import.meta.env.VITE_GHOST_URI),
  key: String(import.meta.env.VITE_GHOST_KEY),
  version: 'v3',
})

//
// Declare options
const Options: Parameters<typeof viteSSR>['1'] = {
  routes,
  base: ({ url }) => {
    const locale = extractLocaleFromPath(url.pathname)
    return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
  },
  pageProps: {
    passToPage: false,
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
  app.use(pinia).use(head)

  //
  // Create <ClientOnly> component
  app.component(ClientOnly.name, ClientOnly)

  app.provide('initialState', initialState)
  //
  // Load language asyncrhonously to avoid bundling all languages
  await installI18n(app, extractLocaleFromPath(initialRoute.href))

  if (isClient) {
    router.beforeEach(() => { NProgress.start() })
    router.afterEach(() => { NProgress.done() })
    //
    // Grab article before /articles/:slug
    router.beforeEach(async(to) => {
      if (to.matched[0].path === '/articles/:slug') {
        const article = await ghost.posts.read({
          slug: String(to.params.slug),
        })
        initialState.currentArticle = article
      }
    })
    //
    // Get all articles and put them into the store
    const allArticles = await ghost.posts.browse({
      limit: 'all',
      include: ['authors', 'tags'],
      fields: 'slug, title, featured, feature_image, primary_author, published_at, excerpt, custom_excerpt, reading_time',
    })
    initialState.pinia.articles = allArticles
    pinia.state.value = initialState.pinia
  }

  else { initialState.pinia = pinia.state.value }
  return {
    head,
  }
})
