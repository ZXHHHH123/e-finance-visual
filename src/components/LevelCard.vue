<template>
  <div class="level-classic-card">
    <div v-for="(message, index) in this.contextData" :key="index">
      <b-card style="height: 160px; padding: 0; width: 99%; margin-bottom: 20px;">
        <div style="top: 0px; left: 50%; position: absolute; z-index: 1; width: 50%; height: 130px">
          <level-classic-chart :index="index" :number="message.pids.length" :total="total" :color="message.color"></level-classic-chart>
        </div>
        <div style="top: 0px; left: 0px; position: absolute; width: 100%; height: 130px; z-index: 9; padding: 15px 20px;">
          <div class="date">
            <div class="date-title">
              <h2><span style="vertical-align: top; line-height: 20px; margin-right: 5px;">平台数目</span><span class="date-number" id="section-panel-F">{{message.pids.length}}</span><span>/{{total}}</span></h2>
              <p :class="message.badge"> {{message.level}}评级 </p>
            </div>
            <ul class="date-list clearfix">
              <li class="float-start" style="width: 330px">
                <h6>地区分布</h6>
                <p>
                  <span v-for="(num, addr, index) in message.address" :key="index">{{addr}}<span style="font-size: 18px; margin: 0px 5px;">{{num}}</span></span>
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
    name: 'LevelClassicCard',
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
      var platformLevelClassic = this.$store.state.platformLevelClassic
      console.log(platformLevelClassic)
      if (tools.isEmptyDict(platformLevelClassic.data)) {
        let _this = this
        axiosGet('/platform_level_classic')
          .then(res => {
            _this.$store.commit('setPlatformLevelClassic', [res.total, res.data])
            _this.total = res.total
            _this.contextData = res.data
            _this.setEntryColor()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log(platformLevelClassic)
        this.total = platformLevelClassic.total
        this.contextData = platformLevelClassic.data
        // this.setEntryColor()
      }
    },
    methods: {
      setEntryColor () {
        for (let i in this.contextData) {
          var badge = 'badge-level level' + this.contextData[i]['level'].charAt(0).toLowerCase()
          this.contextData[i]['badge'] = badge
          if (this.contextData[i]['level'].charAt(0).toLowerCase() === 'a') {
            this.contextData[i]['color'] = '#22AC3C'
          } else if (this.contextData[i]['level'].charAt(0).toLowerCase() === 'b') {
            this.contextData[i]['color'] = '#01A0E9'
          } else if (this.contextData[i]['level'].charAt(0).toLowerCase() === 'c') {
            this.contextData[i]['color'] = '#004C86'
          } else if (this.contextData[i]['level'].charAt(0).toLowerCase() === 'd') {
            this.contextData[i]['color'] = '#F39800'
          } else {
            this.contextData[i]['color'] = '#EEEEEE'
          }
        }
        console.log(this.contextData)
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
</style>
