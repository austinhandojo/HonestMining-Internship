<template>
  <section 
    id="section-blog" 
    class="section-blog">
    <div class="container">
      <div class="d-block d-lg-flex align-items-center">
        <div class="section-header m-0 mr-50">
          <h2 class="m-0">
            Honest
            <strong>Blog</strong>
          </h2>
        </div>

        <a
          href="https://honestmining.com/blog"
          class="d-none d-lg-inline-block btn btn-primary btn-hover-yellow btn-outline border-radius-30px text-uppercase"
        >Read More</a>

        <div class="d-lg-none text-center">
          <a
            href="https://honestmining.com/blog"
            class="btn btn-lg btn-primary btn-hover-yellow btn-outline border-radius-30px text-uppercase"
          >Read More</a>
        </div>
      </div>
    </div>
    <div 
      v-if="blogData.length" 
      class="blog--group">
      <div class="section-scroll">
        <div class="space-left"/>
        <div 
          v-for="(blog, index) in blogData" 
          :key="blog.guid" 
          class="blog--wrapper">
          <div
            :class="index === blogData.length - 1 ? 'mr-0' : ''"
            class="blog--item card-rev radius-sharper condensed has-shadow"
          >
            <header :class="{'mb-0': blog.enclosure}">
              <div 
                v-if="blog.enclosure" 
                class="item-image">
                <img 
                  :src="blog.enclosure.url" 
                  :alt="blog.title">
              </div>
              <h4>{{ blog.title }}</h4>
              <span>{{ blog.isoDate_formated }}</span>
            </header>

            <p 
              v-if="!blog.enclosure" 
              class="item-content">{{ blog.contentSnippet_truncated }}</p>
            <p 
              v-else 
              class="item-content mb-0" 
              style="height: 5px !important;">&nbsp;</p>

            <a 
              :href="blog.link" 
              class="item-link">check the article</a>
          </div>
        </div>
        <div class="space-right"/>
      </div>
    </div>
    <div 
      v-else 
      class="text-danger d-flex justify-content-center py-5">Data is not available.</div>
  </section>
</template>

<script>
export default {
  props: {
    blogData: {
      type: Array,
      default: () => []
    }
  }
};
</script>
