<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading">
      <h3 class="card-title text-uppercase">Ranking</h3>
    </div>
    <div
      class="card-body"
      style="padding-bottom: 0 !important;">
      <div class="text-center">
        <img
          :src="$assets.ranking"
          height="240"
          class="mb-3">
        <div class="font-size-6 text-primary">Rank 5 / 1000</div>
        <div class="font-size-12-px">Champion League</div>
      </div>
    </div>
    <div
      class="bg-secondary text-default font-size-6 d-flex align-items-center justify-content-center py-1 mt-2 mb-4"
    >
      12888
      <span class="font-size-3 ml-2">points</span>
    </div>
    <div
      class="card-body"
      style="padding-top: 0 !important;">
      <div class="text-center">
        <div class="d-flex bg-ocean text-primary text-uppercase cursor-pointer align-items-center">
          <div
            v-for="tab in 3"
            :key="tab"
            :class="{'bg-primary text-white cursor-default': isActive(tab)}"
            class="flex-grow-0 flex-shrink-0 py-2"
            style="flex-basis: 33.33%;"
            @click="tabChange(tab)"
          >{{ tabLabel[tab - 1] }}</div>
        </div>
        <div>
          <div class="d-flex bg-gray py-2 font-size-12-px align-items-center">
            <div
              class="flex-shrink-0 flex-grow-0"
              style="flex-basis: 33.33%;">Rank</div>
            <div
              class="flex-shrink-0 flex-grow-0"
              style="flex-basis: 33.33%;">Username</div>
            <div
              class="flex-shrink-0 flex-grow-0"
              style="flex-basis: 33.33%;">Point</div>
          </div>
          <div
            v-for="n in 10"
            :key="n"
            class="d-flex py-1 font-size-12-px align-items-center">
            <div
              class="flex-shrink-0 flex-grow-0"
              style="flex-basis: 33.33%; width: 33.33%;">
              <span
                :class="{'bg-yellow': n === 5}"
                class="d-block py-1"
                style="border-radius: 20px 0 0 20px;">{{ n }}</span>
            </div>
            <div
              class="flex-shrink-0 flex-grow-0"
              style="flex-basis: 33.33%; width: 33.33%;">
              <span
                :class="{'bg-yellow': n === 5}"
                class="d-block text-ellipsis w-100 py-1"
              >Oliverjs2asdasdasdasdasda</span>
            </div>
            <div
              class="flex-shrink-0 flex-grow-0"
              style="flex-basis: 33.33%; width: 33.33%;">
              <span
                :class="{'bg-yellow': n === 5}"
                class="d-block py-1"
                style="border-radius: 0 20px 20px 0;">30000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabLabel: ['My Rank', 'Champion', 'Master'],
      tabActive: 1
    };
  },

  methods: {
    isActive(n) {
      return n === this.tabActive;
    },

    tabChange(n) {
      if (this.tabActive === n) return;

      this.tabActive = n;
    }
  }
};
</script>
