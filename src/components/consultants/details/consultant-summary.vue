<template>
  <div class="row">
    <div class="col-xs-12 col-md-3">
      <div class="d-flex align-items-start align-items-sm-center gap-4">
        <img
          :src="
            props.data.profilePhoto
              ? props.data.profilePhoto
              : '/assets/img/avatars/avatar-placeholder.jpg'
          "
          alt="user-avatar"
          class="d-block rounded"
          height="100"
          width="100"
          id="profilePhoto"
        />
      </div>
    </div>
    <div class="col-xs-12 col-md-9">
      <div class="mt-4 d-md-none"></div>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class="mb-2">Nom et prénom</div>
          <div class="fw-bold">
            {{ props.data.civility }} {{ props.data.firstName }} {{ props.data.lastName }}
          </div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div>Email</div>
          <div class="fw-bold my-2">
            <a :href="'mailto:' + props.data.email">{{ props.data.email }}</a>
          </div>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-xs-12 col-md-6">
          <div class="mb-2">Poste</div>
          <div class="fw-bold my-2">{{ props.data.position }}</div>
        </div>
        <div class="col-xs-12 col-md-6">
          <div>Téléphone</div>
          <div class="fw-bold my-2">
            <a :href="'tel:' + props.data.phone">{{ props.data.phone }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="my-0" />
  <div class="row wrapper overflow-auto">
    <div class="row mt-3">
      <div class="mb-3 col-md-4">
        <label for="currency" class="form-label">Expérience dans le poste</label>
        <p>{{ props.data.yearsOfExperience }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="skills" class="form-label">Compétences</label>
        <p>Skills</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="skills" class="form-label">Projets</label>
        <p>{{props.data.projects.length}}</p>
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-md-4">
        <label for="linked-in" class="form-label">Profil LinkedIn</label>
        <p>
          <a target="_blank" id="linked-in" :href="props.data.linkedIn">Visiter profil</a>
        </p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="zipCode" class="form-label">Code postal</label>
        <p>{{ props.data.zipCode }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="formFile" class="form-label">Dossier de compétence</label>
        <p>
          <a target="_blank" :href="props.data.doc">Voir le dossier</a>
        </p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="availableAt" class="form-label">Date de création</label>
        <p>{{ props.data.createdAt.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="availableAt" class="form-label">Date de disponibilité</label>
        <p>{{ props.data.availableAt.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="hiredAt" class="form-label">Date d'embauche</label>
        <p>{{ props.data.hiredAt.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-md-12">
        <label for="note" class="form-label">Note</label>
        <p>{{ props.data.note }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['data'])
</script>

<style scoped>
.wrapper {
  height: 300px;
}
</style>
