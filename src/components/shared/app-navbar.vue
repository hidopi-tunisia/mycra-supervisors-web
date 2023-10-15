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
            placeholder="Rechercher..."
            aria-label="Rechercher..."
          />
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
                src="../../../assets/img/avatars/company.jpg"
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
                          src="../../../assets/img/avatars/company.jpg"
                          alt=""
                          class="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <span class="fw-semibold d-block">John Doe</span>
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
                  <i class="bx bx-user me-2"></i>
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
import { getAuthorization } from '@/domain/auth'
import { signOut } from '@/domain/auth'
import Swal from 'sweetalert2'

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
</script>

<style scoped></style>
