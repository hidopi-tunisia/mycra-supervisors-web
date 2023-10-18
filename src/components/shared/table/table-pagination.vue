<template>
  <div class="demo-inline-spacing">
    <!-- Basic Pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item prev" :class="current - 1 <= -1 ? 'disabled' : 'with-pointer'">
          <a class="page-link" @click="handleClickPage(current - 1)"
            ><i class="tf-icon bx bx-chevron-left"></i
          ></a>
        </li>
        <li
          class="page-item with-pointer"
          :class="current === p - 1 ? 'active' : ''"
          :key="p"
          v-for="p in props.pages"
        >
          <a class="page-link" @click="handleClickPage(p - 1)">{{ p }}</a>
        </li>
        <li class="page-item next" :class="current + 1 > props.pages ? 'disabled' : 'with-pointer'">
          <a class="page-link" @click="handleClickPage(current + 1)"
            ><i class="tf-icon bx bx-chevron-right"></i
          ></a>
        </li>
      </ul>
    </nav>
    <!--/ Basic Pagination -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['pages', 'current'])
const emit = defineEmits(['change'])
const handleClickPage = (p) => {
  emit('change', p)
}
</script>

<style scoped></style>
