<template>
  <div class="card">
    <div class="d-flex flex-row align-items-center justify-content-between">
      <h5 class="card-header">Liste des projets</h5>
      <div class="nav-item d-flex align-items-center">
        <i class="bx bx-search fs-4 lh-0"></i>
        <input
          type="text"
          class="form-control border-0 shadow-none"
          placeholder="Rechercher..."
          aria-label="Rechercher..."
          @input="handleInputSearch"
        />
      </div>
    </div>
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
          <projects-table-item
            v-for="item in props.items"
            :key="item._id"
            :item="item"
            @delete="handleDelete"
            @update="handleUpdate"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectsTableItem from '@/components/projects/table/projects-table-item.vue'
const props = defineProps({ items: Array })
const emit = defineEmits(['search', 'delete', "show-update"])
const handleInputSearch = ({ target }) => {
  const { value } = target
  emit('search', value)
}
const handleUpdate = (id) => {
  emit('show-update', id)
}
const handleDelete = (id) => {
  emit('delete', id)
}
</script>

<style scoped></style>
