<template>
  <form @submit.prevent="handleSubmit">
    <div class="card mb-4">
      <h5 class="card-header">Détails du consultant</h5>
      <div class="card-body">
        <div class="d-flex align-items-start align-items-sm-center gap-4">
          <img
            src="../../../../assets/img/avatars/1.png"
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
              />
              <label class="form-check-label with-pointer" for="female">Mme.</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="position" class="form-label">Poste</label>
            <input
              class="form-control"
              type="text"
              id="position"
              name="position"
              placeholder="Ex : Développeur web"
              value=""
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="currency" class="form-label">Expérience dans le poste</label>
            <select id="currency" class="select2 form-select">
              <option disabled selected>Sélectionner</option>
              <option v-for="y in 10" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
          <div class="mb-3 col-md-6">
            <label for="skills" class="form-label">Compétences</label>
            <input
              class="form-control"
              type="text"
              id="skills"
              name="skills"
              placeholder="Ex : Node.js, Jira, Angular..."
              value=""
            />
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="lastName" class="form-label">Nom</label>
            <input
              class="form-control"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex : Doe"
              value=""
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="firstName" class="form-label">Prénom</label>
            <input
              class="form-control"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Ex : Prénom"
              value=""
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="email" class="form-label">E-mail</label>
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              placeholder="Ex : john.doe@example.com"
              value=""
            />
          </div>
          <div class="mb-3 col-md-6">
            <label class="form-label" for="phoneNumber">Phone Number</label>
            <div class="input-group input-group-merge">
              <span class="input-group-text">FR (+33)</span>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                class="form-control"
                placeholder="Ex : 123456789"
                value=""
              />
            </div>
          </div>
          <div class="mb-3 col-md-6">
            <label for="address" class="form-label">Profil LinkedIn</label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              placeholder="Ex : https://www.linkedin.com/in/john.doe"
              value=""
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="zipCode" class="form-label">Code postal</label>
            <input
              class="form-control"
              type="text"
              id="state"
              name="zipCode"
              placeholder="Ex : 123456"
              value=""
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="availableAt" class="form-label">Date de disponibilité</label>
            <input type="date" class="form-control" id="availableAt" name="availableAt" value="" />
          </div>
          <div class="mb-3 col-md-6">
            <label for="hiredAt" class="form-label">Date d'embauche</label>
            <input type="date" class="form-control" id="hiredAt" name="hiredAt" value="" />
          </div>
          <div class="mb-3 col-md-6">
            <label for="note" class="form-label">Note</label>
            <textarea
              class="form-control"
              id="note"
              name="note"
              placeholder="Ex : John Doe est un excellent développeur"
              value=""
            ></textarea>
          </div>
          <div class="mb-3 col-md-6">
            <label for="formFile" class="form-label">Dossier de compétence</label>
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
const emit = defineEmits(['submit'])
const handleSubmit = () => {
  const payload = {}
  emit('submit', payload)
}
</script>

<style scoped></style>
