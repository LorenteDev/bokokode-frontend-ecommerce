<template>
  <section>
    <h2>Featured</h2>
    <p>{{ featured.name }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Product from '../types/Product'

export default defineComponent({
  name: 'FeaturedProduct',
  props: {
    featured: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
  // setup() {
    
  // },
})
</script>

<style lang="sss" scoped>

</style>