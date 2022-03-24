<script setup lang="ts">
import { Author } from '~/ghostTypes'
const props = defineProps<{
  author: Author
}>()
const elClass = ref()
function clickSpin() {
  elClass.value = 'spin'
  useTimeoutFn(() => {
    elClass.value = ''
  }, 3000)
}
</script>

<template>
  <section class="author-card">
    <div class="author-image-wrapper" :class="elClass" @click="clickSpin()">
      <div class="author-card__image">
        <img :src="props.author.profile_image" :alt="props.author.name">
      </div>
    </div>
    <h1 class="author-card__name">
      {{ props.author.name }}
    </h1>
    <div class="author-card__social">
      <a
        v-if="props.author.twitter"
        :href="`https://twitter.com/${props.author.twitter.substring(1)}`"
        target="_blank"
        rel="norefererr"
      >
        <svg
          role="img"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Twitter</title>
          <path
            d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
          />
        </svg>
      </a>
      <a
        v-if="props.author.location"
        :href="`mailto:${props.author.location}`"
        target="_blank"
        rel="norefererr"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="email">
              <rect width="24" height="24" opacity="0" />
              <path
                d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
              />
            </g>
          </g>
        </svg>
      </a>
      <a
        v-if="props.author.website"
        :href="`${props.author.website}`"
        target="_blank"
        rel="norefererr"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <g data-name="Layer 2">
            <g data-name="external-link">
              <rect width="24" height="24" opacity="0" />
              <path
                d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"
              />
              <path
                d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"
              />
            </g>
          </g>
        </svg>
      </a>
    </div>
    <p class="author-card__bio">
      {{ props.author.bio }}
    </p>
    <a
      v-if="props.author.facebook"
      :href="`https://buymeacoffee.com/${props.author.facebook}`"
      class="author-card__donation-button"
      target="_blank"
      rel="norefererr"
    >
      <img src="../../assets/buy-me-a-coffee-button.webp">
    </a>
  </section>
</template>

<style lang="postcss" scoped>
.author-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid var(--green-400);
  max-width: 85ch;
  padding: var(--space-m);
  margin: 0 var(--space-s);
  @media (min-width: 768px) {
    margin: 0 auto;
  }
  .author-card__image {
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 0 2px var(--green-400);
    width: 85px;
    & img {
      object-fit: cover;
      width: 100%;
      transform: scale(1.1);
    }
    @media (min-width: 768px) {
      width: 100px;
    }
  }
  .author-card__name {
    color: var(--slate-700);
    font-size: clamp(100%, 2rem + 2vw, 36px);
    font-family: var(--font-title);
    font-weight: 700;
    padding: 0;
    margin: 0;
    margin-top: var(--space-xs);
  }
  .author-card__social {
    display: flex;
    gap: var(--space-l);
    padding: 0;
    margin: 0;
    margin-top: var(--space-xs);
    a {
      color: var(--green);
      svg {
        width: 20px;
        height: 20px;
        color: var(--green);
      }
    }
  }
  .author-card__bio {
    color: var(--slate-500);
    font-family: var(--font-normal);
    max-width: 55ch;
    padding: 0;
    margin: 0;
    margin-top: var(--space-xs);
    text-align: center;
  }
  .author-card__donation-button {
    display: block;
    margin-top: var(--space-m);
    img {
      width: 100%;
      height: 100%;
      max-height: 45px;
      border-radius: 4px;
    }
  }
}

.spin {
  -webkit-animation: spin 3s linear infinite;
  -moz-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
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
