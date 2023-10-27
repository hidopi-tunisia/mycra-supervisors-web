<template>
  <tr>
    <td>
      <strong>{{ props.item!.name }}</strong>
    </td>
    <td>
      <router-link :to="'clients/' + props.item!.client?._id">
        <strong class="text-gray"
          >{{ props.item!.client?.firstName }} {{ props.item!.client?.lastName }}</strong
        >
        <i class="bx bx-link-external text-gray mx-1"></i>
      </router-link>
    </td>
    <td>
      <ul
        class="list-unstyled users-list m-0 avatar-group d-flex align-items-center"
        v-if="props.item!.consultants && Array.isArray(props.item!.consultants) && props.item!.consultants.length > 0"
      >
        <li
          v-for="c in props.item!.consultants"
          data-bs-toggle="tooltip"
          data-popup="tooltip-custom"
          data-bs-placement="top"
          class="avatar avatar-xs pull-up"
          :title="c.firstName + ' ' + c.lastName"
          :key="c"
        >
          <img alt="Avatar" class="rounded-circle" v-if="c.profilePhoto" :src="c.profilePhoto" />
          <img alt="Avatar" class="rounded-circle" v-else :src="getAvatar(c._id)" />
        </li>
      </ul>
      <small v-else>Pas de consultants</small>
    </td>
    <td class="project-code">{{ props.item!.code }}</td>
    <td>{{ props.item!.category }}</td>
    <td>
      <span class="badge bg-label-success me-1" v-show="props.item!.status === 'active'">{{
        props.item!.status
      }}</span>
      <span class="badge bg-label-danger me-1" v-show="props.item!.status === 'inactive'">{{
        props.item!.status
      }}</span>
    </td>
    <td>
      <div class="dropdown position-static">
        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
          <i class="bx bx-dots-vertical-rounded"></i>
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item with-pointer"
            @click="
              emit('assign-consultant', { id: props.item._id, clientId: props.item.client._id })
            "
            ><i class="bx bxs-user-badge me-1"></i> Assigner consultant</a
          >
          <a
            class="dropdown-item with-pointer"
            v-show="props.item.status === 'inactive'"
            @click="emit('toggle-status', { id: props.item._id, clientId: props.item.client._id })"
          >
            <i class="bx bx-check me-1"></i>Rendre actif
          </a>
          <a
            class="dropdown-item with-pointer"
            v-show="props.item.status === 'active'"
            @click="emit('toggle-status', { id: props.item._id, clientId: props.item.client._id })"
          >
            <i class="bx bx-x me-1"></i>Rendre inactif
          </a>
          <a class="dropdown-item with-pointer" @click="emit('update', props.item._id)"
            ><i class="bx bx-edit-alt me-1"></i> Modifier</a
          >
          <a class="dropdown-item with-pointer" @click="emit('delete', props.item._id)"
            ><i class="bx bx-trash me-1"></i> Supprimer</a
          >
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { generateFromString } from 'generate-avatar'
const props = defineProps({ item: Object })
const emit = defineEmits(['update', 'delete', 'toggle-status', 'assign-consultant'])
const getAvatar = (text) => {
  return `data:image/svg+xml;utf8,${generateFromString(text)}`
}
</script>

<style scoped>
.project-code {
  text-transform: uppercase;
}
</style>
