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
  <consultant-profile-form :loading="loading" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { createConsultant } from '@/domain/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';
const result = ref(null)
const loading = ref(false)
const { push } = useRouter()
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
        showDenyButton: true,
        denyButtonText: `Voir liste`,
        denyButtonColor: "#0288D1",
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
const handleSubmit2 = () => {
  const fn = async () => {
    try {
      loading.value = true
      const { data } = await createConsultant({ email })
      result.value = data
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error)
      console.log(error.response.data)
    }
  }
  fn()
}
</script>

<style lang="scss" scoped></style>
