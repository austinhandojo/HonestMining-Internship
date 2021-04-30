<template>
  <div>
    <splash :show="$global.splash"/>

    <header>
      <div class="container-fluid">
        <a href="/">
          <img
            :src="$assets.logoWhite"
            :srcset="`${ $assets.logoWhite_2x } 2x`"
            alt>
        </a>
        <h2>Documentation</h2>
      </div>
    </header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <div
            v-for="(group, index) in groups"
            :key="index"
            class="menu-group">
            <h5 class="text-uppercase">{{ group.label }}</h5>
            <ul class="list-unstyled">
              <li
                v-for="(menu, index) in group.menus"
                :key="index">
                <nuxt-link
                  :to="menu.route"
                  exact>{{ menu.label }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-10"
          style="margin-top: -56px;">
          <div class="card card-v2 card-default box mb-20">
            <div class="card-heading">
              <h3 class="card-title text-uppercase">{{ page.title }}</h3>
            </div>

            <div class="card-body">
              <nuxt/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="~/node_modules/highlight.js/styles/androidstudio.css"></style>

<script>
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

export default {
  head() {
    return {
      title: 'Documentation - Honest Mining'
    };
  },

  data() {
    return {
      groups: [
        {
          label: 'Template',
          menus: [
            {
              label: 'Button',
              route: '/docs/button'
            },
            {
              label: 'Form',
              route: '/docs/form'
            },
            {
              label: 'Card',
              route: '/docs/card'
            }
          ]
        },
        {
          label: 'Component',
          menus: [
            {
              label: 'Table',
              route: '/docs/table'
            },
            {
              label: 'Modal',
              route: '/docs/modal'
            },
            {
              label: 'Spinner',
              route: '/docs/spinner'
            },
            {
              label: 'Page',
              route: '/docs/page'
            },
            {
              label: 'Alert',
              route: '/docs/alert'
            },
            {
              label: 'Tooltip',
              route: '/docs/tooltip'
            }
          ]
        },
        {
          label: 'Feature',
          menus: [
            {
              label: 'Notification',
              route: '/docs/notification'
            },
            {
              label: 'Splash',
              route: '/docs/splash'
            },
            {
              label: 'Redirect',
              route: '/docs/redirect'
            },
            {
              label: 'Images',
              route: '/docs/images'
            },
            {
              label: 'Icons',
              route: '/docs/icons'
            }
          ]
        },
        {
          label: 'Widget',
          menus: [
            {
              label: 'Wallet',
              route: '/docs/wallet'
            },
            {
              label: 'Banner',
              route: '/docs/banner'
            }
          ]
        },
        {
          label: 'Helper',
          menus: [
            {
              label: 'Filters',
              route: '/docs/filter'
            },
            {
              label: 'Lodash',
              route: '/docs/lodash'
            }
          ]
        },
        {
          label: 'Standard',
          menus: [
            {
              label: 'Style',
              route: '/docs/style'
            },
            {
              label: 'Request',
              route: '/docs/request'
            }
          ]
        }
      ],
      page: {
        title: ''
      }
    };
  },

  created() {
    if (!this.$nuxt.$options.context.isDev) this.$router.push('/page-404');

    this.$root.$on('page-docs::updated', page => {
      this.page = { ...this.page, ...page };
    });
  },

  async mounted() {
    await this.$nextTick();

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('xml', xml);

    hljs.initHighlightingOnLoad();

    this.$store.dispatch('global/toggleSplash', false);
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/revs/_variables.scss';

header {
  background-color: $color-primary;

  img {
    margin: 40px 0 24px;
    height: 50px;
  }

  h2 {
    padding: 0;
    margin: 0;
    font-size: 30px;
    font-weight: 300;
    color: white;
    padding-bottom: 80px;
  }
}

.container-fluid {
  width: 95%;
}

.menu-group {
  margin-bottom: 30px;

  &:first-child {
    margin-top: 20px;
  }

  ul {
    margin-left: 10px;
  }
}
</style>

<style lang="scss">
code {
  color: magenta;
}
</style>




