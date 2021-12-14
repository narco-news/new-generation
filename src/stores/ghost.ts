import { defineStore } from 'pinia'
import GhostContentAPI from '@tryghost/content-api'
import { Tags } from '../types'

export const ghost = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URI,
  key: import.meta.env.VITE_GHOST_KEY,
  version: 'v3',
})

export const useGhostStore = defineStore({
  id: 'ghostStore',
  state: () => ({
    latestPosts: {},
    currentPost: {},
    tags: <Tags>[],
    selectedTags: [],
    selectedTagArticles: [],
  }),
  getters: {
    listPosts(state) {
      return state.latestPosts
    },
    listPost(state) {
      return state.currentPost
    },
    listTags(state) {
      return state.tags
    },
    listSelectedTags(state) {
      return state.selectedTags
    },
    listSelectedTagArticles(state) {
      return state.selectedTagArticles
    },
  },
  actions: {
    async getPosts() {
      try {
        const posts = await ghost.posts.browse({
          limit: 10,
          include: ['tags', 'authors'],
          filter: 'featured:false+tag:-translation+tag:-hash-es',
        })
        this.latestPosts = posts
      }
      catch (error) {
        console.error(error)
      }
    },
    async getPost(postSlug: string) {
      try {
        const post = await ghost.posts.read({
          slug: postSlug,
        })
        this.currentPost = post
      }
      catch (error) {
        console.error(error)
      }
    },
    //
    // Tags page
    async getTags() {
      this.tags = await ghost.tags.browse({
        filter: 'visibility:public',
        include: 'count.posts',
      })
    },
    async addSelectedTag(slugToAdd: string) {
      this.selectedTags.push(slugToAdd)
      this.getTagArticles()
    },
    async removeSelectedtag(slugToRemove: string) {
      this.selectedTags = this.selectedTags.filter(slug => slug !== slugToRemove)
      if (this.selectedTags.length === 0)
        this.selectedTagArticles = []
      else
        this.getTagArticles()
    },
    async getTagArticles() {
      this.selectedTagArticles = await ghost.posts.browse({
        limit: 9,
        filter: `tags:[${this.selectedTags}]`,
      })
    },
  },
})
