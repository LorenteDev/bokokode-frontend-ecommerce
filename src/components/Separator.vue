<template>
  <hr />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentSeparator',
})
</script>

<style lang="scss" scoped>
// separator
hr {
  height: 3px;
  border: none;
  background-color: #e4e4e4;
}
</style>