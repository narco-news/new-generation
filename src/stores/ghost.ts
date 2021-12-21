import { defineStore, acceptHMRUpdate } from 'pinia'
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
    listLatestArticles(state) {
      return (amount: number) => state.allArticles.slice(0, amount)
    },
    listFeaturedFourArticles(state) {
      return state.allArticles.filter((article: Article) => article.featured === true).slice(0, 4)
    },
    listOpinionArticles(state) {
      return state.allArticles.filter((article) => {
        return article.tags.find(tag => tag.slug === 'opinion')
      }).slice(0, 6)
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

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGhostStore, import.meta.hot))
