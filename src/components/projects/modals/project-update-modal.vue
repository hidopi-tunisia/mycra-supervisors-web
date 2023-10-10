<template>
  <div class="modal fade" id="project-update-modal" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="handleClickSubmit">
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
                :value="project.name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="update-project-name" class="form-label">Client </label>
            </div>
            <div class="btn-group mb-3">
              <button
                type="button"
                class="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span v-if="client"
                  >{{ client.company.name }} - {{ client.firstName }} {{ client.lastName }}</span
                >
                <span v-else> Sélectionner un client</span>
              </button>
              <ul class="dropdown-menu">
                <li class="with-pointer">
                  <a
                    class="dropdown-item"
                    :key="c._id"
                    v-for="c in props.clients"
                    @click="handleClickClient(c._id)"
                    >{{ c.company.name }} - {{ c.firstName }} {{ c.lastName }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-3">
              <label for="update-project-description" class="form-label">Description</label>
              <textarea
                type="text"
                id="update-project-description"
                class="form-control"
                placeholder="Ex : Créer une application mobile pour la gestion des stocks."
                :value="project.description"
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
                :value="project.projectCode"
              />
            </div>
            <div class="col mb-0">
              <label for="update-project-category" class="form-label">Catégorie</label>
              <input
                type="text"
                id="update-project-category"
                class="form-control"
                placeholder="Ex : Réseau"
                :value="project.category"
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
                :value="project.startDate"
              />
            </div>
            <div class="col mb-0">
              <label for="update-project-end-date" class="form-label">Date de fin</label>
              <input
                type="date"
                id="update-project-end-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                :value="project.endDate"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Annuler
          </button>
          <button
            type="submit"
            class="btn btn-primary"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const $ = window.jQuery
const props = defineProps({ project: Object, clients: Array<Object> })
const emit = defineEmits(['submit'])
const handleClickSubmit = () => {
  emit('submit', { ...props.project })
}
const client = ref(null)
const handleClickClient = (id) => {
  client.value = props.clients.find(({ _id }) => _id === id)
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
