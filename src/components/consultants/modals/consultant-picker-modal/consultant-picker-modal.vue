<template>
  <div
    class="modal fade"
    id="consultant-picker-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="consultant-picker-modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row d-flex align-items-center">
            <div class="col">
              <h5 class="modal-title" id="consultant-picker-modal-title">Choisir consultant</h5>
            </div>
            <div class="col">
              <div class="d-flex align-items-center">
                <i class="bx bx-search fs-4 lh-0"></i>
                <input
                  type="text"
                  class="form-control border-0 shadow-none"
                  placeholder="Rechercher..."
                  aria-label="Rechercher..."
                  @input="({ target: { value } }) => handleInputSearch(value)"
                />
              </div>
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
          <div class="row" v-if="Array.isArray(results) && results.length > 0">
            <div
              class="col-xs-12 col-lg-5 wrapper overflow-auto"
              v-if="Array.isArray(filtered) && filtered.length > 0"
            >
              <item
                class="with-pointer"
                :key="i._id"
                v-for="i in filtered"
                :selected="i._id === selected?._id"
                :item="i"
                @select="handleSelect(i)"
              />
            </div>
            <div
              v-else
              class="col-xs-12 col-lg-5 wrapper overflow-auto d-flex justify-content-center align-items-center"
            >
              Pas de consultants, merci de changer votre filtre
            </div>
            <div class="col-xs-12 col-lg-7">
              <div class="mt-4 d-lg-none"></div>
              <consultant-summary v-if="selected" :data="selected" />
            </div>
          </div>
          <div class="row" v-else>
            <div
              class="col-12 wrapper overflow-auto d-flex justify-content-center align-items-center"
            >
              <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="mb-3">Pas de consultants</div>
                <router-link to="/consultants/new">
                  <a class="btn btn-outline-primary" href="#" @click="hide"> Créer un consultant</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Annuler
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-if="Array.isArray(results) && results.length > 0"
            @click="handleConfirm"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Item from './consultant-picker-modal-item.vue'
import ConsultantSummary from '@/components/consultants/details/consultant-summary.vue'
import { ref } from 'vue'
import { getConsultants } from '@/api/consultants'

const $ = window.jQuery

const selected = ref(null)
const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const pages = ref(5)
const currentPage = ref(1)
const sizes = ref([5, 10, 25, 50, 100])
const currentSize = ref(100)
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getConsultants()
    results.value = data
    selected.value = data[0]
    filtered.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
const handleInputSearch = (value) => {
  filtered.value = results.value.filter((d) => {
    return (
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase())
    )
  })
}
let callback
const handleConfirm = () => {
  callback(selected.value)
}
const handleSelect = (i) => {
  selected.value = results.value.find(({ _id }) => _id === i._id)
}
const onPositive = (cb) => {
  callback = cb
}
const show = () => {
  $('#consultant-picker-modal').modal('show')
}
const hide = (cb) => {
  $('#consultant-picker-modal').modal('hide')
  if (typeof cb === 'function') {
    cb()
  }
}
const onHide = (cb) => {
  $('#consultant-picker-modal').on('hidden.bs.modal', cb)
}
defineExpose({ show, hide, onHide, onPositive })
</script>

<style scoped>
.wrapper {
  height: 420px;
}
</style>
