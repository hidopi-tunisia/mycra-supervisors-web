<template>
  <h1>Create consultant</h1>
  <form @submit.prevent="handleSubmit" class="col-md-4">
    <div class="mb-3">
      <label for="email" class="form-label">Email or Username</label>
      <input
        type="text"
        class="form-control"
        id="email"
        name="email-username"
        placeholder="Enter your email or username"
        autofocus
        :value="email"
        @input="(event) => (email = (event.target as HTMLTextAreaElement).value)"
      />
    </div>
    <button class="btn btn-primary" :disabled="loading">Create</button>
    <div v-if="loading">Loading...</div>
  </form>
  <pre class="card" v-if="result">{{ result }}</pre>
</template>

<script setup lang="ts">
import { createConsultant } from '@/domain/consultants'
import { ref } from 'vue'
const result = ref(null)
const loading = ref(false)
let email
const handleSubmit = () => {
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
