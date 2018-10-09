<template>
  <div class="platform-turnover-chart" style="width:100%; height:95%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script lang='babel'>
  import echarts from 'echarts'

  export default {
    name: 'PlatformTurnoverChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        date: [],
        monthturnover: [],
        totalturnover: []
      }
    },

    created () {
      for (let i in this.contextData) {
        this.date.push(this.contextData[i].date)
        this.monthturnover.push(this.contextData[i].monthturnover)
        this.totalturnover.push(this.contextData[i].totalturnover)
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.platform-turnover-chart .chart-canvas'))
      this.chartOption = {
        legend: {
          data: ['月成交量', '累计成交量'],
          top: '10px',
          right: '5px'
        },
        title: {
          show: true,
          subtext: '月成交量和累计成交量变化值',
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
          width: '75%',
          height: '70%'
        },
        xAxis: {
          data: this.date,
          splitLine: {show: true}
        },
        yAxis: [{
          type: 'value',
          scale: true,
          min: 0,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          splitArea: {show: true},
          axisLabel: {
            formatter: '{value} 万元'
          }
        }, {
          type: 'value',
          scale: true,
          min: 0,
          splitNumber: 4,
          boundaryGap: [0.01, 0.01],
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed'
            }
          },
          // splitArea: {show: true},
          axisLabel: {
            formatter: '{value} 亿元'
          }
        }],
        color: ['#547B95', '#CD6C4A'],
        series: [{
          name: '月成交量',
          type: 'bar',
          barWidth: '50%',
          yAxisIndex: 0,
          itemStyle: {
            emphasis: {
              barBorderWidth: 1,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          },
          data: this.monthturnover
        }, {
          name: '累计成交量',
          type: 'line',
          yAxisIndex: 1,
          data: this.totalturnover
        }]
      }
      this.chartCanvas.setOption(this.chartOption)
    },

    watch: {
      'contextData': 'updateChart'
    },

    methods: {
      updateChart: function (curVal, oldVal) {
        for (let i in this.contextData) {
          this.date.push(this.contextData[i].date)
          this.monthturnover.push(this.contextData[i].monthturnover)
          this.totalturnover.push(this.contextData[i].totalturnover)
        }

        this.chartOption.xAxis.data = this.date
        this.chartOption.series[0].data = this.monthturnover
        this.chartOption.series[1].data = this.totalturnover
        this.chartCanvas.setOption(this.chartOption)
      }
    }
  }
</script>