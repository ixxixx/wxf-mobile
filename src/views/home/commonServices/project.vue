<template>
  <div class="home-cont-yangan">
    <div class="head">
      <div class="left">
        <van-icon @click="fhsyy" name="arrow-left" />
        <span class="yangan-tit">项目管理</span>
      </div>
    </div>
    <div class="yg-main">
      <div class="hjzt-list">
        <ul>
          <!-- <router-link to="Xiangxi"> -->
          <li
            v-for="(item, index) in projectInfo"
            :key="index"
            class="tab-lists"
          >
            <p class="lists-tit">{{ item.proName }}</p>
            <p>项目负责人: {{ item.people }}</p>
            <p>负责人电话: {{ item.phone }}</p>
            <p>设备总数: {{ item.deviceTotal }}</p>
            <p>项目类型: {{ item.proType === 0 ? "散户" : "工程队" }}</p>
            <p>多层建筑: {{ item.multiBuildingAmount }}</p>
            <p>
              所属场所:
              {{!item.detailAddress
                  ? "无"
                  : item.province + item.city + item.county + item.detailAddress
              }}
            </p>
            <van-button
              @click="getBuilding(item)"
              class="seeJz"
              round
              type="info"
              >查看建筑</van-button
            >
          </li>
          <!-- </router-link> -->
        </ul>
        <!-- <van-pagination
          v-model="currentPage"
          :total-items="this.sSTotalCount"
          :items-per-page="10"
          @change="changePag"
        />
        <p class="totalC">{{`共`+ this.sSTotalCount + `条`}}</p> -->
      </div>
    </div>
    <van-popup
      v-model="bdshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="bdlist">
        <h2>项目建筑</h2>
        <div class="bdl" v-for="(item, index) in bdList" :key="index">
          <p>建筑Id: {{ item.pbId }}</p>
          <p>是否为单层建筑: {{ item.isSingle === true ? "是" : "否" }}</p>
          <p>建筑名： {{ item.pbName }}</p>
          <van-button @click="getBdFloor(item)" class="seeBdf" round type="info">查看楼层</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="bdfshow"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '53%' }"
    >
      <div class="bdlist">
        <h2>建筑楼层</h2>
        <div style="height: 150px;" class="bdl" v-for="(item, index) in bdfList" :key="index">
          <p class="bdfone">楼层Id: {{ item.pbfId }}</p>
          <p class="bdftwo">楼层名： {{ item.pbfName }}</p>
          <!-- <van-button @click="getBdFloor(item)" class="seeBdf" round type="info">圆形按钮</van-button> -->
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: '',
      // initState: '',

      projectInfo: {},
      bdshow: false,
      bdList: {},
      bdfshow: false,
      bdfList: {}
      // 分页
      //   currentPage: 1,
      //   sSTotalCount: 0,
      //   pageIndex: 1,
      //   pageRow: 10
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // this.initState = JSON.parse(sessionStorage.getItem('initState'))
  },
  mounted () {
    this.getProject()
  },
  methods: {
    fhsyy () {
      this.$router.go(-1)
    },
    async getProject () {
      // if (this.initState === 2) {

      await this.$http.get(`/pf/wxmain/u/project/${this.userInfo.userId}`).then((res) => {
        this.projectInfo = res.data.data
      })
      // } else if (this.initState === 1) {
      //   console.log('你是微信授权登录 无法访问项目管理');
      // }
    },
    getBuilding (item) {
      this.$http.get(`/pf/wxmain/u/project/building/${item.proId}`).then((res) => {
        this.bdList = res.data.data
        if (this.bdList[0]) {
          this.bdshow = true
        } else {
          this.$toast({
            message: '暂无数据',
            duration: 1500
          })
        }
      })
    },
    getBdFloor (item) {
      this.$http.get(`/pf/wxmain/u/project/floor/${item.pbId}`).then((res) => {
        this.bdfList = res.data.data
        if (this.bdfList[0]) {
          this.bdfshow = true
        } else {
          this.$toast({
            message: '暂无数据',
            duration: 1200
          })
        }
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
  font-size: 52px;
  font-weight: 700;
  width: 50%;
  text-align: center;
  line-height: 52px;
}
.home-cont-yangan {
  width: 100%;
  height: 100%;
  /deep/.van-popup__close-icon {
    font-size: 60px;
  }
  .bdlist {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 30px;
    h2 {
      font-size: 50px;
      text-align: center;
    }
    .bdl {
      width: 90%;
      height: 200px;
      margin: 50px auto;
      border-radius: 30px;
      border: 1px solid #0094ff;
      position: relative;
      p {
        font-size: 40px;
        line-height: 48px;
        margin-top: 15px;
        margin-left: 30px;
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
      .seeBdf {
        position: absolute;
        height: 80px;
        font-size: 32px;
        width: 170px;
        right: 30px;
        top: 65px;
      }
    }
  }
}
.yg-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding:180px 40px 40px;
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
  height: 400px;
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
    font-weight: 700;
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
  .seeJz {
    position: absolute;
    height: 80px;
    font-size: 32px;
    width: 170px;
    right: 20px;
    top: 20px;
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
.noinfo {
  width: 300px;
  font-size: 50px;
}
</style>
