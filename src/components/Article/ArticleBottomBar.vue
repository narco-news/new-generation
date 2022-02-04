<script setup lang="ts">
const props = defineProps<{
  title: string
  primaryAuthor: {}
  slug: string
  firstTag?: {}
  secondTag?: {}
}>()

const source = ref(`https://narco.news/articles/${props.slug}`)
const { copy, copied } = useClipboard({ source })

// Bottom bar
const width = ref(0)
const { y } = useWindowScroll()

function scrollHandler() {
  const height
    = document.documentElement.scrollHeight
    - document.documentElement.clientHeight
  width.value = (window.scrollY / height) * 100
}
tryOnMounted(() => {
  const wrapperHeight = document.getElementsByClassName('article-meta__wrapper')[0].clientHeight
  const imageHeight = document.getElementsByClassName('article-image__wrapper')[0].clientHeight
  const minusHeight = imageHeight + wrapperHeight
  window.addEventListener('scroll', scrollHandler)
  watchEffect(() => {
    const height
    = document.documentElement.scrollHeight
    - document.documentElement.clientHeight
    if (y.value >= minusHeight)
      window.dispatchEvent(new Event('scroll'))
  })
})
tryOnUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div class="wrapper">
    <div class="bottom-bar">
      <div class="progress-bar">
        <div class="percent" :style="`width: ${width}%`" />
      </div>
      <div class="bottom-bar__content">
        <div class="bottom-bar__meta">
          {{ props.title }}
          <span>
            <router-link :to="`/tags/${props.firstTag}`" class="tag">
              {{ props.firstTag?.name }}
            </router-link>
            <router-link :to="`/tags/${props.secondTag}`" class="tag">
              {{ props.secondTag?.name }}
            </router-link>
          </span>
        </div>
        <div class="buttons">
          <a
            :href="`https://twitter.com/share?text=&quot;${props.title}&quot;&url=https://narco.news/articles/${props.slug}`"
            target="_blank"
          >
            <button class="scroll-top">
              <svg
                width="256px"
                height="256px"
                viewBox="0 -23.5 256 256"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid"
              >
                <g>
                  <path
                    d="M256,25.4500259 C246.580841,29.6272672 236.458451,32.4504868 225.834156,33.7202333 C236.678503,27.2198053 245.00583,16.9269929 248.927437,4.66307685 C238.779765,10.6812633 227.539325,15.0523376 215.57599,17.408298 C205.994835,7.2006971 192.34506,0.822 177.239197,0.822 C148.232605,0.822 124.716076,24.3375931 124.716076,53.3423116 C124.716076,57.4586875 125.181462,61.4673784 126.076652,65.3112644 C82.4258385,63.1210453 43.7257252,42.211429 17.821398,10.4359288 C13.3005011,18.1929938 10.710443,27.2151234 10.710443,36.8402889 C10.710443,55.061526 19.9835254,71.1374907 34.0762135,80.5557137 C25.4660961,80.2832239 17.3681846,77.9207088 10.2862577,73.9869292 C10.2825122,74.2060448 10.2825122,74.4260967 10.2825122,74.647085 C10.2825122,100.094453 28.3867003,121.322443 52.413563,126.14673 C48.0059695,127.347184 43.3661509,127.988612 38.5755734,127.988612 C35.1914554,127.988612 31.9009766,127.659938 28.694773,127.046602 C35.3777973,147.913145 54.7742053,163.097665 77.7569918,163.52185 C59.7820257,177.607983 37.1354036,186.004604 12.5289147,186.004604 C8.28987161,186.004604 4.10888474,185.75646 0,185.271409 C23.2431033,200.173139 50.8507261,208.867532 80.5109185,208.867532 C177.116529,208.867532 229.943977,128.836982 229.943977,59.4326002 C229.943977,57.1552968 229.893412,54.8901664 229.792282,52.6381454 C240.053257,45.2331635 248.958338,35.9825545 256,25.4500259"
                    fill="#55acee"
                  />
                </g>
              </svg>
            </button>
          </a>
          <a
            :href="`https://www.facebook.com/sharer.php?u=https://narco.news/articles/${props.slug}`"
            target="_blank"
          >
            <button class="scroll-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
                />
              </svg>
            </button>
          </a>
          <button class="scroll-top" @click="copy()">
            <svg
              v-if="copied"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="#34B373"
                fill-rule="evenodd"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!-- <button class="scroll-top" @click="scrollToTop">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
        </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  height: auto;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 500;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
.bottom-bar {
  width: 100%;
  max-width: 900px;
  perspective: 20px;
  overflow: hidden;
  background-color: var(--slate-100);
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px; */
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  @media (min-width: 1024px) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .progress-bar {
    width: 100%;
    max-width: 985px;
    background-color: transparent;

    .percent {
      height: 0.2em;
      background-color: var(--green);
    }
  }

  .bottom-bar__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0.5rem;

    .bottom-bar__meta {
      font-family: 'Oswald';
      font-weight: 400;
      display: flex;
      flex-direction: column;
      a {
        font-size: 12px;
        margin-right: 0.5rem;
        font-family: sans-serif;
        color: var(--green);
        text-decoration: none;
        border-bottom: 1px dotted var(--green);
        align-self: flex-start;
        display: inline-flex;
      }
      .bottom-bar__title {
        padding: 0;
        margin: 0;
        font-size: clamp(100%, 1rem + 2vw, 32px);
        color: black;
        font-weight: 400;
        display: inline-flex;
      }
      .meta__author {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: var(--green);
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .scroll-top {
      display: grid;
      place-content: center;
      background: none;
      border: none;
      -webkit-tap-highlight-color: transparent;
      color: black;
      border-radius: 100%;
      padding: 10px;
      overflow: hidden;
      border: 1px solid black;
      box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
      margin-right: 1em;
      svg {
        width: 15px;
        height: 15px;
        filter: brightness(0);
      }
      @media (max-width: 768px) {
        margin-right: 0.5rem;
      }
    }
  }
}
/*
  Credit to Máximo Mussini for transition
  https://github.com/ElMassimo/iles/blob/main/docs/src/components/DarkModeSwitch.vue
   */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.15s ease-out;
}
.slide-enter-from {
  transform: translateY(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 100;
}
</style>
