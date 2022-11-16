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
  }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Archivo');
body {
  margin: 0 auto;
  padding-bottom: 30px;
  max-width: 1440px;
}
body, button, select {
  font-family: 'Archivo', sans-serif;
}
@media only screen and (max-width: 1440px) {
  body {
    width: 90%;
  }
}
</style>
