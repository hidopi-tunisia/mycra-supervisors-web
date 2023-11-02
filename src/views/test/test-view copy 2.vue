<template>
  <div class="row">
    <div class="col-md-6">
      <div id="map"></div>
      <div ref="markerDetails" id="marker-details"></div>
    </div>
  </div>
  <button @click="zoomToAllMarkers">Zoom to All Markers</button>
  <input
    type="text"
    id="search"
    placeholder="Search for a location"
    :value="place"
    @input="
      ({ target }) => {
        place = target.value
      }
    "
  />
  <button @click="handleSearchPlace">Search</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
const markerDetails = ref(null)
const markers = ref([])
let map
const emit = defineEmits('click')
onMounted(() => {
  map = L.map('map').setView([0, 0], 5)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map)

  const customIcon = L.icon({
    iconUrl: 'https://randomuser.me/api/portraits/men/11.jpg', // Replace with the path to your custom image marker
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  map.on('click', (e) => {
    const lat = e.latlng.lat
    const lon = e.latlng.lng
    const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map)
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
    map.fitBounds(bounds)
  } else {
    alert('No markers to zoom to.')
  }
}
const place = ref('paris')
const SEARCH_URL = 'https://nominatim.openstreetmap.org/search'
const handleSearchPlace = () => {
  const fn = async () => {
    try {
      const { data } = await axios.get(`${SEARCH_URL}?format=json&q=${place.value}`)
      const result = data[0]
      const lat = parseFloat(result.lat)
      const lon = parseFloat(result.lon)
      const displayName = result.display_name
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })
      L.marker([lat, lon]).addTo(map).bindPopup(displayName).openPopup()
      map.setView([lat, lon], 13)
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
</script>
<style scoped>
.leaflet-container {
  height: 400px;
}
</style>
