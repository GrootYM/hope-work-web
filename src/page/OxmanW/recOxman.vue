<template>
  <div class="main">
    <div class="recTop">
      <div class="cardTabBox">
        <!-- <div :class="['cardTabItem', tabIndex == 2 ? 'active' : '']" @click="qieTab(2)">
          <p>精选牛人</p>
        </div> -->
        <div :class="['cardTabItem', tabIndex == 1 ? 'active' : '']" @click="qieTab(1)">
          <p>推荐</p>
        </div>
        <div :class="['cardTabItem', tabIndex == 3 ? 'active' : '']" @click="qieTab(3)">
          <p>新人才</p>
        </div>
        <!-- <div class="cardTabItem cardTabItemM">
          <p>更多</p>
          <img class="bottomB" src="@/assets/image/oxman/bottomB.png" alt="" />
          <img class="topB" src="@/assets/image/oxman/topB.png" alt="" />
          <div class="moreDBox">
            <div class="moreDBoxC">
              <div class="moreItem">
                <h2>互动类：</h2>
                <p>看过我</p>
                <p>对我感兴趣</p>
                <p>我看过</p>
              </div>
              <div class="moreItem">
                <h2>互动类：</h2>
                <p>看过我</p>
                <p>对我感兴趣</p>
                <p>我看过</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="otherBox" v-if="positionTypeArr.length > 0">
        <div class="otherItem otherItemR">
          <p>
            {{ positionType.cityName }}-{{ positionType.positionName }}
            <span v-if="positionType.topSalary">{{ positionType.lowSalary }}-{{ positionType.topSalary }}k</span>
          </p>
          <img src="@/assets/image/oxman/bottomG.png" alt="" />
          <div class="selectSBox">
            <div
              class="selectSCon"
              @click="toChooseType(item2)"
              v-for="(item2, index2) in positionTypeArr"
              :key="index2"
            >
              <p :class="['one-text', positionType.id == item2.id ? 'active' : '']">
                {{ item2.cityName }}-{{ item2.positionName }}
                <span v-if="item2.topSalary">{{ item2.lowSalary }}-{{ item2.topSalary }}k</span>
              </p>
            </div>
          </div>
        </div>
        <div class="otherItem" v-if="tabIndex != 3" @click="toChooseLocation">
          <img src="@/assets/image/oxman/cityIcon.png" alt="" />
          <p>{{ cityInfo.name || '不限' }}</p>
        </div>
        <!-- <div class="otherItem otherItemR otherItemA" v-if="tabIndex == 3">
          <p>全部牛人</p>
          <img src="@/assets/image/oxman/bottomG.png" alt="" />
        </div> -->
        <div class="otherItem otherItemS">
          <img class="screenIcon" src="@/assets/image/oxman/screenIcon.png" alt="" />
          <img class="screenedIcon" src="@/assets/image/oxman/screenedIcon.png" alt="" />
          <p>筛选</p>
          <div :class="['screenBox', hideScreen ? 'hideScreen' : '']">
            <div class="screenBoxC">
              <div class="screenTopBox">
                <div class="screenItem">
                  <h2>经验要求</h2>
                  <div>
                    <p
                      @click="chooseJy(item)"
                      :class="[jy == item.id ? 'active' : '']"
                      v-for="(item, index) in jyArr"
                      :key="index"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
                <div class="screenItem">
                  <h2>学历要求</h2>
                  <div>
                    <p
                      @click="chooseXl(item)"
                      :class="[xl == item.id ? 'active' : '']"
                      v-for="(item, index) in xlArr"
                      :key="index"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
                <div class="screenItem">
                  <h2>薪资待遇</h2>
                  <div>
                    <p
                      @click="chooseXz(item)"
                      :class="[xz == item.name ? 'active' : '']"
                      v-for="(item, index) in xzArr"
                      :key="index"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
                <div class="screenItem">
                  <h2>求职意向</h2>
                  <div>
                    <p
                      @click="chooseQz(item)"
                      :class="[qz == item.id ? 'active' : '']"
                      v-for="(item, index) in qzArr"
                      :key="index"
                    >
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="screenBottomBox">
                <button class="cancel" @click="toCancel">取消</button>
                <button class="sure" @click="toSure">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="oxmanCon">
      <div class="oxmanLeft">
        <div class="recCon">
          <div class="hintCard" v-if="positionTypeArr.length == 0">
            <img src="@/assets/image/oxman/empty.png" alt="" />
            <div>
              <p>发布职位后才能查看人才哦，快去发布职位吧！</p>
              <button class="jobBtn" @click="toAddJob()">发布职位</button>
            </div>
          </div>
          <div class="recItem" v-for="(item, index) in recArr" :key="index" @click="toPerson(item)">
            <img class="bjW" src="@/assets/image/oxman/recBj.png" alt="" />
            <div class="callBtn" @click.stop="toImmediately(item)">
              <p>打招呼</p>
            </div>
            <div class="xz">{{ item.startSalary }}-{{ item.endSalary }}k</div>
            <img class="gender" v-if="item.sex == 2" src="@/assets/image/oxman/female.png" alt="" />
            <img class="gender" v-if="item.sex != 2" src="@/assets/image/oxman/male.png" alt="" />
            <div class="userBox">
              <img :src="item.headPath" alt="" />
              <div class="nameBox">
                <h2 class="name">
                  {{ item.userName }}<span>{{ item.status }}</span>
                </h2>
                <div class="cardLabel">
                  <p>{{ item.age }}岁</p>
                  <p>{{ item.workTime.indexOf('年') > -1 ? item.workTime : item.workTime + '年' }}</p>
                  <p>{{ item.education }}</p>
                  <p>{{ item.lookWorkStatus }}</p>
                </div>
                <div class="qwItem">
                  <h2>期望：</h2>
                  <p class="one-text">{{ item.cityName }}-{{ item.positionTypeName }}</p>
                </div>
                <div class="qwItem">
                  <h2>优势：</h2>
                  <p class="one-text">{{ item.advantage }}</p>
                </div>
                <div class="gtgBox">
                  <!-- <p class="blue">最近沟通过{{ item.gtg }}</p> -->
                  <p class="blue">{{ item.activityStatus }}</p>
                  <p>空闲</p>
                </div>
              </div>
              <div class="experienceBox">
                <!-- <div class="experienceLeft">
                  <img src="@/assets/image/job/gzjy1.png" alt="" />
                  <div class="vLine"></div>
                  <img src="@/assets/image/job/xl1.png" alt="" />
                </div> -->
                <div class="experienceRight">
                  <div class="experienceItem" v-for="(item1, index1) in item.workExperienceList" :key="index1">
                    <img v-if="index1 == 0" src="@/assets/image/job/gzjy1.png" alt="" />
                    <!-- <img v-if="index1 == item.workExperienceList.length - 1" src="@/assets/image/job/xl1.png" alt="" /> -->
                    <h2>{{ item1.startTime }}-{{ item1.endTime }}</h2>
                    <p class="one-text">{{ item1.company }}-{{ item1.positionTypeName }}</p>
                  </div>
                  <div class="experienceItem" v-if="item.startTime">
                    <img src="@/assets/image/job/xl1.png" alt="" />
                    <h2>{{ item.startTime }}-{{ item.endTime }}</h2>
                    <p class="one-text">{{ item.schoolName }}-{{ item.major }}-{{ item.education }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pageBox" v-if="positionTypeArr.length != 0">
          <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
      <div class="oxmanRight" v-if="tabIndex == 2">
        <div class="oxmanRightC">
          <img class="bjW" src="@/assets/image/oxman/recBj2.png" alt="" />
          <h2>按条件搜索牛人</h2>
          <div class="oSearchBox">
            <input type="text" placeholder="搜索关键词" />
            <div>
              <img src="@/assets/image/oxman/searchIcon.png" alt="" />
            </div>
          </div>
          <div class="tuiCon">
            <div v-for="(item, index) in tuiArr" :key="index">
              <img :src="item.img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <JobModal :isShow="isShow" @closeModal="isShow = false">
      <div class="mConBox">
        <h2>请选择城市</h2>
        <div class="tabBox">
          <div :class="['tabItem', 'active']">
            <p>热门城市</p>
          </div>
        </div>
        <div class="tabCon">
          <div class="conItem" v-for="(item, index) in csArr" :key="index" @click="sureLocation(item)">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </JobModal>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import JobModal from '@/component/Job/modal'

import Job from '@/api/job'
import Oxman from '@/api/oxman'
export default {
  components: {
    JobModal,
  },
  watch: {},
  computed: {
    ...mapGetters(['userInfo']),
  },
  data() {
    return {
      isShow: false,
      csArr: [],
      recArr: [],
      total: 0,
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
        // {
        //   name: '实习生',
        // },
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
        // {
        //   name: '小学',
        //   id: 1,
        // },
        // {
        //   name: '初中',
        //   id: 2,
        // },
        {
          name: '高中及以下',
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
      xz: '不限',
      xzSArr: [],
      xzArr: [
        {
          name: '不限',
          startSalary: '',
          endSalary: '',
        },
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
      qz: '',
      qzArr: [
        {
          name: '不限',
          id: '',
        },
        {
          name: '离职-随时到岗',
          id: 1,
        },
        {
          name: '在职-暂不考虑',
          id: 2,
        },
        {
          name: '在职-考虑机会',
          id: 3,
        },
        {
          name: '在职-月内到岗',
          id: 4,
        },
      ],
      tuiArr: [
        {
          img: require('@/assets/image/job/icon7.png'),
        },
        {
          img: require('@/assets/image/job/icon7.png'),
        },
      ],
      tabIndex: 1, //默认新牛人
      positionType: {},
      cityInfo: {},
      pageSize: 7,
      currentPage: 1,
      // companyId: '30',
      positionTypeArr: [],
      hideScreen: false,
    }
  },
  mounted() {
    // this.queryHotCityList()
    // this.queryPositonAll()
  },
  activated() {
    if (this.$route.query.update) {
      this.currentPage = 1
      this.tabIndex = 1
      this.positionType = this.positionTypeArr[0]
      this.cityInfo = {}
      this.xl = ''
      this.jy = ''
      this.qz = ''
      this.xz = '不限'
      this.xzSArr = []
      this.queryHotCityList()
      this.queryPositonAll()
    }
  },
  methods: {
    toPerson(item) {
      item.positionId = this.positionType.positionTypeId
      item.positionName = this.positionType.positionName
      sessionStorage.setItem('perInfo', JSON.stringify(item))
      this.$router.push({ path: '/oxHome/personalInfo', query: { userId: item.userId } })
    },
    toAddJob() {
      this.$store.dispatch('setOxTitle', '发布职位')
      this.$router.push({ name: 'addJob' })
    },
    async queryHotCityList() {
      let params = {}
      let res = await Job.queryHotCityList(params)
      if (res.code == 200) {
        this.csArr = res.data
        // this.cityInfo = res.data[0]
      }
    },
    // 打招呼
    toImmediately(item) {
      item.positionId = this.positionType.positionTypeId
      item.positionName = this.positionType.positionName
      sessionStorage.setItem('perInfo', JSON.stringify(item))
      this.$router.push({
        path: '/oxHome/communicate',
      })
      this.$store.dispatch('setOxTitle', '沟通')
    },
    toChooseLocation() {
      this.isShow = true
    },
    sureLocation(item) {
      this.cityInfo = item
      this.isShow = false
      this.init()
    },
    currentChange(val) {
      if (val == this.currentPage) {
        return
      }
      this.currentPage = val
      this.init()
    },
    init() {
      if (this.tabIndex == 1) {
        this.querySystemRecommendVitaeList()
      } else if (this.tabIndex == 3) {
        this.querySystemRecommendNewVitaeList()
      }
    },
    qieTab(type) {
      if (this.tabIndex == type) {
        return
      }
      this.tabIndex = type
      this.currentPage = 1
      this.positionType = this.positionTypeArr[0]
      this.cityInfo = {}
      this.xl = ''
      this.jy = ''
      this.qz = ''
      this.xz = '不限'
      this.xzSArr = []
      this.init()
    },
    chooseJy(item) {
      this.jy == item.id ? (this.jy = '') : (this.jy = item.id)
    },
    chooseXl(item) {
      this.xl == item.id ? (this.xl = '') : (this.xl = item.id)
    },
    chooseXz(item) {
      if (this.xz == item.name) {
        this.xz = '不限'
        this.xzSArr = []
      } else {
        this.xz = item.name
        this.xzSArr = []
        this.xzSArr.push(item.startSalary)
        this.xzSArr.push(item.endSalary)
      }
    },
    chooseQz(item) {
      this.qz == item.id ? (this.qz = '') : (this.qz = item.id)
    },
    toCancel() {
      this.hideScreen = true
      setTimeout(() => {
        this.hideScreen = false
      }, 500)
    },
    toSure() {
      this.init()
      this.hideScreen = true
      setTimeout(() => {
        this.hideScreen = false
      }, 500)
    },
    async queryPositonAll() {
      let params = {
        companyId: this.userInfo.companyId || '',
        personId: '',
      }
      let res = await Oxman.queryPositonAll(params)
      if (res.code == 200) {
        this.positionTypeArr = res.data
        this.positionType = res.data[0] || {}
        console.log(this.positionType, this.positionTypeArr)
        this.init()
      }
    },
    toChooseType(item) {
      if (this.positionType.id == item.id) {
        return
      }
      this.positionType = item
      this.init()
    },
    //推荐牛人
    async querySystemRecommendVitaeList() {
      let params = {
        positionTypeId: this.positionType.positionTypeId,
        cityCode: this.cityInfo.zipcode || '',
        education: this.xl,
        startSalary: this.xzSArr[0],
        endSalary: this.xzSArr[1],
        experiecne: this.jy,
        lookWorkStatus: this.qz,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
      let res = await Oxman.querySystemRecommendVitaeList(params)
      if (res.code == 200) {
        this.recArr = res.data.list
        this.total = res.data.total
      }
    },
    //新牛人
    async querySystemRecommendNewVitaeList() {
      let params = {
        positionTypeId: this.positionType.positionTypeId,
        cityCode: this.cityInfo.zipcode || '',
        education: this.xl,
        startSalary: this.xzSArr[0],
        endSalary: this.xzSArr[1],
        experiecne: this.jy,
        lookWorkStatus: this.qz,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
      let res = await Oxman.querySystemRecommendNewVitaeList(params)
      if (res.code == 200) {
        this.recArr = res.data.list
        this.total = res.data.total
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
  .recTop {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 36px;
    .cardTabBox {
      display: flex;
      .cardTabItem {
        height: 32px;
        padding: 0 12px;
        border-radius: 4px 4px 4px 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #333333;
        margin-right: 20px;
        position: relative;
        cursor: pointer;
        img {
          width: 12px;
          height: 12px;
          margin-left: 4px;
        }
        .moreDBox {
          padding-top: 8px;
          position: absolute;
          left: 0;
          top: 32px;
          z-index: 100;
        }
        .moreDBoxC {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
          .moreItem {
            width: 290px;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 20px;
            padding: 0 12px;
            box-sizing: border-box;
            h2 {
              color: #999999;
            }
            p {
              color: #333333;
              margin-right: 16px;
            }
          }
        }
      }
      .cardTabItemM {
        .topB {
          display: none;
        }
        .moreDBox {
          display: none;
        }
      }
      .cardTabItemM:hover {
        p {
          color: #2446a8;
        }
        .bottomB {
          display: none;
        }
        .topB {
          display: block;
        }
        .moreDBox {
          display: block;
        }
      }
      .cardTabItem.active {
        border: 1px solid #2446a8;
        background: rgba(36, 70, 168, 0.1);
        color: #2446a8;
      }
    }
    .otherBox {
      display: flex;
      .otherItem {
        min-width: 84px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #dadde2;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
        margin-left: 16px;
        position: relative;
        cursor: pointer;
        img {
          width: 14px;
          height: 14px;
          margin-right: 8px;
        }
      }
      .otherItemR {
        // min-width: 224px;
        min-width: 200px;
        justify-content: space-between;
        padding: 0 20px;
        position: relative;
        img {
          width: 12px;
          height: 12px;
          margin-left: 8px;
        }
        .selectSBox {
          width: 224px;
          max-height: 300px;
          overflow-y: auto;
          background: #fff;
          border: 1px solid #e8ebf0;
          border-radius: 4px;
          padding: 4px 8px;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 38px;
          display: none;
          z-index: 10000;
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
      }
      .otherItemR:hover {
        .selectSBox {
          display: block;
        }
      }
      .otherItemA {
        width: 124px;
      }
      .otherItemS {
        .screenedIcon,
        .screenBox {
          display: none;
        }
        .hideScreen {
          display: none !important;
        }
      }
      .otherItemS:hover {
        .screenIcon {
          display: none;
        }
        .screenedIcon,
        .screenBox {
          display: block;
        }
        p {
          color: #2446a8;
        }
      }
      .screenBox {
        position: absolute;
        top: 40px;
        right: 0;
        padding-top: 8px;
        z-index: 100;
        .screenBoxC {
          width: 873px;
          height: 316px;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
          padding: 24px 24px 16px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .screenTopBox {
            display: flex;
            flex-wrap: wrap;
          }
          .screenBottomBox {
            display: flex;
            justify-content: flex-end;
            padding-top: 16px;
            border-top: 1px dotted #e8ebf0;
            button {
              width: 100px;
              height: 40px;
              border-radius: 4px 4px 4px 4px;
              font-size: 14px;
              margin-left: 16px;
              cursor: pointer;
            }
            .cancel {
              color: #2446a8;
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid #2446a8;
            }
            .sure {
              background: #2446a8;
              color: #ffffff;
            }
          }
          .screenItem {
            margin-bottom: 16px;
            margin-right: 88px;
            width: 368px;
            h2 {
              font-size: 14px;
              font-weight: 600;
              color: #3d3d3d;
              line-height: 20px;
              text-align: left;
              margin-bottom: 8px;
            }
            div {
              display: flex;
              flex-wrap: wrap;
              p {
                min-width: 84px;
                height: 25px;
                background: #f3f5f9;
                border-radius: 4px 4px 4px 4px;
                font-size: 12px;
                color: #666666;
                line-height: 25px;
                text-align: center;
                margin: 0 8px 8px 0;
                padding: 0 12px;
                box-sizing: border-box;
              }
              // p:nth-child(4n) {
              //   margin-right: 0;
              // }
              p.active {
                background: #2446a8;
                color: #fff;
              }
            }
          }
          .screenItem:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
  .oxmanCon {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    margin-top: 30px;
    .oxmanLeft {
      flex: 1;
    }
    .oxmanRight {
      width: 187px;
      margin-left: 16px;
      .oxmanRightC {
        width: 100%;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        position: relative;
        padding: 15px 24px 24px 24px;
        box-sizing: border-box;
        h2 {
          font-size: 16px;
          font-weight: 600;
          color: #3d3d3d;
          line-height: 22px;
          text-align: left;
        }
        .oSearchBox {
          margin-top: 32px;
          width: 139px;
          height: 40px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid rgba(36, 70, 168, 0.3);
          display: flex;
          align-items: center;
          box-sizing: border-box;
          input {
            flex: 1;
            height: 100%;
            width: 100px;
            padding-left: 12px;
            box-sizing: border-box;
            font-size: 14px;
          }
          div {
            width: 38px;
            height: 36px;
            border-radius: 4px;
            background: #2446a8;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1px;
            img {
              width: 16px;
              height: 16px;
            }
          }
        }
        .tuiCon {
          display: flex;
          margin-top: 16px;
          div {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-left: -8px;
            border: 1px solid #ffffff;
          }
          div:first-child {
            margin-left: 0px;
          }
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .recCon {
    width: 100%;
    .recItem {
      cursor: pointer;
    }
  }
  .pageBox {
    margin-top: 36px;
    margin-bottom: 94px;
  }
}

.mConBox {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
  h2 {
    font-size: 16px;
    font-weight: 400;
    color: #222222;
    line-height: 22px;
    text-align: left;
    padding-left: 24px;
  }
  .tabBox {
    background: none;
  }
  .tabCon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .conItem {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
.hintCard {
  padding: 50px 0;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: #494949;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  img {
    width: 100px;
    height: auto;
    margin-right: 20px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }
}
.jobBtn {
  width: 110px;
  height: 32px;
  background: #2446a8;
  border-radius: 4px 4px 4px 4px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
}
</style>
