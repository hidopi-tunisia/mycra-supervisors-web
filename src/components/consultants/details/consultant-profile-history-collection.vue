<template>
  <div class="row">
    <div class="col-md-12 col-lg-7 col-12 mb-lg-0 mb-4">
      <div class="card">
        <h5 class="card-header">Historique des CRAs</h5>
        <div class="card-body">
          <span>Choisissez l'année et un élément pour voir les détails</span>
          <select
            class="form-select d-inline year-select mx-2 mb-4"
            id="table-size-select"
            :value="current"
            @change="handleChangeYear"
          >
            <option disabled>Sélectionner</option>
            <option :key="y" :value="y" v-for="y in props.years" :selected="props.current">
              {{ y }}
            </option>
          </select>
          <consultant-profile-history-collection-item
            :key="h._id"
            v-if="props.history.length > 0"
            v-for="h in props.history"
            :history="h"
            :selected="selected._id === h._id"
            @select="handleChangeSelected"
          />
          <div v-else>Pas d'historique</div>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-lg-5 col-12" v-if="selected">
      <div class="card">
        <h5 class="card-header">
          CRA du {{ months[selected.date.month] }} {{ selected.date.year }}
          <span>
            -
            {{ selected.working.length + selected.remote.length + 0.5 * selected.half.length }}
            jours travaillés</span
          >
          <span class="badge bg-primary float-end" v-if="selected.status === 'submitted'"
            >Envoyé</span
          >
          <span class="badge bg-success float-end" v-if="selected.status === 'approved'"
            >Approuvé</span
          >
          <span class="badge bg-danger float-end" v-if="selected.status === 'rejected'"
            >Rejeté</span
          >
        </h5>
        <div class="card-body" v-if="selected">
          <p v-if="selected.status === 'submitted'">
            Le CRA a été envoyé à
            <span class="fw-bold" v-if="action">{{ action.meta.at.substring(0, 10) }}</span>
          </p>
          <p v-if="selected.status === 'approved'">
            Le CRA est apprové le
            <span class="fw-bold" v-if="action">{{ action.meta.at.substring(0, 10) }}</span>
          </p>
          <p v-if="selected.status === 'rejected'">
            Le a été rejeté le
            <span class="fw-bold" v-if="action">{{ action.meta.at.substring(0, 10) }}</span>
          </p>
          <Calendar :selected="selected" @click-day="handleClickDay" class="mx-sm-auto mb-4" />
          <span class="badge rounded-pill day-working mx-1 mb-1"
            >{{ selected?.working.length }} Travaillés</span
          >
          <span class="badge rounded-pill day-half mx-1 mb-1"
            >{{ selected?.half.length }} Demi journées</span
          >
          <span class="badge rounded-pill day-remote mx-1 mb-1"
            >{{ selected?.remote.length }} Télétravail</span
          >
          <span class="badge rounded-pill day-off mx-1 mb-1"
            >{{ selected?.off.length }} Absence</span
          >
          <h5 class="mt-3" v-if="selected?.motive">Motif</h5>
          <p>
            {{ selected?.motive }}
          </p>
          <div class="row" v-if="selected?.status === 'pending'">
            <p>Actions</p>
            <div class="d-flex flex-row vw-100 justify-content-between">
              <div>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                  @click="emit('reject', selected?._id)"
                >
                  Rejetter
                </button>
                <button
                  type="button"
                  class="btn btn-success mx-2"
                  data-bs-dismiss="modal"
                  @click="emit('approve', selected?._id)"
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
import ConsultantProfileHistoryCollectionItem from '@/components/consultants/details/consultant-profile-history-collection-item.vue'
import Calendar from '@/components/shared/cra-calendar/cra-calendar.vue'
import { ref } from 'vue'
const props = defineProps(['history', 'selected', 'years', 'current'])
let action = ref(null)
if (props.selected) {
  if (props.selected.status === 'pending') {
    action.value = props.selected.history.filter(({ action }) => action === 'submitted')
  } else if (props.selected.status === 'approved') {
    action.value = props.selected.history.filter(({ action }) => action === 'approved')
  } else if (props.selected.status === 'rejected') {
    action.value = props.selected.history.filter(({ action }) => action === 'rejected')
  }
  action.value = action.value.sort((a, b) => {
    b.meta.at - a.meta.at
  })[0]
}
const emit = defineEmits(['change', 'select', 'click-day', 'reject', 'approve'])
const handleClickDay = (d) => {
  emit('click-day', d)
}
const handleChangeYear = ({ target }) => {
  const { value } = target
  emit('change', value)
}
const handleChangeSelected = (id) => {
  emit('select', id)
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
.year-select {
  width: 120px;
}
.day-working {
  background-color: #2196f3 !important;
  border-radius: 32px;
  color: white;
}
.day-half {
  background-color: white !important;
  border-radius: 32px;
  color: #2196f3;
  border: 1px solid #2196f3;
}
.day-remote {
  background-color: #9c27b0 !important;
  border-radius: 32px;
  color: white;
}
.day-off {
  background-color: white !important;
  border-radius: 32px;
  border: 1px solid #f44336;
  color: #f44336;
}
</style>
