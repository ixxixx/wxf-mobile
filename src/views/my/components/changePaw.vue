<template>
  <div class="change">
    <div class="head">
      <div class="left">
        <van-icon @click="fhsyy" name="arrow-left" />
        <span class="sbxq">修改密码</span>
      </div>
    </div>
    <main>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="手机号码"
          label="手机号码"
          placeholder="手机号码"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="passwordO"
          type="password"
          name="原密码"
          label="原密码"
          placeholder="原密码"
          :rules="[{ message: '原密码' }]"
        />
        <van-field
          v-model="passwordN"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="新密码"
          :rules="[{ message: '新密码' }]"
        />
        <div style="margin: 80px;">
          <van-button
            round
            block
            type="info"
            @click="show =  true"
            :loading="loadingShow"
          >
            提交
          </van-button>
        <!-- <div style="margin: 80px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            :loading="loadingShow"
          >
            提交
          </van-button> -->
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Form, Field, Button } from 'vant'
Vue.use(Form)
Vue.use(Field)
Vue.use(Icon)
Vue.use(Button)
export default {
  data () {
    return {
      show: false,
      username: '',
      passwordO: '',
      passwordN: '',
      loadingShow: false
    }
  },
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    onSubmit (values) {
      this.loadingShow = true
      setTimeout(() => {
        console.log('submit', values)
        this.$notify({
          message: '无法修改',
          background: '#1989fa',
          duration: 2000
        })
        this.loadingShow = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/head.less";
.van-icon-arrow-left {
  position: absolute;
  font-size: 60px;
  left: 10px;
}
.sbxq {
  position: absolute;
  left: 100px;
  line-height: 52px;
}
.change {
  height: 1600px;
  background-color: #fff;
  main {
    // height: 100%;
    padding-top: 155px;
    background-color: #fff;
  }
  .van-cell {
    height: 160px;
    font-size: 52px;
    line-height: 120px;
    padding: 20px 40px;
  }
  /deep/.van-field__label {
    width: 280px;
  }
  .van-button--block {
    height: 100px;
  }
  .van-button--normal {
    font-size: 38px;
    font-weight: 700;
  }
  .van-loading__spinner {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>
