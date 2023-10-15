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
                  newProfile.profilePhoto
                    ? newProfile.profilePhoto
                    : '/assets/img/avatars/avatar-placeholder.jpg'
                "
                alt="user-avatar"
                class="d-block rounded"
                height="100"
                width="100"
                id="profilePhoto"
              />
              <div class="button-wrapper">
                <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                  <span class="d-none d-sm-block">Téléverser une photo</span>
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
                  {{ newProfile.civility }} {{ newProfile.firstName }} {{ newProfile.lastName }}
                </div>
              </div>
              <div class="col-6">
                <div>Email</div>
                <div class="fw-bold my-2">
                  <a :href="'mailto:' + newProfile.phone">{{ newProfile.email }}</a>
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
                  <a :href="'tel:' + newProfile.phone">{{ newProfile.phone }}</a>
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
                name="civility"
                id="male"
                value="Mr."
                :checked="newProfile.civility === 'Mr.'"
              />
              <label class="form-check-label with-pointer" for="male">Mr.</label>
            </div>
            <div class="form-check form-check-inline with-pointer">
              <input
                class="form-check-input"
                type="radio"
                name="civility"
                id="female"
                value="Mme."
                :checked="newProfile.civility === 'Mme.'"
              />
              <label class="form-check-label with-pointer" for="female">Mme.</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="position" class="form-label">Nom social</label>
            <input
              class="form-control"
              type="text"
              id="position"
              name="position"
              placeholder="Ex : ACME Corp"
              :value="newProfile?.company?.name"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="lastName" class="form-label">SIRET</label>
            <input
              class="form-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex : Doe"
              :value="newProfile?.company?.siret"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="lastName" class="form-label">Responsable</label>
            <input
              class="form-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex : Doe"
              :value="newProfile?.company?.representative"
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="email" class="form-label">E-mail</label>
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              placeholder="Ex : john.doe@example.com"
              :value="newProfile.email"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="note" class="form-label">Adresse postale</label>
            <textarea
              class="form-control"
              id="address"
              name="address"
              rows="2"
              placeholder="Ex : 123 rue des Oranges"
              :value="newProfile?.company?.address?.street"
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-3">
            <label for="lastName" class="form-label">Téléphone 1</label>
            <input
              class="form-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex : 123456789"
              :value="newProfile.phone"
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="firstName" class="form-label">Téléphone 2</label>
            <input
              class="form-control"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Ex : 123456789"
              :value="newProfile.secondPhone"
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="email" class="form-label">Ville</label>
            <input
              class="form-control"
              type="text"
              id="city"
              name="city"
              placeholder="Ex : Paris"
              :value="newProfile?.company?.address?.city"
            />
          </div>
          <div class="mb-3 col-md-3">
            <label for="email" class="form-label">Code postal</label>
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              placeholder="Ex : 12345"
              :value="newProfile?.company?.address?.zipCode"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="availableAt" class="form-label">Date du signature</label>
            <input
              type="date"
              class="form-control"
              id="signatureDate"
              name="signatureDate"
              :value="newProfile.signatureDate"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="hiredAt" class="form-label">Compétences</label>
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              placeholder="Ex : BP, CP, Développement du backend, Développement du frontend..."
              :value="newProfile.skills"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="note" class="form-label">Note</label>
            <textarea
              class="form-control"
              id="note"
              name="note"
              rows="4"
              placeholder="Ex : John Doe est un excellent développeur"
              :value="newProfile.note"
            ></textarea>
          </div>
          <div class="mb-3 col-md-6">
            <label for="formFile" class="form-label">Document</label>
            <input class="form-control" type="file" id="formFile" />
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2">Soumettre</button>
          <button type="reset" class="btn btn-outline-secondary">Annuler</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps(['profile', 'isUpdate'])
let newProfile = {}
if (props.isUpdate) {
  newProfile = { ...props.profile }
}
const emit = defineEmits(['submit'])
const handleSubmit = () => {
  const payload = {}
  emit('submit', payload)
}
</script>

<style scoped></style>
