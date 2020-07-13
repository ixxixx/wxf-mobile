<template>
  <div class="fw-cont">
    <div class="head">
      <div class="left">服务</div>
      <div class="title">智慧消防</div>
      <div class="right-ico">
        <van-icon name="search" />
      </div>
    </div>
    <main>
      <div class="fw-archives">
        <div class="fw-tit">
          <van-icon name="description" />
          <span>档案</span>
        </div>
        <div class="archives-tab">
          <ul class="archives-ul">
             <router-link :to="{name:'ChangePaw'}">
            <li>
              <i class="icon"></i>
              <p>修改密码</p>
            </li>
             </router-link>
            <li>
              <i class="icon"></i>
              <p>设备列表</p>
            </li>
            <li>
              <i class="icon"></i>
              <p>运行记录</p>
            </li>
            <li>
              <i class="icon"></i>
              <p>视频信息</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="fw-statistics">
        <div class="fw-tit"><van-icon name="notes-o" /> <span>统计</span></div>
        <div class="statistics-tab">
          <ul class="statistics-ul">
            <li @click="aMsg">
              <i class="icon"></i>
              <p>火情状态</p>
            </li>
            <li @click="bMsg">
              <i class="icon"></i>
              <p>火情复查</p>
            </li>
            <li @click="cMsg">
              <i class="icon"></i>
              <p>设备故障</p>
            </li>
            <li @click="dMsg">
              <i class="icon"></i>
              <p>报警类型</p>
            </li>
            <li @click="eMsg">
              <i class="icon"></i>
              <p>火情误报</p>
            </li>
            <li @click="fMsg">
              <i class="icon"></i>
              <p>在线统计</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="fw-hiddenDanger">
        <div class="fw-tit"><van-icon name="bulb-o" /> <span>隐患</span></div>
        <div class="hiddenDanger-tab">
          <ul class="hiddenDanger-ul">
            <li>
              <i class="icon"></i>
              <p>上报隐患</p>
            </li>
            <li>
              <i class="icon"></i>
              <p>待办隐患</p>
            </li>
            <li>
              <i class="icon"></i>
              <p>已办隐患</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { EventBus } from '@/evenBus'
export default {
  data () {
    return {
      msg: 'a'
    }
  },
  beforeDestroy () {
    EventBus.$emit('aMsg', this.msg)
  },
  methods: {
    aMsg () {
      this.$router.push({ name: 'Stats' })
      this.msg = 'a'
    },
    bMsg () {
      this.$router.push({ name: 'Stats' })
      this.msg = 'b'
    },
    cMsg () {
      this.$router.push({ name: 'Stats' })
      this.msg = 'c'
    },
    dMsg () {
      this.$router.push({ name: 'Stats' })
      this.msg = 'd'
    },
    eMsg () {
      this.$router.push({ name: 'Stats' })
      this.msg = 'e'
    },
    fMsg () {
      this.$router.push({ name: 'Stats' })
      this.msg = 'f'
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/head.less";
.fw-cont {
  background-color: #fff;
  // margin-bottom: 172px;
  height: 100%;
  // border-bottom: 170px solid #dedede;
  .fw-tit {
    width: 100%;
    height: 150px;
    border-top: 10px solid #dedede;
    border-bottom: 10px solid #dedede;
    font-size: 54px;
    line-height: 120px;
    .van-icon {
      vertical-align: middle;
      margin-left: 75px;
      margin-right: 10px;
      font-size: 60px;
    }
    span {
      vertical-align: middle;
    }
  }
  ul {
    width: 100%;
    height: 100%;
    li {
      float: left;
      width: 25%;
      height: 100%;
      text-align: center;
      font-size: 26px;
      .icon {
        display: block;
        background-image: url("../../../assets/jlt.png");
        background-position: -1558px -95px;
        width: 161px;
        height: 98px;
        // margin: 43px 0 20px 50px;
        margin: 45px auto 30px;
      }
    }
  }
  .fw-archives {
    width: 100%;
    height: 410px;
    .archives-tab {
      width: 100%;
      height: 260px;
      .archives-ul li {
        &:nth-child(2) .icon {
          background-position-x: -1825px;
        }
        &:nth-child(3) .icon {
          background-position-x: -2076px;
        }
        &:nth-child(4) .icon {
          background-position-x: -2363px;
        }
      }
    }
  }
  .fw-statistics {
    width: 100%;
    height: 670px;
    .statistics-tab {
      width: 100%;
      height: 520px;
      .statistics-ul li {
        height: 50%;
        .icon {
          background-position: -1565px -545px;
        }
        &:nth-child(2) .icon {
          background-position-x: -1823px;
        }
        &:nth-child(3) .icon {
          background-position-x: -2080px;
        }
        &:nth-child(4) .icon {
          background-position-x: -2356px;
        }
        &:nth-child(5) .icon {
          background-position-y: -767px;
        }
        &:nth-child(6) .icon {
          background-position: -1824px -767px;
        }
      }
    }
  }
  .fw-hiddenDanger {
    width: 100%;
    height: 410px;
    .hiddenDanger-tab {
      width: 100%;
      height: 260px;
      .hiddenDanger-ul li {
        .icon {
          background-position: -1565px -1271px;
        }
        &:nth-child(2) .icon {
          background-position-x: -1825px;
        }
        &:nth-child(3) .icon {
          background-position-x: -2072px;
        }
      }
    }
  }
}
</style>
