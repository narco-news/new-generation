<script setup lang="ts">
import TheFooterRSS from './TheFooterRSS.vue'
const { t } = useI18n()
const route = useRoute()
const showLangToggle = ref(true)
const isArticlePage = ref()
watchEffect(() => {
  if (route.matched[0].path === '/articles/:slug') {
    showLangToggle.value = false
    isArticlePage.value = true
  }
  else {
    isArticlePage.value = false
  }
})
const rotateStyle = ref('transform: none')
function rotate() {
  rotateStyle.value = 'transform: scale(1, -1)'
  useTimeoutFn(() => {
    rotateStyle.value = 'transform: none;color:inherit'
  }, 2000)
}
//
// Scroll to top button
function scrollToTop() {
  const intervalId = setInterval(() => {
    if (window.pageYOffset === 0) clearInterval(intervalId)

    window.scroll(0, window.pageYOffset - 50)
  }, 20)
}
</script>
<template>
  <div class="footer">
    <div class="footer__main-content">
      <div class="footer__article-links">
        <h3>narco.news</h3>
        <ul>
          <!-- <li>
            <router-link to="/about">
              {{ t('nav.about') }}
            </router-link>
          </li> -->
          <li>
            <router-link to="/authors">
              {{ t('articles.authors') }}
            </router-link>
          </li>
          <li>
            <router-link to="/library">
              {{ t('nav.library') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags">
              {{ t('articles.tags') }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="footer__article-links">
        <h3>{{ t('nav.articles') }}</h3>
        <ul>
          <li>
            <router-link to="/articles">
              {{ t('articles.latest') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/opinion">
              {{ t('articles.opinion') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/translation">
              {{ t('articles.translations') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/around-the-web">
              {{ t('articles.atw') }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="footer__article-links regions">
        <h3>{{ t('footer.regions') }}</h3>
        <ul>
          <li>
            <router-link to="/tags/united-states">
              {{ t('footer.usa') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/mexican-dto">
              {{ t('footer.mexico') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/central-america">
              {{ t('footer.central-a') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/south-america">
              {{ t('footer.south-a') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tags/europe">
              {{ t('footer.europe') }}
            </router-link>
          </li>
        </ul>
      </div>
      <div
        class="footer__article-links"
        style="
          display: flex;
          flex-direction: column;
          margin-top: 1em;
          justify-content: flex-end;
        "
      >
        <button
          v-if="isArticlePage"
          ref="scrollTopButton"
          class="scroll-top-button"
          @click="scrollToTop()"
        >
          <up-arrow-icon />
        </button>
        <TheFooterRSS />
        <TheNavDarkMode style="align-self: flex-end; margin-bottom: 1em" />
        <TheNavLangToggle v-if="showLangToggle" style="margin-bottom: 1em" />
        <a
          href="https://discord.gg/jvA59aZV7c"
          style="border: none"
          target="_blank"
          title="Join Discord server"
          rel="noopener"
        >
          <img
            :src="`https://img.shields.io/discord/927298048248414209?color=17A578&label=${t(
              'footer.chat'
            )}&logo=discord&logoColor=white`"
            alt="Discord invite"
          >
        </a>
      </div>
    </div>
    <div class="footer__site-title" :style="rotateStyle" @click="rotate()">
      2022 NARCO DOT NEWS
    </div>
  </div>
</template>

<style lang="postcss">
.scroll-top-button {
  border: none;
  background: none;
  display: flex;
  margin: 0.5rem 0;
  padding: 9px;
  float: right;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--slate-400);
  transition: box-shadow 180ms ease-in;
  color: var(--slate-700);
  align-self: flex-end;
  &:hover {
    color: var(--green);
    box-shadow: 0 0 0 2px var(--green);
  }
}
.regions {
  @media (max-width: 425px) {
    display: none;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid var(--vue-black);
  height: 16rem;
  color: black;

  .footer__main-content {
    display: flex;
    justify-content: space-evenly;
    padding: 0 10px;
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 2em;
    .footer__article-links {
      ul {
        list-style: none;
        list-style-position: outside;
        padding: 0;
        margin: 0;
      }
      li {
        font-size: 12px;
        margin-bottom: 8px;
        padding: 5px 0;
      }
      h3 {
        margin-bottom: 0.5em;
        font-weight: 400;
        font-size: clamp(100%, 0.5rem + 2vw, 18px);
      }
      a {
        color: var(--slate-600);
        text-decoration: none;
        border-bottom: 1px dotted var(--slate-600);
        &:hover {
          color: var(--slate-800);
          border-bottom: 1px solid var(--slate-800);
        }
      }
      .disabled {
        color: var(--slate-400);
        cursor: none;
        user-select: none;
      }
      .popper-button {
        background: none;
        border: none;
        color: var(--slate-400);
        padding: 0;
        margin: 0;
      }
    }
  }

  .footer__site-title {
    display: flex;
    justify-content: center;
    font-family: monospace;
    font-size: 10px;
    cursor: none;
    user-select: none;
    width: 100%;
    margin-top: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    &:hover {
      background: #ff0000; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #ff0000,
        #f5ed05
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #ff0000,
        #f5ed05
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    @media (max-width: 810px) {
      font-size: 11px;
    }
  }
}

html.dark {
  footer {
    background-color: #161618;
  }
  .footer {
    background-color: #161618;
    border-top-color: white;
    color: white;
    .footer__main-content {
      .footer__article-links {
        a {
          color: var(--slate-400);
          border-bottom: 1px dotted var(--slate-400);
          &:hover {
            color: var(--slate-500);
            border-bottom: 1px solid var(--slate-500);
          }
        }
        .disabled {
          color: var(--slate-700);
        }
      }
    }
    .footer__site-title {
      background-color: #161618;
      color: white;
    }
    .scroll-top-button {
      color: var(--slate-200);
      box-shadow: 0 0 0 1px var(--slate-500);
      &:hover {
        color: var(--green-400);
        box-shadow: 0 0 0 2px var(--green-400);
      }
    }
  }
}
</style>
