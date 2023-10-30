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
    v-if="tab === 'history' && history"
    :profile="result"
    :history="history"
    @year-changed="handleChangeYear"
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
const { push } = useRouter()
const { params } = useRoute()
const id = params.id as string
const result = ref(null)
const history = ref(null)
const loading = ref(false)
const year = ref(new Date().getFullYear())
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getConsultant(id)
    const { data: historyData } = await getCRAs({ consultant: id, year: year.value })
    result.value = data
    history.value = historyData
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
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
const handleChangeYear = (y) => {
  year.value = Number(y)
  fn()
}
</script>

<style lang="scss" scoped></style>
