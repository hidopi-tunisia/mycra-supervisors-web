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
            <th>Projets</th>
            <th>CRA saisi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0">
          <consultants-table-item
            v-for="item in props.items"
            :key="item._id"
            :item="item"
            @delete="handleDelete"
            @notify="handleNotify"
            @view-cra="handleViewCRA"
            @assign-project="handleAssignProject"
          />
        </tbody>
        <tfoot>
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <table-pagination
                :pages="pages"
                :current="currentPage"
                @change="handleChangePagination"
              />
            </div>
            <div class="col-xs-12 col-sm-6">
              <table-size :sizes="sizes" :current="currentSize" @change="handleChangeSize" />
            </div>
          </div>
        </tfoot>
      </table>
    </div>
    <div class="card-footer d-sm-none"></div>
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
  "view-cra",
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
const handleViewCRA = (cra) => {
  emit('view-cra', cra)
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
