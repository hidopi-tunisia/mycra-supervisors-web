<template>
  <div class="col-lg-6 col-md-12 col-6 mb-4">
    <div class="card">
      <div class="card-body">
        <div class="card-title d-flex align-items-start justify-content-between">
          <div class="avatar flex-shrink-0">
            <div :class="'rounded-avatar bg-' + props.name">
              <i :class="props.icon"></i>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn p-0"
              type="button"
              id="cardOpt3"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <router-link :to="link">
                <a class="dropdown-item" href="#">{{ props.menuText }}</a>
              </router-link>
              <a
                class="dropdown-item d-flex justify-content-between"
                href="#"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
              >
                Déplacer vers <i class="tf-icon bx bx-chevron-right"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-end card-item" v-show="shown">
                <a
                  class="dropdown-item"
                  href="#"
                  v-show="props.position !== 0"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  @click="handleClickMove(0)"
                  >Position 1</a
                >
                <a
                  class="dropdown-item"
                  href="#"
                  v-show="props.position !== 1"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  @click="handleClickMove(1)"
                  >Position 2</a
                >
                <a
                  class="dropdown-item"
                  href="#"
                  v-show="props.position !== 2"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  @click="handleClickMove(2)"
                  >Position 3</a
                >
                <a
                  class="dropdown-item"
                  href="#"
                  v-show="props.position !== 3"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  @click="handleClickMove(3)"
                  >Position 4</a
                >
              </div>
            </div>
          </div>
        </div>
        <span class="fw-semibold d-block mb-1">{{ props.text }}</span>
        <h3 class="card-title mb-2">{{ props.count }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const shown = ref(false)
const props = defineProps(['text', 'count', 'menuText', 'icon', 'link', 'name', 'position'])
const emit = defineEmits(['move'])
const handleClickMove = (i) => {
  emit('move', i)
}
const handleMouseEnter = () => {
  shown.value = true
}
const handleMouseLeave = () => {
  shown.value = false
}
</script>

<style scoped>
.card-item {
  left: 172px;
  top: 42px;
  position: absolute;
  display: block;
  background-color: white;
}
.rounded-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.bg-consultants {
  background-color: #f4433633;
}
.bg-clients {
  background-color: #4caf5033;
}
.bg-projects {
  background-color: #03a9f433;
}
.bg-alerts {
  background-color: #ffc10733;
}
.icon-consultants {
  color: #f44336;
}
.icon-clients {
  color: #4caf50;
}
.icon-projects {
  color: #03a9f4;
}
.icon-alert {
  color: #ffc107;
}
</style>
