<template> 
<transition name="modal">
 <div 
  class="modal custom modal-mask" 
  id="myModal" 
  tabindex="-1" 
  role="dialog" 
  aria-labelledby="myModalLabel" 
  aria-hidden="true"
  style="display: block">
   <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <img class="w-100 mb-20" src="/img/done.png" alt="">
              <div class="mb-10 text-center">
                <h3 class="color-primary">Awesome!!</h3>
                <div class="color-black-min">Your deposit for 500 XZC has submitted!</div>
              </div>
              <div class="text-center">
                <button 
                  type="button" 
                  data-dismiss="modal" 
                  class="btn-primary border-radius-30px"
                  v-on:click="done()"
                >OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div> 
</transition> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex' 
export default { 
   methods: {
    ...mapActions({ 
      closeModalWallet: 'closeModalWallet', 
    }),
    async done(){ 
      await this.closeModalWallet() 
    }
    
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
</style>

