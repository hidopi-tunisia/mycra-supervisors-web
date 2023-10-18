<template>
  <div class="row" v-if="results">
    <div class="col-xs-12 col-sm-6 col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-start justify-content-between">
            <div class="avatar flex-shrink-0">
              <div class="rounded-avatar bg-projects">
                <i class="bx bx-code-block bx-sm align-middle icon-projects"></i>
              </div>
            </div>
            <div class="dropdown">
              <button type="button" class="btn btn-primary" @click="modalCreateProject.show()">
                Créer un projet
              </button>
            </div>
          </div>
          <span class="d-block mb-1">Projets</span>
          <h3 class="card-title text-nowrap mb-2">{{ results.length }}</h3>
        </div>
      </div>
    </div>
  </div>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <a href="#">Projets</a>
      </li>
    </ol>
  </nav>
  <projects-table
    v-if="results"
    :items="filtered"
    :pages="pages"
    :currentPage="currentPage"
    :sizes="sizes"
    :currentSize="currentSize"
    @search="handleSearch"
    @assign-consultant="handleAssignConsultant"
    @toggle-status="handleToggleStatus"
    @show-update="handleShowUpdateProject"
    @delete="handleDeleteProject"
    @pagination-change="handlePaginationChange"
    @size-change="handleSizeChange"
  />
  <project-create-modal
    ref="modalCreateProject"
    :clients="resultsClients"
    :client="client"
    @assign-client="handleAssignClient"
  />
  <project-update-modal
    ref="modalUpdateProject"
    :clients="resultsClients"
    :project="project"
    @submit="handleUpdateProject"
  />
  <div v-if="loading" class="row vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Chargement des données
  </div>
</template>

<script setup lang="ts">
import { getClients } from '@/domain/clients'
import ProjectCreateModal from '@/components/projects/modals/project-create-modal.vue'
import ProjectUpdateModal from '@/components/projects/modals/project-update-modal.vue'
import ProjectsTable from '@/components/projects/table/projects-table.vue'
import Swal from 'sweetalert2'
import ConsultantsPicker from '@/components/shared/pickers/constultants-picker'
import ClientsPicker from '@/components/shared/pickers/clients-picker'
import { ref } from 'vue'

const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const pages = ref(5)
const currentPage = ref(0)
const sizes = ref([5, 10, 25, 50, 100])
const currentSize = ref(25)
const fn = async () => {
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
      d.name.toLowerCase().includes(value.toLowerCase()) ||
      d.projectCode.toLowerCase().includes(value.toLowerCase()) ||
      d.client.toLowerCase().includes(value.toLowerCase()) ||
      d.category.toLowerCase().includes(value.toLowerCase())
    )
  })
}
const project = ref(null)
const handleUpdateProject = (project) => {
  console.log(project)
  modalUpdateProject.value.hide()
}
const handleShowUpdateProject = (id) => {
  modalUpdateProject.value.show()
  project.value = results.value.find(({ _id }) => _id === id)
}
const handleToggleStatus = (id) => {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir changer le statut du projet ?',
    text: 'Cette action est irriversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, changer !'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Statut changé !', 'Le statut du projet a été changé avec succès.', 'success')
    }
  })
}
const handleDeleteProject = (id) => {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer le projet ?',
    text: 'Cette action est irriversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer !'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Supprimé !', 'Le projet a été supprimé avec succès.', 'success')
    }
  })
}
const handlePaginationChange = (p) => {
  currentPage.value = Number(p)
  fn()
}
const handleSizeChange = (s) => {
  currentSize.value = Number(s)
  fn()
}
const modalCreateProject = ref(null)
const modalUpdateProject = ref(null)
const handleAssignConsultant = () => {
  const fn = async () => {
    try {
      const { _id } = await ConsultantsPicker.pick()
      console.log(_id)
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const client = ref(null)
const handleAssignClient = () => {
  const fn = async () => {
    try {
      const c = await ClientsPicker.pick()
      console.log(c)
      console.log(c._id)
      client.value = c
    } catch (error) {
      console.log(error)
    }
  }
  fn()
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
.bg-projects {
  background-color: #03a9f433;
}
.icon-projects {
  color: #03a9f4;
}
</style>
