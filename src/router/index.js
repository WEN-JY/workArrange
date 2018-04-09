import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import indexPage from '@/components/indexPage'
import upload from '@/components/upload'
import infochanges from "@/components/infochanges"
import suiche_cesuan from "@/components/suiche_cesuan"
import cameraG from "@/components/camerag"
import navigate from "@/components/navigate"
import jiaoluanpai from "@/components/jiaoluanpai"
import peopleManage from "@/components/peopleManage"
import dataAnalysis from "@/components/dataAnalysis"
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
