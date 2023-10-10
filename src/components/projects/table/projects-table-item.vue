<template>
  <tr>
    <td>
      <i class="fab fa-angular fa-lg text-danger me-3"></i>
      <strong>{{ props.item!.name }}</strong>
    </td>
    <td>{{ props.item!.client }}</td>
    <td>
      <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
        <li
          v-for="c in props.item!.consultants"
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
    </td>
    <td class="project-code">{{ props.item!.projectCode.substring(0, 6) }}</td>
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
</script>

<style scoped>
.project-code {
  text-transform: uppercase;
}
</style>
