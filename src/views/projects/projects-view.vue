<template>
  <div class="row" v-if="results">
    <div class="col-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-start justify-content-between">
            <div class="avatar flex-shrink-0">
              <div class="rounded-avatar bg-projects">
                <i class="bx bx-code-block bx-sm align-middle icon-projects"></i>
              </div>
            </div>
            <div class="dropdown">
              <button class="btn btn-primary">Créer un projet</button>
            </div>
          </div>
          <span class="d-block mb-1">Projets</span>
          <h3 class="card-title text-nowrap mb-2">{{ results.length }}</h3>
        </div>
      </div>
    </div>
  </div>
  <h4 class="fw-bold py-3 mb-4">Projets</h4>
  <projects-table v-if="results" :items="filtered" @search="handleSearch" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getProjects } from '@/api/projects'
import ProjectsTable from '@/components/projects/table/projects-table.vue'
const results = ref(null)
const filtered = ref(null)
const loading = ref(false)
const fn = async () => {
  try {
    loading.value = true
    const { data } = await getProjects()
    results.value = data
    filtered.value = data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    console.log(error.response.data)
  }
}
fn()
const handleSearch = (value) => {
  filtered.value = results.value.filter((d) => {
    return (
      d.name.toLowerCase().includes(value.toLowerCase()) ||
      d.projectCode.toLowerCase().includes(value.toLowerCase()) ||
      d.client.toLowerCase().includes(value.toLowerCase()) ||
      d.category.toLowerCase().includes(value.toLowerCase())
    )
  })
}
</script>

<style lang="scss" scoped></style>
