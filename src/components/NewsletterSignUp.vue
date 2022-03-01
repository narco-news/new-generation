<script lang="ts" setup>
const props = defineProps<{
  border?: boolean
}>()
tryOnMounted(() => {
  const newsletterScript = document.createElement('script')
  newsletterScript.setAttribute('async', '')
  newsletterScript.setAttribute('data-uid', '1a1beb139d')
  newsletterScript.setAttribute('src', 'https://cheerful-artist-9937.ck.page/1a1beb139d/index.js')
  //   document.head.appendChild(newsletterScript)
  const hasChildNode = document.getElementById('convertKitForm')?.childNodes
  if (!hasChildNode?.length)
    document.getElementById('convertKitForm')?.appendChild(newsletterScript)
})
const bottomBorder = ref()
if (props.border === true)
  bottomBorder.value = '2px solid var(--green-400)'
else
  bottomBorder.value = 'none'
</script>

<template>
  <div class="wrapper">
    <section class="newsletter-wrapper">
      <div id="convertKitForm" class="convert-kit-form" />
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  padding: 1rem;
}
.newsletter-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    padding-bottom: 3rem;
    border-bottom: v-bind(bottomBorder);
    .convert-kit-form {
        padding: 0.5rem;
    }
}
</style>

<style lang="postcss">
form.formkit-form {
  border: none !important;
  & h2 {
    animation: float 6s ease-in-out infinite;
    color: var(--slate-600) !important;
    filter: drop-shadow(0 5px 30px var(--green-400)) !important;
    font-size: 28px !important;
    font-family: sans-serif;
    padding-top: 2rem !important;
    margin-bottom: 2rem !important;
  }

  & h2::after {
    content: 'Join the newsletter' !important;
    display: block;
    text-transform: uppercase !important;
    font-family: 'Oswald';
    letter-spacing: 1.2px !important;
    color: var(--green-400);;
    font-size: 42px !important;
    margin-top: 1rem !important;

  }
  & button {
    background-color: var(--green-400) !important;
  }
  & .formkit-subheader > p {
    color: var(--slate-800) !important;
    font-family: 'Noto Serif' !important;
    font-size: 18px;
    margin-bottom: 2rem !important;
  }
  & .formkit-guarantee {
    color: var(--slate-600) !important;
  }
  & .formkit-input {
    border: none !important;
    box-shadow: 0 0 0 1px var(--green);
    &:focus {
      box-shadow: 0 0 0 2px var(--green-400);
    }
  }
}

html.dark {
  form.formkit-form {
    background-color: #161618 !important;
    color: white !imporant;
  & h2 {
    color: var(--green-400) !important;
  }
  & button {
    background-color: var(--green-400) !important;
  }
  & .formkit-header > h2 {
    font-family: 'Oswald' !important;
    text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;
color: #FFFFFF !important;
  }
  & .formkit-subheader > p {
    color: var(--slate-300) !important;
    font-family: 'Noto Serif' !important;
  }
  & .formkit-guarantee {
    color: var(--slate-400) !important;
  }
  }
}

@keyframes float {
    0% {
      transform: translatey(0px);
      filter:
      drop-shadow(0 10px 10px rgba(0,0,0,0.6));
    }
    50% {
      filter:
        drop-shadow(0 15px 10px rgba(0,0,0,0.2));
      transform: translatey(-25px);
    }
    100% {
      filter:
        drop-shadow( 0 10px 10px rgba(0,0,0,0.6));
      transform: translatey(0px);
    }
  }
</style>
