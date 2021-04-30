<template>
  <div class="panel card-default box mb-20 card-dashboard-6 no-border">
    <div class="card-heading">
      <h3 class="card-title">Honest Mining Information</h3>
    </div>
    <div class="card-body">
      <div
        v-if="chartFetching"
        class="dashboard-hminfo-loader justify-content-center align-items-center"
        style="height: 319px;"
      >
        <cube-spinner-v2 size="small"/>
      </div>

      <div 
        v-if="!chartFetching && chart.length" 
        class="dashboard-hminfo-chart">
        <canvas 
          id="chart" 
          ref="chart" 
          width="300" 
          height="300"/>
      </div>

      <div
        v-if="!chartFetching && !chart.length"
        class="dashboard-hminfo-error d-flex justify-content-center align-items-center"
        style="height: 319px; padding: 0 20px;"
      >
        <fetch-error
          :action="false"
          type="warning"
          message="Chart data is not available right now."
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChartJS from 'chart.js';
import globalComponents from '~/utils/GlobalComponents';

export default {
  mixins: [globalComponents],

  data() {
    return {
      chartFetching: false
    };
  },

  computed: {
    chart() {
      return JSON.parse(
        JSON.stringify(this.$store.state.chart_performance.chart_performance)
      );
    }
  },

  created() {
    this.$options.chart;

    if (!Array.isArray(this.chart)) this.chartFetching = true;

    this.$store.dispatch('fetchListChart').then(async () => {
      this.chartFetching = false;

      if (!process.client) return;

      await this.$nextTick();

      this.$options.chart = this.generateChart();
    });
  },

  methods: {
    generateChart() {
      if (this.$options.chart) this.$options.chart.destroy();

      let data = {
        datasets: [{ data: [], backgroundColor: [] }],
        labels: []
      };

      if (!this.chart) return;

      this.chart.forEach(item => {
        data.datasets[0].data.push(parseFloat(item.persentage));
        data.datasets[0].backgroundColor.push(item.chart_color);
        data.labels.push(item.name);
      });

      let chart = new ChartJS(this.$refs.chart, {
        type: 'doughnut',
        data: data,
        options: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10
            }
          },
          animation: {
            easing: 'easeInOutExpo'
          }
        }
      });

      return chart;
    }
  }
};
</script>
