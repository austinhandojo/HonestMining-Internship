<template>
  <li class="nav-item dropdown">
    <a 
      v-if="user" 
      href="#" 
      class="nav-link dropdown-toggle" 
      data-toggle="dropdown">
      <img
        :src="`${ user.image.avatar }?${ (new Date()).getTime() }`"
        alt="Avatar"
        width="30"
        height="30"
        class="avatar img-circle"
      >
    </a>
    <ul class="dropdown-menu dropdown-md dropdown-md-right dropdown-replace">
      <li>
        <nuxt-link 
          to="/setting" 
          class="dropdown-item">Settings</nuxt-link>
      </li>
      <li>
        <a 
          href="#" 
          data-toggle="modal" 
          data-target="#logoutModal" 
          class="dropdown-item">Logout</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  border: 1px solid white;
}

.dropdown-md {
  min-width: 200px !important;
  margin-right: -5px !important;
}
</style>
