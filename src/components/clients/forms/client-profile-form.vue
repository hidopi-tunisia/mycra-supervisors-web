<template>
  <form @submit.prevent="handleSubmit">
    <div class="card mb-4">
      <h5 class="card-header">Profil du client</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-xs-12 col-lg-6">
            <div class="d-flex align-items-start align-items-sm-center gap-4">
              <img
                :src="
                  newProfile.company?.logo
                    ? newProfile.company?.logo
                    : '/assets/img/avatars/company-placeholder.png'
                "
                alt="user-avatar"
                class="d-block rounded"
                height="100"
                width="100"
                id="profilePhoto"
              />
              <div class="button-wrapper">
                <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                  <span class="d-none d-sm-block">Téléverser un logo</span>
                  <i class="bx bx-upload d-block d-sm-none"></i>
                  <input
                    type="file"
                    id="upload"
                    class="account-file-input"
                    hidden
                    accept="image/png, image/jpeg"
                  />
                </label>
                <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                  <i class="bx bx-reset d-block d-sm-none"></i>
                  <span class="d-none d-sm-block">Réintialiser</span>
                </button>
                <p class="text-muted mb-0">JPG ou PNG. Taille maximale 1MB</p>
              </div>
            </div>
          </div>
          <div class="mb-4 d-lg-none"></div>
          <div class="col-xs-12 col-lg-6" v-if="props.isUpdate">
            <div class="row">
              <div class="col-6">
                <div class="mb-2">Nom et prénom</div>
                <div class="fw-bold">
                  <span v-show="newProfile.sex === 'male'">Mr.</span>
                  <span v-show="newProfile.sex === 'female'">Mme.</span>
                  {{ newProfile.firstName }} {{ newProfile.lastName }}
                </div>
              </div>
              <div class="col-6">
                <div>Email</div>
                <div class="fw-bold my-2">
                  <a :href="'mailto:' + newProfile.email">{{ newProfile.email }}</a>
                </div>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-6">
                <div class="mb-2">Nom social</div>
                <div class="fw-bold my-2 text-capitalize">{{ newProfile.company?.name }}</div>
              </div>
              <div class="col-6">
                <div>Téléphone</div>
                <div class="fw-bold my-2">
                  <a :href="'tel:' + newProfile.company?.phone">{{ newProfile.company?.phone }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-0" />
      <div class="card-body">
        <div class="row mb-3">
          <label for="civility" class="form-label">Civilité</label>
          <div class="col-md">
            <div class="form-check form-check-inline mt-3 with-pointer">
              <input
                class="form-check-input"
                type="radio"
                name="sex"
                id="male"
                value="male"
                :checked="newProfile.sex === 'male'"
                @input="newProfile.sex = 'male'"
              />
              <label class="form-check-label with-pointer" for="male">Mr.</label>
            </div>
            <div class="form-check form-check-inline with-pointer">
              <input
                class="form-check-input"
                type="radio"
                name="sex"
                id="female"
                value="female"
                :checked="newProfile.sex === 'female'"
                @input="newProfile.sex = 'female'"
              />
              <label class="form-check-label with-pointer" for="female">Mme.</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="firstName" class="form-label">Prénom</label>
            <input
              class="form-control"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Ex : John"
              :value="newProfile.firstName"
              @input="({ target }) => (newProfile.firstName = target.value)"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="lastName" class="form-label">Nom</label>
            <input
              class="form-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex : Doe"
              :value="newProfile.lastName"
              @input="({ target }) => (newProfile.lastName = target.value)"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="email" class="form-label">Email</label>
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              placeholder="Ex : john.doe@example.com"
              required
              :value="newProfile?.email"
              @input="({ target }) => (newProfile.email = target.value)"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Nom social</label>
            <input
              class="form-control"
              type="text"
              id="name"
              name="name"
              placeholder="Ex : ACME Corp"
              required
              :value="newProfile?.company?.name"
              @input="
                ({ target }) => (newProfile.company = { ...newProfile.company, name: target.value })
              "
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="siret" class="form-label">SIRET</label>
            <input
              class="form-control"
              type="text"
              name="siret"
              id="siret"
              placeholder="Ex : 123456789"
              required
              :value="newProfile.company?.siret"
              @input="
                ({ target }) =>
                  (newProfile.company = { ...newProfile.company, siret: target.value })
              "
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="representative" class="form-label">Responsable</label>
            <input
              class="form-control"
              type="text"
              name="representative"
              id="representative"
              :value="newProfile.company?.representative"
              placeholder="Ex : Jane Doe"
              required
              @input="
                ({ target }) =>
                  (newProfile.company = { ...newProfile.company, representative: target.value })
              "
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="formFile" class="form-label">Contrat</label>
            <input class="form-control" type="file" id="formFile" />
          </div>
          <div class="mb-3 col-md-3">
            <label for="signedAt" class="form-label">Signé le</label>
            <input
              type="date"
              class="form-control"
              id="signedAt"
              name="signedAt"
              :value="newProfile.contract?.signedAt?.substring(0, 10)"
              @input="
                ({ target }) =>
                  (newProfile.contract = {
                    ...newProfile.contract,
                    signedAt: target.value
                  })
              "
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-3">
            <label for="phone" class="form-label">Téléphone 1</label>
            <input
              class="form-control"
              type="text"
              name="phone"
              id="phone"
              placeholder="Ex : +1 23456789"
              required
              :value="newProfile.company?.phone"
              @input="
                ({ target }) =>
                  (newProfile.company = { ...newProfile.company, phone: target.value })
              "
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="secondPhone" class="form-label">Téléphone 2</label>
            <input
              class="form-control"
              type="text"
              id="secondPhone"
              name="secondPhone"
              placeholder="Ex : +1 23456789"
              :value="newProfile.company?.secondPhone"
              @input="
                ({ target }) =>
                  (newProfile.company = { ...newProfile.company, secondPhone: target.value })
              "
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="city" class="form-label">Ville</label>
            <input
              class="form-control"
              type="text"
              id="city"
              name="city"
              placeholder="Ex : Paris"
              required
              :value="newProfile?.company?.address?.city"
              @input="
                ({ target }) =>
                  (newProfile.company = {
                    ...newProfile.company,
                    address: { ...newProfile.company?.address, city: target.value }
                  })
              "
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="zipCode" class="form-label">Code postal</label>
            <input
              class="form-control"
              type="text"
              id="zipCode"
              name="zipCode"
              placeholder="Ex : 12345"
              required
              :value="newProfile?.company?.address?.zipCode"
              @input="
                ({ target }) =>
                  (newProfile.company = {
                    ...newProfile.company,
                    address: { ...newProfile.company?.address, zipCode: target.value }
                  })
              "
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="street" class="form-label">Adresse postale</label>
            <textarea
              class="form-control"
              id="street"
              name="street"
              rows="2"
              placeholder="Ex : 123 rue des Oranges"
              :value="newProfile?.company?.address?.street"
              required
              @input="
                ({ target }) =>
                  (newProfile.company = {
                    ...newProfile.company,
                    address: { ...newProfile.company?.address, street: target.value }
                  })
              "
            ></textarea>
          </div>
          <div class="mb-3 col-md-6">
            <label for="note" class="form-label">Note</label>
            <textarea
              class="form-control"
              id="note"
              name="note"
              rows="2"
              maxlength="500"
              placeholder="Ex : John Doe est un excellent client"
              :value="newProfile.note"
              @input="
                ({ target }) => {
                  newProfile.note = target.value
                  note = target.value
                }
              "
            ></textarea>
            <small id="noteHelp" class="form-text text-muted"
              >{{ note ? 500 - note.length : 500 }} caractères restants</small
            >
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2 btn-submit" :disabled="props.loading">
            <span v-if="!props.loading"> {{ props.isUpdate ? 'Mettre à jour' : 'Soumettre' }}</span>
            <div class="spinner-grow spinner-grow-sm" role="status" v-else>
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <button type="reset" class="btn btn-outline-secondary">Réintialiser</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const note = ref('')
const props = defineProps(['profile', 'isUpdate', 'loading'])
let newProfile = {}
if (props.isUpdate) {
  if (props.profile.note) {
    note.value = props.profile.note
  }
  newProfile = { ...props.profile }
}
const emit = defineEmits(['submit'])
const handleSubmit = () => {
  const payload = { ...newProfile }
  emit('submit', payload)
}
</script>

<style scoped>
.btn-submit {
  width: 200px;
}
</style>
