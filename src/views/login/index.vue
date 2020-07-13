<template>
  <div class="login">
    <header>帐号登录</header>
    <main>
      <span class="tips">请进行登录</span>

      <van-field v-model="account" placeholder="账号" />
      <van-field type="password" v-model="password" placeholder="密码" />
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        :loading="loadingShow"
        @click="login"
        >登录</van-button
      >
      <div class="relevant">
        <!-- <span @click="dialogForget = true">忘记密码</span>
        <span @click="dialogZc = true">注册帐号</span> -->
        <span class="tips">切换微信授权登录</span>
        <i @click="wxLogin" class="vxImg"></i>
      </div>
    </main>
    <van-dialog
      v-model="dialogZc"
      title="注册帐号"
      @confirm="registerZC"
      show-cancel-button
    >
      <van-field v-model="ZcAccount" placeholder="账号" />
      <van-field type="password" v-model="Zcpassword" placeholder="密码" />
    </van-dialog>
    <van-dialog
      style="height: 880px;"
      class="wzpaw"
      v-model="dialogForget"
      title="忘记密码"
      @confirm="forgetPaw"
      show-cancel-button
    >
      <van-field v-model="bindAccount" placeholder="绑定帐号" />
      <van-field v-model="bindPhone" placeholder="绑定手机" />
      <van-field
        v-model="bindDx"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            round
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            style="width:330px"
            size="small"
            type="primary"
            :disabled="!!timer"
            @click="getCode"
            >{{ timer ? `${codeTime}秒后重新获取` : "获取验证码" }}</van-button
          >
        </template>
      </van-field>

      <van-field v-model="newPaw" placeholder="新密码" />
    </van-dialog>
    <van-overlay class-name="zzcshow" :show="zzcshow" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" />
  </div>
</van-overlay>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      openid: null,
      initState: null,
      account: '',
      password: '',
      loadingShow: false,
      userInfo: '',
      dialogZc: false,
      dialogForget: false,
      ZcAccount: '',
      Zcpassword: '',
      bindAccount: '',
      bindPhone: '',
      bindDx: '',
      newPaw: '',
      // 倒计时的时候
      codeTime: 10,
      // 设置一个定时器
      timer: null,
      zzcshow: false
    }
  },
  created () {
    this.getOpenId()
    // this.openid = JSON.parse(sessionStorage.getItem('openid'))
    // console.log(this.openid.openid)
  },
  mounted () {
    if (this.openid !== '' && this.initState === 1) {
      this.$toast.loading({
        message: '已登录',
        forbidClick: true
      })
      this.wxLogin()
    }
  },
  methods: {
    getOpenId () {
      const search = location.search
      console.log(search)
      if (search === '') {
        this.zzcshow = true
        this.$toast.loading({
          message: '申请授权中',
          forbidClick: true
        })
        window.sessionStorage.setItem('initState', JSON.stringify(1))
        // const callbackUrl = 'http://xf.padssz.com/wechart'
        const callbackUrl = 'http://192.168.0.9:8080'
        window.location.href = `http://xf.padssz.com:9265/pf/wx/menu/homepage?url=${callbackUrl}`
        // window.sessionStorage.setItem('openid', JSON.stringify(params))
      } else {
        const params = {}
        if (search !== '') {
          search.slice(1).split('&').forEach(
            function (val) {
              const arr = val.split('=')
              params[arr[0]] = arr[1]
              window.sessionStorage.setItem('openid', JSON.stringify(params))
            })
        }
        this.openid = JSON.parse(sessionStorage.getItem('openid'))
        this.initState = JSON.parse(sessionStorage.getItem('initState'))
      }
    // this.initState = JSON.parse(sessionStorage.getItem('initState'))
    },
    login () {
      this.loadingShow = true
      const dto = {
        nameOrPhone: this.account,
        userPwd: this.password,
        initState: 2,
        openId: '987654321'
      }
      this.$http.post('/pf/wxlogin/login', dto).then((res) => {
        this.userInfo = res.data.data
        if (res.data.code === 0) {
          this.$router.push('/home/homePage')
          this.loadingShow = false
          window.sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          window.sessionStorage.setItem('initState', JSON.stringify(dto.initState))
        } else {
          this.$notify({
            message: res.data.message,
            color: '#fff',
            background: '#ff0000'
          })
          this.loadingShow = false
        }
      }
      )
    },
    register () {
      this.dialogZc = true
    },
    registerZC () {
      console.log('1')
    },
    forgetPaw () {
      console.log('2')
    },
    getCode () {
    // 验证通过：开启倒计时
      const phoneNumber = this.bindDx
      this.$http.get(`/pf/user/reg/vcode/${phoneNumber}`).then((res) => {
        if (res.data.code === 0) {
          this.timer = setInterval(() => {
          // 时间需要减少
            this.codeTime--
            // 当时间为 0 时，需要将定时器清除
            if (this.codeTime <= 0) {
            // 清除定时器
              clearTimeout(this.timer)
              // 重置倒计时
              this.codeTime = 10
              // 将定时器重置为 null
              this.timer = null
            }
          }, 1000)
        }
      })
    },
    wxLogin () {
    // const initState = 1
    // this.$router.push('/home/homePage')
    // window.sessionStorage.setItem('initState', JSON.stringify(initState))
    // sessionStorage.removeItem('userInfo')
      // this.loadingShow = true
      const dto = {
        initState: 1,
        openId: this.openid.openid
      }
      this.$http.post('/pf/wxlogin/login', dto).then((res) => {
        this.userInfo = res.data.data
        if (res.data.code === 0) {
          this.$router.push('/home/homePage')
          this.loadingShow = false
          window.sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          window.sessionStorage.setItem('initState', JSON.stringify(dto.initState))
        } else {
          this.$notify({
            message: res.data.message,
            color: '#fff',
            background: '#ff0000'
          })
          // this.loadingShow = false
        }
      }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/bj.jpg");
  // background: url('../../assets/bj4.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-top: 100px;
  header {
    font-size: 52px;
    width: 100%;
    height: 100px;
    color: #fff;
    line-height: 140px;
    text-align: center;
  }
  main {
    width: 100%;
    .van-cell-group {
      background-color: transparent;
    }
    .tips {
      display: block;
      width: 100%;
      height: 35px;
      font-size: 26px;
      color: #ccc;
      margin-top: 70px;
      text-align: center;
    }
    .van-cell {
      width: 80%;
      height: 100px;
      padding: 10px 16px;
      color: #222;
      font-size: 36px;
      line-height: 80px;
      border-radius: 10px;
      margin: 50px auto;
      background-color: #f2f2f2;
    }
    .van-button--normal {
      margin-top: 60px;
      margin-left: 10%;
      border-radius: 10px;
      width: 80%;
      height: 100px;
      font-size: 38px;
    }
    .van-loading__spinner {
      width: 60px !important;
      height: 60px !important;
    }
    .relevant {
      width: 80%;
      margin: 100px auto;
      position: relative;
      span {
        // display: block;
        float: left;
        color: #fff;
        font-size: 30px;
        &:nth-child(2) {
          float: right;
        }
      }
      .vxImg {
        // display: block;
        position: absolute;
        width: 150px;
        height: 150px;
        // background-color: #fff;
        background-image: url("../../assets/vxLogo.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 40px;
        top: 200px;
        left: 325px;
      }
    }
  }
  .van-dialog {
    width: 80%;
    height: 600px;
    font-size: 40px;
    /deep/.van-dialog__header {
      height: 100px;
      padding-top: 10px;
      line-height: 100px;
      font-size: 60px;
    }
    /deep/.van-dialog__content {
      height: 320px ;
    }
    .van-field {
      height: 100px;
      font-size: 40px;
      margin: 50px;
      width: 90%;
      border-bottom: 2px solid #c1c1c1;
    }
    /deep/.van-button {
      height: 100px;
      font-size: 40px;
    }
  }
}
.wzpaw {
  /deep/.van-dialog__content {
      height: 580px !important;
    }
}
.zzcshow {
  background-color: #fff;
}
</style>
