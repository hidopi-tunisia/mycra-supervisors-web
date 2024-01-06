<template>
  <div class="row" v-if="results">
    <div class="col-xs-12 col-sm-6 col-md-4 mb-3">
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
          <h3 class="card-title text-nowrap mb-2">{{ count }}</h3>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 offset-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-start justify-content-between">
            <div class="avatar flex-shrink-0">
              <div class="rounded-avatar border-consultants">
                <i class="bx bx-bell bx-sm align-middle icon-consultants"></i>
              </div>
            </div>
            <div class="dropdown">
              <button class="btn btn-outline-primary" @click="handleClickNotifyRest">
                Notifier le reste
              </button>
            </div>
          </div>
          <span class="d-block mb-1">CRAs saisi ce mois</span>
          <h3 class="card-title text-nowrap mb-2">50%</h3>
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
    v-if="!loading && results && results.length > 0"
    :items="filtered"
    :pages="pages"
    :currentPage="currentPage"
    :sizes="sizes"
    :currentSize="currentSize"
    @search="handleSearch"
    @delete="handleDeleteConsultant"
    @view-cra="handleViewCRA"
    @notify="handleNotifyConsultant"
    @assign-project="handleAssignProject"
    @pagination-change="handlePaginationChange"
    @size-change="handleSizeChange"
  />
  <div
    class="card h-50 d-flex justify-content-center align-items-center"
    v-if="!loading && results && results.length === 0"
  >
    <p>Pas de consultants</p>
    <router-link to="/consultants/new">
      <a class="btn btn-primary" href="#"> Créer un consultant</a>
    </router-link>
  </div>
  <consultant-cra
    v-if="cra"
    ref="modalConsultantCRA"
    :cra="cra"
    @day="handleClickDay"
    @approve="handleApprove"
    @reject="handleReject"
  />
  <div v-if="loading" class="row vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Chargement des données
  </div>
</template>

<script setup lang="ts">
import { getClients } from '@/api/clients'
import { deleteConsultant, getConsultants } from '@/domain/consultants'
import ConsultantsTable from '@/components/consultants/table/consultants-table.vue'
import ConsultantCra from '@/components/consultants/modals/cra/consultant-cra.vue'
import ConsultantsNotifier from '@/components/shared/notifiers/consultants-notifier'
import Picker from '@/components/shared/pickers/projects-picker'
import Swal from 'sweetalert2'
import { ref, toRaw } from 'vue'
import { getConsultantsCount } from '@/domain/statistics/consultants'
import { assignConsultantToProject } from '@/domain/projects'
import { send } from '@/domain/messaging'
import { currentUser } from '@/domain/auth'
import { getCRAs } from '@/domain/me'
import { approveCRA, rejectCRA } from '@/domain/cras'
const count = ref(null)
const retrieveCount = () => {
  const fn = async () => {
    try {
      const { data } = await getConsultantsCount({ status: 'active' })
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
const sizes = ref([1, 5, 10, 25, 50, 100])
const currentSize = ref(25)
const retrieve = async () => {
  try {
    loading.value = true
    const { data } = await getConsultants({
      page: currentPage.value,
      limit: currentSize.value,
      populate: 'projects'
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
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase())
    )
  })
}
const handleDeleteConsultant = (id) => {
  const fn = async () => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer le consultant ?',
      text: 'Cette action est irriversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteConsultant(id)
          retrieve()
          retrieveCount()
          Swal.fire('Supprimé !', 'Le consultant a été supprimé avec succès.', 'success')
        } catch (error) {
          console.log(error)
        }
      }
    })
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
const handleClickNotifyRest = () => {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir envoyer la notification ?',
    text: 'Cette action est irriversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, envoyer !'
  }).then(async ({ isConfirmed }) => {
    if (isConfirmed) {
      try {
        const { uid } = currentUser()
        const body = await ConsultantsNotifier.notify('Notifier le reste')
        const payload = {
          notification: {
            title: 'My CRA',
            body: body
          },
          data: {
            title: 'My CRA',
            body: body
          }
        }
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const date = `${year}_${month}`
        const condition = `'supervisors~${uid}_consultants' in topics && !('supervisors~${uid}_cras_${date}' in topics)`
        payload['condition'] = condition
        await send(payload)
        Swal.fire({
          title: 'Notification envoyée',
          text: 'La notification a été envoyé avec succès.',
          icon: 'success'
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: `Erreur servenue`,
          text: `Une erreur est servenue, ${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  })
}
const handleAssignProject = (id) => {
  const fn = async () => {
    try {
      const project = await Picker.pick()
      await assignConsultantToProject({
        id: project._id,
        clientId: project.client._id,
        consultantId: id
      })
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
const handleNotifyConsultant = (id) => {
  const fn = async () => {
    const consultant = results.value.find(({ _id }) => _id === id)
    if (consultant) {
      const t = `${consultant.firstName} ${consultant.lastName}`
      const body = await ConsultantsNotifier.notify(t)
      const payload = {
        notification: {
          title: 'My CRA',
          body: body
        },
        data: {
          title: 'My CRA',
          body: body
        },
        topic: `consultants~${id}`
      }
      await send(payload)
      Swal.fire({
        title: 'Consultant notifé',
        text: `Le notification a été envoyé vers le consultant ${t} avec succès.`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }
  }
  fn()
}
const modalConsultantCRA = ref(null)
const cra = ref(null)
const handleViewCRA = (id) => {
  const fn = async () => {
    try {
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      const { data } = await getCRAs({ consultant: id, year })
      if (
        Array.isArray(data) &&
        data.length > 0 &&
        data.filter(({ date }) => date.month === month).length > 0
      ) {
        cra.value = data.filter(({ date }) => date.month === month)[0]
      }
    } catch (error) {
      console.log(error)
    }
  }
  fn()
  if (cra.value) {
    modalConsultantCRA.value.show()
  } else {
    Swal.fire({
      title: 'Aucun CRA trouvé',
      text: `Aucun CRA n'a été trouvé pour ce consultant.`,
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }
}
const visible = ref(true)
const motive = ref('')
const handleReject = (id) => {
  motive.value = ''
  Swal.fire({
    title: 'La raison de rejet ?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
    showLoaderOnConfirm: true,
    preConfirm: (r) => {
      motive.value = r
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      const fn = async () => {
        try {
          await rejectCRA(id, motive.value)
          retrieve()
          Swal.fire({
            title: `Rejetté`,
            text: `Le CRA a été rejetté avec succès`,
            icon: 'info',
            confirmButtonText: 'OK'
          })
        } catch (error) {
          Swal.fire({
            title: `Erreur servenue`,
            text: `Une erreur est servenue`,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }
      fn()
    }
  })
}
const handleApprove = (id) => {
  const fn = async () => {
    try {
      await approveCRA(id)
      retrieve()
      Swal.fire({
        title: `Approuvé`,
        text: `Le CRA a été approuvé avec succès`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    } catch (error) {
      Swal.fire({
        title: `Erreur servenue`,
        text: `Une erreur est servenue`,
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
.bg-consultants {
  background-color: #f4433633;
}
.border-consultants {
  border: 1px solid #f44336;
}
.icon-consultants {
  color: #f44336;
}
</style>
