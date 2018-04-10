import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/components/index'
// const index = Vue.component('index', function (resolve) {
//       require(['../components/index.vue'], resolve)
// });
const index = r => require.ensure([], () => r(require('@/components/index.vue')), 'index')
// import indexPage from '@/components/indexPage'
// const indexPage = Vue.component('indexPage', function (resolve) {
//   require(['../components/indexPage.vue'], resolve)
// });
const indexPage = r => require.ensure([], () => r(require('@/components/indexPage.vue')), 'indexPage')
// import upload from '@/components/upload'
// const upload = Vue.component('upload', function (resolve) {
//   require(['../components/upload.vue'], resolve)
// });
const upload = r => require.ensure([], () => r(require('@/components/upload.vue')), 'upload')
// import infochanges from "@/components/infochanges"
const infochanges = r => require.ensure([], () => r(require('@/components/infochanges.vue')), 'infochanges')
// import suiche_cesuan from "@/components/suiche_cesuan"
const suiche_cesuan = r => require.ensure([], () => r(require('@/components/suiche_cesuan.vue')), 'suiche_cesuan')
// import cameraG from "@/components/camerag"
const cameraG = r => require.ensure([], () => r(require('@/components/cameraG.vue')), 'cameraG')
// import navigate from "@/components/navigate"
const navigate = r => require.ensure([], () => r(require('@/components/navigate.vue')), 'navigate')
// import jiaoluanpai from "@/components/jiaoluanpai"
const jiaoluanpai = r => require.ensure([], () => r(require('@/components/jiaoluanpai.vue')), 'jiaoluanpai')
// import peopleManage from "@/components/peopleManage"
const peopleManage = r => require.ensure([], () => r(require('@/components/peopleManage.vue')), 'peopleManage')
// import dataAnalysis from "@/components/dataAnalysis"
const dataAnalysis = r => require.ensure([], () => r(require('@/components/dataAnalysis.vue')), 'dataAnalysis')
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: indexPage
    },
    {
      path: '/upload',
      name:'upload',
      component:upload
    },
    {
      path:'/infochanges',
      name:'infochanges',
      component:infochanges
    },
    {
      path:'/suiche_cesuan',
      name:'suiche_cesuan',
      component:suiche_cesuan
    },
    {
      path:'/camerag',
      name:'camerag',
      component:cameraG
    },
    {
      path:'/navigate',
      name:'navigate',
      component:navigate
    },
    {
      path:'/jiaoluanpai',
      name:'jiaoluanpai',
      component:jiaoluanpai
    },
    {
      path:'/peopleManage',
      name:'peopleManage',
      component:peopleManage
    },
    {
      path:'/dataAnalysis',
      name:'dataAnalysis',
      component:dataAnalysis
    }
  ]
})
