<script setup lang="ts">
import TagsBoxTag from '../components/TagsBoxTag.vue'
const props = defineProps<{
  tags: Array
}>()
</script>
<template>
  <section class="tags-box">
    <div class="__heading-wrapper">
      <h1 class="__heading">
        Tags
      </h1>
    </div>
    <div v-for="tag in props.tags" :key="tag.id" class="__tag-wrapper">
      <TagsBoxTag
        :name="tag.name"
        :slug="tag.slug"
        :count="tag.count.posts"
      />
    </div>
    <br>
  </section>
</template>
<style lang="postcss" scoped>
.tags-box {
  & .__heading-wrapper {
    & .__heading {
      font-size: xx-large;
    }
  }
  & .__tag-wrapper {
    display: inline-flex;
    margin: 1em;
    @media (max-width: 425px) {
      margin: 0.5em;
    }
  }
}

html.dark {
  & .tags-box {
    color: white;
  }
  & .__heading {
    color: white;
  }
}
</style>
