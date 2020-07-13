<template>
  <div class="nav">
    <ul>
      <router-link :to="{ name: 'HomePage' }">
        <li class="home">
          <i :class="[changeRouter === 'home' ? 'homeIconR ' : 'homeIcon']"></i>
          <p :class="[changeRouter === 'home' ? 'pred' : 'pp']">首页</p>
        </li>
      </router-link>
      <router-link :to="{ name: 'Lieu' }">
        <li class="place">
        <!-- <li @click="NotOpen" class="place"> -->
          <i
            :class="[changeRouter === 'place' ? 'placeIconR ' : 'placeIcon']"
          ></i>
          <p :class="[changeRouter === 'place' ? 'pred' : 'pp']">场所</p>
        </li>
      </router-link>
      <router-link :to="{ name: 'Qrcode' }">
        <li class="scan">
          <i class="scanIcon"></i>
          <p>扫一扫</p>
        </li>
      </router-link>
      <!-- <router-link :to="{ name: 'Service' }">
        <li class="service">
          <i
            :class="[
              changeRouter === 'serve' ? 'serviceIconR ' : 'serviceIcon'
            ]"
          ></i>
          <p :class="[changeRouter === 'serve' ? 'pred' : 'pp']">服务</p>
        </li>
      </router-link> -->
      <router-link :to="{ name: 'Me' }">
        <li class="my">
          <i :class="[changeRouter === 'my' ? 'myIconR ' : 'myIcon']"></i>
          <p :class="[changeRouter === 'my' ? 'pred' : 'pp']">我的</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    // 判断处于路由位置
    changeRouter () {
      let str = this.$route.path
      if (str.indexOf('home') !== -1) {
        str = 'home'
      } else if (str.indexOf('place') !== -1) {
        str = 'place'
      } else if (str.indexOf('serve') !== -1) {
        str = 'serve'
      } else if (str.indexOf('my') !== -1) {
        str = 'my'
      }
      return str
    }
  },
  methods: {
    NotOpen () {
      this.$notify({
        message: '功能正在完善',
        background: '#1989fa',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  height: 142px;
  position: fixed;
  bottom: 0;
  background-color: #fafafa;
  box-sizing: content-box;
  ul {
    width: 100%;
    height: 100%;
    li {
      float: left;
      display: block;
      width: 25%;
      height: 100%;
      text-align: center;
      font-size: 36px;
      color: #dedede;
      i {
        display: block;
        width: 74px;
        height: 74px;
        margin: 10px auto 15px;
        background-image: url("../assets/jlt.png");
        background-position: -272px -1694px;
      }
    }
    .homeIcon {
      background-position: -272px -1694px;
    }
    .placeIcon {
      background-position: -503px -1603px;
    }
    .scanIcon {
      background-position: -733px -1602px;
    }
    .serviceIcon {
      background-position: -963px -1602px;
    }
    .myIcon {
      background-position: -1188px -1604px;
    }
  }
  //   处于
  .pred {
    color: crimson;
  }
  .pp {
    color: #dedede;
  }
  .homeIconR {
    background-position: -278px -1605px;
  }
  .placeIconR {
    background-position: -496px -1694px;
  }
  .serviceIconR {
    background-position: -956px -1691px;
  }
  .myIconR {
    background-position: -1181px -1695px;
  }
}
</style>
