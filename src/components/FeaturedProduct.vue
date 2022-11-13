<template>
  <section>
    <div id="featured-top">
      <h1>{{ featured.name }}</h1>
      <button>ADD TO CART</button>
    </div>
    <img :src="featured.image.src" :alt="featured.image.alt">
    <div id="featured-info">
      <div>
        <h2>About the {{ featured.name }}</h2>
        <h3>{{ capitalize(featured.category) }}</h3>
        <p>{{ featured.description }}</p>
      </div>
      <div>
        <h2>People also buy</h2>
        <div id="featured-also-buy">
          <ProductCardAlsoBuy v-for="product in featured.people_also_buy" :key="product._id" :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ProductCardAlsoBuy from '../components/ProductCardAlsoBuy.vue'
import Product from '../types/Product'
import { capitalize } from '../utils/utils'

export default defineComponent({
  name: 'FeaturedProduct',
  components: {
    ProductCardAlsoBuy
  },
  props: {
    featured: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
  methods: {
    capitalize
  }
  // setup() {
    
  // },
})
</script>

<style lang="scss">
#featured-top {
  display: flex;
  justify-content: space-between;
}
#featured-top > h1 {
  margin: 0;
}
#featured-info {
  display: flex;
  justify-content: space-between;
}
#featured-also-buy {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
#featured-also-buy > article {
  display: flex;
  flex-direction: column;
}
</style>
