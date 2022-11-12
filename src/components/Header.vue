<template>
  <header>
    <div id="header-items">
      <span id="header-logo"> BEJAMAS_ </span>
      <span id="header-cart"> CART </span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderCart',
  // setup() {
  // },
})
</script>

<style lang="scss" scoped>
#header-items {
  display: flex;
  justify-content: space-between;
}
</style>
