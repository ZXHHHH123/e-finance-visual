<template>
	<div id="moneyChange" style="width:100%; height: 100%;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: '',
  props: ['contextData'],
  data () {
    return {
      month: [],
      value: [],
      chartCanvas: null,
      chartOption: {},
      name: [],
      canvasData: []
    }
  },
  mounted () {
    this.chartCanvas = echarts.init(document.getElementById('moneyChange'))
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        extraCssText: 'height: 50px;'
      },
      grid: {
        top: '10%',
        bottom: 5
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
        data: ['你我贷', '拍拍贷', '联邦创投', '小九金服', '稳贷网']
      },
      series: [
        {
          name: '现金流变化',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              formatter: '{b}'
            }
          },
          data: []
        }
      ]
    }
  },
  watch: {
    contextData: function (curValue, oldValue) {
      var arr = []
      var off = true  // 判断是否为对象中的第一个属性
      this.name = []
      this.canvasData = []
      for (let key in curValue) {
        arr.push(key)
      }
      arr.sort(function (a, b) {
        return a - b
      })
      for (let i = 0, len = arr.length; i < len; i++) {
        let sum = 0
        for (var j = 0, len2 = curValue[arr[i]].length; j < len2; j++) {
          if (off) {
            this.name.push(curValue[arr[i]][j].name)
          }
          if (!isNaN(parseFloat(curValue[arr[i]][j].cashflow))) {
            sum += parseFloat(curValue[arr[i]][j].cashflow)
            // console.log(parseFloat(curValue[arr[i]][j].cashflow))
          }
        }
        off = false
        // console.log('sum: ', sum)
        this.canvasData.push(sum / len2)
      }
      this.update()
    }
  },
  methods: {
    update () {
      var _this = this
      console.log(this.name, this.canvasData)
      this.chartOption.yAxis.data = this.name
      for (let i = 0, len = this.canvasData.length; i < len; i++) {
        this.chartOption.series[0].data.push({
          value: _this.canvasData[i]
        })
      }
      console.log(this.chartOption.series[0])
      this.chartOption.series[0].barWidth = this.canvasData.length / 20 * 100 + '%'
      // this.chartOption.options[0].series[0].data = this.canvasData[0]
      this.chartCanvas.setOption(this.chartOption)
      // console.log('setted!')
    }
  }
}
</script>