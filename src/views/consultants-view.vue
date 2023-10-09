<template>
  <h1>Consultants <router-link to="/consultants/new">Create</router-link></h1>
  <div v-for="item in results" :key="item._id">
    <router-link :to="'/consultants/' + item._id">
      {{ item.firstName }}
      {{ item.lastName }}
    </router-link>
  </div>
  <pre class="card" v-if="results">{{ results }}</pre>
  <div v-if="loading">Loading...</div>
</template>

<script setup lang="ts">
import { getConsultants } from '@/domain/consultants'
import { ref } from 'vue'
const results = ref(null)
const loading = ref(false)
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getConsultants()
    results.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
console.log(error.response.data)

  }
}
fn()
</script>

<style lang="scss" scoped></style>
