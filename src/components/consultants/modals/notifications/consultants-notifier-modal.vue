<template>
  <div
    class="modal fade"
    id="consultants-notifier-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="consultants-notifier-modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row d-flex align-items-center">
            <div class="col">
              <h5 class="modal-title" id="consultants-notifier-modal-title">
                My CRA <label v-if="target"> - {{ target }}</label>
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
          <div class="row">
            <div class="mb-3 col-12">
              <div class="d-flex justify-content-between">
                <label for="note" class="form-label"
                  >Message
                  <button class="btn btn-sm btn-simple" @click="handleClickRestoreIntialMessage">
                    Restaurer le message initial
                  </button>
                </label>
                <button
                  class="btn btn-sm btn-outline-danger mb-1"
                  @click="handleClickDeleteMessage"
                >
                  Vider
                </button>
              </div>
              <textarea
                class="form-control"
                id="address"
                name="address"
                rows="4"
                placeholder="Ex : Pensez à saisir votre CRA"
                :value="message"
                @input="handleInputSearch"
              ></textarea>
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
import { ref } from 'vue'
const $ = window.jQuery
const INITIAL_MESSAGE = `Pensez à saisir votre CRA pour le mois (${
  new Date().getMonth() + 1
} - ${new Date().getFullYear()})`
const message = ref(INITIAL_MESSAGE)
const handleInputSearch = ({ target }) => {
  const { value } = target
  message.value = value
}
const handleClickRestoreIntialMessage = () => {
  message.value = INITIAL_MESSAGE
}
const handleClickDeleteMessage = () => {
  message.value = ''
}
let callback
const handleConfirm = () => {
  callback(message.value)
}
const onPositive = (cb) => {
  callback = cb
}
const target = ref('')
const show = (t) => {
  target.value = t
  message.value = INITIAL_MESSAGE
  $('#consultants-notifier-modal').modal('show')
}
const hide = (cb) => {
  $('#consultants-notifier-modal').modal('hide')
  if (typeof cb === 'function') {
    cb()
  }
}
const onHide = (cb) => {
  $('#consultants-notifier-modal').on('hidden.bs.modal', cb)
}
defineExpose({ show, hide, onHide, onPositive })
</script>

<style scoped>
.wrapper {
  height: 420px;
}
</style>
