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
            v-for="h in props.history"
            :history="h"
            :selected="selected._id === h._id"
            @select="handleChangeSelected"
          />
        </div>
      </div>
    </div>
    <div class="col-md-12 col-lg-5 col-12">
      <div class="card">
        <h5 class="card-header">
          CRA du {{ selected.month }} {{ selected.year }}
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
        <div class="card-body">
          <p v-if="selected.status === 'submitted'">
            Le CRA a été envoyé à <span class="fw-bold">{{ selected.at.substring(0, 10) }}</span>
          </p>
          <p v-if="selected.status === 'approved'">
            Le CRA est apprové le <span class="fw-bold">{{ selected.at.substring(0, 10) }}</span>
          </p>
          <p v-if="selected.status === 'rejected'">
            Le a été rejeté le <span class="fw-bold">{{ selected.at.substring(0, 10) }}</span>
          </p>
          <Calendar :selected="selected" @click-day="handleClickDay" class="mx-sm-auto mb-4" />
          <span class="badge rounded-pill day-working mx-1 mb-1"
            >{{ selected.working }} Travaillés</span
          >
          <span class="badge rounded-pill day-half mx-1 mb-1"
            >{{ selected.half }} Demi journées</span
          >
          <span class="badge rounded-pill day-remote mx-1 mb-1"
            >{{ selected.remote }} Télétravail</span
          >
          <span class="badge rounded-pill day-off mx-1 mb-1">{{ selected.off }} Absence</span>
          <h5 class="mt-3">Motif</h5>
          <p>
            {{ selected.motive }}
          </p>
          <div class="row" v-if="selected.status === 'submitted'">
            <p>Actions</p>
            <div class="d-flex flex-row vw-100 justify-content-between">
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
import ConsultantProfileHistoryCollectionItem from '@/components/consultants/details/consultant-profile-history-collection-item.vue'
import Calendar from '@/components/shared/cra-calendar/cra-calendar.vue'
const props = defineProps(['history', 'selected', 'years', 'current'])
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
