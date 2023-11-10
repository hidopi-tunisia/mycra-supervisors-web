<template>
  <!-- Footer -->
  <footer class="content-footer footer bg-footer-theme">
    <div
      class="container-xxl d-flex flex-wrap justify-content-end py-2 flex-md-row flex-column align-items-center"
    >
      <div class="mb-2 mb-md-0">
        Made with ❤️ by
        <a href="https://www.hidopi.com" target="_blank" class="footer-link fw-bolder">Hidopi</a>
      </div>
      <div
        class="d-flex flex-wrap justify-content-end align-items-center with-pointer"
        v-if="l === 'en'"
        @click="handleChangeLocale('fr')"
      >
        <svg width="16" height="16" class="ms-3 me-1">
          <image
            xlink:href="https://raw.githubusercontent.com/HatScripts/circle-flags/dd5910007aee57e20f1b4350d9ec7cef1bb6dfc9/flags/fr.svg"
            src="yourfallback.png"
            width="16"
            height="16"
          />
        </svg>
        FR
      </div>
      <div
        class="d-flex flex-wrap justify-content-end align-items-center with-pointer"
        v-if="l === 'fr'"
        @click="handleChangeLocale('en')"
      >
        <svg width="16" height="16" class="ms-3 me-1">
          <image
            xlink:href="https://raw.githubusercontent.com/HatScripts/circle-flags/dd5910007aee57e20f1b4350d9ec7cef1bb6dfc9/flags/gb.svg"
            width="16"
            height="16"
          />
        </svg>
        EN
      </div>
    </div>
  </footer>
  <!-- / Footer -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { i18n } from '@/utils/translations'

const l = ref(null)
onMounted(() => {
  setTimeout(() => {
    l.value = i18n.locale
  }, 1000)
})
const handleChangeLocale = (l) => {
  i18n.locale = l
  location.reload()
}
</script>

<style scoped></style>
