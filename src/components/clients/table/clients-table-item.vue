<template>
  <tr>
    <td>
      <router-link :to="'clients/' + props.item._id">
        <img
          class="avatar rounded"
          v-if="props.item!.company?.logo"
          :src="props.item!.company?.logo"
        />
        <img class="avatar rounded mx-1" v-else src="/assets/img/avatars/company-placeholder.png" />
        <strong class="text-gray mx-1">{{ props.item!.company.name }}</strong>
        <i class="bx bx-link-external text-gray mx-1"></i>
      </router-link>
    </td>
    <td>{{ props.item!.firstName }} {{ props.item!.lastName }}</td>
    <td>{{ props.item!.email }}</td>
    <td>{{ props.item!.contract?.signedAt?.substring(0, 10) }}</td>
    <td>
      <div class="dropdown position-static">
        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
          <i class="bx bx-dots-vertical-rounded"></i>
        </button>
        <div class="dropdown-menu">
          <router-link :to="'/clients/' + props.item._id">
            <a class="dropdown-item with-pointer text-gray"
              ><i class="bx bx-edit-alt me-1"></i> Modifier</a
            >
          </router-link>
          <a class="dropdown-item with-pointer text-gray" @click="emit('delete', props.item._id)"
            ><i class="bx bx-trash me-1"></i> Supprimer</a
          >
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({ item: Object })
const emit = defineEmits(['delete'])
</script>

<style scoped>
.client-code {
  text-transform: uppercase;
}
</style>
