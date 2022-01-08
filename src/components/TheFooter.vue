<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <div class="footer">
    <div class="footer__main-content">
      <div class="footer__article-links">
        <h3>narco.news</h3>
        <ul>
          <li>
            <router-link to="/about">
              {{ t('nav.about') }}
            </router-link>
          </li>
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
          <li class="disabled">
            {{ t('nav.wire') }}
          </li>
          <li class="disabled">
            {{ t('nav.map') }}
          </li>
          <!-- <li>
            <ClientOnly>
              <Popper>
                <button class="popper-button">
                  Privacy
                </button>
                <template #content>

                </template>
              </Popper>
            </ClientOnly>
          </li> -->
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
          <li>
            <router-link to="/tags">
              {{ t('articles.tags') }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="footer__article-links regions">
        <h3>{{ t('footer.regions') }} </h3>
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
          <!-- <li>
            <router-link to="/tags/europe">
              {{ t('footer.europe') }}
            </router-link>
          </li> -->
        </ul>
      </div>
      <div class="footer__article-links" style="display: flex;flex-direction:column;margin-top: 1em">
        <TheNavDarkMode style="align-self: flex-end;margin-bottom: 1em" />
        <TheNavLangToggle style="margin-bottom: 1em" />
        <a href="https://discord.gg/jvA59aZV7c" style="border:none" target="_blank" title="Join Discord server">
          <img
            :src="`https://img.shields.io/discord/927298048248414209?color=17A578&label=${t('footer.chat')}&logo=discord&logoColor=white`"
            alt="Discord invite"
          >
        </a>
      </div>
    </div>
    <div class="footer__site-title">
      2022 NARCO DOT NEWS
    </div>
  </div>
</template>

<style lang="postcss">
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
        padding-top: 4em;
        &:hover {
            color: var(--green);
        }

        @media (max-width: 810px) {
          font-size: 11px;
        }
    }

}

html.dark {
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
    }
}
</style>
