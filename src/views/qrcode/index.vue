<template>
  <div>
    <div class="head">
      <van-icon @click="fhsyy" name="arrow-left" />
      <div class="title">扫一扫</div>
      <div class="right-ico">
        <van-icon @click="showPopup" name="search" />
      </div>
    </div>
    <van-cell-group>
      <van-field v-model="input_devId" placeholder="请输入设备编号或扫描" />
      <van-icon v-show="!this.input_devId" @click="toQrcode" name="scan" />
      <van-icon v-show="this.input_devId" @click="getdpoint" name="search" />
    </van-cell-group>
    <p class="existence" v-show="this.existence !== ''">
      设备是否存在:{{ this.existence ? "是" : "否" }}
    </p>
    <p class="existence" v-show="this.initialization !== ''">
      设备是否初始化:{{ this.initialization ? "是" : "否" }}
    </p>
    <van-button @click="getproList" v-show="this.existence" round="" type="info"
      >绑定项目</van-button
    >
    <van-field
      class="inputUserId"
      v-show="this.devType !== '' &&this.devType === 1"
      v-model="input_userId"
      placeholder="用户ID(选填)"
    />
    <van-button
      @click="wxdpoint"
      v-show="this.devType !== ''"
      round=""
      type="info"
      >绑定安置点</van-button
    >
    <!-- <div class="bindBox"> -->
    <van-dropdown-menu v-show="this.mune">
      <van-dropdown-item
        v-model="value"
        :options="option1"
        @change="getxiala"
      />
    </van-dropdown-menu>
    <van-button @click="bindPro" v-show="this.mune" round="" type="danger"
      >确定绑定</van-button
    >
    <!-- </div> -->
    <TabNav></TabNav>
    <van-popup
      v-model="bindTkshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="conlist">
        <h2>填写绑定信息</h2>
        <div class="contk">
          <van-form>
            <van-field
              disabled
              v-model="text"
              label="项目名称:"
              placeholder="已选择"
            />
            <van-field
              v-model="bindUInfo.dpName"
              label="安置点:"
              placeholder="请输入安置点"
            />
            <van-field
              v-model="bindUInfo.phone"
              label="联系电话:"
              placeholder="(必填)否则无法收到信息"
            />
            <van-field
              v-model="bindUInfo.dangerLevel"
              label="危险等级:"
              placeholder="危险等级(用数字表示)"
            />
            <van-field name="bindUInfo.personal" label="是否为个体">
              <template #input>
                <van-radio-group
                  v-model="bindUInfo.personal"
                  direction="horizontal"
                >
                  <van-radio name="true">是</van-radio>
                  <van-radio name="false">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- <van-field name="bindUInfo." label="地址">
              <template #input>
                <van-button
                  round
                  type="warning"
                  class="cityButton"
                  @click="cityVisable = true"
                  >选择</van-button
                >
              </template>
            </van-field> -->
            <van-field
              v-model="bindUInfo.province"
              label="地址省份:"
              placeholder="如：广东省"
            />
            <van-field
              v-model="bindUInfo.city"
              label="地址市/区:"
              placeholder="如：深圳市"
            />
            <van-field
              v-model="bindUInfo.county"
              label="地址区/县:"
              placeholder="如：宝安区"
            />
            <van-field
              v-model="bindUInfo.detailAddress"
              label="地址详细:"
              placeholder="如：某某某工业区1号楼"
            />
            <van-field
              v-model="bindUInfo.point"
              label="安装点:"
              placeholder="如：办公室、走廊"
            />
            <van-button @click="addConInfo()" class="TjCon" round type="info"
              >保存</van-button
            >
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="wxbindTkshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="conlist">
        <h2>填写绑定信息</h2>
        <div class="contk">
          <van-form>
            <van-field
              v-model="wxbindUInfo.dpName"
              label="安置点:"
              placeholder="请输入安置点"
            />
            <van-field
              v-model="wxbindUInfo.phone"
              label="联系电话:"
              placeholder="(必填)否则无法收到信息"
            />
            <van-field
              v-model="wxbindUInfo.dangerLevel"
              label="危险等级:"
              placeholder="危险等级(用数字表示)"
            />
            <!-- <van-field
              v-model="wxbindUInfo.point"
              label="安置点:"
              placeholder="安置点"
            /> -->
            <van-field
              v-model="wxbindUInfo.province"
              label="地址省份:"
              placeholder="如：广东省"
            />
            <van-field
              v-model="wxbindUInfo.city"
              label="地址市/区:"
              placeholder="如：深圳市"
            />
            <van-field
              v-model="wxbindUInfo.county"
              label="地址区/县:"
              placeholder="如：宝安区"
            />
            <van-field
              v-model="wxbindUInfo.detailAddress"
              label="地址详细:"
              placeholder="如：某某某工业区1号楼"
            />
            <van-field
              v-model="wxbindUInfo.point"
              label="安装点:"
              placeholder="如：办公室、走廊"
            />
            <van-button @click="wxchange" class="TjCon" round type="info"
              >保存</van-button
            >
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <van-popup
    v-model="cityVisable"
    position="bottom"
    class="areaPopup"
    :style="{ height: '50%' }">
    <van-area visible-item-count="8" item-height="100" :area-list="areaList" :columns-num="3" ref="myArea" title="标题" @confirm="onConfirm" @cancel="onCancel"/>
</van-popup>
  </div>
</template>

<script>
import AeraInfo from '../../../public/js/area'
import TabNav from '@/components/tabNav.vue'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      userInfo: '',
      initState: '',
      openid: '',
      input_devId: '',
      existence: '',
      wxExistence: '',
      mune: false,
      dpId: '',
      proList: [],
      value: '',
      text: '',
      option1: [{ text: '请选择项目', value: '' }],
      bindTkshow: false,
      contactListTk: {},
      bindUInfo: {},
      // 微信登录
      initialization: '',
      devType: '',
      input_userId: '',
      wxbindTkshow: false,
      wxbindUInfo: {},
      // 地区
      cityVisable: false,
      areaList: AeraInfo, // 引用地区信息
      valueArea: '', // 地区值
      arrArea: [] // 存放地区数组
    }
  },
  components: {
    TabNav
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.initState = JSON.parse(sessionStorage.getItem('initState'))
    this.openid = JSON.parse(sessionStorage.getItem('openid'))
  },
  mounted () {
    // this.scan()
    // wx.config({
    // debug: false, // 开启调用模式，调用的所有api的返回值再这
    // appId: appId, // 必填,公众号的唯一标识
    // timestamp: timeStamp, // 必填,生成签名的时间戳
    // nonceStr: nonceStr, // 必填,生存签名的随机串
    // signature: signature, // 必填,签名
    // jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
    // })
  },
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    getdpoint () {
      const devId = this.input_devId
      if (this.initState === 2) {
        this.$http.get(`/pf/wxscan/u/dpoint/${devId}`).then((res) => {
          this.existence = res.data.data
        })
      } else if (this.initState === 1) {
        this.$http.get(`/pf/wxscan/wu/device?devId=${devId}&openid=${this.openid.openid}`).then((res) => {
          // this.wxExistence = res.data.data
          if (res.data.code === 0) {
            this.initialization = res.data.data // 等于true或者false都可以进行绑定
            if (this.initialization === true) {
              this.devType = 0 // true 不给修改
            } else if (this.initialization === false) {
              this.devType = 1 // 允许修改
            }
          } else if (res.data.code === 1) {
            this.$notify({
              message: res.data.message,
              background: '#ff0000',
              duration: 2000
            })
          }
        })
      }
    },
    async getproList () {
      await this.$http.get(`/pf/wxmain/u/project/${this.userInfo.userId}`).then((res) => {
        this.option1 = [{ text: '请选择项目', value: '' }]
        this.proList = res.data.data
        console.log(this.proList)
        for (let i = 0; i < this.proList.length; i++) {
          const list = {}
          list.text = this.proList[i].proName
          list.value = this.proList[i].proId
          this.option1.push(list)
        }
        this.mune = true
        // }
      })
    },
    bindPro () {
      const dto = {
        proId: this.value,
        proName: this.text,
        devId: this.input_devId
      }
      console.log(dto)
      this.$http.post('/pf/wxscan/u/dpoint', dto).then((res) => {
        this.dpId = res.data.data
        console.log(this.dpId)
        if (res.data.code === 0) {
          this.$notify({
            message: '绑定成功',
            background: '#07c160',
            duration: 1000
          })
          this.$dialog.confirm({
            message: '是否填写绑定信息'
          }).then(() => {
            this.bindTkshow = true
          }
          ).catch(() => {
          })
        } else {
          this.$notify({
            message: res.data.message,
            background: '#ff0000',
            duration: 2000
          })
          // this.bindTkshow = true
        }
      })
    },
    getxiala (value) {
      for (let i = 0; i < this.option1.length; i++) {
        if (this.option1[i].value === value) {
          this.text = this.option1[i].text
        }
      }
    },
    addConInfo () {
      const dto = {
        dpName: this.bindUInfo.dpName,
        phone: this.bindUInfo.phone,
        proName: this.text,
        proId: this.value,
        dangerLevel: this.bindUInfo.dangerLevel,
        personal: this.bindUInfo.personal,
        province: this.bindUInfo.province,
        city: this.bindUInfo.city,
        county: this.bindUInfo.county,
        detailAddress: this.bindUInfo.detailAddress,
        point: this.bindUInfo.point,
        dpId: this.dpId
      }
      console.log(dto)
      this.$http.put('/pf/wxscan/u/dpoint', dto).then((res) => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.$notify({
            message: '绑定成功',
            background: '#07c160',
            duration: 2000
          })
          this.bindTkshow = false
          this.$router.go(0)
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        } else {
          this.$notify({
            message: '绑定失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    wxdpoint () {
      const dto = {
        devId: this.input_devId,
        userId: this.userId,
        openid: this.openid.openid,
        type: this.devType
      }
      this.$http.post('/pf/wxscan/wu/dpoint', dto).then((res) => {
        this.dpId = res.data.data
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '绑定成功',
            background: '#07c160',
            duration: 2000
          })
          if (this.devType === 0) {
            setTimeout(() => {
              this.$router.go(0)
            }, 1000)
          } else if (this.devType === 1) {
            this.$dialog.confirm({
              message: '是否填写绑定信息'
            }).then(() => {
              this.wxbindTkshow = true
            }
            ).catch(() => {
            })
          }
        }
      })
    },
    wxchange () {
      const dto = {
        city: this.wxbindUInfo.city,
        county: this.wxbindUInfo.county,
        dangerLevel: this.wxbindUInfo.dangerLevel,
        detailAddress: this.wxbindUInfo.detailAddress,
        dpName: this.wxbindUInfo.dpName,
        phone: this.wxbindUInfo.phone,
        point: this.wxbindUInfo.point,
        province: this.wxbindUInfo.province,
        dpId: this.dpId
      }
      console.log(dto)
      this.$http.put('/pf/wxscan/wu/dpoint', dto).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '编辑信息成功',
            background: '#07c160',
            duration: 2000
          })
          this.wxbindTkshow = false
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        } else {
          this.$notify({
            message: '编辑信息失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    async scan () {
      const url = 'http://192.168.0.4:8080/qrcode'
      // const url = 'http://xf.padssz.com/wechart/qrcode'
      // const url = location.href.split('#')[0]
      console.log(url)
      await this.$http.get(`/pf/wx/jsticket?url=${url}`).then(res => {
        console.log(res.data.data)
        const sign = res.data.data
        wx.config({
          debug: true, // 开启调用模式，调用的所有api的返回值再这
          appId: sign.appId, // 必填,公众号的唯一标识
          timestamp: sign.timestamp, // 必填,生成签名的时间戳
          nonceStr: sign.nonceStr, // 必填,生存签名的随机串
          signature: sign.signature, // 必填,签名
          jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
        })
        wx.ready(() => {
          // this.toQrcode()
          console.log('成功')
        })
        wx.error(function (res) {
          console.log('失败')
        })
      })
    },
    // 点击调用扫码
    toQrcode () {
      const that = this
      this.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'],
        // 成功回调
        success: function (res) {
          var result = res.resultStr
          that.qrShwo(result)
        },
        // 失败回调
        error: function (res) {
          var result = res.resultStr
          this.loser(result)
        }

      })
    },
    // 地址选择
    showPopup () {
      this.cityVisable = true
    },
    // 确定选择城市
    onConfirm (val) {
      console.log(val[0].name + ',' + val[1].name + ',' + val[2].name)
      this.cityVisable = false// 关闭弹框
    },
    // 取消选中城市
    onCancel () {
      this.cityVisable = false
      this.$refs.myArea.reset()// 重置城市列表
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/head.less";
.head {
  position: relative;
}
/deep/.van-cell-group {
  border-radius: 10px;
  border: 2px solid #c1c1c1;
  margin: 10%;
  width: 80%;
}
/deep/.van-field {
  width: 80%;
  height: 120px;
  line-height: 90px;
  font-size: 52px;
  // margin-left: 10%;
  margin-top: 20px;
  display: inline-block;
}
.inputUserId {
  margin-left: 10%;
  margin-top: 100px;
  border-radius: 50px;
  padding-left: 50px;
}
/deep/.van-icon {
  float: right;
  // line-height: 110px;
  margin-top: 20px;
  font-size: 100px;
}
.van-icon-arrow-left {
  position: absolute;
  font-size: 80px;
  top: 20px;
  left: 10px;
  color: #fff;
}
.existence {
  font-size: 60px;
  font-weight: 700;
  text-align: center;
}
.van-button--normal {
  font-size: 60px;
  height: 100px;
  width: 40%;
  margin-top: 80px;
  margin-left: 300px;
  padding: 10px 30px;
}
// .bindBox {
//   border: 1px solid #0094ff;
//   border-radius: 20px;
//   width: 90%;
//   height: 400px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #fff;
//   margin-top: 30px;
// }
/deep/.van-dropdown-menu {
  width: 80%;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 200px;
  height: 100px;
  .van-dropdown-menu__item {
    font-size: 50px;
  }
  .van-dropdown-menu__title {
    width: 40%;
    height: 100%;
    line-height: 100px;
    font-size: 50px;
  }
  .van-dropdown-menu__title::after {
    width: 20px;
    height: 20px;
    top: 40%;
  }
  .van-overlay {
    background-color: transparent;
  }
  .van-dropdown-item__content {
    width: 70%;
    margin-left: 15%;
    border: 1px solid #ccc;
  }
  .van-cell {
    height: 100px;
    line-height: 100px;
    font-size: 50px;
  }
  .van-icon {
    margin-top: 0;
    font-size: 50px;
  }
}
.conlist {
  h2 {
    width: 100%;
    text-align: center;
    font-size: 50px;
    margin-top: 20px;
    // height: 100px;
    line-height: 100px;
  }
  .contk {
    .van-form {
      .van-field {
        width: 90%;
        margin-left: 5%;
        .cityButton {
          margin: 0;
          height: 80px;
          font-size: 50px;
          width: 200px;
        }
        /deep/.van-radio__icon {
          width: 100px;
          height: 100px;
          /deep/.van-icon,
          /deep/.van-icon-success {
            width: 60px;
            height: 60px;
          }
        }
        /deep/.van-radio__icon--checked /deep/.van-icon {
          color: #1989fa;
          overflow: hidden;
        }
      }
      /deep/.van-field__label {
        float: left;
        width: 30%;
        margin-right: 0;
      }
      /deep/.van-field__value {
        float: left;
        width: 70%;
      }
      .TjCon {
        margin-top: 50px;
        margin-bottom: 50px;
      }
    }
  }
}
.right-ico {
  .van-icon {
    margin-top: 0px;
    font-size: 70px !important;
  }
}
// 地址
/deep/.areaPopup {
  .van-picker__toolbar  {
    height: 15%;
    line-height: 115px;
  }
  .van-picker__cancel, .van-picker__confirm {
    font-size: 45px;
  }
  .van-picker__title {
    font-size: 60px;
  }
  .van-picker-column__item {
    font-size: 50px;
  }
}
</style>
