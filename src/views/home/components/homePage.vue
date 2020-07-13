<template>
  <div class="home-cont">
    <div class="head">
      <div class="left">首页</div>
      <div class="title">智慧消防</div>
      <!-- <router-link :to="{ name: 'Stats' }">
        <div class="right-wz">应用管理</div>
      </router-link> -->
    </div>
    <main>
      <div>
        <div class="main-tit">
          <i class="line"></i><span>设备统计</span>
          <!-- <router-link :to="{ name: 'Xiangxi' }" -->
            <!-- <span class="tj">统计</span> -->
          <!-- </router-link> -->
        </div>
        <div class="fist">
          <div @click="goAll" id="online"></div>
          <div class="sixNav">
            <ul>
              <li @click="goOnlie">
                <i class="ico"></i>
                <p>在线设备<br />{{this.networkTotal[1].total}}</p>
              <li @click="goOfflie">
                <i class="ico"></i>
                <p>离线设备<br />{{this.networkTotal[0].total}}</p>
              </li>
              <li @click="gotoAlarm">
                <i class="ico"></i>
                <p>{{this.EventTotal[0].eventName}}消息<br />{{this.EventTotal[0].total}}</p>
              </li>
              <li @click="gotoFault">
                <i class="ico"></i>
                <p>{{this.EventTotal[1].eventName}}消息<br />{{this.EventTotal[1].total}}</p>
              </li>
              <!-- <li>
                <i class="ico"></i>
                <p>{{this.EventTotal[2].eventName}}<br />{{this.EventTotal[2].total}}</p>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div class="main-tit"><i class="line"></i><span>常用服务</span></div>
        <div class="two">
          <ul>
             <li @click="gotoYangan">
              <i class="icos"></i>
              <p class="cyfwName">烟感</p>
            </li>
            <li @click="gotoRanqi">
              <i class="icos"></i>
              <p class="cyfwName">燃气</p>
            </li>
            <li @click="gotoYongdian">
              <i class="icos"></i>
              <p class="cyfwName">电气火灾</p>
            </li>
            <li @click="gotoWuliWG">
              <i class="icos"></i>
              <p class="cyfwName">物联网关</p>
            </li>
            <li @click="gotoRecord">
              <i class="icos"></i>
              <p class="cyfwName">信息记录</p>
            </li>
            <li @click="gotoPro">
              <i class="icos"></i>
              <p class="cyfwName">项目管理</p>
            </li>
            <li style="visibility: hidden;">
              <i class="icos"></i>
              <p class="cyfwName">维保维修</p>
            </li>
            <li style="visibility: hidden;">
              <i class="icos"></i>
              <p class="cyfwName">增值服务</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div>
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
      </div> -->
      <div>
        <div class="main-tit">
          <i class="line"></i><span>近15天火警&故障数量情况</span>
        </div>
        <div class="four">
          <div id="SituationZXT"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      userInfo: '',
      initState: '',
      openid: '',
      networkTotal: [{ total: 0 }, { total: 0 }],
      WarnTotal: {},
      EventTotal: [
        { eventName: '报警', total: 0 },
        { eventName: '故障', total: 0 },
        { eventName: '离线', total: 0 }
      ]
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.initState = JSON.parse(sessionStorage.getItem('initState'))
    this.openid = JSON.parse(sessionStorage.getItem('openid'))
    this.getEventTotal()
  },
  methods: {
    getEventTotal () {
      if (this.initState === 2) {
        this.$http.get(`/pf/wxmain/u/dev/eventTotal/${this.userInfo.userId}`).then((res) => {
          this.EventTotal = res.data.data
        })
      } else if (this.initState === 1) {
        this.$http.get(`/pf/wxmain/w/dev/eventTotal//${this.openid.openid}`).then((res) => {
          this.EventTotal = res.data.data
        })
      }
    },
    async OLEcharts () {
      // 初始化
      if (this.initState === 2) {
        await this.$http.get(`/pf/wxmain/u/dev/netTotal/${this.userInfo.userId}`).then((res) => {
          this.networkTotal = res.data.data
          console.log(res.data.data)
        })
      } else if (this.initState === 1) {
        await this.$http.get(`/pf/wxmain/w/dev/netTotal/${this.openid.openid}`).then((res) => {
          this.networkTotal = res.data.data
        })
      }
      this.olec = this.echarts.init(document.querySelector('#online'))
      const option = {
        // backgroundColor: '#fff',
        title: {
          text: '总数',
          subtext: this.networkTotal[1].total + this.networkTotal[0].total,
          x: 'center',
          y: '37%',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 48,
            color: '#000'
          },
          subtextStyle: {
            fontSize: 50,
            color: '#a9d16c'
          }
        },
        series: [{
          type: 'pie',
          stillShowZeroSum: true,
          radius: ['60%', '80%'],
          label: {
            normal: {
              show: false
            }
            // position: 'inner',
            // formatter: '{b}：{c}个',
            // fontSize: 30,
            // color: '#000'
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: this.networkTotal[1].total,
            name: '在线',
            itemStyle: {
              normal: {
                color: '#a9d16c'
              }

            }
          }, {
            value: this.networkTotal[0].total,
            name: '离线',
            itemStyle: {
              normal: {
                color: '#868686'
              }
            }
          }]
        }]
      }
      this.olec.setOption(option)
    },
    async SituationEcharts () {
      // 初始化
      // this.getWarnTotal()
      if (this.initState === 2) {
        await this.$http.get(`/pf/wxmain/u/dev/warn15dayTotal/${this.userInfo.userId}`).then((res) => {
          this.WarnTotal = res.data.data
        })
      } else if (this.initState === 1) {
        await this.$http.get(`/pf/wxmain/w/dev/warn15dayTotal/${this.openid.openid}`).then((res) => {
          this.WarnTotal = res.data.data
        })
      }
      const date = []
      const total = []
      const fTotal = []
      for (var i in this.WarnTotal) {
        this.WarnTotal[i].intraday = (dayjs(this.WarnTotal[i].intraday).format('MM-DD'))
        date.push(this.WarnTotal[i].intraday)
        total.push(this.WarnTotal[i].faultTotal)
        fTotal.push(this.WarnTotal[i].warnTotal)
      }
      this.WarnTotal.WTfaultTotal = fTotal
      this.WarnTotal.WTintraday = date
      this.WarnTotal.WTwarnTotal = total
      this.Situationec = this.echarts.init(document.querySelector('#SituationZXT'))
      const option = {
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          data: ['故障', '火警'],
          right: 30,
          top: 20,
          // orient: 'horizontal',
          icon: 'rect',
          itemWidth: 40,
          itemHeight: 30,
          itemGap: 32,
          textStyle: {
            color: '#4d4d4d',
            fontSize: 36
          }
        },
        grid: {
          left: '10%',
          top: '35%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['01/02', '01/03', '01/04', '01/05', '01/06', '01/07', '01/08', '01/09', '01/10', '01/11', '01/12', '01/13', '01/14', '01/15', '01/16'],
          data: this.WarnTotal.WTintraday,
          axisLabel: {
            interval: 1,
            show: true,
            textStyle: {
              fontSize: 30,
              color: '#808080'
            }
          },
          axisTick: { // 刻度值线
            show: true
          },
          splitLine: { // 网格线
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#b3b3b3',
              width: 3 // 粗细
            }
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 4,
          axisLabel: {
            fontSize: 30,
            color: '#808080'
          },
          axisTick: { // 刻度值线
            show: false
          },
          splitLine: { // 网格线
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#b3b3b3',
              width: 3 // 粗细
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              // color: ["#EAEBEC", "#FFF"]
            }
          }
        },
        series: [
          {
            name: '故障',
            smooth: false, // 平滑
            // symbol: 'none',
            type: 'line',
            // data: [0, 0, 3, 0, 3, 2, 2, 0, 3, 1, 3, 2, 1, 0, 3, 2],
            data: this.WarnTotal.WTfaultTotal,
            symbolSize: 10,
            lineStyle: {
              normal: {
                width: 6
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 6
              }
            }
          },
          {

            name: '火警',
            // symbol: 'none',
            type: 'line',
            // data: [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
            data: this.WarnTotal.WTwarnTotal,
            symbolSize: 12,
            lineStyle: {
              normal: {
                width: 6
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 6
              }
            }
          }
        ],
        color: ['#fbd437', '#FE0404']
      }
      this.Situationec.setOption(option)
    },
    gotoYangan () {
      this.$router.push({ name: 'SSensation' })
    },
    gotoRanqi () {
      this.$router.push({ name: 'Gas' })
    },
    gotoYongdian () {
      this.$router.push({ name: 'Electric' })
    },
    gotoWuliWG () {
      this.$router.push({ name: 'Host' })
    },
    gotoPro () {
      if (this.initState === 2) {
        this.$router.push({ name: 'Project' })
      } else if (this.initState === 1) {
        this.$notify({
          message: '授权用户无法访问',
          background: '#ff000',
          duration: 2000
        })
      }
    },
    gotoRecord () {
      this.$router.push({ name: 'Record' })
    },
    gotoAlarm () {
      this.$router.push({ name: 'Alarm' })
    },
    gotoFault () {
      this.$router.push({ name: 'Fault' })
    },
    goOnlie () {
      this.$router.push({ name: 'OnlineDev' })
    },
    goOfflie () {
      this.$router.push({ name: 'OfflineDev' })
    },
    goAll () {
      this.$router.push({ name: 'AllDev' })
    }
  },
  mounted () {
    this.OLEcharts()
    this.SituationEcharts()
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/head.less";
.head {
  position: relative;
}
.home-cont {
  background-color: #fff;
  // margin-bottom: 172px;
// main {
//   padding-top: 155px;
// }
}
.main-tit {
  position: relative;
  width: 100%;
  height: 74px;
  font-size: 40px;
  font-weight: 550;
  padding-top: 32px;
  span {
    vertical-align: middle;
  }
  .tj {
    position: absolute;
    right: 28px;
    bottom: 0;
    line-height: 40px;
    color: #808080;
  }
  .line {
    display: inline-block;
    margin-left: 28px;
    margin-right: 18px;
    width: 6px;
    height: 42px;
    background-color: #a4cf64;
    vertical-align: middle;
  }
}
.fist {
  height: 408px;
  #online {
    float: left;
    width: 345px;
    height: 408px;
  }
  .sixNav {
    float: right;
    width: 609px;
    height: 408px;
    ul {
      width: 100%;
      height: 100%;
      li {
        float: left;
        box-sizing: border-box;
        width: 50%;
        height: 50%;
        // margin-top: 5%;
        // border-right: 2px solid #e6e6e6;
        .ico {
          display: block;
          width: 105px;
          height: 90px;
          margin: 19px auto;
          background-image: url("../../../assets/iconZ.png");
          // background-position: -232px 0;
          background-position: 0 -204px;
        }
        &:nth-child(2) .ico {
          background-position: -239px -204px;
        }
        &:nth-child(3) .ico {
          background-position: 0 0;
        }
        &:nth-child(4) .ico {
          background-position: -245px 0;
        }
        &:nth-child(n + 3) {
          border-top: 2px solid #e6e6e6;
        //   .ico {
        //     background-position: -234px -201px;
        //   }
        }
        &:nth-child(2n) {
          border-left: 2px solid #e6e6e6;
        //   .ico {
        //     background-position: -234px -201px;
        //   }
        }
        // &:nth-child(3),
        // &:nth-child(6) {
        //   border-right: none;
        //   .ico {
        //     background-position: -719px 0;
        //   }
        // }
        // &:nth-child(5) .ico {
        //   background-position: -463px -203px;
        // }
        // &:nth-child(6) .ico {
        //   background-position: -710px -204px;
        // }

        p {
          color: #808080;
          text-align: center;
          line-height: 36px;
          font-size: 26px;
        }
      }
    }
  }
}
.two {
  height: 518px;
  ul {
    width: 100%;
    height: 100%;
    li {
      float: left;
      width: 25%;
      height: 50%;
      .icos {
        display: block;
        background-image: url("../../../assets/jlt.png");
        background-position: -1px -822px;
        width: 152px;
        height: 152px;
        border-radius: 50%;
        margin: 43px 0 20px 50px;
      }
      &:nth-child(2) .icos {
        background-position-x: -283px;
      }
      &:nth-child(3) .icos {
        background-position-x: -566px;
      }
      &:nth-child(4) .icos {
        background-position-x: -848px;
      }
      &:nth-child(n + 5) .icos {
        background-position: -1px -576px;
      }
      &:nth-child(6) .icos {
        background-position-x: -283px;
      }
      &:nth-child(7) .icos {
        // background-position-x: -566px;
      }
      &:nth-child(8) .icos {
        background-position-x: -848px;
      }
      .cyfwName {
        text-align: center;
        font-size: 36px;
      }
    }
  }
}
.three {
  height: 318px;
  ul {
    width: 100%;
    height: 100%;
    li {
      float: left;
      width: 33.33%;
      height: 100%;
      .Icos {
        display: block;
        width: 197px;
        height: 150px;
        margin: 42px auto 20px;
        background-image: url("../../../assets/jlt.png");
        background-position: -74px -1252px;
      }
      &:nth-child(2) .Icos {
        background-position-x: -498px;
      }
      &:nth-child(3) .Icos {
        background-position-x: -923px;
      }
      p {
        color: #808080;
        text-align: center;
        line-height: 52px;
        font-size: 36px;
      }
    }
  }
}
.four {
  height: 400px;
  #SituationZXT {
    width: 100%;
    height: 100%;
  }
}
</style>
