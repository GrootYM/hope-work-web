<template>
  <div class="main">
    <div class="companyAbout">
      <div class="jobTypeBox mt20">
        <div class="typeTitleBox">
          <h2>职位类型</h2>
          <p>全部({{ recruitNum }})</p>
        </div>
        <div class="typeCon mt20">
          <div class="typeItem">
            <p :class="[cityCode ? 'active' : '']">工作城市<span v-if="cityCode">(1)</span></p>
            <img src="@/assets/image/job/selIcon.png" alt="" />
            <div class="selectSBoxB">
              <div class="selectSBox">
                <div class="selectSCon" v-for="(item, index) in csArr" :key="index">
                  <p :class="['one-text', cityCode == item.zipcode ? 'active' : '']" @click="chooseCity(item)">
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="typeItem">
            <p :class="[jy ? 'active' : '']">工作经验<span v-if="jy">(1)</span></p>
            <img src="@/assets/image/job/selIcon.png" alt="" />
            <div class="selectSBoxB">
              <div class="selectSBox">
                <div class="selectSCon" v-for="(item, index) in jyArr" :key="index">
                  <p :class="['one-text', jy == item.id ? 'active' : '']" @click="chooseJy(item)">
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="typeItem">
            <p :class="[xl ? 'active' : '']">学历要求<span v-if="xl">(1)</span></p>
            <img src="@/assets/image/job/selIcon.png" alt="" />
            <div class="selectSBoxB">
              <div class="selectSBox">
                <div class="selectSCon" v-for="(item, index) in xlArr" :key="index">
                  <p :class="['one-text', xl == item.id ? 'active' : '']" @click="chooseXl(item)">
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="typeItem">
            <p :class="[xz ? 'active' : '']">薪资待遇<span v-if="xz">(1)</span></p>
            <img src="@/assets/image/job/selIcon.png" alt="" />
            <div class="selectSBoxB">
              <div class="selectSBox">
                <div class="selectSCon" v-for="(item, index) in xzArr" :key="index">
                  <p :class="['one-text', xz == item.name ? 'active' : '']" @click="chooseXz(item)">
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="typeInput">
            <input type="text" placeholder="查找职位中包含的关键词" v-model="searchStr" />
            <img @click="queryPositonByKeyWords" src="@/assets/image/job/searchIcon.png" alt="" />
          </div>
        </div>
      </div>
      <div class="recruitJobBox">
        <div class="recruitJobLeft">
          <div
            :class="['recruitItem', jobInfo.id == item.id ? 'active' : '']"
            @click="toCheckJob(item)"
            v-for="(item, index) in recruitArr"
            :key="index"
          >
            <div class="recruitTop">
              <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
              <div class="recruitJob">
                <h2>{{ item.positionName }}</h2>
                <p>{{ item.lowSalary }}-{{ item.topSalary }}k</p>
              </div>
              <div class="cardLabel">
                <p>{{ item.cityName }}</p>
                <p>{{ item.experience }}</p>
                <p>{{ item.education }}</p>
                <!-- <p v-for="(item1, index1) in item.label" :key="index1">{{ item1.name }}</p> -->
              </div>
            </div>
            <div class="recruitBottom">
              <div>
                <img :src="item.headUrl" alt="" />
                <h2>{{ item.userName }}·招聘者</h2>
              </div>
              <p>
                <span v-if="item.provinceName">{{ item.provinceName }}-</span>{{ item.cityName }}-{{
                  item.areaName || '全区域'
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="recruitJobRight" v-if="jobInfo.id">
          <div class="jobInfoBox">
            <div class="jobInfoCon">
              <div class="jobInfo">
                <h2>
                  {{ jobInfo.positionName
                  }}<span>{{ jobInfo.lowSalary }}-{{ jobInfo.topSalary }}k-{{ jobInfo.yearSalary }}薪</span>
                </h2>
                <!-- <div class="jobLabel">
                  <p v-for="(item, index) in jobInfo.welfares" :key="index">{{ item.name }}</p>
                </div> -->
              </div>
              <div class="jobDesc">
                <p><img src="@/assets/image/job/dw1.png" alt="" />{{ jobInfo.cityName }}</p>
                <p><img src="@/assets/image/job/gzjy1.png" alt="" />{{ jobInfo.experience }}</p>
                <p><img src="@/assets/image/job/xl1.png" alt="" />{{ jobInfo.education }}</p>
              </div>
              <div class="jobAbout">
                <div @click="toInter">
                  <img v-if="!jobInfo.collect" src="@/assets/image/job/likeIcon1.png" alt="" />
                  <img v-if="jobInfo.collect" src="@/assets/image/job/likedIcon.png" alt="" />
                  <p>{{ jobInfo.collect ? '取消感兴趣' : '感兴趣' }}</p>
                </div>
                <div @click="toImmediately">
                  <p>立即沟通</p>
                </div>
              </div>
            </div>
          </div>
          <div class="introBox">
            <div class="titleBox">
              <h2>职位描述</h2>
            </div>
            <div class="jobLabel">
              <p>{{ jobInfo.positionTypeName }}</p>
              <!-- <p v-for="(item, index) in jobInfo.zws" :key="index">{{ item.name }}</p> -->
            </div>
            <div class="jobSecBox">
              <div>
                <p>{{ jobInfo.responsibility }}</p>
                <!-- <p v-for="(item, index) in jobInfo.zhize" :key="index">{{ item }}</p> -->
              </div>
            </div>
            <div class="zpBox" v-if="bossInfo.userName">
              <img :src="bossInfo.headImg" alt="" />
              <div class="zpInfo">
                <h2>{{ bossInfo.userName }}</h2>
                <p>{{ bossInfo.companyName }}·{{ bossInfo.roleName }}</p>
              </div>
            </div>
          </div>
          <div class="locationBox">
            <div class="titleBox">
              <h2>工作地址</h2>
            </div>
            <div class="locationCon">
              <div class="locationItem">
                <div class="showMap">
                  <img src="@/assets/image/job/locationIcon.png" alt="" />
                  <p style="text-align: left">{{ jobInfo.workAddress }}</p>
                </div>
                <Map v-if="position[0]" :position="position" />
                <!-- <img src="@/assets/image/job/map.png" alt="" /> -->
              </div>
              <!-- <div class="locationItem" v-for="(item, index) in locations" :key="index">
                <div :class="[mapIndex == index ? 'showMap' : '']">
                  <img src="@/assets/image/job/locationIcon.png" alt="" />
                  <p>{{ item.name }}</p>
                </div>
                <img v-if="mapIndex == index" :src="item.map" alt="" />
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="hotBox mt20">
        <div class="titleBox">
          <h2>热招职位</h2>
          <div class="titleRight blueBox" @click="toJob">
            <p>
              更多职位
              <img src="@/assets/image/job/right.png" alt="" />
            </p>
          </div>
        </div>
        <div class="hotCon">
          <div class="hotItem" @click.stop="toInfo(item)" v-for="(item, index) in hotJobs" :key="index">
            <div class="hotTop">
              <p>{{ item.positionName }}</p>
              <p class="red" v-if="item.lowSalary && item.topSalary">{{ item.lowSalary }}-{{ item.topSalary }}k</p>
            </div>
            <div class="hotBottom">
              <div @click.stop="toCompany(item)">
                <img src="@/assets/image/job/companyIcon.png" alt="" />
                <p class="one-text">{{ item.companyName }}</p>
              </div>
              <p>{{ item.cityName }}</p>
            </div>
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
        </div>
        <div class="recommendCon">
          <div class="recommendItem" v-for="(item, index) in recommendArr" :key="index">
            <p>{{ item.name || item.industryName || item.companyName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Job from '@/api/job'
import Map from '@/component/Job/map'

import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    Map,
  },
  props: {
    id: String,
    company: Object,
  },
  computed: {
    ...mapGetters(['userId']),
  },
  data() {
    return {
      position: [],
      recruitNum: 0,
      recruitArr: [],
      jobInfo: {},
      bossInfo: {},
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
      hotJobs: [],
      searchStr: '',
      csArr: [],
      cityCode: '',
      xz: '',
      xzSArr: [],
      xzArr: [
        {
          startSalary: 0,
          endSalary: 3,
          name: '3k以下',
        },
        {
          startSalary: 3,
          endSalary: 5,
          name: '3k-5k',
        },
        {
          startSalary: 5,
          endSalary: 10,
          name: '5k-10k',
        },
        {
          startSalary: 10,
          endSalary: 20,
          name: '10k-20k',
        },
        {
          startSalary: 20,
          endSalary: 40,
          name: '20k-40k',
        },
      ],
      jy: '',
      jyArr: [
        {
          name: '不限',
          id: '',
        },
        {
          name: '应届生',
          id: 1,
        },
        {
          name: '1年以内',
          id: 2,
        },
        {
          name: '1-3年',
          id: 3,
        },
        {
          name: '3-5年',
          id: 4,
        },
        {
          name: '5-10年',
          id: 5,
        },
        {
          name: '10年以上',
          id: 6,
        },
      ],
      xl: '',
      xlArr: [
        {
          name: '不限',
          id: '',
        },
        {
          name: '小学',
          id: 1,
        },
        {
          name: '初中',
          id: 2,
        },
        {
          name: '高中',
          id: 3,
        },
        {
          name: '大专',
          id: 4,
        },
        {
          name: '本科',
          id: 5,
        },
        {
          name: '硕士',
          id: 6,
        },
        {
          name: '博士',
          id: 7,
        },
      ],
    }
  },
  mounted() {
    // this.queryCompanyPositionByComId()
    this.queryPositonByKeyWords()
    this.queryHotPositonByIndustry()
    this.getRecommend()
    this.queryHotCityList()
  },
  methods: {
    chooseCity(item) {
      this.zipcode == item.zipcode ? (this.cityCode = '') : (this.cityCode = item.zipcode)
      this.queryPositonByKeyWords()
    },
    chooseJy(item) {
      this.jy == item.id ? (this.jy = '') : (this.jy = item.id)
      this.queryPositonByKeyWords()
    },
    chooseXl(item) {
      this.xl == item.id ? (this.xl = '') : (this.xl = item.id)
      this.queryPositonByKeyWords()
    },
    chooseXz(item) {
      if (item.name == this.xz) {
        this.xz = ''
        this.xzSArr = []
      } else {
        this.xz = item.name
        this.xzSArr.push(item.startSalary)
        this.xzSArr.push(item.endSalary)
      }
      this.queryPositonByKeyWords()
    },
    // 立即沟通
    toImmediately() {
      const { href } = this.$router.resolve({
        path: '/index/immediately',
        query: {
          username: this.bossInfo.phone + '2',
          nickname: this.bossInfo.userName,
          companyName: this.company.companyName,
        },
      })
      window.open(href, '_blank')
      // this.$router.push({
      //   path: '/index/immediately',
      //   query: {
      //     username: this.bossInfo.phone + '2',
      //     nickname: this.bossInfo.userName,
      //     companyName: this.company.companyName,
      //   },
      // })
    },
    async queryPositonByKeyWords() {
      let params = {
        companyId: this.company.id,
        currentPage: 1,
        pageSize: 999999,
        keyWords: this.searchStr,
        positionTypeId: '',
        cityCode: this.cityCode,
        recruitType: '',
        education: this.xl || '',
        experience: this.jy || '',
        startSalary: this.xzSArr[0],
        endSalary: this.xzSArr[1] || '',
        companyIndustryId: '',
        companyScale: '',
        finance: '',
      }
      let res = await Job.queryPositonByKeyWords(params)
      if (res.code == 200) {
        this.recruitArr = res.data.list
        this.recruitNum = res.data.total
        if (this.recruitArr.length > 0) {
          this.queryPositionInfoByPerson(this.recruitArr[0].id)
        } else {
          this.jobInfo = {}
        }
      }
    },
    async toInter() {
      if (!this.userId) {
        this.$router.push({ path: '/login' })
      } else {
        let params = {
          id: this.jobInfo.id,
          personId: this.userId,
        }
        let res
        if (this.jobInfo.collect) {
          res = await Job.deleteUserCollectPosition(params)
        } else {
          res = await Job.addUserCollectPosition(params)
        }
        if (res.code == 200) {
          this.queryPositionInfoByPerson(this.jobInfo.id)
        }
      }
    },
    toCompany(item) {
      if (item) {
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
    // toCompanyAllJob(){
    //   this.$router.push({ path: '/index/company', query: { id: this.company.id,tabId: 2 } })
    // },
    toInfo(item) {
      const { href } = this.$router.resolve({
        path: '/index/info',
        query: { id: item.id },
      })
      window.open(href, '_blank')
      // this.$router.push({ path: '/index/info', query: { id: item.id } })
    },
    toJob() {
      this.$router.push({ path: '/index/job' })
    },
    toCheckJob(item) {
      this.position = []
      this.queryPositionInfoByPerson(item.id)
    },
    // async queryCompanyPositionByComId() {
    //   let params = {
    //     companyId: this.company.id,
    //     currentPage: 1,
    //     pageSize: 6,
    //   }
    //   let res = await Job.queryCompanyPositionByComId(params)
    //   if (res.code == 200) {
    //     this.recruitArr = res.data.list
    //     this.recruitNum = res.data.total
    //     this.queryPositionInfoByPerson(this.recruitArr[0].id)
    //   }
    // },
    async queryPositionInfoByPerson(id) {
      let params = {
        id: id,
        personId: this.userId || '',
      }
      let res = await Job.queryPositionInfoByPerson(params)
      if (res.code == 200) {
        this.jobInfo = res.data
        this.bossInfo = res.data.userInfo || {}
        this.position.push(res.data.longitude - 0)
        this.position.push(res.data.latitude - 0)
        // console.log(this.position)
      }
    },
    async queryHotPositonByIndustry(id) {
      let params = {
        companyIndustryId: null,
        currentPage: 1,
        pageSize: 8,
      }
      let res = await Job.queryHotPositonByIndustry(params)
      if (res.code == 200) {
        this.hotJobs = res.data.list
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
        this.csArr = res.data
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
    .jobTypeBox {
      width: 100%;
      height: 134px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      padding: 24px 32px;
      box-sizing: border-box;
      .typeTitleBox {
        display: flex;
        h2 {
          font-size: 18px;
          font-weight: 500;
          color: #222222;
          line-height: 25px;
        }
        p {
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          margin-left: 16px;
        }
      }
      .typeCon {
        display: flex;
        .typeItem {
          width: 96px;
          height: 32px;
          background: #f8f9fc;
          border-radius: 4px 4px 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #333333;
          margin-right: 20px;
          position: relative;
          cursor: pointer;
          img {
            width: 6px;
            height: 4px;
            margin-left: 7px;
          }
          .active {
            color: #2446a8;
          }
        }
        .typeItem:hover .selectSBoxB {
          display: block;
        }
        .typeInput {
          margin-left: 12px;
          width: 254px;
          height: 32px;
          background: #f8f9fc;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid rgba(36, 70, 168, 0.3);
          padding: 0 12px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          input {
            background: none;
            height: 100%;
            flex: 1;
            font-size: 14px;
          }
          img {
            width: 12px;
            height: 12px;
            cursor: pointer;
          }
        }
      }
    }

    .hotBox {
      background: #fff;
      width: 1200px;
      height: 305px;
      margin: 0 auto;
      margin-top: 16px;
      border-radius: 4px;
      padding: 24px 32px;
      box-sizing: border-box;
      .hotCon {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .hotItem {
          width: 268px;
          height: 94px;
          background: #ffffff;
          border-radius: 2px 2px 2px 2px;
          border: 1px solid rgba(36, 70, 168, 0.1);
          padding: 16px;
          box-sizing: border-box;
          margin-right: 16px;
          margin-bottom: 16px;
          cursor: pointer;
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
            > div {
              display: flex;
              align-items: center;
              p {
                width: 142px;
              }
            }
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
        .hotItem:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
    .recommendBox {
      width: 100%;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      padding: 20px 32px;
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

    .recruitJobBox {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      .recruitJobLeft {
        width: 384px;
        .recruitItem {
          width: 100%;
          height: 142px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          margin-bottom: 16px;
          cursor: pointer;
          .recruitTop {
            position: relative;
            padding: 16px 20px;
            .recruitJob {
              display: flex;
              justify-content: space-between;
              > h2 {
                font-size: 16px;
                font-weight: 600;
                color: #222222;
                line-height: 22px;
              }
              > p {
                font-size: 16px;
                color: #f44335;
                line-height: 22px;
              }
            }
          }
          .recruitBottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #222222;
            line-height: 20px;
            padding: 0 20px;
            margin-top: 12px;
            > div {
              display: flex;
              align-items: center;
            }
            img {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              margin-right: 12px;
            }
            p {
              font-size: 12px;
              color: #666666;
              line-height: 17px;
            }
          }
        }
        .recruitItem:last-child {
          margin-bottom: 0px;
        }
        .recruitItem.active {
          border: 1px solid #2446a8;
        }
      }
      .recruitJobRight {
        width: 784px;
        border-radius: 4px 4px 4px 4px;
        background: #ffffff;
        padding: 24px 32px;
        box-sizing: border-box;

        .jobInfoBox {
          .jobInfoCon {
            // width: 1200px;
            // height: 100%;
            // margin: 0 auto;
            position: relative;
            // .status {
            //   font-size: 14px;
            //   color: #ffffff;
            //   line-height: 20px;
            //   padding-top: 16px;
            //   text-align: left;
            // }
            .jobInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-top: 3px;
              h2 {
                font-size: 24px;
                font-weight: 600;
                color: #222222;
                line-height: 34px;
                span {
                  color: #f44335;
                  margin-left: 24px;
                }
              }
            }
            .jobDesc {
              display: flex;
              align-items: center;
              margin-top: 20px;
              p {
                font-size: 14px;
                line-height: 20px;
                color: #3d3d3d;
                margin-right: 24px;
                display: flex;
                align-items: center;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                }
              }
            }
            .jobAbout {
              display: flex;
              position: absolute;
              right: 0;
              top: 0;
              > div {
                width: 134px;
                height: 45px;
                background: rgba(255, 255, 255, 0);
                border-radius: 4px 4px 4px 4px;
                border: 1px solid #2446a8;
                font-size: 18px;
                color: #2446a8;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 16px;
                cursor: pointer;
                img {
                  width: 20px;
                  height: 20px;
                  margin-right: 4px;
                }
              }
              > div:nth-child(2) {
                width: 126px;
                border: none;
                color: #fff;
                background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
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
        .introBox {
          position: relative;
          background: #ffffff;
          // padding: 24px 32px;
          box-sizing: border-box;
          margin-top: 48px;
          > p {
            font-size: 15px;
            color: #222222;
            line-height: 28px;
            text-align: left;
          }
        }
        .jobLabel {
          display: flex;
          p {
            height: 32px;
            background: #f8f9fc;
            color: #666666;
            padding: 0 12px;
            margin-right: 20px;
            font-size: 14px;
            color: #333333;
            line-height: 32px;
          }
        }
        .jobSecBox {
          color: #222222;
          font-size: 15px;
          line-height: 28px;
          margin-top: 8px;
          text-align: left;
          h2 {
            font-size: 16px;
            line-height: 22px;
          }
        }
        .zpBox {
          display: flex;
          align-items: center;
          height: 90px;
          margin-top: 16px;
          padding: 16px 0;
          box-sizing: border-box;
          border-top: 1px dashed #e8ebf0;
          border-bottom: 1px dashed #e8ebf0;
          img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
          .zpInfo {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 16px;
            h2 {
              font-size: 16px;
              color: #222222;
              line-height: 22px;
              text-align: left;
            }
            p {
              font-size: 14px;
              color: #666666;
              line-height: 20px;
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
            height: 258px;
            background: #f8f8f8;
            border-radius: 2px 2px 2px 2px;
            font-size: 14px;
            line-height: 28px;
            color: #333333;
            padding: 24px 24px 74px 24px;
            box-sizing: border-box;
            display: flex;
            position: relative;
            > div {
              > div:first-child {
                margin-bottom: 32px;
              }
              h2 {
                margin-bottom: 8px;
                color: #999999;
              }
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
              img {
                width: 32px;
                height: 32px;
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

.selectSBoxB {
  padding-top: 3px;
  position: absolute;
  left: 0;
  top: 32px;
  display: none;
  z-index: 10000;
}
.selectSBox {
  width: 150px;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e8ebf0;
  border-radius: 4px;
  padding: 4px 8px;
  box-sizing: border-box;
  .selectSCon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      height: 32px;
      width: 100%;
      line-height: 32px;
      text-align: left;
      padding: 0 4px;
      box-sizing: border-box;
    }
    p.active {
      color: #2446a8;
    }
    img {
      width: 12px;
      height: 12px;
    }
  }
  .selectSCon:hover {
    background: #f8f8f8;
  }
}
</style>
