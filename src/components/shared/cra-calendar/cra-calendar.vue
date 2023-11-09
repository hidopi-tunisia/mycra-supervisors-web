<template>
  <div class="cra-calendar d-flex">
    <Calendar
      class="mx-auto"
      :events="events"
      transparent
      borderless
      locale="fr"
      :firstDayOfWeek="0"
      :attributes="attributes"
      @dayclick="handleClickDay"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { Calendar } from 'v-calendar'
import { populateDays } from './utils'
import 'v-calendar/style.css'
const events = {}
const props = defineProps(['selected'])
const attributes = ref(null)
if (toRaw(props.selected)) {
  attributes.value = populateDays(toRaw(props.selected)).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )
}
const emit = defineEmits(['click-day'])
const handleClickDay = ({ id }) => {
  emit('click-day', id)
}
</script>
<style scoped>
.cra-calendar :deep(.vc-header) {
  display: none;
  width: 20px;
}
.cra-calendar :deep(.vc-day) {
  padding: 6px;
}
</style>
