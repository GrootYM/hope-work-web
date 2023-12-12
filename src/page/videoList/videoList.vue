<template>
  <div id="app">
    <div class="main">
      <div class="Bmain">
        <div class="videoBox">
          <div class="videoList">
            <div class="videoDetails" v-for="(item, index) in videoDetails" :key="index">
              <div class="videoPic" @click="toVideo(item.id)"><img :src="item.imageUrl" alt="" /></div>
              <h3>{{ item.title }}</h3>
              <div class="videoWriter">
                <img :src="item.headImg" alt="" />
                <span class="teacherName">{{ item.userName }}</span>
                <span class="line"></span>
                <span class="time">{{ item.createTime }}</span>
              </div>
            </div>
          </div>
          <div class="advertising">
            <div v-for="(item, index) in advertising" :key="index"><img :src="item.imgUrl" alt="" /></div>
          </div>
        </div>
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
      videoDetails: [],
      advertising: [
        {
          imgUrl: require('@/assets/image/videoList/组 961.png'),
        },
        {
          imgUrl: require('@/assets/image/videoList/组 962.png'),
        },
      ],
    }
  },
  computed: {},
  created() {
    this.getVideoList()
  },
  methods: {
    async getVideoList() {
      let params = {}
      let res = await Video.videoList(params)
      if (res.code == 200) {
        console.log('99999999', res.data)
        this.videoDetails = res.data
        console.log(this.videoDetails[0].createTime, '这是时间')
        this.videoDetails.forEach(el => {
          return (el.createTime = el.createTime.slice(0, 10))
        })
      }
    },
    // 跳转视频详情
    toVideo(id) {
      this.$router.push({ name: 'videoTopic' })
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css');
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;

#app {
  min-width: $nx-width;
  .main {
    background: url('../../assets/image/returnee/bg@2x.png');
    div {
      //   border: 1px solid red;
    }
    .Bmain {
      width: 100%;
      // height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .videoBox {
        width: 1184px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 35px;
        .videoList {
          width: 884px;
          // height: 743px;
          margin-top: 12px;
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          flex-wrap: wrap;
          .videoDetails {
            width: 284px;
            height: 237px;
            background: #ffffff;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            padding: 2px;
            box-sizing: border-box;
            margin-left: 15px;
            margin-top: 18px;
            .videoPic {
              width: 280px;
              height: 158px;
              img {
                width: 280px;
                height: 158px;
              }
            }
            h3 {
              // width: 154px;
              height: 20px;
              font-size: 14px;
              font-weight: 500;
              color: #222222;
              line-height: 20px;
              margin-left: 14px;
              margin-top: 16px;
              text-align: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .videoWriter {
              // width: 200px;
              height: 16px;
              display: flex;
              margin-left: 14px;
              margin-top: 8px;
              display: flex;
              align-items: center;
              img {
                width: 16px;
                height: 16px;
              }
              .teacherName {
                // width: 36px;
                height: 17px;
                font-size: 12px;
                font-weight: 400;
                color: #666666;
                line-height: 17px;
              }
              .time {
                width: 70px;
                height: 17px;
                font-size: 12px;
                font-weight: 400;
                color: #666666;
                line-height: 17px;
              }
              span {
                margin-left: 8px;
              }
              .line {
                width: 1px;
                height: 12px;
                background: #dadde2;
              }
            }
          }
          .videoDetails:nth-child(3n + 1) {
            margin-left: 0px;
          }
          //   .videoDetails:nth-child(3n + 3) {
          //     width: 284px;
          //     height: 237px;
          //     background: #ffffff;
          //     border-radius: 4px 4px 4px 4px;
          //     opacity: 1;
          //     padding: 2px;
          //     box-sizing: border-box;
          //     margin-left: 16px;
          //   }
        }
        .advertising {
          width: 284px;
          margin-top: 30px;
          div {
            width: 284px;
            height: 200px;
          }
          div:nth-child(2) {
            margin-top: 16px;
          }
        }
      }
    }
  }
}
</style>
