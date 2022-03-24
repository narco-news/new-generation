<script lang="ts" setup>
import { Author } from '~/ghostTypes'
defineProps<{
  author?: Author
}>()
</script>

<template>
  <router-link :to="`/authors/${author?.slug}`">
    <section class="author-card">
      <img
        :src="author?.profile_image"
        :alt="author?.name"
        class="author-card__profile-image"
      >
      <h1 class="author-card__name">
        {{ author?.name }}
      </h1>
      <p class="author-card__count">
        {{ author?.count.posts }}
        <span v-if="author?.count.posts === 1">
          article
        </span>
        <span v-else>
          articles
        </span>
      </p>
      <p class="author-card__bio">
        {{ author?.bio }}
      </p>
    </section>
  </router-link>
</template>

<style lang="postcss" scoped>
a {
    text-decoration: none;
    color: var(--slate-800);
}
.author-card {
    --w:450px;
    --c:(100vw - var(--w));

    max-width:500px;
    background: white;
    box-shadow: 0 0 0 1px var(--slate-400);
    margin: var(--space-m) auto;
    border-radius:10px;
    overflow:hidden;
    padding: var(--space-xs) 20px var(--space-xs) clamp(20px,var(--c)*1000,180px);
    box-sizing:border-box;
    position:relative;
  &__profile-image {
    position:absolute;
    top:clamp(0px,var(--c)*-1000,20px);
    left:clamp(0px,var(--c)*-1000,20px);
    width:clamp(50px,var(--c)*1000,150px);
    height:clamp(50px,var(--c)*1000,100%);
    border-radius:clamp(0px,var(--c)*-1000,50px);
    box-shadow: 0 0 0 2px var(--green);
    object-fit:cover;
    object-position:top;
  }
  &__name {
    font-family: var(--font-title);
    font-weight: 600;
    margin: 0 0 10px clamp(0px,var(--c)*-1000,70px);
  }
  &__count {
    font-family: var(--font-normal);
    font-size: var(--step--1);
    margin:20px 0 10px clamp(0px,var(--c)*-1000,70px);
    color: var(--green);
  }
  &__bio {
    font-family: var(--font-normal);
    font-size: var(--step--2);
    margin:20px 0 10px clamp(0px,var(--c)*-1000,70px);
  }
}

html.dark {
  .author-card {
    color: var(--slate-100);
    background-color: transparent;

    &__bio {
      color: var(--slate-300);
    }
  }
}
</style>
