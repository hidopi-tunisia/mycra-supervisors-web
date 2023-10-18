<template>
  <div class="demo-inline-spacing d-flex flex-row align-items-center wrapper">
    <!-- Basic Pagination -->
    <label for="table-size-select" class="form-label">Lignes</label>
    <select class="form-select" id="table-size-select" :value="current" @change="handleChangeSize">
      <option disabled>Sélectionner</option>
      <option :key="s" :value="s" v-for="s in props.sizes">{{ s }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['sizes', 'current'])
const emit = defineEmits(['change'])
const handleChangeSize = ({ target }) => {
  const { value } = target
  emit('change', value)
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  right: 0;
}
</style>
