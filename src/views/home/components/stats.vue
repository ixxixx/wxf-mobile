<template>
  <div class="home-cont-stats">
    <div class="head">
      <div class="left">
        <span>亿源达商务大厦消防平台</span>
        <van-icon name="arrow-down" />
        <van-icon @click="fhsy" name="cross" />
      </div>
    </div>
    <div class="stats-main">
      <van-tabs
        v-model="activeName"
        swipe-threshold="4"
        line-width="160px"
        sticky
      >
        <van-tab title="火警状态" name="a">
          <div class="ec" id="hjzt"></div>
          <div class="hjzt-list">
            <ul>
              <router-link to="Xiangxi">
                <li class="tab-lists">
                  <p class="lists-tit">点型光电感烟火灾探测器</p>
                  <p>设备编码: 01_NB_20040101010104401078</p>
                  <p>所属场所: 亿源达商务大厦消防平台</p>
                  <p>火警状态: 火警</p>
                  <p>复核结果: 火警误报</p>
                  <p>发生时间: 2020-02-02</p>
                </li></router-link
              >
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码: 01_NB_20040101010104401078</p>
                <p>所属场所: 亿源达商务大厦消防平台</p>
                <p>火警状态: 火警</p>
                <p>复核结果: 火警误报</p>
                <p>发生时间: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码: 01_NB_20040101010104401078</p>
                <p>所属场所: 亿源达商务大厦消防平台</p>
                <p>火警状态: 火警</p>
                <p>复核结果: 火警误报</p>
                <p>发生时间: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码: 01_NB_20040101010104401078</p>
                <p>所属场所: 亿源达商务大厦消防平台</p>
                <p>火警状态: 火警</p>
                <p>复核结果: 火警误报</p>
                <p>发生时间: 2020-02-02</p>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="火警复查" name="b"
          ><div class="ec" id="hjfc"></div>
          <div class="hjfc-list">
            <ul>
              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>

              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">2020-02</p>
                <span>火警数: 20</span>
                <span>复核数: 25</span>
              </li>
            </ul>
          </div></van-tab
        >
        <van-tab title="设备隐患" name="c">
          <div class="ec" id="sbyh"></div>
          <div class="sbyh-list">
            <ul>
              <li class="tab-lists">
                <van-tag mark color="#f27c4a">隐患</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#f27c4a">隐患</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>

              <li class="tab-lists">
                <van-tag mark color="#f27c4a">隐患</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#f27c4a">隐患</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
            </ul>
          </div></van-tab
        >
        <van-tab title="报警类型" name="d">
          <div class="ec" id="bjlx"></div>
          <div class="bjlx-list">
            <ul>
              <li class="tab-lists">
                <van-tag mark color="#ff0000">火警</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#f4ea2a">故障</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#ba3d27">预警</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#ba3d27">预警</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="火情误报" name="e"
          ><div class="ec" id="hqwb"></div>
          <div class="hqwb-list">
            <ul>
              <li class="tab-lists">
                <van-tag mark color="#ff0000">火警</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#f4ea2a">故障</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#ba3d27">预警</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <van-tag mark color="#ba3d27">预警</van-tag>
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
            </ul>
          </div></van-tab
        >
        <van-tab title="在线统计" name="f"
          ><div class="ec" id="zxtj"></div>
          <div class="zxtj-list">
            <ul>
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
              <li class="tab-lists">
                <p class="lists-tit">点型光电感烟火灾探测器</p>
                <p>设备编码:</p>
                <p>01_NB_20040101010104401078</p>
                <p>在线状态: 在线</p>
                <p>最后连接: 2020-02-02</p>
              </li>
            </ul>
          </div></van-tab
        >
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/evenBus.js'
export default {
  data () {
    return {
      activeName: ''
    }
  },
  created () {
    // this.$nextTick(() => {
    //   this.hjztEcharts()
    // })
    EventBus.$on('aMsg', msg => {
      // A发送来的消息
      this.activeName = msg
    })
  },
  watch: {
    // 监听
    activeName (val) {
      if (val === 'a') {
        this.$nextTick(() => {
          this.hjztEcharts()
        })
      } else if (val === 'b') {
        this.$nextTick(() => {
          this.hjfcEcharts()
        })
      } else if (val === 'c') {
        this.$nextTick(() => {
          this.sbyhEcharts()
        })
      } else if (val === 'd') {
        this.$nextTick(() => {
          this.bjlxEcharts()
        })
      } else if (val === 'e') {
        this.$nextTick(() => {
          this.hqwbEcharts()
        })
      } else if (val === 'f') {
        this.$nextTick(() => {
          this.zxtjEcharts()
        })
      }
    }
  },

  methods: {
    hjztEcharts () {
      // 初始化
      this.hjztec = this.echarts.init(document.querySelector('#hjzt'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :  <br/>占比={d}% <br/> 共计{c}个',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          orient: 'horizontal',
          show: true,
          x: 'center',
          bottom: 'bottom',
          itemGap: 60,
          itemWidth: 28,
          itemHeight: 28,
          data: ['真实火警', '火警误报', '测试火警', '未复核'],
          textStyle: {
            // color: '#fff',
            fontSize: 30
          }
        },
        color: ['#f00', '#f4ea2a', '#a4cf64', '#4d4d4d'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['50%', '45%'],
            data: [
              { value: 1, name: '真实火警' },
              { value: 3, name: '火警误报' },
              { value: 4, name: '测试火警' },
              { value: 10, name: '未复核' }
            ],
            label: {
              show: false
            }
          }
        ]
      }
      this.hjztec.setOption(option)
    },
    hjfcEcharts () {
      this.hjfcec = this.echarts.init(document.querySelector('#hjfc'))
      const option = {
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          bottom: 'bottom',
          itemGap: 60,
          itemWidth: 28,
          itemHeight: 28,
          data: ['复核数', '火警数'],
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          top: '15%',
          bottom: '25%'
        },
        xAxis: {
          data: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06'],
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            show: true,
            textStyle: {
              fontSize: 28
            }
          },
          axisTick: { // 刻度值线
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 3 // 粗细
            }
          }
        },
        yAxis: {
          splitNumber: 4,
          axisLabel: {
            fontSize: 30
          },
          splitLine: {
            show: false
          },
          axisTick: { // 刻度值线
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 3 // 粗细
            }
          }
        },
        series: [{
          name: '复核数',
          type: 'bar',
          stack: '使用情况',
          data: [20, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: { color: '#a4cf64' }
          }
        }, {
          name: '火警数',
          type: 'bar',
          stack: '使用情况',
          data: [25, 15, 30, 35, 28, 33],
          itemStyle: {
            normal: { color: '#f00' }
          }
        }]
      }
      this.hjfcec.setOption(option)
    },
    sbyhEcharts () {
      // 初始化
      this.sbyhec = this.echarts.init(document.querySelector('#sbyh'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :  <br/>占比={d}% <br/> 共计{c}个',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          orient: 'horizontal',
          show: true,
          x: 'center',
          bottom: 'bottom',
          itemGap: 60,
          itemWidth: 28,
          itemHeight: 28,
          data: ['在线', '离线', '隐患'],
          textStyle: {
            // color: '#fff',
            fontSize: 30
          }
        },
        color: ['#a4cf64', '#4d4d4d', '#f27c4a'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['50%', '45%'],
            data: [
              { value: 11, name: '在线' },
              { value: 13, name: '离线' },
              { value: 10, name: '隐患' }
            ],
            label: {
              show: false
            }
          }
        ]
      }
      this.sbyhec.setOption(option)
    },
    bjlxEcharts () {
      // 初始化
      this.bjlxec = this.echarts.init(document.querySelector('#bjlx'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :  <br/>占比={d}% <br/> 共计{c}个',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          orient: 'horizontal',
          show: true,
          x: 'center',
          bottom: 'bottom',
          itemGap: 60,
          itemWidth: 28,
          itemHeight: 28,
          data: ['火警', '预警', '故障', '隐患'],
          textStyle: {
            // color: '#fff',
            fontSize: 30
          }
        },
        color: ['#f00', '#ba3d27', '#f4ea2a', '#f27c4a'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['50%', '45%'],
            data: [
              { value: 1, name: '火警' },
              { value: 1, name: '预警' },
              { value: 1, name: '故障' },
              { value: 1, name: '隐患' }
            ],
            label: {
              show: false
            }
          }
        ]
      }
      this.bjlxec.setOption(option)
    },
    hqwbEcharts () {
      // 初始化
      this.hqwbec = this.echarts.init(document.querySelector('#hqwb'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :  <br/>占比={d}% <br/> 共计{c}个',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          orient: 'horizontal',
          show: true,
          x: 'center',
          bottom: 'bottom',
          itemGap: 60,
          itemWidth: 28,
          itemHeight: 28,
          data: ['火警', '预警', '故障', '隐患'],
          textStyle: {
            // color: '#fff',
            fontSize: 30
          }
        },
        color: ['#f00', '#ba3d27', '#f4ea2a', '#f27c4a'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['50%', '45%'],
            data: [
              { value: 1, name: '火警' },
              { value: 1, name: '预警' },
              { value: 1, name: '故障' },
              { value: 1, name: '隐患' }
            ],
            label: {
              show: false
            }
          }
        ]
      }
      this.hqwbec.setOption(option)
    },
    zxtjEcharts () {
      // 初始化
      this.zxtjec = this.echarts.init(document.querySelector('#zxtj'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} :  <br/>占比={d}% <br/> 共计{c}个',
          textStyle: {
            fontSize: 32
          }
        },
        legend: {
          orient: 'horizontal',
          show: true,
          x: 'center',
          bottom: 'bottom',
          itemGap: 60,
          itemWidth: 28,
          itemHeight: 28,
          data: ['在线', '离线'],
          textStyle: {
            // color: '#fff',
            fontSize: 30
          }
        },
        color: ['#a4cf64', '#808080'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['50%', '45%'],
            data: [
              { value: 1, name: '在线' },
              { value: 1, name: '离线' }
            ],
            label: {
              show: false
            }
          }
        ]
      }
      this.zxtjec.setOption(option)
    },
    fhsy () {
      this.$router.push({ name: 'HomePage' })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/head.less";
.stats-main {
  // margin-bottom: 172px;
  .ec {
    width: 100%;
    height: 460px;
    // background-color: #ccc;
  }
  /deep/.van-tabs--line .van-tabs__wrap {
    height: 110px;
    .van-tab {
      flex-basis: 25% !important;
      font-size: 42px;
      line-height: 110px;
      color: #000;
    }
  }
  /deep/.van-tabs__content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-bottom: 20px;
    .tab-lists {
      position: relative;
      display: block;
      width: 924px;
      height: 350px;
      margin: 35px auto;
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
        right: 50px;
      }
      .van-tag--mark {
        width: 25px;
        height: 80px;
        text-align: center;
        border-radius: 0 0 59px 59px;
      }
    }
    .sbyh-list,
    .bjlx-list,
    .zxtj-list {
      .tab-lists {
        height: 300px;
      }
    }
    .hjfc-list .tab-lists {
      height: 154px;
      span {
        // float: left;
        margin-left: 52px;
        margin-right: 100px;
      }
    }
  }
}
</style>
