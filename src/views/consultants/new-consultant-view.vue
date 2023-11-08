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
    :file="photo"
    @reset-photo="handleResetPhoto"
    @upload="handleUpload"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { createConsultant, getConsultant, updateConsultant } from '@/domain/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { upload } from '@/domain/buckets'
import Toaster from '@/components/shared/toasts/toaster'
const { push } = useRouter()
const result = ref(null)
const loading = ref(false)
const handleSubmit = (payload) => {
  const fn = async () => {
    try {
      loading.value = true
      const { data } = await createConsultant(payload)
      result.value = data
      loading.value = false
      Swal.fire({
        title: `Consultant crée`,
        text: 'Le consultant a été créé avec succès',
        icon: 'info',
        confirmButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Fermer',
        denyButtonColor: '#0288D1'
      }).then(({ isConfirmed }) => {
        /* Read more about isConfirmed, isDenied below */
        if (isConfirmed) {
          push(`/consultants`)
        }
      })
      if (photo.value) {
        const url = await updateFile(photo.value, 'avatars/' + data._id)
        const { data: c } = await getConsultant(data._id)
        await updateConsultant(c._id, { profilePhoto: url })
      }
      if (file.value) {
        const url = await updateFile(file.value, 'documents/skills/' + data._id)
        const { data: c } = await getConsultant(data._id)
        await updateConsultant(c._id, { skills: { ...c.skills, url } })
      }
      showToast()
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
const uri = ref(null)
const file = ref(null)
const photo = ref(null)
const uploadProgress = ref(null)
const loadingProgress = ref(false)
const errorProgress = ref(null)
const handleUpload = (f, path = 'avatars') => {
  var reader = new FileReader()
  reader.onloadend = function () {
    uri.value = reader.result
    if (path === 'documents/skills') {
      file.value = reader.result
    } else if (path === 'avatars') {
      photo.value = reader.result
    }
  }
  if (f) {
    reader.readAsDataURL(f)
  } else {
    uri.value = null
  }
}
const updateFile = (data, path = 'avatars') => {
  return new Promise((resolve, reject) => {
    const onComplete = async (url) => {
      resolve(url)
    }
    const onProgress = ({ transferred, total }) => {
      // console.log(transferred, total)
    }
    const onError = (error) => {
      console.info(error)
    }
    upload({
      path: `${path}`,
      data,
      onError,
      onProgress,
      onComplete
    })
  })
}
const handleResetPhoto = () => {
  photo.value = null
}
const showToast = () => {
  Toaster.show({
    title: 'Consultant mis à jour',
    description: 'Les fichiers téléversés du consultant sont à jour.',
    small: 'il y 1 min'
  })
}
</script>

<style lang="scss" scoped></style>
