<template>
  <div class="money-line-chart" :id='histogramId' style="width: 100%; height: 100%;">
  </div>
</template>
<script lang='babel'>
  import echarts from 'echarts'

  export default {
    name: 'MoneyLineChart',
    props: ['index', 'contextData'],
    data () {
      return {
        date: [],
        duein: []
      }
    },
    computed: {
      histogramId: function () {
        return 'money-line-' + this.index
      }
    },
    created () {
      for (let k in this.contextData) {
        this.date.push(k)
        this.duein.push(this.contextData[k])
      }
    },
    mounted () {
      var histogram = echarts.init(document.getElementById(this.histogramId))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5',
          right: '5',
          top: '45%',
          bottom: '5',
          containLabel: false
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: this.date
          }
        ],
        yAxis: [
          {
            position: 'top',
            type: 'value',
            scale: true,
            show: false,
            color: 'red',
            min: 0
          }
        ],
        series: [
          {
            name: '盈利销量',
            type: 'line',
            stack: '销量',
            symbolSize: 0,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#addef5'
                }
              }
            },
            areaStyle: {normal: {}},
            data: this.duein
          }
        ],
        color: ['#e8f8ff']
      }

      // 使用刚指定的配置项和数据显示图表。
      histogram.setOption(option)
    }
  }
</script>
<style>
  #histogram {
    /*position: absolute;*/
    /*display: inline-block;*/
    /*margin-top: -10px;*/
    /*margin-left: -300px;*/
    /*width: 360px;*/
    /*height: 210px;*/
  }
</style>
