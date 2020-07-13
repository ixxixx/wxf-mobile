<template>
  <div class="home-cont-xiangxi">
    <div class="head">
      <div class="left">
        <van-icon @click="fhsyy" name="arrow-left" />
        <span class="sbxq">设备详情</span>
      </div>
      <div class="right-ico" @click="edit">
        <span>编辑</span>
        <van-icon name="edit" />
      </div>
    </div>
    <div class="xiangxi-main">
      <ul>
        <li>
          <p>设备名称:</p>
          <p class="describe">点型光电感烟火灾探测器</p>
        </li>
         <li>
          <p>设备编码:</p>
          <p class="describe">20040101010104401078</p>
        </li> <li>
          <p>设备状态:</p>
          <p class="describe">正常</p>
        </li> <li>
          <p>所属系统:</p>
          <p class="describe">火灾探测报警</p>
        </li> <li>
          <p>设备安装位置:</p>
          <p class="describe">搬公司8层21-23内</p>
        </li> <li>
          <p>所属场地:</p>
          <p class="describe">亿源达商务大厦消防平台</p>
        </li> <li>
          <p>在线/离线:</p>
          <p class="describe">在线</p>
        </li> <li>
          <p>所属设备:</p>
          <p class="describe">01_NB_20040101010104401078</p>
        </li> <li>
          <p>投运日期:</p>
          <p class="describe">2020-04-01</p>
        </li> <li>
          <p>服务截止时间:</p>
          <p class="describe">2020-03-29</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    edit () {
      this.$router.push({ name: 'Edit' })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/head.less';
.van-icon-arrow-left {
  position: absolute;
  font-size: 60px;
  left: 10px;
}
.sbxq {
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
.head .right-ico {
  width: 180px;
  span{
    vertical-align: middle;
    font-size: 46px;
    margin-right: 15px;
  }
  .van-icon-edit {
    vertical-align: middle;
  }
}
.xiangxi-main {
  //  margin-bottom: 172px;
   ul {
     width: 100%;
     height: 100%;
     padding-top: 15px;
     padding-bottom: 200px;
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
    .describe {
      padding: 10px 16px;
      font-size: 44px;
      line-height: 50px;
      height: 50px;
    }
   }
}
</style>
