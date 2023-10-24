<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb breadcrumb-style1">
      <li class="breadcrumb-item active">
        <a href="#">Notifications</a>
      </li>
    </ol>
  </nav>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="handleSubmit">
        <div class="card">
          <h5 class="card-header">Notifier par cible</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <span
                  >Vous pouvez notifier tous les consultants ou des consultants appartenant à un
                  projet précis.
                </span>

                <div class="col-md">
                  <div class="form-check mt-3 with-pointer">
                    <input
                      name="default-radio-1"
                      class="form-check-input with-pointer"
                      type="radio"
                      value=""
                      id="defaultRadio1"
                    />
                    <label class="form-check-label with-pointer" for="defaultRadio1">
                      Consultants
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      name="default-radio-1"
                      class="form-check-input with-pointer"
                      type="radio"
                      value=""
                      id="defaultRadio2"
                      checked
                    />
                    <label class="form-check-label with-pointer" for="defaultRadio2">
                      Consultants qui n'ont pas encore saisi le CRA du mois en cours
                    </label>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-12 my-3">
                      <label for="textarea-notification-message" class="form-label">Message</label>
                      <textarea
                        type="text"
                        id="textarea-notification-message"
                        rows="4"
                        class="form-control"
                        placeholder="Ex : Merci de saisir le CRA du mois."
                        :value="content"
                        @input="({ target }) => (content = target.value)"
                      ></textarea>
                      <button class="btn btn-primary my-3">Envoyer</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <notification-preview class="mx-auto" :content="content" />
                <div class="mb-5"></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationPreview from '@/components/notifications/notification-preview.vue'
import Swal from 'sweetalert2'
import { ref } from 'vue'
const content = ref('Merci de saisir le CRA')
const handleSubmit = () => {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir envoyer la notification ?',
    text: 'Cette action est irriversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, envoyer !'
  }).then((result) => {})
}
</script>

<style scoped></style>
