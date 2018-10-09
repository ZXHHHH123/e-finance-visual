<template>
  <div class="register-log-main">
    <div class="basic-panel top-panel">
      <div class="basic-panel left-subpanel">
        <b-card class="text-center card-style">
          <map-canvas ref="MapCanvas" style="height: 443px;" :mapType="'heatpoint'"/>
        </b-card>
      </div>
      <div class="basic-panel right-subpanel">
        <div class="basic-panel info-subpanel" style="height: 120px;" >
          <b-container  style="padding: 0px;">
            <b-row class="text-center" style="margin: auto; height: 88px">
              <b-col cols="4" style="margin: 20px 0px; border-right: 1px solid #E5E5E5;">
                <div class="date">
                  <div class="date-title">
                    <h2><span class="date-number" id="section-panel-F">7.1</span><span>万位</span></h2>
                    <p>已加入人数</p>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" style="margin: 20px 0px; border-right: 1px solid #E5E5E5;">
                <div class="date">
                  <div class="date-title">
                    <h2><span class="date-number" id="section-panel-F">36.4</span><span>亿元</span></h2>
                    <p>累计成交份额</p>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" style="margin: 20px 0px;">
                <div class="date">
                  <div class="date-title">
                    <h2><span class="date-number" id="section-panel-F">5.6</span><span>千万元</span></h2>
                    <p>累计产生收益</p>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="text-center" style="margin: auto; height: 32px; background-color: #FCFCFC; border-top: 1px solid #E5E5E5;">
              <div class="glyphicon glyphicon-info-sign" style="font-size: 18px; width: 30px; padding-top: 6px; margin-left: auto; flow: right; color: #7f7f7f"></div><a style="font-size: 16px; width: 70px; padding-top: 4px; margin-right: 20px; color: #7f7f7f" @click="directTo('RegisterDetailFrame')">详细信息</a>
            </b-row>
          </b-container>
        </div>
        <div class="basic-panel info-subpanel" style="margin-top: 8px; height: 320px;" >
          <b-container  style="padding: 0px;">
            <b-row class="text-center" style="margin: auto; height: 302px">
              <user-sex-chart ref="UserSexChart" v-if="chartShowIdx === 0" :contextData="user_sex_data"></user-sex-chart>
              <user-address-chart ref="UserAddressChart" v-if="chartShowIdx === 1" :contextData="user_address_data"></user-address-chart>
            </b-row>
            <b-row class="text-center" style="margin: auto; height: 18px;">
              <ol role="group" class="chartgroup-indicators">
                <li role="button" class="active" @click="chartGroupShow(0)"></li>
                <li role="button" class="" @click="chartGroupShow(1)"></li>
              </ol>
            </b-row>
          </b-container>
        </div>
      </div>
    </div>
    <div class="basic-panel bottom-panel">
      <div class="basic-panel bottom-subpanel">
        <daily-user-register-chart :contextData="user_num_data"></daily-user-register-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { get as axiosGet } from '../util/axios-get'

import MapCanvas from '@/components/MapCanvas.vue'
import UserSexChart from '@/components/charts/UserSexChart.vue'
import UserAddressChart from '@/components/charts/UserAddressChart.vue'
import DailyUserRegisterChart from '@/components/charts/DailyUserRegisterChart.vue'

export default {
  name: 'RegisterLogFrame',
  components: {
    MapCanvas,
    UserSexChart,
    UserAddressChart,
    DailyUserRegisterChart
  },
  data () {
    return {
      chartShowIdx: 0,
      user_data: [],
      user_sex_data: [],
      user_address_data: [],
      user_num_data: []
    }
  },

  created () {
    let _this = this
    axiosGet('/platform_user_info')
      .then(res => {
        _this.user_data = res.data
        _this.user_sex_data = res.sex
        _this.user_address_data = res.address
        _this.user_num_data = res.usernum
        _this.$refs.MapCanvas.setSeriesData(_this.user_data)
      })
  },

  methods: {
    directTo: function (val) {
      this.$router.push({name: val})
    },
    chartGroupShow: function (idx) {
      this.chartShowIdx = idx
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/glyphicon-font.css';

  .basic-panel {
    padding: 0px;
    margin: 0px;
    float: left;
  }
  .top-panel {
    width: 100%; 
    height: 460px;
  }
  .left-subpanel {
    width: 70%; 
  }
  .right-subpanel {
    width: 30%; 
    height: 100%; 
    padding: 10px 10px 0px 10px;
  }
  .bottom-panel {
    width: 100%; 
    height: 140px; 
    padding: 10px 10px 5px 10px;
  }
  .bottom-subpanel {
    width: 100%; 
    height: 100%; 
    background-color: #fff; 
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
  .info-subpanel {
    width: 100%; 
    height: 100%; 
    background-color: #fff; 
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  .card-style {
    background-color: #fff;
    height: 450px;
    margin: 10px 0px 0px 10px;
    border-radius: 0rem;
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

  .date .date-title {
    text-align: center;
    margin-top: 0px;
  }
  .date .date-title h2 {
    color: #596477;
    font-size: 12px;
    margin: 0px;
  }
  .date .date-title h2 .date-name {
    display: inline-block;
    vertical-align: middle;
    vertical-align: top;
    margin: 10px 5px 0px 0px;
  }
  .date .date-title h2 .date-number {
    color: #262e3d;
    font-size: 30px;
  }
  .date .date-title p {
    width: 100px;
    height: 18px;
    line-height: 18px;
    color: #343434;
    font-size: 12px;
    font-weight: 500;
    margin: 0px auto;
  }

  .chartgroup-indicators {
      right: 0;
      bottom: 8px;
      left: 0;
      z-index: 15;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      padding-left: 0;
      margin-right: auto;
      margin-left: auto;
      list-style: none;
  }
  .chartgroup-indicators li {
    position: relative;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    background-color: #8b8b8b;
  }
  .chartgroup-indicators .active {
    background-color: #343434;
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
    height: 100%;
  }
  .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 3px;
  }
  .full-height {
    height: 100%;
  }
</style>
