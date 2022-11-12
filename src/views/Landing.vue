<template>
  <Header />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'

export default defineComponent({
  name: 'LandingCommerce',
  components: {
    Header,
  },
  // setup() {
  // },
  mounted() {
    document.title = 'BAJAMAS'
  }
})
</script>

<style lang="scss" scoped>

</style>