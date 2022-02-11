<script setup lang="ts">
const navTitle = ref()
const isNavTitleHovered = useElementHover(navTitle)
const navTitleColor = ref('black')
const navTitleDotColor = ref('var(--green')
watchEffect(() => {
  if (isNavTitleHovered.value) {
    navTitleColor.value = 'var(--green)'
    navTitleDotColor.value = 'black'
    useTimeoutFn(() => {
      navTitleColor.value = 'black'
      navTitleDotColor.value = 'var(--green)'
    }, 2000)
  }
  else {
    navTitleColor.value = 'black'
    navTitleDotColor.value = 'var(--green)'
  }
})
const route = useRoute()
const bounceStyle = ref('')
function bounce() {
  if (route.path === '/')

    bounceStyle.value = ' bounce'

  navTitleColor.value = 'var(--green)'
  navTitleDotColor.value = 'black'
  useTimeoutFn(() => {
    bounceStyle.value = ''
    navTitleColor.value = 'black'
    navTitleDotColor.value = 'var(--green)'
  }, 2000)
}
</script>

<template>
  <nav ref="target" class="the-nav">
    <div class="the-nav__wrapper">
      <div class="the-nav__title-wrapper" @click="bounce()">
        <router-link to="/" class="the-nav__title">
          <strong>narco</strong>
          <span
            class="dot"
            :class="bounceStyle"
          >.</span>news
        </router-link>
      </div>
      <div class="the-nav__right-side">
        <TheNavLinks class="desktop-links" />
        <TheNavLangToggle />
      </div>
    </div>
    <TheNavLinks class="mobile-links" />
  </nav>
</template>

<style lang="postcss" scoped>
.desktop-links {
  @media (max-width: 810px) {
    display: none;
  }
}
.mobile-links {
  height: auto;
  margin: 0 auto;
  @media (min-width: 810px) {
    display: none;
  }
}
.the-nav {
  width: 100%;
  height: 4em;
  border-bottom: 1px solid var(--vue-black);
  padding: 0 10px;
  .the-nav__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    height: 4em;
    margin: 0 auto;
    .the-nav__right-side {
      display: flex;
      align-items: center;

    }
  }

  .the-nav__title {
    color: v-bind('navTitleColor');
    text-decoration: none;
    padding: 0;
    margin: 0;
    font-size: clamp(100%, 1rem + 2vw, 22px);
    font-weight: 400;
    transition: color 180ms ease-in;
    /* cursor: none; */
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    strong {
      font-weight: 500;
    }
    span {
      font-weight: 600;
      color: v-bind('navTitleDotColor');
      height: 5px;
      display: inline-flex;
    }
  }
}

html.dark {
  .the-nav {
    background-color: #161618;
    border-color: white;
    .the-nav__title {
      color: white;
    }
  }
}

@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, -10px, 0);
  }
}

.bounce {
  animation: bounce 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

}
</style>
