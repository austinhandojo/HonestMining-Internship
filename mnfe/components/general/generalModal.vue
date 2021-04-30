<template>
  <div
    :id="id"
    :class="{'show': isShown}"
    :aria-labelledby="id"
    class="modal modal-v2 custom fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      :class="{'modal-sm': size === 'small'}" 
      class="modal-dialog modal-dialog-centered"
      role="document">
      <div class="modal-content has-header">
        <div
          v-if="title"
          class="modal-header">
          <div class="d-flex justify-content-center w-100">
            <h3 class="text-white m-0 font-weight-normal">{{ title }}</h3>
          </div>
        </div>
        <div class="modal-body">
          <div
            v-if="type === 'error' || type === 'success'"
            class="text-center">
            <img
              :src="type === 'error' ? $assets.genBobSad : $assets.genBobSuccess"
              :srcset="type === 'error' ? `${ $assets.genBobSad_2x } 2x` : `${ $assets.genBobSuccess_2x } 2x`"
              width="180"
              height="180"
              class="mb-3 object-fit-contain"
              alt
            >

            <div class="mb-3">
              <h3
                :class="type === 'error' ? 'text-danger' : 'text-primary'"
                class="m-0 m-2 text-uppercase"
              >{{ salute }}</h3>
              <div
                :class="{'text-danger': type === 'error'}"
                class="font-size-13=px"
                v-html="content"
              />
            </div>

            <div class="text-center pt-2">
              <button
                type="button"
                data-dismiss="modal"
                class="btn-base btn-primary"
              >{{ $lang.print('global.CLOSE') }}</button>
            </div>
          </div>

          <slot v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    salute: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isShown: false
    };
  },

  async mounted() {
    $('#' + this.id).on('hidden.bs.modal', () => {
      this.isShown = false;

      $('iframe[title="chat widget"]')
        .closest('div')
        .removeClass('sr-only');

      this.$emit('hidden', { id: this.id });
    });

    $('#' + this.id).on('show.bs.modal', () => {
      this.isShown = true;

      $('iframe[title="chat widget"]')
        .closest('div')
        .addClass('sr-only');

      this.$emit('show', { id: this.id });
    });

    $('#' + this.id).on('shown.bs.modal', () => {
      this.isShown = true;

      $('iframe[title="chat widget"]')
        .closest('div')
        .addClass('sr-only');
    });

    this.$global.detachModal(this.id);
  },

  destroyed() {
    this.$global.destroyModal(this.id);
  }
};
</script>
