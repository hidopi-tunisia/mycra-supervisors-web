<template>
  <div class="modal fade" id="client-update-modal" data-bs-backdrop="static" tabindex="-1">
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
        <div class="modal-body" v-if="props.client">
          <div class="row">
            <div class="col mb-3">
              <label for="update-client-name" class="form-label">Nom du projet</label>
              <input
                type="text"
                id="update-client-name"
                class="form-control"
                placeholder="Ex : Création d'une application mobile"
                :value="client.name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="update-client-name" class="form-label">Client </label>
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
              <label for="update-client-description" class="form-label">Description</label>
              <textarea
                type="text"
                id="update-client-description"
                class="form-control"
                placeholder="Ex : Créer une application mobile pour la gestion des stocks."
                :value="client.description"
              ></textarea>
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-3">
              <label for="update-client-code" class="form-label">Code</label>
              <input
                type="text"
                id="update-client-code"
                class="form-control"
                placeholder="Ex : ABC-12345"
                :value="client.clientCode"
              />
            </div>
            <div class="col mb-0">
              <label for="update-client-category" class="form-label">Catégorie</label>
              <input
                type="text"
                id="update-client-category"
                class="form-control"
                placeholder="Ex : Réseau"
                :value="client.category"
              />
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-0">
              <label for="update-client-start-date" class="form-label">Date de début</label>
              <input
                type="date"
                id="update-client-start-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                :value="client.startDate"
              />
            </div>
            <div class="col mb-0">
              <label for="update-client-end-date" class="form-label">Date de fin</label>
              <input
                type="date"
                id="update-client-end-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
                :value="client.endDate"
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
const props = defineProps({ client: Object, clients: Array<Object> })
const emit = defineEmits(['submit'])
const handleClickSubmit = () => {
  emit('submit', { ...props.client })
}
const client = ref(null)
const handleClickClient = (id) => {
  client.value = props.clients.find(({ _id }) => _id === id)
}
const show = () => {
  $('#client-update-modal').modal('show')
}
const hide = () => {
  $('#client-update-modal').modal('hide')
}
defineExpose({ show, hide })
</script>

<style scoped></style>
