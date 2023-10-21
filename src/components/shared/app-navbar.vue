<template>
  <!-- Navbar -->

  <nav
    class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
    id="layout-navbar"
  >
    <div
      class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
      @click="handleClickToggle"
    >
      <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
        <i class="bx bx-menu bx-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <!-- Search -->
      <div class="navbar-nav align-items-center">
        <div class="nav-item d-flex align-items-center">
          <i class="bx bx-search fs-4 lh-0"></i>
          <input
            type="text"
            class="form-control border-0 shadow-none"
            placeholder="Accès rapide..."
            aria-label="Accès rapide..."
            :value="search"
            @input="({ target }) => handleSearch(target.value)"
          />

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-search"
            :class="shown ? 'd-block' : ''"
          >
            <li v-for="l in filtered" :key="l.link">
              <router-link :to="l.link">
                <a class="dropdown-item" href="javascript:void(0)" @click="handleSearchItemClick">
                  <i class="me-2" :class="l.icon"></i>
                  <span class="align-middle text-capitalize">{{ l.text }}</span>
                </a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- /Search -->

      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a
            class="nav-link dropdown-toggle hide-arrow"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
          >
            <div class="avatar avatar-online">
              <img
                :src="result?.company?.logo"
                alt=""
                class="w-px-40 h-auto rounded-circle"
              />
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link to="/me">
                <a class="dropdown-item" href="javascript:void(0)">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar avatar-online">
                        <img
                          :src="result?.company?.logo"
                          alt=""
                          class="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <span class="fw-semibold d-block" v-if="result">
                        {{ result.firstName }} {{ result.lastName }}
                      </span>
                      <small class="text-muted">Superviseur</small>
                    </div>
                  </div>
                </a>
              </router-link>
            </li>
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li>
              <router-link to="/me">
                <a class="dropdown-item" href="javascript:void(0)">
                  <i class="bx bx-user-circle me-2"></i>
                  <span class="align-middle">Mon profil</span>
                </a>
              </router-link>
            </li>
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li @click="handleClickLogout">
              <a class="dropdown-item" href="javascript:void(0)">
                <i class="bx bx-power-off me-2"></i>
                <span class="align-middle">Se déconnecter</span>
              </a>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
    </div>
  </nav>
  <!-- / Navbar -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAuthorization } from '@/domain/auth'
import { signOut } from '@/domain/auth'
import Swal from 'sweetalert2'
import { getProfile } from '@/domain/me'

const result = ref(null)
const loading = ref(false)

const fn = async () => {
  try {
    loading.value = true
    const { data } = await getProfile({ populate: '' })
    result.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
const handleClickCopyToken = () => {
  const fn = async () => {
    const authorization = await getAuthorization()
    navigator.clipboard.writeText(authorization)
  }
  fn()
}
const handleClickLogout = () => {
  Swal.fire({
    title: 'Se déconnecter ?',
    text: 'Êtes-vous sûr de se déconnecter',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non'
  }).then((result) => {
    if (result.isConfirmed) {
      signOut()
    }
  })
}
const handleClickToggle = () => {
  window.Helpers.toggleCollapsed()
}

const links = [
  {
    text: 'mes projets',
    link: '/projects',
    icon: 'bx bx-code-block bx-sm'
  },
  {
    text: 'mes clients',
    link: '/clients',
    icon: 'bx bx-user bx-sm'
  },
  {
    text: 'créer un client',
    link: '/clients/new',
    icon: 'bx bx-user bx-sm'
  },
  {
    text: 'mes consultants',
    link: '/consultants',
    icon: 'bx bxs-user-badge bx-sm'
  },
  {
    text: 'créer un consultant',
    link: '/consultants/new',
    icon: 'bx bxs-user-badge bx-sm'
  },
  {
    text: 'notifications',
    link: '/notifications/new',
    icon: 'bx bx-bell bx-sm'
  },
  {
    text: 'mon profil',
    link: '/me',
    icon: 'bx bx-user-circle bx-sm'
  }
]
const search = ref('')
const shown = ref(false)
const filtered = ref(links)
const handleSearch = (v) => {
  search.value = v
  const arr = links.filter(({ text }) => text.toLowerCase().includes(v.toLowerCase()))
  if (v.length >= 1 && arr.length > 0) {
    filtered.value = arr
    shown.value = true
  } else {
    shown.value = false
  }
}
const handleSearchItemClick = () => {
  search.value = ''
  shown.value = false
}
</script>

<style scoped>
.dropdown-search {
  top: 56px;
}
</style>
