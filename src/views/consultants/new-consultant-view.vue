<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <router-link to="/consultants">
          <a href="#">Consultants</a>
        </router-link>
      </li>
      <li class="breadcrumb-item">Créer un consultant</li>
    </ol>
  </nav>
  <consultant-profile-form
    :loading="loading"
    :file="uri"
    @upload="handleUpload"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { createConsultant, updateConsultant } from '@/domain/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { upload } from '@/domain/buckets'
const { push } = useRouter()
const result = ref(null)
const loading = ref(false)
const handleSubmit = (payload) => {
  const fn = async () => {
    try {
      loading.value = true
      const { data } = await createConsultant(payload)
      updateProfilePhoto(data._id)
      result.value = data
      loading.value = false
      Swal.fire({
        title: `Consultant crée`,
        text: 'Le consultant a été créé avec succès',
        icon: 'info',
        confirmButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Fermer',
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
const file = ref(null)
const uri = ref(null)
const photo = ref(null)
const uploadProgress = ref(null)
const loadingProgress = ref(false)
const errorProgress = ref(null)
const handleUpload = (f) => {
  file.value = f
  var reader = new FileReader()
  reader.onloadend = function () {
    uri.value = reader.result
  }
  if (f) {
    reader.readAsDataURL(f)
  } else {
    uri.value = null
  }
}
const updateProfilePhoto = (id) => {
  const onComplete = async (profilePhoto) => {
    photo.value = profilePhoto
    loadingProgress.value = false
    updateConsultant(id, { profilePhoto })
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
    data: file.value,
    onError,
    onProgress,
    onComplete
  })
}
</script>

<style lang="scss" scoped></style>
