<template>
  <div class="card mb-4">
    <h5 class="card-header">Mon profil</h5>
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <div class="d-flex align-items-start align-items-sm-center gap-4">
            <img
              src="/assets/img/avatars/company.jpg"
              alt="user-avatar"
              class="d-block rounded"
              height="100"
              width="100"
              id="profilePhoto"
            />
          </div>
        </div>
        <div class="col-12 col-md-9">
          <div class="row">
            <div class="col-6 col-md-4">
              <div class="mb-2">Nom et prénom</div>
              <div class="fw-bold">
                {{ props.profile.civility }} {{ props.profile.firstName }}
                {{ props.profile.lastName }}
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div>Email</div>
              <div class="fw-bold my-2">
                <a :href="'mailto:' + props.profile.phone">{{ props.profile.email }}</a>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div>Offre</div>
              <div class="fw-bold my-2 text-uppercase d-flex align-items-center">
                {{ props.profile.offer }}
                <button class="btn btn-sm btn-outline-primary mx-1" @click="handleClickUpgrade">
                  Mettre à niveau
                </button>
              </div>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-6 col-md-4">
              <div class="mb-2">Nom social</div>
              <div class="fw-bold my-2 text-capitalize">{{ props.profile.company?.name }}</div>
            </div>
            <div class="col-6 col-md-4">
              <div>Téléphone</div>
              <div class="fw-bold my-2">
                <a :href="'tel:' + props.profile.phone">{{ props.profile.phone }}</a>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div>Consultants</div>
              <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                <li
                  v-for="c in profile.consultants"
                  data-bs-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-bs-placement="top"
                  class="avatar avatar-xs pull-up"
                  :title="c.name"
                  :key="c"
                >
                  <img :src="c.profilePhoto" alt="Avatar" class="rounded-circle" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-0" />
    <div class="card-body">
      <div class="row">
        <div class="mb-3 col-md-6">
          <label for="position" class="form-label">Nom social</label>
          <input
            class="form-control"
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Ex : ACME Corp"
            disabled
            :value="props.profile?.company?.name"
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
            disabled
            :value="props.profile?.company?.siret"
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
            disabled
            :value="props.profile?.company?.representative"
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
            disabled
            :value="props.profile.email"
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
            disabled
            :value="props.profile?.company?.address?.street"
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
            disabled
            :value="props.profile.phone"
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
            disabled
            :value="props.profile.secondPhone"
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
            disabled
            :value="props.profile?.company?.address?.city"
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
            disabled
            :value="props.profile?.company?.address?.zipCode"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="availableAt" class="form-label">Date du signature</label>
          <input
            type="date"
            class="form-control"
            id="signatureDate"
            name="signatureDate"
            disabled
            :value="props.profile.signatureDate"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="hiredAt" class="form-label">Facebook</label>
          <input
            class="form-control"
            type="text"
            id="facebook"
            name="facebook"
            placeholder="Ex : https://www.facebook.com/john.doe"
            disabled
            :value="props.profile.facebook"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="hiredAt" class="form-label">Twitter</label>
          <input
            class="form-control"
            type="text"
            id="twitter"
            name="twitter"
            placeholder="Ex : https://www.twitter.com/@john.doe"
            disabled
            :value="props.profile.twitter"
          />
        </div>
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary me-2" @click="handleClickUpgrade">
          Mettre à jour
        </button>
        <div class="mt-2">
          <i class="bx bx-info-circle"></i> Demander une mise à jour des informations de votre
          profil
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['profile'])
const emit = defineEmits(['update', 'upgrade'])
const handleClickUpdate = () => {
  emit('update')
}
const handleClickUpgrade = () => {
  emit('upgrade')
}
</script>

<style scoped></style>
