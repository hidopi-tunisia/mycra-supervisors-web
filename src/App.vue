<template>
  <blank-loading-view v-if="loading" />
  <app-layout v-if="user && !loading" />
  <sign-in-view v-if="!user && !loading" />
  <app-footer />
</template>

<script setup lang="ts">
import AppLayout from '@/layout/app-layout.vue'
import AppFooter from '@/components/shared/app-footer.vue'
import SignInView from '@/views/auth/sign-in-view.vue'
import BlankLoadingView from '@/views/miscs/blank-loading-view.vue'
import { onAuthStateChanged } from '@/domain/auth'
import { ref } from 'vue'
const user = ref(null)
const loading = ref(true)
onAuthStateChanged((u) => {
  user.value = u
  loading.value = false
})
</script>

<style lang="scss" scoped></style>
