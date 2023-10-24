<template>
  <count-cards-item
    text="Projects"
    menu-text="Voir les projets"
    icon="bx bx-code-block bx-sm align-middle icon-projects"
    name="projects"
    link="/projects"
    v-if="props.item === 'projects'"
    :position="props.position"
    :count="count"
    :loading="loading"
    @move="handleMove"
  />
  <count-cards-item
    text="Clients"
    menu-text="Voir les clients"
    icon="bx bx-user bx-sm align-middle icon-clients"
    name="clients"
    link="/clients"
    v-if="props.item === 'clients'"
    :position="props.position"
    :count="count"
    :loading="loading"
    @move="handleMove"
  />
  <count-cards-item
    text="Consultants"
    menu-text="Voir les consultant"
    icon="bx bxs-user-badge bx-sm align-middle icon-consultants"
    name="consultants"
    link="/consultants"
    v-if="props.item === 'consultants'"
    :position="props.position"
    :count="count"
    :loading="loading"
    @move="handleMove"
  />
  <count-cards-item
    text="Alerts"
    menu-text="Voir les alerts"
    icon="bx bx-bell bx-sm align-middle icon-alert"
    name="alerts"
    link="/alerts"
    v-if="props.item === 'alerts'"
    :position="props.position"
    :count="count"
    :loading="loading"
    @move="handleMove"
  />
</template>

<script setup lang="ts">
import CountCardsItem from './count-cards-item.vue'
const props = defineProps(['item', 'position', 'count', 'loading'])
const emit = defineEmits(['move'])
const handleMove = (p) => {
  emit('move', p)
}
</script>

<style scoped></style>
