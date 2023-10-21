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
  <client-profile-form :loading="loading" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { createClient } from '@/domain/clients'
import ClientProfileForm from '@/components/clients/forms/client-profile-form.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
const { push } = useRouter()
const result = ref(null)
const loading = ref(false)
const handleSubmit = (payload) => {
  const fn = async () => {
    try {
      loading.value = true
      const { data } = await createClient(payload)
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
        denyButtonColor: "#0288D1",
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
</script>

<style lang="scss" scoped></style>
