<template>
  <article class="product-card-also-buy">
    <img :src="product.image.src" :alt="product.image.alt">
    <span class="product-card-also-buy-category">{{ capitalize(product.category) }}</span>
    <span class="product-card-also-buy-name">{{ product.name }}</span>
    <span class="product-card-also-buy-currency">{{ product.currency }} {{ product.price }}</span>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { capitalize } from '../utils/utils'
import Product from '../types/Product'

export default defineComponent({
  name: 'ProductCardAlsoBuy',
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
.product-card-also-buy {
  display: flex;
  flex-direction: column;
}
.product-card-also-buy > img {
  width: 117px;
  height: 147px;
  margin-bottom: 14px;
}
.product-card-also-buy > span {
  max-width: 117px;
}
.product-card-also-buy-category {
  font-size: 13px;
  font-weight: bold;
  color: #656565;
}
.product-card-also-buy-name {
  font-size: 16px;
  font-weight: bold;
}
.product-card-also-buy-currency {
  font-size: 15px;
  color: #656565;
}
</style>