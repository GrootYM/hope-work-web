<template>
  <div class="companyBox">
    <div class="companyLeft">
      <img class="bj" src="@/assets/image/oxman/bj1.png" alt="" />
      <div class="bjCon">
        <h2>编辑公司信息</h2>
        <p>请认真阅读并遵守《<span @click="showXz = true">公司信息填写须知</span>》</p>
        <div class="xyCard" v-if="noPerfect">
          <div class="xy">
            <h2>你的公司主页吸引力</h2>
            <p>良好</p>
          </div>
          <p>在同行业内吸引力低，继续完善</p>
          <div class="wsBox">
            <p>完善5项信息，可提升主页查看率</p>
            <button @click="toPerfect">去完善</button>
          </div>
        </div>
        <div class="leftTabBox">
          <div
            :class="['leftTabItem', nowTab == index ? 'active' : '']"
            v-for="(item, index) in tabArr"
            :key="index"
            @click="chooseTab(index, item)"
          >
            <h2>{{ item.name }}</h2>
            <div>
              <p v-if="item.status">{{ item.total ? item.num + '/' + item.total : '已完善' }}</p>
              <p v-else>{{ '未完善' }}</p>
              <img class="rightIcon" src="@/assets/image/oxman/right.png" alt="" />
              <img class="rightIconed" src="@/assets/image/oxman/righted.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="companyRight">
      <Information v-if="nowTab == 0" :companyInfo="companyInfo" @getCompany="getCompany" />
      <welfareTime
        v-if="nowTab == 1 && welfareStep == 1"
        @toNext="changeStep"
        @setWelfare="setWelfare"
        @getCompany="getCompany"
        :companyInfo="companyInfo"
      />
      <Welfare
        v-if="nowTab == 1 && welfareStep == 2"
        @toPre="changeStep"
        @getCompany="getCompany"
        :companyInfo="companyInfo"
        :welfare="welfare"
      />
      <Introduction v-if="nowTab == 2" :companyInfo="companyInfo" @getCompany="getCompany" />
      <MainBusiness v-if="nowTab == 3" :companyInfo="companyInfo" @getCompany="getCompany" />
      <Album v-if="nowTab == 4" :companyInfo="companyInfo" @getCompany="getCompany" />
    </div>

    <el-dialog :visible.sync="showXz" :show-close="false" :close-on-click-modal="false">
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
        <div class="title">
          <h2>公司信息填写须知</h2>
          <img src="@/assets/image/login/close.png" class="close-btn" @click="showXz = false" />
        </div>
        <div class="conBox">
          <p>
            您在本页面编辑、上传的公司信息将作为招聘场景下的公司主页展示,供求职者浏览。为保障求职者合法权益并确保您的招聘效果,您承诺并确认：
          </p>
          <p>1、您的填写行为已获得所在公司的授权,相关内容经过公司确认。</p>
          <p>2、填写、上传真实、合法、有效的公司信息,据实填写并及时更新公司介绍、规模、福利等,以兔对求职者造成误导。</p>
          <p>
            3、填写、上传的图文、视频等资料不存在违法违规或涉侵犯第三方台法权益的情形,如由此产生相关法律风险或造成损失,由您及所在公司承担法律责任。
          </p>
          <p>
            4、授权希望工厂以提供招聘服务为目的在其他场下兔费使用您在本页面填写的公司信息,以便为您提供更佳的服务体验。
          </p>
          <div class="btnBox">
            <button class="save" @click="showXz = false">我知道了</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import MainBusiness from '@/page/OxmanW/components/mainBusiness'
import Introduction from '@/page/OxmanW/components/introduction'
import Information from '@/page/OxmanW/components/information'
import Album from '@/page/OxmanW/components/album'
import WelfareTime from '@/page/OxmanW/components/welfareTime'
import Welfare from '@/page/OxmanW/components/welfare'

import Oxman from '@/api/oxman'

export default {
  components: {
    MainBusiness,
    Introduction,
    Information,
    Album,
    Welfare,
    WelfareTime,
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  data() {
    return {
      noPerfect: true, //公司信息不完善
      showXz: false,
      companyInfo: {},
      info: {},
      welfareStep: 1,
      nowTab: 0,
      tabArr: [
        {
          name: '公司基本信息',
          total: 6,
          child: [],
          status: 1,
        },
        {
          name: '公司福利',
          total: 2,
          num: 0,
          status: 1,
        },
        {
          name: '公司介绍',
          total: 12,
          num: 0,
          status: 1,
        },
        {
          name: '主营业务',
          total: 0,
          num: 0,
          status: 0,
        },
        {
          name: '公司相册',
          total: 0,
          num: 0,
          status: 0,
        },
        // {
        //   name: '公司视频',
        //   total: 6,
        //   num: 0,
        //   status: 0,
        // },
        // {
        //   name: '在职感受',
        //   total: 6,
        //   num: 0,
        //   status: 0,
        // },
      ],
      welfare: {},
    }
  },
  mounted() {
    // this.queryCompanyInfo()
  },
  activated() {
    if (this.$route.query.update) {
      this.queryCompanyInfo()
    }
  },
  methods: {
    toPerfect() {
      for (let i = 0; i < this.tabArr.length; i++) {
        let item = this.tabArr[i]
        if (!item.status) {
          this.nowTab = i
          return
        } else {
          if (item.num != item.total) {
            this.nowTab = i
            return
          }
        }
      }
    },
    setWelfare(val) {
      console.log(val)
      this.welfare = val
    },
    getCompany() {
      console.log('getCompany')
      this.queryCompanyInfo()
    },
    changeStep(val) {
      this.welfareStep = val
    },
    chooseTab(index, item) {
      if (this.nowTab == index) {
        return
      }
      this.nowTab = index
      this.info = item
    },
    async queryCompanyInfo() {
      let params = {
        // id: 24,
        id: this.userInfo.companyId || '24',
      }
      let res = await Oxman.queryCompanyInfo(params)
      if (res.code == 200) {
        this.companyInfo = res.data
        // let arr = []
        let num = 0
        this.companyInfo.headUrl && num++
        this.companyInfo.companyName && num++
        this.companyInfo.shortName && num++
        this.companyInfo.companyIndustryList && this.companyInfo.companyIndustryList.length > 0 && num++
        this.companyInfo.finance && num++
        this.companyInfo.companyScale && num++
        let obj = { ...this.tabArr[0] }
        obj.num = num
        this.tabArr.splice(0, 1, obj)
        // console.log(this.tabArr)
        let num1 = 0
        if (this.companyInfo.startTime || this.companyInfo.endTime || this.companyInfo.holsType.length > 0) {
          num1++
        }
        if (
          this.companyInfo.benefits.length > 0 ||
          this.companyInfo.promotion.length > 0 ||
          this.companyInfo.incentive.length.length > 0
        ) {
          num1++
        }
        let obj1 = { ...this.tabArr[1] }
        obj1.num = num1
        this.tabArr.splice(1, 1, obj1)

        let num2 = 0
        this.companyInfo.introduce && num2++
        this.companyInfo.legalUser && num2++
        this.companyInfo.businessStatus && num2++
        this.companyInfo.registeredCapital && num2++
        this.companyInfo.registerAddress && num2++
        this.companyInfo.cityName && num2++
        this.companyInfo.formerName && num2++
        this.companyInfo.registerOrgan && num2++
        this.companyInfo.companyType && num2++
        this.companyInfo.establishTime && num2++
        this.companyInfo.closeTime && num2++
        this.companyInfo.approveTime && num2++
        let obj2 = { ...this.tabArr[2] }
        obj2.num = num2
        this.tabArr.splice(2, 1, obj2)
        if (this.companyInfo.mainBusiness) {
          let obj = { ...this.tabArr[3] }
          obj.status = 1
          this.tabArr.splice(3, 1, obj)
        } else {
          let obj = { ...this.tabArr[3] }
          obj.status = 0
          this.tabArr.splice(3, 1, obj)
        }
        if (this.companyInfo.picList.length > 0) {
          let obj = { ...this.tabArr[4] }
          obj.status = 1
          this.tabArr.splice(4, 1, obj)
        } else {
          let obj = { ...this.tabArr[4] }
          obj.status = 0
          this.tabArr.splice(4, 1, obj)
        }
        let perfectNum = 0
        this.tabArr.forEach(item => {
          if (!item.status) {
            this.noPerfect = true
          } else {
            if (item.num != item.total) {
              this.noPerfect = true
            } else {
              perfectNum++
            }
          }
        })
        // console.log(perfectNum)
        if (this.tabArr.length == perfectNum) {
          this.noPerfect = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.companyBox {
  width: 1000px;
  // height: 945px;
  height: calc(100% - 40px);
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  .companyLeft {
    width: 307px;
    height: 100%;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    position: relative;
    text-align: left;
    .bj {
      z-index: 1;
    }
    .bjCon {
      position: relative;
      z-index: 1;
      > h2 {
        font-size: 24px;
        font-weight: 600;
        color: #3d3d3d;
        line-height: 34px;
        margin-top: 34px;
        margin-left: 36px;
      }
      > p {
        font-size: 14px;
        color: #999999;
        line-height: 20px;
        margin-top: 6px;
        margin-left: 36px;
        span {
          color: #2446a8;
          cursor: pointer;
        }
      }
      .xyCard {
        width: 273px;
        height: 132px;
        background: linear-gradient(180deg, rgba(36, 70, 168, 0.1) 0%, rgba(36, 70, 168, 0) 100%);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid;
        border-image: linear-gradient(
            180deg,
            rgba(36.00000165402889, 70.00000342726707, 168.0000051856041, 0.10000000149011612),
            rgba(36.00000165402889, 70.00000342726707, 168.0000051856041, 0.30000001192092896)
          )
          1 1;
        margin: 0 auto;
        margin-top: 13px;
        padding: 16px 0;
        box-sizing: border-box;
        .xy {
          display: flex;
          padding: 0 15px;
          h2 {
            font-size: 14px;
            color: #3d3d3d;
            line-height: 20px;
          }
          p {
            width: 40px;
            height: 21px;
            background: rgba(36, 70, 168, 0.1);
            border-radius: 4px 4px 4px 4px;
            font-size: 12px;
            color: #2446a8;
            text-align: center;
            line-height: 21px;
            margin-left: 10px;
          }
        }
        > p {
          font-size: 14px;
          color: #999999;
          line-height: 20px;
          margin: 8px 15px 16px 15px;
        }
        .wsBox {
          border-top: 1px dashed #e5e5e5;
          padding: 16px 15px 0 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #666666;
          line-height: 17px;
          button {
            width: 60px;
            height: 25px;
            background: #2446a8;
            border-radius: 4px 4px 4px 4px;
            border: 1px solid rgba(36, 70, 168, 0.1);
            font-size: 12px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .leftTabBox {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .leftTabItem {
          width: 275px;
          height: 56px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 4px 4px 4px 4px;
          padding: 0 32px;
          box-sizing: border-box;
          cursor: pointer;
          h2,
          p {
            font-size: 16px;
            color: #666666;
            line-height: 22px;
          }
          div {
            display: flex;
            align-items: center;
            img {
              width: 12px;
              height: 12px;
              margin-left: 8px;
            }
            .rightIconed {
              display: none;
            }
          }
        }
        .leftTabItem.active {
          background: rgba(36, 70, 168, 0.05);
          h2 {
            color: #2446a8;
            font-weight: 600;
          }
          p {
            color: #2446a8;
          }
          .rightIcon {
            display: none;
          }
          .rightIconed {
            display: block;
          }
        }
      }
    }
  }
  .companyRight {
    width: 693px;
    height: 100%;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
  }
  .companyRight::-webkit-scrollbar {
    display: none;
  }
}

::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
::v-deep .el-dialog {
  width: 600px;
}
.dialog-content {
  position: relative;
  width: 100%;
  // height: 250px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  padding-bottom: 24px;
  .title {
    position: relative;
    padding: 24px 24px 24px 24px;
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #222222;
      display: flex;
      align-items: flex-end;
      span {
        font-size: 14px;
        color: #999999;
      }
    }
    .close-btn {
      position: absolute;
      top: 24px;
      right: 22px;
    }
  }
  .conBox {
    padding: 0 24px;
    p {
      margin-bottom: 30px;
      text-align: left;
      // font-size: 20px;
      color: #333;
    }
    .btnBox {
      display: flex;
      justify-content: flex-end;
      margin-top: 48px;
      .save {
        width: 100px;
        height: 40px;
        background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
        border-radius: 4px 4px 4px 4px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
