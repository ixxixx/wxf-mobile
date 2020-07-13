<template>
  <div class="cont">
    <div class="head">
      <div class="left">我的</div>
      <div class="title">智慧消防</div>
      <!-- <div class="right-wz" @click="SignOut">退出登录</div> -->
    </div>
    <main>
      <div class="topInfo">
        <div class="HeadPortrait">
            <img v-if="this.initState === 1" :src="this.userInfo.headImgUrl" alt="">
            <img v-if="this.initState === 2" :src="`http://xf.padssz.com`+this.userInfo.headImg" alt="">
            <!-- <img v-else :src="`this.userInfo.headImgUrl`" alt=""> -->
        </div>
        <div class="info">
          <p class="name">用户名称:  {{this.initState === 1? this.userInfo.nickName : this.userInfo.userName}}</p>
          <p class="phone">{{this.initState === 1? '': this.userInfo.phone}}</p>
        </div>
        <div class="modify">
          <router-link :to="{name:'ChangePaw'}">
          <div class="changePaw change">
            <i class="ico"></i>
            <!-- <img :src="`http://192.168.0.4:9265` + this.userInfo.headImg " alt=""> -->
            <p class="introduce">修改密码</p>
          </div>
          </router-link>
          <!-- <router-link :to="{name:'ChangeMail'}"> -->
          <!-- <div class="changeMail change" @click="NotOpen">
            <i class="ico"></i>
            <p class="introduce">修改邮箱</p>
          </div> -->
          <!-- </router-link> -->
        </div>
      </div>
      <div class="cell-fist">
        <!-- <router-link :to="{name:'CommonProblem'}"> -->
        <div class="cjwt cell" @click="NotOpen">
          <i class="ico"></i>
          <p class="introduce">常见问题</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
        <!-- <router-link :to="{name:'Knowledge'}"> -->
        <div class="aqxfzs cell" @click="NotOpen">
          <i class="ico"></i>
          <p class="introduce">安全消防知识</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
      </div>
      <div class="cell-two">
        <!-- <router-link :to="{name:'Hotline'}"> -->
        <div class="hotline cell" @click="NotOpen">
          <i class="ico"></i>
          <p class="introduce">客服热线</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
        <!-- <router-link :to="{name:'Agreement'}"> -->
        <div class="agreement cell" @click="NotOpen">
          <i class="ico"></i>
          <p class="introduce">用户协议和隐私政策</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
      </div>
      <div class="cell-three ">
        <!-- <router-link :to="{name:'SetUp'}"> -->
        <div class="setUp cell" @click="NotOpen">
          <i class="ico"></i>
          <p class="introduce">设置</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
        <!-- <router-link :to="{name:'SwitchingUnit'}"> -->
        <div class="switch cell" @click="SignOut">
          <i class="ico"></i>
          <p class="introduce">切换单位</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
        <!-- <router-link :to="{name:'About'}"> -->
        <div class="about cell" @click="NotOpen">
          <i class="ico"></i>
          <p class="introduce">关于我们</p>
          <van-icon name="arrow" />
        </div>
        <!-- </router-link> -->
      </div>
      <!-- <div class="cell-fire"></div> -->
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // Notify: ({ duration: 1000 })
      userInfo: '',
      initState: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.initState = JSON.parse(sessionStorage.getItem('initState'))
  },
  methods: {
    SignOut () {
      this.$router.push({ name: 'Login' })
      sessionStorage.removeItem('openid')
      window.sessionStorage.setItem('initState', JSON.stringify(2))
    },
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
@import url("../../../styles/head.less");
.cont {
  background-color: #fafafa;
  height: 100%;
}
main {
  padding-top: 155px;
  .ico {
    display: inline-block;
    width: 53px;
    height: 53px;
    margin-right: 20px;
    background-image: url("../../../assets/jlt.png");
    vertical-align: middle;
  }
  .introduce {
    display: inline-block;
    font-size: 38px;
    line-height: 53px;
    vertical-align: middle;
  }
  .cell {
    position: relative;
    width: 100%;
    height: 50%;
    padding-top: 45px;
    padding-left: 74px;
  }
  .van-icon-arrow {
    position: absolute;
    font-size: 68px;
    right: 20px;
    color: #dedede;
    line-height: 48px;
  }
  .topInfo {
    position: relative;
    width: 100%;
    height: 400px;
    border-bottom: 20px solid #dedede;
    background-image: linear-gradient(#f89996, #bbc0f7);
  //   background: url('../../../assets/uinfo.jpg');
  //   background-size: 100% 100%;
  // background-repeat:no-repeat;
    .HeadPortrait {
      position: absolute;
      left: 74px;
      top: 56px;
      width: 148px;
      height: 148px;
      background-color: crimson;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      position: absolute;
      top: 67px;
      left: 280px;
      line-height: 62px;
      font-size: 36px;
      color: #4d4d4d;
    }
    .modify {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 155px;
      .change {
        float: left;
        width: 50%;
        height: 53px;
        margin-top: 51px;
        padding-left: 145px;
      }
      .changePaw {
        border-right: 2px solid #dedede;
        .ico {
          background-position: -1695px -1072px;
        }
      }
      .changeMail .ico {
        background-position: -2255px -1072px;
      }
    }
  }
  .cell-fist {
    width: 100%;
    height: 280px;
    border-bottom: 10px solid #dedede;
    .cjwt {
      border-bottom: 2px solid #dedede;
      .ico {
        background-position: -2997px -169px;
      }
    }
    .aqxfzs .ico {
      background-position: -2997px -309px;
    }
  }
  .cell-two {
    width: 100%;
    height: 280px;
    border-bottom: 10px solid #dedede;
    .hotline {
      border-bottom: 2px solid #dedede;
      .ico {
        background-position: -2997px -469px;
      }
    }
    .agreement .ico {
      background-position: -2997px -609px;
    }
  }
  .cell-three {
    width: 100%;
    height: 420px;
    border-bottom: 10px solid #dedede;
    .cell {
      height: 33.33%;
    }
    .setUp {
      border-bottom: 2px solid #dedede;
      .ico {
        background-position: -2997px -771px;
      }
    }
    .switch {
      border-bottom: 2px solid #dedede;
      .ico {
        background-position: -2997px -911px;
      }
    }
    .about .ico {
      background-position: -2997px -1070px;
    }
  }
  // .cell-fire {
  //     width: 100%;
  //     height: 400px;
  //     border-bottom: 25px solid #e6e6e6;
  //     margin-bottom: 142px;
  // }
}
</style>
