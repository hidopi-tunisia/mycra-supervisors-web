<template>
  <div
    class="d-flex mb-3 d-flex align-items-center with-pointer"
    :class="selected ? 'selected' : ''"
    @click="handleClick"
  >
    <div class="flex-shrink-0 ml-2">
      <div class="month-pill" :class="selected ? 'text-white bg-primary' : ''">
        <div>{{ props.history.year }}</div>
      </div>
    </div>
    <div class="flex-grow-1 row mx-2">
      <div class="col-9 mb-sm-0 mb-2 mr-2">
        <h6 class="mb-0 mr-2 text-capitalize" :class="props.history ? 'fw-bold' : ''">
          {{ props.history.month }}
        </h6>
        <small class="text-muted" v-if="props.history.status === 'submitted'">
          Envoyé à <span class="fw-bold">{{ props.history.at.substring(0, 10) }}</span>
        </small>
        <small class="text-muted" v-if="props.history.status === 'approved'">
          Apprové le <span class="fw-bold">{{ props.history.at.substring(0, 10) }}</span>
        </small>
        <small class="text-muted" v-if="props.history.status === 'rejected'">
          Rejeté le <span class="fw-bold">{{ props.history.at.substring(0, 10) }}</span>
        </small>
      </div>
      <div class="col-3 text-end">
        <span class="badge bg-primary float-end" v-if="props.history.status === 'submitted'"
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
const props = defineProps(['selected', 'history'])
const emit = defineEmits(['select'])
const handleClick = () => {
  emit('select', props.history._id)
}
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
