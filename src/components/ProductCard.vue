<template>
  <article class="product-card">
    <img :src="product.image.src" :alt="product.image.alt">
    <span>{{ capitalize(product.category) }}</span>
    <span>{{ product.name }}</span>
    <span>{{ product.currency }} {{ product.price }}</span>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { capitalize } from '../utils/utils'
import Product from '../types/Product'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      required: true,
      type: Object as PropType<Product>
    }
  },
  methods: {
    capitalize
  }
  // setup() {
    
  // },
})
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
}
.product-card > img {
  width: 280px;
  height: 390px;
}
</style>