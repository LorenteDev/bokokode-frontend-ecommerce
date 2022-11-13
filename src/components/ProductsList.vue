<template>
  <section id="products-list">
    <section id="products-list-top">
      <h1>
        Photography / Premium Photos
      </h1>
      <section>
        <label>Sort by
          <select>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </label>
      </section>
    </section>
    <section id="products-list-content">
      <aside>
        <h2>Category</h2>
      </aside>
      <section id="products-list-found">
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :product="product" />
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Product from '../types/Product'
import ProductCard from '../components/ProductCard.vue'

export default defineComponent({
  name: 'ProductsList',
  components: {
    ProductCard
  },
  props: {
    products: {
      required: true,
      type: Array as PropType<Product[]>
    }
  }
  // setup() {
    
  // },
})
</script>

<style lang="scss" scoped>
#products-list-content {
  display: flex;
  justify-content: space-between;
}
#products-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#products-list-found {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
</style>