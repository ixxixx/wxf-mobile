import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/wxlogin',
  name: 'Login',
  component: () => import('@/views/login')
},
// 根据目录的重定向
{
  path: '/',
  // 获取微信接口页面
  // redirect: '/empower'
  redirect: '/wxlogin'
},
{
  path: '/empower',
  component: () => import('@/views/empower')
},
{
  path: '/home',
  component: () => import('@/views/home'),
  children: [{
    path: '/home/homePage',
    name: 'HomePage',
    component: () => import('@/views/home/components/homePage.vue')
  },
  {
    path: '/home/xiangxi',
    name: 'Xiangxi',
    component: () => import('@/views/home/components/xiangxi.vue')
  },
  {
    path: '/home/xiangxi/edit',
    name: 'Edit',
    component: () => import('@/views/home/components/edit.vue')
  }, {
    path: '/home/stats',
    name: 'Stats',
    component: () => import('@/views/home/components/stats.vue')
  },
  {
    path: '/home/gas',
    name: 'Gas',
    component: () => import('@/views/home/commonServices/devLists.vue')
    // component: () => import('@/views/home/commonServices/gas.vue')
  },
  {
    path: '/home/host',
    name: 'Host',
    component: () => import('@/views/home/commonServices/devLists.vue')
    // component: () => import('@/views/home/commonServices/host.vue')
  },
  {
    path: '/home/sSensation',
    name: 'SSensation',
    component: () => import('@/views/home/commonServices/devLists.vue')
  },
  {
    path: '/home/electric',
    name: 'Electric',
    component: () => import('@/views/home/commonServices/devLists.vue')
    // component: () => import('@/views/home/commonServices/electric.vue')
  },
  {
    path: '/home/onlineDev',
    name: 'OnlineDev',
    component: () => import('@/views/home/commonServices/devLists.vue')
  },
  {
    path: '/home/offlineDev',
    name: 'OfflineDev',
    component: () => import('@/views/home/commonServices/devLists.vue')
  },
  {
    path: '/home/allDev',
    name: 'AllDev',
    component: () => import('@/views/home/commonServices/devLists.vue')
  },
  {
    path: '/home/project',
    name: 'Project',
    component: () => import('@/views/home/commonServices/project.vue')
  },
  {
    path: '/home/record',
    name: 'Record',
    component: () => import('@/views/home/commonServices/alarm.vue')
  },
  {
    path: '/home/alarm',
    name: 'Alarm',
    component: () => import('@/views/home/commonServices/alarm.vue')
  },
  {
    path: '/home/fault',
    name: 'Fault',
    component: () => import('@/views/home/commonServices/alarm.vue')
  }
  ]
},
{
  path: '/place',
  name: 'Place',
  component: () => import('@/views/place'),
  children: [{
    path: '/place/lieu',
    name: 'Lieu',
    component: () => import('@/views/place/components/lieu.vue')
  }]
}, {
  path: '/qrcode',
  name: 'Qrcode',
  component: () => import('@/views/qrcode/bindDev.vue')
  // component: () => import('@/views/qrcode')
},
//  {
//   path: '/qrcodett',
//   name: 'Qrcodett',
// },
{
  path: '/bindOk',
  name: 'BindOk',
  component: () => import('@/views/qrcode/bindOk.vue')
},
{
  path: '/serve',
  component: () => import('@/views/serve'),
  children: [{
    path: '/serve/service',
    name: 'Service',
    component: () => import('@/views/serve/components/service.vue')
    // component: () => import('../views/serve/components/service.vue')
  }]
},
{
  path: '/my',
  component: () => import('@/views/my'),
  children: [{
    path: '/my/me',
    name: 'Me',
    component: () => import('@/views/my/components/me.vue')
  }, {
    path: '/my/changePaw',
    name: 'ChangePaw',
    component: () => import('@/views/my/components/changePaw.vue')
  }, {
    path: '/my/changeMail',
    name: 'ChangeMail',
    component: () => import('@/views/my/components/changeMail.vue')
  }, {
    path: '/my/commonProblem',
    name: 'CommonProblem',
    component: () => import('@/views/my/components/commonProblem.vue')
  }, {
    path: '/my/knowledge',
    name: 'Knowledge',
    component: () => import('@/views/my/components/knowledge.vue')
  }, {
    path: '/my/hotline',
    name: 'Hotline',
    component: () => import('@/views/my/components/hotline.vue')
  }, {
    path: '/my/agreement',
    name: 'Agreement',
    component: () => import('@/views/my/components/agreement.vue')
  }, {
    path: '/my/setUp',
    name: 'SetUp',
    component: () => import('@/views/my/components/setUp.vue')
  }, {
    path: '/my/switchingUnit',
    name: 'SwitchingUnit',
    component: () => import('@/views/my/components/switchingUnit.vue')
  }, {
    path: '/my/about',
    name: 'About',
    component: () => import('@/views/my/components/about.vue')
  }]
}
]

const router = new VueRouter({
  routes
})

export default router
