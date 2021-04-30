<template>
  <li
    ref="notifDropdown"
    :class="{'dropdown': notifications.length}"
    class="nav-item">
    <a
      v-if="!notifications.length"
      class="nav-link nav-muted ml-3 ml-lg-20-px"
      @click.prevent>
      <img
        :src="$assets.iconBell"
        class="header-dropdown-icon"
        alt="Icon Wallet">
    </a>
    <a
      v-else
      href="#"
      class="nav-link dropdown-toggle has-notif ml-3 ml-lg-20-px"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img
        :src="$assets.iconBell"
        class="header-dropdown-icon"
        alt="Icon Bell">
      <span v-if="unreadNotif.length"/>
    </a>
    <div class="dropdown-menu dropdown-md dropdown-md-right dropdown-replace notify">
      <div class="media-items custom">
        <div
          v-for="(item, index) in notifications"
          :key="index"
          class="media">
          <div class="content w-100">
            <span
              v-if="!item.link_to"
              :class="{'text-bold': !item.is_read}">{{ item.message }}</span>
            <a
              v-else
              :href="item.link_to">{{ item.message }}</a>
            <small class="d-block text-right text-black-50 mt-2">{{ item.timezoned }}</small>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Lodash from 'lodash';
import Moment from 'moment-timezone';
import Spark from '~/assets/js/spark';

export default {
  computed: {
    notifications() {
      if (Array.isArray(this.$store.state.notification.notification)) {
        let tz = this.$store.state.notification.notification_tz;

        return Lodash.orderBy(
          JSON.parse(
            JSON.stringify(this.$store.state.notification.notification)
          ),
          ['is_read', 'id'],
          ['asc', 'desc']
        ).map(item => {
          let utc = Moment(item.created_at, 'YYYYMMDDHHmmss').format(
            'YYYY-MM-DD HH:mm:ss'
          );

          let time = tz ? Moment.utc(utc).tz(tz) : Moment.utc(utc);

          item.timezoned = time.format('DD-MM-YYYY HH:mm');

          return item;
        });
      }

      return [];
    },

    unreadNotif() {
      return this.notifications.filter(item => !item.is_read);
    }
  },

  watch: {
    notifications: {
      async handler() {
        await this.$nextTick();

        if (process.client) Spark.generalFunctions();
      },
      deep: true,
      immediate: true
    }
  },

  async mounted() {
    await this.$nextTick();

    $(this.$refs.notifDropdown).on('hidden.bs.dropdown', async () => {
      if (!this.unreadNotif.length) return;

      let ids = this.notifications
        .filter(notif => !notif.is_read)
        .map(notif => notif.id);

      await this.$store.dispatch('readNotification', ids.join(','));

      this.$store.dispatch('forceReadNotif', ids);
    });
  }
};
</script>
