<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div class="mb-2">Prénom et nom</div>
          <div class="fw-bold">{{ props.data.firstName }} {{ props.data.lastName }}</div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div>Email</div>
          <div class="fw-bold my-2">
            <a :href="'mailto:' + props.data.email">{{ props.data.email }}</a>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div>Téléphone</div>
          <div class="fw-bold my-2">
            <a :href="'tel:' + props.data.company?.phone">{{ props.data.company?.phone }}</a>
          </div>
        </div>
      </div>
      <div class="row my-2" v-if="props.data?.company">
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div class="mb-2">Entreprise</div>
          <div class="fw-bold my-2">{{ props.data?.company?.name }}</div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div>SIRET</div>
          <div class="fw-bold my-2">{{ props.data?.company?.siret }}</div>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-4">
          <div>
            Contrat
            <a
              v-if="props.data.contract?.url"
              target="_blank"
              class="text-gray"
              :href="props.data.contract?.url"
            >
              - Voir <i class="bx bx-link-external text-gray mx-1"></i>
            </a>
          </div>
          <div class="fw-bold my-2 text-uppercase">
            {{ props.data.contract?.signedAt?.substring(0, 10) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="my-0" />
  <div class="row wrapper overflow-auto">
    <div class="row mt-3">
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="currency" class="form-label">Offre</label>
        <p v-if="props.data.offer">{{ props.data.offer }}</p>
        <p v-else>Pas d'offres</p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="skills" class="form-label">Projets</label>
        <p v-if="props.projects !== 'loading' && props.projects && props.projects > 0">
          {{ props.projects }}
        </p>
        <p v-else>Pas de projets</p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="currency" class="form-label">Représentant</label>
        <p>{{ props.data?.company?.representative }}</p>
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="address" class="form-label">Adresse</label>
        <p>
          {{ props.data?.company?.address?.street }}
        </p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="zipCode" class="form-label">Ville</label>
        <p>{{ props.data?.company?.address?.city }}</p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="formFile" class="form-label">Code postal</label>
        <p>{{ props.data?.company?.address?.zipCode }}</p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="availableAt" class="form-label">Date de signature</label>
        <p>{{ props.data.contract?.signedAt?.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="availableAt" class="form-label">Date de création</label>
        <p>{{ props.data.createdAt?.substring(0, 10) }}</p>
      </div>
      <div class="mb-3 col-xs-12 col-sm-6 col-lg-4">
        <label for="formFile" class="form-label">Téléphone 2</label>
        <p>
          <a target="_blank" id="linked-in" :href="props.data.secondPhone"
            >{{ props.data.secondPhone }}
          </a>
        </p>
      </div>
      <div class="mb-3 col-md-12">
        <label for="note" class="form-label">Note</label>
        <p>{{ props.data.note }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['data', 'projects'])
</script>

<style scoped>
.wrapper {
  height: 300px;
}
</style>
