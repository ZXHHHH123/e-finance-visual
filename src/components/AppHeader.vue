<template>
  <div class="app-header">
    <b-navbar toggleable="md" variant="info">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="#">
        <img src="../assets/img/logo.png" class="d-inline-block" alt="" style="padding-bottom:5px"/>
        <span class="brand-txt">互联网金融大数据分析平台</span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item-dropdown style="padding-top: 6px;">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em class="brand-dropdown">金融风控分析</em>
            </template>
            <b-dropdown-item @click="directTo('MainFrame')">金融风控分析</b-dropdown-item>
            <b-dropdown-item @click="directTo('RegisterLogFrame')">金融用户行为分析</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
        
        <!-- Right aligned nav items -->
        <b-nav is-nav-bar class="ml-auto" style="padding-top: 6px;">
          <b-nav-item href="#">分析平台</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <div class="main-interval"></div>

  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
    }
  },
  methods: {
    directTo: function (val) {
      this.$router.push({name: val})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
