<template>
  <tr>
    <td>
      <router-link :to="'consultants/' + props.item._id">
        <img class="avatar rounded" v-if="props.item.profilePhoto" :src="props.item.profilePhoto" />
        <img class="avatar rounded" v-else :src="getAvatar()" />
        <strong class="text-gray mx-2"
          >{{ props.item!.firstName }} {{ props.item!.lastName }}</strong
        >
        <i class="bx bx-link-external text-gray mx-1"></i>
      </router-link>
    </td>
    <td>{{ props.item!.hiredAt.substring(0, 10) }}</td>
    <td>{{ props.item!.projects?.[0]?.name }}</td>
    <td>
      <span
        class="badge bg-label-success me-1"
        v-show="props.item!.status === 'active'"
        @click="emit('view-cra', props.item._id)"
      >
        Oui
      </span>
      <button class="btn btn-outline-primary btn-sm" v-show="props.item!.status === 'active'" @click="emit('view-cra', props.item._id)">
        Voir
      </button>
      <span class="badge bg-label-danger me-1" v-show="props.item!.status === 'inactive'">
        Non
      </span>
    </td>
    <td>
      <div class="dropdown">
        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
          <i class="bx bx-dots-vertical-rounded"></i>
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item with-pointer text-gray"
            @click="emit('assign-project', props.item._id)"
            ><i class="bx bx-code-block me-1"></i> Affecter à un projet</a
          >
          <a class="dropdown-item with-pointer text-gray" @click="emit('notify', props.item._id)"
            ><i class="bx bx-bell me-1"></i> Notifier</a
          >
          <router-link :to="'/consultants/' + props.item._id">
            <a class="dropdown-item with-pointer text-gray" @click="emit('update', props.item._id)"
              ><i class="bx bx-edit-alt me-1"></i> Modifier</a
            ></router-link
          >
          <a class="dropdown-item with-pointer text-gray" @click="emit('delete', props.item._id)"
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
const emit = defineEmits(['view-cra', 'notify', 'update', 'delete', 'assign-project'])
const getAvatar = () => {
  return `data:image/svg+xml;utf8,${generateFromString(props.item._id)}`
}
</script>

<style scoped>
.consultant-code {
  text-transform: uppercase;
}
</style>
