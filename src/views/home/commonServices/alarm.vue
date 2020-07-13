<template>
  <div class="home-cont-yangan">
    <van-popup
      v-model="searchBox"
      position="top"
      :style="{ height: '20%', borderRadius: '0  0 50px 50px ' }"
    >
      <div class="topSearch">
        <van-cell-group>
          <van-field v-model="input_devId" placeholder="请输入设备ID" />
        </van-cell-group>
        <!-- <van-dropdown-menu>
  <van-dropdown-item v-model="drop1" :options="xialaopt1" />
</van-dropdown-menu> -->
        <van-button
          class="sxbutton"
          icon="search"
          round
          type="info"
          >筛 选</van-button
        >
      </div>
    </van-popup>
    <div class="head">
      <div class="left">
        <van-icon @click="fhsyy" name="arrow-left" />
        <!-- <span class="alarm-tit">信息记录</span> -->
        <span v-if="this.$route.name === 'Record'" class="alarm-tit">全部信息记录</span>
        <span v-if="this.$route.name === 'Alarm'" class="alarm-tit">报警信息记录</span>
        <span v-if="this.$route.name === 'Fault'" class="alarm-tit">故障信息记录</span>
        <!-- <span class="alarm-tit">信息记录</span> -->
      </div>
      <div class="right-ico">
        <van-icon @click="searchBox = true" name="search" />
      </div>
    </div>
    <div class="alarm-main">
      <div class="hjzt-list">
        <ul>
          <!-- <router-link to="Xiangxi"> -->
          <li v-for="(item, index) in alarmInfo" :key="index" class="tab-lists">
            <!-- <p class="lists-tit">{{ "点型光电感烟火灾探测器" }}</p> -->
            <van-tag :color="item.msgType | msgColor" mark type="danger">{{item.msgType | msgType}}</van-tag>
            <!-- <van-tag :color="item.msgType=== 2? '#ee0a24': '#ff976a'" mark type="danger">{{item.msgType | msgType}}</van-tag> -->
            <!-- <p>报警类型:  </p> -->
            <p class="lists-tit">设备编码:  {{item.devId}}</p>
            <p>时间:  {{item.happenTime | dateFilter}}</p>
            <p>信息描述:  {{item.msgDesc}}</p>
            <p>处理状态:  {{item.msgState | msgState}}</p>
            <p>安置点:  {{item.point}}</p>
            <p>备注:  {{item.remark}}</p>
            <p>地址:  {{!(item.province + item.city + item.county + item.detailAddress) ? '无' : item.province + item.city + item.county + item.detailAddress}}</p>
            <van-button
              class="silencing"
              round
              type="warning"
              >复 位</van-button
            >
          </li>
          <!-- </router-link> -->
        </ul>
        <van-pagination
          v-model="currentPage"
          :total-items="this.alarmTotalCount"
          :items-per-page="10"
          @change="changePag"
        />
        <p class="totalC">{{`共`+ this.alarmTotalCount + `条`}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: '',
      initState: '',
      openid: '',
      alarmInfo: {},
      // 分页
      currentPage: 1,
      alarmTotalCount: 0,
      pageIndex: 1,
      pageRow: 10,
      msgType: '',
      searchBox: false,
      input_devId: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.initState = JSON.parse(sessionStorage.getItem('initState'))
    this.openid = JSON.parse(sessionStorage.getItem('openid'))
    this.alarmInfo = {}
    if (this.$route.name === 'Alarm') {
      this.msgType = 2
      this.getRecord()
    } else if (this.$route.name === 'Fault') {
      this.msgType = 3
      this.getRecord()
    } else {
      this.msgType = ''
      this.getRecord()
    }
  },
  mounted () {
  },
  filters: {
    msgState (value) {
      if (value === -1) {
        return '无需处理'
      } else if (value === 0) {
        return '未处理'
      } else {
        return '已处理'
      }
    },
    msgType (value) {
      if (value === 2) {
        return '报警'
      } else if (value === 3) {
        return '故障'
      } else if (value === 1) {
        return '登录'
      } else if (value === 4) {
        return '状态'
      } else if (value === 5) {
        return '复原'
      } else if (value === 6) {
        return '离线'
      } else if (value === 8) {
        return '上线'
      }
    },
    msgColor (value) {
      if (value === 2) {
        return '#ee0a24'
      } else if (value === 3) {
        return '#ff976a'
      } else if (value === 1) {
        return '#009a61'
      } else if (value === 4) {
        return '#1989fa'
      } else if (value === 5) {
        return '#f0f0f0'
      } else if (value === 6) {
        return '#7d7d7d'
      } else if (value === 8) {
        return '#07c160'
      // }
      } else if (value === 7) {
        return '#ff976a'
      }
    }
  },
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    async getRecord () {
      if (this.initState === 2) {
        const dto = {
          // devId:
          msgType: this.msgType,
          pageIndex: this.pageIndex,
          pageRow: this.pageRow,
          userId: this.userInfo.userId
        }
        await this.$http.post('/pf/wxmain/u/dev/warnMsg', dto).then(res => {
          this.alarmTotalCount = res.data.data.totalCount
          this.alarmInfo = res.data.data.data
        })
      } else if (this.initState === 1) {
        const dto = {
          // devId:
          msgType: this.msgType,
          pageIndex: this.pageIndex,
          pageRow: this.pageRow,
          openid: this.openid.openid
        }
        await this.$http.post('/pf/wxmain/w/dev/warnMsg', dto).then(res => {
          console.log(res)
          if (res.data.data) {
            this.alarmTotalCount = res.data.data.totalCount
            this.alarmInfo = res.data.data.data
          }
        })
      }
    },
    changePag (index) {
      this.pageIndex = index
      this.getRecord()
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
.alarm-tit {
  position: absolute;
  left: 25%;
  font-size: 52px;
  font-weight: 700;
  width: 50%;
  text-align: center;
  line-height: 52px;
}
.home-cont-yangan {
  width: 100%;
  height: 100%;
}
.alarm-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 40px 0;
  padding-top: 180px;
  .totalC {
          font-size: 38px;
      margin-top: 30px;
      text-align: center;
    }
}
.tab-lists {
  position: relative;
  display: block;
  width: 904px;
  // height: 390px;
  margin: 0 auto 50px;
  border-radius: 25px;
  font-size: 32px;
  line-height: 52px;
  padding-top: 28px;
  box-shadow: 0 0 20px #ccc;
  p {
    margin-left: 54px;
  }
  .lists-tit {
    font-size: 47px;
    line-height: 67px;
    // margin-top: 30px;
  }
  .van-tag {
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 80px;
  }
  .van-tag--mark {
    width: 25px;
    height: 80px;
    text-align: center;
    border-radius: 0 0 59px 59px;
  }
  .silencing {
    position: absolute;
    width: 200px;
    height: 80px;
    font-size: 32px;
    right: 20px;
    top: 100px;
  }
}
.van-pagination{
  font-size: 40px;
  /deep/.van-pagination__item {
    min-width: 95px !important;
    height: 70px;
    line-height: 70px;
}
}
.topSearch {
    width: 80%;
    margin-left: 10%;
    margin-top: 50px;
    height: 300px;
    .van-cell-group {
      width: 80%;
      margin-left: 10%;
      margin-top: 10px;
    }
    .van-cell {
      height: 100px;
      font-size: 50px;
      border: 1px solid #000;
      border-radius: 20px;
      line-height: 100px;
    }
    .sxbutton {
      margin-top: 30px;
      margin-left: 230px;
      width: 300px;
      font-size: 56px;
      height: 80px;
    }
}
</style>
