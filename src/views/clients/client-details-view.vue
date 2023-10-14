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
    v-if="result"
    :profile="result"
    @submit="handleSubmit"
    isUpdate="true"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getClient } from '@/api/clients'
import ClientProfileForm from '@/components/clients/forms/client-profile-form.vue'
import { ref } from 'vue'
const { params } = useRoute()
const { id } = params
const result = ref(null)
const loading = ref(false)

const fn = async () => {
  try {
    loading.value = true
    const { data } = await getClient(id)
    console.log(data);
    
    result.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
const handleSubmit = (payload) => {
  console.log(payload)
}
</script>

<style lang="scss" scoped></style>
