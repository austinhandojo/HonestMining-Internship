<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading d-flex justify-content-between align-items-center">
      <h3 class="card-title text-uppercase">Achievement</h3>
      <nuxt-link
        class="card-link"
        to="/my-profile"
        exact>
        <i class="ion ion-ios-arrow-round-forward"/>
      </nuxt-link>
    </div>
    <div class="card-body">
      <div class="d-flex">
        <div
          v-for="n in 4"
          :key="n"
          class="flex-grow-1 text-center">
          <img
            :src="$assets.badgeDefault"
            :srcset="`${ $assets.badgeDefault_2x } 2x`"
            width="50"
            height="50"
            class="object-fit-fill">
        </div>
      </div>
    </div>
  </div>
</template>
