<template>
  <div class="calendar">
    <div class="calendar__date">
      <div class="calendar__day">S</div>
      <div class="calendar__day">L</div>
      <div class="calendar__day">M</div>
      <div class="calendar__day">M</div>
      <div class="calendar__day">J</div>
      <div class="calendar__day">V</div>
      <div class="calendar__day">S</div>
      <div
        class="calendar__number"
        :key="d"
        v-for="d in days"
        :class="'day-' + d.type"
        @click="handleClickDay(d)"
      >
        {{ Number(d.date.substring(8)) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import { populateDays } from './utils'
const props = defineProps(['selected'])
const days = populateDays(toRaw(props.selected)).sort((a, b) => new Date(a.date) - new Date(b.date))
const emit = defineEmits(['click-day'])
const handleClickDay = (d) => {
  emit('click-day', d)
}
</script>

<style scoped>
@import url('./style.css');
.day-working {
  background-color: #2196f3 !important;
  border-radius: 32px;
  color: white;
  pointer-events: none;
}
.day-half {
  background-color: white !important;
  border-radius: 32px;
  color: #2196f3;
  border: 2px solid #2196f3;
  pointer-events: none;
}
.day-remote {
  background-color: #9c27b0 !important;
  border-radius: 32px;
  color: white;
  pointer-events: none;
}
.day-off {
  background-color: white !important;
  border-radius: 32px;
  border: 2px solid #f44336;
  color: #f44336;
}
.day-weekend {
  background-color: white !important;
  border-radius: 32px;
  border: 2px solid #4caf50;
  color: #4caf50;
}
.day-holiday {
  background-color: white !important;
  border-radius: 32px;
  border: 2px solid #4caf50;
  color: #4caf50;
}
</style>
