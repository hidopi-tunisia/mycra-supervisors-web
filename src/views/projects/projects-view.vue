<template>
  <div class="row">
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
          <h3 class="card-title text-nowrap mb-2">{{ count }}</h3>
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
    v-if="!loading && results && results.length > 0"
    :items="filtered"
    :pages="pages"
    :currentPage="currentPage"
    :sizes="sizes"
    :currentSize="currentSize"
    :status="status"
    @search="handleSearch"
    @assign-consultant="handleAssignConsultant"
    @toggle-status="handleToggleStatus"
    @show-update="handleShowUpdateProject"
    @delete="handleDeleteProject"
    @pagination-change="handlePaginationChange"
    @size-change="handleSizeChange"
    @status-change="handleStatusChange"
  />
  <div
    class="card h-50 d-flex justify-content-center align-items-center"
    v-if="!loading && results && results.length === 0"
  >
    <p>Pas de projets</p>
    <button class="btn btn-primary" @click="modalCreateProject.show()">Créer un projet</button>
  </div>
  <project-create-modal
    ref="modalCreateProject"
    :clients="resultsClients"
    :client="client"
    @assign-client="handleAssignClient"
    @submit="handleCreateProject"
  />
  <project-update-modal
    ref="modalUpdateProject"
    :clients="resultsClients"
    :project="project"
    :client="client"
    @assign-client="handleAssignClient"
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
import {
  getProjects,
  deleteProject,
  toggleProjectStatus,
  assignConsultantToProject,
  getProject,
  updateProject
} from '@/domain/projects'
import { getClients } from '@/domain/clients'
import { createProject } from '@/domain/projects'
import ProjectCreateModal from '@/components/projects/modals/project-create-modal.vue'
import ProjectUpdateModal from '@/components/projects/modals/project-update-modal.vue'
import ProjectsTable from '@/components/projects/table/projects-table.vue'
import Swal from 'sweetalert2'
import ConsultantsPicker from '@/components/shared/pickers/constultants-picker'
import ClientsPicker from '@/components/shared/pickers/clients-picker'
import { ref } from 'vue'
import { getProjectsCount } from '@/domain/statistics/projects'

const count = ref(null)
const retrieveCount = () => {
  const fn = async () => {
    try {
      const { data } = await getProjectsCount({ status: 'active' })
      count.value = data.count
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
retrieveCount()
const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const pages = ref(5)
const currentPage = ref(0)
const sizes = ref([5, 10, 25, 50, 100])
const currentSize = ref(25)
const status = ref('')
const retrieve = async () => {
  try {
    loading.value = true
    const { data } = await getProjects({
      populate: 'client,consultants',
      page: currentPage.value,
      limit: currentSize.value,
      status: status.value
    })
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
      d.code.toLowerCase().includes(value.toLowerCase()) ||
      d.client.toLowerCase().includes(value.toLowerCase()) ||
      d.category.toLowerCase().includes(value.toLowerCase())
    )
  })
}
const handleShowUpdateProject = (id) => {
  const fn = async () => {
    try {
      modalUpdateProject.value.show()
      client.value = null
      const { data } = await getProject(id, { populate: 'client' })
      project.value = data
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const handleToggleStatus = ({ id, clientId }) => {
  const fn = () => {
    try {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir changer le statut du projet ?',
        text: 'Cette action est irriversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, changer !'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await toggleProjectStatus({ id, clientId })
          retrieveCount()
          retrieve()
          Swal.fire('Statut changé !', 'Le statut du projet a été changé avec succès.', 'success')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const handleDeleteProject = (id) => {
  const fn = () => {
    try {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer le projet ?',
        text: 'Cette action est irriversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimer !'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteProject(id)
          retrieve()
          Swal.fire('Supprimé !', 'Le projet a été supprimé avec succès.', 'success')
        }
      })
    } catch (error) {
      console.log(error)
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
const modalCreateProject = ref(null)
const modalUpdateProject = ref(null)
const handleAssignConsultant = ({ id, clientId }) => {
  const fn = async () => {
    try {
      const { _id } = await ConsultantsPicker.pick()
      await assignConsultantToProject({ id, clientId, consultantId: _id })
      retrieveCount()
      retrieve()
      Swal.fire({
        title: 'Consultant assigné au projet',
        text: `Le consultant a été assigné au projet avec succès.`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
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
      client.value = c
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const handleCreateProject = (p) => {
  const fn = async () => {
    try {
      if (client.value && client.value._id) {
        modalCreateProject.value.hide()
        const clientId = client.value._id
        client.value = null
        await createProject(clientId, p)
        retrieve()
        Swal.fire({
          title: `Projet crée`,
          text: 'Le projet a été créé avec succès',
          icon: 'info',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.log(error)
      modalCreateProject.value.hide()
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
const handleStatusChange = (s) => {
  status.value = s
  retrieve()
  retrieveCount()
}
const project = ref(null)
const handleUpdateProject = (p) => {
  const fn = async () => {
    try {
      modalUpdateProject.value.hide()
      client.value = null
      await updateProject(p._id, p)
      retrieve()
      Swal.fire({
        title: `Projet modifié`,
        text: 'Le projet a été modifié avec succès',
        icon: 'info',
        confirmButtonText: 'OK'
      })
    } catch (error) {
      console.log(error)
      modalUpdateProject.value.hide()
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
