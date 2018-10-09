<template>
    <div>
        <h1>调研历程</h1>
        <div class="mainTimeLine">
            <div class="nodeGroup" v-for="item in jData" v-bind:id="item.platforms[0].id">
                <div class="timeNode bgGreen">
                    <img src="/static/时间地点.png">
                </div>
                <div class="nodeContent">
                    <h2>{{item.platforms[0].name}}</h2>
                    <p class="nodeType">{{item.platforms[0].type}}</p>
                    <span class="nodeAddress" @click="showSection(item.platforms[0].name,item.platforms[0].id,item.platforms[0].position)" >
                      <span class="glyphicon glyphicon-map-marker"></span>{{item.platforms[0].address}}
                    </span><br>
                    <span class="nodeDate">{{item.time}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import BMap from 'BMap'
import echarts from 'echarts'
export default {
  data () {
    return {
      jData: ''
    }
  },
  created () {
    axios('./platform_investigate_history')
      .then(res => {
        this.jData = res.data.data
        this.jData.sort(function (obj1, obj2) {
          var time1 = obj1.time
          var time2 = obj2.time
          if (Number(time1.slice(0, 4)) - Number(time2.slice(0, 4))) {
            return Number(time1.slice(0, 4)) - Number(time2.slice(0, 4))
          } else {
            return Number(time1.replace(/-/g, '')) - Number(time2.replace(/-/g, ''))
          }
        })
        console.log(this.jData)
      })
  },
  mounted: function () {
    this.mapCanvas = echarts.init(document.getElementById('mapcanvas'))
  },
  methods: {
    showSection (name, index, address) {
      console.log(address)
      //        showAddress(address)
      //        alert(index)
      var bmap = this.mapCanvas.getModel().getComponent('bmap').getBMap()
      console.log(bmap)
      //        bmap.centerAndZoom(new BMap.Point(address[0], address[1]), 13)
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
      bmap.enableScrollWheelZoom(true)
    }
  }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
div{
    background: #f2f2f2;
}
h1{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: blue;
}
h2{
  font-weight: bold;
  font-size: 24px;
}
.mainTimeLine{
    background-color: #f2f2f2;
    position: relative;
    width: 100%;
    padding-top: 10px;
    margin: 10px 0;
}
.mainTimeLine::after{
    content: '';
    position: absolute;
    top: 0;
    width: 4px;
    margin-left: -2px; 
    left: 30px;
    height: 100%;
    background-color: #d7e4ed;
}
.nodeAddress{
  font-size: 18px;
  font-weight: bold; 
}
.nodeAddress:hover{
  font-weight: bold;
  border-bottom: solid 1px;  
}
.nodeType{
  margin: 15px 0 5px 0;
  font-size: 20px;
}
.nodeGroup{
    position: relative;
    margin: 4rem 0;
}
.nodeGroup::after{
  content: "";
  display: table;
  clear: both;
}
.nodeContent{
    position: relative;
    background: white;
    float: right;
    margin-right: 5%;
    padding: 1.5rem 2rem;
    width: 75%;
    box-shadow: 0 3px 0 #d7e4ed;
}
.nodeContent::before {
  content: '';
  position: absolute;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid white;
  top: 24px;
  left: auto;
  right: 100%;
  border-color: transparent;
  border-right-color: white;
}
.nodeGroup .nodeDate{
    position: relative;
    top: 6px;
    font-size: 15px;
    font-weight: bold;
    float: left;
    bottom: 0;
    padding: .8em 0;
    opacity: .7;
}
.nodeGroup:nth-child(even) .timeNode{
  background: #c03b44;
}
.placeLogo{
  width: 25px;
  height: 25px;
}
.typeLogo{
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
.timeNode{
    position: absolute;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    top: 0;
    left: 30px;
    line-height: 2rem;
    border-radius: 50%;
    box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
    z-index: 99;
}

.bgYellow{
    background-color: yellow;
}
.bgGreen{
    background-color: #75ce66;
}
.bgRed{
    background-color: #c03b44;
}
.timeNode img{
    display: block;
    width: 30px;
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
}

</style>
{"message":"Undefined offset: 1","status_code":500,"debug":{"line":18,"file":"\/var\/www\/html\/app\/Http\/Controllers\/LoginController.php","class":"ErrorException","trace":["#0 \/var\/www\/html\/app\/Http\/Controllers\/LoginController.php(18): Illuminate\\Foundation\\Bootstrap\\HandleExceptions->handleError(8, 'Undefined offse...', '\/var\/www\/html\/a...', 18, Array)","#1 [internal function]: App\\Http\\Controllers\\LoginController->testLogin(Object(Dingo\\Api\\Http\\Request))","#2 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Controller.php(55): call_user_func_array(Array, Array)","#3 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/ControllerDispatcher.php(44): Illuminate\\Routing\\Controller->callAction('testLogin', Array)","#4 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php(203): Illuminate\\Routing\\ControllerDispatcher->dispatch(Object(Illuminate\\Routing\\Route), Object(App\\Http\\Controllers\\LoginController), 'testLogin')","#5 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php(160): Illuminate\\Routing\\Route->runController()","#6 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php(572): Illuminate\\Routing\\Route->run()","#7 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php(30): Illuminate\\Routing\\Router->Illuminate\\Routing\\{closure}(Object(Dingo\\Api\\Http\\Request))","#8 \/var\/www\/html\/app\/Http\/Middleware\/CheckLogin.php(32): Illuminate\\Routing\\Pipeline->Illuminate\\Routing\\{closure}(Object(Dingo\\Api\\Http\\Request))","#9 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): App\\Http\\Middleware\\CheckLogin->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#10 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php(53): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#11 \/var\/www\/html\/vendor\/dingo\/api\/src\/Http\/Middleware\/PrepareController.php(45): Illuminate\\Routing\\Pipeline->Illuminate\\Routing\\{closure}(Object(Dingo\\Api\\Http\\Request))","#12 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): Dingo\\Api\\Http\\Middleware\\PrepareController->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#13 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php(53): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#14 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(102): Illuminate\\Routing\\Pipeline->Illuminate\\Routing\\{closure}(Object(Dingo\\Api\\Http\\Request))","#15 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php(574): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))","#16 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php(533): Illuminate\\Routing\\Router->runRouteWithinStack(Object(Illuminate\\Routing\\Route), Object(Dingo\\Api\\Http\\Request))","#17 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php(511): Illuminate\\Routing\\Router->dispatchToRoute(Object(Dingo\\Api\\Http\\Request))","#18 \/var\/www\/html\/vendor\/dingo\/api\/src\/Routing\/Adapter\/Laravel.php(81): Illuminate\\Routing\\Router->dispatch(Object(Dingo\\Api\\Http\\Request))","#19 \/var\/www\/html\/vendor\/dingo\/api\/src\/Routing\/Router.php(513): Dingo\\Api\\Routing\\Adapter\\Laravel->dispatch(Object(Dingo\\Api\\Http\\Request), 'v1')","#20 \/var\/www\/html\/vendor\/dingo\/api\/src\/Http\/Middleware\/Request.php(126): Dingo\\Api\\Routing\\Router->dispatch(Object(Dingo\\Api\\Http\\Request))","#21 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(114): Dingo\\Api\\Http\\Middleware\\Request->Dingo\\Api\\Http\\Middleware\\{closure}(Object(Dingo\\Api\\Http\\Request))","#22 \/var\/www\/html\/app\/Http\/Middleware\/Cors.php(18): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#23 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): App\\Http\\Middleware\\Cors->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#24 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php(30): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#25 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#26 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php(30): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#27 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#28 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/ValidatePostSize.php(27): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#29 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#30 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/CheckForMaintenanceMode.php(46): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#31 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#32 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(102): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Dingo\\Api\\Http\\Request))","#33 \/var\/www\/html\/vendor\/dingo\/api\/src\/Http\/Middleware\/Request.php(127): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))","#34 \/var\/www\/html\/vendor\/dingo\/api\/src\/Http\/Middleware\/Request.php(103): Dingo\\Api\\Http\\Middleware\\Request->sendRequestThroughRouter(Object(Dingo\\Api\\Http\\Request))","#35 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(148): Dingo\\Api\\Http\\Middleware\\Request->handle(Object(Dingo\\Api\\Http\\Request), Object(Closure))","#36 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php(53): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))","#37 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php(102): Illuminate\\Routing\\Pipeline->Illuminate\\Routing\\{closure}(Object(Illuminate\\Http\\Request))","#38 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php(151): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))","#39 \/var\/www\/html\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php(116): Illuminate\\Foundation\\Http\\Kernel->sendRequestThroughRouter(Object(Illuminate\\Http\\Request))","#40 \/var\/www\/html\/public\/index.php(53): Illuminate\\Foundation\\Http\\Kernel->handle(Object(Illuminate\\Http\\Request))","#41 \/var\/www\/html\/index.php(21): require_once('\/var\/www\/html\/p...')","#42 {main}"]}}