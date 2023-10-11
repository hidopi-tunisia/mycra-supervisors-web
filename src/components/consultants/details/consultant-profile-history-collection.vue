<template>
  <div class="row">
    <div class="col-md-7 col-12 mb-md-0 mb-4">
      <div class="card">
        <h5 class="card-header">Connected Accounts</h5>
        <div class="card-body">
          <p>Display content from your connected accounts on your site</p>
          <consultant-profile-history-collection-item
            :key="h._id"
            v-for="h in props.history"
            :history="h"
          />
        </div>
      </div>
    </div>
    <div class="col-md-5 col-12">
      <div class="card">
        <h5 class="card-header">Social Accounts</h5>
        <div class="card-body">
          <p>Display content from social accounts on your site</p>
          <Calendar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConsultantProfileHistoryCollectionItem from '@/components/consultants/details/consultant-profile-history-collection-item.vue'
import Calendar from '@/components/shared/cra-calendar/cra-calendar.vue'
const props = defineProps(['history'])
</script>

<style scoped></style>
