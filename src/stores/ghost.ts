import { defineStore } from 'pinia'
import GhostContentAPI from '@tryghost/content-api'
import { Tags } from '../types'

export const ghost = new GhostContentAPI({
  url: String(import.meta.env.VITE_GHOST_URI),
  key: String(import.meta.env.VITE_GHOST_KEY),
  version: 'v3',
})

export const useGhostStore = defineStore({
  id: 'ghostStore',
  state: () => ({
    allArticles: [],
    tags: <Tags>[],
    selectedTags: [],
    selectedTagArticles: [],
  }),
  getters: {
    listAllArticles(state) {
      return state.allArticles
    },
    listFeaturedFourArticles(state) {
      return state.allArticles.filter((article) => article.featured === true).slice(0, 4)
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
    async getAllArticles() {
      try {
        this.allArticles = await ghost.posts.browse({
          limit: 'all',
          fields: 'slug,title,tags,primary_author,feature_image,published_at,excerpt,custom_excerpt,featured',
        })
      }
      catch (error) {
        console.error(error)
      }
    },
    // async getPosts() {
    //   try {
    //     const posts = await ghost.posts.browse({
    //       limit: 10,
    //       include: ['tags', 'authors'],
    //       filter: 'featured:false+tag:-translation+tag:-hash-es',
    //     })
    //     this.latestPosts = posts
    //   }
    //   catch (error) {
    //     console.error(error)
    //   }
    // },
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
