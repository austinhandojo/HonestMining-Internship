<template>
  <div class="card card-default box mb-20 card-dashboard-1 profile-custom">
    <div class="card-heading">
      <h3 class="card-title">My Profile</h3>
    </div>
    <div
      class="card-body text-center profile-section d-flex justify-content-center align-items-center flex-column"
    >
      <div class="d-flex justify-content-center mb-20">
        <div class="profile-custom">
          <div class="img-border">
            <img :src="$lodash.get(user, 'image.avatar') + '?' + (new Date).getTime()">
          </div>
        </div>
      </div>

      <div class="font-bold mb-5">
        {{ user ? user.username : '' }}
        <i 
          v-if="user.kyc === true" 
          class="fas fa-check-circle"/>
      </div>

      <div class="font-300 custom-member-since">
        <span>Member since:</span>
        {{ $filters.dateFormat(user.created_at, 'DD-MM-YYYY') }}
      </div>

      <div class="row section-current-point font-300 hidden">
        <div class="col-6">
          <span class="title-point">Current Point :</span>
        </div>
        <div class="col-6">
          <img 
            class="mr-5" 
            src="img/coin1.png" 
            alt="ini alt">
          <span class="value-point">0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user || {};
    }
  }
};
</script>
