<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <router-link to="/clients">
          <a href="#">Clients</a>
        </router-link>
      </li>
      <li class="breadcrumb-item">Créer un client</li>
    </ol>
  </nav>
  <client-profile-form
    :loading="loading"
    :file="uri"
    :location="location"
    @pick-location="handlePickLocation"
    @upload="handleUpload"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { createClient, updateClient } from '@/domain/clients'
import ClientProfileForm from '@/components/clients/forms/client-profile-form.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { upload } from '@/domain/buckets'
import Picker from '@/components/shared/pickers/location-picker'
const { push } = useRouter()
const result = ref(null)
const loading = ref(false)
const handleSubmit = (body) => {
  const fn = async () => {
    try {
      loading.value = true
      let payload = { ...body }
      if (location.value && !isNaN(location.value.lat) && !isNaN(location.value.lon)) {
        const address = {
          ...payload.company?.address,
          lat: location.value.lat,
          lon: location.value.lon
        }
        payload = { ...payload, company: { ...payload.company, address } }
      }
      const { data } = await createClient(payload)
      updateProfilePhoto(data._id, data)
      result.value = data
      loading.value = false
      Swal.fire({
        title: `Client crée`,
        text: 'Le client a été créé avec succès',
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
          push(`/clients/${data._id}`)
        } else if (isDenied) {
          push(`/clients`)
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
const updateProfilePhoto = (id, data) => {
  const onComplete = async (profilePhoto) => {
    photo.value = profilePhoto
    loadingProgress.value = false
    updateClient(id, { ...data, company: { ...data.company, logo: profilePhoto } })
  }
  const onProgress = ({ transferred, total }) => {
    loadingProgress.value = true
    uploadProgress.value = Math.round((transferred / total) * 100)
  }
  const onError = (error) => {
    uploadProgress.value = null
    console.info(error)
  }
  if (file.value) {
    upload({
      path: `avatars/${id}`,
      data: file.value,
      onError,
      onProgress,
      onComplete
    })
  }
}
const location = ref(null)
const handlePickLocation = () => {
  const fn = async () => {
    location.value = await Picker.pick({
      lat: result?.value?.company?.address?.lat,
      lon: result?.value?.company?.address?.lon
    })
  }
  fn()
}
</script>

<style lang="scss" scoped></style>
