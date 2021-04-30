<template>
  <modal
    id="swapConfirmModal"
    size="small"
    title="Confirm Swap"
    @show="$emit('show')"
    @hidden="$emit('hidden')"
  >
    <div class="text-center">
      <img
        :src="$assets.genBobQuestion"
        :srcset="`${ $assets.genBobQuestion_2x } 2x`"
        width="180"
        height="180"
        class="mb-3 object-fit-contain"
        alt
      >

      <div class="mb-3">
        <span class="d-block font-size-5 font-weight-bold mb-3 text-primary">Are you going to Swap?</span>

        <div class="bg-gray-5 p-4 border-radius-4-px d-flex justify-content-between mb-3">
          <div
            :class="data.from_hnst ? 'order-0' : 'order-2'"
            class="pb-3 position-relative font-weight-bold font-size-5"
          >
            {{ $filters.numberFormat(data.hnst_value, 8, true) || 0 }}
            <span
              class="d-block position-absolute font-weight-normal text-center w-100 font-size-11-px text-gray-20"
              style="left: 0; bottom: 0;"
            >{{ data.hnst.ticker }}</span>
          </div>

          <div class="px-2 pt-1 order-1">
            <i class="hm-icon-swap-rotate text-primary" />
          </div>

          <div
            :class="data.from_hnst ? 'order-2' : 'order-0'"
            class="pb-3 position-relative font-weight-bold font-size-5"
          >
            {{ $filters.numberFormat(data.coin_value, 8, true) || 0 }}
            <span
              class="d-block position-absolute font-weight-normal text-center w-100 font-size-11-px text-gray-20"
              style="left: 0; bottom: 0;"
            >{{ data.swap.ticker }}</span>
          </div>
        </div>

        <div>
          Please proceed within
          <span
            :class="!timed_out ? 'text-danger' : 'text-gray-10'"
            class="d-inline-block font-size-5 w-50-px"
          >{{ counter }}</span>
        </div>
      </div>

      <div class="text-center pt-2 px-5 d-flex">
        <button
          type="button"
          data-dismiss="modal"
          class="btn-base btn-primary btn-outline btn-slim mr-4 flex-fill"
        >{{ $lang.print('global.CANCEL') }}</button>
        <button
          :class="!timed_out ? 'btn-primary' : 'btn-gray'"
          :disabled="timed_out"
          type="button"
          class="btn-base flex-fill"
        >Swap</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      count: 20,
      timed_out: false
    };
  },

  computed: {
    counter() {
      return this.$filters.hourFormat(this.count);
    }
  },

  created() {
    this.$options.counter;

    this.$on('show', () => {
      this.count = 20;
      this.timed_out = false;

      this.$options.counter = setInterval(() => {
        this.count--;

        if (this.count === 0) {
          clearInterval(this.$options.counter);

          this.timed_out = true;
        }
      }, 1000);
    });

    this.$on('hidden', () => {
      clearInterval(this.$options.counter);
    });
  },

  async mounted() {
    await this.$nextTick();
  }
};
</script>
