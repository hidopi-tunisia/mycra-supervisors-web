<template>
  <div class="row">
    <div class="col-lg-8 mb-4 order-0">
      <div class="card">
        <div class="d-flex align-items-end row">
          <div class="col-sm-7">
            <div class="card-body">
              <h5 class="card-title text-primary" v-if="profile">
                Bonjour {{ profile?.firstName }} ! 🎉
              </h5>
              <p class="mb-4">
                Vous pouvez consulter votre profil en cliquant sur le bouton
                <span class="fw-bold">Consulter mon profil</span>.
              </p>
              <router-link to="/me">
                <a href="#" class="btn btn-sm btn-outline-primary">Consulter mon profil</a>
              </router-link>
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
        <count-cards
          :position="0"
          :item="positions[0]"
          :loading="loadingCounts"
          :count="counts[positions[0]]"
          @move="(n) => handleMove(0, n)"
        />
        <count-cards
          :position="1"
          :item="positions[1]"
          :loading="loadingCounts"
          :count="counts[positions[1]]"
          @move="(n) => handleMove(1, n)"
        />
      </div>
    </div>
    <div class="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
      <div class="card">
        <div class="row row-bordered g-0">
          <div class="col-md-12">
            <div class="d-flex flex-row justify-content-between">
              <h5 class="card-header">
                Emplacement des consultants selons les projets
              </h5>
              <button class="btn btn-sm" @click="handleClickZoomOnAll">Zoom pour tout</button>
            </div>
            <div ref="container" class="px-2">
              <app-map ref="map$" :markers="markers" @click-marker="handleClickMarker" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ Total Revenue -->
    <div class="col-12 col-md-8 col-lg-4 order-3 order-md-2">
      <div class="row">
        <count-cards
          :position="2"
          :item="positions[2]"
          :loading="loadingCounts"
          :count="counts[positions[2]]"
          @move="(n) => handleMove(2, n)"
        />
        <count-cards
          :position="3"
          :item="positions[3]"
          :loading="loadingCounts"
          :count="counts[positions[3]]"
          @move="(n) => handleMove(3, n)"
        />
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
                <cras-chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProfile } from '@/domain/me'
import CountCards from '@/components/home/count-cards.vue'
import AppMap from '@/components/map/app-map.vue'
import CrasChart from '@/components/home/cras-chart/chart.vue'
import { onMounted, ref } from 'vue'
import { getClientsCount } from '@/domain/statistics/clients'
import { getConsultantsCount } from '@/domain/statistics/consultants'
import { getProjectsCount } from '@/domain/statistics/projects'
import { getAlertsCount } from '@/domain/statistics/alerts'
import { getProjects } from '@/domain/projects'
import { useRouter } from 'vue-router'

const router = useRouter()
const counts = ref({
  projects: null,
  clients: null,
  consultants: null,
  alerts: null
})
const loadingCounts = ref(false)
const retrieveCounts = () => {
  const fn = async () => {
    try {
      loadingCounts.value = true
      const [projects, clients, consultants, alerts] = await Promise.allSettled([
        getProjectsCount({ status: 'active' }),
        getClientsCount(),
        getConsultantsCount({ status: 'active' }),
        getAlertsCount({ isRead: false })
      ])
      loadingCounts.value = false
      counts.value['projects'] = projects.value.data?.count
      counts.value['clients'] = clients.value.data?.count
      counts.value['consultants'] = consultants.value.data?.count
      counts.value['alerts'] = alerts.value.data?.count
    } catch (error) {
      loadingCounts.value = false
      console.log(error)
    }
  }
  fn()
}
retrieveCounts()
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
fn()
const markers = ref([])
const retriveProjects = async () => {
  try {
    const { data } = await getProjects({ populate: 'consultants,client' })
    data.forEach(({ client, consultants }) => {
      if (client?.company?.address?.lat && client?.company?.address?.lon) {
        consultants.forEach(({ _id, firstName, lastName, profilePhoto }, index) => {
          markers.value.push({
            _id: _id,
            lat: client?.company?.address?.lat,
            lon: client?.company?.address?.lon + index * 0.0003,
            displayName: firstName + ' ' + lastName,
            photoURL: profilePhoto,
            index
          })
        })
      }
    })
    map$.value.zoomAll()
  } catch (error) {
    console.log(error)
    console.log(error.response.data)
  }
}
retriveProjects()
const positions = ref([])
const handleMove = (o, n) => {
  const arr = { ...positions.value }
  const b = arr[o]
  arr[o] = arr[n]
  arr[n] = b
  positions.value = Object.values(arr)
  localStorage.setItem('home-cards-positions', [...Object.values(arr)].join(','))
}
onMounted(() => {
  const p = localStorage.getItem('home-cards-positions')
  if (p) {
    positions.value = p.split(',')
  } else {
    const ps = 'projects,clients,consultants,alerts'
    localStorage.setItem('home-cards-positions', ps)
    positions.value = ps.split(',')
  }
})
const handleClickMarker = ({ target }) => {
  if (target && target.options && target.options.meta && target.options.meta._id) {
    router.push("/consultants/" + target.options?.meta?._id)
  }
}
const map$ = ref(null)
const handleClickZoomOnAll = () => {
  map$.value.zoomAll()
}
</script>
