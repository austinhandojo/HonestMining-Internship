import Moment from 'moment';

export default {
  methods: {
    isToday(date) {
      let isSame = Moment(date).isSame(Moment(), 'day');

      if (isSame) return Moment().format('YYYYMMDDHHmmss');

      return false;
    },

    toggleAccordion(index) {
      if (!this.$refs.acc) return;

      this.$refs.acc.forEach((ref, refindex) => {
        if (index === refindex) {
          ref.toggle();
        } else {
          if (ref.$data.collapsed) ref.toggle('close');
        }
      });
    }
  }
};
