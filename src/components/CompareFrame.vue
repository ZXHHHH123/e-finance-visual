<template>
  <div class="compare">
    <div class="compareTable">
      <b-container>
          <b-row>
            <b-col cols="12">
              <b-table hover :items="online_basic_data"></b-table>
            </b-col>
          </b-row>
      </b-container>
    </div>
    <div class="compareChart">
      <b-container class="compare-chart">
        <b-row>
          <b-col cols="12">
            <div class="compare_title"><span class="chineseText">累计成交额变化</span></div>
          </b-col>
        </b-row>
        <b-row class="full-height">
          <b-col cols="12">
            <compare-pie1 :contextData="online_report_data"></compare-pie1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <div class="compare_title"><span class="chineseText">月成交量变化</span></div>
          </b-col>
          <b-col cols="6">
            <div class="compare_title"><span class="chineseText">总待收变化</span></div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <compare-pie2 :contextData="online_report_data"></compare-pie2>
          </b-col>
          <b-col cols="6">
            <compare-pie3 :contextData="online_report_data"></compare-pie3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <div class="compare_title"><span class="chineseText">现金流变化</span></div>
          </b-col>
          <b-col cols="6">
            <div class="compare_title"><span class="chineseText">借款期限及综合利率变化</span></div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <compare-columnar1 :contextData="online_report_data"></compare-columnar1>
          </b-col>
          <b-col cols="6">
            <compare-columnar2 :contextData="online_report_data"></compare-columnar2>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { get as axiosGet } from '../util/axios-get'

import comparePie1 from './charts/compareChartPie_1.vue'
import comparePie2 from './charts/compareChartPie_2.vue'
import comparePie3 from './charts/compareChartPie_3.vue'
import compareColumnar1 from './charts/compareChartColumnar_1.vue'
import compareColumnar2 from './charts/compareChartColumnar_2.vue'

export default {
  name: 'compare',
  components: {
    comparePie1,
    comparePie2,
    comparePie3,
    compareColumnar1,
    compareColumnar2
  },
  data () {
    return {
      online_basic_data: [],
      online_report_data: {},
      chart1Data: [],
      chart2Data: [],
      chart3Data: [],
      chart4Data: [],
      chart5Data: [],
      pids: []
    }
  },
  created () {
    // console.log('created')
    var _this = this
    this.pids = JSON.parse(this.$route.params.compareIds)
    console.log(this.pids)
    axiosGet('/platform_comparison_info?pidArr=' + JSON.stringify(this.pids))
      .then((res) => {
        console.log(res)
        // _this.setItems(res.basicdatas)
        _this.online_basic_data = res.basicdatas
        _this.online_report_data = res.reports
      })
  },
  methods: {
    setItems (data) {
      // 过滤table数据
      this.online_basic_data.push({
        '平台': data.name,
        '评级': data.level,
        '经营类型': data.type,
        '公司背景': data.background,
        '团队类型': data.team,
        '上市时间': data.time,
        '公司地址': data.address
      })
    }
  }
}
</script>

<style scoped>
  .compare {
    margin-bottom: 30px;
  }
  .compareTable {
    padding-top: 10px;
  }
  .compareTable .row {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 0px 1px 1px #ccc;
  }
  .compareChart {
    margin-top: 40px;
  }
  .compareChart .compare-chart {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 0px 1px 1px #ccc;
  }
  .compare-chart .row:nth-child(even) {
    height: 400px;
  }
  .compare_title {
    text-align: left;
    height: 62px;
    width: 100%;
    padding-top: 30px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 8px;
  }
  .compare_title .chineseText {
    font-size: 16px;
    font-weight: 600;
    color: #202020;
    margin-right: 6px;
    position: relative;
  }
  .compare_title .chineseText::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -13px;
    background-color: #eb5a04;
    left: 0;
  }
</style>