<template>
  <div class="menu bg-menu-theme">
    <ul class="menu-inner p-1">
      <li class="menu-item vw-100" :class="props.selected ? 'active' : ''" @click="emit('select')">
        <a class="menu-link p-2">
          <img class="avatar rounded" :src="props.item.profilePhoto" />
          <strong class="text-gray mx-2"
            >{{ props.item!.firstName }} {{ props.item!.lastName }}</strong
          >
          <span>{{ props.item.email }}</span>
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
.consultant-code {
  text-transform: uppercase;
}

.x :hover {
  background-color: #bdbdbd22;
  padding: 8px;
  border-radius: 16px;
  pointer-events: none;
}
</style>
