<template>
  <div class="home-cont-xiangxi">
    <div class="head">
      <div class="left">
        <van-icon @click="fhsyy" name="arrow-left" />
        <span class="xxxg">信息修改</span>
      </div>
    </div>
    <div class="change-main">
      <ul>
        <van-form @submit="onSubmit">
        <li>
          <p>设备名称:</p>
          <van-field name="设备名称"
            v-model="value1"
            placeholder="请输入需要修改的设备名称"
            clearable
          />
        </li>
        <li>
          <p>设备编码:</p>
          <van-field name="设备编码"
            v-model="value2"
            placeholder="请输入需要修改的设备编码"
            clearable
          />
        </li>
        <li>
          <p>设备状态:</p>
          <van-field name="设备状态"
            v-model="value3"
            placeholder="请输入需要修改的设备状态"
            clearable
          />
        </li>
        <li>
          <p>所属系统:</p>
          <van-field name="所属系统"
            v-model="value4"
            placeholder="请输入需要修改的所属系统"
            clearable
          />
        </li>
        <li>
          <p>设备安装位置:</p>
          <van-field name="设备安装位置"
            v-model="value5"
            placeholder="请输入需要修改的设备安装位置"
            clearable
          />
        </li>
        <li>
          <p>所属场地:</p>
          <van-field name="所属场地"
            v-model="value6"
            placeholder="请输入需要修改的所属场地"
            clearable
          />
        </li>
        <li>
          <p>在线/离线:</p>
          <van-field name="在线/离线" v-model="value7" disabled />
        </li>
        <li>
          <p>所属设备:</p>
          <van-field name="所属设备"
            v-model="value8"
            placeholder="请输入需要修改的所属场地"
            clearable
          />
        </li>
        <li>
          <p>投运日期:</p>
          <van-field name="投运日期"  v-model="value9" disabled />
        </li>
        <li>
          <p>服务截止时间:</p>
          <van-field name="服务截止时间"  v-model="value10" disabled />
        </li>
      <van-button
            round
            block
            type="info"
            native-type="submit"
            :loading="loadingShow"
          >
            提交
          </van-button>
        </van-form>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '点型光电感烟火灾探测器',
      value2: '20040101010104401078',
      value3: '正常',
      value4: '火灾探测报警',
      value5: '搬公司8层21-23内',
      value6: '亿源达商务大厦消防平台',
      value7: '在线',
      value8: '01_NB_20040101010104401078',
      value9: '2020-04-01',
      value10: '2020-03-29',
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
        this.loadingShow = false
      }, 100)
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
.xxxg {
  position: absolute;
  left: 25%;
  font-size: 52px;
  font-weight: 700;
  width: 50%;
  text-align: center;
  line-height: 52px;
}
.home-cont-xiangxi {
  width: 100%;
  height: 100%;
}
.change-main {
  ul {
    width: 100%;
    height: 100%;
    padding-top: 15px;
    padding-bottom: 100px;
    background-color: #fff;
  }
  li {
    display: block;
    width: 874px;
    height: 145px;
    margin: 0 auto;
    border-bottom: 3px solid #e6e6e6;
    font-size: 44px;
    line-height: 60px;
    padding-top: 25px;
    /deep/.van-cell {
      font-size: 44px;
      .van-field__control {
        line-height: 50px;
      }
      .van-icon-clear {
        // width: 52px;
        // height: 52px;
        font-size: 44px;
      }
    }
  }
    .van-button--normal {
      margin-left: 20%;
      margin-top: 100px;
      width: 60%;
      height: 100px;
      font-size: 38px;
      font-weight: 700;
    }
    .van-loading__spinner {
    width: 60px !important;
    height: 60px !important;;
  }
}
</style>
