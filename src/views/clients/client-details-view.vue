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
    isUpdate="true"
    v-if="result"
    :profile="result"
    :loading="loading"
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
    console.log(data)

    result.value = data
    loading.value = false
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
      const { data } = await updateClient(id, payload)
      result.value = data
      loading.value = false
      Swal.fire({
        title: `Client modifié`,
        text: 'Le client a été modifié avec succès',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Fermer'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          push('/clients')
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
</script>

<style lang="scss" scoped></style>
