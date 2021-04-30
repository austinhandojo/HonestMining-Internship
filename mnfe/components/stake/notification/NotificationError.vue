<template>
  <section>
    <div class="row justify-content-center mt-20 mb-20">
      <div class="col-md-5 text-center">
        <img
          :src="image"
          class="max-img-popup mb-20"
          alt="">
      </div>
      <div class="col-12">
        <div class="mb-20 text-center">
          <h3 class="color-primary line-height-normal">{{ title }}</h3>
          <div>{{ message }}</div>
        </div>
        <div class="text-center">
          <div class="mb-5">
            <a
              data-dismiss="modal"
              class="btn-red border-radius-30px pl-20 pr-20"
              @click="closeModal()">{{ page.button }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'NotificationError',
    props: {
      title: {
        type: String,
        default: () => 'Request Error'
      },
      message: {
        type: String,
        default: () => 'Request Error'
      },
      image: {
        type: String,
        default: () => '/img/error-masternode.png'
      },
    },
    data() {
      return {
        page: {
          button: `close`
        }
      }
    },
    methods: {
      closeModal(){
        this.$bvModal.hide('modal-error')
      }
    }
  }
</script>
