<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <router-link to="/consultants">
          <a href="#">Consultants</a>
        </router-link>
      </li>
      <li class="breadcrumb-item" v-if="result" :result="result.firstName">
        {{ result.firstName }} {{ result.lastName }}
      </li>
      <li class="breadcrumb-item" v-else>Détails du consultant</li>
    </ol>
  </nav>
  <ul class="nav nav-pills flex-column flex-md-row mb-3">
    <li class="nav-item with-pointer">
      <a
        class="nav-link with-pointer"
        :class="tab === 'profile' ? 'active' : ''"
        @click="handleClickTab('profile')"
        ><i class="bx bx-user me-1"></i> Profil</a
      >
    </li>
    <li class="nav-item with-pointer">
      <a
        class="nav-link with-pointer"
        :class="tab === 'history' ? 'active' : ''"
        @click="handleClickTab('history')"
        ><i class="bx bx-time me-1"></i> Historique</a
      >
    </li>
  </ul>
  <consultant-profile-form
    v-if="tab === 'profile' && result"
    isUpdate="true"
    :profile="result"
    :loading="loading"
    :loadingProgress="loadingProgress"
    :uploadProgress="uploadProgress"
    @upload="handleUpload"
    @submit="handleSubmit"
  />
  <consultant-profile-history
    isUpdate="true"
    v-if="tab === 'history' && history && visible"
    :profile="result"
    :history="history"
    @year-changed="handleChangeYear"
    @approve-cra="handleApprove"
    @reject-cra="handleReject"
  />
  <div v-if="loading" class="row vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Chargement des données
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getConsultant, updateConsultant } from '@/domain/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import ConsultantProfileHistory from '@/components/consultants/details/consultant-profile-history.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { upload } from '@/domain/buckets'
import { getCRAs } from '@/domain/me'
import { approveCRA, rejectCRA } from '@/domain/cras'
const { push } = useRouter()
const { params } = useRoute()
const id = params.id as string
const result = ref(null)
const history = ref(null)
const loading = ref(false)
const year = ref(new Date().getFullYear())
const retrieve = async () => {
  try {
    loading.value = true
    const { data } = await getConsultant(id)
    const { data: historyData } = await getCRAs({ consultant: id, year: year.value })
    result.value = data
    history.value = historyData
    loading.value = false
    visible.value = false
    setTimeout(() => {
      visible.value = true
    }, 500)
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
retrieve()
const handleSubmit = (payload) => {
  const fn = async () => {
    try {
      loading.value = true
      const { data } = await updateConsultant(id, payload)
      result.value = data
      loading.value = false
      Swal.fire({
        title: `Consultant modifié`,
        text: 'Le consultant a été modifié avec succès',
        icon: 'info',
        confirmButtonText: 'OK',
        showDenyButton: true,
        denyButtonText: `Voir liste`,
        denyButtonColor: '#0288D1'
      }).then(({ isConfirmed, isDenied }) => {
        /* Read more about isConfirmed, isDenied below */
        if (isConfirmed) {
          push(`/consultants/${data._id}`)
        } else if (isDenied) {
          push(`/consultants`)
        }
      })
    } catch (error) {
      loading.value = false
      console.log(error)
      console.log(error.response.data)
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
const tab = ref('history')
const handleClickTab = (t) => {
  tab.value = t
}
const uploadProgress = ref(null)
const loadingProgress = ref(false)
const errorProgress = ref(null)
const handleUpload = (file) => {
  const onComplete = async (profilePhoto) => {
    const { data } = await updateConsultant(id, { profilePhoto })
    result.value = data
    loadingProgress.value = false
  }
  const onProgress = ({ transferred, total }) => {
    loadingProgress.value = true
    uploadProgress.value = Math.round((transferred / total) * 100)
  }
  const onError = (error) => {
    uploadProgress.value = null
    console.info(error)
  }
  upload({
    path: `avatars/${id}`,
    data: file,
    onError,
    onProgress,
    onComplete
  })
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
const handleChangeYear = (y) => {
  year.value = Number(y)
  retrieve()
}
</script>

<style lang="scss" scoped></style>
