<template>
  <div
    class="modal fade"
    id="client-picker-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="client-picker-modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="row d-flex align-items-center">
            <div class="col">
              <h5 class="modal-title" id="client-picker-modal-title">Choisir client</h5>
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
        <div class="modal-body" v-if="!loading">
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
              Pas de clients, merci de changer votre filtre
            </div>
            <div class="col-xs-12 col-lg-7">
              <div class="mt-4 d-lg-none"></div>
              <client-summary v-if="selected" :data="selected" :projects="projects" />
            </div>
          </div>
          <div class="row" v-else>
            <div
              class="col-12 wrapper overflow-auto d-flex justify-content-center align-items-center"
            >
              <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="mb-3">Pas de clients</div>
                <router-link to="/clients/new">
                  <a class="btn btn-outline-primary" href="#" @click="hide"> Créer un client</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body my-5" v-if="loading">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="spinner-border mx-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Chargement des données
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
import Item from './client-picker-modal-item.vue'
import ClientSummary from '@/components/clients/details/client-summary.vue'
import { ref } from 'vue'
import { getClients } from '@/domain/clients'
import { getProjectsCount } from '@/domain/statistics/projects'

const $ = window.jQuery

const projects = ref(null)
const handleSelect = (i) => {
  projects.value = null
  selected.value = results.value.find(({ _id }) => _id === i._id)
  const rp = async () => {
    try {
      const { data } = await getProjectsCount({ client: i._id, status: 'active' })
      projects.value = data.count
    } catch (error) {
      projects.value = null
      console.log(error)
    }
  }
  rp()
}
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
    const { data } = await getClients()
    results.value = data
    handleSelect(data[0])
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
      d.company?.name.toLowerCase().includes(value.toLowerCase()) ||
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase())
    )
  })
}
let callback
const handleConfirm = () => {
  callback(selected.value)
}
const onPositive = (cb) => {
  callback = cb
}
const show = () => {
  $('#client-picker-modal').modal('show')
}
const hide = (cb) => {
  $('#client-picker-modal').modal('hide')
  if (typeof cb === 'function') {
    cb()
  }
}
const onHide = (cb) => {
  $('#client-picker-modal').on('hidden.bs.modal', cb)
}
defineExpose({ show, hide, onHide, onPositive })
</script>

<style scoped>
.wrapper {
  height: 420px;
}
</style>
