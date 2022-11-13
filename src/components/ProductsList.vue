<template>
  <section id="products-list">
    <section id="products-list-top">
      <h1>
        Photography / Premium Photos
      </h1>
      <section>
        <button
          id="direction-button"
          @click="changeDirection()">
          {{ direction }}
        </button>
        <label>Sort by
          <select @change="loadPageInfo()">
            <option
              v-for="option in orderOptions"
              :key="option"
              :value="option">{{ capitalize(option) }}</option>
          </select>
        </label>
      </section>
    </section>
    <section id="products-list-content">
      <aside id="products-list-categories">
        <h2>Category</h2>
        <section>
          <label
            v-for="category in categoryOptions"
            :key="category"
            @change="loadPageInfo()">
            <input
              type="checkbox"
              :value="category"
              v-model="categories">
            {{ capitalize(category) }}
          </label>
        </section>
      </aside>
      <section id="products-list-wrapper">
        <section id="products-list-found">
          <ProductCard
            v-for="product in products"
            :key="product._id"
            :product="product" />
        </section>
        <section id="products-list-pagination">
          <button 
            v-for="link in paginationData.links"
            :key="link"
            @click="loadPageInfo(link.url)"
            :class="link.active ? 'page-active' : 'page-button'">
            {{ link.label }}
          </button>
        </section>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Components
import ProductCard from '../components/ProductCard.vue'

// Types
import Product from '../types/Product'
import PaginationData from '@/types/PaginationData'
import OrderTerm from '../types/OrderTerm'
import DirectionTerm from '../types/DirectionTerm'
import CategoryTerm from '../types/CategoryTerm'

// Utils
import { capitalize } from '../utils/utils'

export default defineComponent({
  name: 'ProductsList',
  components: {
    ProductCard
  },
  props: {
    products: {
      required: true,
      type: Array as PropType<Product[]>
    },
    paginationData: {
      required: true,
      type: Object as PropType<PaginationData>
    }
  },
  data() {
    return {
      order: 'name' as OrderTerm,
      orderOptions: ['name', 'price'] as Array<OrderTerm>,
      direction: 'ASC' as DirectionTerm,
      categories: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      categoryOptions: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
    }
  },
  methods: {
    capitalize,
    loadPageInfo(link?: string | null) {
      // if there's no link it will use the default one
      console.log('loadPageInfo')
      console.log(this.categories)
      console.log(this.order)
      console.log(this.direction)
      link = link ? link : 'https://technical-frontend-api.bokokode.com/api/products'

      const bodyParameters = {
        sort: {
          key: this.order,
          type: this.direction
        },
        categories: this.categories
      }

      axios.post(link, bodyParameters)
        .then((res: AxiosResponse) => {
          console.log(res)
        })
        .catch((err: AxiosError) => {
          console.error(err)
        })
    },
    changeDirection() {
      this.direction = this.direction === 'ASC' ? 'DESC' : 'ASC'
      this.loadPageInfo()
    }
  }
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
#direction-button {
  background: none;
  border: none;
}
#products-list-categories > section {
  display: flex;
  flex-direction: column;
}
#products-list-found {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
#products-list-pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
}
#products-list-pagination > button {
  background: none;
  border: none;
}
.page-button {
  color: #B4B4B4;
}
.page-active {
  color: #000000;
}
</style>