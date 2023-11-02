<template>
  <div
    class="d-flex mb-3 d-flex align-items-center with-pointer"
    :class="selected ? 'selected' : ''"
    @click="handleClick"
  >
    <div class="flex-shrink-0 ml-2">
      <div class="month-pill" :class="selected ? 'text-white bg-primary' : ''">
        <div>{{ props.history.date.year }}</div>
      </div>
    </div>
    <div class="flex-grow-1 row mx-2" v-if="action">
      <div class="col-9 mb-sm-0 mb-2 mr-2">
        <h6 class="mb-0 mr-2 text-capitalize" :class="props.history ? 'fw-bold' : ''">
          {{ months[props.history.date.month] }}
        </h6>
        <small class="text-muted" v-if="action.action === 'submitted'">
          Envoyé à <span class="fw-bold">{{ action.meta.at.substring(0, 10) }}</span>
        </small>
        <small class="text-muted" v-if="action.action === 'approved'">
          Apprové le <span class="fw-bold">{{ action.meta.at.substring(0, 10) }}</span>
        </small>
        <small class="text-muted" v-if="action.action === 'rejected'">
          Rejeté le <span class="fw-bold">{{ action.meta.at.substring(0, 10) }}</span>
        </small>
      </div>
      <div class="col-3 text-end">
        <span class="badge bg-primary float-end" v-if="props.history.status === 'pending'"
          >Envoyé</span
        >
        <span class="badge bg-success float-end" v-if="props.history.status === 'approved'"
          >Approuvé</span
        >
        <span class="badge bg-danger float-end" v-if="props.history.status === 'rejected'"
          >Rejeté</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['selected', 'history'])
const emit = defineEmits(['select'])
let action = ref(null)
if (props.history.status === 'pending') {
  action.value = props.history.history.filter(({ action }) => action === 'submitted')
} else if (props.history.status === 'approved') {
  action.value = props.history.history.filter(({ action }) => action === 'approved')
} else if (props.history.status === 'rejected') {
  action.value = props.history.history.filter(({ action }) => action === 'rejected')
}
action.value = action.value.sort((a, b) => {
  b.meta.at - a.meta.at
})[0]
const handleClick = () => {
  emit('select', props.history._id)
}
const months = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre'
]
</script>

<style scoped>
.month-pill {
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 32px;
  background-color: #2196f322;
}
.selected {
  background-color: #bdbdbd22;
  padding: 8px;
  border-radius: 16px;
  pointer-events: none;
}
</style>
