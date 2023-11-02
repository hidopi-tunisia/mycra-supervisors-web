<template>
  <div id="map"></div>
  <div ref="markerDetails" id="marker-details"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
let map
const markerDetails = ref(null)
const markers = ref([])
const props = defineProps(['markers'])
const emit = defineEmits('click')
onMounted(() => {
  map = L.map('map').setView([0, 0], 5)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map)

  props.markers.forEach(({ lat, lon }, index) => {
    const icon = L.icon({
      iconUrl: 'https://randomuser.me/api/portraits/men/' + index + '.jpg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })
    const marker = L.marker([lat, lon], {
      icon,
      meta: {
        foo: "bar"
      }
    })
      .addTo(map)
      .on('click', handleMarkerClick)
    markers.value.push(marker)
  })
  map.on('click', (e) => {
    const lat = e.latlng.lat
    const lon = e.latlng.lng
    const icon = L.icon({
      iconUrl: 'https://randomuser.me/api/portraits/men/' + markers.value.length + '.jpg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })
    const marker = L.marker([lat, lon], {
      icon,
      meta: {
        fooe: "barz"
      }
    })
      .addTo(map)
      .on('click', handleMarkerClick)
    markers.value.push(marker)
    markerDetails.value.innerHTML = 'Latitude: ' + lat + '<br>Longitude: ' + lon
  })
  map.on('click', (e) => {
    emit('click', e)
  })
})
const handleMarkerClick = (e) => {
  console.log(e)
}
</script>
<style scoped>
.leaflet-container {
  height: 500px;
}
</style>
