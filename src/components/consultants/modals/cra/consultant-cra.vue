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
              <h5 class="modal-title" id="consultants-cra-modal-title">My CRA</h5>
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
          <Calendar @click-day="handleClickDay" class="mx-auto" />
          <div class="row mt-3 mx-auto" v-if="cra">
            <div class="card-body">
              <span class="badge rounded-pill day-working mx-1 mb-1"
                >{{ cra.working }} Travaillés</span
              >
              <span class="badge rounded-pill day-half mx-1 mb-1"
                >{{ cra.half }} Demi journées</span
              >
              <span class="badge rounded-pill day-remote mx-1 mb-1"
                >{{ cra.remote }} Télétravail</span
              >
              <span class="badge rounded-pill day-off mx-1 mb-1">{{ cra.off }} Absence</span>
            </div>
            <div class="row" v-if="reason">
              <p class="text-danger">
                Jour {{ day }} {{ cra.month }} {{ cra.year }} - Raison : {{ reason }}
              </p>
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
                  @click="emit('reject')"
                >
                  Rejetter
                </button>
                <button
                  type="button"
                  class="btn btn-success mx-2"
                  data-bs-dismiss="modal"
                  @click="emit('approve')"
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
import { getHistory } from '@/api/consultants'
import Calendar from '@/components/shared/cra-calendar/cra-calendar.vue'
import { ref } from 'vue'
const $ = window.jQuery
const cra = ref(null)
getHistory()
  .then(({ data }) => {
    cra.value = data[0]
  })
  .catch((error) => console.log(error))
const day = ref(null)
const reason = ref(null)
const reasons = ['CP', 'Maternité', 'Absence', 'Congé maladie', 'Déménagement']
const handleClickDay = (d) => {
  day.value = d
  reason.value = reasons[Math.floor(Math.random() * reasons.length)]
}
const emit = defineEmits(['day'])
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
