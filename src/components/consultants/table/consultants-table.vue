<template>
  <div class="card">
    <div class="d-flex flex-row align-items-center justify-content-between">
      <h5 class="card-header">Liste des consultants</h5>
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
            <th>Nom</th>
            <th>Depuis</th>
            <th>Projet en cours</th>
            <th>CRA saisi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
          <consultants-table-item
            v-for="item in props.items.slice(0, currentSize)"
            :key="item._id"
            :item="item"
            @delete="handleDelete"
            @notify="handleNotify"
            @assign-project="handleAssignProject"
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
import ConsultantsTableItem from '@/components/consultants/table/consultants-table-item.vue'
import TablePagination from '@/components/shared/table/table-pagination.vue'
import TableSize from '@/components/shared/table/table-size.vue'
const props = defineProps({
  items: Array,
  pages: Number,
  currentPage: Number,
  sizes: Array<Number>,
  currentSize: Number
})
const emit = defineEmits([
  'search',
  'delete',
  'pagination-change',
  'size-change',
  'notify',
  'assign-project'
])
const handleInputSearch = ({ target }) => {
  const { value } = target
  emit('search', value)
}
const handleDelete = (id) => {
  emit('delete', id)
}
const handleNotify = (id) => {
  emit('notify', id)
}
const handleAssignProject = (id) => {
  emit('assign-project', id)
}
const handleChangePagination = (page) => {
  emit('pagination-change', page)
}
const handleChangeSize = (page) => {
  emit('size-change', page)
}
</script>

<style scoped></style>
