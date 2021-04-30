<template>
  <div class="bg-ocean p-20 mb-20">
    <div class="mb-5 mt-10">{{ title }}</div>
    <div class="color-red mb-10 font-40 height-40 line-height-1">
      <div id="timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { MASTER_NODE_BOOKING_SESSION_EXPIRED } from '../utils/Messages';

  export default {
    name: 'CountDown',
    props : {
      data : {
        type : Number,
        default : 0
      },
      start : {
        type : Boolean,
        default: false
      },
      stop : {
        type : Boolean,
        default: false
      },
      reset : {
        type : Boolean,
        default: false
      }
    },
    data() {
      return {
        timer: null,
        totalTime: (this.data),
        resetButton: false,
        title: "Your booked seats will be cancelled in:"
      }
    },
    computed: {
      minutes: function() {
        const minutes = Math.floor(this.totalTime / 60);
        return this.padTime(minutes);
      },
      seconds: function() {
        const seconds = this.totalTime - (this.minutes * 60);
        return this.padTime(seconds);
      }
    },

    created() {
      if (this.start) this.startTimer()
    },

    methods: {
    startTimer: function() {
        this.timer = setInterval(() => this.countdown(), 1000);
      },
      stopTimer: function() {
        clearInterval(this.timer);
        this.timer = null;
      },
      resetTimer: function() {
        this.totalTime = (0);
        clearInterval(this.timer);
        this.timer = null;
        this.$emit('timeInterface', this.totalTime);
      },
      padTime: function(time) {
        return (time < 10 ? '0' : '') + time;
      },
      countdown: function() {
        if(this.totalTime >= 1){
          this.totalTime--;
        } else{
          this.totalTime = 0;
          this.resetTimer()
        }
      }
    },
  }
</script>
