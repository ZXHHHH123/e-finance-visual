<template>
  <div class="channel-effect-chart" style="width:100%; height:95%;">
    <div class="chart-canvas" style="width:100%; height:100%;"></div>
  </div>
</template>

<script lang='babel'>
  import echarts from 'echarts'
  import 'echarts/theme/shine'

  export default {
    name: 'ChannelEffectChart',
    props: ['contextData'],

    data () {
      return {
        chartCanvas: null,
        chartOption: {},

        nodes: [],
        links: []
      }
    },

    created () {
      if (this.contextData.length !== 0) {
        this.nodes = this.contextData.nodes
        this.links = this.contextData.links
      }
    },

    mounted () {
      this.chartCanvas = echarts.init(document.querySelector('.channel-effect-chart .chart-canvas'), 'shine')
      console.log('init option')
      this.chartOption = {
        title: {
          text: '渠道用户转化情况',
          textStyle: {
            fontWeight: 300
          },
          top: '15px',
          left: '10px'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            layout: 'none',
            data: this.nodes,
            links: this.links,
            left: '5%',
            right: '12%',
            top: '10%',
            bottom: 10,
            nodeWidth: 25,
            // layoutIterations: 32,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#aaa'
              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0.5
              }
            }
          }
        ]
      }
      if (this.nodes.length !== 0 && this.links !== 0) {
        this.chartCanvas.setOption(this.chartOption)
      }
    },

    watch: {
      'contextData': 'updateChart'
    },

    methods: {
      updateChart: function (curVal, oldVal) {
        this.nodes = this.contextData.nodes
        this.links = this.contextData.links

        this.chartOption.series[0].data = this.nodes
        this.chartOption.series[0].links = this.links
        this.chartCanvas.setOption(this.chartOption)
      }
    }
  }
</script>