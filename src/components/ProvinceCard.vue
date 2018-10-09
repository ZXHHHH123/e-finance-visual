<template>
  <div class="province-classic-card">
    <div v-for="(message, index) in this.contextData" :key="index">
      <b-card style="height: 160px; padding: 0; width: 99%; margin-bottom: 20px;">
        <div style="top: 0px; left: 55%; position: absolute; z-index: 1; width: 45%; height: 130px">
          <level-classic-chart :index="index" :number="message.pids.length" :total="total" :color="'#01A0E9'"></level-classic-chart>
        </div>
        <div style="top: 0px; left: 0px; position: absolute; width: 100%; height: 130px; z-index: 9; padding: 15px 20px;">
          <div class="date">
            <div class="date-title">
              <h2>
                <span class="date-number" style="font-size: 28px;">{{message.address}}</span>
                <span>平台数目</span>
                <span class="date-number" id="section-panel-F">{{message.pids.length}}</span>
              </h2>
            </div>
            <ul class="date-list clearfix">
              <li class="float-start" style="width: 330px; margin-top: 0px;">
                <h6>评级分布</h6>
                <p>
                  <div v-for="(num, le, index) in message.level" :key="index" style="float: left; margin-top: 4px; margin-right: 5px;">
                    <div :class="num[2]" style="text-align: center; font-size: 18px;">{{num[0]}}</div>
                    <div :class="num[1]" style="width: 60px; height: 16px; text-align: center; line-height: 14px; color: #FFFFFF; font-size: 10px; border-radius: 0px;">{{le}}</div>
                  </div>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div style="bottom: 0px; left: 0px; position: absolute; width: 100%; height: 30px; background-color: #FCFCFC; border-top: 1px solid #E5E5E5;">
          <div style="text-align: right;">
            <span class="glyphicon glyphicon-unchecked" style="font-size: 19px;vertical-align: text-top;text-align: center;color: #7f7f7f;"/>
            <a style="font-size: 14px; width: 70px; padding-top: 4px; margin-right: 10px; color: #7f7f7f">平台对比</a>
            <span class="glyphicon glyphicon-plus" style="font-size: 14px;width: 17px;height: 17px;padding-top: 1px;margin-top: 6px;text-align: center;background-color: #7f7f7f; color: #FFFFFF;border-radius: 2px;"/>
            <a style="font-size: 14px; width: 70px; padding-top: 4px; margin-right: 10px; color: #7f7f7f" @click="directToDetail(message.pids)">详细信息</a>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
  import { get as axiosGet } from '../util/axios-get'
  import tools from '../util/tool-util'

  import LevelClassicChart from '@/components/charts/LevelClassicChart.vue'

  export default {
    name: 'ProvinceClassicCard',
    components: {
      LevelClassicChart
    },
    data () {
      return {
        total: 0,
        contextData: []
      }
    },
    created () {
      var platformProvinceClassic = this.$store.state.platformProvinceClassic
      console.log(this.contextData)
      if (tools.isEmptyDict(platformProvinceClassic.data)) {
        let _this = this
        axiosGet('/platform_province_classic')
          .then(res => {
            _this.$store.commit('setPlatformProvinceClassic', [res.total, res.data])
            _this.total = res.total
            _this.contextData = res.data
            _this.setEntryColor()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log(platformProvinceClassic)
        this.total = platformProvinceClassic.total
        this.contextData = platformProvinceClassic.data
        // this.setEntryColor()
      }
    },
    methods: {
      setEntryColor () {
        for (let i in this.contextData) {
          for (let j in this.contextData[i]['level']) {
            var badge = 'badge-level level' + j.charAt(0).toLowerCase()
            var color = 'badge-border' + j.charAt(0).toLowerCase()
            this.contextData[i]['level'][j] = [this.contextData[i]['level'][j], badge, color]
          }
        }
      },
      directToDetail (pids) {
        // this.$router.push({name: 'MainFrameWithPids', params: {platformIds: pids.toString()}})
        console.log('[DEBUG] ' + pids)
        this.$emit('filterCall', pids)
      }
    }
  }
</script>

<style>
  @import '/static/icon/iconfont.css';
  .card-panel {
    margin-bottom: 20px;
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
  .platform-card{
    height: 100%;
  }
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  .href:hover{
    text-shadow:0px 0px 10px #333333;
  }

  .date .date-title {
    text-align: left;
    margin-top: 0px;
  }
  .date .date-title h2 {
    color: #596477;
    font-size: 14px;
    margin-top: 0px;
  }
  .date .date-title h2 .date-name {
    display: inline-block;
    vertical-align: middle;
    vertical-align: top;
    margin: 10px 5px 0px 0px;
  }
  .date .date-title h2 .date-number {
    color: #262e3d;
    font-size: 32px;
    font-weight: 500;
    margin-right: 5px;
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
    margin: 0px;
    padding: 0px;
    text-align: left;
  }
  .date .date-list li {
    width: 155px;
    margin-top: 8px;
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
    font-size: 14px;
    color: #262e3d;
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

  .badge-border0 {
    border: 1px solid #596477;
  }
  .badge-bordera {
    border: 1px solid #22AC3C;
  }
  .badge-borderb {
    border: 1px solid #01A0E9;
  }
  .badge-borderc {
    border: 1px solid #004C86;
  }
  .badge-borderd {
    border: 1px solid #F39800;
  }
  
</style>
