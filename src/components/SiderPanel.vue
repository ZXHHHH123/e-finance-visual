<template>
  <div class="sider-panel" ref="self">
    <div class="left-panel">
      <span class="sider-btn" @click="menuOut">+</span>
      <div class="left-context">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiderPanel',
  data () {
    return {
    }
  },
  methods: {
    menuOut: function () {
      var _self = this.$refs.self
      console.log(_self.style.left)
      if (_self.style.left === '0px') {
        _self.style.left = '-58px'
      } else {
        _self.style.left = '0px'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sider-panel{
    width: 60px;
    height: 0;
    padding-bottom: 44.5%;
    margin-top: 15px; 
    position: fixed;
    left: -58px;
    top: 50px;
    background-color: white;
    z-index: 999999;
  }
  .sider-panel .sider-btn{
    width: 30px;
    height: 30px;
    position: absolute;
    right: -30px;
    bottom: 15px;
    background-color: #eb5a04;
    font-size: 24px; 
    color: white; 
    padding-right: 5px; 
    list-style: none; 
    line-height: 26px;
  }
  .sider-panel .left-context{
    height: 600px;
    overflow: auto;
    background-color: #F6F7F8; 
    border-right: 2px solid #eb5a04;
  }
</style>
