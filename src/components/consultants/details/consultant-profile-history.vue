<template>
  <form @submit.prevent="handleSubmit">
    <div class="card mb-4">
      <h5 class="card-header">Profil du consultant</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <div class="d-flex align-items-start align-items-sm-center gap-4">
              <img
                :src="newProfile.profilePhoto"
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
          <div class="col-6">
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
                <div class="mb-2">Poste</div>
                <div class="fw-bold my-2">{{ newProfile.position }}</div>
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
    </div>
    <consultant-profile-history-collection :history="props.history" />
  </form>
</template>

<script setup lang="ts">
import ConsultantProfileHistoryCollection from '@/components/consultants/details/consultant-profile-history-collection.vue'
const props = defineProps(['profile', 'isUpdate', 'history'])
let newProfile
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
