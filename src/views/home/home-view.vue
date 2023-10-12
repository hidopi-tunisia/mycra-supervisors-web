<template>
  <div class="row">
    <div class="col-lg-8 mb-4 order-0">
      <div class="card">
        <div class="d-flex align-items-end row">
          <div class="col-sm-7">
            <div class="card-body">
              <h5 class="card-title text-primary">Bonjour John ! 🎉</h5>
              <p class="mb-4">
                Vous pouvez modifier votre profil en cliquant sur le bouton
                <span class="fw-bold">Consulter mon profil</span>.
              </p>

              <a href="javascript:;" class="btn btn-sm btn-outline-primary">Consulter mon profil</a>
            </div>
          </div>
          <div class="col-sm-5 text-center text-sm-left">
            <div class="card-body pb-0 px-0 px-md-4">
              <img
                src="../../../assets/img/illustrations/man-with-laptop-light.png"
                height="140"
                alt="View Badge User"
                data-app-dark-img="illustrations/man-with-laptop-dark.png"
                data-app-light-img="illustrations/man-with-laptop-light.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 order-1">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <div class="rounded-avatar bg-consultants">
                    <i class="bx bxs-user-badge bx-sm align-middle icon-consultants"></i>
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn p-0"
                    type="button"
                    id="cardOpt3"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                    <router-link to="/consultants">
                      <a class="dropdown-item" href="#">Voir les consultants</a>
                    </router-link>
                    <a class="dropdown-item" href="javascript:void(0);">Déplacer</a>
                  </div>
                </div>
              </div>
              <span class="fw-semibold d-block mb-1">Consultants</span>
              <h3 class="card-title mb-2">25</h3>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <div class="rounded-avatar bg-clients">
                    <i class="bx bx-user bx-sm align-middle icon-clients"></i>
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn p-0"
                    type="button"
                    id="cardOpt6"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                    <router-link to="/clients">
                      <a class="dropdown-item" href="#">Voir les clients</a>
                    </router-link>
                    <a class="dropdown-item" href="#">Déplacer</a>
                  </div>
                </div>
              </div>
              <span>Clients</span>
              <h3 class="card-title text-nowrap mb-1">10</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Absences -->
    <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
      <div class="card">
        <div class="row row-bordered g-0">
          <div class="col-md-12">
            <h5 class="card-header m-0 me-2 pb-3">Taux d'absence chaques années</h5>
            <div id="chart-consultants-absence" class="px-2"></div>
          </div>
        </div>
      </div>
    </div>
    <!--/ Total Revenue -->
    <div class="col-12 col-md-8 col-lg-4 order-3 order-md-2">
      <div class="row">
        <div class="col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <div class="rounded-avatar bg-projects">
                    <i class="bx bx-code-block bx-sm align-middle icon-projects"></i>
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn p-0"
                    type="button"
                    id="cardOpt4"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                    <router-link to="/projects">
                      <a class="dropdown-item" href="#">Voir les projets</a>
                    </router-link>
                    <a class="dropdown-item" href="javascript:void(0);">Déplacer</a>
                  </div>
                </div>
              </div>
              <span class="d-block mb-1">Projets</span>
              <h3 class="card-title text-nowrap mb-2">80</h3>
            </div>
          </div>
        </div>
        <div class="col-6 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="card-title d-flex align-items-start justify-content-between">
                <div class="avatar flex-shrink-0">
                  <div class="rounded-avatar bg-alerts">
                    <i class="bx bx-bell bx-sm align-middle icon-alert"></i>
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn p-0"
                    type="button"
                    id="cardOpt1"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="cardOpt1">
                    <router-link to="/alerts">
                      <a class="dropdown-item" href="#">Voir les alerts</a> </router-link
                    ><a class="dropdown-item" href="javascript:void(0);">Déplacer</a>
                  </div>
                </div>
              </div>
              <span class="fw-semibold d-block mb-1">Alerts</span>
              <h3 class="card-title mb-2">4</h3>
            </div>
          </div>
        </div>
        <!-- </div>
    <div class="row"> -->
        <div class="col-12 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between flex-sm-row flex-column gap-3">
                <div
                  class="d-flex flex-sm-column flex-row align-items-start justify-content-between"
                >
                  <div class="card-title">
                    <h5 class="text-nowrap mb-2">CRAs saisi</h5>
                    <span class="badge bg-label-warning rounded-pill">Octobre 2023</span>
                  </div>
                  <div class="mt-sm-auto">
                    <small class="text-success text-nowrap fw-semibold">CRAs</small>
                    <h3 class="mb-0">39/50</h3>
                  </div>
                </div>
                <div id="growthChart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { drawAnalytics } from '../../../assets/js/dashboards-analytics'
import { getProfile } from '@/domain/me'
import { ref } from 'vue'
const profile = ref(null)
const fn = async () => {
  try {
    const { data } = await getProfile({ populate: '' })
    profile.value = data
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
  }
}
// fn()
setTimeout(() => {
  drawAnalytics()
}, 500)
</script>

<style lang="css" scoped>
.rounded-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.bg-consultants {
  background-color: #f4433633;
}
.bg-clients {
  background-color: #4caf5033;
}
.bg-projects {
  background-color: #03a9f433;
}
.bg-alerts {
  background-color: #ffc10733;
}
.icon-consultants {
  color: #f44336;
}
.icon-clients {
  color: #4caf50;
}
.icon-projects {
  color: #03a9f4;
}
.icon-alert {
  color: #ffc107;
}
</style>
