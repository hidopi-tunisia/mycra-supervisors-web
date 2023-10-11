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
  <consultant-profile-form @submit="handleSubmit" />
  <pre class="card" v-if="result">{{ result }}</pre>
</template>

<script setup lang="ts">
import { createConsultant } from '@/domain/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import { ref } from 'vue'
const result = ref(null)
const loading = ref(false)
const handleSubmit = (payload) => {
  console.log(payload)
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
