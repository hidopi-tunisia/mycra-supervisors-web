<template>
  <count-cards-item
    text="Projects"
    count="80"
    menu-text="Voir les projets"
    icon="bx bx-code-block bx-sm align-middle icon-projects"
    name="projects"
    link="/projects"
    v-if="props.item === 'projects'"
    :position="props.position"
    @move="handleMove"
  />
  <count-cards-item
    text="Clients"
    count="10"
    menu-text="Voir les clients"
    icon="bx bx-user bx-sm align-middle icon-clients"
    name="clients"
    link="/clients"
    v-if="props.item === 'clients'"
    :position="props.position"
    @move="handleMove"
  />
  <count-cards-item
    text="Consultants"
    count="25"
    menu-text="Voir les consultant"
    icon="bx bxs-user-badge bx-sm align-middle icon-consultants"
    name="consultants"
    link="/consultants"
    v-if="props.item === 'consultants'"
    :position="props.position"
    @move="handleMove"
  />
  <count-cards-item
    text="Alerts"
    count="4"
    menu-text="Voir les alerts"
    icon="bx bx-bell bx-sm align-middle icon-alert"
    name="alerts"
    link="/alerts"
    v-if="props.item === 'alerts'"
    :position="props.position"
    @move="handleMove"
  />
</template>

<script setup lang="ts">
import CountCardsItem from './count-cards-item.vue'
const props = defineProps(['item', 'position'])
const emit = defineEmits(['move'])
const handleMove = (p) => {
  emit('move', p)
}
</script>

<style scoped></style>
