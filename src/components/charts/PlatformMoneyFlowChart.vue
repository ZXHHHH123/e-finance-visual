<template>
  <div class="platform-moneyflow-chart" style="width:100%; height:95%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script lang='babel'>
  import echarts from 'echarts'

  export default {
    name: 'PlatformMoneyflowChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        date: [],
        moneyflow: []
      }
    },

    created () {
      var labelRight = {
        normal: {
          position: 'right'
        }
      }

      for (let i in this.contextData) {
        this.date.push(this.contextData[i].date)
        this.moneyflow.push({
          value: this.contextData[i].cashflow,
          label: labelRight
        })
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.platform-moneyflow-chart .chart-canvas'))
      this.chartOption = {
        legend: {
          data: ['现金流'],
          top: '10px',
          right: '5px'
        },
        title: {
          show: true,
          subtext: '平台现金流变化值',
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
        grid: {
          x: '15%',
          y: '13%',
          width: '80%',
          height: '70%'
        },
        xAxis: {
          type: 'category',
          splitLine: {show: true},
          axisLabel: {
            formatter: '{value}'
          },
          data: this.date
        },
        yAxis: {
          type: 'value',
          position: 'top',
          splitLine: {lineStyle: {type: 'dashed'}},
          splitArea: {show: true},
          axisLabel: {
            formatter: '{value} 亿'
          }
        },
        color: ['#547B95'],
        series: [
          {
            name: '现金流',
            type: 'bar',
            stack: '总量',
            barWidth: '50%',
            label: {
              normal: {
                show: false
              }
            },
            data: this.moneyflow
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
        var labelRight = {
          normal: {
            position: 'right'
          }
        }

        for (let i in this.contextData) {
          this.date.push(this.contextData[i].date)
          this.moneyflow.push({
            value: this.contextData[i].cashflow,
            label: labelRight
          })
        }

        this.chartOption.xAxis.data = this.date
        this.chartOption.series[0].data = this.moneyflow
        this.chartCanvas.setOption(this.chartOption)
      }
    }
  }
</script>

<style>
  #histogram {
    width: 1000px;
    height: 500px;
  }
</style>