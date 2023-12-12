<template>
  <div class="appBox">
    <div class="top-banner">
      <img src="@/assets/image/about/top-banner1.png" />
    </div>
    <div class="jobBox">
      <!-- 搜索框 -->
      <div class="searchJobBtnBox">
        <div class="searchComBox">
          <JobSearch
            :location="location"
            :searchStr="searchStr"
            :hotCity="csArr"
            @change="changeLocation($event)"
            @changeV="changeVal($event)"
            @search="toJob(1)"
          />
        </div>
        <!-- <div class="searchJobBox">
          <div class="selBox">
            <p>{{ location }}</p>
            <div class="selIcon">
              <img src="@/assets/image/job/selIcon.png" alt="" />
            </div>
          </div>
          <div class="searchBox">
            <img src="@/assets/image/job/searchIcon.png" alt="" />
            <input type="text" v-model="searchStr" placeholder="搜索职位/公司/关键词" />
          </div>
          <button>搜索</button>
        </div> -->
      </div>
      <!-- 热门职位 -->
      <div class="hotJobBox">
        <p class="label">热门职位：</p>
        <div class="hotJob">
          <div class="hotJobItem" @click="clickHotHob(item)" v-for="(item, index) in hotJobs" :key="index">
            <p>{{ item.typeName }}</p>
          </div>
        </div>
      </div>
      <!-- 筛选条件 -->
      <!-- <div class="filterBox">
        <div class="filterItem" v-for="(item, index) in filterTerms" :key="index">
          <div class="filterCon">
            <h2>{{ item.name }}</h2>
            <div class="termBox">
              <div class="termItem" v-for="(item1, index1) in item.terms" :key="index1">
                <p v-if="item.type != 'select'" :class="[item1.name == selectCity ? 'active' : '']">{{ item1.name }}</p>
                <div v-if="item.type == 'select'" class="select">
                  <p>{{ item1.name }}</p>
                  <img src="@/assets/image/job/selIcon.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.type == 'city' && selectCity" class="areaBox">
            <p v-for="(item2, index2) in areas" :key="index2">{{ item2.name }}</p>
          </div>
        </div>
      </div> -->
    </div>

    <div class="main">
      <div class="isBackground">
        <!-- 内容盒子 -->
        <div class="box">
          <div class="top">
            <!-- 大家都在看 -->
            <div class="everyLook">
              <div class="everyLook_a">
                <div class="eyes">
                  <div class="eye">
                    <img src="@/assets/image/returnee/eye.png" alt="" />
                  </div>
                  <div class="isTitle">
                    <span>大家都在看</span>
                  </div>
                </div>
                <div class="line"></div>
                <div class="detail">
                  <div class="type-item" v-for="(item, index) in jobClass" :key="item.pid" @mouseover="showSide(index)">
                    <div class="type-name">{{ item.pname }}</div>
                    <a v-if="item.childLists.length && item.childLists.length > 0">{{ item.childLists[0].typeName }}</a>
                    <a v-if="item.childLists.length && item.childLists.length > 1">{{ item.childLists[1].typeName }}</a>
                    <a v-if="item.childLists.length && item.childLists.length > 2">{{ item.childLists[2].typeName }}</a>
                    <img src="@/assets/image/home/cat-arrow.png" class="type-arrow" />
                  </div>
                </div>
              </div>
            </div>
            <div class="dropdown-child" v-show="sideVisible" @mouseenter="sideVisible = true" @mouseleave="hideSide">
              <div class="title">{{ nowPosition.pname }}</div>
              <div class="child-item" v-for="(item, index) in nowPosition.childLists" :key="index">
                <div class="type-name">{{ item.typeName }}</div>
                <div class="children">
                  <a
                    href="javascript:void(0)"
                    v-for="(child, i) in item.subChildLists"
                    :key="i"
                    @click.stop.prevent="gotoJob(child.subTypeName)"
                  >
                    {{ child.subTypeName }}
                  </a>
                </div>
              </div>
            </div>
            <div class="pic" @click="toVideo()">
              <img :src="poster.imgUrl" alt="" />
            </div>
          </div>
          <!-- 热门职位标题 -->
          <div class="onetitle">
            <p>热门职位</p>
          </div>
          <div class="hotWork">
            <!-- 热门职位选择 -->
            <div class="typeWork">
              <div class="hwork">
                <div
                  v-for="(item, index) in hWork"
                  :key="item.id"
                  class="h_list"
                  :class="{ changeColor: i1 === index }"
                  @click="changeColor(index, item.id)"
                >
                  {{ item.typeName }}
                </div>
              </div>
            </div>
            <!-- 热门职位详情 -->
            <div class="workAccommodation">
              <div class="wAccommodation" v-for="(item, index) in jopInfo" :key="index">
                <div class="accommodation_a" @click.stop="toInfo(item)">
                  <div class="company">
                    <div class="top">
                      <div class="position">{{ item.positionName }}</div>
                      <div class="pay" v-if="item.lowSalary">{{ item.lowSalary }}-{{ item.topSalary }}K</div>
                    </div>
                    <div class="bottom">
                      <div class="cardItems">
                        <div class="cardItem" v-if="item.cityName">
                          {{ item.cityName }}
                          <p>|</p>
                        </div>
                        <div class="cardItem" v-if="item.experience">
                          {{ item.experience }}
                          <p>|</p>
                        </div>
                        <div class="cardItem" v-if="item.education">
                          {{ item.education }}
                          <p>|</p>
                        </div>
                        <div class="cardItem" v-if="item.roleName">
                          {{ item.roleName }}
                          <p>|</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="companyIntroduction">
                    <div class="companyPic"><img :src="item.headUrl" alt="" /></div>
                    <div class="companyRight">
                      <div class="companyName">{{ item.companyName }}</div>
                      <div class="companySituation">
                        <div class="L_companySituation" v-if="item.companyIndustryName">
                          {{ item.companyIndustryName }}
                          <p>|</p>
                        </div>
                        <div class="L_companySituation" v-if="item.companyScale">
                          {{ item.companyScale }}
                          <p>|</p>
                        </div>
                        <div class="L_companySituation" v-if="item.finance">
                          {{ item.finance }}
                          <p>|</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="morebox">
            <el-button class="more" @click="toMore('info')"><p>查看更多</p></el-button>
          </div>

          <!-- 热门企业标题 -->
          <div class="onetitle">
            <p>热门企业</p>
          </div>
          <div class="hotCity">
            <div class="cityAccommodation">
              <div class="cAccommodation" v-for="(item, index) in cAccommodation" :key="index">
                <div class="cAccommodation_a" @click.stop="toCompay(item)">
                  <div class="cityWork">
                    <div class="wImg"><img :src="item.headUrl" alt="" /></div>
                    <div class="imgRight">
                      <div class="cityCompany">{{ item.companyName }}</div>
                      <div class="wInformation">
                        <div class="wInformation_a" v-if="item.industryName">
                          {{ item.industryName }}
                          <p>|</p>
                        </div>
                        <div class="wInformation_a" v-if="item.finance">
                          {{ item.finance }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="cityBottom">
                    <div class="number">{{ item.positionNum }}</div>
                    <div class="numberBottom">个热招职位</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="morebox">
              <el-button class="more" @click="toMore('info')"><p>查看更多</p></el-button>
            </div>
          </div>
          <!-- 短期实习标题 -->
          <div class="onetitle">
            <p>短期实习</p>
          </div>
          <div class="hotWork">
            <!-- 短期实习选择 -->

            <div class="typeWork">
              <div class="hwork">
                <div
                  v-for="(list, index) in hWorks"
                  :key="index"
                  class="h_list"
                  :class="{ changeColorB: i2 === index }"
                  @click="changeColorB(index, list.id)"
                >
                  {{ list.typeName }}
                </div>
              </div>
            </div>
            <!-- 短期实习详情 -->
            <div class="workAccommodation">
              <div class="wAccommodation" v-for="(item, index) in practiceJop" :key="index">
                <div class="accommodation_a" @click.stop="toInfo(item)">
                  <div class="company">
                    <div class="top">
                      <div class="position">{{ item.positionName }}</div>
                      <div class="pay" v-if="item.lowSalary">
                        {{ item.lowSalary }}-{{ item.topSalary }}K
                        <p v-if="item.yearSalary"><span>.</span>{{ item.yearSalary }}薪</p>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="cardItems">
                        <div class="cardItem" v-if="item.cityName">
                          {{ item.cityName }}
                          <p>|</p>
                        </div>
                        <div class="cardItem" v-if="item.experience">
                          {{ item.experience }}
                          <p>|</p>
                        </div>
                        <div class="cardItem" v-if="item.education">
                          {{ item.education }}
                          <p>|</p>
                        </div>
                        <div class="cardItem" v-if="item.roleName !== null">
                          {{ item.roleName }}
                          <p>|</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="line"></div>
                  <div class="companyIntroduction">
                    <div class="companyPic"><img :src="item.headUrl" alt="" /></div>
                    <div class="companyRight">
                      <div class="companyName">{{ item.companyName }}</div>
                      <div class="companySituation">
                        <div class="L_companySituation" v-if="item.companyIndustryName !== null">
                          {{ item.companyIndustryName }}
                          <p>|</p>
                        </div>
                        <div class="L_companySituation" v-if="item.companyScale !== null">
                          {{ item.companyScale }}
                          <p>|</p>
                        </div>
                        <div class="L_companySituation" v-if="item.finance !== null">
                          {{ item.finance }}
                          <p>|</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="morebox">
            <el-button class="more" id="more" @click="toMore('info')"><p>查看更多</p></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import Search from '@/component/index/Search.vue'
import Work from '@/component/index/Work.vue'
import Company from '@/component/index/Company.vue'
import JobSearch from '@/component/returnee/jobSearch'
import returnees from '@/api/returnees'
import Home from '@/api/home'
import Job from '@/api/job'
import Util from '@/util/index'
export default {
  components: {
    Search,
    Work,
    Company,
    JobSearch,
  },
  data() {
    return {
      searchStr: '',
      location: '',
      csArr: [],
      hotJobs: [],
      poster: {},
      jobClass: [],
      hWork: [],
      hWorks: [],
      jopInfo: [],
      nowPosition: {},
      sideVisible: false,
      cAccommodation: [],
      practiceJop: [],
      i1: 0,
      i2: 0,
    }
  },
  computed: {
    ...mapGetters(['cityName']),
  },
  created() {
    this.queryHotCityList()
    this.getQueryHotCompanyList()
    this.getBannerList()
    this.getPositionType()
    this.getQueryHotPositionFirstType()
    this.getQueryHotPositionFirstTypeB()
    this.getQueryHotPositionByTypeList()
    this.getHotPositionType()
    this.getQueryPracticePositionList()
    this.location = this.cityName
  },
  methods: {
    // 跳转视频列表
    toVideo() {
      if (this.poster.type == 3) {
        console.log('打开全部网站', this.poster)
        if (this.poster.jumpUrl.indexOf('http') === -1) {
          window.open(`http://${this.poster.jumpUrl}`, '_blank')
          console.log('打开外部网站')
          return
        } else {
          window.open(this.poster.jumpUrl, '_blank')
          return
        }
      } else if (this.poster.type == 1) {
        window.App.$router.push({ path: this.poster.jumpUrl })
        console.log('打开内部网站', this.poster)
        return
      }
    },
    // 跳转职位信息
    toInfo(item) {
      const { href } = this.$router.resolve({
        path: '/index/info',
        query: { id: item.id },
      })
      window.open(href, '_blank')
      // this.$router.push({ path: '/index/info', query: { id: item.id } })
    },
    // 跳转公司信息
    toCompay(item) {
      const { href } = this.$router.resolve({
        path: '/index/company',
        query: { id: item.id },
      })
      window.open(href, '_blank')
      // this.$router.push({ path: '/index/company', query: { id: item.id } })
    },
    // 点击改变颜色
    async changeColor(index, id) {
      this.i1 = index
      this.jopInfo = []
      let params = { positionFirstTypeId: id, recruitType: 3, currentPage: 1, pageSize: 9 }
      let res = await returnees.getQueryHotPositionByTypeList(params)
      this.jopInfo = res.data.list
    },
    // 实习切换Tab
    async changeColorB(index, id) {
      this.i1 = index
      this.practiceJop = []
      let params = { positionFirstTypeId: id, currentPage: 1, pageSize: 9 }
      let res = await returnees.getQueryPracticePositionList(params)
      this.practiceJop = res.data.list
    },
    // 热门职位跳转
    clickHotHob(item) {
      this.searchStr = item.typeName
      this.$router.push({ path: '/index/job', query: { cityName: this.location, keyWords: item.typeName } })
    },
    //分类菜单跳转
    gotoJob(kw) {
      this.$router.push({ path: '/index/job', query: { keyWords: kw } })
    },
    //搜索栏方法
    changeLocation(value) {
      this.location = value
    },
    changeVal(value) {
      this.searchStr = value
    },
    toJob(type, item) {
      if (type == 1) {
        this.$router.push({ path: '/index/job', query: { cityName: this.location, keyWords: this.searchStr } })
      } else {
        this.$router.push({ path: '/index/job', query: { jobTypeId: item.subId } })
      }
    },
    showSide(index) {
      this.nowPosition = this.jobClass[index]
      this.sideVisible = true
    },
    hideSide() {
      this.sideVisible = false
      this.nowPosition = {}
    },
    //查看更多按钮点击
    toMore(flag) {
      switch (flag) {
        case 'job':
          this.$router.push({
            path: '/index/job',
          })
          this.eventBus.$emit('changeTab', '2')
          break
        case 'company':
          this.$router.push({
            path: '/index/job',
          })
          this.eventBus.$emit('changeTab', '2')
          break
        case 'info':
          this.$router.push({
            path: '/index/job',
          })
          this.eventBus.$emit('changeTab', '2')
          break
        default:
          break
      }
    },

    //海归搜索框城市
    async queryHotCityList() {
      let params = {}
      let res = await Job.queryHotCityList(params)
      if (res.code == 200) {
        this.csArr = res.data
      }
    },

    //海归职位搜索下拉列表
    async getPositionType() {
      let params = {}
      let res = await returnees.getPositionType(params)
      if (res.code == 200) {
        this.jobClass = res.data
      }
    },
    //海报方法
    // async getBannerList() {
    //   let params = { bannerCode: 'index' }
    //   let res = await returnees.getBannerList(params)
    //   if (res.code == 200) {
    //     this.poster = res.data[0]
    //   }
    // },
    async getBannerList() {
      let params = { bannerCode: 'returnees' }
      let res = await Home.getBannerList(params)
      if (res.code == 200) {
        this.poster = res.data[0]
        console.log(this.poster, '11111111111111111111111')
      }
    },
    // 海归热门职位标签列表方法
    async getHotPositionType() {
      let params = {}
      let res = await returnees.getHotPositionType(params)
      if (res.code == 200) {
        this.hotJobs = res.data
      }
    },
    //海归职位搜索/岗位类型点击搜索接口
    async getPositonSearch() {
      let params = {}
      let res = await returnees.getPositonSearch(params)
      if (res.code == 200) {
        // this.h_work = res.data
      }
    },
    // 海归-热门职位一级标签
    async getQueryHotPositionFirstType() {
      let params = {}
      let res = await returnees.getQueryHotPositionFirstType(params)
      if (res.code == 200) {
        let obj = { id: null, typeName: '不限' }
        this.hWork = res.data
        this.hWork.unshift(obj)
      }
      console.log(res.data, '我是热门职位一级标签')
    },
    // 海归-实习职位一级标签
    async getQueryHotPositionFirstTypeB() {
      let params = {}
      let res = await returnees.getQueryHotPositionFirstType(params)
      if (res.code == 200) {
        let obj = { id: null, typeName: '不限' }
        this.hWorks = res.data
        this.hWorks.unshift(obj)
      }
      console.log(res.data, '我是实习职位一级标签')
    },
    // 获取热门职位方法
    async getQueryHotPositionByTypeList() {
      let params = { positionFirstTypeId: null, recruitType: 3, currentPage: 1, pageSize: 9 }
      let res = await returnees.getQueryHotPositionByTypeList(params)
      if (res.code == 200) {
        this.jopInfo = res.data.list
      }
    },
    // 获取热门公司方法
    async getQueryHotCompanyList() {
      let params = {
        currentPage: 1,
        pageSize: 12,
      }
      let res = await returnees.getQueryHotCompanyList(params)
      if (res.code == 200) {
        console.log(res.data)
        this.cAccommodation = res.data.list
      }
    },
    // 获取短期实习职位方法
    async getQueryPracticePositionList() {
      let params = {}
      let res = await returnees.getQueryPracticePositionList(params)
      if (res.code == 200) {
        this.practiceJop = res.data.list
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

.appBox {
  // min-width: $nx-width;
  .jobBox {
    width: 1200px;
    height: 199px;
    margin: 0 auto;
    background: #fff;
    padding: 48px 0px;
    box-sizing: border-box;
    .searchJobBtnBox {
      margin-left: 150px;
      display: flex;
      // .searchJobBox {
      //   display: flex;
      //   align-items: center;
      //   width: 900px;
      //   height: 48px;
      //   border-radius: 4px 4px 4px 4px;
      //   border: 1px solid rgba(36, 70, 168, 0.3);
      //   font-size: 16px;
      //   .selBox {
      //     width: 124px;
      //     height: 100%;
      //     position: relative;
      //     padding: 0 16px 0 24px;
      //     box-sizing: border-box;
      //     display: flex;
      //     align-items: center;
      //     justify-content: space-between;
      //     .selIcon img {
      //       width: 12px;
      //       height: 12px;
      //     }
      //   }
      //   .selBox::after {
      //     content: '';
      //     width: 1px;
      //     height: 22px;
      //     background: #bec4d4;
      //     display: block;
      //     position: absolute;
      //     top: 13px;
      //     right: 0;
      //   }
      //   .searchBox {
      //     flex: 1;
      //     height: 100%;
      //     display: flex;
      //     align-items: center;
      //     padding-left: 16px;
      //     box-sizing: border-box;
      //     img {
      //       width: 12px;
      //       height: 12px;
      //     }
      //     input {
      //       flex: 1;
      //       height: 100%;
      //       padding-left: 6px;
      //     }
      //   }
      //   button {
      //     width: 122px;
      //     height: 44px;
      //     background: #2446a8;
      //     border-radius: 2px;
      //     color: #ffffff;
      //     font-size: 18px;
      //     margin-right: 1px;
      //   }
      // }
      .searchComBox {
        width: 900px;
      }
    }
    .hotJobBox {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #929ab0;
      padding: 32px 0;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      margin-left: 150px;
      .hotJob {
        display: flex;
        margin-left: 4px;
        .hotJobItem {
          margin: 0 12px;
          cursor: pointer;
        }
      }
    }
    // .filterBox {
    //   .filterItem {
    //     padding: 16px 0;
    //     font-size: 14px;
    //     border-bottom: 1px dotted #e8ebf0;
    //     .filterCon {
    //       display: flex;
    //       align-items: center;
    //       h2 {
    //         color: #222222;
    //       }
    //       .termBox {
    //         display: flex;
    //         .termItem {
    //           color: #333333;
    //           margin: 0 10px;
    //           .active {
    //             color: #2446a8;
    //           }
    //           .select {
    //             width: 96px;
    //             height: 32px;
    //             background: #f8f9fc;
    //             border-radius: 4px;
    //             padding: 0 12px;
    //             box-sizing: border-box;
    //             display: flex;
    //             align-items: center;
    //             justify-content: space-between;
    //             img {
    //               width: 10px;
    //               height: auto;
    //             }
    //           }
    //         }
    //       }
    //     }
    //     .areaBox {
    //       height: 40px;
    //       background: #f8f9fc;
    //       border-radius: 4px 4px 4px 4px;
    //       display: flex;
    //       align-items: center;
    //       margin-top: 16px;
    //       p {
    //         color: #333333;
    //         margin-right: 20px;
    //       }
    //     }
    //   }
    //   .filterItem:last-child {
    //     border-bottom: none;
    //   }
    // }
  }
  .main {
    background: url('~@/assets/image/returnee/bg.png');
    .isBackground {
      width: 100%;
      // height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      // margin-bottom: 72px;
      .box {
        width: 1184px;
        margin-top: 32px;
        .top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;
          .everyLook {
            width: 584px;
            height: 208px;
            border-radius: 4px;
            padding: 2px;
            box-sizing: border-box;
            background-color: white;
            .everyLook_a {
              width: 580px;
              height: 204px;
              background: linear-gradient(180deg, rgba(36, 70, 168, 0.1) 0%, rgba(36, 70, 168, 0) 60%);
              border-radius: 2px;
              .eyes {
                width: 544px;
                height: 52px;
                margin-left: 20px;
                display: flex;
                align-items: center;
                .eye {
                  width: 16px;
                  height: 16px;
                }
                .isTitle {
                  width: 70px;
                  height: 20px;
                  margin-left: 4px;
                  span {
                    font-size: 14px;
                    font-family: PingFang SC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #2446a8;
                    line-height: 20px;
                    -webkit-background-clip: text;
                  }
                }
              }
              .line {
                width: 544px;
                height: 0px;
                opacity: 1;
                border: 1px dashed rgba(215, 219, 226, 1);
                margin-left: 20px;
              }
              .detail {
                width: 544px;
                height: 156px;
                margin-left: 20px;
                border-radius: 4px 4px 4px 4px;
                opacity: 1;
                .type-item {
                  height: 35px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  &:hover {
                    color: $nx-color;
                    cursor: pointer;
                    // text-decoration: underline;
                  }
                  .type-name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333333;
                  }

                  a {
                    font-size: 14px;
                    color: #666666;
                    &:hover {
                      color: #2446a8;
                    }
                  }

                  .type-arrow {
                    width: 12px;
                    height: 12px;
                  }
                }
              }
            }
          }

          .pic {
            width: 584px;
            height: 208px;
            border-radius: 4px;
            opacity: 1;
            background-color: #ffffff;
            padding: 2px;
            box-sizing: border-box;
            img {
              width: 580px;
              height: 204px;
              border-radius: 2px;
            }
          }
        }
        .onetitle {
          margin-top: 70px;
          font-size: 32px;
          font-family: PingFang SC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 45px;
          -webkit-background-clip: text;
          p {
            width: 141px;
            height: 45px;
            font-weight: 600;
            letter-spacing: 3px;
            margin-left: -3px;
          }
        }
        .hotWork {
          width: 100%;
          height: auto;
          margin-top: 30px;
          .typeWork {
            width: 100%;
            height: 128px;
            background: #ffffff;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            box-sizing: border-box;
            padding-top: 32px;
            .hwork {
              width: 1150px;
              height: 64px;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              .h_list {
                height: 20px;
                min-width: 28px;
                font-size: 14px;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
                line-height: 20px;
                letter-spacing: 1px;
                -webkit-background-clip: text;
                margin-left: 32px;
                display: flex;
                &:hover {
                  color: $nx-color;
                  cursor: pointer;
                }
              }
              .changeColor {
                color: #2446a8;
              }
              .changeColorB {
                color: #2446a8;
              }
            }
          }
          .workAccommodation {
            width: 100%;
            // height: 158px;
            margin-top: -2px;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
            .wAccommodation {
              width: 384px;
              height: 158px;
              background-color: #ffffff;
              padding: 2px 2px;
              box-sizing: border-box;
              border-radius: 4px 4px 4px 4px;
              margin-top: 18px;
              margin-left: 16px;
              .accommodation_a {
                width: 380px;
                height: 154px;
                border-radius: 4px 4px 4px 4px;
                cursor: pointer;
                .company {
                  width: 380px;
                  height: 84px;
                  background: url('~@/assets/image/returnee/bg32.png') 50%;
                  .top {
                    width: 344px;
                    height: 42px;
                    display: flex;
                    justify-content: space-between;
                    margin-left: 18px;
                    .position {
                      min-width: 80px;
                      height: 22px;
                      font-size: 16px;
                      font-family: PingFang SC-Semibold, PingFang SC;
                      font-weight: 600;
                      color: #222222;
                      line-height: 22px;
                      -webkit-background-clip: text;
                      display: flex;
                      margin-top: 14px;
                    }
                    .pay {
                      min-width: 64px;
                      height: 22px;
                      font-size: 16px;
                      font-family: PingFang SC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #f44335;
                      line-height: 22px;
                      -webkit-background-clip: text;
                      margin-top: 14px;
                      display: flex;
                      align-items: center;
                      p {
                        display: flex;
                        margin-top: 2px;
                        span {
                          display: block;
                          margin-top: -5px;
                          font-weight: 600;
                        }
                      }
                    }
                  }
                  .bottom {
                    width: 344px;
                    height: 42px;
                    margin-left: 18px;
                    .cardItems {
                      width: 263px;
                      height: 20px;
                      display: flex;
                      justify-content: flex-start;
                      margin-top: 6px;
                      align-items: center;
                      margin-left: -4px;
                      .cardItem {
                        display: flex;
                        height: auto;
                        min-width: 20px;
                        margin-top: 6px;
                        font-size: 14px;
                        font-family: PingFang SC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #666666;
                        line-height: 20px;
                        -webkit-background-clip: text;
                        margin-left: 4px;
                        p {
                          margin-top: -2px;
                          margin-left: 4px;
                        }
                      }
                      .cardItem:last-child {
                        p {
                          display: none;
                        }
                      }
                    }
                  }
                }
                .line {
                  width: 344px;
                  height: 0px;
                  opacity: 1;
                  border: 1px dashed #edf0f6;
                  margin-left: 20px;
                }
                .companyIntroduction {
                  width: 380px;
                  height: 72px;
                  border-bottom-left-radius: 2px;
                  border-bottom-right-radius: 2px;
                  display: flex;
                  align-items: center;
                  border: none;
                  .companyPic {
                    width: 40px;
                    height: 40px;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    margin-left: 18px;
                    img {
                      width: 40px;
                      height: 40px;
                    }
                  }
                  .companyRight {
                    height: 40px;
                    margin-left: 12px;
                    .companyName {
                      min-width: 50px;
                      height: 20px;
                      font-size: 14px;
                      font-family: PingFang SC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #222222;
                      line-height: 20px;
                      text-align: left;
                      -webkit-background-clip: text;
                      margin-top: -3px;
                    }
                    .companySituation {
                      height: 17px;
                      width: auto;
                      display: flex;
                      margin-left: -8px;
                      margin-top: 8px;
                      .L_companySituation {
                        font-size: 12px;
                        font-family: PingFang SC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #666666;
                        line-height: 17px;
                        -webkit-background-clip: text;
                        display: flex;
                        margin-left: 8px;
                        p {
                          margin-left: 8px;
                        }
                      }
                      .L_companySituation:last-child {
                        p {
                          display: none;
                        }
                      }
                    }
                  }
                }
              }
            }
            .wAccommodation:nth-child(3n + 1) {
              margin-left: 0;
            }
          }
        }
        .morebox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .more {
            width: 273px;
            height: 40px;
            margin-top: 32px;
            background: rgba(36, 70, 168, 0.1);
            border-radius: 6px 6px 6px 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            p {
              width: 61px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #2446a8;
              line-height: 20px;
              letter-spacing: 1px;
              -webkit-background-clip: text;
            }
          }
        }

        .hotCity {
          width: 100%;
          height: auto;
          margin-top: 30px;
          .typeCity {
            width: 100%;
            height: 52px;
            background: #ffffff;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            padding-top: 16px;
            box-sizing: border-box;
            .hCity {
              width: 1094px;
              display: flex;
              justify-content: flex-start;
              margin-left: -3px;
              flex-direction: row;
              flex-wrap: wrap;
              .h_list {
                // width: 30px;
                height: 20px;
                font-size: 14px;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #666666;
                line-height: 20px;
                letter-spacing: 1px;
                -webkit-background-clip: text;
                margin-left: 32px;
                &:hover {
                  color: $nx-color;
                  cursor: pointer;
                }
              }
              .changeColor {
                color: #2446a8;
              }
            }
          }
        }
        .cityAccommodation {
          width: 1184px;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          flex-wrap: wrap;
          .cAccommodation {
            width: 284px;
            height: 161px;
            background: #ffffff;
            border-radius: 4px 4px 4px 4px;
            opacity: 1;
            padding: 2px;
            box-sizing: border-box;
            margin-top: 18px;
            .cAccommodation_a {
              // width: 280px;
              height: 157px;
              border-radius: 4px 4px 4px 4px;
              cursor: pointer;
              .cityWork {
                // width: 280px;
                height: 102px;
                display: flex;
                padding: 22px 0 16px 18px;
                box-sizing: border-box;
                background: url('~@/assets/image/returnee/bg132.png') 50%;
                .wImg {
                  width: 64px;
                  height: 64px;
                  img {
                    width: 64px;
                    height: 64px;
                  }
                }
                .imgRight {
                  min-width: 30px;
                  height: 64px;
                  margin-left: 8px;
                  .cityCompany {
                    height: 22px;
                    font-size: 16px;
                    font-family: PingFang SC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #222222;
                    line-height: 22px;
                    -webkit-background-clip: text;
                    display: block;
                    margin-left: 8px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                  }
                  .wInformation {
                    min-width: 100px;
                    height: 17px;
                    margin-top: 25px;
                    display: flex;
                    .wInformation_a {
                      display: flex;
                      height: 17px;
                      font-size: 12px;
                      font-family: PingFang SC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #666666;
                      line-height: 17px;
                      -webkit-background-clip: text;
                      margin-left: 8px;
                      p {
                        margin-left: 8px;
                      }
                    }
                    .wInformation_a:last-child {
                      p {
                        display: none;
                      }
                    }
                  }
                }
              }
              .line {
                width: 244px;
                height: 0px;
                opacity: 1;
                border: 1px dashed #edf0f6;
                margin-left: 20px;
              }
              .cityBottom {
                width: 280px;
                height: 55px;
                padding: 16px 0 16px 18px;
                box-sizing: border-box;
                display: flex;
                .number {
                  min-width: 18px;
                  height: 25px;
                  font-size: 18px;
                  font-family: PingFang SC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #2446a8;
                  line-height: 25px;
                  -webkit-background-clip: text;
                }
                .numberBottom {
                  min-width: 76px;
                  height: 20px;
                  font-size: 14px;
                  font-family: PingFang SC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  line-height: 20px;
                  letter-spacing: 1px;
                  -webkit-background-clip: text;
                  display: inline-block;
                  margin-left: 4px;
                  margin-top: 3px;
                }
              }
            }
          }
        }
        #more {
          margin-bottom: 72px;
        }
      }
    }
  }
}
.dropdown-child {
  position: absolute;
  left: 585px;
  width: 600px;
  height: 204px;
  padding: 4px 0;
  background: #fff;
  box-shadow: 0 10px 40px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  z-index: 2;
  overflow-y: scroll;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: #12141a;
    line-height: 22px;
    padding: 12px 16px 4px 16px;
  }

  .child-item {
    display: flex;
    padding: 12px 0 0 10px;

    .type-name {
      width: 122px;
      font-size: 13px;
      color: #666;
      line-height: 18px;
      padding-left: 6px;
      word-break: break-all;
      box-sizing: border-box;
      text-align: left;
    }

    .children {
      flex: 1;
      border-bottom: 1px solid #f0f3fa;
      text-align: left;

      a {
        display: inline-block;
        margin-bottom: 12px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 14px;
        color: #222;
        line-height: 18px;
        transition: all 0.2s linear;

        &:hover {
          color: #2446a8;
        }
      }
    }
  }
}
</style>
