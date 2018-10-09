<template>
  <div class="platform-hint" v-show="showFlag" v-bind:style="{ left: offsetX + 'px', top: offsetY + 'px' }">
    <div class="card-panel card-panel-default">
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
    </div>
  </div>
</template>

<script>
import { get as axiosGet } from '../util/axios-get'

export default {
  name: 'PlatformHint',
  data () {
    return {
      offsetX: 0,
      offsetY: 0,

      platformName: 'Loading...',
      platformClass: '... ',
      platformClassBadge: 'badge-level levela',
      platformType: 'Loading...',
      platformBG: 'Loading...',
      platformTeam: 'Loading...',
      platformAddress: 'Loading...',
      platformTimeYear: '2000',
      platformTimeMonth: '00',
      platformTimeDay: '00',

      showFlag: false
    }
  },
  methods: {
    show: function (position, platformId) {
      let _this = this
      axiosGet('/platform_complete_info?pid=' + platformId)
        .then(res => {
          console.log(res.basicdata, res.objects, res.reports)
          _this.update(res.basicdata)
        })

      var pointX = position[0]
      var pointY = position[1]
      var canvasWidth = position[2]
      var canvasHeight = position[3]

      this.offsetX = pointX
      if (pointX + 360 > canvasWidth) {
        this.offsetX = pointX - 360
      }
      this.offsetY = pointY
      if (pointY + 270 > canvasHeight) {
        this.offsetY = pointY - 270
      }

      this.showFlag = true
    },

    hide: function () {
      this.showFlag = false

      this.platformName = 'Loading...'
      this.platformClass = '... '
      this.platformClassBadge = 'badge-level levela'
      this.platformType = 'Loading...'
      this.platformBG = 'Loading...'
      this.platformTeam = 'Loading...'
      this.platformAddress = 'Loading...'

      this.platformTimeYear = '2000'
      this.platformTimeMonth = '00'
      this.platformTimeDay = '00'
    },

    update: function (_data) {
      this.platformName = _data['name']
      this.platformClass = _data['level']
      this.platformClassBadge = 'badge-level level' + _data['level'].charAt(0).toLowerCase()
      if (_data['type'].length < 8) {
        this.platformType = _data['type']
      } else {
        this.platformType = _data['type'].substring(0, 7) + '...'
      }
      this.platformBG = _data['background']
      this.platformTeam = _data['team']
      this.platformAddress = _data['address']

      var _time = _data['time']
      var _times = _time.split('-')
      this.platformTimeYear = _times[0]
      this.platformTimeMonth = _times[1]
      this.platformTimeDay = _times[2]
    }
  }
}
</script>

<style scoped>
  .platform-hint { 
    width: 360px;
    height: 270px;
    position: absolute;
  }
  .card-panel {
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
  .card-panel-default {
    border-color: #ddd;
  }
  .card-panel-last {
    margin-bottom: 0px;
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
    width: 155px;
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
</style>
