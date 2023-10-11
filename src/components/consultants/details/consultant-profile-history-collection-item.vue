<template>
  <div class="d-flex mb-3 d-flex align-items-center">
    <div class="flex-shrink-0 ml-2">
      <div class="month-pill">
        <div>{{ props.history.year }}</div>
      </div>
    </div>
    <div class="flex-grow-1 row mx-2">
      <div class="col-9 mb-sm-0 mb-2 mr-2">
        <h6 class="mb-0 mr-2 text-capitalize">{{ props.history.month }}</h6>
        <small class="text-muted">Calendar and contacts</small>
      </div>
      <div class="col-3 text-end">
          <span class="badge bg-primary float-end" v-if="props.history.status === 'submitted'">Envoyé</span>
          <span class="badge bg-success float-end" v-if="props.history.status === 'approved'">Approuvé</span>
          <span class="badge bg-danger float-end" v-if="props.history.status === 'rejected'">Rejeté</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['history'])
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
  background-color: #ff000022;
}
</style>
