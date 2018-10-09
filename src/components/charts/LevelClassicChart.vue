<template>
  <div class="level-classic-chart" :id='histogramId' style="width: 100%; height: 100%;">
  </div>
</template>
<script lang='babel'>
  import echarts from 'echarts'

  export default {
    name: 'LevelClassicChart',
    props: ['index', 'number', 'total', 'color'],
    data () {
      return {
      }
    },
    computed: {
      histogramId: function () {
        return 'lcchart' + this.index
      }
    },
    mounted () {
      var histogram = echarts.init(document.getElementById(this.histogramId))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '同一等级下数量',
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: this.number,
                name: '数量占比',
                itemStyle: {normal: {color: this.color}}
              },
              {value: this.total - this.number,
                name: '其他',
                itemStyle: {normal: {color: '#eeeeee'}}
              }
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      histogram.setOption(option)
    }
  }
</script>
<style>
  #histogram {




  }
</style>
