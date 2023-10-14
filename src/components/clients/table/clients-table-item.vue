<template>
  <tr>
    <td>
      <i class="fab fa-angular fa-lg text-danger me-3"></i>
      <router-link :to="'clients/' + props.item._id">
        <strong class="text-gray">{{ props.item!.firstName }} {{ props.item!.lastName }}</strong>
        <i class="bx bx-link-external text-gray mx-1"></i>
      </router-link>
    </td>
    <td>{{ props.item!.signatureDate.substring(0, 10) }}</td>
    <td>{{ props.item!.project }}</td>
    <td>
      <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
        <li
          v-for="a in props.item!.consultants"
          data-bs-toggle="tooltip"
          data-popup="tooltip-custom"
          data-bs-placement="top"
          class="avatar avatar-xs pull-up"
          :key="a"
          :title="a.name"
          @click="handleClickAvatar(a)"
        >
          <img :src="a.profilePhoto" alt="Avatar" class="rounded-circle" />
        </li>
      </ul>
    </td>
    <td>
      <div class="dropdown">
        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
          <i class="bx bx-dots-vertical-rounded"></i>
        </button>
        <div class="dropdown-menu">
          <router-link :to="'/clients/' + props.item._id">
            <a class="dropdown-item with-pointer text-gray"><i class="bx bx-edit-alt me-1"></i> Modifier</a>
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
const handleClickAvatar = (a) => {
  console.log(a)
}
</script>

<style scoped>
.client-code {
  text-transform: uppercase;
}
</style>
