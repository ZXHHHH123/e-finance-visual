<template>
  <div id="contrstPieChart1" style="width: 100%; height: 100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: '',
  props: ['contextData'],
  data () {
    return {
      timelineData: [],
      name: [],
      canvasData: [],
      chartCanvas: null,
      chartOption: {}
    }
  },
  mounted: function () {
    this.chartCanvas = echarts.init(document.getElementById('contrstPieChart1'))
    this.chartOption = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 1000,
          symbolSize: 10,
          left: '3%',
          right: '3%',
          orient: 'horizontal',
          lineStyle: {
            color: '#0072ec',
            type: 'dashed',
            width: '1'
          },
          controlStyle: {
            position: 'left',
            normal: {
              color: '#0072ec',
              borderColor: '#0072ec'
            },
            emphasis: {
              borderColor: '#0072ec'
            }
          },
          checkpointStyle: {
            color: '#0072ec',
            borderColor: '#66b3ff',
            borderWidth: 2
          },
          itemStyle: {
            emphasis: {
              color: '#0072ec',
              borderWidth: 2
            },
            normal: {
              color: '#0072ec'
            }
          },
          data: [],
          label: {
            formatter: function (s) {
              return (new Date(s)).getFullYear()
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          extraCssText: 'height: 50px; width: 180px; text-align: center;'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: '15%',
          padding: 0,
          data: []
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: [0, '30%'],
          center: ['50%', '50%'],
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      options: []
    }
    // this.update()
  },
  watch: {
    contextData: function (curValue, oldValue) {
      var _this = this
      var arr = []
      var off = true  // 判断是否为对象中的第一个属性
      this.timelineData = []
      this.name = []
      this.canvasData = []
      for (let key in curValue) {
        arr.push(key)
      }
      arr.sort(function (a, b) {
        return a - b
      })
      console.log('arr: ', arr)
      for (let i = 0, len = arr.length; i < len; i++) {
        let keyValue = []
        this.timelineData.push({
          value: _this.getTime(arr[i]),
          tooltip: {
            formatter: arr[i]
          }
        })
        for (let j = 0, len = curValue[arr[i]].length; j < len; j++) {
          if (off) {
            this.name.push(curValue[arr[i]][j].name)
          }
          keyValue.push({
            name: curValue[arr[i]][j].name,
            value: curValue[arr[i]][j].duein
          })
        }
        off = false
        this.canvasData.push(keyValue)
      }
      this.update(this.chartCanvas, this.chartOption)
    }
  },
  methods: {
    update (chartCanvas, chartOption) {
      var _this = this
      chartOption.baseOption.timeline.data = this.timelineData
      chartOption.baseOption.legend.data = this.name
      for (let i = 0, len = this.canvasData.length; i < len; i++) {
        chartOption.options.push({
          series: [{
            data: _this.canvasData[i]
          }]
        })
      }
      // this.chartOption.options[0].series[0].data = this.canvasData[0]
      chartCanvas.setOption(chartOption)
      // console.log('setted!')
    },
    getTime (time) {
      var match = []
      match = time.match(/[0-9]+/g)
      if (parseInt(match[1]) < 10 && parseInt(match[1]) > 0) {
        match[1] = '0' + match[1]
      }
      // console.log(match)
      return match[0] + match[1]
    }
  }
}
</script>