<script setup lang="ts">
defineProps<{
  titleVisible: boolean | undefined
}>()
</script>

<template>
  <Transition name="slide-fade">
    <nav v-show="titleVisible">
      <router-link to="/" class="top-bar__title">
        <strong>narco</strong>
        <span class="top-bar__dot">.</span>
        <span>news</span>
      </router-link>
    </nav>
  </Transition>
</template>

<style lang="postcss" scoped>
nav {
  position: sticky;
  position: -webkit-sticky;
  background-color: var(--slate-100);
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  margin: 0;
  padding: var(--space-3xs) 0;
  border-bottom: 1px solid var(--green);
  width: 100vw;
  @media (min-width: 1140px) {
    width: 100%;
  }
}
.top-bar {
  &__title {
    font-family: var(--font-normal);
    color: var(--slate-700);
    font-size: var(--step--1);
    font-weight: 400;
    text-decoration: none;
    .top-bar__dot {
      font-size: 20px;
      font-weight: 700;
      color: var(--green);
    }
    strong {
      font-weight: 600;
    }
  }
  &__date {
    font-size: 13px;
    color: var(--slate-500);
    display: flex;
    justify-content: space-around;
    align-items: center;
    svg {
      color: var(--slate-400);
      margin-right: var(--space-2xs);
    }
  }
  &__reading-time {
    font-size: 13px;
    color: var(--slate-500);
    display: flex;
    justify-content: space-around;
    align-items: center;
    svg {
      color: var(--slate-400);
      margin-right: var(--space-2xs);
    }
  }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active {
  /* transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.3s ease-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

html.dark {
  nav {
    background-color: black;
    a {
      color: var(--slate-100);
    }
  }
}
</style>
