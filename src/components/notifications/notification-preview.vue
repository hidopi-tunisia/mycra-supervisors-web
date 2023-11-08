<template>
  <div class="wrapper">
    <div class="mockup-header">
      <img
        src="https://static.vecteezy.com/system/resources/previews/026/590/927/non_2x/cra-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg"
        class="mockup-app-logo"
      />
      <div class="mx-1"></div>
      <div class="mockup-app-name">My CRA</div>
    </div>

    <div class="mockup-content">
      <p class="mockup-content-text">{{ props.content }}</p>
    </div>
    <img src="/assets/img/mockups/iphone.png" class="mockup" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["content"])
</script>
<style scoped>
@import './styles.css';
</style>
