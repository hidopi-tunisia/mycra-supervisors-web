<template>
  <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
    <div class="card">
      <div class="row row-bordered g-0">
        <div class="col-md-12">
          <h5 class="card-header m-0 me-2 pb-3">Taux d'absence chaques années</h5>
          <div ref="container" class="px-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { draw } from './script.js'
const container = ref(null)
onMounted(() => {
  draw({}, { container: container.value })
})
</script>
