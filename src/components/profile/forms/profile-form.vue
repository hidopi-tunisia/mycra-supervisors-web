<template>
  <div class="card mb-4">
    <h5 class="card-header">Mon profil</h5>
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <div class="d-flex align-items-start align-items-sm-center gap-4">
            <img
              :src="
                props?.profile?.company?.logo
                  ? props?.profile?.company?.logo
                  : '/assets/img/avatars/company-placeholder.png'
              "
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
              <div class="mb-2">Prénom et nom</div>
              <div class="fw-bold">
                {{ props.profile.civility }} {{ props.profile.firstName }}
                {{ props.profile.lastName }}
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div>Email</div>
              <div class="fw-bold my-2">
                <a :href="'mailto:' + props.profile.email">{{ props.profile.email }}</a>
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
                <a :href="'tel:' + props.profile.company?.phone">{{
                  props.profile.company?.phone
                }}</a>
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
                  <img
                    alt="Avatar"
                    class="rounded-circle"
                    v-if="c.profilePhoto"
                    :src="c.profilePhoto"
                  />
                  <img alt="Avatar" class="rounded-circle" v-else :src="getAvatar(c._id)" />
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
          <label for="siret" class="form-label">SIRET</label>
          <input
            class="form-control"
            type="text"
            name="siret"
            id="siret"
            placeholder="Ex : 123456789"
            disabled
            :value="props.profile?.company?.siret"
          />
        </div>
      </div>
      <div class="row">
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
            :value="props.profile?.company?.phone"
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
        <div class="mb-3 col-md-6">
          <label for="availableAt" class="form-label">Social</label>
          <div class="d-flex flex-row">
            <a
              target="_blank"
              :href="props.profile.company?.website"
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Site web"
            >
              <div class="icon-social bx bxs-mouse with-pointer me-2"></div>
            </a>
            <a
              target="_blank"
              :href="props.profile.company?.facebookLink"
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Facebook"
            >
              <div class="icon-social bx bxl-facebook-circle with-pointer me-2"></div>
            </a>
            <a
              target="_blank"
              :href="props.profile.company?.instagramPage"
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="Instagram"
            >
              <div class="icon-social bx bxl-instagram-alt with-pointer me-2"></div>
            </a>
            <a
              target="_blank"
              :href="props.profile.company?.xLink"
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="X"
            >
              <div class="icon-social with-pointer me-2">
                <img class="icon-x" src="/assets/img/icons/x.png" />
              </div>
            </a>
            <a
              target="_blank"
              :href="props.profile.company?.linkedInLink"
              data-bs-toggle="tooltip"
              data-popup="tooltip-custom"
              data-bs-placement="top"
              title="LinkedIn"
            >
              <div class="icon-social bx bxl-linkedin-square with-pointer me-2"></div>
            </a>
          </div>
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
import { generateFromString } from 'generate-avatar'
const props = defineProps(['profile'])
const emit = defineEmits(['update', 'upgrade'])
const handleClickUpdate = () => {
  emit('update')
}
const handleClickUpgrade = () => {
  emit('upgrade')
}
const getAvatar = (text) => {
  return `data:image/svg+xml;utf8,${generateFromString(text)}`
}
</script>

<style scoped>
.icon-x {
  height: 24px;
  width: 24px;
}
</style>
