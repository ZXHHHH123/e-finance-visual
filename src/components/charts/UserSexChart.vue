<template>
  <div class="user-sex-chart" style="width:100%; height:100%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script lang='babel'>
  import echarts from 'echarts'
  import 'echarts/theme/macarons'

  export default {
    name: 'UserSexChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        legendData: [],
        values: []
      }
    },

    created () {
      for (let i in this.contextData) {
        this.legendData.push(this.contextData[i].name)
        this.values.push({
          value: this.contextData[i].value,
          name: this.contextData[i].name
        })
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.user-sex-chart .chart-canvas'), 'macarons')
      this.chartOption = {
        title: {
          text: '星火钱包用户性别分布',
          subtext: '数据来源星火钱包',
          textStyle: {
            color: '#333333'
          },
          top: '10px',
          left: '10px'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          right: '10px',
          top: '40px',
          data: this.legendData
        },
        series: [
          {
            name: '用户性别分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.values,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
          this.legendData.push(this.contextData[i].name)
          this.values.push({
            value: this.contextData[i].value,
            name: this.contextData[i].name
          })
        }

        this.chartOption.legend.data = this.legendData
        this.chartOption.series[0].data = this.values
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