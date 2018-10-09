<template>
  <div class="platform-user-chart" style="width:100%; height:95%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'PlatformUserChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        date: [],
        investorNum: [],
        borrowerNum: [],
        dealerNum: []
      }
    },

    created () {
      for (let i in this.contextData) {
        this.date.push(this.contextData[i].date)
        this.investorNum.push(this.contextData[i].newinvestnum)
        this.borrowerNum.push(this.contextData[i].newlendnum)
        this.dealerNum.push(this.contextData[i].newdealnum)
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.platform-user-chart .chart-canvas'))
      this.chartOption = {
        title: {
          show: true,
          subtext: '新增人数变化值',
          left: '5px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['新增投资人数', '新增借款人数', '新增交易人数'],
          top: '10px',
          right: '5px',
          itemGap: 3
        },
        grid: {
          x: '15%',
          y: '13%',
          width: '80%',
          height: '70%'
        },
        xAxis: {
          data: this.date,
          splitLine: {show: true}
        },
        yAxis: {
          type: 'value',
          position: 'top',
          splitLine: {lineStyle: {type: 'dashed'}},
          splitArea: {show: true}
        },
        color: ['#008080', '#87cecb', '#4682b4'],
        series: [
          {
            name: '新增投资人数',
            type: 'bar',
            stack: 'people',
            barWidth: 10,
            data: this.investorNum
          },
          {
            name: '新增借款人数',
            type: 'bar',
            barWidth: 10,
            stack: 'people',
            data: this.borrowerNum
          },
          {
            name: '新增交易人数',
            type: 'bar',
            barWidth: 10,
            stack: 'allPeople',
            data: this.dealerNum
          }
        ]
      }
      this.chartCanvas.setOption(this.chartOption)
    },

    watch: {
      'contextData': 'updateChart'
    },

    methods: {
      updateChart: function (curVal, oldVal) {
        console.log(this.contextData)
        for (let i in this.contextData) {
          this.date.push(this.contextData[i].date)
          this.investorNum.push(this.contextData[i].newinvestnum)
          this.borrowerNum.push(this.contextData[i].newlendnum)
          this.dealerNum.push(this.contextData[i].newdealnum)
        }

        this.chartOption.xAxis.data = this.date
        this.chartOption.series[0].data = this.investorNum
        this.chartOption.series[1].data = this.borrowerNum
        this.chartOption.series[2].data = this.dealerNum
        this.chartCanvas.setOption(this.chartOption)
      }
    }

  }
</script>