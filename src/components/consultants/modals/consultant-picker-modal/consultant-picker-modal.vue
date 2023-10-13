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
          <div class="row">
            <div class="col-5 wrapper overflow-auto">
              <item
                class="with-pointer"
                :key="i._id"
                v-for="i in filtered"
                :selected="i._id === selected?._id"
                :item="i"
                @select="handleSelect(i)"
              />
            </div>
            <div class="col-7">
              <consultant-summary v-if="selected" :data="selected" />
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
const currentSize = ref(10)
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
  if (cb) cb()
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
