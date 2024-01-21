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
    <td v-if="props.item!.projects?.[0]">{{ props.item!.projects?.[0]?.name }}</td>
    <td v-else><small>Pas de projets</small></td>
    <td v-if="loading">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </td>
    <td v-else>
      <span class="badge bg-label-success me-1" v-show="cra"> Oui </span>
      <button class="btn btn-outline-primary btn-sm" v-if="cra" @click="emit('view-cra', cra)">
        Voir
      </button>
      <span class="badge bg-label-danger me-1" v-else> Non </span>
    </td>
    <td>
      <div class="dropdown position-static">
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
import { getCRAs } from '@/domain/me'
import { generateFromString } from 'generate-avatar'
import { onMounted, ref } from 'vue'
const props = defineProps({ item: Object })
const emit = defineEmits(['view-cra', 'notify', 'update', 'delete', 'assign-project'])
const getAvatar = () => {
  return `data:image/svg+xml;utf8,${generateFromString(props.item._id)}`
}
const cra = ref(null)
const loading = ref(false)
onMounted(() => {
  const fn = async () => {
    try {
      loading.value = true
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      const { data } = await getCRAs({ consultant: props.item._id, year })
      if (
        Array.isArray(data) &&
        data.length > 0 &&
        data.filter(({ date }) => date.month === month).length > 0
      ) {
        cra.value = data.filter(({ date }) => date.month === month)[0]
      }
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log()
    }
  }
  fn()
})
</script>

<style scoped>
.consultant-code {
  text-transform: uppercase;
}
</style>
