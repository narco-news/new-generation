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
      class="hex"
      :class="elClass"
      @click="clickSpin()"
    >
      <div class="hex-background">
        <img
          :src="props.author.profile_image"
          :alt="props.author.name"
        >
      </div>
    </div>
    <h1 class="author-card__name" style="display:flex;align-items:center">
      {{ props.author.name }}
      <a
        v-if="props.author.facebook"
        :href="`https://patreon.com/${props.author.facebook}`"
        :title="`${props.author.name}'s Patreon`"
        target="_blank"
        class="author-card__link"
        style="display: inline-block;text-decoration: none; margin-left: 2rem"
      >
        <PatreonColorIcon />
      </a>
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
            Click to reveal
          </span>
          <span v-else>
            {{ props.author.location }}
          </span>
        </span>
      </button>
      <!-- <a
        v-if="props.author.facebook"
        :href="`https://patreon.com/${props.author.facebook}`"
        :title="`${props.author.name}'s Patreon`"
        target="_blank"
        class="author-card__link"
      >
        <PatreonColorIcon />
      </a> -->
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
          {{ props.author.website }}
        </span>
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
    padding: 2rem;
    margin: 0 1rem;
    margin-bottom: 2rem;
    border-bottom: 3px solid var(--green-400);
    .author-card__image {
        border-radius: 100%;
        width: 65px;
        height: 65px;
        box-shadow: 0 0 0 2px var(--green-400);
    }
    .author-card__name {
        color: var(--slate-700);
        font-size: clamp(100%, 2rem + 2vw, 36px);
    }
    .author-card__bio {
        color: var(--slate-600);
        padding: 0;
        margin: 0;
        font-size: 13px;
        max-width: 65ch;
    }
    .social {
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        .author-card__twitter-link {
            text-decoration: none;
            color: var(--green-400);
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            -webkit-tap-highlight-color: transparent;
            span {
                color: var(--slate-600);
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
            margin-bottom: 0.5rem;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
            span {
                color: var(--slate-600);
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
          margin-bottom: 0.5rem;
          text-decoration: none;
          border: none;
          background: none;
          padding: 0;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          span {
              color: var(--slate-600);
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
/* https://codeconvey.com/css-hexagon-image-with-border/ */
.hex {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 150px;
  height: 129.9px; /* width * 0.866 */
  background: var(--green-400);
  box-sizing: border-box;
  -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  /* -webkit-animation: v-bind('spinAnimation');
  -moz-animation: v-bind('spinAnimation');
  animation: v-bind('spinAnimation'); */
}

.spin {
  -webkit-animation:spin 3s linear infinite;
  -moz-animation:spin 3s linear infinite;
  animation:spin 3s linear infinite;
}

.hex-background {
  position: absolute;
  background-color: var(--green); /*color of the main-background*/
  top: 2px; /* equal to border thickness */
  left: 2px; /* equal to border thickness */
  width: 146px; /* container height - (border thickness * 2) */
  height: 125.9px; /* container height - (border thickness * 2) */
  -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
}

.hex img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
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
