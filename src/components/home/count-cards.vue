<template>
  <count-cards-item
    :text="i18n.t('home.Projects')"
    :menu-text="i18n.t('home.option:view-projects')"
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
    :text="i18n.t('home.Clients')"
    :menu-text="i18n.t('home.option:view-clients')"
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
    :text="i18n.t('home.Consultants')"
    :menu-text="i18n.t('home.option:view-consultants')"
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
    :text="i18n.t('home.Alerts')"
    :menu-text="i18n.t('home.option:view-alerts')"
    icon="bx bx-chat bx-sm align-middle icon-alert"
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
import { i18n } from '@/utils/translations'
const props = defineProps(['item', 'position', 'count', 'loading'])
const emit = defineEmits(['move'])
const handleMove = (p) => {
  emit('move', p)
}
</script>

<style scoped></style>
