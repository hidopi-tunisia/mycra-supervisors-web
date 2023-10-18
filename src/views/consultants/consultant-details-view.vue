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
    <li class="nav-item with-pointer">
      <a
        class="nav-link with-pointer"
        :class="tab === 'profile' ? 'active' : ''"
        @click="handleClickTab('profile')"
        ><i class="bx bx-user me-1"></i> Profil</a
      >
    </li>
    <li class="nav-item with-pointer">
      <a
        class="nav-link with-pointer"
        :class="tab === 'history' ? 'active' : ''"
        @click="handleClickTab('history')"
        ><i class="bx bx-time me-1"></i> Historique</a
      >
    </li>
  </ul>
  <consultant-profile-form
    v-if="tab === 'profile' && result"
    :profile="result"
    @submit="handleSubmit"
    isUpdate="true"
  />
  <consultant-profile-history
    :profile="result"
    :history="history"
    isUpdate="true"
    v-if="tab === 'history'"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getConsultant } from '@/domain/consultants'
import ConsultantProfileForm from '@/components/consultants/forms/consultant-profile-form.vue'
import ConsultantProfileHistory from '@/components/consultants/details/consultant-profile-history.vue'
import { ref } from 'vue'
const { params } = useRoute()
const { id } = params
const result = ref(null)
const history = ref(null)
const loading = ref(false)
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getConsultant(id)
    console.log(data);
    
    // const { data: historyData } = await getHistory()
    result.value = data
    history.value = []
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
