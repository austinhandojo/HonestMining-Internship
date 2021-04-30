<template>
  <div class="card card-v2 card-default box mb-20">
    <div class="card-heading d-flex align-items-center justify-content-between">
      <h3 class="card-title text-uppercase">Blog</h3>

      <a
        class="card-link"
        href="https://honestmining.com/blog">
        <i class="ion ion-ios-arrow-round-forward"/>
      </a>
    </div>
    <div class="card-body">
      <div
        v-for="(item, index) in blog"
        :key="item.guid"
        :class="{'mb-3 border-bottom pb-1': index !== blog.length - 1}"
      >
        <h4 class="m-0 p-0 font-weight-normal font-size-15-px">
          <a
            :href="item.link"
            class="text-default text-hover-primary">{{ item.title }}</a>
        </h4>
        <div class="text-right font-size-3 mt-2 text-uppercase">
          <span
            v-if="blogDate(item.isoDate).diff <= 7"
            class="text-danger">NEW</span>
          <span class="text-gray">{{ blogDate(item.isoDate).format }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  computed: {
    blog() {
      return this.$store.getters['blog/list'].slice(0, 6);
    }
  },

  methods: {
    blogDate(isoDate) {
      let now = Moment();
      let date = Moment(isoDate);

      let diff = now.diff(date, 'days');

      return {
        diff,
        format: diff > 30 ? date.format('DD-MM-YYYY HH:mm') : date.fromNow(true)
      };
    }
  }
};
</script>
