<template>
  <div class="main">
    <sider-panel>
      <div>
        <div class="bar-btn-div glyphicon glyphicon-home" @click="showHistory" style="font-size: 22px; padding: 24px 18px;"></div>
        <div class="main-interval" style="height: 3px; "></div>
        <div class="bar-btn-div glyphicon glyphicon-list-alt" style="font-size: 22px; padding: 24px 18px;"></div>
        <div class="main-interval" style="height: 3px; "></div>
      </div>
    </sider-panel>

    <div class="info-panel">
      <div class="info-head">
        <span>互联网金融平台数据</span>
        <b-form-select v-model="selected"  class="mb-3 view-mode">
          <option value="a">所有平台信息</option>
          <option value="b">按等级分类</option>
          <option value="c">按省市分类</option>
          <option value="d">按经营类型分类</option>
        </b-form-select>
      </div>
      <div class="info-context" style="height: 517px">
        <!--注释掉平台卡片信息，显示分类信息作为测试部分-->
        <platform-card ref="PlatformCard" v-if="platformCardShow" @parentCall="mapCenterAndZoom"/>
        <level-classic-card v-if="classInfoShow" @filterCall="filterPlatform" />
        <province-classic-card v-if="proviceRankShow" @filterCall="filterPlatform" />
        <type-classic-card v-if="typeRankShow" @filterCall="filterPlatform" />
        <time-line v-if="timeLineShow" />
      </div>
    </div>

    <div style="width: 68%; float:left;">
      <b-card class="text-center card-style">
        <map-canvas ref="MapCanvas" style="height: 565px;" :mapType="'scatter'" />
        <span class="back-btn glyphicon glyphicon-chevron-left" v-show="backBtnShow" @click="backHistory" />
      </b-card>
    </div>
  </div>
</template>

<script>
import { get as axiosGet } from '../util/axios-get'
import { level2num } from '../util/level-util'
import tools from '../util/tool-util'

import PlatformCard from '@/components/PlatformCard.vue'
import MapCanvas from '@/components/MapCanvas.vue'
import SiderPanel from '@/components/SiderPanel.vue'
import LevelClassicCard from '@/components/LevelCard.vue'
import ProvinceClassicCard from '@/components/ProvinceCard.vue'
import TypeClassicCard from '@/components/TypeCard.vue'
import TimeLine from '@/components/TimeLine.vue'
export default {
  name: 'MainFrame',
  components: {
    PlatformCard,
    MapCanvas,
    SiderPanel,
    LevelClassicCard,
    ProvinceClassicCard,
    TypeClassicCard,
    TimeLine
  },
  data () {
    return {
      selected: 'a',

      platformCardShow: true,
      classInfoShow: false,
      proviceRankShow: false,
      typeRankShow: false,
      menuShow: true,
      timeLineShow: false,

      // platform_data: [],
      cur_platform_data: []
    }
  },
  computed: {
    backBtnShow () {
      return (this.$store.state.mainFramHistory.length !== 0)
    }
  },

  created () {
    var platformBaseData = this.$store.state.platformBaseData
    if (tools.isEmptyDict(platformBaseData)) {
      let _this = this
      axiosGet('/platform_basic_info')
        .then(res => {
          // this.globaldata.PlatformBaseData = res.data
          this.$store.commit('setPlatformBaseData', res.data)
          _this.cur_platform_data = res.data
          _this.updateCanvas()
        })
    } else {
      this.cur_platform_data = platformBaseData
      // this.updateCanvas()
    }
  },
  mounted () {
    this.updateCanvas()
  },

  watch: {
    selected: function () {
      this.timeLineShow = false
      console.log(this.selected)
      if (this.selected === 'a') {
        this.classInfoShow = this.proviceRankShow = this.typeRankShow = false
        this.platformCardShow = true
      } else if (this.selected === 'b') {
        this.classInfoShow = true
        this.platformCardShow = this.proviceRankShow = this.typeRankShow = false
      } else if (this.selected === 'c') {
        this.proviceRankShow = true
        this.classInfoShow = this.platformCardShow = this.typeRankShow = false
      } else if (this.selected === 'd') {
        this.typeRankShow = true
        this.classInfoShow = this.platformCardShow = this.proviceRankShow = false
      }
    }
  },

  methods: {
    convertData: function (_data, _level) {
      var res = []
      for (var i = 0; i < _data.length; i++) {
        // console.log(_data[i])
        if (_data[i].level.charAt(0) === _level) {
          res.push({
            pid: _data[i].id,
            name: _data[i].name,
            value: _data[i].address.concat(level2num(_data[i].level))
          })
        }
      }
      return res
    },

    filterPlatform: function (pids) {
      var _tp = {}
      for (let i in pids) {
        _tp[pids[i]] = ''
      }
      var platformBaseData = this.$store.state.platformBaseData
      this.cur_platform_data = []
      for (var i = 0; i < platformBaseData.length; i++) {
        if (platformBaseData[i].id in _tp) {
          this.cur_platform_data.push(platformBaseData[i])
        }
      }
      this.updateCanvas()

      this.$store.commit('setPlatformFilterPids', pids)
      this.classInfoShow = this.proviceRankShow = this.typeRankShow = false
      this.platformCardShow = true
      // console.log(this.$refs)
      // this.$refs.PlatformCard.filterPlatform(pids)
    },

    updateCanvas: function () {
      var seriesData = [
        this.convertData(this.cur_platform_data, 'A'),
        this.convertData(this.cur_platform_data, 'B'),
        this.convertData(this.cur_platform_data, 'C'),
        this.convertData(this.cur_platform_data, 'D')
      ]
      this.$refs.MapCanvas.setSeriesData(seriesData)
    },

    updateSelected: function (curVal, oldVal) {
      console.log(this.selected)
    },

    showHistory: function () {
      this.platformCardShow = this.classInfoShow = this.proviceRankShow = this.typeRankShow = false
      this.timeLineShow = true
    },

    mapCenterAndZoom: function (address) {
      this.$refs.MapCanvas.centerAndZoomCanvas(13, address)
    },

    backHistory: function () {
      var history = this.$store.state.mainFramHistory
      if (history[history.length - 1]['type'] === 'showSection') {
        this.$refs.MapCanvas.centerAndZoomCanvas(5, [105.00, 36.50])
      }
      this.$store.commit('popMainFramHistory')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/glyphicon-font.css';

  .brand-txt {
    line-height: 60px;
    font-weight: 600;
    color: #fff;
  }
  .brand-dropdown {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: #fff;
  }
  .main-interval {
    height: 5px;
    background-color: #fff;
  }
  .card-style {
    background-color: #fff;
    height: 96%;
    margin: 10px 0px;
  }
  .info-panel {
    position: relative;
    float:left;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    text-align: left;
    width: 30%;
    height: 96%;
    margin: 10px 10px;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
  .info-panel .info-head {
     border-bottom: 1px solid #e8e8e8;
     background-color: #f6f7f8;
     height: 58px;
     padding: 0 20px;
     line-height: 58px;
     font-size: 20px;
     color: #262e3d;
     font-weight: 700;
     display: flex;
  }
  .info-panel .info-context {
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
  }
  .info-panel .info-context::-webkit-scrollbar {
    width: 5px;
    height:10px;
    background-color:#b5b1b1;
  }
  .info-panel .info-context::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color:#ffffff;
  }
  .info-panel .info-context::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#b5b1b1;
  }

  .no-right-padding {
    padding-right: 0px;
  }

  .bg-info {
    width: 100%;
    height: 60px;
    background-color: #eb5a04 !important;
  }
  .navbar-light .navbar-nav .nav-link {
    font-size: 16px;
    font-weight: 360;
    color: #fff;
  }
  .container {
    max-width: 100%;
    height: 600px;
  }
  .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 5px;
  }
  .full-height {
    height: 100%;
  }

  .bar-btn-div:hover {
    color: #fff;
    background-color: #fb701d;
  }
  .sidebar{
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin-top: 10px;
    background-color: #fff;
    padding: 5px;
    transition: all 2s ease;
  }

  .sidebar-items{
    width: 100%;
    list-style-type:none;
    line-height: 40px;
    padding-left: 0px;
    font-size: 14px;
  }
  .sidebar-item:hover{
    width: 100%;
    background-color:gray;
  }
  .menu-logo{
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 999;
  }
  .sidebar-enter-active {
    transition: all .3s ease;
  }
  .sidebar-leave-active {
    transition: all .5s ease;
  }
  .sidebar-enter, .sidebar-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .test-enter-active, .test-enter-active {
    transition: all .3s ease;
  }
  .test-leave-active, .test-leave-active {
    transition: all .5s ease;
  }
  .test-enter, .test-leave-to
  {
    transform: translateX(10px);
    opacity: 0;
  }

  .back-btn {
    width: 34px;
    height: 34px;
    position: absolute;
    right: 15px;
    top: 530px;
    background-color: #eb5a04;
    font-size: 24px;
    color: white;
    line-height: 26px;
    border: 2px solid #ffbb99;
    box-shadow: 2px 2px 10px 0px #6f6f6f;
  }

  .view-mode {
    width: 130px;
    border-radius: 0rem;
    font-size: 14px;
    position: relative;
    margin-top: 12px;
    display: inline-block;
    background-color: #f6f7f8;
    border: none;
    margin-left: auto !important;
  }
  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
    background-color: #FFF;
  }
</style>
