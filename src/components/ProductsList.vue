<template>
  <section
    v-if="$store.getters.getProducts && $store.getters.getPaginationData"
    id="products-list">
    <section id="products-list-top">
      <h1>
        Photography / <span id="products-list-top-subcategory">Premium Photos</span>
      </h1>
      <section id="products-list-top-sort">
        <button
          id="products-list-direction-button"
          @click="changeDirection()">
          <img :src="sortArrows" alt="switch sort direction">
        </button>
        <label>
          <span id="products-list-sort-label">
            Sort by
          </span>
          <select
            v-model="order"
            @change="loadPageInfo()"
            id="products-list-sort-select">
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
            @change="loadPageInfo()"
            class="products-list-categories-checkbox">
            <input
              type="checkbox"
              :value="category"
              v-model="categories">
            {{ capitalize(category) }}
          </label>
        </section>
      </aside>
      <section
        v-if="[ ...$store.getters.getProducts ] && [ ...$store.getters.getProducts ].length"
        id="products-list-found-wrapper">
        <section id="products-list-found">
          <ProductCard
            v-for="product in [ ...$store.getters.getProducts ]"
            :key="product._id"
            :product="product" />
        </section>
        <section id="products-list-pagination">
          <button 
            v-for="link in $store.getters.getPaginationData.links"
            :key="link"
            @click="loadPageInfo(link.url)"
            :disabled="!link.url"
            :class="link.active ? 'page-active' : 'page-button'">
            {{ parsePaginationLabel(link.label) }}
          </button>
        </section>
      </section>
      <section
        v-else
        id="products-list-no-results">
        No results
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios, { AxiosError, AxiosResponse } from 'axios'
import store from '../store'

// Icons
import sortArrows from "../assets/svg/sort-arrows.svg";

// Components
import ProductCard from '../components/ProductCard.vue'

// Types
import Product from '../types/Product'
import PaginationData from '../types/PaginationData'
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
  data() {
    return {
      order: 'name' as OrderTerm,
      orderOptions: ['name', 'price'] as Array<OrderTerm>,
      direction: 'ASC' as DirectionTerm,
      categories: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      categoryOptions: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      sortArrows
    }
  },
  methods: {
    capitalize,
    loadPageInfo(link?: string | null) {
      // if there's no link it will use the default one
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
          const pagination = res.data.data
          const pageProducts: Array<Product> = res.data.data.data

          // Delete 'data' key for paginationData since it's not needed
          delete pagination['data']

          store.commit('setPaginationData', pagination as PaginationData)
          store.commit('setProducts', pageProducts as Array<Product>)
          store.commit('setLoading', false)
        })
        .catch((err: AxiosError) => {
          console.error(err)
        })
    },
    changeDirection() {
      this.direction = this.direction === 'ASC' ? 'DESC' : 'ASC'
      this.loadPageInfo()
    },
    parsePaginationLabel (label: string) {
      if (label === '&laquo; Previous') {
        label = '<'
      } else if (label === 'Next &raquo;') {        
        label = '>'
      }
      return label
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
#products-list-top > h1 {
  font-size: 30px;
}
#products-list-top-subcategory {
  color: #9B9B9B;
  font-weight: normal;
}
#products-list-top-sort {
  display: flex;
  align-items: center;
}
#products-list-direction-button {
  background: none;
  border: none;
  height: 22px;
  width: 22px;
  margin-right: 7px;
}
#products-list-direction-button > img {
  height: 22px;
  width: 22px;
}
#products-list-sort-label {
  font-size: 24px;
  color: #9B9B9B;
}
#products-list-sort-select {
  background: none;
  border: none;
  font-size: 24px;

}
#products-list-categories {
  width: 40%;
}
#products-list-categories > h2 {
  margin-top: 0;
}
#products-list-categories > section {
  display: flex;
  flex-direction: column;
}
input[type="checkbox"] {
  width: 23px;
  height: 23px;
  accent-color: #000;
  background: red;
  margin-right: 23px;
}
.products-list-categories-checkbox {
  padding: 10px 0 10px 0;
  margin: 10px 0 10px 0;
  font-size: 22px;
  user-select: none;
}
#products-list-found-wrapper {
  // margin-left: 200px;
}
#products-list-found {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px 55px;
}
#products-list-found > article {
  flex: 0 0 33.333333%;
}
#products-list-pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 100px;
}
#products-list-pagination > button {
  background: none;
  border: none;
}
#products-list-no-results {
  width: 100%;
  display: flex;
  justify-content: center;
}
.page-button {
  color: #B4B4B4;
  font-weight: bold;
  font-size: 29px;
}
.page-active {
  color: #000000;
  font-weight: bold;
  font-size: 29px;
}
</style>