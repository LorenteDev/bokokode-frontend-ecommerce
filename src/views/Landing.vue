<template>
  <section v-if="!$store.getters.loading">
    <Header />
    <Separator />
    <FeaturedProduct />
    <Separator />
    <ProductsList :products="$store.getters.products" :paginationData="$store.getters.paginationData" />
  </section>
  <section
    v-else
    id="loading">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '../store'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Types
import PaginationData from '../types/PaginationData'
import Product from '../types/Product'

// Components
import Header from '../components/Header.vue'
import FeaturedProduct from '../components/FeaturedProduct.vue'
import ProductsList from '../components/ProductsList.vue'
import Separator from '../components/Separator.vue'

export default defineComponent({
  name: 'LandingCommerce',
  components: {
    Header,
    Separator,
    FeaturedProduct,
    ProductsList
  },
  // Initial load
  setup() {
    store.commit('setLoading', true)
    // Get all products
    axios.post('https://technical-frontend-api.bokokode.com/api/products')
      .then((res: AxiosResponse) => {
        const pagination = res.data.data
        const pageProducts: Array<Product> = res.data.data.data

        // Move featured one to featured ref
        const featured = pageProducts.find((product: Product, index: number) => {
          return product.featured ? pageProducts.splice(index, 1) : false
        }) as Product
        store.commit('setFeatured', featured)

        // Delete 'data' key for paginationData since it's not needed
        delete pagination['data']

        store.commit('setPaginationData', pagination as PaginationData)
        store.commit('setProducts', pageProducts as Array<Product>)
        store.commit('setLoading', false)
      })
      .catch((err: AxiosError) => {
        console.error(err)
        store.commit('setLoading', false)
      })
  },
  mounted() {
    document.title = 'BEJAMAS_'
  },
})
</script>

<style lang="scss" scoped>
#loading {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wave {
  width: 5px;
  height: 100px;
  background: linear-gradient(45deg, #000, #fff);
  margin: 10px;
  animation: wave 1s linear infinite;
  border-radius: 20px;
}
.wave:nth-child(2) {
  animation-delay: 0.1s;
}
.wave:nth-child(3) {
  animation-delay: 0.2s;
}
.wave:nth-child(4) {
  animation-delay: 0.3s;
}
.wave:nth-child(5) {
  animation-delay: 0.4s;
}
.wave:nth-child(6) {
  animation-delay: 0.5s;
}
.wave:nth-child(7) {
  animation-delay: 0.6s;
}
.wave:nth-child(8) {
  animation-delay: 0.7s;
}
.wave:nth-child(9) {
  animation-delay: 0.8s;
}
.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>