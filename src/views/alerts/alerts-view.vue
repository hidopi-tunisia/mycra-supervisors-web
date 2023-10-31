<template>
  <div class="app-chat overflow-hidden card">
    <div class="row g-0">
      <alerts-contacts
        v-if="filtered"
        :items="filtered"
        :contact="selected"
        @select="handleSelect"
        @search="handleSearch"
      />
      <alerts-history v-if="selected" :contact="selected" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getConsultants } from '@/domain/consultants'
import AlertsContacts from '@/components/alerts/contacts/alerts-contacts.vue'
import AlertsHistory from '@/components/alerts/history/alerts-history.vue'
import { ref } from 'vue'

const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const currentSize = ref(100)
const retrieve = async () => {
  try {
    loading.value = true
    const { data } = await getConsultants({
      limit: currentSize.value
    })
    results.value = data
    filtered.value = data
    selected.value = data[0]
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
retrieve()
const selected = ref(null)
const handleSelect = (i) => {
  selected.value = i
}
const handleSearch = (value) => {
  console.log(value)

  filtered.value = results.value.filter((d) => {
    console.log(d)
    return (
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase())
    )
  })
}
</script>

<style lang="css">
@import './view-styles.css';
</style>
