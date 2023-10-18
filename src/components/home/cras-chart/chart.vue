<template>
  <div ref="container"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { draw } from './script.js'
const container = ref(null)
onMounted(() => {
  draw({}, { container: container.value })
})
</script>
