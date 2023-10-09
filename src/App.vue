<template>
  <app-layout v-if="user" />
  <sign-in-view v-if="!user" />
  <app-footer />
</template>

<script setup lang="ts">
import AppLayout from '@/layout/app-layout.vue'
import AppFooter from '@/components/shared/app-footer.vue'
import SignInView from '@/views/sign-in-view.vue'
import { onAuthStateChanged } from '@/domain/auth'
import { ref } from 'vue'
const user = ref(null)
onAuthStateChanged((u) => {
  user.value = u
})
</script>

<style lang="scss" scoped></style>
