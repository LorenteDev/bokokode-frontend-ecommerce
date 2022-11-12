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
</style>
