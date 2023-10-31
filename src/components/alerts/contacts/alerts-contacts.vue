<template>
  <div
    class="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
    id="app-chat-contacts"
  >
    <div class="sidebar-header pt-3 px-3 mx-1">
      <div class="d-flex align-items-center me-3 me-lg-0">
        <div
          class="flex-shrink-0 avatar me-2"
          data-bs-toggle="sidebar"
          data-overlay="app-overlay-ex"
          data-target="#app-chat-sidebar-left"
        >
          <img
            class="user-avatar rounded-circle cursor-pointer"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Avatar"
          />
        </div>
        <div class="flex-grow-1 input-group input-group-merge rounded-pill ms-1">
          <span class="input-group-text" id="basic-addon-search31"
            ><i class="bx bx-search fs-4"></i
          ></span>
          <input
            type="text"
            class="form-control chat-search-input"
            placeholder="Search..."
            aria-label="Search..."
            aria-describedby="basic-addon-search31"
            @input="handleInputSearch"
          />
        </div>
      </div>
      <i
        class="bx bx-x cursor-pointer position-absolute top-0 end-0 mt-2 me-1 fs-4 d-lg-none d-block"
        data-overlay=""
        data-bs-toggle="sidebar"
        data-target="#app-chat-contacts"
      >
      </i>
    </div>
    <hr class="container-m-nx mt-3 mb-0" />
    <div class="sidebar-body ps ps--active-y">
      <!-- Contacts -->
      <ul class="list-unstyled chat-contact-list mb-0 overflow-auto" id="contact-list">
        <li class="chat-contact-list-item chat-contact-list-item-title">
          <h5 class="text-primary mb-0">Contacts</h5>
        </li>
        <li
          class="chat-contact-list-item"
          v-if="items.length > 0"
          v-for="item in items"
          :key="item._id"
          :class="{
            'bg-primary': item._id === props.contact?._id,
            'bg-hover': item._id === isHovering && item._id !== props.contact?._id
          }"
          @mouseover="() => (isHovering = item._id)"
          @mouseleave="() => (isHovering = null)"
          @click="handleClickItem(item)"
        >
          <a class="d-flex align-items-center">
            <div class="flex-shrink-0 avatar">
              <img
                :src="item.profilePhoto ? item.profilePhoto : getAvatar(item._id)"
                alt="user-avatar"
                class="rounded-circle"
                id="profilePhoto"
              />
            </div>
            <div class="chat-contact-info flex-grow-1 ms-3">
              <h6
                class="chat-contact-name text-truncate m-0"
                :class="{ 'text-white': item._id === props.contact._id }"
              >
                {{ item.firstName }} {{ item.lastName }}
              </h6>
              <p class="chat-contact-status text-truncate mb-0 text-muted">{{ item.position }}</p>
            </div>
          </a>
        </li>
        <li class="chat-contact-list-item contact-list-item-0" v-else>
          <h6 class="text-muted mb-0">Pas de contacts</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import { generateFromString } from 'generate-avatar'
const isHovering = ref(null)
const props = defineProps(['items', 'contact'])
const emit = defineEmits(['search', 'select'])
const handleInputSearch = ({ target }) => {
  const { value } = target
  emit('search', value)
}
const handleClickItem = (i) => {
  emit('select', i)
}
const getAvatar = (id) => {
  return `data:image/svg+xml;utf8,${generateFromString(id)}`
}
</script>

<style scoped>
.sidebar-body {
  overflow: auto !important;
}
.bg-hover {
  background-color: #eeeeee !important;
}
</style>
