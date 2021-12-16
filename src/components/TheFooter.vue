<template>
  <div class="footer">
    narco.news
  </div>
</template>

<style lang="postcss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid black;
  height: 2rem;
  display: grid;
  place-content: center;
}

html.dark {
  & .footer {
    background-color: #161618;
    border-top-color: white;
    color: white;
  }
}
</style>
