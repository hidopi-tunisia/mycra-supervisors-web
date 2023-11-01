<template>
  <div class="col app-chat-history">
    <div class="chat-history-wrapper">
      <div class="chat-history-header border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex overflow-hidden align-items-center">
            <i
              class="bx bx-menu bx-sm cursor-pointer d-lg-none d-block me-2"
              data-bs-toggle="sidebar"
              data-overlay=""
              data-target="#app-chat-contacts"
            ></i>
            <div class="flex-shrink-0 avatar">
              <img
                :src="props.contact?.profilePhoto ? props.contact?.profilePhoto : getAvatar()"
                alt="Avatar"
                class="rounded-circle"
                data-bs-toggle="sidebar"
                data-overlay=""
                data-target="#app-chat-sidebar-right"
              />
            </div>
            <div class="chat-contact-info flex-grow-1 ms-3">
              <h6 class="m-0">{{ props.contact.firstName }} {{ props.contact.lastName }}</h6>
              <small class="user-status text-muted">{{ props.contact.position }}</small>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-outline-secondary"
                :class="props.isRead === null ? 'active' : ''"
                @click="handleClickFilterIsRead(null)"
              >
                Tout
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                :class="props.isRead === 'false' ? 'active' : ''"
                @click="handleClickFilterIsRead('false')"
              >
                Non lûs
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                :class="props.isRead === 'true' ? 'active' : ''"
                @click="handleClickFilterIsRead('true')"
              >
                Lûs
              </button>
            </div>
            <i
              class="bx bx-refresh cursor-pointer d-sm-block d-none mx-3 fs-4"
              @click="handleClickRefresh"
            ></i>
            <div class="dropdown">
              <button
                class="btn p-0"
                type="button"
                id="chat-header-actions"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="bx bx-dots-vertical-rounded fs-4"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                <a class="dropdown-item" href="javascript:void(0);">Voir details</a>
                <a class="dropdown-item" href="javascript:void(0);">Affecter à un projet</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-history-body ps body-overflow" ref="div">
        <ul class="list-unstyled chat-history mb-0" v-if="messages?.length > 0">
          <li
            class="chat-message"
            :key="m._id"
            v-for="m in messages"
            :class="isHover === m._id ? 'bg-hover' : ''"
            @mouseover="isHover = m._id"
            @mouseleave="isHover = null"
          >
            <div class="d-flex">
              <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                  <img
                    :src="props.contact?.profilePhoto ? props.contact?.profilePhoto : getAvatar()"
                    alt="Avatar"
                    class="rounded-circle"
                    data-bs-toggle="sidebar"
                    data-overlay=""
                    data-target="#app-chat-sidebar-right"
                  />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="d-flex align-items-center">
                  <div class="chat-message-text" :class="m.isRead ? '' : 'bg-primary text-white'">
                    <p class="mb-0">{{ m.content }}</p>
                  </div>
                  <div class="mx-2">
                    <img
                      src="/assets/img/alerts/1.jpg"
                      class="alerts-satisfaction"
                      v-if="m.satisfaction === 1"
                    />
                    <img
                      src="/assets/img/alerts/2.jpg"
                      class="alerts-satisfaction"
                      v-if="m.satisfaction === 2"
                    />
                    <img
                      src="/assets/img/alerts/3.jpg"
                      class="alerts-satisfaction"
                      v-if="m.satisfaction === 3"
                    />
                  </div>
                </div>
                <div class="text-muted mt-1">
                  <small>{{ m.createdAt.substring(0, 19).replaceAll('T', ' - ') }}</small>
                </div>
              </div>
              <div class="actions border-bottom" v-if="isHover === m._id">
                <div
                  class="icon-action ms-1 me-1"
                  data-bs-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-bs-placement="top"
                  title="Supprimer"
                >
                  <i class="bx bx-trash cursor-pointer" @click="handleClickRemove(m._id)"></i>
                </div>
                <div
                  class="icon-action ms-1 me-1"
                  data-bs-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-bs-placement="top"
                  title="Marquer comme lû"
                  v-if="!m.isRead"
                >
                  <i class="bx bx-show cursor-pointer" @click="handleClickToggleIsRead(m._id)"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="d-flex h-100 justify-content-center align-items-center" v-else>
          <div class="d-flex h-100 flex-column justify-content-center align-items-center">
            <img src="/assets/img/illustrations/no-alerts.png" class="no-alerts-illustration" />
            <div class="my-2"></div>
            <p>Pas d'alerts</p>
          </div>
        </div>
      </div>
      <!-- Chat message form -->
      <div class="chat-history-footer">
        <form
          class="form-send-message d-flex justify-content-between align-items-center"
          @submit.prevent="handleClickSubmit"
        >
          <input
            class="form-control message-input border-0 me-3 shadow-none"
            placeholder="Écriver votre message..."
            :value="message"
            @input="({ target }) => (message = target.value)"
          />
          <div class="message-actions d-flex align-items-center">
            <button class="btn btn-primary d-flex send-msg-btn" type="submit" :disabled="!message">
              <i class="bx bx-paper-plane me-md-1 me-0"></i>
              <span class="align-middle d-md-inline-block d-none">Notifier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateFromString } from 'generate-avatar'
import { ref } from 'vue'
const $ = window.jQuery
const div = ref(null)
const message = ref('')
const isHover = ref(null)
const props = defineProps(['contact', 'messages', 'isRead'])
console.log(props.isRead)

const emit = defineEmits(['notify', 'refresh', 'remove', 'toggle-is-read', 'filter-is-read'])
const handleClickSubmit = () => {
  emit('notify', message.value)
}
const handleClickRefresh = () => {
  emit('refresh')
}
const handleClickRemove = (id) => {
  emit('remove', id)
  hideTooltips()
}
const handleClickToggleIsRead = (id) => {
  emit('toggle-is-read', id)
  hideTooltips()
}
const handleClickFilterIsRead = (f) => {
  emit('filter-is-read', f)
}
const getAvatar = () => {
  if (props.contact && props.contact._id) {
    return `data:image/svg+xml;utf8,${generateFromString(props.contact?._id)}`
  }
  return ''
}
const hideTooltips = () => {
  $.each($('.tooltip'), function (index, element) {
    $(this).remove()
  })
}
</script>

<style scoped>
.body-overflow {
  overflow: auto !important;
}
.no-alerts-illustration {
  width: 200px;
  height: 200px;
}
.alerts-satisfaction {
  border-radius: 10px;
  width: 20px;
  height: 20px;
}
.actions {
  height: 36px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 6px;
}
.icon-action {
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  border-radius: 4px;
}
.icon-action :hover {
  background-color: #eeeeee !important;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  border-radius: 4px;
}
.bg-hover {
  background-color: #eeeeee !important;
  margin-top: -6px;
  padding-top: 6px;
  margin-left: -6px;
  padding-left: 6px;
  margin-right: -6px;
  padding-right: 6px;
  border-radius: 6px;
}
</style>
