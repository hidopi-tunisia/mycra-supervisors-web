<template>
  <blank-loading-view v-if="loading" />
  <app-layout v-if="user && !loading" />
  <sign-in-view v-if="!user && !loading" />
  <app-footer />
  <toast ref="toast" />
</template>

<script setup lang="ts">
import AppLayout from '@/layout/app-layout.vue'
import AppFooter from '@/components/shared/app-footer.vue'
import SignInView from '@/views/auth/sign-in-view.vue'
import BlankLoadingView from '@/views/miscs/blank-loading-view.vue'
import { onAuthStateChanged } from '@/domain/auth'
import Toast from '@/components/shared/toasts/app-toast.vue'
import { ref } from 'vue'
const user = ref(null)
const loading = ref(true)
onAuthStateChanged((u) => {
  user.value = u
  loading.value = false
})
const toast = ref(null)
const showToast = ({ title, description, small } = { title: '', small: '', description: '' }) => {
  toast.value.show({ title, description, small })
}
window.showToast = showToast
</script>

<style lang="scss" scoped></style>
