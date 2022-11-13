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
  font-family: 'Archivo', sans-serif;
  margin: 0 auto;
  // padding: 15px 42px 20px 42px;
  max-width: 1440px;
}
</style>
