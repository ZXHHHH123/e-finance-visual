<template>
  <div class="daily-user-register-chart" style="width:100%; height:95%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script lang='babel'>
  import echarts from 'echarts'

  export default {
    name: 'DailyUserRegisterChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        date: [],
        sum: [],
        quantile: []
      }
    },

    created () {
      for (let i in this.contextData) {
        this.date.push(this.contextData[i].date)
        this.sum.push(this.contextData[i].sum)
        this.quantile.push([
          this.contextData[i].min,
          this.contextData[i].quantile25,
          this.contextData[i].median,
          this.contextData[i].quantile75,
          this.contextData[i].max
        ])
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.daily-user-register-chart .chart-canvas'))
      this.chartOption = {
        legend: {
          show: false,
          data: ['月成交量', '累计成交量'],
          top: '10px',
          right: '5px'
        },
        title: {
          show: false,
          orient: 'vertical',
          subtext: '月用户\n注册量\n变化值',
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
          x: '2%',
          y: 28,
          width: '94%',
          height: '60%'
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
          axisTick: {
            inside: true
          },
          axisLabel: {
            inside: true,
            formatter: '{value}'
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
          axisTick: {
            inside: true
          },
          axisLabel: {
            inside: true,
            formatter: '{value}'
          }
        }],
        dataZoom: [
          {
            show: true,
            top: 8,
            height: 10,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            start: 90,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 20,
            height: '60%',
            showDataShadow: false,
            left: '97%'
          }
        ],
        color: ['#547B95', '#CD6C4A'],
        series: [
          {
            name: '累计成交量',
            type: 'line',
            yAxisIndex: 1,
            data: this.sum
          },
          {
            name: 'boxplot',
            type: 'boxplot',
            data: this.quantile
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
        for (let i in this.contextData) {
          this.date.push(this.contextData[i].date)
          this.sum.push(this.contextData[i].sum)
          this.quantile.push([
            this.contextData[i].min,
            this.contextData[i].quantile25,
            this.contextData[i].median,
            this.contextData[i].quantile75,
            this.contextData[i].max
          ])
        }

        this.chartOption.xAxis.data = this.date
        this.chartOption.series[0].data = this.sum
        this.chartOption.series[1].data = this.quantile
        this.chartCanvas.setOption(this.chartOption)
      }
    }
  }
</script>