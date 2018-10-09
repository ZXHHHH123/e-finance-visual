<template>
  <div class="daily-channel-user-chart" style="width:100%; height:95%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script lang='babel'>
  import echarts from 'echarts'

  export default {
    name: 'DailyChannelUserChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        date: [],
        fromXH: [],
        fromRecommend: [],
        fromCannel: []
      }
    },

    created () {
      for (let i in this.contextData) {
        this.date.push(this.contextData[i].date)
        this.fromXH.push(this.contextData[i].fromXH)
        this.fromRecommend.push(this.contextData[i].fromRecommend)
        this.fromCannel.push(this.contextData[i].fromCannel)
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.daily-channel-user-chart .chart-canvas'))
      this.chartOption = {
        title: {
          show: true,
          text: '渠道用户导入量',
          textStyle: {
            fontWeight: 300
          },
          top: '2px',
          left: '10px'
        },
        legend: {
          show: true,
          data: ['自然流量', '推荐', '其他渠道'],
          top: '10px',
          right: '5px'
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
          x: 45,
          y: 37,
          width: '94%',
          height: '50%'
        },
        xAxis: {
          data: this.date,
          splitLine: {show: true}
        },
        yAxis: {
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
            formatter: '{value}'
          }
        },
        dataZoom: [
          {
            show: true,
            height: 20,
            bottom: 0,
            start: 90,
            end: 100
          },
          {
            type: 'inside',
            start: 90,
            end: 100
          }
        ],
        series: [
          {
            name: '自然流量',
            type: 'line',
            data: this.fromXH
          }, {
            name: '推荐',
            type: 'line',
            data: this.fromRecommend
          }, {
            name: '其他渠道',
            type: 'line',
            data: this.fromCannel
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
          this.fromXH.push(this.contextData[i].fromXH)
          this.fromRecommend.push(this.contextData[i].fromRecommend)
          this.fromCannel.push(this.contextData[i].fromCannel)
        }

        this.chartOption.xAxis.data = this.date
        this.chartOption.series[0].data = this.fromXH
        this.chartOption.series[1].data = this.fromRecommend
        this.chartOption.series[2].data = this.fromCannel
        this.chartCanvas.setOption(this.chartOption)
      }
    }
  }
</script>