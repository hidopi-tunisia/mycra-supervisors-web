<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-4">
          <div class="mb-2">Nom et prénom</div>
          <div class="fw-bold">{{ props.data.firstName }} {{ props.data.lastName }}</div>
        </div>
        <div class="col-4">
          <div>Email</div>
          <div class="fw-bold my-2">
            <a :href="'mailto:' + props.data.email">{{ props.data.email }}</a>
          </div>
        </div>
        <div class="col-4">
          <div>Téléphone</div>
          <div class="fw-bold my-2">
            <a :href="'tel:' + props.data.phone">{{ props.data.phone }}</a>
          </div>
        </div>
      </div>
      <div class="row my-2" v-if="props.data?.company">
        <div class="col-4">
          <div class="mb-2">Entreprise</div>
          <div class="fw-bold my-2">{{ props.data?.company?.name }}</div>
        </div>
        <div class="col-4">
          <div>SIRET</div>
          <div class="fw-bold my-2">{{ props.data?.company?.siret }}</div>
        </div>
        <div class="col-4">
          <div>Offre</div>
          <div class="fw-bold my-2 text-uppercase">{{ props.data.offer }}</div>
        </div>
      </div>
    </div>
  </div>
  <hr class="my-0" />
  <div class="row wrapper overflow-auto">
    <div class="row mt-3">
      <div class="mb-3 col-md-4">
        <label for="currency" class="form-label">Projet</label>
        <p>{{ props.data.project }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="skills" class="form-label"
          >Consultants ({{ props.data?.consultants?.length }})</label
        >
        <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
          <li
            v-for="c in props.data?.consultants"
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
      <div class="mb-3 col-md-4">
        <label for="currency" class="form-label">Représentant</label>
        <p>{{ props.data?.company?.representative }}</p>
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-md-4">
        <label for="address" class="form-label">Adresse</label>
        <p>
          {{ props.data?.company?.address?.street }}
        </p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="zipCode" class="form-label">Ville</label>
        <p>{{ props.data?.company?.address?.city }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="formFile" class="form-label">Code postal</label>
        <p>{{ props.data?.company?.address?.zipCode }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="availableAt" class="form-label">Date de signature</label>
        <p>{{ props.data.signatureDate.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="availableAt" class="form-label">Date de création</label>
        <p>{{ props.data.createdAt.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-md-4">
        <label for="formFile" class="form-label">Téléphone 2</label>
        <p>
          <a target="_blank" id="linked-in" :href="props.data.secondPhone"
            >{{ props.data.secondPhone }}
          </a>
        </p>
      </div>
      <div class="mb-3 col-md-12">
        <label for="note" class="form-label">Observation</label>
        <p>{{ props.data.observation }}</p>
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
