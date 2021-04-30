<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading d-flex align-items-center justify-content-between">
      <h3 class="card-title text-uppercase">Staking Folio</h3>
      <div class="font-size-13-px">
        Staking since:
        <span class="text-primary">19 Month 1 Day</span>
      </div>
    </div>
    <div class="card-body">
      <div class="mb-4">
        <div class="mb-2">Assets Allocation (In HNST)</div>
        <div class="progress">
          <div
            class="progress-bar bg-primary"
            role="progressbar"
            style="width: 50%"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div
            class="progress-bar bg-yellow"
            role="progressbar"
            style="width: 30%"
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style="width: 20%"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div class="d-flex text-right">
          <div
            class="text-primary flex-shrink-0 flex-grow-0"
            style="width: 50%;">50%</div>
          <div
            class="text-yellow flex-shrink-0 flex-grow-0"
            style="width: 30%;">30%</div>
          <div
            class="text-success flex-shrink-0 flex-grow-0"
            style="width: 20%;">20%</div>
        </div>
      </div>

      <div class="position-relative">
        <div
          ref="slider"
          class="font-size-13-px">
          <div
            v-for="n in 5"
            :key="n"
            class="d-flex flex-column border-right position-relative pl-4 mx-4"
          >
            <span
              class="d-block bg-primary position-absolute"
              style="width: 12px; height: 12px; border-radius: 50%; left: 0; top: 3px;"
            />
            <span>DASH (1000 DASH)</span>
            <span>20x Payout</span>
            <span>600 DASH Collected</span>
          </div>
        </div>

        <div
          ref="slider-prev"
          class="position-absolute h-100 font-size-18-px d-inline-flex align-items-center text-primary text-gray bg-white"
          style="top: 0; left: 0; width: 21px;"
        >
          <span class="cursor-pointer">
            <i
              class="d-inline-block ion ion-ios-arrow-back"
              @click="navigateSlider('prev')"/>
          </span>
        </div>
        <div
          ref="slider-next"
          class="position-absolute h-100 font-size-18-px d-inline-flex align-items-center text-primary bg-white justify-content-end"
          style="top: 0; right: 0; width: 22px;"
        >
          <span class="cursor-pointer">
            <i
              class="d-inline-block ion ion-ios-arrow-forward"
              @click="navigateSlider('next')"/>
          </span>
        </div>
      </div>

      <hr class="my-4 p-0">

      <div>
        <div class="d-flex mb-4">
          <div>
            <span class="mr-4">Accumulated Reward by</span>
            <span class="cursor-pointer text-primary">Day</span>
            <span class="mx-2">/</span>
            <span class="cursor-pointer">Week</span>
            <span class="mx-2">/</span>
            <span class="cursor-pointer">Month</span>
          </div>
        </div>

        <div
          class="d-flex"
          style="height: 300px;">
          <div
            class="h-100 d-flex flex-column-reverse justify-content-between align-items-end"
            style="width: 100px;"
          >
            <div
              v-for="n in 5"
              :key="n"
              class="d-flex align-items-center font-size-12-px">
              {{ n * 1000 - 1000 }}
              <span
                class="d-block bg-primary ml-2"
                style="width: 10px; height: 1px;"
              />
            </div>
          </div>
          <div class="d-flex h-100 flex-grow-1">
            <div
              v-for="n in 7"
              :key="n"
              class="d-flex flex-column align-items-center h-100"
              style="width: calc(100% / 7);"
            >
              <div
                class="bg-gray align-items-stretch position-relative"
                style="width: 20px; height: 100%; border-radius: 4px 4px 0 0;"
              >
                <div
                  class="position-absolute bg-primary"
                  style="left: 3px; bottom: 0; width: calc(100% - 6px); height: 50%; border-radius: 4px 4px 0 0;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <div style="width: 100px;"/>
          <div class="d-flex flex-grow-1">
            <div
              v-for="n in 7"
              :key="n"
              class="font-size-12-px text-center mt-2"
              style="width: calc(100% / 7);"
            >
              Wed
              <br>
              ({{ n + 12 }})
            </div>
          </div>
        </div>
      </div>

      <hr class="my-4 p-0">

      <div
        class="d-flex"
        style="line-height: 1.25;">
        <div class="mr-auto">
          <div class="d-flex align-items-center">
            <span
              class="d-inline-block mr-2 bg-primary"
              style="width: 15px; height: 10px; border-radius: 2px;"
            />
            <span class="d-inline-block">HNST</span>
          </div>
        </div>
        <div class="text-right">
          <span>Total Deposit (all time)</span>
          <div class="text-primary font-size-8 font-weight-bold">65,000 HNST</div>
          <span class="text-gray font-size-5">0.97987979 BTC</span>
        </div>
        <div class="align-items-stretch border-right mx-5"/>
        <div class="text-right">
          <span>Total Reward (all time)</span>
          <div class="text-primary font-size-8 font-weight-bold">10,290 HNST</div>
          <span class="text-gray font-size-5">0.6356546354 BTC</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
if (process.client) {
  require('~/node_modules/slick-carousel/slick/slick.min.js');
}

export default {
  async mounted() {
    await this.$nextTick();

    this.initSlider();
  },

  destroyed() {
    this.destroySlider();
  },

  methods: {
    initSlider() {
      let el = this.$refs.slider;

      $(el).on('afterChange', (event, slick, currentSlide) => {
        if (currentSlide === 0) {
          $(this.$refs['slider-prev']).addClass('text-gray');
          $(this.$refs['slider-prev'])
            .find('i')
            .addClass('cursor-default');
        } else {
          $(this.$refs['slider-prev']).removeClass('text-gray');
          $(this.$refs['slider-prev'])
            .find('i')
            .removeClass('cursor-default');
        }

        if (currentSlide >= 2) {
          $(this.$refs['slider-next']).addClass('text-gray');
          $(this.$refs['slider-next'])
            .find('i')
            .addClass('cursor-default');
        } else {
          $(this.$refs['slider-next']).removeClass('text-gray');
          $(this.$refs['slider-next'])
            .find('i')
            .removeClass('cursor-default');
        }
      });

      $(el).slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
      });
    },

    navigateSlider(nav) {
      let el = this.$refs.slider;

      $(el).slick(nav === 'prev' ? 'slickPrev' : 'slickNext');
    },

    destroySlider() {
      let el = this.$refs.slider;

      $(el).slick('unslick');
    }
  }
};
</script>

<style src="~/node_modules/slick-carousel/slick/slick.css"></style>

