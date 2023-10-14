<template>
  <div class="menu bg-menu-theme">
    <ul class="menu-inner p-1 w-100">
      <li class="menu-item w-100" :class="props.selected ? 'active' : ''" @click="emit('select')">
        <a class="menu-link p-2 parent rounded">
          <div class="d-flex justify-content-between w-100 flex-row mx-2">
            <div class="d-flex flex-column">
              <strong class="text-gray"
                >{{ props.item!.name }} - {{ props.item.category }}</strong
              >
              <small class="text-uppercase fw-bold"
                >{{ props.item.projectCode.substring(0, 8) }}</small
              >
            </div>
            <div class="d-flex justify-content-center align-items-center mx-2">
              <span
                class="badge rounded-pill bg-info"
                v-if="Array.isArray(props.item.consultants) && props.item.consultants.length > 0"
                >{{ props.item.consultants.length }} consultants</span
              >
              <span class="badge rounded-pill bg-warning" v-else>Pas de consultants</span>
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
