<template>
  <form @submit.prevent="handleSubmit">
    <div class="card mb-4">
      <h5 class="card-header">Détails du consultant</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-xs-12 col-md-2">
            <div class="d-flex align-items-start align-items-sm-center gap-4">
              <img
                :src="newProfile.profilePhoto ? newProfile.profilePhoto : getAvatar()"
                alt="user-avatar"
                class="d-block rounded"
                height="100"
                width="100"
                id="profilePhoto"
              />
            </div>
          </div>
          <div class="mb-4 d-lg-none"></div>
          <div class="col-10">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-lg-4">
                <div class="mb-2">Prénom et nom</div>
                <div class="fw-bold">
                  {{ newProfile.civility }} {{ newProfile.firstName }} {{ newProfile.lastName }}
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-4">
                <div>Email</div>
                <div class="fw-bold my-2">
                  <a :href="'mailto:' + newProfile.phone">{{ newProfile.email }}</a>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-4">
                <div class="mb-2">Date de disponibilité</div>
                <div class="fw-bold">
                  {{ newProfile.availableAt.substring(0, 10) }}
                </div>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-xs-12 col-sm-6 col-lg-4">
                <div class="mb-2">Poste</div>
                <div class="fw-bold my-2">{{ newProfile.position }}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-4">
                <div>Téléphone</div>
                <div class="fw-bold my-2">
                  <a :href="'tel:' + newProfile.phone">{{ newProfile.phone }}</a>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-lg-4">
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
      :history="history"
      :years="years"
      :current="current"
      :selected="selected"
      @change="handleChangeYear"
      @select="handleChangeSelected"
      @click-day="handleClickDay"
      @reject="handleReject"
      @approve="handleApprove"
      @export="handleExport"
    />
  </form>
</template>

<script setup lang="ts">
import ConsultantProfileHistoryCollection from '@/components/consultants/details/consultant-profile-history-collection.vue'
import Swal from 'sweetalert2'
import { generateFromString } from 'generate-avatar'
import { ref } from 'vue'
import { DayTypes } from '@/components/shared/cra-calendar/utils'
const props = defineProps(['profile', 'isUpdate', 'history'])

let newProfile
if (props.isUpdate) {
  newProfile = { ...props.profile }
}
const emit = defineEmits(['submit', 'click-day', 'year-changed', 'approve-cra', 'reject-cra', 'export'])
const handleSubmit = () => {
  const payload = {}
  emit('submit', payload)
}
const years = []
for (let y = new Date().getFullYear(); y >= 2023; y--) {
  years.push(y)
}
const current = ref(new Date().getFullYear())
const selected = props.history[0]
const handleChangeSelected = (id) => {
  selected.value = props.history.find(({ _id }) => _id == id)
}
const handleChangeYear = (y) => {
  current.value = y
  emit('year-changed', y)
}
const handleClickDay = ({ date, meta, type }) => {
  if (type === DayTypes.OFF) {
    Swal.fire({
      title: `${date}`,
      text: `Le motif d'absence est "` + meta.value + '"',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  } else if (type === DayTypes.WEEKEND) {
    Swal.fire({
      title: `${date}`,
      text: 'Cette date est un week-end',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  } else if (type === DayTypes.HOLIDAY) {
    Swal.fire({
      title: `${date}`,
      text: `Cette date est un jour férié, ${meta.value}`,
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }
}
const reason = ref('')
const handleReject = (id) => {
  emit('reject-cra', id)
}
const handleApprove = (id) => {
  emit('approve-cra', id)
}
const handleExport = ({id, type}) => {
  emit('export', { id, type })
}
const getAvatar = () => {
  return `data:image/svg+xml;utf8,${generateFromString(props.profile._id)}`
}
</script>

<style scoped></style>
