<template>
  <h4 class="fw-bold py-3 mb-4">Projets</h4>
  <projects-table :items="results" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectsTable from '@/components/projects/table/projects-table.vue'
import DUMMY from './data.json'
const results = ref(DUMMY)
</script>

<style lang="scss" scoped></style>
