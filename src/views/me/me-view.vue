<template>
  <profile-form v-if="result" :profile="result" @upgrade="handleUpgrade" />
  <div v-if="loading" class="row vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    Chargement des données
  </div>
</template>

<script setup lang="ts">
import { getProfile } from '@/domain/me'
import ProfileForm from '@/components/profile/forms/profile-form.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'
const result = ref(null)
const loading = ref(false)

const fn = async () => {
  try {
    loading.value = true
    const { data } = await getProfile({ populate: '' })
    result.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
const handleUpgrade = () => {
  Swal.fire({
    title: 'Demander une mise à niveau',
    text: "Envoyer un e-mail à l'adminstrateur pour demander une mise à niveau de votre compte.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, envoyer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      const recipient = 'contact@hidopi.com'
      const url = `mailto:${recipient}?subject=Modification du profil&body=Bonjour, je voudrais faire des modification dans mon profil.`
      window.open(url)
    }
  })
}
</script>

<style lang="scss" scoped></style>
