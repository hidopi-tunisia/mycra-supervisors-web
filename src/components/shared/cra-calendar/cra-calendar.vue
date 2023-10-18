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
      <div class="calendar__number"></div>
      <div class="calendar__number"></div>
      <div class="calendar__number"></div>
      <div
        class="calendar__number"
        :key="d"
        v-for="d in days"
        :class="randomType()"
        @click="handleClickDay(d)"
      >
        {{ d }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['selected'])
const days = 30
const types = ['working', 'half', 'remote', 'off']
const emit = defineEmits(['click-day'])
const handleClickDay = (d) => {
  emit('click-day', d)
}
const randomType = () => {
  const type = types[Math.floor(Math.random() * types.length)]
  return 'day-' + type
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
</style>
