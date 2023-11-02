<template>
  <div class="menu bg-menu-theme">
    <ul class="menu-inner p-1 w-100">
      <li class="menu-item w-100" :class="props.selected ? 'active' : ''" @click="emit('select')">
        <a class="menu-link p-2 parent rounded">
          <img
            class="avatar rounded"
            v-if="props.item.company?.logo"
            :src="props.item.company?.logo"
          />
          <img class="avatar rounded" src="/assets/img/avatars/company-placeholder.png" v-else />
          <div class="d-flex justify-content-between w-100 flex-row mx-2">
            <div class="d-flex flex-column">
              <strong class="text-gray">{{ props.item.company?.name }}</strong>
              <small class="fw-bold">{{ props.item!.firstName }} {{ props.item!.lastName }} </small>
            </div>
            <div class="d-flex justify-content-center align-items-center mx-2">
              <span class="badge rounded-pill bg-info" v-if="props.item.offer">{{
                props.item.offer
              }}</span>
              <span class="badge rounded-pill bg-warning" v-else>Pas d'offres</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ item: Object, selected: Boolean })
const emit = defineEmits(['select'])
</script>

<style scoped>
.client-code {
  text-transform: uppercase;
}
</style>
