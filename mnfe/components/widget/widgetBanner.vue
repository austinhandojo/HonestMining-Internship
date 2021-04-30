<template>
  <div>
    <div 
      v-if="type === 'stake'" 
      class="card card-v2 card-default box mb-20">
      <div
        :style="`top: 0; left: 0; background-image: url('${ $assets.bannerBg }'); background-size: cover;`"
        class="d-flex flex-column w-100 h-100 p-20"
      >
        <div
          class="text-white font-weight-bold d-flex align-items-center flex-shrink-0"
          style="font-size: 50px; flex: 1; letter-spacing: 2px;"
        >
          Lets
          <br>STAKING
          <br>Today!
        </div>
        <div class="text-right flex-shrink-0 pt-2">
          <nuxt-link 
            class="btn-base btn-secondary" 
            to="/join" 
            exact>Stake Now</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'stake'
    }
  }
};
</script>
