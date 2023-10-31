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
      <div class="chat-history-body ps ps--active-y">
        <ul class="list-unstyled chat-history mb-0">
          <li class="chat-message">
            <div class="d-flex overflow-hidden">
              <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text">
                  <p class="mb-0">Hey John, I am looking for the best admin template.</p>
                  <p class="mb-0">Could you please help me to find it out? 🤔</p>
                </div>
                <div class="chat-message-text mt-2">
                  <p class="mb-0">It should be Bootstrap 5 compatible.</p>
                </div>
                <div class="text-muted mt-1">
                  <small>10:02 AM</small>
                </div>
              </div>
            </div>
          </li>
          <li class="chat-message">
            <div class="d-flex overflow-hidden">
              <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text">
                  <p class="mb-0">Looks clean and fresh UI. 😃</p>
                </div>
                <div class="chat-message-text mt-2">
                  <p class="mb-0">It's perfect for my next project.</p>
                </div>
                <div class="chat-message-text mt-2">
                  <p class="mb-0">How can I purchase it?</p>
                </div>
                <div class="text-muted mt-1">
                  <small>10:05 AM</small>
                </div>
              </div>
            </div>
          </li>
          <li class="chat-message chat-message-right">
            <div class="d-flex overflow-hidden">
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text">
                  <p class="mb-0">Thanks, you can purchase it.</p>
                </div>
                <div class="text-end text-muted mt-1">
                  <i class="bx bx-check-double text-success"></i>
                  <small>10:06 AM</small>
                </div>
              </div>
              <div class="user-avatar flex-shrink-0 ms-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/men/8.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="chat-message">
            <div class="d-flex overflow-hidden">
              <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text">
                  <p class="mb-0">I will purchase it for sure. 👍</p>
                </div>
                <div class="chat-message-text mt-2">
                  <p class="mb-0">Thanks.</p>
                </div>
                <div class="text-muted mt-1">
                  <small>10:08 AM</small>
                </div>
              </div>
            </div>
          </li>
          <li class="chat-message chat-message-right">
            <div class="d-flex overflow-hidden">
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text">
                  <p class="mb-0">Great, Feel free to get in touch.</p>
                </div>
                <div class="text-end text-muted mt-1">
                  <i class="bx bx-check-double text-success"></i>
                  <small>10:10 AM</small>
                </div>
              </div>
              <div class="user-avatar flex-shrink-0 ms-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/men/8.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="chat-message">
            <div class="d-flex overflow-hidden">
              <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text">
                  <p class="mb-0">Do you have design files for Sneat?</p>
                </div>
                <div class="text-muted mt-1">
                  <small>10:15 AM</small>
                </div>
              </div>
            </div>
          </li>
          <li class="chat-message chat-message-right">
            <div class="d-flex overflow-hidden">
              <div class="chat-message-wrapper flex-grow-1 w-50">
                <div class="chat-message-text">
                  <p class="mb-0">
                    Yes that's correct documentation file, Design files are included with the
                    template.
                  </p>
                </div>
                <div class="text-end text-muted mt-1">
                  <i class="bx bx-check-double"></i>
                  <small>10:15 AM</small>
                </div>
              </div>
              <div class="user-avatar flex-shrink-0 ms-3">
                <div class="avatar avatar-sm">
                  <img
                    src="https://randomuser.me/api/portraits/men/8.jpg"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="ps__rail-x" style="left: 0px; bottom: -456px;">
          <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
        </div>
        <div class="ps__rail-y" style="top: 456px; height: 620px; right: 0px;">
          <div class="ps__thumb-y" tabindex="0" style="top: 263px; height: 357px;"></div>
        </div>
      </div>
      <!-- Chat message form -->
      <div class="chat-history-footer">
        <form class="form-send-message d-flex justify-content-between align-items-center">
          <input
            class="form-control message-input border-0 me-3 shadow-none"
            placeholder="Type your message here..."
          />
          <div class="message-actions d-flex align-items-center">
            <button class="btn btn-primary d-flex send-msg-btn">
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
const props = defineProps(['contact'])
const getAvatar = () => {
  return `data:image/svg+xml;utf8,${generateFromString(props.contact?._id)}`
}
</script>

<style scoped></style>
