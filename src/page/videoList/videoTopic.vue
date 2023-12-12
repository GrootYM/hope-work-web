<template>
  <div class="main">
    <div class="vInfoBox">
      <div class="vInfoLeft">
        <div class="vInfo">
          <h2>{{ vInfo.title }}</h2>
          <div>
            <img src="@/assets/image/job/clockIcon.png" alt="" />
            <p>发布于 {{ vInfo.timeStr }}</p>
          </div>
        </div>
        <div class="videoBox">
          <video controls :src="vInfo.videoUrl"></video>
        </div>
      </div>
      <div class="vInfoRight">
        <div class="tInfo">
          <img class="bjW" src="@/assets/image/job/vInfoBj.png" alt="" />
          <img class="headImg" :src="tInfo.headImg" alt="" />
          <div>
            <h2>{{ tInfo.userName }}</h2>
            <p>{{ tInfo.shortDesc }}</p>
          </div>
        </div>
        <div class="vListBox">
          <h2 class="vTitle">
            视频选集<span>({{ nowVIndex }}/{{ vList.length }})</span>
          </h2>
          <div class="vList">
            <div
              @click="chooseVideo(item, index)"
              :class="['vItem', nowVIndex == index ? 'active' : '']"
              v-for="(item, index) in vList"
              :key="index"
            >
              <img v-if="nowVIndex == index" src="@/assets/image/job/playing.png" alt="" />
              <h2>P{{ index + 1 }}</h2>
              <p class="name one-text">{{ item.title }}</p>
              <!-- <p class="time">{{ item.createTime }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vAboutBox">
      <h2>相关视频</h2>
      <div class="vBannerBox">
        <el-carousel indicator-position="none" :autoplay="false" arrow="always">
          <el-carousel-item v-for="(item, index) in aboutList" :key="index">
            <div class="aboutBox">
              <div class="aboutItem" v-for="(item1, index1) in item" :key="index1">
                <img :src="item1.imageUrl" alt="" />
                <div class="aboutInfo">
                  <h2>{{ item1.title }}</h2>
                  <div>
                    <img :src="item1.headImg" alt="" />
                    <p class="tName">{{ item1.userName }}</p>
                    <p>{{ item1.timeStr }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '@/api/video'

export default {
  components: {},
  data() {
    return {
      // id: "1",
      vInfo: {},
      tInfo: {},
      nowVIndex: 1,
      vList: [],
      aboutList: [],
      allAboutList: [],
      id: '',
    }
  },
  mounted() {
    this.id = this.$route.query.id || '1'
    this.getVideoList()
    this.getVideoInfo()
  },
  methods: {
    async getVideoList() {
      let params = {}
      let res = await Video.videoList(params)
      if (res.code == 200) {
        this.allAboutList = res.data
        this.formatAbout()
      }
    },
    async getVideoInfo() {
      let params = {
        listId: this.id,
      }
      let res = await Video.videoInfo(params)
      if (res.code == 200) {
        this.tInfo = res.data
        this.vList = res.data.videoList
        this.nowVIndex = 0
        let vInfo = { ...res.data.videoList[this.nowVIndex] }
        vInfo.timeStr = this.formatTime(vInfo.createTime, 2)
        this.vInfo = vInfo
      }
    },
    formatAbout() {
      let arr = [],
        cArr = []
      this.allAboutList.forEach((item, index) => {
        item.timeStr = this.formatTime(item.createTime)
        if (index == this.allAboutList.length - 1) {
          cArr.push(item)
          arr.push(cArr)
          cArr = []
        } else {
          if (index % 4 == 3) {
            cArr.push(item)
            arr.push(cArr)
            cArr = []
          } else {
            cArr.push(item)
          }
        }
      })
      this.aboutList = arr
    },
    chooseVideo(item, index) {
      if (this.nowVIndex == index) {
        return
      }
      this.nowVIndex = index
      let vInfo = { ...item }
      vInfo.timeStr = this.formatTime(vInfo.createTime, 2)
      this.vInfo = vInfo
    },
    formatTime(dateString, type) {
      let time = new Date(dateString)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = time.getDate()
      day = day > 9 ? day : '0' + day
      let hour = time.getHours()
      hour = hour > 9 ? hour : '0' + hour
      let minutes = time.getMinutes()
      minutes = minutes > 9 ? minutes : '0' + minutes
      let seconds = time.getSeconds()
      seconds = seconds > 9 ? seconds : '0' + seconds

      let str = year + '-' + month + '-' + day
      if (type == 2) {
        str = str + ' ' + hour + ':' + minutes + ':' + seconds
      }
      return str
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
}
.vInfoBox {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .vInfoLeft {
    width: 884px;
    height: 615px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    .vInfo {
      height: 118px;
      padding: 24px 32px 20px 32px;
      box-sizing: border-box;
      h2 {
        font-size: 24px;
        font-weight: 500;
        color: #222222;
        line-height: 34px;
        text-align: left;
      }
      > div {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
      }
    }
    .videoBox {
      width: 100%;
      height: 497px;
      video {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
      }
    }
  }
  .vInfoRight {
    width: 284px;
    height: 538px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    .tInfo {
      height: 86px;
      padding: 16px 24px;
      box-sizing: border-box;
      display: flex;
      position: relative;
      text-align: left;
      .headImg {
        width: 54px;
        height: 54px;
        margin-right: 16px;
      }
      > div {
        h2 {
          font-size: 16px;
          font-weight: 500;
          color: #3d3d3d;
          line-height: 22px;
          margin-bottom: 12px;
        }
        p {
          font-size: 14px;
          color: #999999;
          line-height: 20px;
        }
      }
    }
    .vListBox {
      height: 452px;
      background: #f3f5f9;
      .vTitle {
        padding: 16px 0 16px 24px;
        font-size: 16px;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 22px;
        text-align: left;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          margin-left: 8px;
        }
      }
      .vList {
        display: flex;
        flex-direction: column;
        align-items: center;
        .vItem {
          display: flex;
          align-items: center;
          width: 276px;
          height: 32px;
          padding: 0 20px;
          box-sizing: border-box;
          border-radius: 4px;
          font-size: 14px;
          line-height: 20px;
          color: #3d3d3d;
          cursor: pointer;
          img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
          }
          h2 {
            width: 24px;
            margin-right: 8px;
          }
          .name {
            // width: 163px;
            width: 200px;
            margin-right: 4px;
            text-align: left;
          }
          .time {
            width: 38px;
            color: #999999;
          }
        }
        .vItem.active {
          background: #2446a8;
          box-shadow: 0px 4px 8px 0px rgba(36, 70, 168, 0.3);
          color: #fff;
          name {
            width: 139px;
          }
          .time {
            color: #fff;
          }
        }
      }
    }
  }
}
.vAboutBox {
  width: 1200px;
  margin: 0 auto;
  margin-top: 72px;
  > h2 {
    font-size: 32px;
    font-weight: 600;
    color: #333333;
    line-height: 45px;
    text-align: left;
  }
  .vBannerBox {
    width: 1300px;
    margin-left: -50px;
    margin-top: 30px;
    .aboutBox {
      display: flex;
      .aboutItem {
        width: 284px;
        height: 235px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        margin-right: 18px;
        > img {
          width: 100%;
          height: 158px;
        }
        .aboutInfo {
          height: 77px;
          padding: 16px 14px;
          box-sizing: border-box;
          > h2 {
            font-size: 14px;
            font-weight: 500;
            color: #222222;
            line-height: 20px;
            text-align: left;
          }
          > div {
            display: flex;
            align-items: center;
            margin-top: 8px;
            font-size: 12px;
            color: #666666;
            line-height: 17px;
            img {
              width: 16px;
              height: 16px;
            }
            p {
              padding: 0 8px;
              position: relative;
            }
            .tName {
              padding-right: 9px;
            }
            .tName::after {
              width: 1px;
              height: 12px;
              background: #dadde2;
              content: '';
              display: block;
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -6px;
            }
          }
        }
      }
      .aboutItem:last-child {
        margin-right: 0;
      }
    }
  }
}
.vBannerBox /deep/ .el-carousel__arrow {
  width: 32px;
  height: 104px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
  font-size: 20px;
}
.vBannerBox /deep/ .el-carousel__arrow--left {
  left: -50px;
}
.vBannerBox /deep/ .el-carousel__arrow--right {
  right: -50px;
}
.vBannerBox /deep/ .el-carousel__container {
  width: 1200px;
  height: 235px;
  margin: 0 auto;
}
</style>
