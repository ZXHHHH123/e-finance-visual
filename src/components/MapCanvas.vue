<template>
  <div class="map-canvas" >
    <div id="mapcanvas" style="width:100%; height: 100%;"></div>
    <b-card class="platformBox" v-if="platformBoxArr.length !== 0">
      <div>
        <span class="myTag" v-for="(item, index) in platformBoxArr">{{ item.name }}<i class="glyphicon glyphicon-remove" @click="closeTag(index)"></i></span>
      </div>
      <div class="platformBtnBox">
        <b-button variant="danger" @click="cancelCompare">取消</b-button>
        <b-btn variant="primary" @click="submitCompare">提交</b-btn>
      </div>
    </b-card>
    <platform-hint ref="platformHint"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import BMap from 'BMap'
import 'echarts/extension/bmap/bmap'

import PlatformHint from '@/components/PlatformHint.vue'

export default {
  name: 'MapCanvas',
  components: {
    PlatformHint
  },
  props: ['mapType'],
  data () {
    return {
      mapCanvas: null,
      mapOption: {},
      platformBoxArr: [],
      bmapStyle: {
        center: [105.00, 36.50],
        zoom: 5,
        roam: true,
        mapStyle: {
          styleJson: [{
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#f3f3f3'
            }
          }, {
            'featureType': 'railway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'highway',
            'elementType': 'all',
            'stylers': {
              'color': '#fdfdfd'
            }
          }, {
            'featureType': 'highway',
            'elementType': 'labels',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'arterial',
            'elementType': 'geometry',
            'stylers': {
              'color': '#fefefe'
            }
          }, {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#fefefe'
            }
          }, {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'green',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'subway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'local',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'arterial',
            'elementType': 'labels',
            'stylers': {
              'visibility': 'off'
            }
          }, {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#111'
            }
          }, {
            'featureType': 'building',
            'elementType': 'all',
            'stylers': {
              'color': '#d1d1d1'
            }
          }, {
            'featureType': 'label',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#999999'
            }
          }]
        }
      }
    }
  },
  created () {
    console.log('[DEBUG] MapCanvas created')
    if (this.mapType === 'scatter' || this.mapType === 'single') {
      this.mapOption = {
        title: {
          text: '互联网金融风控信息',
          subtext: '数据来源于星火钱包',
          sublink: '',
          left: 'left',
          show: false
        },
        tooltip: {
          trigger: 'item',
          show: false
        },
        legend: {
          orient: 'horizontal',
          left: '30px',
          top: '20px',
          itemWidth: 30,
          data: [{
            name: 'A级平台',
            icon: 'roundRect'
          }, {
            name: 'B级平台',
            icon: 'roundRect'
          }, {
            name: 'C级平台',
            icon: 'roundRect'
          }, {
            name: 'D级平台',
            icon: 'roundRect'
          }]
        },
        bmap: this.bmapStyle,
        series: [
          {
            name: 'A级平台',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'pin',
            symbolSize: 30,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#22AC3C'
              }
            },
            data: []
          },
          {
            name: 'B级平台',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'pin',
            symbolSize: 30,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#01A0E9'
              }
            },
            data: []
          },
          {
            name: 'C级平台',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'pin',
            symbolSize: 30,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#004C86'
              }
            },
            data: []
          },
          {
            name: 'D级平台',
            type: 'scatter',
            coordinateSystem: 'bmap',
            symbol: 'pin',
            symbolSize: 30,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#F39800'
              }
            },
            data: []
          }
        ]
      }
      if (this.mapType === 'single') {
        this.mapOption.tooltip.show = true
        this.mapOption.legend.show = false
      }
    } else if (this.mapType === 'heatmap') {
      this.mapOption = {
        title: {
          text: '互联网金融用户行为信息',
          subtext: '数据来源于星火钱包',
          sublink: '',
          left: 'left',
          show: false
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 600,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        bmap: this.bmapStyle,
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'bmap',
            data: [],
            pointSize: 15,
            blurSize: 25
          }
        ]
      }
    } else if (this.mapType === 'heatpoint') {
      this.mapOption = {
        title: {
          text: '互联网金融用户行为信息',
          subtext: '数据来源于星火钱包',
          sublink: '',
          left: 'left',
          show: false
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: this.bmapStyle,
        series: [
          {
            name: 'User',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [],
            symbolSize: function (val) {
              var ret = Math.sqrt(val[2])
              if (ret < 1) {
                ret = 1
              } else if (ret > 25) {
                ret = 25 + (ret - 25) / 2
              }
              return ret
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#eb5a04'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.mapCanvas = echarts.init(document.getElementById('mapcanvas'))

    if (this.mapType === 'scatter') {
      var _this = this
      this.mapCanvas.on('click', function (params) {
        if (params.componentType === 'series' && params.componentSubType !== 'lines') {
          console.log(params.data.pid)
          _this.$router.push({name: 'DetailFrame', params: {platformId: params.data.pid}})
        }
      })

      this.mapCanvas.on('mouseover', function (params) {
        if (params.componentType === 'series' && params.componentSubType !== 'lines') {
          console.log('enter: ' + params.data.pid)
          var position = [params.event.offsetX, params.event.offsetY, _this.mapCanvas._dom.offsetWidth, _this.mapCanvas._dom.offsetHeight]
          _this.$refs.platformHint.show(position, params.data.pid)
        }
      })
      this.mapCanvas.on('mouseout', function (params) {
        if (params.componentType === 'series' && params.componentSubType !== 'lines') {
          console.log('out: ' + params.data.pid)
          var currentNode = params.event.event.toElement
          var toHintPanel = false
          for (var i = 0; i < 5; i++) {
            if (currentNode.className === 'platform-hint') {
              toHintPanel = true
              break
            }
            currentNode = currentNode.parentNode
          }
          if (!toHintPanel) {
            _this.$refs.platformHint.hide()
          }
        }
      })
    }
    this.updateCanvas()
  },
  methods: {
    setSeriesData: function (_data) {
      console.log('[DEBUG] :')
      console.log(_data)
      if (JSON.stringify(this.mapOption) === '{}') {
        return
      }

      if ((this.mapType === 'scatter' || this.mapType === 'single') &&
        _data.length === this.mapOption.series.length) {
        for (var i = 0; i < this.mapOption.series.length; i++) {
          this.mapOption.series[i].data = _data[i]
        }
      } else if (this.mapType === 'heatmap') {
        this.mapOption.series[0].data = _data
      } else if (this.mapType === 'heatpoint') {
        this.mapOption.series[0].data = _data
      }
      this.updateCanvas()
    },
    setViewport: function (position, zoomLevel) {
      this.mapOption.bmap.center = position
      this.mapOption.bmap.zoom = zoomLevel
      this.mapOption.bmap.roam = false
    },
    updateCanvas: function () {
      this.mapCanvas.setOption(this.mapOption)
    },
    centerAndZoomCanvas: function (zoom, address) {
      // console.log(address)
      var bm = this.mapCanvas.getModel().getComponent('bmap').getBMap()
      // bm.centerAndZoom(new BMap.Point(address[0], address[1]), zoom)
      bm.panTo(new BMap.Point(address[0], address[1]))
      bm.setZoom(zoom)
      /*
      var time = 0
      for (var i = 0; i < 5; i++) {
        if (i === 0 || i === 2 || i === 4) {
          setTimeout(function () {
            bmap.centerAndZoom(new BMap.Point(address[0], address[1]), 9 + i)
          }, time += 50)
        } else if (i === 1 || i === 3) {
          setTimeout(function () {
            bmap.centerAndZoom(new BMap.Point(address[0], address[1]), 9 + i)
          }, time += 30)
        }
        console.log(time)
      }
      */
      // bmap.enableScrollWheelZoom(true)
    },
    showPlatformBox (msg) {
      // console.log('yeah, I get it!')
      let isExist = false
      this.platformBoxArr.forEach(function (ele) {
        if (ele.id === msg.id) {
          isExist = true
        }
      })
      if (!isExist) {
        this.platformBoxArr.push(msg)
      }
      // console.log('[msg]: ', msg)
    },
    closeTag (index) {
      this.platformBoxArr.splice(index, 1)
    },
    cancelCompare () {
      this.platformBoxArr = []
    },
    submitCompare () {
      let aId = []
      this.platformBoxArr.forEach(function (ele) {
        aId.push(ele.id)
      })
      this.$router.push({name: 'CompareFrame', params: {compareIds: JSON.stringify(aId)}})
    }
  }
}
</script>

<style scoped>
  
  .platformBox {
    background: #f3f3f3;
    box-shadow: 0px 1px 1px 1px #ccc;
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: left;
    width: 100%;
  }
  .platformBox.card {
    border: none;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .platformBox .myTag{
    background: #ffc107;      /* tag背景颜色 */
    border: 1px solid #eb5a04;  /* tag边框 */
    border-radius: 5px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 80%;
    padding: 3px 1px 3px 5px;
    position: relative;
    line-height: 17px;
    margin: 3px 5px;
  }
  .platformBox .myTag i{
    display: inline-block;
    margin: -2px 0px 0px 2px;
    font-style: normal;
    font-size: 50%;
    line-height: inherit;
    width: 17px;
    vertical-align: middle;
    text-align: center;
  }
  .platformBox .myTag i:hover{
    background: #fd7e14;
    border-radius: 50%;
    cursor: pointer;
  }
  .platformBtnBox{
    text-align: right;
  }
  
  
</style>
