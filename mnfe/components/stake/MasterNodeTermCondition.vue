<template>
  <div>
    <div class="bg-ocean p-20 mb-20">
      <div class="font-bold mb-5">{{ title }}</div>
      <div class="color-black-min">
        <ul>
          <li>You will be able to exit from this Masternode after receiving <strong>{{ min_reward_count_to_exit }} Masternode Reward Distributions</strong>.</li>
          <li>There are
          <strong>{{ fee_text }}</strong> from each Masternode Reward Distribution.</li>
          <li>There is <strong>no fee</strong> for joining or exiting Masternode.</li>
          <li>By joining this Masternode you agree to our
            <a
              href="/tos"
              class="font-500"
              target="_blank"
          ><strong>Terms of Service</strong></a>.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  const TITLE_INSTANT = 'Instant Masternode Terms';
  const TITLE_SHARED = 'Shared Masternode Terms';
  const TYPE_INSTANT = 'instant';
  const TYPE_SHARED = 'shared';

  export default {
    name: 'MasterNodeTermCondition',
    props: {
      data: {
        type: Object,
        default: () => {}
      },
      type: {
        type: String,
        default: () => 'instant'
      },
    },

    computed: {
      /**
       *
       * @return {string}
       */
      title: function() {
        return this.type === TYPE_INSTANT ? TITLE_INSTANT : TITLE_SHARED
      },
      /**
       *
       * @return {number}
       */
      min_reward_count_to_exit: function() {
        let { min_rewardcount_to_exit } = this.data;
        return min_rewardcount_to_exit ? min_rewardcount_to_exit : 0
      },
      /**
       *
       * @return {number}
       */
      fee_text: function() {
        let { fee_text } = this.data;
        return fee_text ? fee_text : ''
      }
    }

  }
</script>
