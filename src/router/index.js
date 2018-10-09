import Vue from 'vue'
import Router from 'vue-router'
import MainFrame from '@/components/MainFrame'
import RegisterLogFrame from '@/components/RegisterLogFrame'
import RegisterDetailFrame from '@/components/RegisterDetailFrame'
import DetailFrame from '@/components/DetailFrame'
import CompareFrame from '@/components/CompareFrame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainFrame',
      component: MainFrame
    }, {
      path: '/infopanel/:platformId',
      name: 'DetailFrame',
      component: DetailFrame
    }, {
      path: '/registerlog',
      name: 'RegisterLogFrame',
      component: RegisterLogFrame
    }, {
      path: '/registerdetail',
      name: 'RegisterDetailFrame',
      component: RegisterDetailFrame
    }, {
      path: '/comparepanel/:compareIds',
      name: 'CompareFrame',
      component: CompareFrame
    }
  ]
})
