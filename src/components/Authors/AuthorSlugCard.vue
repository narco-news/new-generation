<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { Author } from '~/ghostTypes'
const props = defineProps<{
  author: Author
}>()
const hideEmail = ref(true)
function showEmail() {
  hideEmail.value = false
  useTimeoutFn(() => {
    hideEmail.value = true
  }, 3000)
}
const elClass = ref()
function clickSpin() {
  elClass.value = 'spin'
  useTimeoutFn(() => {
    elClass.value = ''
  }, 3000)
}
const authorCard = ref<HTMLElement>()
const motionInstance = useMotion(authorCard, {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
})
</script>

<template>
  <section
    ref="authorCard"
    class="author-card"
  >
    <!--  -->
    <div
      class="author-image-wrapper"
      :class="elClass"
      @click="clickSpin()"
    >
      <div class="author-card__image">
        <img
          :src="props.author.profile_image"
          :alt="props.author.name"
        >
      </div>
    </div>
    <h1 class="author-card__name" style="display:flex;align-items:center">
      {{ props.author.name }}
    </h1>
    <p class="author-card__bio">
      {{ props.author.bio }}
    </p>
    <div class="social">
      <a
        v-if="props.author.twitter"
        :href="`https://twitter.com/${props.author.twitter}`"
        target="_blank"
        class="author-card__twitter-link"
      >
        <twitter-color-icon
          :border="false"
        />
        <span>{{ props.author.twitter }}</span>
      </a>
      <button
        v-if="props.author.location"
        :title="`Email ${props.author.name}`"
        class="author-card__email-link"
      >
        <mail-icon
          :border="false"
        />
        <span>
          <span v-if="hideEmail" @click="showEmail()">
            Click me
          </span>
          <span v-else>
            {{ props.author.location }}
          </span>
        </span>
      </button>
      <a
        v-if="props.author.website"
        :href="`${props.author.website}`"
        :title="`${props.author.name}'s website`"
        target="_blank"
        class="author-card__link"
      >
        <ExternalLinkIcon
          :border="false"
        />
        <span>
          Website
        </span>
      </a>
      <a
        v-if="props.author.facebook"
        :href="`https://patreon.com/${props.author.facebook}`"
        :title="`${props.author.name}'s Patreon`"
        target="_blank"
        class="author-card__link"
        style="margin: 1rem 0"
      >
        <PatreonColorIcon />
      </a>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.author-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 0 0;
    margin: 0 1rem;
    margin-bottom: 2rem;
    border-bottom: 3px solid var(--green-400);
    .author-card__image {
      border-radius: 100%;
      overflow: hidden;
      box-shadow: 0 0 0 3px var(--green-400);
      width: 125px;
      & img {
        object-fit: cover;
        width: 100%;
        transform: scale(1.05);
      }
      @media (min-width: 768px) {
        width: 150px;
      }
    }
    .author-card__name {
        color: var(--slate-700);
        font-size: clamp(100%, 2rem + 2vw, 36px);
    }
    .author-card__bio {
        color: var(--slate-500);
        padding-left: 1rem;
        margin: 0;
        font-size: 13px;
        max-width: 40ch;
    }
    .social {
        display: flex;
        flex-direction: column;
        margin: 2rem 0;
        margin-left: 5rem;
        width: 220px;
        .author-card__twitter-link {
            text-decoration: none;
            color: var(--green-400);
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            -webkit-tap-highlight-color: transparent;
            span {
                color: var(--slate-500);
                font-weight: 500;
                font-size: 13px;
                font-family: monospace;
                margin-left: 1rem;
            }
        }
        .author-card__link {
            color: var(--green-400);
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
            span {
                color: var(--slate-500);
                font-weight: 500;
                font-size: 13px;
                font-family: monospace;
                margin-left: 1rem;
            }
        }
        .author-card__email-link {
          color: var(--green-400);
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          text-decoration: none;
          border: none;
          background: none;
          padding: 0;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          span {
              color: var(--slate-500);
              font-weight: 500;
              font-size: 13px;
              font-family: monospace;
              margin-left: 1rem;
              span {
                margin: 0;
              }
          }
        }
    }
}

.spin {
  -webkit-animation:spin 3s linear infinite;
  -moz-animation:spin 3s linear infinite;
  animation:spin 3s linear infinite;
}

/* Spin */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

html.dark {
  .author-card {
    .author-card__bio {
      color: var(--slate-300);
    }
    .author-card__name {
      color: white;
    }
    .social {
      .author-card__link {
        span {
          color: var(--slate-300);
        }
      }
      .author-card__email-link {
        span {
          color: var(--slate-300);
        }
      }
      .author-card__twitter-link {
        span {
          color: var(--slate-300);
        }
      }
    }
  }
}
</style>
