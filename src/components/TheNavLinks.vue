<template>
  <router-link to="/">
    Home
  </router-link>
  <router-link to="/library">
    Library
  </router-link>
  <router-link to="/map">
    Map
  </router-link>
  <router-link to="/wire">
    Wire
  </router-link>
  <router-link to="/articles">
    Articles
  </router-link>
</template>

<style lang="postcss" scoped>
a {
  text-decoration: none;
  font-size: large;
  color: black;
  display: flex;
  flex-wrap: none;
  justify-content: center;
  display: inline-flex;
  padding: 0.5em 0.5em 1em 0.5em;
  &:hover {
    color: #eb5757;
  }
  &:focus {
    outline-color: #eb5757;
  }
  &.router-link-active {
    border-bottom: 3px solid #eb5757;
    color: #eb5757;
    &:nth-child(1) {
      color: black;
      border-color: transparent;
    }
  }
}

html.dark {
  & a {
    color: white;
    &:hover {
      color: #eb5757;
    }
    &:focus {
      outline-color: #eb5757;
    }
    &.router-link-active {
      border-bottom: 3px solid #eb5757;
      color: #eb5757;
      &:nth-child(1) {
        color: white;
        border-color: transparent;
      }
    }
  }
}
</style>
