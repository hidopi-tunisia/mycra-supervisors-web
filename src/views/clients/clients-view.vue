<template>
  <div class="row" v-if="results">
    <div class="col-xs-12 col-sm-6 col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-start justify-content-between">
            <div class="avatar flex-shrink-0">
              <div class="rounded-avatar bg-clients">
                <i class="bx bx-user bx-sm align-middle icon-clients"></i>
              </div>
            </div>
            <div class="dropdown">
              <router-link to="/clients/new">
                <a class="btn btn-primary" href="#"> Créer un client</a>
              </router-link>
            </div>
          </div>
          <span class="d-block mb-1">Clients</span>
          <h3 class="card-title text-nowrap mb-2">{{ results.length }}</h3>
        </div>
      </div>
    </div>
  </div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <a href="#">Clients</a>
      </li>
    </ol>
  </nav>
  <clients-table
    v-if="!loading && results && results.length > 0"
    :items="filtered"
    :pages="pages"
    :currentPage="currentPage"
    :sizes="sizes"
    :currentSize="currentSize"
    @search="handleSearch"
    @delete="handleDeleteClient"
    @pagination-change="handlePaginationChange"
    @size-change="handleSizeChange"
  />
  <div
    class="card h-50 d-flex justify-content-center align-items-center"
    v-if="!loading && results && results.length === 0"
  >
    <p>Pas de clients</p>
    <router-link to="/clients/new">
      <a class="btn btn-primary" href="#"> Créer un client</a>
    </router-link>
  </div>
  <div v-if="loading" class="row vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Chargement des données
  </div>
</template>

<script setup lang="ts">
import { deleteClient, getClients } from '@/domain/clients'
import ClientsTable from '@/components/clients/table/clients-table.vue'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const pages = ref(5)
const currentPage = ref(0)
const sizes = ref([5, 10, 25, 50, 100])
const currentSize = ref(25)
const retrieve = async () => {
  try {
    loading.value = true
    const { data } = await getClients({ page: currentPage.value, limit: currentSize.value })
    results.value = data
    filtered.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
retrieve()
const handleSearch = (value) => {
  filtered.value = results.value.filter((d) => {
    return (
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase()) ||
      d.email.toLowerCase().includes(value.toLowerCase())
    )
  })
}
const handleDeleteClient = (id) => {
  const fn = async () => {
    try {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer le client ?',
        text: 'Cette action est irriversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteClient(id)
          retrieve()
          Swal.fire('Supprimé !', 'Le client a été supprimé avec succès.', 'success')
        }
      })
    } catch (error) {
      Swal.fire({
        title: `Erreur servenue`,
        text: `Une erreur est servenue, ${error.response.data.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  fn()
}
const handlePaginationChange = (p) => {
  currentPage.value = Number(p)
  retrieve()
}
const handleSizeChange = (s) => {
  currentSize.value = Number(s)
  retrieve()
}
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
.bg-clients {
  background-color: #4caf5033;
}
.icon-clients {
  color: #4caf50;
}
</style>
