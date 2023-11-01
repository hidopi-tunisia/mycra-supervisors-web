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
                      name="radio-topics"
                      class="form-check-input with-pointer"
                      type="radio"
                      value="consultants"
                      id="consultants"
                      :checked="checked === 'consultants'"
                      @input="checked = 'consultants'"
                    />
                    <label class="form-check-label with-pointer" for="consultants">
                      Consultants
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      name="radio-topics"
                      class="form-check-input with-pointer"
                      type="radio"
                      value="consultants-no-cras"
                      id="consultants-no-cras"
                      :checked="checked === 'consultants-no-cras'"
                      @input="checked = 'consultants-no-cras'"
                    />
                    <label class="form-check-label with-pointer" for="consultants-no-cras">
                      Consultants qui n'ont pas encore saisi le CRA du mois en cours
                    </label>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-12 my-3">
                      <div class="d-flex justify-content-between">
                        <label for="note" class="form-label"
                          >Message
                          <button
                            type="button"
                            class="btn btn-sm btn-simple"
                            @click="handleClickRestoreIntialMessage"
                          >
                            Restaurer le message initial
                          </button>
                        </label>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-danger mb-1"
                          @click="handleClickDeleteMessage"
                        >
                          Vider
                        </button>
                      </div>
                      <textarea
                        type="text"
                        id="textarea-notification-message"
                        rows="4"
                        class="form-control"
                        placeholder="Ex : Merci de saisir le CRA du mois."
                        :value="body"
                        @input="({ target }) => (body = target.value)"
                      ></textarea>
                      <button class="btn btn-primary my-3">Envoyer</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <notification-preview class="mx-auto" :content="body" />
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
import { send } from '@/domain/messaging'
import { currentUser } from '@/domain/auth'
import Swal from 'sweetalert2'
import { ref } from 'vue'
const { uid } = currentUser()
const checked = ref('consultants')
const INITIAL_MESSAGE = `Merci de saisir le CRA`
const body = ref(INITIAL_MESSAGE)
const handleSubmit = () => {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir envoyer la notification ?',
    text: 'Cette action est irriversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, envoyer !'
  }).then(async ({ isConfirmed }) => {
    if (isConfirmed) {
      try {
        const payload = {
          notification: {
            title: 'My CRA',
            body: body.value
          },
          data: {
            title: 'My CRA',
            body: body.value
          }
        }
        if (checked.value === 'consultants') {
          const topic = `supervisors~${uid}_consultants`
          payload['topic'] = topic
        } else if (checked.value === 'consultants-no-cras') {
          const year = new Date().getFullYear()
          const month = new Date().getMonth()
          const date = `${year}_${month}`
          const condition = `supervisors~${uid}_consultants in topics && !(supervisors~${uid}_cras_${date} in topics)`
          payload['condition'] = condition
        }
        await send(payload)
        Swal.fire({
          title: 'Notification envoyée',
          text: 'La notification a été envoyé avec succès.',
          icon: 'success'
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: `Erreur servenue`,
          text: `Une erreur est servenue, ${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  })
}
const handleClickRestoreIntialMessage = () => {
  body.value = INITIAL_MESSAGE
}
const handleClickDeleteMessage = () => {
  body.value = ''
}
</script>

<style scoped></style>
