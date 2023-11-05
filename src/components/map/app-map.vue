<template>
  <div id="map"></div>
  <div ref="markerDetails" id="marker-details"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { generateFromString } from 'generate-avatar'
const $ = window.jQuery
let map
let layer_markers
const markerDetails = ref(null)
const props = defineProps(['markers'])
const emit = defineEmits(['click', 'click-marker', 'mouseover-marker'])
onMounted(() => {
  map = L.map('map').setView([48.8534951, 2.3483915], 10) // Paris
  layer_markers = L.layerGroup().addTo(map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map)
  map.on('click', (e) => {
    emit('click', e)
  })
  if (props.markers && Array.isArray(props.markers) && props.markers.length > 0) {
    props.markers.forEach(({ lat, lon, displayName, photoURL, _id, index }) => {
      if (_id) {
        addAvatar({ lat, lon, displayName, photoURL, _id, index })
      } else {
        addMarker({ lat, lon, photoURL })
      }
    })
  }
})
watchEffect(() => {
  if (props.markers && Array.isArray(props.markers) && props.markers.length > 0) {
    props.markers.forEach(({ lat, lon, displayName, photoURL, _id, index }) => {
      if (map) {
        if (_id) {
          addAvatar({ lat, lon, displayName, photoURL, _id, index })
        } else {
          addMarker({ lat, lon, photoURL })
        }
      }
    })
  }
})
const handleMarkerClick = (e) => {
  hideTooltips()
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
const pickLocation = ({ lat, lon }) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer)
    }
  })
  L.marker([lat, lon]).addTo(map)
  map.setView([lat, lon], 13)
}
const addMarker = ({ lat, lon, photoURL }) => {
  const html = `<img src="${photoURL}"
                     style="width: 48px;
                       height: 48px;"
                    />`
  const icon = L.divIcon({
    html
  })
  const marker = L.marker([lat, lon], {
    icon
  })
  marker.addTo(layer_markers).on('click', handleMarkerClick).on('mouseover', handleMarkerMouseover)
}
const addAvatar = ({ lat, lon, displayName, photoURL, _id }) => {
  let img
  if (!photoURL) {
    img = getAvatar(_id).replaceAll('"', "'")
  } else {
    img = photoURL
  }
  const html = `<img src="${img}"
                     style="width: 48px;
                       height: 48px;
                       border-radius: 24px;
                       border: 2px solid white;
                       box-shadow: 0px 5px rgba(0,0,0,0.4);
                      -moz-box-shadow: 0px 5px rgba(0,0,0,0.4);
                      -webkit-box-shadow: 0px 5px rgba(0,0,0,0.4);
                      -o-box-shadow: 0px 5px rgba(0,0,0,0.4);" 
                      data-bs-toggle="tooltip"
                      data-popup="tooltip-custom"
                      data-bs-placement="top"
                      title="${displayName}"
                    />`
  const icon = L.divIcon({
    html,
    className: '-'
  })
  const marker = L.marker([lat, lon], {
    icon,
    meta: {
      _id
    }
  })
  marker.addTo(layer_markers).on('click', handleMarkerClick).on('mouseover', handleMarkerMouseover)
}
const hideTooltips = () => {
  $.each($('.tooltip'), function (index, element) {
    $(this).remove()
  })
}
const getAvatar = (text) => {
  return `data:image/svg+xml;utf8,${generateFromString(text)}`
}
defineExpose({ zoomAll, search, pickLocation })
</script>
<style scoped>
.leaflet-container {
  height: 380px;
}
</style>
