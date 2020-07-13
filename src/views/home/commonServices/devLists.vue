<template>
  <div class="home-cont-yangan">
    <van-popup
      v-model="searchBox"
      position="top"
      :style="{ height: '35%', borderRadius: '0  0 50px 50px ' }"
    >
      <div class="topSearch">
        <van-cell-group>
          <van-field v-model="input_devId" placeholder="请输入设备ID" />
        </van-cell-group>
        <van-cell-group style="margin-top:50px;margin-bottom:70px">
          <van-field v-model="input_dpName" placeholder="请输入安置点" />
        </van-cell-group>
        <van-button
          class="sxbutton"
          icon="search"
          round
          type="info"
          @click="search"
          >筛 选</van-button
        >
      </div>
    </van-popup>
    <div class="head">
      <div class="left">
        <van-icon @click="fhsyy" name="arrow-left" />
        <span v-if="this.devInfoTit !== ''" class="yangan-tit">{{
          this.devInfoTit
        }}</span>
        <span v-if="this.$route.name === 'AllDev'" class="yangan-tit"
          >全部设备</span
        >
        <span v-if="this.$route.name === 'OnlineDev'" class="yangan-tit"
          >在线设备</span
        >
        <span v-if="this.$route.name === 'OfflineDev'" class="yangan-tit"
          >离线设备</span
        >
      </div>
      <div class="right-ico">
        <van-icon @click="searchBox = true" name="search" />
      </div>
    </div>
    <div class="yg-main">
      <div class="hjzt-list">
        <ul>
          <!-- <router-link to="Xiangxi"> -->
          <li v-for="(item, index) in devInfo" :key="index" class="tab-lists">
            <!-- <p class="lists-tit">{{ "点型光电感烟火灾探测器" }}</p> -->
            <p class="lists-tit">{{ `设备编码:  ` + item.devId }}</p>
            <p v-show="item.personal === false">
              项目地址:
              {{
                item.pdetailAddress
                  ? item.pprovince + item.pcity + item.pcounty + item.pdetailAddress
                  : "无"
              }}
            </p>
            <p>住户地址: {{ item.detailAddress
                  ? item.province + item.city + item.county + item.detailAddress
                  : "无" }}</p>
            <p>住户名称: {{ item.dpName ? item.dpName : "无" }}</p>
            <p>设备型号: {{ item.model ? item.model : "无" }}</p>
            <!-- <p</p> -->
            <p>
              网络状态:
              <van-tag v-if="item.network === 1" type="success">在线</van-tag>
              <van-tag v-else>离线</van-tag>
              <span v-show="item.network === 1">
                信号值:
                <i class="xhValue">
                  <img
                    v-if="item.signalValue === 0 || !item.signalValue"
                    src="../../../assets/siginaValue0.png"
                    alt=""
                  />
                  <img
                    v-if="item.signalValue < 9 && item.signalValue > 0"
                    src="../../../assets/siginaValue1.png"
                    alt=""
                  />
                  <img
                    v-if="item.signalValue < 17 && item.signalValue > 8"
                    src="../../../assets/siginaValue2.png"
                    alt=""
                  />
                  <img
                    v-if="item.signalValue < 25 && item.signalValue > 16"
                    src="../../../assets/siginaValue3.png"
                    alt=""
                  />
                  <img
                    v-if="item.signalValue < 33 && item.signalValue > 24"
                    src="../../../assets/siginaValue4.png"
                    alt=""
                  />
                </i>
              </span>
            </p>
            <p>设备地址: {{ item.point ? item.point : "无" }}</p>
            <van-button
            v-show="item.devType === '物联网关'"
              class="optbutton accessoriesSum "
              type="info"
              round
              @click="partsOpen(item)"
              >配件总数:{{!item.parts? 0:item.parts}}</van-button
            >
            <van-button
              @click="OnoptShow(item)"
              class="optbutton"
              round
              type="info"
              >操作</van-button
            >
            <van-button
              @click="Silencing(item)"
              class="silencing optbutton"
              round
              type="warning"
              >复位</van-button
            >
          </li>
          <!-- </router-link> -->
        </ul>
        <van-pagination
          v-model="currentPage"
          :total-items="this.totalCount"
          :items-per-page="10"
          @change="changePag"
        />
        <p class="totalC">{{ `共` + this.totalCount + `条` }}</p>
      </div>
    </div>
    <van-popup
      v-model="optShow"
      closeable
      round
      class="optPopup"
      close-icon="close"
      position="top"
      :style="{ height: '20%' }"
    >
      <van-button @click="getContact" round type="info">查看联系人</van-button>
      <van-button
        @click="getArea"
        round
        type="primary"
        v-show="(this.optInfoItem.devType === '物联网关')
        "
        >设备管理</van-button
      >
      <van-button
        @click="getAodata"
        round
        type="primary"
        v-show="
          (this.wxlabel === 1 || this.initState === 2) &&
            ((this.optInfoItem.model === 'GT10' &&
              this.devInfoTit === '物联网关') ||
              (this.devInfoTit === '' && this.optInfoItem.model === 'GT10'))
        "
        >声光设置</van-button
      >
      <van-button
        v-show="this.wxlabel === 1 || this.initState === 2"
        @click="optChangeBJ"
        round
        type="warning"
        >编辑</van-button
      >
      <van-button
        v-show="this.wxlabel === 1"
        @click="power"
        round
        type="warning"
        >查看绑定者</van-button
      >
      <van-button @click="unbound" round type="danger">解绑安置点</van-button>
    </van-popup>
    <van-popup
      v-model="powerShow"
      closeable
      round
      close-icon="close"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <div style="padding-bottom: 0;" class="conlist">
        <h2 style="margin-bottom: 80px;">全部绑定者</h2>
        <div class="powerS">
          <van-radio-group v-model="powerOpId">
            <!-- <van-radio @click="clickPower(item)" :name="item.openId" v-for="(item, index) in followersList" :key="index">{{item.nickName}}</van-radio> -->
            <van-radio
              :disabled="item.openid === openid.openid"
              :name="item.openid"
              v-for="(item, index) in followersList"
              :key="index"
              >{{ item.nickName }}</van-radio
            >
          </van-radio-group>
        </div>
      </div>
      <van-button
        style="width: 40%;height: 100px;margin-left: 30%;font-size: 40px;"
        @click="zyPower"
        round
        type="info"
        >权限转让</van-button
      >
    </van-popup>
    <van-popup
      v-model="contactshow"
      closeable
      round
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="conlist">
        <van-button
          v-show="initState === 1 && !this.contactList[0]"
          icon="plus"
          round
          @click="openAddCon"
          type="info"
          class="addCon"
          >添加</van-button
        >
        <!-- <van-button
        v-show="this.initState === 1"
          icon="delete"
          round
          @click="clearCon"
          type="info"
          class="clearCon"
          >清空</van-button
        > -->
        <h2>联系人列表</h2>
        <p class="noInfo" v-show="!this.contactList[0]">暂无数据</p>
        <div
          style="height:320px"
          class="bdl"
          v-for="(item, index) in contactList"
          :key="index"
        >
          <p>联系人名称: {{ item.conName }}</p>
          <p>联系人电话: {{ item.conPhone }}</p>
          <p>
            允许接收语音电话: {{ item.acceptVms === true ? "允许" : "不允许" }}
          </p>
          <p>允许接收短信: {{ item.acceptSms === true ? "允许" : "不允许" }}</p>
          <van-button
            v-show="initState === 1"
            plain
            hairline
            icon="edit"
            @click="conInfo(item)"
            class="seeCon"
            round
            type="info"
            >编辑</van-button
          >
          <van-button
            v-show="initState === 1"
            icon="delete"
            @click="conInfoDel(item)"
            class="seeConDel"
            round
            type="danger"
            >删除</van-button
          >
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
        <h2 style="margin-bottom:30px">
          {{ !this.contactListTk.conId ? "添加联系人" : "修改联系人信息" }}
        </h2>
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
              v-show="!this.contactListTk.conId"
              @click="addConInfo()"
              class="TjCon"
              round
              type="info"
              >添加</van-button
            >
            <van-button
              v-show="this.contactListTk.conId"
              @click="changeCon()"
              class="TjCon"
              round
              type="info"
              >修改</van-button
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="areashow"
      closeable
      round
      close-icon="close"
      position="bottom"
      :style="{ height: '83%' }"
    >
      <div class="conlist">
        <van-button icon="plus" round @click="areatj" type="info" class="addCon"
          >添加</van-button
        >
        <h2>设备列表</h2>
        <van-field
          class="seach-input"
          v-model="seachDaId"
          placeholder="查询设备编号"
        />
        <van-icon @click="seachArea" class="search-ico" name="search" />
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item v-model="drop1" :options="xialaopt1" />
        </van-dropdown-menu>
        <p class="noInfo" v-show="!this.areaList[0]">暂无数据</p>
        <div class="bdl" v-for="(item, index) in areaList" :key="index">
          <p>设备编号: {{ item.daId }}</p>
          <p>设备类型: {{ item.daType ? item.daType : "未设置" }}</p>
          <p>
            设备状态:
            <van-tag v-if="item.daState === 2" type="success">在线</van-tag>
            <van-tag v-if="item.daState === 1">离线</van-tag>
            <van-tag v-if="item.daState === 4" type="warning">屏蔽</van-tag>
            <van-tag v-if="item.daState === 0">异常</van-tag>
            <!-- <van-tag v-if="item.daState === 0 || !item.daState">待确定</van-tag> -->
            <van-tag v-if="item.daState === -1">无</van-tag>
          </p>
          <p>设备位置: {{ item.daName }}</p>
          <p>设备描述: {{ item.description }}</p>
          <van-button
            plain
            icon="edit"
            class="seeCon"
            @click="areabj(item)"
            round
            type="info"
            >编辑</van-button
          >
          <van-button
            @click="deleteArea(item)"
            icon="delete"
            class="seeConDel"
            round
            type="danger"
            >删除</van-button
          >
        </div>
      </div>
      <van-pagination
        v-model="currentPageArea"
        :total-items="this.totalCount1"
        :items-per-page="10"
        @change="changePagarea"
      />
      <p class="totalC">{{ `共` + this.totalCount1 + `条` }}</p>
    </van-popup>
    <van-popup
      v-model="areaTkshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '45%', borderRadius: '40px 40px 0 0' }"
    >
      <div class="conlist">
        <h2 style="margin-bottom:30px">
          {{ !this.areaInfo.daId ? "添加设备" : "修改设备信息" }}
        </h2>
        <div style="height:480px" class="contk">
          <van-form>
            <van-field
              v-show="!this.areaInfo.daId"
              v-model="areadaId"
              label="设备编号:"
              placeholder="取值范围(1-250)"
            />
            <van-field
              v-model="areaInfo.daName"
              label="设备位置:"
              placeholder="请输入设备位置"
            />
            <van-field
              v-model="areaInfo.description"
              label="设备描述:"
              placeholder="请输入设备描述"
            />
            <van-button
              v-show="!this.areaInfo.daId"
              @click="addArea"
              class="TjCon"
              round
              type="info"
              >添加</van-button
            >
            <van-button
              v-show="this.areaInfo.daId"
              @click="changeArea"
              class="TjCon"
              round
              type="info"
              >修改</van-button
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="sgshow"
      round
      class="shengG"
      close-icon="close"
      position="bottom"
      :style="{ height: '60%', borderRadius: '40px 40px 0 0' }"
    >
      <van-button
        @click="addSl"
        round
        type="info"
        class="addslid"
        v-show="datalist[0]"
        >保 存</van-button
      >
      <van-button
        @click="delSl"
        round
        type="danger"
        class="addslid delslid"
        v-show="datalist[0]"
        >清 空</van-button
      >
      <span class="sgTit">声光管理</span>
      <van-button
        @click="xzsgId = true"
        class="xzsgId"
        round
        plain
        type="info"
        >{{
          !this.sgRadio ? "请选择声光编号" : `声光编号为:` + this.sgRadio
        }}</van-button
      >
      <van-radio-group
        style="margin-top:30px"
        v-show="xzsgId"
        v-model="sgRadio"
        direction="horizontal"
        @change="getsgInfo"
      >
        <van-radio name="1"> 1</van-radio>
        <van-radio name="2"> 2</van-radio>
        <van-radio name="3"> 3</van-radio>
        <van-radio name="4"> 4</van-radio>
        <van-radio name="5"> 5</van-radio>
        <van-radio name="6"> 6</van-radio>
        <van-radio name="7"> 7</van-radio>
        <van-radio name="8"> 8</van-radio>
        <van-radio name="9"> 9</van-radio>
        <van-radio name="10"> 10</van-radio>
        <van-radio name="11"> 11</van-radio>
        <van-radio name="12"> 12</van-radio>
        <van-radio name="13"> 13</van-radio>
        <van-radio name="14"> 14</van-radio>
        <van-radio name="15"> 15</van-radio>
      </van-radio-group>
      <!-- <div class="slIds"> {{!this.sgRadio ? '请选择声光Id' : this.sgRadio}}</div> -->
      <div class="Bound allbound">
        <span class="bound-tit">设备编号</span>
        <van-checkbox-group v-model="boundA">
          <!-- 相当于我现在是获取了这个boundA的数据 但是 -->
          <span
            class="bound-tit"
            style="color:#ccc;line-height: 40px; "
            v-show="!datalist[0]"
            >未选择声光编号 <br />
            或无法获取数据内容</span
          >
          <van-checkbox
            v-for="(item, index) in datalist"
            :disabled="item.soundLightId && +sgRadio !== item.soundLightId"
            :key="index"
            :name="item.daId"
            shape="square"
            >{{ item.daId }}
            {{
              item.soundLightId ? "- " + item.soundLightId : ""
            }}</van-checkbox
          >
        </van-checkbox-group>
      </div>
    </van-popup>
    <!-- 操作 -->
    <van-popup
      v-model="optChangeTK"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="conlist">
        <h2 style="margin-bottom:80px">编辑绑定信息</h2>
        <div class="contk">
          <van-form class="opt-form">
            <van-field
              v-model="optChangeInfo.dpName"
              label="住户名称:"
              placeholder="请输入住户名称"
            />
            <van-field
              v-model="optChangeInfo.phone"
              label="联系电话:"
              placeholder="(设备绑定电话)"
            />
            <van-field
              v-model="optChangeInfo.dangerLevel"
              label="危险等级:"
              placeholder="危险等级(用数字表示)"
            />
            <!-- <van-field name="optChangeInfo.personal" label="个人用户:">
              <template #input>
                <van-radio-group
                  v-model="optChangeInfo.personal"
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
              v-model="optChangeInfo.detailAddress"
              label="地址详细:"
              placeholder="请输入地址详细门牌号"
            />
            <van-field
              v-model="optChangeInfo.point"
              label="设备地址:"
              placeholder="请输入设备地址"
            />
            <van-button @click="putBindU" class="TjCon" round type="info"
              >保存</van-button
            >
          </van-form>
        </div>
      </div>
    </van-popup>
    <!-- VX用户绑定信息编辑 -->
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
              placeholder="(设备绑定电话)"
            />
            <van-field
              v-model="bindWXInfo.dpName"
              label="住户名称:"
              placeholder="住户名称(用户)"
            />
            <van-field
              v-model="bindWXInfo.dangerLevel"
              label="危险等级:"
              placeholder="危险等级(用数字表示)"
            />
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
        :area-list="areaInfos"
        :columns-num="3"
        ref="myArea"
        title="请选择地址"
        @confirm="onConfirm"
        @cancel="onCancel"
        :value="areaCode"
      />
    </van-popup>
    <!-- 配件统计 -->
    <van-popup
      v-model="partsSum"
      closeable
      position="bottom"
      class="partsPopup"
      :style="{ height: '80%' }"
    >
      <!-- <h2>配件信息</h2> -->
      <div id="partsPie"></div>
      <ul class="partsList">
        <li v-for="(item, index) in this.partsLists" :key="index">
          <p> <van-tag v-if="item.daState === 2" type="success">在线</van-tag>
            <van-tag v-if="item.daState === 1">离线</van-tag>
            <van-tag v-if="item.daState === 4" type="warning">屏蔽</van-tag>
            <van-tag v-if="item.daState === 0">异常</van-tag>
            <van-tag v-if="item.daState === -1">无</van-tag>
          {{ index+1 }}号{{item.daType}} - 地址: {{!item.daName?  '无' : item.daName }}</p>

        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import AreaInfo from '../../../../public/js/area'
export default {
  data () {
    return {
      userInfo: '',
      initState: '',
      openid: '',
      devInfo: {},
      devInfoTit: '',
      // 分页
      currentPage: 1,
      totalCount: 0,
      pageIndex: 1,
      pageRow: 10,
      contactshow: false,
      optShow: false,
      searchBox: false,
      input_devId: '',
      input_dpName: '',
      network: '',
      drop1: '',
      xialaopt1: [
        { text: '全部状态', value: '' },
        { text: '在线', value: 2 },
        { text: '离线', value: 3 },
        { text: '屏蔽', value: 4 }
      ],
      optInfoItem: '',
      // 联系人
      contactList: '',
      contactTkshow: false,
      contactListTk: {
        acceptSms: false,
        acceptVms: false
      },
      // 设备
      areashow: false,
      currentPageArea: 1,
      areaList: {},
      totalCount1: 0,
      pageInexArea: 1,
      areaTkshow: false,
      areadaId: '',
      seachDaId: '',
      areaInfo: {
        daId: '',
        daName: '',
        description: ''
      },
      // 声光
      sgshow: false,
      sgRadio: '',
      xzsgId: false,
      boundA: [],
      datalist: [], // 设备list
      areaLoding: false, // 按钮加载
      // 操作
      initialization: false,
      optChangeTK: false,
      optChangeInfo: '',
      // 城市列表
      cityVisable: false,
      areaInfos: AreaInfo, // 引用地区信息
      valueArea: '', // 地区值
      // arrArea: [] // 存放地区数组
      bindArea: '',
      areaCode: '',
      areasbsbsb: '140105',
      // ------------------微信用户编辑信息
      bindWXshow: false,
      bindWXInfo: {},
      wxlabel: '',
      // 权限转移
      powerShow: false,
      followersList: [],
      powerOpId: '',
      // 配件统计
      partsSum: false,
      typeTotal: {},
      partsLists: []
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.initState = JSON.parse(sessionStorage.getItem('initState'))
    this.openid = JSON.parse(sessionStorage.getItem('openid'))
    // this.powerOpId.openid = this.openid.openid

    this.devInfo = {}
    if (this.$route.name === 'SSensation') {
      this.devInfoTit = '烟感'
      this.getSSensation()
    } else if (this.$route.name === 'Gas') {
      // this.devInfo = {}
      this.devInfoTit = '燃气'
      this.getSSensation()
    } else if (this.$route.name === 'Electric') {
      // this.devInfo = {}
      this.devInfoTit = '电气火灾'
      this.getSSensation()
    } else if (this.$route.name === 'Host') {
      // this.devInfo = {}
      this.devInfoTit = '物联网关'
      this.getSSensation()
    } else if (this.$route.name === 'OnlineDev') {
      // this.devInfo = {}
      this.devInfoTit = ''
      this.network = 1
      this.getSSensation()
    } else if (this.$route.name === 'OfflineDev') {
      // this.devInfo = {}
      this.devInfoTit = ''
      this.network = 0
      this.getSSensation()
    } else if (this.$route.name === 'AllDev') {
      this.devInfoTit = ''
      this.network = ''
      this.getSSensation()
    }
  },
  mounted () {
    // this.partsOpen()
  },
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    async getSSensation () {
      if (this.initState === 2) {
        const dto = {
          devId: this.input_devId,
          dpName: this.input_dpName,
          devType: this.devInfoTit,
          // model:
          // area:
          pageIndex: this.pageIndex,
          pageRow: this.pageRow,
          userId: this.userInfo.userId,
          network: this.network
        }
        await this.$http.post('/pf/wxmain/u/dev', dto).then((res) => {
          console.log(res, '1111111111111111111111111111111111')
          if (!res.data.data) {
            this.totalCount = 0
          } else {
            this.devInfo = res.data.data.data
            this.totalCount = res.data.data.totalCount
          }
        })
      } else if (this.initState === 1) {
        const dto = {
          devId: this.input_devId,
          dpName: this.input_dpName,
          devType: this.devInfoTit,
          // model:
          // area:
          pageIndex: this.pageIndex,
          pageRow: this.pageRow,
          openid: this.openid.openid,
          network: this.network
        }
        await this.$http.post('/pf/wxmain/w/dev', dto).then((res) => {
          console.log(res.data.data)
          if (res.data.data) {
            this.totalCount = res.data.data.totalCount
            this.devInfo = res.data.data.data
          } else {
            this.devInfo = {}
            this.totalCount = 0
          }
        })
      }
    },
    // 修改页码
    changePag (index) {
      this.pageIndex = index
      this.getSSensation()
    },
    changePagarea (index) {
      this.pageInexArea = index
      this.getArea()
      this.pageInexArea = index
      // this.totalCount1 = 0
    },
    search () {
      this.getSSensation()
      this.$notify({
        message: '筛选完毕',
        background: '#07c160',
        duration: 2000
      })
    },
    // 复位
    Silencing (item) {
      this.$toast.loading({
        message: '正在复位中',
        forbidClick: true,
        duration: 0
      })
      this.$http.get(`/pf/wxmain/dev?devId=${item.devId}`).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '操作成功',
            background: '#07c160',
            duration: 2000
          })
        } else {
          this.$notify({
            message: '操作失败',
            background: '#ff000',
            duration: 2000
          })
        }
        this.$toast.clear()
      })
    },
    // 操作
    OnoptShow (item) {
      this.optShow = true
      this.optInfoItem = item
      // this.optInfoItem.dpId = item.dpId
      // this.optInfoItem.devId = item.devId
      // this.optInfoItem.model = item.model
      this.wxlabel = this.optInfoItem.label
      console.log(this.optInfoItem)
    },
    getContact () {
      this.contactshow = true
      // this.optInfoItem.dpId = item.dpId
      this.getConInfo()
    },
    getConInfo () {
      if (this.initState === 1) {
        console.log('11111')
        this.$http.get(`/pf/wxscan/w/dp/con?dpId=${this.optInfoItem.dpId}&label=${this.wxlabel}&openid=${this.openid.openid}`).then((res) => {
          console.log(res)
          console.log(res.data)
          this.contactList = res.data.data
        })
      } else if (this.initState === 2) {
        this.$http.get(`/pf/wxmain/con/${this.optInfoItem.dpId}`).then(res => {
          console.log(res)
          console.log(res.data)
          this.contactList = res.data.data
        })
      }
    },
    conInfo (item) {
      this.contactListTk = item
      this.contactTkshow = true
    },
    changeCon () {
      const dto = {
        conId: this.contactListTk.conId,
        conName: this.contactListTk.conName,
        conPhone: this.contactListTk.conPhone,
        acceptSms: this.contactListTk.acceptSms,
        acceptVms: this.contactListTk.acceptVms,
        dpId: this.contactListTk.dpId
      }
      this.$http.put('/pf/wxscan/w/dp/con', dto).then((res) => {
        if (res.data.code === 0) {
          this.contactTkshow = false
          this.getConInfo()
          this.$notify({
            message: '修改成功',
            background: '#07c160',
            duration: 2000
          })
        } else {
          this.$notify({
            message: '修改失败',
            background: '#f00',
            duration: 1500
          })
        }
      })
    },
    openAddCon () {
      this.contactTkshow = true
      this.contactListTk = {}
    },
    addConInfo () {
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
        dpId: this.optInfoItem.dpId,
        openid: this.openid.openid
      }
      console.log(dto)
      this.$http.post('/pf/wxscan/w/dp/con', dto).then((res) => {
        if (res.data.code === 0) {
          this.contactTkshow = false
          this.getConInfo()
          this.$notify({
            message: '添加成功',
            background: '#07c160',
            duration: 2000
          })
        } else {
          this.$notify({
            message: res.data.message,
            background: '#f00',
            duration: 1500
          })
        }
      })
    },
    unbound () {
      this.$dialog.confirm({
        message: '是否解绑该设备'
      }).then(() => {
        if (this.initState === 2) {
          this.$http.delete(`/pf/wxscan/u/dp/${this.optInfoItem.devId}`).then((res) => {
            console.log(res)
            if (res.data.code === 0) {
              this.$notify({
                message: '解绑安置点成功',
                background: '#07c160',
                duration: 2000
              })
              this.optShow = false
              this.getSSensation()
            } else {
              this.$notify({
                message: '解绑失败',
                background: '#ff0000',
                duration: 2000
              })
            }
          })
        } else if (this.initState === 1) {
          this.$http.delete(`/pf/wxscan/w/unbind?dpId=${this.optInfoItem.dpId}&openid=${this.openid.openid}`).then((res) => {
            console.log(res)
            if (res.data.code === 0) {
              this.$notify({
                message: '解绑安置点成功',
                background: '#07c160',
                duration: 2000
              })
              this.optShow = false
              this.getSSensation()
            } else {
              this.$notify({
                message: res.data.message,
                background: '#ff0000',
                duration: 3000
              })
            }
          })
        }
      }).catch(() => {
        // on cancel
      })
    },
    // clearCon () {
    //   this.$dialog.confirm({
    //     message: '是否清空全部该联系人'
    //   }).then(() =>
    //     this.$http.delete(`/pf/wxscan/dpoint/contact/byDpId/${this.optInfoItem.dpId}`).then((res) => {
    //       if (res.data.code === 0) {
    //         this.getConInfo()
    //         this.$notify({
    //           message: '清空成功',
    //           background: '#07c160',
    //           duration: 2000
    //         })
    //       }
    //     })
    //   ).catch(() => {
    //     // on cancel
    //   })
    // },
    conInfoDel (item) {
      this.$dialog.confirm({
        message: '是否删除该联系人'
      }).then(() =>
        this.$http.delete(`/pf/wxscan/w/dp/con?conId=${item.conId}&dpId=${this.optInfoItem.dpId}&openid=${this.openid.openid}`).then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.$notify({
              message: '删除成功',
              background: '#07c160',
              duration: 2000
            })
            this.getConInfo()
          } else {
            this.$notify({
              message: '删除失败',
              background: '#ff000',
              duration: 2000
            })
          }
        })
      ).catch(() => {
        // on cancel
      })
    },
    // 设备
    // 2在线 3离线 4屏蔽
    seachArea () {
      this.pageInexArea = 1
      this.getArea()
    },
    async getArea () {
      this.areashow = true
      this.areaList = []
      const dto = {
        daId: this.seachDaId,
        daState: this.drop1,
        devId: this.optInfoItem.devId,
        pageIndex: this.pageInexArea,
        pageRow: this.pageRow
      }
      console.log(dto, '搜索数据')
      await this.$http.post('/pf/wxmain/getarea', dto).then(res => {
        console.log(res)
        if (res.data.data) {
          this.areaList = res.data.data.data
          this.totalCount1 = res.data.data.totalCount
        } else {
          this.totalCount1 = 0
          this.$notify({
            message: '暂无数据',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    areabj (item) {
      this.areaTkshow = true
      this.areaInfo = item
    },
    areatj () {
      this.areaTkshow = true
      this.areadaId = ''
      this.areaInfo = {
        daId: '',
        daName: '',
        description: ''
      }
    },
    addArea () {
      const dto = {
        daId: this.areadaId,
        daName: this.areaInfo.daName,
        description: this.areaInfo.description,
        // devId: 10006
        devId: this.optInfoItem.devId
      }
      this.$toast.loading({
        message: '正在提交中',
        forbidClick: true,
        duration: 0
      })
      this.$http.post('/pf/wxmain/area', dto).then(res => {
        if (res.data.code === 0) {
          this.$notify({
            message: '添加成功',
            background: '#07c160',
            duration: 2000
          })
          this.areaTkshow = false
          this.getArea()
        } else {
          this.$notify({
            message: '添加失败',
            background: '#f00',
            duration: 2000
          })
        }
        this.$toast.clear()
        // this.areaLoding = false
      })
    },
    changeArea () {
      const dto = {
        daId: this.areaInfo.daId,
        daName: this.areaInfo.daName,
        description: this.areaInfo.description,
        // devId: 10006
        devId: this.optInfoItem.devId
      }
      this.$toast.loading({
        message: '正在提交中',
        forbidClick: true,
        duration: 0
      })
      this.$http.put('/pf/wxmain/area', dto).then(res => {
        if (res.data.code === 0) {
          this.$notify({
            message: '修改成功',
            background: '#07c160',
            duration: 2000
          })
          this.areaTkshow = false
          this.getArea()
        } else {
          this.$notify({
            message: '修改失败',
            background: '#ff000',
            duration: 2000
          })
        }
        this.$toast.clear()
      })
    },
    deleteArea (item) {
      this.$toast.loading({
        message: '正在删除中',
        forbidClick: true,
        duration: 0
      })
      this.$http.delete(`/pf/wxmain/area?daId=${item.daId}&devId=${this.optInfoItem.devId}`).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '删除成功',
            background: '#07c160',
            duration: 2000
          })
          this.getArea()
        } else {
          this.$notify({
            message: '删除失败',
            background: '#ff000',
            duration: 2000
          })
        }
        this.$toast.clear()
      })
    },
    // 声光
    getsgInfo () {
      this.xzsgId = false
      this.boundA = []
      this.$http.get(`/pf/wxmain/sl?devId=${this.optInfoItem.devId}`).then(res => {
        // this.$http.get(`/pf/wxmain/sl?devId=${10006}`).then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          const obj = res.data.data[i]
          if (obj.soundLightId === +this.sgRadio) {
            this.boundA.push(obj.daId)
          }
        }
        this.datalist = res.data.data
      })
    },
    getAodata () {
      this.sgRadio = ''
      this.boundA = []
      this.sgshow = true
      this.getsgInfo()
    },
    delSl () {
      // console.log(this.boundA)
      this.$dialog.confirm({
        message: '是否清空该编号下绑定设备'
      }).then(() => {
        if (this.boundA.length !== 0) {
          this.$toast.loading({
            message: '正在清空中',
            forbidClick: true,
            duration: 0
          })
          this.$http.delete(`/pf/wxmain/sl?slId=${this.sgRadio}&devId=${this.optInfoItem.devId}`).then(res => {
            // this.$http.delete(`/pf/wxmain/sl?slId=${this.sgRadio}&devId=${10006}`).then(res => {
            if (res.data.code === 0) {
              this.$notify({
                message: '清空成功',
                background: '#07c160',
                duration: 2000
              })
              this.getsgInfo()
            } else {
              this.$notify({
                message: '清空失败',
                background: '#ff000',
                duration: 2000
              })
            }
            this.$toast.clear()
          })
        } else {
          this.$notify({
            message: '该声光下没有绑定设备',
            background: '#ff000',
            duration: 2000
          })
        }
      }).catch(() => {
        // on cancel
      })
    },
    addSl () {
      const dto = {
        daIds: this.boundA,
        // devId: 10006,
        devId: this.optInfoItem.devId,
        slId: this.sgRadio
      }
      this.$toast.loading({
        message: '正在保存中',
        forbidClick: true,
        duration: 0
      })
      this.$http.put('/pf/wxmain/sl', dto).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '保存成功',
            background: '#07c160',
            duration: 2000
          })
          this.getsgInfo()
        } else {
          this.$notify({
            message: '保存失败',
            background: '#ff0000',
            duration: 2000
          })
        }
        this.$toast.clear()
      })
    },
    async optChangeBJ () {
      this.bindArea = ''
      if (this.initState === 1 && this.wxlabel === 1) {
        this.bindWXshow = true
        this.bindArea = this.optInfoItem.province + this.optInfoItem.city + this.optInfoItem.county
        this.bindWXInfo = this.optInfoItem
        console.log(this.optInfoItem)
        // if (!(this.optInfoItem.province + this.optInfoItem.city + this.optInfoItem.county)) {
        //   this.bindArea = ''
        // }
      } else if (this.initState === 2) {
        this.optChangeTK = true
        this.bindArea = this.optInfoItem.province + this.optInfoItem.city + this.optInfoItem.county
        this.optChangeInfo = this.optInfoItem
      }
      if (!(this.optInfoItem.province + this.optInfoItem.city + this.optInfoItem.county)) {
        this.bindArea = ''
      }
      // this.initialization = false
      // console.log(this.optInfoItem)
      // if (this.initState === 1) {
      //   await this.$http.get(`/pf/wxscan/wu/device?devId=${this.optInfoItem.devId}&openid=${this.openid.openid}`).then((res) => {
      //     this.initialization = true
      //     // this.initialization = res.data.data// 等于true或者false都可以进行绑定 true不允许修改
      //   })
      // }
      // console.log(this.initialization)
      // if (this.initialization === true) {
      //   this.$notify({
      //     message: '该设备已编辑无法被修改',
      //     background: '#ff0000',
      //     duration: 2000
      //   })
      // } else {
      //   this.optChangeTK = true
      //   this.optChangeInfo = this.optInfoItem
      //   console.log(this.optChangeInfo)
      // }
    },
    putBindU () {
      const dto = {
        city: this.optChangeInfo.city,
        county: this.optChangeInfo.county,
        dangerLevel: this.optChangeInfo.dangerLevel,
        detailAddress: this.optChangeInfo.detailAddress,
        // devName: '',
        dpId: this.optChangeInfo.dpId,
        dpName: this.optChangeInfo.dpName,
        // "lat": 0,
        // "lng": 0,
        // "pbId": 22,
        // "pbName": "一栋",
        // "pbfId": 47,
        // "pbfName": "一层",
        // personal: true,
        personal: false,
        phone: this.optChangeInfo.phone,
        point: this.optChangeInfo.point,
        // proName: '',
        province: this.optChangeInfo.province
      }
      // console.log(this.optChangeInfo)
      console.log(dto)
      this.$http.put('/pf/wxscan/u/dp', dto).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            message: '修改成功',
            background: '#07c160',
            duration: 2000
          })
          this.optChangeTK = false
          this.optShow = false
          this.getSSensation()
        } else {
          this.$notify({
            message: '修改失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    putBindWX () {
      const dto = {
        city: this.bindWXInfo.city,
        county: this.bindWXInfo.county,
        dangerLevel: this.bindWXInfo.dangerLevel,
        detailAddress: this.bindWXInfo.detailAddress,
        dpId: this.bindWXInfo.dpId,
        // lat: 0,
        // lng: 0,
        phone: this.bindWXInfo.phone,
        dpName: this.bindWXInfo.dpName,
        point: this.bindWXInfo.point,
        province: this.bindWXInfo.province
      }
      console.log(dto)
      this.$http.put('/pf/wxscan/w/dp', dto).then(res => {
        console.log('res', res)
        if (res.data.code === 0) {
          this.$notify({
            message: '修改成功',
            background: '#07c160',
            duration: 2000
          })
          this.bindWXshow = false
          this.optShow = false
        } else {
          this.$notify({
            message: '修改失败',
            background: '#ff0000',
            duration: 2000
          })
        }
      })
    },
    // 权限转移
    async power () {
      this.powerShow = true
      this.powerOpId = this.openid.openid
      // console.log(this.powerOpId)
      await this.$http.get(`/pf/wxmain/w/binds?dpId=${this.optInfoItem.dpId}`).then(res => {
        this.followersList = res.data.data
        // console.log(this.followersList)
      })
    },
    zyPower () {
      const dto = {
        dpId: this.optInfoItem.dpId,
        originalOpenid: this.openid.openid,
        targetOpenid: this.powerOpId
      }
      // console.log('dto----------------------------', dto)
      if (this.openid.openid !== this.powerOpId) {
        this.$http.put('/pf/wxmain/w/authchange', dto).then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            this.$notify({
              message: '转移权限成功',
              background: '#07c160',
              duration: 2000
            })
            this.powerShow = false
            this.optShow = false
            this.getSSensation()
          } else {
            this.$notify({
              message: '转移权限失败',
              background: '#ff0000',
              duration: 2000
            })
          }
        })
      } else {
        this.$notify({
          message: '转移失败，不可重复转移',
          background: '#ff0000',
          duration: 2000
        })
      }
    },
    // 地址选择
    cityShow () {
      const nb = this.areaInfos
      var obj = {}
      for (const key in nb.county_list) {
        // 创建省
        if (!obj[key.slice(0, 2)]) {
          obj[key.slice(0, 2)] = { children: {} }
        }
        // 创建市级
        if (!obj[key.slice(0, 2)].children[key.slice(2, 4)]) {
          obj[key.slice(0, 2)].children[key.slice(2, 4)] = { children: [] }
        }
        // push进区级
        obj[key.slice(0, 2)].children[key.slice(2, 4)].children.push({
          code: key,
          name: nb.county_list[key]
        })
      }

      for (const key in nb.city_list) {
        if (obj[key.slice(0, 2)] && obj[key.slice(0, 2)].children[key.slice(2, 4)]) {
          obj[key.slice(0, 2)].children[key.slice(2, 4)].name = nb.city_list[key]
        } else if (obj[key.slice(0, 2)]) {
          // 海外不处理
          // obj[key.slice(0, 2)] = { children: {} };
          // obj[key.slice(0, 2)].children[key.slice(2, 4)]={name:nb.city_list[key]}
        }
      }
      for (const key in nb.province_list) {
        if (obj[key.slice(0, 2)]) {
          obj[key.slice(0, 2)].name = nb.province_list[key]
        } else {
          obj[key.slice(0, 2)] = { children: {}, name: nb.province_list[key] }
        }
      }
      for (const key in obj) {
        if (obj[key].name === this.optInfoItem.province) {
          const city = obj[key].children
          for (const key in city) {
            if (city[key].name === this.optInfoItem.city) {
              const area = city[key].children
              for (const key in area) {
                if (area[key].name === this.optInfoItem.county) {
                  this.areaCode = area[key].code
                }
              }
            }
          }
        }
      }
      // console.log(this.areaCode)
      this.cityVisable = true
    },
    // value=0改变省，1改变市，2改变区
    // onChange (picker, index, value) {
    //   const val = picker.getValues()
    //   console.log(val)// 查看打印
    //   let areaName = ''
    //   for (var i = 0; i < val.length; i++) {
    //     areaName = areaName + (i === 0 ? '' : '/') + val[i].name
    //   }
    //   this.carmodel = areaName
    // },
    // 确定选择城市
    onConfirm (val) {
      console.log(val[0].name + ',' + val[1].name + ',' + val[2].name)
      this.cityVisable = false// 关闭弹框
      this.bindArea = val[0].name + val[1].name + val[2].name
      if (this.initState === 1) {
        this.bindWXInfo.province = val[0].name
        this.bindWXInfo.city = val[1].name
        this.bindWXInfo.county = val[2].name
      } else if (this.initState === 2) {
        this.optChangeInfo.province = val[0].name
        this.optChangeInfo.city = val[1].name
        this.optChangeInfo.county = val[2].name
      }
    },
    // 取消选中城市
    onCancel () {
      this.cityVisable = false
      this.$refs.myArea.reset()// 重置城市列表
    },
    // 配件统计
    async partsOpen (item) {
      this.partsDevId = item.devId
      this.partsLists = ''
      this.partsSum = true
      await this.$http.get(`/pf/wxmain/area/typeTotal/${item.devId}`).then(res => {
        console.log(res)
        console.log(res.data.data)
        this.typeTotal = res.data.data
        const typeTotal1 = []
        const typeTotal2 = []
        const typeTotalList = []
        // const typeTotal3 = []
        for (var i in this.typeTotal) {
          typeTotal1.push(this.typeTotal[i].daType === undefined ? '空' : this.typeTotal[i].daType)
          typeTotal2.push(this.typeTotal[i].total)
          // typeTotal3.push(this.typeTotal[i].total)
          typeTotalList.push({ name: this.typeTotal[i].daType === undefined ? '空' : this.typeTotal[i].daType, value: this.typeTotal[i].total })
        }
        this.typeTotal.daType = typeTotal1
        this.typeTotal.total = typeTotal2
        this.typeTotal.list = typeTotalList
        console.log(this.typeTotal)
      })
      this.$nextTick(() => {
        const partsP = this.echarts.init(document.querySelector('#partsPie'))
        // this.PartsP = this.echarts.init(document.querySelector('#partsPie'))
        const option = {
          title: {
            text: '配件信息',
            x: 'center',
            y: '30px',
            textStyle: {
              color: '#000',
              fontSize: 40
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} :  <br/>{d}% <br/> {c}个',
            textStyle: {
              fontSize: 32
            }
          },
          legend: {
            orient: 'horizontal',
            show: true,
            x: '60%',
            // bottom: 'bottom',
            // y: '25%',
            y: 'center',
            itemGap: 28,
            itemWidth: 28,
            itemHeight: 28,
            // data: ['烟温1', '烟温2', '烟温3', '烟温4', '烟温5', '烟温6', '手报1', '手报2', '手报3', '手报4', '手报5'],
            // data: ["烟感", "空", "无"],
            data: this.typeTotal.daType,
            textStyle: {
              color: '#0094ff',
              fontSize: 30
            }
          },
          color: ['#1890FF', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#13C2C2', '#3436C7', '#FF99C3', '#223273', '#FF9D4D'],
          series: [
            {
              // name: '访问来源',
              type: 'pie',
              radius: '65%',
              center: ['30%', '55%'],
              data: this.typeTotal.list,
              // data: [{value: "烟感", name: 33},{value: "空", name: 214},{value: "无", name: 2}],
              label: {
                normal: {
                  show: false
                  // // formatter: '{b}\n{c}个',
                  //   formatter: '{b}',
                  //   textStyle: {
                  //     fontSize: 30
                  //   }
                }
              },
              labelLine: {
                normal: {
                  length: 10,
                  length2: 5
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }

              }
            }
          ]
        }
        // setTimeout(() => {
        partsP.setOption(option)
        const that = this
        partsP.on('click', function (params) {
          console.log(that)
          that.$http.get(`/pf/wxmain/area/typeNetwork?daType=${params.name}&devId=${that.partsDevId}`).then(res => {
            that.partsLists = res.data.data
            console.log(res)
            console.log(that.partsLists)
          })
        })
        // }, 0)
      })
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
.yangan-tit {
  position: absolute;
  left: 25%;
  font-size: 50px;
  font-weight: 700;
  width: 50%;
  text-align: center;
  line-height: 52px;
}
.home-cont-yangan {
  width: 100%;
  height: 100%;
  /deep/.van-popup__close-icon {
    font-size: 58px;
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
    /deep/.van-dropdown-menu {
      width: 80%;
      border-radius: 50px;
      margin: 0 auto;
      margin-top: 30px;
      height: 100px;
      .van-dropdown-menu__item {
        font-size: 48px;
      }
      .van-dropdown-menu__title {
        width: 40%;
        height: 100%;
        line-height: 100px;
        font-size: 48px;
      }
      .van-dropdown-menu__title::after {
        width: 20px;
        height: 20px;
        top: 40%;
      }
      .van-dropdown-item__content {
        padding-bottom: 50px;
      }
      .van-cell {
        height: 100px;
        line-height: 100px;
        font-size: 48px;
        width: 60%;
        margin-left: 20%;
      }
    }
    .sxbutton {
      margin-top: 30px;
      margin-left: 230px;
      width: 300px;
      font-size: 54px;
      height: 80px;
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
    // .clearCon {
    //   left: 280px;
    // }
    .van-button__icon {
      font-size: 36px;
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
      .bdfone {
        float: left;
        margin-top: 50px;
        width: 25%;
      }
      .bdftwo {
        float: left;
        margin-top: 50px;
      }
      .seeCon {
        position: absolute;
        height: 100px;
        font-size: 34px;
        width: 210px;
        right: 30px;
        top: 30px;
      }
      .seeConDel {
        position: absolute;
        height: 100px;
        font-size: 34px;
        width: 210px;
        right: 30px;
        top: 155px;
      }
      .van-tag {
        font-size: 30px;
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
        .areading {
          position: absolute;
          height: 80px;
          font-size: 32px;
          width: 170px;
          left: 350px;
          bottom: 0px;
        }
      }
      .opt-form {
        height: 500px;
        overflow-x: hidden;
        overflow-y: scroll;
        margin-top: 10px;
        padding: 1%;
        width: 98%;
        /deep/.van-icon-arrow {
          font-size: 48px;
        }
      }
    }
    .seach-input {
      float: left;
      width: 30%;
      margin-left: 50px;
      font-size: 40px;
      border-radius: 20px;
      border: 1px solid #ccc;
      height: 70px;
      line-height: 60px;
      position: absolute;
      top: 105px;
      left: 450px;
    }
    .search-ico {
      position: absolute;
      top: 115px;
      right: 100px;
      font-size: 50px;
    }
    .van-dropdown-menu {
      width: 200px;
      height: 70px;
      position: absolute;
      top: 105px;
      left: 260px;
      /deep/.van-dropdown-menu__title {
        height: 70px;
        font-size: 40px;
        line-height: 70px;
        .van-ellipsis {
          height: 70px;
        }
      }
      /deep/.van-dropdown-item__content {
        width: 20%;
        margin-left: 280px;
      }
      /deep/.van-dropdown-item__option {
        height: 60px;
        line-height: 50px;
        font-size: 34px;
        border: 1px solid #ccc;
      }
      /deep/.van-dropdown-menu__title::after {
        top: 43%;
        right: -20px;
        width: 10px;
        height: 10px;
      }
    }
  }
}
.yg-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 180px 40px 40px;
}
.totalC {
  font-size: 36px;
  margin-top: 30px;
  text-align: center;
}
.tab-lists {
  position: relative;
  display: block;
  width: 904px;
  // height: 350px;
  margin: 0 auto 50px;
  border-radius: 25px;
  font-size: 32px;
  line-height: 52px;
  padding-top: 28px;
  padding-bottom: 28px;
  box-shadow: 0 0 20px #ccc;
  p {
    width: 70%;
    margin-left: 54px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // vertical-align: middle;
    .xhValue {
      display: inline-block;
      width: 40px;
      height: 30px;
      margin-left: 10px;
      img {
        padding-bottom: 10px;
        width: 100%;
        height: 100%;
      }
    }
  }
  .lists-tit {
    font-size: 47px;
    line-height: 67px;
  }
  .van-tag {
    font-size: 30px;
  }

  .optbutton {
    position: absolute;
    height: 80px;
    font-size: 32px;
    width: 200px;
    right: 20px;
    top: 170px;
  }
  .silencing {
    top: 270px;
  }
  .accessoriesSum {
    width: 300px;
    top: 20px;
    background-color: #fff;
    color: #000;
  }
}
.van-pagination {
  font-size: 40px;
  /deep/.van-pagination__item {
    min-width: 95px !important;
    height: 70px;
    line-height: 70px;
  }
}
.optPopup {
  // position: relative;
  .van-button {
    float: left;
    width: 25%;
    height: 80px;
    font-size: 30px;
    margin-left: 50px;
    margin-top: 45px;
  }
  // .Unbound {
  //   position: absolute;
  //   width: 200px;
  //   height: 80px;
  //   font-size: 30px;
  //   bottom: 50px;
  //   right: 100px;
  // }
}
.shengG {
  /deep/.van-radio--horizontal {
    margin-left: 5%;
    font-size: 30px;
    width: 15%;
    height: 60px;
    margin-right: 0;
    .van-radio__icon,
    .van-radio__icon .van-icon {
      width: 50px;
      height: 50px;
    }
    .van-radio__icon--checked .van-icon {
      color: transparent;
    }
  }
  .xzsgId {
    height: 60px;
    font-size: 40px;
    width: 35%;
    margin-left: 300px;
  }
  .sgTit {
    display: block;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .Bound {
    .bound-tit {
      display: block;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    float: left;
    width: 40%;
    margin-left: 5%;
    height: 700px;
    border-radius: 30px;
    padding: 10px;
    border: 1px solid #0094ff;
    margin-top: 50px;
    .van-checkbox-group {
      height: 600px;
      // overflow: hidden;
      overflow-y: auto;
    }
    /deep/.van-checkbox {
      width: 33.33%;
      float: left;
      margin: 0;
      font-size: 35px;
      height: 50px;
      margin-top: 15px;
      padding-left: 20px;
      .van-checkbox__icon {
        width: 50px;
        height: 50px;
      }
      .van-checkbox__icon .van-icon {
        color: transparent;
        width: 50px;
        height: 50px;
      }
    }
  }
  .addslid {
    position: absolute;
    left: 5%;
    top: 110px;
    width: 150px;
    font-size: 38px;
    height: 60px;
  }
  .delslid {
    left: 79%;
  }
  .allbound {
    width: 90%;
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
        .van-icon {
          width: 60px;
          height: 60px;
        }
        .van-icon-success {
          width: 60px;
          height: 60px;
          color: transparent;
          overflow: hidden;
        }
        .van-radio__icon {
          margin-top: 20px;
          width: 80px;
          height: 80px;
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
.powerS {
  height: 420px !important;
  /deep/.van-radio {
    font-size: 60px;
    height: 60px;
    width: 60%;
    margin-left: 30%;
    margin-top: 20px;

    .van-icon,
    .van-radio__icon {
      width: 60px;
      height: 60px;
      font-size: 50px;
    }
  }
}
.partsPopup {
  // h2 {
  //   height: ;
  // }
  #partsPie {
    width: 100%;
    height: 500px;
    // background-color: pink;
  }
  .partsList {
    li {
      width: 90%;
      height: 54px;
    font-size: 32px !important;
      margin-left: 5%;
      margin-top: 20px;
      // height: 50px;
      // line-height: 54px;
      // padding: 10px;
      // margin: 30px;
      border: 2px solid #ccc;
      &:last-child{

        margin-bottom: 20px;
      }

    }
     .van-tag {
       margin-left: 10px;
       border-radius: 10px;
       text-align:center !important;
       font-size: 32px;
       line-height: 54px;
       height: 54px;
      //  padding: 0;
       padding: 0 10px;
  }
  }
}
</style>
