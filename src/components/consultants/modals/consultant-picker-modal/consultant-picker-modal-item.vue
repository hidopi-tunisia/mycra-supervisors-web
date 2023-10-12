<template>
  <div class="mb-2" @click="emit('select')">
    <i class="fab fa-angular fa-lg text-danger me-3"></i>
    <img class="avatar rounded" :src="props.item.profilePhoto" />
    <strong class="text-gray mx-2">{{ props.item!.firstName }} {{ props.item!.lastName }}</strong>
    <span>{{ props.item.email }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ item: Object })
const emit = defineEmits(['select'])
</script>

<style scoped>
.consultant-code {
  text-transform: uppercase;
}
</style>
