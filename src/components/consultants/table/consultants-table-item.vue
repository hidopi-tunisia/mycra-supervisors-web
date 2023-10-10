<template>
  <tr>
    <td>
      <i class="fab fa-angular fa-lg text-danger me-3"></i>
      <router-link :to="'consultants/' + props.item._id">
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
const props = defineProps({ item: Object })
const emit = defineEmits(['update', 'delete'])
const handleClickAvatar = (a) => {
  console.log(a)
}
</script>

<style scoped>
.consultant-code {
  text-transform: uppercase;
}
</style>
