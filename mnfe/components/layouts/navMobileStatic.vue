<template>
  <div 
    id="nav-mobile" 
    class="d-lg-none nav-mobile font-size-14-px" 
    style="display: none;">
    <div class="layer"/>
    <nav>
      <div class="mx-15-px my-30-px d-flex justify-content-between align-items-center">
        <div class="header--close text-white font-size-25-px">
          <i class="ion ion-ios-arrow-back"/>
        </div>
        <img 
          :src="$assets.logoWhite" 
          :srcset="`${ $assets.logoWhite_2x } 2x`" 
          height="30" 
          alt>
        <div class="font-size-8">
          <i class="ion ion-ios-arrow-back invisible"/>
        </div>
      </div>

      <div class="buttons d-flex justify-content-between mx-15-px px-0">
        <a
          id="signup_mobile_menu"
          href="/register"
          class="btn-base btn-secondary text-uppercase m-2 ml-0 px-0 text-center flex-grow-1 w-50"
        >Sign Up</a>
        <a
          v-if="!user"
          id="login_mobile_menu"
          href="/login"
          class="btn-base btn-white text-uppercase m-2 ml-0 px-0 text-center flex-grow-1 w-50"
        >Login</a>
        <a
          v-if="user"
          href="/dashboard"
          class="btn-base btn-white btn-outline text-uppercase m-2 mr-0 px-0 text-center flex-grow-1 w-50"
        >Dashboard</a>
      </div>

      <ul>
        <li>
          <a 
            href="#about" 
            @click.prevent="handleMenu('#section-about', -100)">About</a>
        </li>
        <li>
          <a 
            href="#feature" 
            @click.prevent="handleMenu('#section-features', -120)">Features</a>
        </li>
        <li>
          <a 
            href="#how" 
            @click.prevent="handleMenu('#section-how', -100)">How It Works</a>
        </li>
        <li>
          <a 
            href="#why" 
            @click.prevent="handleMenu('#section-why', -120)">Why Choose Us</a>
        </li>
        <li>
          <a 
            href="#coins" 
            @click.prevent="handleMenu('#section-coins', -120)">Supported Coins</a>
        </li>
        <li>
          <a
            href="#masternode"
            @click.prevent="handleMenu('#section-masternode', -120)"
          >Honest Mining Masternodes</a>
        </li>
        <li>
          <a
            href="#currency"
            @click.prevent="handleMenu('#section-currency', -80)"
          >Honest / HNST Token</a>
        </li>
        <li 
          class="has-border mt-5-px" 
          style="padding-top: 12.5px;">
          <a href="https://honestmining.com/blog">Honest Blog</a>
        </li>
        <li>
          <a href="/faq">FAQ</a>
        </li>
        <li>
          <a href="/privacy-policy">Privacy Policy</a>
        </li>
        <li>
          <a href="/tos">Terms of Service</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    handleMenu(section, offset) {
      this.$emit('handle-menu', { section, offset });
    }
  }
};
</script>
