<template>
  <div>
    <div class="head">
      <van-icon @click="fhsyy" name="arrow-left" />
      <div class="title">设备绑定</div>
      <div class="right-ico">
        <van-icon @click="help" name="question-o" />
      </div>
    </div>
    <main>
    <van-cell-group class="getInput-group">
      <van-field v-model="input_devId" placeholder="请输入设备编号" />
      <van-icon v-show="!this.input_devId" @click="scanQRCode" name="scan" />
      <!-- <van-icon v-show="this.input_devId" @click="getdpoint" name="search" /> -->
    </van-cell-group>
    <van-cell-group class="getInput-group bindB" v-show="chaneckDevCode === 2">
    <van-field  class="inputUserId" v-model="input_userId" placeholder="填写用户Id(如果不知请向上级查询)" ></van-field>
    </van-cell-group>
    <!-- <van-field  class="inputUserId" v-model="input_userId" placeholder="填写用户Id(向上级获取)" ></van-field> -->
    <!-- <span>用户</span> -->
      <!-- <van-button  class="proArrB" @click="getProInfo" round type="warning">获取项目列表</van-button> -->
      <van-dropdown-menu style="margin-top:100px" v-show="chaneckDevCode === 2 && wxmune && input_userId !== ''">
        <!-- v-model="wxProArr[0].value" -->
      <van-dropdown-item
        v-model="wxproValue"
        :options="wxProArr"
        @change="getXL"
      />
    </van-dropdown-menu>
    <van-cell-group class=" getInput-group bindB" v-show="chaneckDevCode===5||chaneckDevCode===4||chaneckDevCode===2">
      <van-button @click="openConInfo" round type="info">绑定并添加联系人</van-button>
      <van-button class="bindK" @click="quickBindWX" round type="primary">快捷绑定</van-button>
    </van-cell-group>
      <!-- <van-button round type="warning">不做任何操作</van-button> -->
    <!-- <van-cell-group class="bindB" v-show="chaneckDevCode === 2 || chaneckDevCode === 4">
      <van-button
        round
        @click="bindWXTk"
        type="info"
        >编辑并添加</van-button
      >
    </van-cell-group> -->
      <van-dropdown-menu v-show="mune">
      <van-dropdown-item
        v-model="proValue"
        :options="optionProArr"
        @change="getxiala"
      />
    </van-dropdown-menu>

<van-cell-group class="bindB" v-show="mune">
      <van-button style="margin-left:25%" @click="addBindUInfo" round type="info">添加设备</van-button>
      <!-- <van-button round type="warning">不做任何操作</van-button> -->
    </van-cell-group>
    <TabNav></TabNav>
    <!-- 选择省县市列表 -->
    <van-popup
      v-model="cityVisable"
      position="bottom"
      class="areaPopup"
      :style="{ height: '60%' }"
    >
      <van-area
        visible-item-count="8"
        item-height="100"
        :area-list="areaList"
        :columns-num="3"
        ref="myArea"
        title="请选择地址"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 用户绑定信息 -->
    <van-popup
      v-model="bindTkshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="bindInfoList">
        <h2>填写设备信息</h2>
        <div class="bindTk">
          <van-form>
            <van-field
              v-model="bindUInfo.dpName"
              label="住户名称:"
              placeholder="请输入住户名称"
            />
            <van-field
              v-model="bindUInfo.phone"
              label="联系电话:"
              placeholder="(必填)"
            />
            <van-field
              v-model="bindUInfo.dangerLevel"
              label="危险等级:"
              placeholder="危险等级(用数字表示)"
            />
            <!-- <van-field name="bindUInfo.personal" label="个人用户:">
              <template #input>
                <van-radio-group
                  v-model="bindUInfo.personal"
                  direction="horizontal"
                >
                  <van-radio name="true">是</van-radio>
                  <van-radio name="false">否</van-radio>
                </van-radio-group>
              </template>
            </van-field> -->
            <van-field
              v-model="bindArea"
              label="地址选择:"
              placeholder="请选择省/市/区"
              right-icon="arrow"
              @click="cityShow"
            ></van-field>
            <van-field
              v-model="bindUInfo.detailAddress"
              label="地址详细:"
              placeholder="街道门牌/楼层房间号等"
            />
            <van-field
              v-model="bindUInfo.point"
              label="设备地址:"
              placeholder="如：办公室、走廊"
            />
            <van-button @click="putBindU()" class="bindTj" round type="info"
              >保存</van-button
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="bindWXshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="bindInfoList">
        <h2>编辑设备信息</h2>
        <div class="bindTk">
          <van-form>
            <!-- <van-field
              v-model="bindWXInfo.dpName"
              label="安置点:"
              placeholder="请输入安置点"
            /> -->
            <van-field
              v-model="bindWXInfo.phone"
              label="联系电话:"
              placeholder="(绑定设备电话,但不拨打)"
            />
            <van-field
              v-model="bindWXInfo.dpName"
              label="住户名称:"
              placeholder="住户名称（用户）"
            />
            <van-field
              v-model="bindWXInfo.dangerLevel"
              label="危险等级:"
              placeholder="危险等级(用数字表示)"
            />
            <!-- <van-field name="bindWXInfo.personal" label="个人用户:">
              <template #input>
                <van-radio-group
                  v-model="bindWXInfo.personal"
                  direction="horizontal"
                >
                  <van-radio name="true">是</van-radio>
                  <van-radio name="false">否</van-radio>
                </van-radio-group>
              </template>
            </van-field> -->
            <van-field
              v-model="bindArea"
              label="地址选择:"
              placeholder="请选择省/市/区"
              right-icon="arrow"
              @click="cityShow"
            ></van-field>
            <van-field
              v-model="bindWXInfo.detailAddress"
              label="地址详细:"
              placeholder="街道门牌/楼层房间号等"
            />
            <van-field
              v-model="bindWXInfo.point"
              label="设备地址:"
              placeholder="如：办公室、走廊"
            />
            <van-button @click="putBindWX" class="bindTj" round type="info"
              >保存</van-button
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="contactTkshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%', borderRadius: '40px 40px 0 0' }"
    >
      <div class="conlist">
        <h2 style="margin-bottom:30px">添加联系人</h2>
        <div class="contk">
          <van-form>
            <van-field
              v-model="contactListTk.conName"
              label="联系人名称:"
              placeholder="请输入联系人名称"
            />
            <van-field
              v-model="contactListTk.conPhone"
              label="联系人电话:"
              placeholder="请输入联系人电话"
            />
            <van-field name="switch" label="允许接收语音电话">
              <template #input>
                <van-switch
                  inactive-color="#c1c1c1"
                  v-model="contactListTk.acceptVms"
                  size="70"
                />
              </template>
            </van-field>
            <van-field name="switch" label="允许接收短信">
              <template #input>
                <van-switch
                  inactive-color="#c1c1c1"
                  v-model="contactListTk.acceptSms"
                  size="70"
                />
              </template>
            </van-field>
            <van-button
              @click="addConInfo()"
              class="TjCon"
              round
              type="info"
              >添加</van-button
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    </main>
  </div>
</template>

<script>
import TabNav from '@/components/tabNav.vue'
import AeraInfo from '../../../public/js/area'
import wx from 'weixin-js-sdk'
export default {
  components: {
    TabNav
  },
  data () {
    return {
      input_devId: '',
      input_userId: '',
      // 城市列表
      cityVisable: false,
      areaList: AeraInfo, // 引用地区信息
      valueArea: '', // 地区值
      //   arrArea: [], // 存放地区数组
      // 绑定信息
      bindTkshow: false,
      existence: '',
      bindUInfo: {
      },
      chaneckDevCode: '',
      chaneckDevDesc: '',
      proValue: '',
      proList: [],
      text: '',
      optionProArr: [{ text: '请选择项目', value: '' }],
      mune: false,
      bindDpId: '',
      bindArea: '',
      bindWXshow: false,
      bindWXInfo: {
      },
      wxProArr: [{ text: '请选择项目', value: '' }],
      wxproList: [],
      wxproValue: '',
      wxtext: '',
      bindWxCode: '',
      bindWxDpId: '',
      bindWxDesc: '',
      wxproType: '',
      wxmune: false,
      // 联系人
      contactTkshow: false,
      contactListTk: {
        acceptSms: false,
        acceptVms: false
      },
      openConTJ: false

    }
  },
  watch: {
    input_devId: function (str) {
      if (typeof str === 'string') {
        console.log(str.trim().length !== 0, 'str.trim().length')
        if (str.trim().length !== 0) {
          this.debounce(this.changeStr, 1500)
        } else {}
      }
    },
    input_userId: function (str) {
      if (typeof str === 'string') {
        // console.log(str.trim().length !== 0, 'str.trim().length')
        if (str.trim().length !== 0) {
          this.debounce(this.changeUid, 1500)
        } else {}
      }
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.initState = JSON.parse(sessionStorage.getItem('initState'))
    this.openid = JSON.parse(sessionStorage.getItem('openid'))
  },
  mounted () {
    this.qrcode()
  },
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    help () {
      if (this.initState === 2) {
        this.$dialog({
          title: '注意事项',
          message: '绑定项目后需进行项目选择并填写相关信息',
          showConfirmButton: false,
          closeOnClickOverlay: true
        })
      } else if (this.initState === 1) {
        this.$dialog({
          title: '注意事项',
          message: '仅首绑用户可进行信息编辑管理,其余用户直接绑定设备',
          showConfirmButton: false,
          closeOnClickOverlay: true
        })
      }
    },
    // 地址选择
    cityShow () {
      this.cityVisable = true
    },
    // 确定选择城市
    onConfirm (val) {
      console.log(val[0].name + ',' + val[1].name + ',' + val[2].name)
      this.cityVisable = false// 关闭弹框
      this.bindArea = val[0].name + val[1].name + val[2].name
      this.bindUInfo.province = val[0].name
      this.bindUInfo.city = val[1].name
      this.bindUInfo.county = val[2].name
    },
    // 取消选中城市
    onCancel () {
      this.cityVisable = false
      this.$refs.myArea.reset()// 重置城市列表
    },
    async getProInfo () {
      if (this.initState === 2) {
        await this.$http.get(`/pf/wxscan/w/userpros/${this.userInfo.userId}`).then(res => {
          console.log(res, '获取到项目列表')
          if (res.data.code === 0) {
            this.optionProArr = []
            this.proList = res.data.data
            console.log(this.proList)
            for (let i = 0; i < this.proList.length; i++) {
              const list = {}
              list.texts = this.proList[i].proName
              list.value = this.proList[i].proId
              list.proType = this.proList[i].proType
              list.text = this.proList[i].proName + '--' + (this.proList[i].proType === 1 ? '集团用户' : '个人用户')
              this.optionProArr.push(list)
            }
            this.mune = true
            this.proValue = this.optionProArr[0].value
            if (this.text === '') {
              this.getxiala(this.optionProArr[0].value)
            }
          } else {
            this.optionProArr = [{ text: '请选择项目', value: '' }]
            this.$notify({
              message: res.data.message,
              background: '#ff0000',
              duration: 2000
            })
          }
          // }
        })
      } else if (this.initState === 1) {
        await this.$http.get(`/pf/wxscan/w/userpros/${this.input_userId}`).then(res => {
          console.log(res, '获取到项目列表vx')
          if (res.data.code === 0) {
            this.wxProArr = []
            this.wxproList = res.data.data
            console.log(this.wxproList)
            for (let i = 0; i < this.wxproList.length; i++) {
              const list = {}
              list.texts = this.wxproList[i].proName
              list.value = this.wxproList[i].proId
              list.proType = this.wxproList[i].proType
              list.text = this.wxproList[i].proName + '--' + (this.wxproList[i].proType === 1 ? '集团用户' : '个人用户')
              this.wxProArr.push(list)
            }
            // }
            this.wxproValue = this.wxProArr[0].value
            this.wxmune = true
          } else {
            this.wxProArr = [{ text: '请选择项目', value: '' }]
            this.$notify({
              message: res.data.message,
              background: '#ff0000',
              duration: 2000
            })
          }
        })
      }
    },
    getdpoint () {
      this.input_userId = ''
      const devId = this.input_devId
      if (this.initState === 2) {
        this.$http.get(`/pf/wxscan/u/dp/${devId}`).then((res) => {
          this.existence = res.data.data
          if (this.existence) {
            this.getProInfo()
          }
        })
      } else if (this.initState === 1) {
        this.$http.get(`/pf/wxscan/w/checkdev?devId=${devId}&&openid=${this.openid.openid}`).then(res => {
          console.log(res)
          this.chaneckDevCode = res.data.data.code
          this.chaneckDevDesc = res.data.data.desc
          if (this.chaneckDevCode === 1) {
            this.$notify({
              message: '该设备不存在',
              background: '#ff0000',
              duration: 2000
            })
          } else if (this.chaneckDevCode === 3) {
            this.$notify({
              message: '该设备已绑定,不得重复绑定',
              background: '#ff0000',
              duration: 2000
            })
          } else if (this.chaneckDevCode === 6) {
            this.$notify({
              message: '设备绑定数上限(5个)',
              background: '#ff0000',
              duration: 2000
            })
          }
        })
      }
    },
    getxiala (value) {
      for (let i = 0; i < this.optionProArr.length; i++) {
        if (this.optionProArr[i].value === value) {
        //   this.texts = this.optionProArr[i].texts
          this.text = this.optionProArr[i].texts
        }
      }
    },
    getXL (value) {
      console.log('this.wxProArr', this.wxProArr)
      for (let i = 0; i < this.wxProArr.length; i++) {
        if (this.wxProArr[i].value === value) {
        //   this.texts = this.optionProArr[i].texts
          this.wxtext = this.wxProArr[i].texts
          this.wxproType = this.wxProArr[i].proType
          this.wxproValue = this.wxProArr[i].value
        }
      }
    },
    bindTk () {
      this.bindTkshow = true
      this.bindArea = ''
      this.bindUInfo = {}
    },
    // 绑定
    // bindWX () {
    //   const dto = {
    //     devId: this.input_devId,
    //     openid: this.openid.openid,
    //     proId: 0,
    //     proName: '',
    //     proType: ,
    //     type: this.chaneckDevCode,
    //     userId: this.input_userId
    //   }
    //   this.$http.post('/pf/wxscan/w/bind', dto).then(res => {
    //     console.log(res)
    //     console.log(res.data)
    //   })
    // },
    bindWXTk () {
      this.bindWXshow = true
      this.bindArea = ''
      this.bindWXInfo = {}
    },
    // 信息编辑
    addBindUInfo () {
      const dto = {
        devId: this.input_devId,
        proId: this.proValue,
        proName: this.text
      }
      this.$http.post('/pf/wxscan/u/dp', dto).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '添加设备成功',
            background: '#07c160',
            duration: 2000
          })
          this.bindDpId = res.data.data
          this.bindTk()
        } else {
          this.$notify({
            message: res.data.message,
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    putBindU () {
      const dto = {
        city: this.bindUInfo.city,
        county: this.bindUInfo.county,
        dangerLevel: this.bindUInfo.dangerLevel,
        detailAddress: this.bindUInfo.detailAddress,
        dpName: this.bindUInfo.dpName,
        dpId: this.bindDpId,
        // devName: '',
        // lat: 0,
        // lng: 0,
        // pbId: 22,
        // pbName: '一栋',
        // pbfId: 47,
        // pbfName: '一层',
        personal: false,
        phone: this.bindUInfo.phone,
        point: this.bindUInfo.point,
        proName: this.text,
        province: this.bindUInfo.province
      }
      this.$http.put('/pf/wxscan/u/dp', dto).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '填写信息成功',
            background: '#07c160',
            duration: 2000
          })
          this.$toast.loading({
            message: '绑定成功,正在提交',
            forbidClick: true,
            overlay: true,
            duration: 1500
          })
          setTimeout(() => {
            this.$router.push({ name: 'BindOk' })
          }, 2000)
        } else {
          this.$notify({
            message: '填写信息失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    // quickBindWX () {
    //   this.$notify({
    //     message: '快捷绑定',
    //     background: '#07c160',
    //     duration: 2000
    //   })
    // },
    async quickBindWX () {
    // addBindWXInfo () {
      if (this.wxtext === '') {
        this.getXL(this.wxProArr[0].value)
      }
      console.log('这是用户绑定信息按钮')
      const dto = {
        devId: this.input_devId,
        openid: this.openid.openid,
        proId: this.wxproValue,
        proName: this.wxtext,
        proType: this.wxproType,
        type: this.chaneckDevCode,
        userId: this.input_userId
      }
      await this.$http.post('/pf/wxscan/w/bind', dto).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.bindWxCode = res.data.data.code
          this.bindWxDpId = res.data.data.data
          this.bindWxDesc = res.data.data.desc
          if (this.chaneckDevCode === 5 || this.chaneckDevCode === 2 || this.chaneckDevCode === 4) {
            this.$notify({
              message: '绑定设备成功',
              background: '#07c160',
              duration: 2000
            })
            // if (this.bindWxCode !== 1) {
            // this.$router.push({ name: 'BindOk' })
            // }
            if (this.openConTJ) {
              this.contactTkshow = true
            }
          }
          // if (this.bindWxCode === 1) {
          //   this.$notify({
          //     message: '绑定成功,请编辑信息',
          //     background: '#07c160',
          //     duration: 2000
          //   })
          // this.bindWXTk()
          // }
        } else {
          this.$notify({
            message: '绑定设备失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    putBindWX () {
      const dto = {
        city: this.bindUInfo.city,
        county: this.bindUInfo.county,
        dangerLevel: this.bindWXInfo.dangerLevel,
        detailAddress: this.bindWXInfo.detailAddress,
        dpName: this.bindWXInfo.dpName,
        dpId: this.bindWxDpId,
        // lat: 0,
        // lng: 0,
        phone: this.bindWXInfo.phone,
        point: this.bindWXInfo.point,
        province: this.bindUInfo.province
      }
      this.$http.put('/pf/wxscan/w/dp', dto).then(res => {
        console.log(res, '微信绑定成功结果')
        if (res.data.code === 0) {
          this.$notify({
            message: '编辑成功',
            background: '#07c160',
            duration: 2000
          })
          this.$toast.loading({
            message: '绑定成功,正在提交',
            forbidClick: true,
            overlay: true,
            duration: 1500
          })
          setTimeout(() => {
            this.$router.push({ name: 'BindOk' })
          }, 2000)
        } else if (res.data.code === 1) {
          this.$notify({
            message: '绑定设备失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    // 扫扫扫
    async qrcode () {
      // const url = 'http://192.168.0.11:8080/qrcode'
      // const url = 'http://xf.padssz.com/wechart/qrcode'
      // const url = 'http://xf.padssz.com/wechart/?openid=ooXbhs2c8LtwwUJzuc8-XCcxNCeA'
      const url = location.href.split('#')[0]
      console.log(url)
      // console.log(url1)
      await this.$http.get(`/pf/wx/jsticket?url=${url}`).then(res => {
        // alert(JSON.stringify(res.data.data))
        console.log(res.data.data)
        // console.log(JSON.stringify(res.data.data))
        const sign = res.data.data
        wx.config({
          debug: false, // 开启调用模式，调用的所有api的返回值再这
          appId: sign.appId + '', // 必填,公众号的唯一标识
          timestamp: sign.timestamp + '', // 必填,生成签名的时间戳
          nonceStr: sign.nonceStr + '', // 必填,生存签名的随机串
          signature: sign.signature + '', // 必填,签名
          jsApiList: ['scanQRCode'] // 必填,需要使用的JS接口列表
        })
        wx.ready(() => {
        })
        wx.error(function (res) {
        //   console.log('失败')
        })
      })
    },
    scanQRCode () {
      const that = this
      wx.scanQRCode({
        needResult: 1,
        scanType: ['qrCode', 'barCode'],
        success: function (res) {
          const result = res.resultStr
          // that.qrShwo(result)
          // alert('扫描结果：' + JSON.stringify(res))
          // alert('扫描结果：' + result)
          console.log(JSON.stringify(res))
          // that.$dialog({
          //   title: '注意事项',
          //   message: JSON.stringify(res),
          //   showConfirmButton: false,
          //   closeOnClickOverlay: true
          // })
          that.input_devId = result
          console.log(that.input_devId)
          that.getdpoint()
        },
        // 失败回调
        error: function (res) {
          // const result = res
          // this.loser(result)
          alert('错误' + res)
        }
      })
    },
    openConInfo () {
      this.openConTJ = true
      this.quickBindWX()
    },
    async addConInfo () {
      if (this.contactListTk.acceptVms === undefined) {
        this.contactListTk.acceptVms = false
      }
      if (this.contactListTk.acceptSms === undefined) {
        this.contactListTk.acceptSms = false
      }
      const dto = {
        conName: this.contactListTk.conName,
        conPhone: this.contactListTk.conPhone,
        acceptSms: this.contactListTk.acceptSms,
        acceptVms: this.contactListTk.acceptVms,
        dpId: this.bindWxDpId,
        openid: this.openid.openid
      }
      this.$http.post('/pf/wxscan/w/dp/con', dto).then((res) => {
        if (res.data.code === 0) {
          this.contactTkshow = false
          this.$notify({
            message: '添加成功',
            background: '#07c160',
            duration: 2000
          })
          // this.$router.push({ name: 'BindOk' })
          if (this.bindWxCode === 1) {
            this.bindWXTk()
          } else {
            this.$toast.loading({
              message: '绑定成功,正在提交',
              forbidClick: true,
              overlay: true,
              duration: 1500
            })
            setTimeout(() => {
              this.$router.push({ name: 'BindOk' })
            }, 2000)
          }
        } else {
          this.$notify({
            message: res.data.message,
            background: '#f00',
            duration: 1500
          })
        }
      })
    },
    // 防抖
    debounce (fn, wait) {
      if (this.fun !== null) {
        clearTimeout(this.fun)
      }
      this.fun = setTimeout(fn, wait)
    },
    changeStr () {
      if (this.input_devId !== '') {
        // console.log(data)
        this.getdpoint()
      }
    },
    changeUid () {
      if (this.input_userId !== '') {
        this.getProInfo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/head.less";
.van-icon-arrow-left {
  position: absolute;
  font-size: 80px;
  top: 40px;
  left: 10px;
  color: #fff;
}
main {
    padding-top: 155px;
      .proArrB {
          border-radius: 0 50px 50px 0;
          width: 30%;
          height: 100px;
          font-size: 40px;
      }
}
.van-cell-group,
.getInput-group {
  border-radius: 50px;
  // border: 2px solid #c1c1c1;
  margin: 10%;
  width: 80%;
  .van-field {
    border-radius: 50px 0 0 50px;
    padding-left: 1em;
    width: 80%;
    height: 140px;
    line-height: 120px;
    font-size: 60px;
    // margin-left: 10%;
    // margin-top: 20px;
    display: inline-block;
  }
      .inputUserId {
      width: 100%;
      // margin-left: 20%;
      margin-bottom: 50px;
      height: 100px;
      font-size: 46px;
      padding-left: 1em;
      line-height: 90px;
      border-radius: 50px;
  float: left;

  }
  .van-button {
    width: 50%;
    height: 100px;
    margin-left: 5%;
    font-size: 38px;
  }
  .van-icon {
    float: right;
    line-height: 110px;
    margin-top: 20px;
    margin-right: 20px;
    font-size: 100px;
  }
}
.bindB {
  height: 100px;
  background-color: transparent;
  // border: #000;
  .bindK {
    width: 30%;
    margin-left: 10%;
  }
}
// 地址
/deep/.areaPopup {
  .van-picker__toolbar {
    height: 15%;
    line-height: 115px;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    font-size: 45px;
  }
  .van-picker__title {
    font-size: 60px;
  }
  .van-picker-column__item {
    font-size: 50px;
  }
}
// 用户信息绑定弹框
/deep/.van-popup__close-icon {
  right: 50px;
  font-size: 60px;
}
/deep/.van-dropdown-menu {
  width: 80%;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 150px;
  height: 100px;
  .van-dropdown-menu__item {
    font-size: 50px;
  }
  .van-dropdown-menu__title {
    width: 50%;
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
    font-size: 38px;
    border: 1px solid #ccc;
  }
  .van-icon {
    margin-top: 0;
    font-size: 50px;
  }
}
.bindInfoList {
  h2 {
    width: 100%;
    text-align: center;
    font-size: 50px;
    margin-top: 20px;
    // height: 100px;
    line-height: 100px;
  }
  .bindTk {
    .van-form {
      border: 2px solid #0094ff;
      border-radius: 50px;
      margin: 5%;
      /deep/.van-field {
        font-size: 44px;
        height: 100px;
        width: 90%;
        margin-left: 5%;
        line-height: 100px;
        .cityButton {
          margin: 0;
          height: 80px;
          font-size: 48px;
          width: 200px;
        }
        .van-icon-arrow {
          font-size: 50px;
          // margin-bottom: 30px;
          line-height: 100%;
        }
      }
      /deep/.van-field__label {
        float: left;
        width: 30%;
        margin-right: 3%;
      }
      /deep/.van-field__value {
        float: left;
        width: 67%;
      }
      .bindTj {
        width: 200px;
        height: 80px;
        font-size: 40px;
        margin-left: 330px;
        margin-top: 50px;
        margin-bottom: 50px;
      }
    }
  }
}
.conlist {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 30px;
    position: relative;
    .noInfo {
      text-align: center;
      font-size: 48px;
      margin-top: 100px;
      color: #ccc;
    }
    h2 {
      font-size: 50px;
      text-align: center;
      margin-bottom: 150px;
    }
    .addCon,
    .clearCon {
      position: absolute;
      width: 200px;
      height: 80px;
      font-size: 36px;
      top: 100px;
      left: 50px;
    }
    .bdl {
      width: 90%;
      height: 380px;
      margin: 50px auto;
      border-radius: 30px;
      border: 1px solid #0094ff;
      position: relative;
      p {
        font-size: 40px;
        line-height: 48px;
        margin-top: 22px;
        margin-left: 30px;
        width: 65%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .contk {
      width: 90%;
      height: 700px;
      margin: 50px auto;
      border-radius: 30px;
      border: 1px solid #0094ff;
      position: relative;
      .van-form {
        width: 100%;
        height: 100%;
        padding: 20px;
        // background-color: #f00;
        .van-cell {
          width: 90%;
          height: 100px;
          font-size: 40px;
        }
        /deep/.van-field__label {
          width: 250px;
          margin-left: 30px;
          span {
            line-height: 100px;
          }
        }
        /deep/.van-field__body {
          line-height: 100px;
          .van-field__control--custom {
            margin-left: 30px;
            margin-top: 15px;
          }
        }
        .TjCon {
          position: absolute;
          height: 80px;
          font-size: 32px;
          width: 170px;
          left: 350px;
          bottom: 50px;
        }
      }

    }
  }

</style>
