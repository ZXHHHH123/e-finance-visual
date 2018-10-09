<template>
  <div id='loanRate' style="width: 100%; height: 100%;"></div>
</template>
<script lang='babel'>
  import echarts from 'echarts'
  export default {
    name: '',
    props: ['contextData'],
    data () {
      return {
        itemStyle: {
          emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        },
        month: [],
        mValue: [],
        cValue: []
      }
    },
    mounted () {
      this.chartCanvas = echarts.init(document.getElementById('loanRate'))
      this.chartOption = {
        legend: {
          data: ['平均借款期限', '综合利率'],
          top: '15%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          },
          padding: [5, -10],
          extraCssText: 'height: 80px;'
        },
        grid: [
          {x: '27%', y: '35%', width: '46%', height: '45%'}
        ],
        xAxis: {
          data: []
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
          axisLabel: {
            formatter: '{value} 个月'
          }
        }, {
          type: 'value',
          scale: true,
          min: 0,
          splitNumber: 4,
          boundaryGap: [0.01, 0.01],
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value} 利率'
          }
        }],
        color: ['#547B95', '#CD6C4A'],
        series: [{
          name: '平均借款期限',
          type: 'bar',
          yAxisIndex: 0,
          itemStyle: this.itemStyle,
          data: []
        }, {
          name: '综合利率',
          type: 'line',
          yAxisIndex: 1,
          data: []
        }]
      }
      // this.chartCanvas.setOption(this.chartOption)
    },
    watch: {
      contextData: function (curValue, oldValue) {
        let arr = []
        for (let key in curValue) {
          arr.push(key)
        }
        arr.sort(function (a, b) {
          return a - b
        })
        for (let i = 0, len = arr.length; i < len; i++) {
          let loanperiod = 0
          let interestrate = 0
          // console.log(this.getMonth)
          this.month.push(this.getMonth(arr[i]))
          // console.log(arr)
          for (var j = 0, len2 = curValue[arr[i]].length; j < len2; j++) {
            // console.log(curValue[arr[i]][j], i, j, len2, arr[i].length)
            let value1 = parseFloat(curValue[arr[i]][j].loanperiod)
            let value2 = parseFloat(curValue[arr[i]][j].interestrate)
            if (!isNaN(value1)) {
              loanperiod += value1
            }
            if (!isNaN(value2)) {
              interestrate += value2
            }
          }
          this.mValue.push(loanperiod / len2)
          this.cValue.push(interestrate / len2)
        }
        this.update()
      }
    },
    methods: {
      update () {
        this.chartOption.xAxis.data = this.month
        this.chartOption.series[0].data = this.mValue
        this.chartOption.series[1].data = this.cValue
        this.chartOption.series[0].barWidth = this.mValue.length / 10 * 100 + '%'
        this.chartCanvas.setOption(this.chartOption)
      },
      getMonth (time) {
        var match = []
        match = time.match(/[0-9]+/g)
        if (parseInt(match[1]) < 10 && parseInt(match[1]) > 0) {
          match[1] = '0' + match[1]
        }
        // console.log(match)
        return match[1]
      }
    }
  }
</script>