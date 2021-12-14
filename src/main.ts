//
//     main.ts
//
// // // // // // // // // // //
//
// Import CSS styles
import '../node_modules/normalize.css/normalize.css'
import '../node_modules/hover.css/css/hover-min.css'
import '../node_modules/animate.css/animate.min.css'
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
//
// Routes
import { routes } from '~/router/router'

//
// Set Ghost creds
const ghost = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URI,
  key: import.meta.env.VITE_GHOST_KEY,
  version: 'v3',
})

//
// Declare options
const Options: Parameters<typeof viteSSR>['1'] = {
  routes,
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
  const { app, initialState, isClient, router } = params
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
