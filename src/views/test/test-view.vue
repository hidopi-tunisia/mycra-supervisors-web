<template>
  <div class="row">
    <div class="col-md-12">
      <button class="mt-4" @click="handleClickZoomAll">Zoom all</button>
      <app-map
        ref="map$"
        v-if="markers"
        :markers="markers"
        @click="handleClick"
        @click-marker="handleClick"
        @mouseover-marker="handleMarkerMouseover"
      />
      <input
        type="text"
        id="search"
        placeholder="Search for a location"
        :value="text"
        @input="
          ({ target }) => {
            text = target.value
          }
        "
      />
      <button @click="handleSearchPlace">Search</button>
    </div>
  </div>
</template>

<script setup>
import AppMap from '@/components/map/app-map.vue'
import { searchPlace } from '@/domain/geo'
import { ref, onMounted } from 'vue'
const map$ = ref(null)
const markers = ref([])
const text = ref('paris')
const handleSearchPlace = () => {
  const fn = async () => {
    try {
      const { data } = await searchPlace(text.value)
      if (data.length > 0) {
        const result = data[0]
        const lat = parseFloat(result.lat)
        const lon = parseFloat(result.lon)
        const displayName = result.display_name
        map$.value.search({ lat, lon, displayName })
      }
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const handleClick = (e) => {
  const lat = e.latlng.lat
  const lon = e.latlng.lng
  const n = Math.floor(Math.random() * (30 - 1 + 1) + 1)
  const _id = n
  const photoURL = `https://randomuser.me/api/portraits/men/${n}.jpg`
  const marker = {
    _id,
    photoURL,
    lat,
    lon
  }
  markers.value.push(marker)
}
const handleMarkerClick = ({ target }) => {
  console.log(target.options.meta)
}
const handleMarkerMouseover = ({ target }) => {
  console.log(target.options.meta)
}
const handleClickZoomAll = () => {
  map$.value.zoomAll()
}
</script>
<style scoped>
.leaflet-container {
  height: 400px;
}
</style>
