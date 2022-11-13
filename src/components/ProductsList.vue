<template>
  <section id="products-list">
    <aside>
      <h2>Category</h2>
    </aside>
    <section id="products-found">
      <article v-for="product in products" :key="product._id">
        {{ product.name }}
      </article>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Product from '../types/Product'

export default defineComponent({
  name: 'ProductsList',
  props: {
    products: {
      required: true,
      type: Array as PropType<Product>
    }
  }
  // setup() {
    
  // },
})
</script>

<style lang="scss" scoped>
#products-list {
  display: flex;
  justify-content: space-between;
}
</style>