<template>
  <div
    class="modal fade"
    id="client-create-modal"
    data-bs-backdrop="static"
    tabindex="-1"
    ref="client-create-modal"
  >
    <div class="modal-dialog">
      <form class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="client-create-modal-title">Nouveau projet</h5>
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
              <label for="create-client-name" class="form-label">Nom du projet</label>
              <input
                type="text"
                id="create-client-name"
                class="form-control"
                placeholder="Ex : Création d'une application mobile"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="create-client-name" class="form-label">Client </label>
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
              <label for="create-client-description" class="form-label">Description</label>
              <textarea
                type="text"
                id="create-client-description"
                class="form-control"
                placeholder="Ex : Créer une application mobile pour la gestion des stocks."
              ></textarea>
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-3">
              <label for="create-client-code" class="form-label">Code</label>
              <input
                type="text"
                id="create-client-code"
                class="form-control"
                placeholder="Ex : ABC-12345"
              />
            </div>
            <div class="col mb-0">
              <label for="create-client-category" class="form-label">Catégorie</label>
              <input
                type="text"
                id="create-client-category"
                class="form-control"
                placeholder="Ex : Réseau"
              />
            </div>
          </div>
          <div class="row g-2">
            <div class="col mb-0">
              <label for="create-client-start-date" class="form-label">Date de début</label>
              <input
                type="date"
                id="create-client-start-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
              />
            </div>
            <div class="col mb-0">
              <label for="create-client-end-date" class="form-label">Date de fin</label>
              <input
                type="date"
                id="create-client-end-date"
                class="form-control"
                placeholder="DD / MM / YYYY"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            Annuler
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const $ = window.jQuery
const props = defineProps({ clients: Array<Object> })
const client = ref(null)
const handleClickClient = (id) => {
  client.value = props.clients.find(({ _id }) => _id === id)
}
const show = () => {
  $('#client-create-modal').modal('show')
}
const hide = () => {
  $('#client-create-modal').modal('hide')
}
defineExpose({ show, hide })
</script>

<style scoped></style>
