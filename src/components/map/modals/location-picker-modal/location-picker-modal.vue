<template>
  <div
    class="modal fade"
    id="location-picker-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="location-picker-modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row d-flex align-items-center">
            <div class="col">
              <h5 class="modal-title" id="location-picker-modal-title">Choisir emplacement</h5>
            </div>
            <div class="col">
              <div class="d-flex align-items-center">
                <i class="bx bx-search fs-4 lh-0"></i>
                <input
                  type="text"
                  class="form-control border-0 shadow-none"
                  placeholder="Rechercher..."
                  aria-label="Rechercher..."
                  :value="text"
                  @input="
                    ({ target }) => {
                      text = target.value
                    }
                  "
                />
                <button class="btn btn-outline-primary btn-sm" @click="handleInputSearch">
                  Rechercher
                </button>
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
          <div class="row" v-if="isShown">
            <app-map
              ref="map$"
              v-if="markers"
              :markers="markers"
              @click="handleClick"
              @click-marker="handleClick"
              @mouseover-marker="handleMarkerMouseover"
            />
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
            :disabled="!selected"
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
import AppMap from '@/components/map/app-map.vue'
import { ref } from 'vue'
import { searchPlace } from '@/domain/geo'

const $ = window.jQuery

const map$ = ref(null)
const markers = ref([])
const text = ref('paris')
const handleInputSearch = () => {
  const fn = async () => {
    try {
      const { data } = await searchPlace(text.value)
      if (data.length > 0) {
        const result = data[0]
        const lat = parseFloat(result.lat)
        const lon = parseFloat(result.lon)
        const displayName = result.display_name
        map$.value.search({ lat, lon, displayName })
        selected.value = { lat, lon }
      }
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const handleClick = (e) => {
  const lat = e.latlng.lat
  const lon = e.latlng.lng
  const marker = {
    lat,
    lon
  }
  map$.value.pickLocation(marker)
  selected.value = { lat, lon }
}
const handleMarkerClick = ({ target }) => {
  console.log(target.options.meta)
}
const handleMarkerMouseover = ({ target }) => {
  console.log(target.options.meta)
}
const selected = ref(null)
let callback
const handleConfirm = () => {
  callback(selected.value)
}
const onPositive = (cb) => {
  callback = cb
}
const isShown = ref(false)
const show = () => {
  setTimeout(() => {
    isShown.value = true
  }, 500)
  $('#location-picker-modal').modal('show')
}
const hide = (cb) => {
  $('#location-picker-modal').modal('hide')
  if (typeof cb === 'function') {
    isShown.value = false
    cb()
  }
}
const onHide = (cb) => {
  isShown.value = false
  $('#location-picker-modal').on('hidden.bs.modal', cb)
}
defineExpose({ show, hide, onHide, onPositive })
</script>

<style scoped>
.wrapper {
  height: 420px;
}
</style>
