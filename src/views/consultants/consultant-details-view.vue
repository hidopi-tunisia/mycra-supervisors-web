<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <router-link to="/consultants">
          <a href="#">Consultants</a>
        </router-link>
      </li>
      <li class="breadcrumb-item" v-if="result" :result="result.firstName">
        {{ result.firstName }} {{ result.lastName }}
      </li>
      <li class="breadcrumb-item" v-else>Détails du consultant</li>
    </ol>
  </nav>
  <ul class="nav nav-pills flex-column flex-md-row mb-3">
    <li class="nav-item">
      <a
        class="nav-link"
        href="#"
        :class="tab === 'profile' ? 'active' : ''"
        @click="handleClickTab('profile')"
        ><i class="bx bx-user me-1"></i> Profil</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        href="#"
        :class="tab === 'history' ? 'active' : ''"
        @click="handleClickTab('history')"
        ><i class="bx bx-bell me-1"></i> Historique</a
      >
    </li>
  </ul>
  <consultant-profile-form
    v-if="tab === 'profile' && result"
    :profile="result"
    @submit="handleSubmit"
    isUpdate="true"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const { params } = useRoute()
import { getConsultant } from '@/api/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import { ref } from 'vue'
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
const handleSubmit = (payload) => {
  console.log(payload)
}
const tab = ref('profile')
const handleClickTab = (t) => {
  tab.value = t
}
</script>

<style lang="scss" scoped></style>
