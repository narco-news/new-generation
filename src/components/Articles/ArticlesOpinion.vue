<script setup lang="ts">
interface Article {
  slug: string
  title: string
  profile_image: string
}
interface Articles {
  article: Article
}
const props = defineProps<{
  articles: Articles
}>()
</script>
<template>
  <section>
    <h1 class="opinion__header">
      Opinion
    </h1>
    <div class="articles-opinion">
      <div
        v-for="article in props.articles"
        :key="article.slug"
        class="articles-wrapper"
      >
        <articles-opinion-article :article="article" />
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.opinion__header {
  font-size: clamp(100%, 1rem + 2vw, 24px);
  font-family: 'Oswald';
  margin: 0;
  font-weight: 400;
  padding: 5px;
  background-color: var(--green);
  color: var(--slate-50);
}
.articles-opinion {
  color: black;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  overflow: hidden;
  /* first breakpoint*/
  --w1:800px;
  --n:3;
  /* second breakpoint*/
  --w2:390px;
  --m:2;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      clamp(
        clamp(
          100%/ (var(--n) + 1) + 0.1%,
          (var(--w1) - 100vw) * 1000,
          100%/ (var(--m) + 1) + 0.1%
        ),
        (var(--w2) - 100vw) * 1000,
        100%
      ),
      1fr
    )
  );
  gap: 10px;
}
html.dark {
  & .articles-opinion {
    color: white;
  }
}
</style>
