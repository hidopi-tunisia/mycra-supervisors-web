<template>
  <div
    class="modal fade"
    id="consultant-picker-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="consultant-picker-modal"
  >
    <div class="modal-dialog">
      <form class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="consultant-picker-modal-title">Choisir consultant</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <item
            class="with-pointer"
            :key="i._id"
            v-for="i in results"
            :item="i"
            @select="handleSelect(i)"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Item from './consultant-picker-modal-item.vue'
import { ref } from 'vue'
import { getConsultants } from '@/api/consultants'

const $ = window.jQuery

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
    filtered.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
let callback
const handleSelect = (i) => {
  callback(i)
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

<style scoped></style>
