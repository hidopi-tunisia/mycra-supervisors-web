<template>
  <h1>Consultant Details</h1>
  <div v-if="result">
    {{ result.firstName }}
    {{ result.lastName }}
    <router-link :to="'/consultants/' + result._id + '/edit'"> Edit </router-link>
  </div>
  <button class="btn btn-danger" @click="handleClickDelete">Delete</button>
  <pre class="card" v-if="result">{{ result }}</pre>
  <div v-if="loading">Loading...</div>
</template>

<script setup lang="ts">
import { getConsultant, deleteConsultant } from '@/domain/consultants'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const { params } = useRoute()
const { id } = params
const result = ref(null)
const loading = ref(false)
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getConsultant(id)
    result.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
console.log(error.response.data)

  }
}
fn()
const handleClickDelete = () => {
  const fn = async () => {
    try {
      const { data } = await deleteConsultant(id, { keepIdentity: false })
      console.log(data)
    } catch (error) {
      console.log(error)
console.log(error.response.data)

    }
  }
  if (confirm('Are you sure to delete?')) {
    fn()
  }
}
</script>

<style lang="scss" scoped></style>
