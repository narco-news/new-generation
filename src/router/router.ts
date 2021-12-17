import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/NotFound.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('~/pages/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('~/pages/About.vue'),
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('~/pages/Library.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('~/pages/Map.vue'),
  },
  {
    path: '/wire',
    name: 'Wire',
    component: () => import('~/pages/Wire.vue'),
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('~/pages/Articles_old.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'Article',
    component: () => import('~/pages/Article.vue'),
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import('~/pages/Authors.vue'),
  },
  {
    path: '/authors/:slug',
    name: 'Author',
    component: () => import('~/pages/Author.vue'),
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('~/pages/Tags.vue'),
  },
  {
    path: '/tags/:slug',
    name: 'Tag',
    component: () => import('~/pages/Tags.vue'),
  },
]
