<template>
  <form @submit.prevent="handleSubmit">
    <div class="card mb-4">
      <h5 class="card-header">Détails du consultant</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-2">
            <div class="d-flex align-items-start align-items-sm-center gap-4">
              <img
                :src="newProfile.profilePhoto"
                alt="user-avatar"
                class="d-block rounded"
                height="100"
                width="100"
                id="profilePhoto"
              />
            </div>
          </div>
          <div class="col-10">
            <div class="row">
              <div class="col-4">
                <div class="mb-2">Nom et prénom</div>
                <div class="fw-bold">
                  {{ newProfile.civility }} {{ newProfile.firstName }} {{ newProfile.lastName }}
                </div>
              </div>
              <div class="col-4">
                <div>Email</div>
                <div class="fw-bold my-2">
                  <a :href="'mailto:' + newProfile.phone">{{ newProfile.email }}</a>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-2">Date de disponibilité</div>
                <div class="fw-bold">
                  {{ newProfile.availableAt.substring(0, 10) }}
                </div>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-4">
                <div class="mb-2">Poste</div>
                <div class="fw-bold my-2">{{ newProfile.position }}</div>
              </div>
              <div class="col-4">
                <div>Téléphone</div>
                <div class="fw-bold my-2">
                  <a :href="'tel:' + newProfile.phone">{{ newProfile.phone }}</a>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-2">Date d'embauche</div>
                <div class="fw-bold">
                  {{ newProfile.hiredAt.substring(0, 10) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <consultant-profile-history-collection
      :history="filteredHistory"
      :years="years"
      :current="current"
      :selected="selected"
      @change="handleChangeYear"
      @select="handleChangeSelected"
    />
  </form>
</template>

<script setup lang="ts">
import ConsultantProfileHistoryCollection from '@/components/consultants/details/consultant-profile-history-collection.vue'
import { ref } from 'vue'
const props = defineProps(['profile', 'isUpdate', 'history'])
let newProfile
if (props.isUpdate) {
  newProfile = { ...props.profile }
}
const emit = defineEmits(['submit'])
const handleSubmit = () => {
  const payload = {}
  emit('submit', payload)
}
const years = [2022, 2021, 2020]
const current = ref(2022)
const filteredHistory = ref(props.history.filter(({ year }) => year === current.value))
const selected = ref(props.history.filter(({ year }) => year === current.value)[0])
const handleChangeSelected = (id) => {
  selected.value = props.history.find(({ _id }) => _id == id)
}
const handleChangeYear = (y) => {
  current.value = y
  filteredHistory.value = props.history.filter(({ year }) => year == y)
}
</script>

<style scoped></style>
