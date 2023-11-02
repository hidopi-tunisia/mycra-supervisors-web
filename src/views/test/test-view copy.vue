<template>
  <div class="row">
    <div class="col-md-6 bg-danger" style="height: 200px;">
      <div ref="map" id="map" style="height: 200px;"></div>
      <div ref="markerDetails" id="marker-details" style="height: 200px;"></div>
    </div>
  </div>
  <button @click="zoomToAllMarkers">Zoom to All Markers</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as X from 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
console.log(X);
const map = ref(null)
const markerDetails = ref(null)
const markers = ref([])

onMounted(() => {
  map.value = L.map('map').setView([0, 0], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value)

  const customIcon = L.icon({
    iconUrl: 'https://randomuser.me/api/portraits/men/11.jpg', // Replace with the path to your custom image marker
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  map.value.on('click', (e) => {
    const lat = e.latlng.lat
    const lon = e.latlng.lng
    const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map.value)
    marker.bindPopup('Latitude: ' + lat + '<br>Longitude: ' + lon).openPopup()
    markers.value.push(marker)
    markerDetails.value.innerHTML = 'Latitude: ' + lat + '<br>Longitude: ' + lon
  })
})

function zoomToAllMarkers() {
  if (markers.value.length > 0) {
    const bounds = new L.LatLngBounds()
    markers.value.forEach((marker) => {
      bounds.extend(marker.getLatLng())
    })
    map.value.fitBounds(bounds)
  } else {
    alert('No markers to zoom to.')
  }
}
</script>
