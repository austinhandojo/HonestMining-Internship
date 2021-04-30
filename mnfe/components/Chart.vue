<script>
import { Doughnut } from 'vue-chartjs'
import { mapGetters, mapActions } from 'vuex'
export default {
  extends: Doughnut,
  data () {
    return {
      dataChart: [],
      labelsName: [],
      atrChart: {
        backgroundColor: [],
        data: [],
        borderWidth: 0,
        hoverBorderWidth: 0,
      }
    }
  },
  computed: mapGetters({
    chart_performance: 'chart_performance',
  }),
  async mounted () {
    // console.log('print chart', this.$store.state.chart_performance.chart_performance)
    await this.fetchListChart()
    console.log('data chart: ',this.chart_performance)
    this.dataChart = this.chart_performance
    for(let i = 0; i < this.dataChart.length; i++) {
      this.labelsName.push(this.dataChart[i].name)
      this.atrChart.data.push(parseFloat(this.dataChart[i].persentage).toFixed(2))
      if(this.dataChart[i].name === 'Dash') {
        this.atrChart.backgroundColor.push('#195FAE')
      } else if(this.dataChart[i].name === 'Smartcash') {
        this.atrChart.backgroundColor.push('#FFC725')
      } else if(this.dataChart[i].name === 'Zcoin') {
       this.atrChart.backgroundColor.push('#23B852')
      } else {
        this.atrChart.backgroundColor.push('#03a2de')
      }
      // console.log(this.dataChart[i].name)
    }
    this.renderChart({
      labels: this.labelsName,
      datasets: [this.atrChart],
      options: {
        // cutoutPercentage: 0,
        // rotation: -3.1415926535898,
        // circumference: 3.1415926535898,
      }
    }, {responsive: true, maintainAspectRatio: false})
    
    // // Overwriting base render method with actual data.
  },
  // async created () {
  //   await this.fetchListChart()
  //   this.dataChart = this.chart_performance
  //   for(let i = 0; i < this.dataChart.length; i++) {
  //     this.labelsName.push(this.dataChart[i].name)
  //     this.atrChart.data.push(this.dataChart[i].persentage)
  //     console.log(this.dataChart[i].name)
  //   }
  //   console.log('haha', this.labelsName)
  // },
  methods: {
    ...mapActions({
      fetchListChart: 'fetchListChart',
    })
  }
}
</script>