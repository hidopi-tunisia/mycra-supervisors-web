<template>
  <div
    class="bs-toast toast toast-placement-ex m-2"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-delay="2000"
  >
    <div class="toast-header">
      <i class="bx bx-bell me-2"></i>
      <div class="me-auto fw-medium" v-if="ti">{{ ti }}</div>
      <small v-if="sm">{{ sm }}</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="de">
      {{ de }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const ti = ref(null)
const st = ref(null)
const sm = ref(null)
const de = ref(null)
const show = ({ title, small, description } = { title: '', small: '', description: '' }) => {
  ti.value = title
  sm.value = small
  de.value = description
  const t = document.querySelector('.toast-placement-ex')
  let o, s, c
  var e
  c &&
    (e = c) &&
    null !== e._element &&
    (t && (t.classList.remove(o), DOMTokenList.prototype.remove.apply(t.classList, s)),
    e.dispose()),
    ((o = 'bg-success'),
    (s = 'bottom-0 end-0'.split(' ')),
    t.classList.add(o),
    DOMTokenList.prototype.add.apply(t.classList, s),
    (c = new bootstrap.Toast(t)).show())
}
defineExpose({ show })
</script>
