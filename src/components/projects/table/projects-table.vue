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
            <th>Consultants</th>
            <th>Code</th>
            <th>Catégorie</th>
            <th>
              <div class="dropdown position-static d-flex align-items-center">
                <div class="with-pointer" data-bs-toggle="dropdown">
                  Statut -
                  <span v-show="status === ''">Tout</span>
                  <span v-show="status === 'active'">Actif</span>
                  <span v-show="status === 'inactive'">Inactif</span>
                </div>
                <i class="bx bx-dots-vertical-rounded with-pointer" data-bs-toggle="dropdown"></i>
                <div class="dropdown-menu">
                  <a class="dropdown-item with-pointer" @click="handleChangeStatus('')">
                    <i class="bx bx-list-check me-1"></i>Tout
                  </a>
                  <a class="dropdown-item with-pointer" @click="handleChangeStatus('active')">
                    <i class="bx bx-check me-1"></i>Actif
                  </a>
                  <a class="dropdown-item with-pointer" @click="handleChangeStatus('inactive')">
                    <i class="bx bx-x me-1"></i>Inactif
                  </a>
                </div>
              </div>
            </th>
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
            @toggle-status="handleToggleStatus"
            @assign-consultant="handleAssignConsultant"
          />
        </tbody>
        <tfoot>
          <div class="row">
            <div class="col-6">
              <table-pagination
                :pages="pages"
                :current="currentPage"
                @change="handleChangePagination"
              />
            </div>
            <div class="col-6">
              <table-size :sizes="sizes" :current="currentSize" @change="handleChangeSize" />
            </div>
          </div>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectsTableItem from '@/components/projects/table/projects-table-item.vue'
import TablePagination from '@/components/shared/table/table-pagination.vue'
import TableSize from '@/components/shared/table/table-size.vue'
const props = defineProps({
  items: Array,
  pages: Number,
  currentPage: Number,
  sizes: Array<Number>,
  currentSize: Number,
  status: String,
})
const emit = defineEmits([
  "status-change",
  'search',
  'delete',
  'show-update',
  'toggle-status',
  'pagination-change',
  'size-change',
  'assign-consultant'
])
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
const handleToggleStatus = ({ id, clientId }) => {
  emit('toggle-status', { id, clientId })
}
const handleChangePagination = (page) => {
  emit('pagination-change', page)
}
const handleChangeSize = (page) => {
  emit('size-change', page)
}
const handleAssignConsultant = ({ id, clientId }) => {
  emit('assign-consultant', { id, clientId })
}
const handleChangeStatus = (status) => {
  emit('status-change', status)
}
</script>

<style scoped></style>
