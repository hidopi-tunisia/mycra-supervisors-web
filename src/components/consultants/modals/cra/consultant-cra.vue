<template>
  <div
    class="modal fade"
    id="consultants-cra-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="consultants-cra-modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row d-flex">
            <div class="col">
              <h5 class="modal-title" id="consultants-cra-modal-title">
                My CRA<span v-if="props.cra">
                  -
                  {{
                    props.cra.working.length + props.cra.remote.length + 0.5 * props.cra.half.length
                  }}
                  jours travaillés</span
                >
                <span class="ms-3" v-if="props.cra">
                  <span class="badge bg-primary float-end" v-if="props.cra.status === 'pending'"
                    >Envoyé</span
                  >
                  <span class="badge bg-success float-end" v-if="props.cra.status === 'approved'"
                    >Approuvé</span
                  >
                  <span class="badge bg-danger float-end" v-if="props.cra.status === 'rejected'"
                    >Rejeté</span
                  >
                </span>
              </h5>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Calendar
            class="mx-auto"
            v-if="props.cra"
            :selected="props.cra"
            @click-day="handleClickDay"
          />
          <div class="row mx-auto" v-if="props.cra">
            <div class="card-body">
              <span class="badge rounded-pill day-working mx-1 mb-1"
                >{{ props.cra.working.length }} Travaillés</span
              >
              <span class="badge rounded-pill day-half mx-1 mb-1"
                >{{ props.cra.half.length }} Demi journées</span
              >
              <span class="badge rounded-pill day-remote mx-1 mb-1"
                >{{ props.cra.remote.length }} Télétravail</span
              >
              <span class="badge rounded-pill day-off mx-1 mb-1"
                >{{ props.cra.off.length }} Absence</span
              >
            </div>
          </div>
          <div class="modal-footer">
            <div class="d-flex flex-row vw-100 justify-content-between">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Fermer
              </button>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                  v-if="props.cra.status === 'pending'"
                  @click="emit('reject', props.cra._id)"
                >
                  Rejetter
                </button>
                <button
                  type="button"
                  class="btn btn-success mx-2"
                  data-bs-dismiss="modal"
                  v-if="props.cra.status === 'pending' || props.cra.status === 'rejected'"
                  @click="emit('approve', props.cra._id)"
                >
                  Approver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calendar from '@/components/shared/cra-calendar/cra-calendar.vue'
import { ref } from 'vue'
const $ = window.jQuery
const props = defineProps(['cra'])
const cra = ref(null)
const day = ref(null)
const reason = ref(null)
const handleClickDay = (d) => {}
const emit = defineEmits(['day', 'approve', 'reject'])
const show = () => {
  $('#consultants-cra-modal').modal('show')
}
const hide = (cb) => {
  $('#consultants-cra-modal').modal('hide')
  if (typeof cb === 'function') {
    cb()
  }
}
defineExpose({ show, hide })
</script>

<style scoped>
.wrapper {
  height: 420px;
}

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
