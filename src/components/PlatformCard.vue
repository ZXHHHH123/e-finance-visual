<template>
  <div class="platform-card">
    <div v-for="(message, index) in this.curContextData" :key="index">
      <b-card style="height: 160px; padding: 0; width: 99%; margin-bottom: 20px;" @click="showSection(message.name,message.id,message.address)">
        <div style="top: 0px; left: 0px; position: absolute; z-index: 1; width: 100%; height: 130px">
          <money-line-chart :index="index" :contextData="message.report" />
        </div>
        <div style="top: 0px; left: 0px; position: absolute; width: 100%; height: 130px; z-index: 9; padding: 15px 20px;">
          <div class="date">
            <div class="date-title">
              <h2><span class="date-number" id="section-panel-F">{{message.name}}</span><span>P2P平台</span></h2>
              <p :class="message.badge"> {{message.level}}评级 </p>
            </div>
            <ul class="date-list clearfix">
              <li class="float-start" style="width: 330px">
                <h6>调研时间</h6>
                <p><span id="Pb_data">{{message.time[0]}}</span>年<span id="Pb_data">{{message.time[1]}}</span>月<span id="Pb_data">{{message.time[2]}}</span>日</p>
              </li>
            </ul>
          </div>
        </div>
        <div style="bottom: 0px; left: 0px; position: absolute; width: 100%; height: 30px; background-color: #FCFCFC; border-top: 1px solid #E5E5E5;">
          <!-- <b-btn style="display: inline;margin-top:3rem;margin-left: 65%">平台对比</b-btn> -->
          <!-- <span @click="showSection(message.name,message.id,message.address)" style="text-decoration: none;float: right;margin-top: 3.2rem" class="href"><span class="glyphicon glyphicon-plus" style="font-size: 2rem;color: #868e96"></span></span> -->
          <div style="text-align: right;">
            <span class="glyphicon glyphicon-unchecked" style="font-size: 19px;vertical-align: text-top;text-align: center;color: #7f7f7f;"/>
            <a style="font-size: 14px; width: 70px; padding-top: 4px; margin-right: 10px; color: #7f7f7f" @click="selectToCompare(message)">平台对比</a>
            <span class="glyphicon glyphicon-plus" style="font-size: 14px;width: 17px;height: 17px;padding-top: 1px;margin-top: 6px;text-align: center;background-color: #7f7f7f; color: #FFFFFF;border-radius: 2px;"/>
            <a style="font-size: 14px; width: 70px; padding-top: 4px; margin-right: 10px; color: #7f7f7f" @click="directToDetail(message.id)">详细信息</a>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
  import MoneyLineChart from '@/components/charts/MoneyLine.vue'

  export default {
    name: 'PlatformCard',
    components: {
      MoneyLineChart
    },
    data () {
      return {
        contextData: [],
        curContextData: []
      }
    },
    created () {
      console.log(this.$store.state.platformBaseData)
      this.contextData = this.$store.state.platformBaseData
      for (let i in this.contextData) {
        var badge = 'badge-level level' + this.contextData[i]['level'].charAt(0).toLowerCase()
        this.contextData[i]['badge'] = badge
      }
      if (this.$store.state.platformFilterPids.length === 0) {
        this.curContextData = this.contextData
      } else {
        this.filterPlatform(this.$store.state.platformFilterPids)
      }
    },
    computed: {
      platformBaseData () {
        return this.$store.state.platformBaseData
      }
    },
    watch: {
      platformBaseData: function (newData, oldData) {
        this.contextData = newData
        for (let i in this.contextData) {
          var badge = 'badge-level level' + this.contextData[i]['level'].charAt(0).toLowerCase()
          this.contextData[i]['badge'] = badge
        }
        this.curContextData = this.contextData
      }
    },
    methods: {
      filterPlatform: function (pids) {
        this.curContextData = []
        var _tp = {}
        for (let i in pids) {
          _tp[pids[i]] = ''
        }
        for (var i = 0; i < this.contextData.length; i++) {
          if (parseInt(this.contextData[i].id) in _tp) {
            this.curContextData.push(this.contextData[i])
          }
        }
      },
      showSection (name, index, address) {
        this.$store.commit('pushMainFramHistory', {'type': 'showSection'})
        this.$emit('parentCall', address)
      },
      directToDetail (pid) {
        this.$router.push({name: 'DetailFrame', params: {platformId: pid}})
      },
      selectToCompare (message) {
        this.$parent.$refs.MapCanvas.showPlatformBox(message)
        // console.log(message.name + message.id)
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
    font-size: 12px;
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
    font-size: 24px;
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
