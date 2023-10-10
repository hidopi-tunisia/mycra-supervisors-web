<template>
  <div class="card">
    <h5 class="card-header">Liste des projets</h5>
    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
          <tr>
            <th>Projet</th>
            <th>Client</th>
            <th>Consultant</th>
            <th>Code</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
          <projects-table-item v-for="item in props.items" :key="item._id" :item="item" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectsTableItem from '@/components/projects/table/projects-table-item.vue'
const props = defineProps({ items: Array })
</script>

<style scoped></style>
