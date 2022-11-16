<template>
  <main class="app">
    <Landing />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Landing from './views/Landing.vue'

export default defineComponent({
  name: 'App',
  components: {
    Landing
  },
  beforeCreate() {
    document.title = 'BEJAMAS_'
  }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Archivo');
body {
  margin: 0 auto;
  padding-bottom: 60px;
  width: 90vw;
  max-width: 1440px;
}
img {
  pointer-events: none;
  user-select: none;
}
body, button, select {
  font-family: 'Archivo', sans-serif;
}
</style>
