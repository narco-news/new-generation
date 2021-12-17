//
//     main.ts
//
// // // // // // // // // // //
//
// Import CSS styles
import '../node_modules/normalize.css/normalize.css'
import '../node_modules/animate.css/animate.min.css'
import '../node_modules/hover.css/css/hover-min.css'
import '../node_modules/pattern.css/dist/pattern.min.css'
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

  //
  // Load language asyncrhonously to avoid bundling all languages
  await installI18n(app, extractLocaleFromPath(initialRoute.href))

  //
  // Load state if client
  if (isClient) {
    pinia.state.value = initialState.pinia
    router.beforeEach(() => { NProgress.start() })
    router.afterEach(() => { NProgress.done() })
  }

  else {
    initialState.pinia = pinia.state.value
  }

  //
  // Grab articles from Ghost API and put them into store
  try {
    const allArticles = await ghost.posts.browse({
      limit: 'all',
      include: ['authors', 'tags'],
      fields: 'slug, title, featured, feature_image, primary_author',
      // fields: 'slug,title,tags,primary_author,feature_image,published_at,excerpt,custom_excerpt,featured',
    })
    initialState.pinia.ghostStore = {
      allArticles,
    }
  }
  catch (error) {
    console.error(error)
  }
  //
  //
  // Make changes before route changes
  router.beforeEach(async(to, from, next) => {
    if (!!to.meta.state && (!import.meta.env.DEV || import.meta.env.SSR)) {
      // This route has state already (from server) so it can be reused.
      return next()
    }

    // Call ghost API server-side in order to grab article content
    // inbetween routes.
    // if (to.matched[0].path === '/articles/:slug') {
    //   try {
    //     const post = await ghost.posts.read({
    //       slug: to.params.slug,
    //     })
    //     // Set API response to value in ghostStore
    //     // to.meta.state.ghostStore
    //     // pinia.state.value.ghostStore
    //     // to.meta.state = post
    //     if (pinia)
    //       to.meta.state.pinia.ghostStore.currentPost = post
    //   }
    //   catch (error) {
    //     console.log(error)
    //   }
    next()
  })

  return {
    head,
  }
})
