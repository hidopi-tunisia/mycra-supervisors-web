<template>
  <vue3-tags-input
    class="custom-tags-input"
    :limit="props.limit"
    :allow-duplicates="props['allow-duplicates']"
    :placeholder="props.placeholder"
    :tags="props.tags"
    @on-tags-changed="handleTagsChanged"
  />
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import Vue3TagsInput from 'vue3-tags-input'
const props = defineProps(['tags', 'limit', 'allow-duplicates', 'placeholder'])
const emit = defineEmits(['tags-changed'])
const handleTagsChanged = (v) => {
  emit('tags-changed', toRaw(v))
}
</script>

<style lang="css">
.v3ti-new-tag {
  color: #697a8d !important;
}
.custom-tags-input {
  height: 39px;
  border: 1px solid #d9dee3 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v3ti {
  color: #697a8d !important;
  border: 1px solid red;
}
.v3ti .v3ti-tag {
  background: #03a9f4;
}

.v3ti .v3ti-tag .v3ti-remove-tag {
  color: #000000;
  transition: color 0.3s;
}

.v3ti .v3ti-tag .v3ti-remove-tag:hover {
  color: #ffffff;
}
::placeholder {
  color: #b5bdc6;
  opacity: 1; /* Firefox */
}
::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: #b5bdc6;
}
</style>
