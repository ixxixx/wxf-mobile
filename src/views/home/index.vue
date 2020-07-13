<template>
  <div class="home">
    <!-- <div class="head">
      <div class="left">首页</div>
      <div class="title">智慧消防</div>
      <div class="right-wz">应用管理</div>
    </div>
    <main>
      <div>
        <div class="main-tit">
          <i class="line"></i><span>在线设备</span> <span class="tj">统计</span>
        </div>
        <div class="fist">
          <div id="online"></div>
          <div class="sixNav">
            <ul>
              <li>
                <i class="ico"></i>
                <p>火警<br />0</p>
              </li>
              <li>
                <i class="ico"></i>
                <p>预警<br />0</p>
              </li>
              <li>
                <i class="ico"></i>
                <p>故障<br />0</p>
              </li>
              <li>
                <i class="ico"></i>
                <p>事件<br />0</p>
              </li>
              <li>
                <i class="ico"></i>
                <p>隐患<br />0</p>
              </li>
              <li>
                <i class="ico"></i>
                <p>离线<br />0</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div class="main-tit"><i class="line"></i><span>常用服务</span></div>
        <div class="two">
          <ul>
            <li><i class="icos"></i><p class="cyfwName">报警信息</p></li>
            <li><i class="icos"></i><p class="cyfwName">项目管理</p></li>
            <li><i class="icos"></i><p class="cyfwName">维保维修</p></li>
            <li><i class="icos"></i><p class="cyfwName">增值服务</p></li>
            <li><i class="icos"></i><p class="cyfwName">烟 感</p></li>
            <li><i class="icos"></i><p class="cyfwName">燃 气</p></li>
            <li><i class="icos"></i><p class="cyfwName">智慧用电</p></li>
            <li><i class="icos"></i><p class="cyfwName">物联网关</p></li>
          </ul>
        </div>
      </div>
      <div>
        <div class="main-tit"><i class="line"></i><span>管控区域</span></div>
        <div class="three">
          <ul>
            <li>
                <i class="Icos"></i>
                <p>场所总数<br />100</p>
              </li>
            <li>
                <i class="Icos"></i>
                <p>联网设备<br />100</p>
              </li>
            <li>
                <i class="Icos"></i>
                <p>设备总数<br />100</p>
              </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="main-tit">
          <i class="line"></i><span>近15天火警&故障数量情况</span>
        </div>
        <div class="four">
          <div id="SituationZXT"></div>
        </div>
      </div>
    </main> -->
    <router-view />
    <TabNav></TabNav>
  </div>
</template>

<script>
import TabNav from '@/components/tabNav.vue'
// import HomePage from './components/homePage.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    TabNav
    // HomePage
  }
}
</script>

<style lang="less" scoped>
</style>
