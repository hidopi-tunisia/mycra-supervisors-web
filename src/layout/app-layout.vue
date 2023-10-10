<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <app-menu />
      <div class="layout-page">
        <app-navbar />
        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">
            <router-view></router-view>
          </div>

          <div class="content-backdrop fade"></div>
        </div>
      </div>
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>

    <!-- Overlay -->
  </div>
  <!-- / Layout wrapper -->
</template>

<script setup lang="ts">
import AppNavbar from '@/components/shared/app-navbar.vue'
import AppMenu from '@/components/shared/app-menu.vue'
import AppFooter from '@/components/shared/app-footer.vue'
</script>

<style scoped></style>
