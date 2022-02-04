import { defineStore, acceptHMRUpdate } from 'pinia'
import GhostContentAPI, { PostOrPage } from '@tryghost/content-api'

export const ghost = new GhostContentAPI({
  url: String(import.meta.env.VITE_GHOST_URI),
  key: String(import.meta.env.VITE_GHOST_KEY),
  version: 'v3',
})

export const useGhostStore = defineStore({
  id: 'ghostStore',
  state: () => ({
    allArticles: [],
    latestArticles: [],
    maxLatest: 12,
    allTagArticles: [],
    maxTagArticles: 12,
    allAuthorArticles: [],
    maxAuthorArticles: 12,

  }),
  getters: {
    listArticle(state) {
      return (articleSlug: string) => state.allArticles.filter(article => article.slug === articleSlug)
    },
    // List all articles unfiltered
    listAllArticles(state) {
      return state.allArticles
    },
    listLatestArticles(state) {
      return state.latestArticles
        .filter((article: PostOrPage) => {
          return !article.tags?.find(tag =>
            tag.slug === 'translation',
          )
            && !article.tags?.find(tag =>
              tag.slug === 'around-the-web',
            )
            && !article.tags?.find(tag =>
              tag.slug === 'opinion',
            )
        })
        .slice(0, state.maxLatest)
    },
    // List latest four featured articles
    listFeaturedFourArticles(state) {
      return state.allArticles.filter((article: PostOrPage) => article.featured === true).slice(0, 4)
    },
    // List latest 6 articles tagged opinion
    listOpinionArticles(state) {
      return state.allArticles.filter((article: PostOrPage) => {
        return article.tags?.find(tag => tag.slug === 'opinion')
      }).slice(0, 6)
    },
    // List latest translation articles
    listTranslationArticles(state) {
      return state.allArticles.filter((article: PostOrPage) => {
        return article.tags?.find(tag => tag.slug === 'translation')
      }).slice(0, 6)
    },
    // List latest ATW
    listAroundTheWebArticles(state) {
      return state.allArticles.filter((article: PostOrPage) => {
        return article.tags?.find(tag => tag.slug === 'around-the-web')
      }).slice(0, 6)
    },
    listLatestFive(state) {
      return state.allArticles
        .filter((article: PostOrPage) => {
          return !article.tags?.find(tag =>
            tag.slug === 'translation',
          )
            && !article.tags?.find(tag =>
              tag.slug === 'around-the-web',
            )
            && !article.tags?.find(tag =>
              tag.slug === 'opinion',
            )
        })
        .slice(0, 5)
    },
    listLatestList(state) {
      return state.allArticles
        .filter((article: PostOrPage) => {
          return !article.tags?.find(tag =>
            tag.slug === 'translation',
          )
            && !article.tags?.find(tag =>
              tag.slug === 'around-the-web',
            )
            && !article.tags?.find(tag =>
              tag.slug === 'opinion',
            )
        })
        .slice(5, 13)
    },
    //
    // Author articles
    listAuthorArticles(state) {
      return (authorSlug: string) => state.allAuthorArticles.filter(article => article.primary_author.slug === authorSlug).slice(0, state.maxAuthorArticles)
    },
    listMaxAuthorArticles(state) {
      return state.maxAuthorArticles
    },
    //
    // Tags
    listTagArticles(state) {
      return (tagSlug: string, articlesAmount: number) => state.allTagArticles
        .filter((article) => {
          return article.tags?.find(tag => tag.slug === tagSlug)
        }).slice(0, articlesAmount)
    },
    listMaxTagArticles(state) {
      return state.maxTagArticles
    },
  },
  actions: {
    addArticles(articles) {
      this.allArticles = articles
      this.latestArticles = articles
      this.allTagArticles = articles
      this.allAuthorArticles = articles
    },
    loadMoreLatest() {
      this.maxLatest = this.maxLatest + 12
    },
    loadMoreTagArticles() {
      this.maxTagArticles = this.maxTagArticles + 12
    },
    loadMoreAuthorArticles() {
      this.maxAuthorArticles = this.maxAuthorArticles + 12
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGhostStore, import.meta.hot))
