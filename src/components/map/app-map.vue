<template>
  <div id="map"></div>
  <div ref="markerDetails" id="marker-details"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
let map
const markerDetails = ref(null)
const props = defineProps(['markers'])
const emit = defineEmits(['click', 'click-marker', 'mouseover-marker'])
onMounted(() => {
  map = L.map('map').setView([0, 0], 5)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map)
  map.on('click', (e) => {
    emit('click', e)
  })
  props.markers.forEach(({ lat, lon, photoURL, _id }) => {
    addMarker({ lat, lon, photoURL, _id })
  })
})
watchEffect(() => {
  props.markers.forEach(({ lat, lon, photoURL, _id }) => {
    if (map) addMarker({ lat, lon, photoURL, _id })
  })
})
const handleMarkerClick = (e) => {
  emit('click-marker', e)
}
const handleMarkerMouseover = (e) => {
  emit('mouseover-marker', e)
}
const search = ({ lat, lon, displayName }) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer)
    }
  })
  L.marker([lat, lon]).addTo(map).bindPopup(displayName).openPopup()
  map.setView([lat, lon], 13)
}
const zoomAll = () => {
  const bounds = new L.LatLngBounds()
  props.markers.forEach(({ lat, lon }) => {
    bounds.extend({ lat, lon })
  })
  map.fitBounds(bounds)
}
const addMarker = ({ lat, lon, photoURL, _id }) => {
  const html = `<img src="${photoURL}"
                     style="width: 48px;
                       height: 48px;
                       border-radius: 24px;
                       border: 2px solid white;
                       box-shadow: 0px 5px  rgba(0,0,0,0.4);
                      -moz-box-shadow: 0px 5px  rgba(0,0,0,0.4);
                      -webkit-box-shadow: 0px 5px  rgba(0,0,0,0.4);
                      -o-box-shadow: 0px 5px  rgba(0,0,0,0.4);" 
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      title="Alan Baker"
                    />`
  const icon = L.divIcon({
    html
  })
  const marker = L.marker([lat, lon], {
    icon,
    meta: {
      _id
    }
  })
  marker.addTo(map).on('click', handleMarkerClick).on('mouseover', handleMarkerMouseover)
}
defineExpose({ zoomAll, search })
</script>
<style scoped>
.leaflet-container {
  height: 500px;
}
</style>
