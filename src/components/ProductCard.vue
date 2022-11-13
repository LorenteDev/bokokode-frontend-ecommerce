<template>
  <article class="product-card">
    <img :src="product.image.src" :alt="product.image.alt">
    <span class="product-card-category">{{ capitalize(product.category) }}</span>
    <span class="product-card-name">{{ product.name }}</span>
    <span class="product-card-currency">{{ product.currency }} {{ product.price }}</span>
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
  max-width: 282px;
}
.product-card > img {
  width: 282px;
  height: 399px;
}
.product-card > span {
  max-width: 282px;
}
.product-card-category {
  font-size: 22px;
  font-weight: bold;
  color: #656565;
  margin-top: 8px;
}
.product-card-name {
  font-size: 34px;
  font-weight: bold;
  margin-top: 8px;
}
.product-card-currency {
  font-size: 29px;
  color: #656565;
  margin-top: 9px;
}
</style>