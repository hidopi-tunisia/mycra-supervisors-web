<template>
  <div class="row">
    <div class="mt-4 d-md-none"></div>
    <div class="col-12">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div class="mb-2">Nom</div>
          <div class="fw-bold">
            {{ props.data.name }}
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div>Catégorie</div>
          <div class="fw-bold my-2">
            {{ props.data.category }}
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div>Statut</div>
          <span class="badge bg-label-success me-1" v-show="props.data!.status === 'active'">
            Active
          </span>
          <span class="badge bg-label-danger me-1" v-show="props.data!.status === 'inactive'">
            Inactive
          </span>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div class="mb-2">Code</div>
          <div class="fw-bold my-2 text-uppercase">
            {{ props.data.projectCode.substring(0, 8) }}
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div class="mb-2">Client</div>
          <div class="fw-bold my-2 text-uppercase">
            {{ props.data.client }}
          </div>
        </div>
        <div class="mb-3 col-md-6 col-lg-4">
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
      </div>
      <div class="row my-2">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div>Date de début</div>
          <div class="fw-bold my-2">
            {{ props.data.startDate.substring(0, 10) }}
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div>Date de fin</div>
          <div class="fw-bold my-2">
            {{ props.data.endDate.substring(0, 10) }}
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <div>Date de création</div>
          <div class="fw-bold my-2">
            {{ props.data.createdAt.substring(0, 10) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="my-0" />
  <div class="row wrapper overflow-auto">
    <div class="my-3 col-md-12">
      <label for="description" class="form-label">Description</label>
      <p>{{ props.data.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['data'])
</script>

<style scoped>
.wrapper {
  height: 200px;
}
</style>
