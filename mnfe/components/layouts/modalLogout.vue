<template>
  <div
    id="logoutModal"
    class="modal custom fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="logoutModal"
    aria-hidden="true"
  >
    <div 
      class="modal-dialog modal-dialog-centered" 
      role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row justify-content-center mt-20 mb-20">
            <div class="col-md-5 text-center">
              <img 
                class="max-img-popup mb-20" 
                src="/img/icon-logout.png" 
                alt>
            </div>
            <div class="col-12">
              <div class="mb-20 text-center">
                <div
                  class="color-black-min line-height-normal font-16"
                >Are you sure you want to logout?</div>
              </div>
              <div class="text-center">
                <v-wait for="logout-loading"> 
                  <template slot="waiting">
                    <div class="text-center">
                      <b-button 
                        class="btn-primary border-radius-30px next-step"
                        disabled>
                        <b-spinner 
                          small 
                          type="grow"/>
                        Loading...
                      </b-button>
                    </div>
                  </template>
                  <div class="mb-15">
                    <a 
                      class="btn-primary border-radius-30px" 
                      @click="doLogout">Logout</a>
                  </div>
                  <div>
                    <a 
                      data-dismiss="modal" 
                      class="color-black" 
                      href="#">Cancel</a>
                  </div>
                </v-wait>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { HTTP_INTERNAL_SERVER_ERROR  } from '../../utils/Messages';

export default {
  computed: {
    
  },
  methods: {
    ...mapActions({
      postLogout: 'postLogout'
    }),
    async doLogout(){
      
      await this.$wait.start('logout-loading');
      let logout = await this.postLogout()
      if(typeof logout.status === 'boolean'){
        window.location.href = '/login' 
        return
      }
      this.$wait.end('logout-loading');
      this.$toast.error(HTTP_INTERNAL_SERVER_ERROR);
    }
  }
}
</script>
