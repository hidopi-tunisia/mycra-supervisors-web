<template>
  <h4 class="fw-bold py-3 mb-4">Projets</h4>
  <projects-table :items="results" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectsTable from '@/components/projects/table/projects-table.vue'
import DUMMY from './data.json'
const results = ref(DUMMY)
const handleSearch = (value) => {
  results.value = DUMMY.filter((d) => {
    return (
      d.name.toLowerCase().includes(value.toLowerCase()) ||
      d.projectCode.toLowerCase().includes(value.toLowerCase()) ||
      d.client.toLowerCase().includes(value.toLowerCase()) ||
      d.category.toLowerCase().includes(value.toLowerCase())
    )
  })
}
</script>

<style lang="scss" scoped></style>
