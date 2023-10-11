<template>
  <div class="row" v-if="results">
    <div class="col-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-start justify-content-between">
            <div class="avatar flex-shrink-0">
              <div class="rounded-avatar bg-consultants">
                <i class="bx bxs-user-badge bx-sm align-middle icon-consultants"></i>
              </div>
            </div>
            <div class="dropdown">
              <router-link to="/consultants/new">
                <a class="btn btn-primary" href="#"> Créer un consultant</a>
              </router-link>
            </div>
          </div>
          <span class="d-block mb-1">Consultants</span>
          <h3 class="card-title text-nowrap mb-2">{{ results.length }}</h3>
        </div>
      </div>
    </div>
  </div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <a href="#">Consultants</a>
      </li>
    </ol>
  </nav>
  <consultants-table
    v-if="results"
    :items="filtered"
    :pages="pages"
    :currentPage="currentPage"
    :sizes="sizes"
    :currentSize="currentSize"
    @search="handleSearch"
    @show-update="handleShowUpdateConsultant"
    @delete="handleDeleteConsultant"
    @pagination-change="handlePaginationChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup lang="ts">
import { getClients } from '@/api/clients'
import { getConsultants } from '@/api/consultants'
import ConsultantsTable from '@/components/consultants/table/consultants-table.vue'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const pages = ref(5)
const currentPage = ref(1)
const sizes = ref([5, 10, 25, 50, 100])
const currentSize = ref(10)
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getConsultants()
    results.value = data
    filtered.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
const resultsClients = ref(null)
const fn2 = async () => {
  try {
    const { data } = await getClients()
    resultsClients.value = data
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
  }
}
fn2()
const handleSearch = (value) => {
  filtered.value = results.value.filter((d) => {
    return (
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase())
    )
  })
}
const consultant = ref(null)
const handleUpdateConsultant = (consultant) => {
  console.log(consultant)
  modalUpdateConsultant.value.hide()
}
const handleShowUpdateConsultant = (id) => {
  modalUpdateConsultant.value.show()
  consultant.value = results.value.find(({ _id }) => _id === id)
}
const handleDeleteConsultant = (id) => {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer le consultant ?',
    text: 'Cette action est irriversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer !'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Supprimé!', 'Le consultant a été supprimé avec succès.', 'success')
    }
  })
}
const handlePaginationChange = (p) => {
  currentPage.value = p
}
const handleSizeChange = (s) => {
  currentSize.value = s
}
const modalCreateConsultant = ref(null)
const modalUpdateConsultant = ref(null)
</script>

<style lang="css" scoped>
.rounded-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.bg-consultants {
  background-color: #f4433633;
}
.icon-consultants {
  color: #f44336;
}
</style>
