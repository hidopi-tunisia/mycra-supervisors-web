<template>
  <div class="modal fade" id="project-update-modal" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="handleSubmit">
        <div class="modal-header">
          <h5 class="modal-title" id="backDropModalTitle">Modification du projet</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="props.project">
          <div class="row">
            <div class="col mb-3">
              <label for="update-project-name" class="form-label">Nom du projet</label>
              <input
                type="text"
                id="update-project-name"
                class="form-control"
                placeholder="Ex : Création d'une application mobile"
                required
                :value="payload.name"
                @input="({ target }) => (payload.name = target.value)"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="create-project-name" class="form-label">Client </label>
            </div>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-secondary"
                required
                @click="handleClickAssignClient"
              >
                <span v-if="c">{{ c.company?.name }} - {{ c.firstName }} {{ c.lastName }}</span>
                <span v-else> Sélectionner un client</span>
              </button>
            </div>
            <small id="errorMissingClient" class="form-text text-danger" v-if="errorMissingClient"
              >Merci de sélectionner un client</small
            >
          </div>
          <div class="row g-2">
            <div class="col mb-3">
              <label for="update-project-description" class="form-label">Description</label>
              <textarea
                type="text"
                id="update-project-description"
                class="form-control"
                placeholder="Ex : Créer une application mobile pour la gestion des stocks."
                :value="payload.description"
                @input="({ target }) => (payload.description = target.value)"
              ></textarea>
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-3">
              <label for="update-project-code" class="form-label">Code</label>
              <input
                type="text"
                id="update-project-code"
                class="form-control"
                placeholder="Ex : ABC-12345"
                required
                :value="payload.code"
                @input="({ target }) => (payload.code = target.value)"
              />
            </div>
            <div class="col mb-0">
              <label for="update-project-category" class="form-label">Catégorie</label>
              <input
                type="text"
                id="update-project-category"
                class="form-control"
                placeholder="Ex : Réseau"
                required
                :value="payload.category"
                @input="({ target }) => (payload.category = target.value)"
              />
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-0">
              <label for="update-project-start-date" class="form-label">Date de début</label>
              <input
                type="date"
                id="update-project-start-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                required
                :value="payload.startDate"
                @input="({ target }) => (payload.startDate = new Date(target.value).toISOString())"
              />
            </div>
            <div class="col mb-0">
              <label for="update-project-end-date" class="form-label">Date de fin</label>
              <input
                type="date"
                id="update-project-end-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                required
                :value="payload.endDate"
                @input="({ target }) => (payload.endDate = new Date(target.value).toISOString())"
              />
            </div>
          </div>
        </div>
        <div class="modal-body" v-else>
          <div class="row my-5 d-flex justify-content-center align-items-center">
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
          <button type="submit" class="btn btn-primary">Soumettre</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const $ = window.jQuery
const props = defineProps(['project', 'clients', 'client'])
const emit = defineEmits(['assign-client', 'submit'])
const errorMissingClient = ref(false)

let payload = {}
let c = {}
watchEffect(() => {
  if (props.project) {
    const startDate = props.project.startDate?.substring(0, 10)
    const endDate = props.project.endDate?.substring(0, 10)
    payload = { ...props.project, startDate, endDate }
    c = { ...props.project?.client }
  }
  if (props.client) {
    c = props.client
  }
})
const handleSubmit = () => {
  errorMissingClient.value = false
  if (!c) {
    errorMissingClient.value = true
  }
  emit('submit', { ...payload, client: c._id })
}
const handleClickAssignClient = () => {
  errorMissingClient.value = false
  emit('assign-client')
}
const show = () => {
  $('#project-update-modal').modal('show')
}
const hide = () => {
  $('#project-update-modal').modal('hide')
}
defineExpose({ show, hide })
</script>

<style scoped></style>
