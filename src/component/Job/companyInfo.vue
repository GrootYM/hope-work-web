<template>
  <div class="main">
    <div class="companyAbout">
      <div class="hotBox mt20">
        <div class="hotTitleBox">
          <h2>热招职位</h2>
          <div @click="toCompanyAllJob">
            <p>查看全部{{ hotJobNum }}个职位</p>
            <img src="@/assets/image/job/right.png" alt="" />
          </div>
        </div>
        <div class="hotCon mt20">
          <div class="hotItem" @click.stop="toInfo(item)" v-for="(item, index) in hotJobs" :key="index">
            <div class="hotTop">
              <p>{{ item.positionName }}</p>
              <p class="red">{{ item.lowSalary }}-{{ item.topSalary }}k</p>
            </div>
            <div class="hotBottom">
              <p @click.stop="toCompany(item)">
                <img src="@/assets/image/job/companyIcon.png" alt="" />
                {{ item.companyName }}
              </p>
              <p>{{ item.cityName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="companyIntroBox">
        <div class="companyIntroLeft">
          <div class="introBox">
            <div class="titleBox">
              <h2>公司介绍</h2>
              <!-- <div class="titleRight">
                <p>
                  <img src="@/assets/image/job/wxIcon.png" alt="" />
                  微信扫码分享
                </p>
                <p>
                  <img src="@/assets/image/job/jbIcon.png" alt="" />
                  举报
                </p>
              </div> -->
            </div>
            <p>{{ company.introduce }}</p>
          </div>
          <div class="businessBox">
            <div class="titleBox">
              <h2>工商信息</h2>
            </div>
            <div class="businessCon">
              <div class="businessConT">
                <div class="businessItem businessItem1">
                  <div>
                    <h2>公司名称</h2>
                    <p>{{ company.companyName }}</p>
                  </div>
                  <div>
                    <h2>企业类型</h2>
                    <p>{{ company.companyType }}</p>
                  </div>
                </div>
                <div class="businessItem businessItem2">
                  <div>
                    <h2>法定代表人</h2>
                    <p>{{ company.legalUser }}</p>
                  </div>
                  <div>
                    <h2>经营状态</h2>
                    <p>{{ company.businessStatus }}</p>
                  </div>
                </div>
                <div class="businessItem businessItem3">
                  <div>
                    <h2>成立日期</h2>
                    <p>{{ company.establishTime }}</p>
                  </div>
                  <div>
                    <h2>注册资金</h2>
                    <p>{{ company.registeredCapital }}万</p>
                  </div>
                </div>
              </div>
              <div class="businessMore" v-if="isMore">
                <div class="businessItem businessItem1">
                  <div>
                    <h2>注册地址</h2>
                    <p>{{ company.registerAddress }}</p>
                  </div>
                  <div>
                    <h2>统一社会信用代码</h2>
                    <p>{{ company.companyCode }}</p>
                  </div>
                  <div>
                    <h2>曾用名</h2>
                    <p>{{ company.formerName ? company.formerName : '-' }}</p>
                  </div>
                  <div>
                    <h2>登记机关</h2>
                    <p>{{ company.registerOrgan }}</p>
                  </div>
                  <div>
                    <h2>所属行业</h2>
                    <p>{{ company.industryName }}</p>
                  </div>
                  <div class="allW">
                    <h2>经营范围</h2>
                    <p>{{ company.mainBusiness }}</p>
                  </div>
                </div>
                <div class="businessItem businessItem2">
                  <div>
                    <h2>营业期限</h2>
                    <p>{{ company.closeTime }}</p>
                  </div>
                  <div>
                    <h2>核准日期</h2>
                    <p>{{ company.approveTime }}</p>
                  </div>
                </div>
                <div class="businessItem businessItem3">
                  <div>
                    <h2>所属地区</h2>
                    <p>{{ company.cityName }}</p>
                  </div>
                </div>
              </div>
              <div class="moreBox" @click.stop="showMore">
                <p>{{ isMore ? '收起' : '查看更多' }}</p>
                <img v-if="isMore" src="@/assets/image/job/top.png" alt="" />
                <img v-if="!isMore" src="@/assets/image/job/bottom.png" alt="" />
              </div>
            </div>
          </div>

          <div class="locationBox">
            <div class="titleBox">
              <h2>公司地址</h2>
            </div>
            <div class="locationCon">
              <!-- <div class="locationItem">
                <div class="showMap">
                  <img src="@/assets/image/job/locationIcon.png" alt="" />
                  <p>{{ company.address }}</p>
                </div>
                <Map v-if="position[0]" :position="position" />
              </div> -->
              <div class="locationItem" v-for="(item, index) in addressList" :key="index">
                <div :class="[mapIndex == index ? 'showMap' : '']" @click="chooseAddress(index)">
                  <img src="@/assets/image/job/locationIcon.png" alt="" />
                  <p>{{ item.completeAddress }}</p>
                </div>
                <Map v-if="mapIndex == index" :position="item.position" />
              </div>
            </div>
          </div>

          <div class="recommendBox">
            <div class="tabBox">
              <div
                @click="toCheckTab(index)"
                :class="['tabItem', tabActive == index ? 'active' : '']"
                v-for="(item, index) in tabArr"
                :key="index"
              >
                <p>{{ item.name }}</p>
              </div>
              <!-- <div :class="['tabItem', recommendActive == 1 ? 'active' : '']">
                <p>推荐公司</p>
              </div>
              <div :class="['tabItem', recommendActive == 2 ? 'active' : '']">
                <p>城市招聘</p>
              </div>
              <div :class="['tabItem', recommendActive == 3 ? 'active' : '']">
                <p>热门职位</p>
              </div>
              <div :class="['tabItem', recommendActive == 4 ? 'active' : '']">
                <p>热门企业</p>
              </div> -->
            </div>
            <div class="recommendCon">
              <div class="recommendItem" v-for="(item, index) in recommendArr" :key="index">
                <p>{{ item.name || item.industryName || item.companyName }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="companyIntroRight">
          <div class="workTimeBox">
            <div class="lookTitle">
              <img class="bj" src="@/assets/image/job/lookTitleBj.png" alt="" />
              <h2>工作时间及福利</h2>
            </div>
            <div class="workTimeCon">
              <div class="workTimeItem">
                <img src="@/assets/image/job/icon3.png" alt="" />
                <p>{{ company.startTime }}-{{ company.endTime }}</p>
              </div>
              <div class="workTimeItem">
                <img src="@/assets/image/job/icon4.png" alt="" />
                <p>
                  <span v-for="(item, index) in company.holsTypeName" :key="index">{{
                    item + (index == company.holsTypeName.length - 1 ? '' : '、')
                  }}</span>
                </p>
              </div>
              <div class="welfareBox">
                <div class="welfareItem" v-for="(item, index) in company.benefitsName" :key="index">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bossBox">
            <div class="lookTitle">
              <img class="bj" src="@/assets/image/job/lookTitleBj.png" alt="" />
              <h2>{{ company.companyName }}招聘Boss</h2>
            </div>
            <div class="bossCon">
              <div class="bossItem" @click.stop="toCompany(1)" v-for="(item, index) in company.bossList" :key="index">
                <img :src="item.headImg" alt="" />
                <div class="bossInfo">
                  <div class="">
                    <h2>{{ item.userName }}</h2>
                    <p>{{ item.roleName }}</p>
                  </div>
                  <p>
                    招聘中 <span>{{ item.positionName }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="moreJob" @click.stop="toCompanyAllJob">
              <p>查看全部职位</p>
            </div>
          </div>
          <div class="adBox">
            <div class="adItem" v-for="(item, index) in adArr" :key="index" @click="bannerJump(item)">
              <img :src="item.imgUrl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-hidden">
      <el-amap
        ref="map"
        :vid="'hiddenMap'"
        class="amap-demo"
        style="height: 500px; width: 800px"
        :plugin="plugin"
        :events="events"
      >
      </el-amap>
    </div>
  </div>
</template>
<script>
import Job from '@/api/job'
import CompanyAuth from '@/api/enterprise/auth'
import Home from '@/api/home'
import Map from '@/component/Job/map'
export default {
  components: {
    Map,
  },
  props: {
    id: String,
    company: Object,
  },
  data() {
    let self = this
    return {
      position: [],
      adArr: [],
      tabActive: 0,
      tabArr: [
        {
          name: '热门城市',
        },
        {
          name: '热门行业',
        },
        {
          name: '热门企业',
        },
      ],
      recommendArr: [],
      mapIndex: 0,
      locations: [
        {
          name: '南京雨花台区南京天溯科技园1层',
          map: require('@/assets/image/job/map.png'),
        },
        {
          name: '上海黄浦区都市总部大楼',
          map: require('@/assets/image/job/map.png'),
        },
        {
          name: '广州番禺区恒峰大厦地铁7号线员岗站(C出口)',
          map: require('@/assets/image/job/map.png'),
        },
      ],
      // company: {},
      hotJobNum: 0,
      hotJobs: [],
      tabActive: 1,
      isMore: false,
      searchPlugin: null,
      center: [121.5273285, 31.21515044], // 地图中心
      events: {
        init(o) {}, // 地图事件
      },
      plugin: [
        {
          pName: 'PlaceSearch',
          events: {
            init(instance) {
              // 实例化高德地图的PlaceSearch插件
              self.searchPlugin = instance
            },
          },
        },
      ],
      addressList: [],
    }
  },
  mounted() {
    // this.queryCompanyInfoByPerson();
    console.log(this.company)
    this.position.push(this.company.longitude - 0)
    this.position.push(this.company.latitude - 0)
    this.queryCompanyPositionByComId()
    this.getRecommend()
    this.getBannerList()
    this.getAddress()
  },
  methods: {
    chooseAddress(index) {
      this.mapIndex = index
    },
    async getAddress() {
      let res = await CompanyAuth.queryAddrList({ companyId: this.company.id })
      this.addressList = res.data.list
      this.setAddressJw()
    },
    setAddressJw() {
      let addressList = []
      this.addressList.forEach(item => {
        let obj = { ...item }
        this.searchPlugin.search(item.completeAddress, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (!result.poiList.pois.length) {
              // _this.$message.error('未查询到该地址，请重新选择')
            } else {
              let lng = result.poiList.pois[0].location.lng
              let lat = result.poiList.pois[0].location.lat
              obj.longitude = lng
              obj.latitude = lat
              let position = []
              position.push(lng - 0)
              position.push(lat - 0)
              obj.position = position
              console.log('经纬度：', lng, lat)
              addressList.push(obj)
            }
          } else {
            // _this.$message.error('未查询到该地址，请重新选择')
          }
        })
      })
      this.addressList = addressList
    },
    showMore() {
      this.isMore = !this.isMore
    },
    // async queryCompanyInfoByPerson(){
    //   let params = {
    //     id:this.id||''
    //   }
    //   let res = await Job.queryCompanyInfoByPerson(params)
    //   if (res.code == 200) {
    //     this.company = res.data;
    //   }
    // },
    async getBannerList() {
      let params = {
        bannerCode: 'position_info',
      }
      let res = await Home.getBannerList(params)
      if (res.code == 200) {
        this.adArr = res.data
      }
    },
    bannerJump(banner) {
      this.$util.jumpLink(banner.type, banner.jumpUrl)
    },
    toCompany(item) {
      if (item != 1) {
        const { href } = this.$router.resolve({
          path: '/index/company',
          query: { id: item.companyId },
        })
        window.open(href, '_blank')
        // this.$router.replace({ path: '/index/company', query: { id: item.companyId } })
      } else {
        const { href } = this.$router.resolve({
          path: '/index/company',
          query: { id: this.company.id },
        })
        window.open(href, '_blank')
        // this.$router.replace({ path: '/index/company', query: { id: this.company.id } })
      }
    },
    toCompanyAllJob() {
      // this.$router.replace({ path: '/index/company', query: { id: this.company.id, tabId: 2 } })
      this.$emit('changeTab', 2)
    },
    toInfo(item) {
      const { href } = this.$router.resolve({
        path: '/index/info',
        query: { id: item.id },
      })
      window.open(href, '_blank')
      // this.$router.push({ path: '/index/info', query: { id: item.id } })
    },
    async queryCompanyPositionByComId() {
      let params = {
        companyId: this.company.id,
        currentPage: 1,
        pageSize: 3,
      }
      let res = await Job.queryCompanyPositionByComId(params)
      if (res.code == 200) {
        this.hotJobs = res.data.list
        this.hotJobNum = res.data.total
      }
    },
    toCheckTab(index) {
      if (index == this.tabActive) {
        return
      }
      this.tabActive = index
      this.getRecommend()
    },
    getRecommend() {
      switch (this.tabActive) {
        case 0:
          this.queryHotCityList()
          break
        case 1:
          this.queryHotIndustryType()
          break
        case 2:
          this.queryHotCompanyList()
          break
        default:
          break
      }
    },
    async queryHotCityList() {
      let params = {}
      let res = await Job.queryHotCityList(params)
      if (res.code == 200) {
        this.recommendArr = res.data
      }
    },
    async queryHotIndustryType() {
      let params = {}
      let res = await Job.queryHotIndustryType(params)
      if (res.code == 200) {
        this.recommendArr = res.data
      }
    },
    async queryHotCompanyList() {
      let params = {
        currentPage: 1,
        pageSize: 10,
      }
      let res = await Job.queryHotCompanyList(params)
      if (res.code == 200) {
        this.recommendArr = res.data.list
      }
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
    background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  }
  .companyBox {
    width: 100%;
    height: 188px;
    background: #293b60;
    .companyCon {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .companyLeft {
        display: flex;
        img {
          width: 72px;
          height: 72px;
          border-radius: 4px 4px 4px 4px;
          margin-right: 24px;
          border: 1px solid rgba(36, 70, 168, 0.1);
          box-sizing: border-box;
        }
        .companyInfo {
          h2 {
            font-size: 32px;
            color: #ffffff;
            line-height: 45px;
            text-align: left;
          }
          .cardLabel {
            color: rgba(255, 255, 255, 0.65);
            margin-top: 7px;
          }
        }
      }
      .companyRight {
        .jobAbout {
          display: flex;
          font-size: 16px;
          color: #ffffff;
          line-height: 23px;
          p {
            margin-left: 32px;
          }
          span {
            font-size: 46px;
            line-height: 67px;
            margin-right: 8px;
          }
        }
      }
      .vitaAbout {
        position: absolute;
        right: 0;
        bottom: 24px;
        display: flex;
        div {
          display: flex;
          align-items: flex-end;
          margin-left: 24px;
          color: #5cc5fc;
          font-size: 16px;
          line-height: 22px;
          img {
            width: 22px;
            height: 22px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .companyAbout {
    width: 1200px;
    margin: 0 auto;
    margin-top: 16px;
    .hotBox {
      background: #fff;
      height: 187px;
      border-radius: 4px;
      padding: 24px 32px;
      box-sizing: border-box;
      .hotTitleBox {
        display: flex;
        justify-content: space-between;
        h2 {
          font-size: 18px;
          color: #222222;
          font-weight: 600;
        }
        div {
          color: #2446a8;
          font-size: 16px;
          display: flex;
          align-items: center;
          img {
            width: 12px;
            height: 12px;
            margin-left: 4px;
          }
        }
      }
      .hotCon {
        margin-top: 20px;
        display: flex;
        //justify-content: space-between;
        .hotItem {
          width: 363px;
          height: 94px;
          background: #ffffff;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid rgba(36, 70, 168, 0.1);
          padding: 16px;
          box-sizing: border-box;
          cursor: pointer;
          margin-right: 23px;
          .hotTop {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
            .red {
              font-weight: 400;
              color: #f44335;
            }
          }
          .hotBottom {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #666666;
            line-height: 20px;
            margin-top: 18px;
            p {
              display: flex;
              align-items: center;
            }
            img {
              width: 22px;
              height: 22px;
              margin-right: 6px;
            }
          }
        }
        .hotItem:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .companyIntroBox {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      .companyIntroLeft {
        width: 884px;
        border-radius: 4px 4px 4px 4px;
        background: #ffffff;
        padding: 24px 32px;
        box-sizing: border-box;
        .titleBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          h2 {
            font-size: 18px;
            color: #222222;
            line-height: 25px;
            font-weight: 600;
          }
          .titleRight {
            display: flex;
            font-size: 14px;
            color: #666666;
            line-height: 20px;
            p {
              margin-left: 24px;
              display: flex;
              align-items: center;
            }
            img {
              width: 16px;
              height: 16px;
              margin-right: 4px;
            }
          }
        }
        .introBox {
          > p {
            font-size: 15px;
            color: #222222;
            line-height: 28px;
          }
        }
        .businessBox {
          margin-top: 20px;
          .businessCon {
            width: 820px;
            // height: 258px;
            background: #f8f8f8;
            border-radius: 2px 2px 2px 2px;
            font-size: 14px;
            line-height: 28px;
            color: #333333;
            padding: 24px 24px 74px 24px;
            box-sizing: border-box;
            // display: flex;
            position: relative;
            .businessItem {
              text-align: left;
              > div {
                margin-bottom: 32px;
              }
              h2 {
                margin-bottom: 8px;
                color: #999999;
              }
              .allW {
                width: 772px;
                margin-bottom: 0;
              }
            }
            // > div {
            //   > div:first-child {
            //     margin-bottom: 32px;
            //   }
            //   h2 {
            //     margin-bottom: 8px;
            //     color: #999999;
            //   }
            // }
            .businessConT {
              .businessItem {
                > div:last-child {
                  margin-bottom: 0;
                }
              }
            }
            .businessMore {
              margin-top: 32px;
            }
            .businessConT,
            .businessMore {
              display: flex;
            }
            .businessItem1 {
              width: 321px;
            }
            .businessItem2 {
              width: 185px;
              margin: 0 8px;
            }
            .businessItem3 {
              width: 185px;
            }
            .moreBox {
              width: 100px;
              position: absolute;
              bottom: 24px;
              left: 50%;
              margin-left: -50px;
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #2446a8;
              line-height: 20px;
              cursor: pointer;
              img {
                width: 8px;
                height: auto;
                margin-left: 7px;
              }
            }
          }
        }
        .locationBox {
          margin-top: 20px;
          .locationCon {
            width: 100%;
            border-radius: 2px 2px 0px 0px;
            border: 1px solid rgba(36, 70, 168, 0.1);
            .locationItem {
              cursor: pointer;
              > div {
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #333333;
                line-height: 22px;
                padding: 10px 0;
                margin: 0 16px;
                border-bottom: 1px dashed #e8ebf0;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                }
              }

              .showMap {
                border-bottom: none;
              }
              > img {
                width: 100%;
                height: 248px;
              }
            }
            .locationItem:last-child > div {
              border-bottom: none;
            }
          }
        }
        .recommendBox {
          width: 100%;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          padding: 20px 0;
          box-sizing: border-box;
          margin-top: 20px;
          .tabBox {
            height: auto;
            border-bottom: 1px solid #d5dff0;
            padding: 0;
            .tabItem {
              font-size: 14px;
              line-height: 20px;
              p {
                padding-bottom: 15px;
              }
            }
            .tabItem.active::after {
              bottom: 0px;
            }
          }
          .recommendCon {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            .recommendItem {
              font-size: 14px;
              color: #666666;
              line-height: 20px;
              margin: 12px 32px 12px 0;
            }
          }
        }
      }
      .companyIntroRight {
        width: 284px;
        .workTimeBox {
          height: 230px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          .workTimeCon {
            margin-top: 10px;
            padding: 0 24px;
            .workTimeItem {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #3d3d3d;
              line-height: 20px;
              margin-top: 16px;
              img {
                width: 16px;
                height: 16px;
                margin-right: 8px;
              }
            }
            .welfareBox {
              margin-top: 16px;
              flex-wrap: wrap;
              .welfareItem {
                margin-bottom: 8px;
              }
              .welfareItem:nth-child(3n) {
                margin-right: 0;
              }
            }
          }
        }
        .bossBox {
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          margin-top: 16px;
          padding-bottom: 24px;
          .bossCon {
            padding: 0 24px;
            margin-top: 20px;
            .bossItem {
              margin-bottom: 25px;
              display: flex;
              align-items: flex-start;
              cursor: pointer;
              img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 10px;
              }
              .bossInfo {
                div {
                  display: flex;
                  align-items: center;
                  h2 {
                    font-size: 16px;
                    color: #3d3d3d;
                    line-height: 22px;
                    padding-right: 8px;
                    position: relative;
                  }
                  h2::after {
                    content: '';
                    display: block;
                    width: 1px;
                    height: 12px;
                    background: #dadde2;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -6px;
                  }
                  p {
                    font-size: 14px;
                    color: #666666;
                    line-height: 20px;
                    margin-left: 8px;
                  }
                }
                > p {
                  font-size: 12px;
                  color: #666666;
                  line-height: 17px;
                  margin-top: 4px;
                  text-align: left;
                  span {
                    margin-left: 8px;
                  }
                }
              }
            }
          }
          .moreJob {
            width: 152px;
            height: 36px;
            border-radius: 4px 4px 4px 4px;
            border: 1px solid #2446a8;
            font-size: 14px;
            color: #2446a8;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            margin-top: 7px;
          }
        }
      }
    }
  }
}

.map-hidden {
  display: none;
}
</style>
