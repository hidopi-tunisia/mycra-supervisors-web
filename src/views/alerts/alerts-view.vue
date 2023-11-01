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
      <alerts-history
        v-if="selected"
        :contact="selected"
        :messages="alerts"
        @refresh="handleRefresh"
        @remove="handleRemove"
        @toggle-is-read="handleToggleIsRead"
        @notify="handleNotifyConsultant"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getConsultants } from '@/domain/consultants'
import { deleteAlert, getAlerts, toggleAlertIsRead } from '@/domain/alerts'
import AlertsContacts from '@/components/alerts/contacts/alerts-contacts.vue'
import AlertsHistory from '@/components/alerts/history/alerts-history.vue'
import { ref } from 'vue'

const selected = ref(null)
const handleSelect = (i) => {
  selected.value = null
  alerts.value = null
  selected.value = i
  retrieveAlerts(i._id)
}
const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const currentSize = ref(100)
const retrieveConsultants = async () => {
  try {
    loading.value = true
    const { data } = await getConsultants({
      limit: currentSize.value
    })
    results.value = data
    filtered.value = data
    if (Array.isArray(data) && data.length > 0) {
      handleSelect(data[0])
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
retrieveConsultants()
const loadingAlerts = ref(false)
const alerts = ref(null)
const retrieveAlerts = async (id) => {
  try {
    loadingAlerts.value = true
    const { data } = await getAlerts({ consultant: id })
    alerts.value = data
    loadingAlerts.value = false
  } catch (error) {
    loadingAlerts.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
const handleNotifyConsultant = (message) => {
  const fn = async () => {
    alert(selected.value._id + message)
  }
  fn()
}
const handleSearch = (value) => {
  filtered.value = results.value.filter((d) => {
    return (
      d.firstName.toLowerCase().includes(value.toLowerCase()) ||
      d.lastName.toLowerCase().includes(value.toLowerCase())
    )
  })
}
const handleRefresh = () => {
  retrieveAlerts(selected.value._id)
}
const handleRemove = (id) => {
  const fn = async () => {
    try {
      alerts.value = alerts.value.filter(({ _id }) => _id !== id)
      deleteAlert(id)
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
const handleToggleIsRead = (id) => {
  const fn = async () => {
    try {
      alerts.value = alerts.value.map((alert) =>
        alert._id === id ? { ...alert, isRead: true } : alert
      )
      await toggleAlertIsRead(id)
    } catch (error) {
      console.log(error)
    }
  }
  fn()
}
</script>

<style lang="css">
@import './view-styles.css';
</style>
