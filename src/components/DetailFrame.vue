<template>
  <div class="detail">
    <div class="detail-panel">
      <b-container>
        <b-row class="text-center full-height" style="height: 260px">
            <b-col cols="8">
              <div class="date">
                <div class="date-title" style="margin: 20px 20px 0px">
                  <h2>
                    <span class="date-name" style="margin-top: 0px">平台</span>
                    <span class="date-number">{{platformName}}</span>
                  </h2>
                  <p :class="platformClassBadge"> {{platformClass}}评级 </p>
                </div>
                <ul class="date-list clearfix">
                  <li class="float-start">
                    <h6>经营类型</h6>
                    <p><span>{{platformType}}</span></p>
                    <div class="progress">
                        <div class="progress-bar badge-level level0" style="width:100%"></div>
                    </div>
                  </li>
                  <li class="float-end">
                    <h6>公司背景</h6>
                    <p><span id="o2_data">{{platformBG}}</span></p>
                    <div class="progress">
                        <div class="progress-bar badge-level level0" style="width:100%"></div>
                    </div>
                  </li>
                  <li class="float-start">
                    <h6>团队类型</h6>
                    <p><span id="KMnO4_data">{{platformTeam}}</span></p>
                    <div class="progress">
                        <div class="progress-bar badge-level level0" style="width:100%"></div>
                    </div>
                  </li>
                  <li class="float-end">
                    <h6>公司地址</h6>
                    <p><span id="NHN_data">{{platformAddress}}</span></p>
                    <div class="progress">
                        <div class="progress-bar badge-level level0" style="width:100%"></div>
                    </div>
                  </li>
                  <li class="float-start" style="width: 330px">
                    <h6>上市时间</h6>
                    <p><span id="Pb_data">{{platformTimeYear}}</span>年<span id="Pb_data">{{platformTimeMonth}}</span>月<span id="Pb_data">{{platformTimeDay}}</span>日</p>
                    <div class="progress">
                        <div class="progress-bar badge-level level0" style="width:100%"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </b-col>
            <b-col class="no-right-padding">
              <div class="map-panel">
                <map-canvas ref="MapCanvas" style="height: 220px;" :mapType="'single'"/>
              </div>
            </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="detail-panel" style="margin-bottom: 30px; padding-bottom: 30px;">
      <b-container>
        <b-row class="text-center full-height" style="height: 260px">
          <div class="company_title_box"><span class="chineseText">平台产品</span></div>
        </b-row>
      </b-container>
    </div>
    <div class="detail-panel" style="margin-bottom: 30px; padding-bottom: 30px;">
      <b-container  style="padding: 0px;">
        <b-row class="text-center full-height" style="height: 400px">
          <b-col cols="6">
            <div class="company_title_box"><span class="chineseText">平台成交量</span></div>
            <platform-turnover-chart :contextData="online_report_data"></platform-turnover-chart>
          </b-col>
          <b-col>
            <div class="company_title_box"><span class="chineseText">平台总待收</span></div>
            <platform-duein-chart :contextData="online_report_data"></platform-duein-chart>
          </b-col>
        </b-row>
        <b-row class="text-center full-height" style="height: 400px">
          <b-col cols="6">
            <div class="company_title_box"><span class="chineseText">平台现金流</span></div>
            <platform-moneyflow-chart :contextData="online_report_data"></platform-moneyflow-chart>
          </b-col>
          <b-col>
            <div class="company_title_box"><span class="chineseText">平台新增人数</span></div>
            <platform-user-chart :contextData="online_report_data"></platform-user-chart>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { get as axiosGet } from '../util/axios-get'
import { level2num } from '../util/level-util'

import MapCanvas from '@/components/MapCanvas.vue'
import PlatformTurnoverChart from '@/components/charts/PlatformTurnoverChart.vue'
import PlatformDueinChart from '@/components/charts/PlatformDueinChart.vue'
import PlatformMoneyflowChart from '@/components/charts/PlatformMoneyFlowChart.vue'
import PlatformUserChart from '@/components/charts/PlatformUserChart.vue'

export default {
  name: 'DetailFrame',
  components: {
    MapCanvas,
    PlatformTurnoverChart,
    PlatformDueinChart,
    PlatformMoneyflowChart,
    PlatformUserChart
  },
  data () {
    return {
      online_basic_data: [],
      online_object_data: [],
      online_report_data: [],

      platformName: 'Loading...',
      platformClass: '... ',
      platformClassBadge: 'badge-level levela',
      platformType: 'Loading...',
      platformBG: 'Loading...',
      platformTeam: 'Loading...',
      platformAddress: 'Loading...',
      platformTimeYear: '2000',
      platformTimeMonth: '00',
      platformTimeDay: '00'
    }
  },

  created () {
    let _this = this
    axiosGet('/platform_complete_info?pid=' + this.$route.params.platformId)
      .then(res => {
        console.log(res.basicdata, res.objects, res.reports)
        _this.online_basic_data = res.basicdata
        _this.online_object_data = res.objects
        _this.online_report_data = res.reports
        _this.update(_this.online_basic_data)
      })
  },
  methods: {
    update: function (_data) {
      this.platformName = _data['name']
      this.platformClass = _data['level']
      this.platformClassBadge = 'badge-level level' + _data['level'].charAt(0).toLowerCase()
      this.platformType = _data['type']
      this.platformBG = _data['background']
      this.platformTeam = _data['team']
      this.platformAddress = _data['address']

      var _time = _data['time']
      var _times = _time.split('-')
      this.platformTimeYear = _times[0]
      this.platformTimeMonth = _times[1]
      this.platformTimeDay = _times[2]

      var seriesData = [[], [], [], []]
      var targetList = []
      if (_data['level'].charAt(0) === 'A') {
        targetList = seriesData[0]
      } else if (_data['level'].charAt(1) === 'B') {
        targetList = seriesData[1]
      } else if (_data['level'].charAt(2) === 'B') {
        targetList = seriesData[2]
      } else if (_data['level'].charAt(3) === 'B') {
        targetList = seriesData[3]
      }
      targetList.push({
        pid: _data['id'],
        name: _data['name'],
        value: _data['position'].concat(level2num(_data['level']))
      })
      this.$refs.MapCanvas.setViewport(_data['position'], 14)
      this.$refs.MapCanvas.setSeriesData(seriesData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail-panel {
    border: 1px solid #e0e0e0; 
    box-sizing: border-box; 
    display: block; 
    background-color: white; 
    margin-top: 25px; 
    margin-bottom: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 1200px;
  }
  .map-panel {
    height: 220px; 
    margin: 20px 0px;
  }

  .container {
    width: 100%;
  }

  .company_title_box {
    text-align: left;
    height: 62px;
    width: 100%;
    padding-top: 30px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 8px;
  }
  .company_title_box .chineseText {
    font-size: 16px;
    font-weight: 600;
    color: #202020;
    margin-right: 6px;
    position: relative;
  }
  .company_title_box .chineseText::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -13px;
    background-color: #eb5a04;
    left: 0;
  }

  .date .date-title {
    text-align: left;
    margin-top: 20px;
  }
  .date .date-title h2 {
    color: #596477;
    font-size: 12px;
    margin: 0px 0px 3px 0px;
  }
  .date .date-title h2 .date-name {
    display: inline-block;
    vertical-align: middle;
    vertical-align: top;
    margin: 10px 5px 0px 0px;
  }
  .date .date-title h2 .date-number {
    color: #262e3d;
    font-size: 24px;
  }
  .date .date-title p {
    width: 120px;
    height: 20px;
    text-align: center;
    line-height: 18px;
    color: #fff;
    font-size: 12px;
    border-radius: 10px;
    margin: 0px;
  }
  .date .date-list {
    color: #596477;
    font-size: 12px;
    margin: 0px 0px 30px 0px;
    padding: 0px 15px;
    text-align: left;
  }
  .date .date-list li {
    width: 340px;
    margin-top: 16px;
    list-style: none;
  }
  .float-start {
    float: left;
  }
  .float-end {
    float: right;
  }
  .date .date-list li h6 {
    font-size: 12px;
    margin: 0px;
  }
  .date .date-list li p {
    line-height: 22px;
    margin: 0px;
  }
  .date .date-list li p span {
    font-size: 18px;
    color: #262e3d;
  }
  .date .date-list li .progress {
    height: 3px;
    background: #e5e5e5;
    border-radius: 1px;
    margin: 0px;
  }
  .date .date-list li .progress .progress-bar {
    height: 3px;
    width: 0;
  }
  
  .badge-level {
    opacity: 1;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
    filter: alpha(opacity=100);
    -webkit-box-shadow: inherit !important;
    -moz-box-shadow: inherit !important;
    -o-box-shadow: inherit !important;
    box-shadow: inherit !important;
  }
  .badge-level.level0 {
    background-color: #596477;
  }
  .badge-level.levela {
    background-color: #22AC3C;
  }
  .badge-level.levelb {
    background-color: #01A0E9;
  }
  .badge-level.levelc {
    background-color: #004C86;
  }
  .badge-level.leveld {
    background-color: #F39800;
  }

  .debug-panel {
    border: 2px solid #bb0000; 
    box-sizing: border-box; 
    display: block; 
    background-color: #808080; 
    margin: 0px; 
    padding: 0px;
  }
  
</style>
