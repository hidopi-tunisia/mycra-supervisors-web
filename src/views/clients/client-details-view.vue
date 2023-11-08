<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <router-link to="/clients">
          <a href="#">Clients</a>
        </router-link>
      </li>
      <li class="breadcrumb-item" v-if="result" :result="result.firstName">
        {{ result.firstName }} {{ result.lastName }}
      </li>
      <li class="breadcrumb-item" v-else>Détails du client</li>
    </ol>
  </nav>
  <client-profile-form
    :isUpdate="true"
    v-if="result"
    :file="photo"
    :profile="result"
    :location="location"
    :loading="loading"
    :loadingProgress="loadingProgress"
    :uploadProgress="uploadProgress"
    @reset-logo="handleResetLogo"
    @pick-location="handlePickLocation"
    @upload="handleUpload"
    @submit="handleSubmit"
  />
  <div v-if="loading" class="row vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Chargement des données
  </div>
</template>

<script setup lang="ts">
import ClientProfileForm from '@/components/clients/forms/client-profile-form.vue'
import Picker from '@/components/shared/pickers/location-picker'
import Toaster from '@/components/shared/toasts/toaster'
import { upload } from '@/domain/buckets'
import { getClient, updateClient } from '@/domain/clients'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { push } = useRouter()
const { params } = useRoute()
const { id } = params
const result = ref(null)
const loading = ref(false)

const retrieve = async () => {
  try {
    loading.value = true
    const { data } = await getClient(id)
    result.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
retrieve()
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
      const { data } = await updateClient(id, payload)
      result.value = data
      loading.value = false
      Swal.fire({
        title: `Client modifié`,
        text: 'Le client a été modifié avec succès, téléversement des fichiers sera fait en arrière-plan',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Fermer'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          push('/clients')
        }
      })
      if (photo.value) {
        const url = await updateFile(photo.value, 'logos/' + data._id)
        const { data: c } = await getClient(data._id)
        await updateClient(c._id, { company: { ...c.company, logo: url } })
      }
      if (file.value) {
        const url = await updateFile(file.value, 'documents/contracts/' + data._id)
        const { data: c } = await getClient(data._id)
        await updateClient(c._id, { contract: { ...c.contract, url } })
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
const handleUpload = (f, path = 'logos') => {
  var reader = new FileReader()
  reader.onloadend = function () {
    uri.value = reader.result
    if (path === 'documents/contracts') {
      file.value = reader.result
    } else if (path === 'logos') {
      photo.value = reader.result
    }
  }
  if (f) {
    reader.readAsDataURL(f)
  } else {
    uri.value = null
  }
}
const updateFile = (data, path = 'logos') => {
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
const handleResetLogo = () => {
  photo.value = null
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
const showToast = () => {
  Toaster.show({
    title: 'Client mis à jour',
    description: 'Les fichiers téléversés du clients sont à jour.',
    small: "il y 1 min"
  })
}
</script>

<style lang="scss" scoped></style>
