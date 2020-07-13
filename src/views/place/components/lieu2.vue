<template>
  <div class="lieu-cont">
<van-search
  v-show="searchBox"
    v-model="searchInfo"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
    <div class="head">
      <div class="left">场所</div>
      <div class="title">智慧消防</div>
      <div class="right-ico">
        <van-icon @click="searchBox = true" name="search" />
      </div>
    </div>
    <div class="cs-main">
      <van-tabs
        v-model="activeName"
        swipe-threshold="6"
        line-width="120px"
        sticky
      >
        <van-tab title="全部" name="a">
          <div class="csLists">
            <div
              class="cs-list"
              v-for="(item, index) in this.allListData"
              :key="index"
            >
              <van-tag mark :color="color(item)">{{ item.id }}</van-tag>
              <p class="listName">{{ item.title }}</p>
              <p class="subordinate">
                <i class="icon"></i>
                <span>{{ item.subordinate }}</span>
              </p>
              <p class="address">
                <i class="icon"></i>
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab title="正常" name="b"
          ><div class="csLists">
            <div
              class="cs-list"
              v-for="(item, index) in this.zcListData"
              :key="index"
            >
              <van-tag mark :color="color(item)">{{ item.id }}</van-tag>
              <p class="listName">{{ item.title }}</p>
              <p class="subordinate">
                <i class="icon"></i>
                <span>{{ item.subordinate }}</span>
              </p>
              <p class="address">
                <i class="icon"></i>
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div></van-tab
        >
        <van-tab title="火警" name="c"><div class="csLists">
            <div
              class="cs-list"
              v-for="(item, index) in this.hjListData"
              :key="index"
            >
              <van-tag mark :color="color(item)">{{ item.id }}</van-tag>
              <p class="listName">{{ item.title }}</p>
              <p class="subordinate">
                <i class="icon"></i>
                <span>{{ item.subordinate }}</span>
              </p>
              <p class="address">
                <i class="icon"></i>
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div></van-tab>
        <van-tab title="预警" name="d"><div class="csLists">
            <div
              class="cs-list"
              v-for="(item, index) in this.yjListData"
              :key="index"
            >
              <van-tag mark :color="color(item)">{{ item.id }}</van-tag>
              <p class="listName">{{ item.title }}</p>
              <p class="subordinate">
                <i class="icon"></i>
                <span>{{ item.subordinate }}</span>
              </p>
              <p class="address">
                <i class="icon"></i>
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div></van-tab>
        <van-tab title="故障" name="e"><div class="csLists">
            <div
              class="cs-list"
              v-for="(item, index) in this.gzListData"
              :key="index"
            >
              <van-tag mark :color="color(item)">{{ item.id }}</van-tag>
              <p class="listName">{{ item.title }}</p>
              <p class="subordinate">
                <i class="icon"></i>
                <span>{{ item.subordinate }}</span>
              </p>
              <p class="address">
                <i class="icon"></i>
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'a',
      allListData: [],
      zcListData: [],
      hjListData: [],
      yjListData: [],
      gzListData: [],
      searchBox: false,
      searchInfo: ''
    }
  },
  methods: {
    getListInfo () {
      this.$http('/js/csList.json').then(res => {
        // console.log(res)
        // console.log(res.data)
        this.allListData = res.data
        this.zcListData = this.allListData.filter(function (item) {
          console.log(item)
          return item.id === '正常'
        })
        this.hjListData = this.allListData.filter(function (item) {
          return item.id === '火警'
        })
        this.yjListData = this.allListData.filter(function (item) {
          return item.id === '预警'
        })
        this.gzListData = this.allListData.filter(function (item) {
          return item.id === '故障'
        })
      })
    },
    color (item) {
      if (item.id === '正常') {
        return '#a4cf64'
      } else if (item.id === '火警') {
        return '#f00'
      } else if (item.id === '预警') {
        return '#febd23'
      } else if (item.id === '故障') {
        return '#f4ea2a'
      }
    },
    onSearch () {

    },
    onCancel () {
      this.searchBox = false
    }
    // getzcData () {
    //   if(allListData)
    // }
  },
  created () {
    // this.getListInfo()
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/head.less";
.lieu-cont {
  background-color: #fff;
  // margin-bottom: 172px;
   .van-search--show-action {
     border-radius: 30px;
    position: absolute;
    top: 20px;
    height: 110px;
    z-index: 10;
    padding-right: 0;
    width: 100%;
    font-size: 40px;
    .van-search__content {
      height: 80px;
    }
    .van-cell {
      font-size: 50px;
    }
    /deep/.van-icon {
      line-height: 80px;
      font-size: 50px !important;
    }
    .van-search__action {
      margin-right: 30px;
      font-size: 40px;
    }
}
}
.cs-main {

  /deep/.van-tabs--line .van-tabs__wrap {
    height: 110px;
    .van-tab {
      width: 20%;
      font-size: 50px;
      line-height: 110px;
      &:nth-child(1) {
        color: #4d4d4d;
      }
      &:nth-child(2) {
        color: #a4cf64;
      }
      &:nth-child(3) {
        color: #ff0000;
      }
      &:nth-child(4) {
        color: #febd23;
      }
      &:nth-child(5) {
        color: #f4ea2a;
      }
    }
  }
  .csLists {
    padding-top: 40px;
    padding-bottom: 20px;
    .cs-list {
      position: relative;
      width: 924px;
      height: 360px;
      font-size: 40px;
      color: #4d4d4d;
      border-radius: 28px;
      margin: 40px auto;
      box-shadow: 0 0 20px #ccc;
      .listName {
        position: absolute;
        top: 76px;
        left: 53px;
        font-size: 51px;
        line-height: 100%;
      }
      .icon {
        display: inline-block;
        //    float: left;
        width: 46px;
        height: 43px;
        background-image: url("../../../assets/jlt.png");
        background-position: -1129px -771px;
        margin-right: 25px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
      .subordinate {
        position: absolute;
        top: 183px;
        left: 53px;
      }
      .address {
        position: absolute;
        top: 258px;
        left: 53px;
        .icon {
          background-position-y: -846px;
        }
      }
      .van-tag {
        font-size: 30px;
        position: absolute;
        right: 50px;
      }
      .van-tag--mark {
        width: 25px;
        height: 80px;
        text-align: center;
        border-radius: 0 0 59px 59px;
      }
    }
  }
}
</style>
