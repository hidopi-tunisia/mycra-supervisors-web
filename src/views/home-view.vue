<template>
  <div class="container-xxl">
    <div class="row" v-if="profile">
      <div class="col-lg-8 mb-4 order-0">
        <div class="card">
          <div class="d-flex align-items-end row">
            <div class="col-sm-7">
              <div class="card-body">
                <h5 class="card-title text-primary">Congratulations {{ profile.firstName }}! 🎉</h5>
                <p class="mb-4">
                  You have done <span class="fw-bold">72%</span> more sales today. Check your new
                  badge in your profile.
                </p>

                <a href="javascript:;" class="btn btn-sm btn-outline-primary">View Badges</a>
              </div>
            </div>
            <div class="col-sm-5 text-center text-sm-left">
              <div class="card-body pb-0 px-0 px-md-4">
                <img
                  src="../assets/img/illustrations/man-with-laptop-light.png"
                  height="140"
                  alt="View Badge User"
                  data-app-dark-img="illustrations/man-with-laptop-dark.png"
                  data-app-light-img="illustrations/man-with-laptop-light.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProfile } from '@/domain/me'
import { ref } from 'vue'
const profile = ref(null)
const fn = async () => {
  try {
    const { data } = await getProfile({ populate: '' })
    profile.value = data
    console.log("=====PROFILE=====")
    console.log(profile)
    console.log("=====PROFILE=====")
  } catch (error) {
    console.log(error, error.message, error.data)
  }
}
fn()
</script>

<style lang="css" scoped></style>
