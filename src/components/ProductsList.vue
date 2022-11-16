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
        <label id="products-list-sort">
          <span>
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
        <button
          id="products-list-filter-open"
          @click="openFilter()">
          <img :src="filterIcon" alt="filter">
        </button>
      </section>
    </section>
    <section
      v-if="isFilterOpen"
      id="products-list-filter-container">
      <div id="products-list-filter">
        <section id="products-list-filter-top">
          <h2>Filter</h2>
          <button
            id="products-list-filter-close"
            @click="closeFilter()">
            <img :src="closeIcon" alt="close">
          </button>
        </section>
        <section id="products-list-filter-categories">
          <label
            v-for="category in categoryOptions"
            :key="category"
            class="products-list-filter-categories-checkbox">
            <input
              type="checkbox"
              :value="category"
              v-model="categoriesFilter">
            {{ capitalize(category) }}
          </label>
        </section>
        <section id="products-list-filter-actions-container">
          <hr />
          <section id="products-list-filter-actions">
            <button
              id="products-list-filter-clear"
              @click="clearFilter()">CLEAR</button>
            <button
              id="products-list-filter-save"
              @click="saveFilter()">SAVE</button>
          </section>
        </section>
      </div>
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
import filterIcon from "../assets/png/filter.png";
import closeIcon from "../assets/svg/close.svg";


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
      categoriesFilter: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      categoryOptions: ['people', 'premium', 'pets', 'food', 'landmarks', 'cities', 'nature'] as Array<CategoryTerm>,
      isFilterOpen: false,
      sortArrows,
      filterIcon,
      closeIcon
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
          const top: HTMLElement | null = document.getElementById('products-list-top')
          if (top) {
           top.scrollIntoView({behavior: "smooth"})
          }
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
    },
    openFilter() {
      this.categoriesFilter = [ ...this.categories ]
      this.isFilterOpen = true
    },
    closeFilter() {
      this.isFilterOpen = false
    },
    clearFilter() {
      this.categoriesFilter = [ ...this.categoryOptions ]
      this.closeFilter()
    },
    saveFilter () {
      this.categories = [ ...this.categoriesFilter ]
      this.loadPageInfo()
      this.closeFilter()
    }
  }
})
</script>

<style lang="scss" scoped>
#products-list-content {
  display: flex;
  justify-content: space-between;
  user-select: none;
}
#products-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
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
#products-list-sort > span {
  font-size: 24px;
  color: #9B9B9B;
}
#products-list-sort-select {
  background: none;
  border: none;
  font-size: 24px;
}
#products-list-filter-container {
  display: none;
  background: #3b3b3b3a;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  user-select: none;
}
#products-list-filter {
  display: none;
  width: 90vw;
  overflow: scroll;
}
#products-list-filter-actions-container {
  position: fixed;
  bottom: 0;
  width: 90%;
  padding-bottom: 30px;
  background: #fff;
}
#products-list-filter-actions-container > hr{
  height: 4px;
  border: none;
  background-color: #e4e4e4;
  margin-top: 20px;
  margin-bottom: 20px;
}
#products-list-filter-actions {
  display: flex;
  justify-content: space-between;
  float: bottom;
}
#products-list-filter-actions > button {
  width: 47%;
  height: 48px;
  font-size: 23px;
}
#products-list-filter-clear {
  background: #fff;
  color: #000;
  border: 3px solid #000;
}
#products-list-filter-save {
  background: #000;
  color: #fff;
  border: 3px solid #000;
}
#products-list-filter-open {
  display: none;
}
#products-list-filter-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
#products-list-filter-top > h2 {
  font-size: 34px;
  margin: 0;
}
#products-list-filter-close {
  background: none;
  border: none;
  padding: 0;
}
#products-list-filter-close > img {
  background: none;
  border: none;
  padding: 0;
  height: 40px;
  width: 40px;
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
.products-list-filter-categories-checkbox,
.products-list-categories-checkbox {
  padding: 10px 0 10px 0;
  margin: 10px 0 10px 0;
  font-size: 22px;
  user-select: none;
}
.products-list-filter-categories-checkbox {
  font-size: 28px;
}
#products-list-filter-categories {
  display: flex;
  flex-direction: column;
  height: 60vh;
  overflow: scroll;
}
#products-list-found-wrapper {
  // margin-left: 200px;
  width: 100%;
}
#products-list-found {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}
#products-list-pagination {
  display: flex;
  justify-content: center;
  gap: 13px;
  flex-wrap: wrap;
  margin-top: 100px;
  width: 100%;
}
#products-list-pagination > button {
  background: none;
  border: none;
}
#products-list-pagination > button:hover {
  text-decoration: underline;
}
#products-list-no-results {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}
.page-button {
  color: #B4B4B4;
  font-weight: bold;
  font-size: 29px;
}
#products-list-pagination > button:first-child,
#products-list-pagination > button:last-child,
.page-active {
  color: #000000;
  font-weight: bold;
  font-size: 29px;
}
@media only screen and (max-width: 924px) {
  #products-list-found {
    justify-content: center;
  }
}
@media only screen and (max-width: 768px) {
  #products-list-top > h1 {
    font-size: 18px;
  }
  #products-list-direction-button,
  #products-list-sort {
    display: none;
  }
  #products-list-filter-open {
    display: block;
    background: none;
    border: none;
  }
  #products-list-filter-container {
    display: block;
  }
  #products-list-filter {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    height: 85vh;
    padding: 5%;
  }
  #products-list-filter-open > img {
    height: 30px;
    width: 30px;
  }
  #products-list-categories {
    display: none;
  }
  #products-list-found {
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
    gap: 30px;
  }
  #products-list-pagination {
    gap: 15px;
  }
  #products-list-pagination > button {
    background: none;
    border: none;
  }
}
</style>