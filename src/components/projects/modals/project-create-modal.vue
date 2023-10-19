<template>
  <div
    class="modal fade"
    id="project-create-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="project-create-modal"
  >
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="handleSubmit">
        <div class="modal-header">
          <h5 class="modal-title" id="project-create-modal-title">Nouveau projet</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col mb-3">
              <label for="create-project-name" class="form-label">Nom du projet</label>
              <input
                type="text"
                id="create-project-name"
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
                <span v-if="props.client"
                  >{{ props.client.company.name }} - {{ props.client.firstName }}
                  {{ props.client.lastName }}</span
                >
                <span v-else> Sélectionner un client</span>
              </button>
            </div>
            <small id="errorMissingClient" class="form-text text-danger" v-if="errorMissingClient">Merci de sélectionner un client</small>
          </div>
          <div class="row g-2 mt-3">
            <div class="col mb-3">
              <label for="create-project-description" class="form-label">Description</label>
              <textarea
                type="text"
                id="create-project-description"
                class="form-control"
                placeholder="Ex : Créer une application mobile pour la gestion des stocks."
                :value="payload.description"
                @input="({ target }) => (payload.description = target.value)"
              ></textarea>
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-3">
              <label for="create-project-code" class="form-label">Code</label>
              <input
                type="text"
                id="create-project-code"
                class="form-control"
                placeholder="Ex : ABC-12345"
                :value="payload.code"
                required
                @input="({ target }) => (payload.code = target.value)"
              />
            </div>
            <div class="col mb-0">
              <label for="create-project-category" class="form-label">Catégorie</label>
              <input
                type="text"
                id="create-project-category"
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
              <label for="create-project-start-date" class="form-label">Date de début</label>
              <input
                type="date"
                id="create-project-start-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                required
                :value="payload.startDate"
                @input="({ target }) => (payload.startDate = new Date(target.value).toISOString())"
              />
            </div>
            <div class="col mb-0">
              <label for="create-project-end-date" class="form-label">Date de fin</label>
              <input
                type="date"
                id="create-project-end-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                required
                :value="payload.endDate"
                @input="({ target }) => (payload.endDate = new Date(target.value).toISOString())"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Annuler
          </button>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const $ = window.jQuery
const props = defineProps({ clients: Array<Object>, client: Object })
const emit = defineEmits(['assign-client', 'submit'])
const errorMissingClient = ref(false)
let payload = {}
const handleSubmit = () => {
  errorMissingClient.value = false
  if (!props.client) {
    errorMissingClient.value = true
  }
  emit('submit', payload)
}
const handleClickAssignClient = () => {
  errorMissingClient.value = false
  emit('assign-client')
}
const show = () => {
  $('#project-create-modal').modal('show')
}
const hide = () => {
  $('#project-create-modal').modal('hide')
}
defineExpose({ show, hide })
</script>

<style scoped></style>
