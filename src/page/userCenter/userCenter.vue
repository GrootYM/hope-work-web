<template>
  <div class="main">
    <!-- <img class="bg1" src="@/assets/image/job/bg1.png" alt="" /> -->
    <!-- 左边职位栏 -->
    <div class="L_main">
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
              @search="queryPositonByKeyWords"
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
          <!-- <button class="logBtn">登录，查看更多职位</button> -->
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
        <div class="filterBox">
          <!-- <div class="filterItem" v-for="(item, index) in filterTerms" :key="index">
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
        </div> -->
          <div class="filterItem">
            <div class="filterConCity">
              <h2>城市</h2>
              <div class="termBox">
                <div class="termItem" v-for="(item1, index1) in csArr" :key="index1" @click="toChooseCity(item1)">
                  <p :class="[item1.id == selectCityInfo.id ? 'active' : '']">{{ item1.name }}</p>
                </div>
              </div>
            </div>
            <div v-if="selectCityInfo.id && areas.length > 0" class="areaBox">
              <p @click="toChooseArea(-1)">不限</p>
              <p
                @click="toChooseArea(item2)"
                :class="[item2.zipcode == selectArea ? 'active' : '']"
                v-for="(item2, index2) in areas"
                :key="index2"
              >
                {{ item2.name }}
              </p>
            </div>
          </div>
          <div class="filterItem">
            <div class="filterCon">
              <h2>薪资</h2>
              <div class="termBox">
                <div @click="toChooseXz(item1)" class="termItem" v-for="(item1, index1) in xzArr" :key="index1">
                  <p :class="[item1.name == selectXz ? 'active' : '']">{{ item1.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="filterItem">
            <div class="filterCon">
              <h2>经验</h2>
              <div class="termBox">
                <div class="termItem" @click="toChooseJy(item1)" v-for="(item1, index1) in jyArr" :key="index1">
                  <p :class="[item1.id === selectJy ? 'active' : '']">{{ item1.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="filterItem moreItem">
            <div class="filterCon">
              <h2>更多</h2>
              <div class="termBox">
                <div class="termItem" v-for="(item1, index1) in moreArr" :key="index1">
                  <div :class="['select', selectMore[index1] ? 'active' : '']">
                    <p>{{ item1.name }}<span v-if="selectMore[index1]">(1)</span></p>
                    <img class="selIcon" src="@/assets/image/job/selIcon.png" alt="" />
                    <img class="bottom" src="@/assets/image/job/bottom.png" alt="" />
                  </div>
                  <div class="selectSBox">
                    <div
                      class="selectSCon"
                      @mouseenter="selectSEnter(index1, index2)"
                      @mouseleave="selectSLeave"
                      v-for="(item2, index2) in item1.child"
                      :key="index2"
                    >
                      <p
                        :class="['one-text', selectMore[index1] == item2.id ? 'active' : '']"
                        @click="toChooseSelect(index1, item2)"
                      >
                        {{ item2.name || item2.industryName || item2.pname }}
                      </p>
                      <img v-if="index1 == 1" src="@/assets/image/job/sellconR.png" alt="" />
                    </div>
                  </div>
                  <div
                    v-if="index1 == 1 && selectTArr.length > 0"
                    class="selectTBox"
                    @mouseenter="selectTEnter"
                    @mouseleave="selectSLeave"
                  >
                    <div class="selectTCon">
                      <div class="selectTItem" v-for="(item2, index2) in selectTArr" :key="index2">
                        <h2>{{ item2.typeName }}</h2>
                        <div>
                          <p
                            :class="[selectMore[index1] == item3.subId ? 'active' : '']"
                            @click="toChooseSelect(index1, item3)"
                            v-for="(item3, index3) in item2.subChildLists"
                            :key="index3"
                          >
                            {{ item3.subTypeName }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="jopTitle">
        <div class="jopTitleBg">
          <div class="titleContent">
            <div class="content" v-for="(item, index) in titleContent" :key="index" @click="changeColor(i, index)">
              <p :class="{ changeColor: i1 === index }">{{ item.name }}</p>
              <div :class="{ changeBox: i1 === index }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="jobCardBox">
        <div class="jobCardLeft">
          <div class="cardBox">
            <div class="cardItem" @click.stop="toInfo(item)" v-for="(item, index) in cardList" :key="index">
              <div class="cardTop">
                <img class="bj" src="@/assets/image/job/cardTopBj.png" alt="" />
                <div class="cardTopLeft">
                  <h2>{{ item.positionName }} [{{ item.cityName }}-{{ item.areaName || '全区域' }}]</h2>
                  <div class="cardLabel">
                    <p v-if="item.lowSalary || item.topSalary || item.cityName">
                      <span v-if="item.lowSalary && item.topSalary">{{ item.lowSalary }}-{{ item.topSalary }}k</span
                      >{{ item.cityName }}
                    </p>
                    <p>{{ item.experience }}</p>
                    <p>{{ item.education }}</p>
                  </div>
                </div>
                <div class="cardTopRight" @click.stop="toCompay(item)">
                  <img :src="item.headUrl" alt="" />
                  <div class="companyCon">
                    <h2>{{ item.companyName }}</h2>
                    <div class="cardLabel">
                      <p>{{ item.companyIndustryName }}</p>
                      <p>{{ item.companyScale }}</p>
                      <p>{{ item.finance }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cardBottom">
                <div class="welfareBox">
                  <div class="welfareItem" v-for="(item1, index1) in item.benefitsList" :key="index1">
                    <p>{{ item1 }}</p>
                  </div>
                </div>
                <div class="cardLabel">
                  <p class="black">{{ item.userName }}·{{ item.roleName }}</p>
                  <p>{{ item.status }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pageBox">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边简历栏 -->
    <div class="R_main">
      <div class="message">
        <div class="messageBg">
          <div class="messageDe">
            <img :src="messageRiBo.headUrl" alt="" />
            <div class="messageRiTop">
              <p>{{ messageRiBo.userName }}</p>
              <div class="messageRiBot">
                <div class="messageUser">
                  <span class="content">{{ messageRiBo.age }}岁</span>
                  <span class="sign">|</span>
                </div>
                <div class="messageUser">
                  <span class="content">{{ messageRiBo.workExperience }}</span>
                  <span class="sign">|</span>
                </div>
                <div class="messageUser">
                  <span class="content">{{ messageRiBo.education }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="jopStatus">
            <el-select v-model="messageRiBo.workStatus" style="width: 156px" @change="changeData(value)" disabled>
              <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="chageValue(item.label)"> </el-option> -->
            </el-select>
            <el-button style="width: 72px; margin-left: 8px; background-color: white" @click="toOnlineResume()"
              >编辑</el-button
            >
          </div>
          <div class="line"></div>
          <div class="chat">
            <div class="chatDe" v-for="(item, index) in messageRiBo.chatDe" :key="index">
              <p class="p1">{{ item.chatNum }}</p>
              <p class="p2">{{ item.chatTitle }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="attachment">
        <h3><p>附件管理</p></h3>
        <div class="line"></div>
        <div class="resumeName">
          <div class="resume" v-for="(item, index) in userResume" :key="item.vitaeId">
            <a :href="item.fileUrl"
              ><div v-if="item">{{ item.vitaeName }}</div></a
            >
            <img src="@/assets/image/userCenter/delete.png" alt="" @click="deleteResume(item.vitaeId)" v-if="item" />
          </div>
        </div>
        <div class="line2"></div>
        <div class="resumeUP" @click="toJianli">
          <button>上传简历</button>
        </div>
        <div class="resumeBot">
          <button class="makeResume" @click="toResumeTemplate()"><p>制作附件简历</p></button>
          <!-- <button class="videoUp" @click="toOnlineResume()"><p>上传视频</p></button> -->
        </div>
      </div>
      <div class="onlineResume">
        <div class="onlineResumeBg">
          <div class="onlineResumeLeft"><p>在线简历</p></div>
          <div class="onlineResumeRight" @click="toOnlineResume()">
            <p>编辑</p>
            <img src="@/assets/image/userCenter/right.png" alt="" />
          </div>
        </div>
      </div>
      <div class="onlineResume">
        <div class="onlineResumeBg">
          <div class="onlineResumeLeft"><p>打招呼语</p></div>
          <div class="onlineResumeRight" @click="toGreetings()">
            <p>编辑</p>
            <img src="@/assets/image/userCenter/right.png" alt="" />
          </div>
        </div>
      </div>
      <template v-if="this.showLength">
        <div class="attention">
          <div class="attention_a">
            <div class="lookMe">
              <h3>看过我</h3>
              <div></div>
            </div>
            <div class="line"></div>
            <div class="HRBP" v-for="(item, index) in messageRiBo.lookDataList" :key="item.positionId">
              <img :src="item.headPath" alt="" />
              <div class="HRInfo">
                <div class="InfoTop">
                  <p class="name">{{ item.userName }}</p>
                  <p class="company">{{ item.companyName }}</p>
                </div>
                <div class="InfoBottom">
                  <p class="HrPostion">{{ item.positionName }}</p>
                  <p class="HrPay">{{ item.lowSalary }}-{{ item.topSalary }}K</p>
                  <p class="HrSalary" v-if="item.yearSalary">.{{ item.yearSalary }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-for="(item, index) in adArr" :key="index" class="picture">
        <img :src="item.imgUrl" alt="" v-if="item" />
      </div>
    </div>

    <!-- 上传简历弹出框 -->
    <el-dialog :visible.sync="fileShow" :show-close="false" :close-on-click-modal="false">
      <div slot="title" class="dialog-header">
        <div></div>
        <img src="@/assets/image/login/close.png" class="close-btn" @click="closeDialog" />
      </div>
      <div class="dialog-content">
        <el-upload
          class="upload-demo"
          drag
          action="/api-recruit/api-common/oss/file-upload"
          :limit="1"
          :data="params"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          accept=".pdf,.doc,.docx, jpg, png"
        >
          <img src="@/assets/image/login/upload-doc.png" class="myicon" />
          <div class="tip-text">点击或将文件拖拽到这里上传</div>
          <div class="accept-text">简历建议使用 PDF 文件，也支持DOC、DOCX、JPG、PNG 格式</div>
          <div class="size-text">文件大小不超过20M</div>
          <div class="upload-button">上传附件简历</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Home from '@/api/home'
import Job from '@/api/job'
import User from '@/api/userCenter'
import Auth from '@/api/auth'
import JobSearch from '@/component/Job/jobSearch'
import { mapGetters } from 'vuex'
export default {
  components: {
    JobSearch,
  },
  data() {
    return {
      fileShow: false,
      fileList: [],
      params: {
        type: 2,
      },
      vitaeId: null,
      value: '',
      options: [
        { label: '离职—随时到岗', value: 1 },
        { label: '在职—月内到岗', value: 2 },
        { label: '在职—考虑机会', value: 3 },
        { label: '在职—暂不考虑', value: 4 },
      ],
      location: '',
      locationArr: [
        {
          name: '南京',
        },
        {
          name: '北京',
        },
      ],
      searchStr: '',
      hotJobs: [],
      csArr: [],
      selectXz: '',
      selectXzArr: [],
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
        // {
        //   name: '自定义',
        // },
      ],
      selectJy: '',
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
      selectMore: ['', '', '', '', ''],
      moreArr: [
        {
          name: '公司行业',
        },
        {
          name: '职业类型',
        },
        {
          name: '求职类型',
        },
        {
          name: '学历要求',
        },
        {
          name: '公司规模',
        },
        {
          name: '融资阶段',
        },
      ],
      selectTArr: [],
      selectTIndex: -1,
      selectCityInfo: {
        // pid: '914',
        // id: '915',
        // name: '南京市',
      },
      selectArea: '',
      areas: [],
      cardList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      adArr: [],
      titleContent: [{ name: '精选职位' }, { name: '热招职位' }],
      i1: 0,

      messageRiBo: [],
      showLength: 0,
      userResume: [],
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.location = this.$route.query.cityName || this.cityName
    console.log('userInfo', this.userId)
    if (this.$route.query.keyWords) {
      this.searchStr = this.$route.query.keyWords
    }
    if (this.$route.query.jobTypeId) {
      this.selectMore.splice(1, 1, this.$route.query.jobTypeId)
    }
    // this.getPositionType()
    this.getBannerList()
    this.queryHotPositionType()
    this.queryHotCityList()
    this.queryAllIndustryType()
    this.positionType()
    this.setMoreArr()
    // this.queryPositonByKeyWords()
    this.getUserResume()
  },
  computed: {
    ...mapGetters(['userId', 'cityName']),
  },
  methods: {
    //选择城市
    getSelectCityInfo() {
      this.csArr.forEach(item => {
        if (item.name == this.location) {
          this.selectCityInfo = item
          this.queryPositonByKeyWords()
        }
      })
    },
    // 跳转简历
    changeData(val) {
      console.log(val, 111111111111111111)
    },
    chageValue(val) {
      this.messageRiBo.workStatus = val
      console.log(this.messageRiBo.workStatus)
    },
    // toOnlineResume() {
    //   this.$router.push({ path: '/index/onlineResume' })
    // },
    handlePreview() {},
    //移除模块框简历
    handleRemove() {
      if (!this.vitaeId) return
      Auth.deleteResumeById({ vitaeId: this.vitaeId }).then(res => {})
    },
    //上传简历模态框
    handleSuccess(res, file, fileList) {
      const params = {
        userId: this.userId,
        fileId: res.data.fileId,
      }
      const _this = this
      Auth.userDetailEdit(params).then(res => {
        _this.getResumeList()
        _this.getUserResume()
      })
      _this.fileShow = false
    },
    //模态框获取简历列表
    async getResumeList() {
      let res = await Auth.queryResumeByUserId({ userId: this.userId })
      this.vitaeId = res.data[0].vitaeId
    },
    //隐藏上传简历模态框
    closeDialog() {
      this.fileShow = false
    },
    //分页跳转
    currentChange(val) {
      if (val == this.currentPage) {
        return
      }
      this.currentPage = val
      this.queryPositonByKeyWords()
      this.$bus.$emit('EVENT_SCROLL', 400)
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
    //跳转公司信息
    toCompay(item) {
      const { href } = this.$router.resolve({
        path: '/index/company',
        query: { id: item.companyId },
      })
      window.open(href, '_blank')
      // this.$router.push({ path: '/index/company', query: { id: item.companyId } })
    },
    // 跳转简历
    toJianli() {
      if (!this.userId) {
        this.$router.push({ path: '/login' })
        return
      }
      this.fileShow = true
    },
    //跳转在线简历
    toOnlineResume() {
      this.$router.push({ name: 'onlineResume' })
    },
    //跳转打招呼语设置
    toGreetings() {
      this.$router.push({ name: 'settingPageGreetings' })
    },
    //跳转简历模板
    toResumeTemplate() {
      this.$router.push({ name: 'resumeMake' })
    },
    clickHotHob(item) {
      this.searchStr = item.typeName
      this.queryPositonByKeyWords()
    },
    changeColor(i, index) {
      this.i1 = index
      console.log('字体样式已经改变')
    },
    changeLocation(value) {
      this.location = value
      this.getSelectCityInfo()
    },
    changeVal(value) {
      this.searchStr = value
      console.log(this.searchStr)
    },
    //选择经验
    toChooseJy(item) {
      if (this.selectJy == item.id) {
        this.selectJy = ''
      } else {
        this.selectJy = item.id
      }
      this.queryPositonByKeyWords()
    },
    //选择薪资
    toChooseXz(item) {
      // console.log(item)
      if (this.selectXz == item.name) {
        this.selectXz = ''
        this.selectXzArr = []
      } else {
        this.selectXz = item.name
        let selectXzArr = []
        selectXzArr.push(item.startSalary)
        selectXzArr.push(item.endSalary)
        this.selectXzArr = selectXzArr
      }
      this.queryPositonByKeyWords()
    },
    //选择城市
    toChooseCity(item) {
      if (item == this.selectCityInfo) {
        this.selectCityInfo = {}
        this.selectArea = ''
        this.location = '不限'
      } else {
        this.selectCityInfo = item
        this.selectArea = ''
        this.queryCityList()
        this.location = item.name
      }
      this.queryPositonByKeyWords()
    },
    toChooseArea(item) {
      if (this.selectArea == item.zipcode) {
        this.selectArea = ''
      } else {
        if (item == -1) {
          this.selectArea = ''
        } else {
          this.selectArea = item.zipcode
        }
      }
      this.queryPositonByKeyWords()
    },
    toChooseSelect(pIndex, item) {
      if (pIndex == 1) {
        if (this.selectMore[pIndex] == item.subId) {
          this.selectMore.splice(pIndex, 1, '')
        } else {
          this.selectMore.splice(pIndex, 1, item.subId)
        }
      } else {
        if (this.selectMore[pIndex] == item.id) {
          this.selectMore.splice(pIndex, 1, '')
        } else {
          this.selectMore.splice(pIndex, 1, item.id)
        }
      }
      // console.log(pIndex,this.selectMore)
      this.queryPositonByKeyWords()
    },
    //删除简历
    async deleteResume(vitaeId) {
      // this.$confirm('确定删除您的简历吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(() => {
      //     // User.deleteUserResume(id)
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!',
      //     })
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除',
      //     })
      //   })
      console.log(vitaeId)
      try {
        await User.deleteUserResume({
          vitaeId,
        })
        this.$message('删除成功')
        this.getUserResume()
      } catch (error) {
        this.$message('删除失败')
      }
    },
    // 获取海报
    async getBannerList() {
      let params = { bannerCode: 'person_center' }
      let res = await Home.getBannerList(params)
      if (res.code == 200) {
        this.adArr = res.data
        console.log(this.adArr)
      }
    },
    //根据关键字筛选工作
    async queryPositonByKeyWords() {
      // let cityCode = this.selectArea === '' ? this.selectCityInfo.zipcode : this.selectArea
      // let cityCode = ''
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keyWords: this.searchStr,
        positionTypeId: this.selectMore[1] || '',
        cityCode: this.selectCityInfo.zipcode || '',
        areaCode: this.selectArea,
        recruitType: this.selectMore[2] || '',
        education: this.selectMore[3] || '',
        experience: this.selectJy || '',
        startSalary: this.selectXzArr[0],
        endSalary: this.selectXzArr[1] || '',
        companyIndustryId: this.selectMore[0] || '',
        companyScale: this.selectMore[4] || '',
        finance: this.selectMore[5] || '',
      }
      let res = await Job.queryPositonByKeyWords(params)
      if (res.code == 200) {
        this.cardList = res.data.list
        this.total = res.data.total
      }
    },
    //筛选城市工作
    async queryHotCityList() {
      let params = {}
      let res = await Job.queryHotCityList(params)
      if (res.code == 200) {
        this.csArr = res.data
        this.getSelectCityInfo()
      }
    },
    //筛选城市
    async queryCityList() {
      let params = {
        regionLevel: 3,
        id: this.selectCityInfo.id,
      }
      let res = await Job.queryCityList(params)
      if (res.code == 200) {
        this.areas = res.data
      }
    },
    // 条件搜索
    async queryAllIndustryType() {
      let params = {
        keyWords: '',
        cityCode: '南京',
        positionTypeId: '',
      }
      let res = await Job.queryAllIndustryType(params)
      if (res.code == 200) {
        let obj = { ...this.moreArr[0] }
        obj.child = res.data
        this.moreArr.splice(0, 1, obj)
      }
    },
    async positionType() {
      let res = await Home.positionType({})
      if (res.code == 200) {
        let obj = { ...this.moreArr[1] }
        obj.child = res.data
        this.moreArr.splice(1, 1, obj)
        // this.selectTArr=res.data[0].childLists;
      }
    },
    setMoreArr() {
      let arr2 = [
          {
            name: '社招',
            id: 1,
          },
          {
            name: '校招',
            id: 2,
          },
          {
            name: '海归',
            id: 3,
          },
          {
            name: '兼职',
            id: 4,
          },
        ],
        arr3 = [
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
        arr4 = [
          {
            name: '不限',
            id: '',
          },
          {
            name: '0-20人',
            id: 1,
          },
          {
            name: '20-99人',
            id: 2,
          },
          {
            name: '100-499人',
            id: 3,
          },
          {
            name: '500-999人',
            id: 4,
          },
          {
            name: '1000-9999人',
            id: 5,
          },
          {
            name: '10000+',
            id: 6,
          },
        ],
        arr5 = [
          {
            name: '不限',
            id: '',
          },
          {
            name: '未融资',
            id: 1,
          },
          {
            name: '天使轮',
            id: 2,
          },
          {
            name: 'A轮',
            id: 3,
          },
          {
            name: 'B轮',
            id: 4,
          },
          {
            name: 'C轮',
            id: 5,
          },
          {
            name: 'D轮及以上',
            id: 6,
          },
          {
            name: '已上市',
            id: 7,
          },
          {
            name: '不需要融资',
            id: 8,
          },
        ]
      let obj2 = { ...this.moreArr[2] },
        obj3 = { ...this.moreArr[3] },
        obj4 = { ...this.moreArr[4] },
        obj5 = { ...this.moreArr[5] }
      ;(obj2.child = arr2), (obj3.child = arr3), (obj4.child = arr4), (obj5.child = arr5)
      this.moreArr.splice(2, 1, obj2),
        this.moreArr.splice(3, 1, obj3),
        this.moreArr.splice(4, 1, obj4),
        this.moreArr.splice(5, 1, obj5)
    },
    selectSEnter(i, index) {
      if (i != 1) {
        return
      }
      console.log(index)
      this.selectTIndex = index
      this.selectTArr = this.moreArr[1].child[index].childLists
    },
    selectTEnter() {
      this.selectTArr = this.moreArr[1].child[this.selectTIndex].childLists
    },
    selectSLeave() {
      this.selectTArr = []
    },
    //热门职位
    async queryHotPositionType() {
      let params = {}
      let res = await Job.queryHotPositionType(params)
      if (res.code == 200) {
        this.hotJobs = res.data
      }
    },
    //右侧用户信息数据获取
    async getUserInfo() {
      let params = { userId: this.userId }
      let res = await User.getUserInfo(params)
      if (res.code == 200) {
        let chatAll = res.data.chatDe.filter(el => {
          return el.chatTitle != '面试'
        })
        console.log('这是筛选后的', chatAll)
        this.messageRiBo = res.data
        this.messageRiBo.chatDe = chatAll
        console.log('用户信息', this.messageRiBo)
        this.showLength = this.messageRiBo.lookDataList.length
      }
    },
    //右侧获取用户个人简历列表
    async getUserResume() {
      let params = { userId: this.userId }
      let res = await User.getUserResume(params)
      console.log('用户简历', res)
      if (res.code == 200) {
        this.userResume = res.data
        console.log(this.userResume)
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
    padding: 20px 0;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    div {
      //   border: 1px solid red;
    }
    .L_main {
      width: 884px;
      .jobBox {
        width: 884px;
        background: #fff;
        padding: 32px 20px;
        box-sizing: border-box;
        border-radius: 4px 4px 4px 4px;
        .searchJobBtnBox {
          display: flex;
          .searchComBox {
            // width: 900px;
            flex: 1;
          }
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
          .logBtn {
            width: 228px;
            height: 48px;
            border-radius: 4px;
            opacity: 1;
            border: 1px solid #2446a8;
            background: #fff;
            font-size: 16px;
            color: #2446a8;
            margin-left: 18px;
          }
        }
        .hotJobBox {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #929ab0;
          padding: 16px 0;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          .label {
            width: 80px;
            height: 20px;
            font-size: 14px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #929ab0;
            line-height: 20px;
            -webkit-background-clip: text;
          }
          .hotJob {
            display: flex;
            justify-content: space-between;
            margin-left: 5px;
            .hotJobItem {
              min-width: 30px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #929ab0;
              line-height: 20px;
              -webkit-background-clip: text;
              margin: 0 5px;
              cursor: pointer;
            }
          }
        }
        .filterBox {
          .filterItem {
            padding: 16px 0;
            font-size: 14px;
            border-bottom: 1px dotted #e8ebf0;
            .filterConCity {
              display: flex;
              // align-items: center;
              h2 {
                width: 44px;
                height: 20px;
                font-size: 14px;
                font-weight: 600;
                color: #222222;
                line-height: 20px;
              }
              .termBox {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-top: -8px;
                .termItem {
                  height: 20px;
                  font-size: 14px;
                  font-family: PingFang SC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                  line-height: 20px;
                  -webkit-background-clip: text;
                  color: #333333;
                  margin: 0 10px;
                  cursor: pointer;
                  margin-top: 8px;
                  // position: relative;
                  // overflow: hidden;
                  .active {
                    color: #2446a8;
                  }
                }
                //.termItem:nth-child(2) .selectSBox {
                //  display: block;
                //}

                .termItem:hover .selectSBox {
                  display: block;
                }
              }
            }
            .filterCon {
              display: flex;
              align-items: center;
              h2 {
                font-weight: 600;
                color: #222222;
              }
              .termBox {
                display: flex;
                .termItem {
                  color: #333333;
                  margin: 0 10px;
                  cursor: pointer;
                  position: relative;
                  .active {
                    color: #2446a8;
                  }
                  .select {
                    // width: 96px;
                    height: 32px;
                    background: #f8f9fc;
                    border-radius: 4px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    img {
                      width: 10px;
                      height: auto;
                      margin-left: 4px;
                    }
                    .bottom {
                      display: none;
                    }
                  }
                  .select.active {
                    color: #2446a8;
                    .selIcon {
                      display: none;
                    }
                    .bottom {
                      display: block;
                    }
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
                    position: absolute;
                    left: 0;
                    top: 35px;
                    display: none;
                    z-index: 100;
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
                      img {
                        width: 12px;
                        height: 12px;
                      }
                    }
                    .selectSCon:hover {
                      background: #f8f8f8;
                    }
                  }
                  .selectTBox {
                    padding-left: 30px;
                    position: absolute;
                    left: 115px;
                    top: 35px;
                    z-index: 100;
                  }
                  .selectTCon {
                    width: 860px;
                    height: 300px;
                    overflow-y: auto;
                    background: #fff;
                    border: 1px solid #e8ebf0;
                    border-radius: 4px;
                    padding: 24px 20px;
                    box-sizing: border-box;
                    .selectTItem {
                      display: flex;
                      font-size: 14px;
                      h2 {
                        width: 20%;
                        font-weight: 600;
                        text-align: left;
                      }
                      div {
                        width: 80%;
                        display: flex;
                        flex-wrap: wrap;
                        p {
                          width: 20%;
                          text-align: left;
                          margin-bottom: 16px;
                        }
                        p.active {
                          color: #2446a8;
                        }
                      }
                    }
                  }
                }
                //.termItem:nth-child(2) .selectSBox {
                //  display: block;
                //}

                .termItem:hover .selectSBox {
                  display: block;
                }
              }
            }
            .areaBox {
              width: 844px;
              min-height: 40px;
              background: #f8f9fc;
              border-radius: 4px 4px 4px 4px;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              margin-top: 16px;
              margin-left: -8px;
              padding: 0 8px;
              box-sizing: border-box;
              p {
                color: #333333;
                margin-right: 18px;
                cursor: pointer;
                height: 20px;
                font-size: 14px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                margin-top: 8px;
                margin-bottom: 8px;
              }
              p.active {
                color: #2446a8;
              }
            }
          }
          .filterItem:last-child {
            border-bottom: none;
          }
          .moreItem {
            padding-bottom: 10px;
            .termBox {
              margin-bottom: -10px;
              .termItem {
                padding-bottom: 10px;
              }
            }
          }
        }
      }

      .jopTitle {
        width: 884px;
        height: 56px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        padding: 2px 2px 2px 1px;
        box-sizing: border-box;
        margin-top: 16px;
        .jopTitleBg {
          width: 881px;
          height: 52px;
          background: linear-gradient(180deg, rgba(36, 70, 168, 0.1) 0%, rgba(36, 70, 168, 0) 100%);
          border-radius: 2px 2px 2px 2px;
          padding-top: 12px;
          box-sizing: border-box;
          .titleContent {
            width: 300px;
            height: 52px;
            display: flex;
            margin-left: 10px;
            .content {
              width: 78px;
              height: 40px;
              margin-left: 32px;
              &:hover {
                cursor: pointer;
              }
              p {
                width: 78px;
                height: 25px;
                font-size: 18px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 25px;
                letter-spacing: 1px;
                -webkit-background-clip: text;
              }
              .changeColor {
                font-weight: 600;
                color: #2446a8;
              }
              div {
                width: 32px;
                height: 3px;
                background: #ffffff;
                border-radius: 2px 2px 2px 2px;
                opacity: 1;
                margin-top: 10px;
                margin-left: 23px;
              }
              .changeBox {
                background: #2446a8;
              }
            }
          }
        }
      }
      .jobCardBox {
        width: 884px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .jobCardLeft {
          width: 884px;
          // margin-right: 20px;
          .cardBox {
            .cardItem {
              margin-bottom: 20px;
              width: 100%;
              height: 145px;
              background: #ffffff;
              border-radius: 4px 4px 4px 4px;
              font-size: 14px;
              padding-top: 1px;
              cursor: pointer;
              .cardTop {
                width: 880px;
                height: 70px;
                margin: 0 auto;
                box-sizing: border-box;
                position: relative;
                // background: url(require('@/assets/image/job/cardTopBj.png')) no-repeat center;
                // background-size: cover;
                display: flex;
                justify-content: space-between;
                padding: 16px 18px 1px 18px;
                box-sizing: border-box;
                .cardTopLeft {
                  h2 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #222222;
                    display: flex;
                  }
                }
                .cardTopRight {
                  display: flex;
                  align-items: flex-end;
                  padding-bottom: 1px;
                  img {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    border: 1px solid rgba(36, 70, 168, 0.1);
                    margin-right: 12px;
                  }
                  .companyCon {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    h2 {
                      font-size: 16px;
                      line-height: 22px;
                      font-weight: 700;
                      color: #222222;
                    }
                  }
                }
              }
              .line {
                width: 844px;
                border: 1px dashed #e8ebf0;
                margin-left: 20px;
                margin-top: 16px;
              }
              .cardBottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 16px;
                padding: 0 20px;
                .welfareBox {
                  display: flex;
                  .welfareItem {
                    width: 72px;
                    height: 25px;
                    background: #f3f5f9;
                    border-radius: 4px 4px 4px 4px;
                    font-size: 12px;
                    color: #666;
                    margin-right: 8px;
                    text-align: center;
                    line-height: 25px;
                  }
                }
              }
            }
          }
          .pageBox {
            margin: 12px 0 52px 0;
          }
        }
      }
    }
    .R_main {
      margin-left: 16px;
      // div {
      //   border: 1px solid red;
      // }
      .message {
        width: 284px;
        height: 234px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        padding: 2px;
        box-sizing: border-box;
        .messageBg {
          width: 280px;
          height: 230px;
          .messageDe {
            width: 280px;
            height: 48px;
            background: url('~@/assets/image/userCenter/32person.png');
            display: flex;
            img {
              width: 48px;
              height: 48px;
              margin-top: 24px;
              margin-left: 24px;
              border-radius: 50%;
            }
            .messageRiTop {
              width: 110px;
              height: 48px;
              margin-top: 24px;
              margin-left: 12px;
              p {
                min-width: 48px;
                height: 22px;
                font-size: 16px;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                color: #222222;
                line-height: 22px;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .messageRiBot {
                width: 135px;
                height: 17px;
                display: flex;
                margin-top: 8px;
                .messageUser {
                  // width: 120px;
                  height: 17px;
                  display: flex;
                  margin-left: 8px;

                  .content {
                    // width: 27px;
                    height: 17px;
                    font-size: 12px;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 17px;
                    -webkit-background-clip: text;
                  }
                  .sign {
                    // width: 1px;
                    height: 12px;
                    margin-left: 8px;
                  }
                }
                .messageUser:first-child {
                  margin-left: 0px;
                }
              }
            }
          }
          .jopStatus {
            width: 240px;
            height: 38.42px;
            display: flex;
            margin-left: 24px;
            margin-top: 42px;
          }
          .line {
            width: 282px;
            opacity: 1;
            border: 1px dashed #e8ebf0;
            margin-left: -2px;
            margin-top: 28px;
          }
          .chat {
            width: 240px;
            height: 54px;
            margin-left: 24px;
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            .chatDe {
              width: 40px;
              height: 45px;
              .p1 {
                width: 29px;
                height: 25px;
                font-size: 18px;
                font-weight: 400;
                color: #3d3d3d;
                line-height: 25px;
                margin-left: 5px;
              }
              .p2 {
                width: 36px;
                height: 17px;
                font-size: 12px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #3d3d3d;
                line-height: 17px;
                -webkit-background-clip: text;
                margin-left: 2px;
              }
            }
          }
        }
      }
      .attachment {
        width: 284px;
        // min-height: 273px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        padding: 2px;
        box-sizing: border-box;
        opacity: 1;
        margin-top: 16px;
        padding-bottom: 15px;
        h3 {
          width: 280px;
          height: 48px;
          display: flex;
          align-items: center;
          background: url('~@/assets/image/userCenter/32person.png');
          p {
            width: 64px;
            height: 22px;
            font-size: 16px;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #3d3d3d;
            line-height: 22px;
            -webkit-background-clip: text;
            margin-left: 22px;
          }
        }
        .line {
          width: 236px;
          opacity: 1;
          border: 1px dashed #e8ebf0;
          margin-left: 22px;
        }
        .resumeName {
          width: 280px;
          // height: 88px;
          .resume {
            width: 236px;
            height: 20px;
            display: flex;
            margin-left: 22px;
            align-items: center;
            justify-content: space-between;
            margin-top: 16px;
            div {
              min-width: 50px;
              max-width: 213px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              line-height: 20px;
              -webkit-background-clip: text;
              left: 0;
              // display: flex;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            img {
              width: 14px;
              height: 14px;
              cursor: pointer;
            }
          }
        }
        .line2 {
          width: 236px;
          opacity: 1;
          border: 1px dashed #e8ebf0;
          margin-left: 22px;
          margin-top: 10px;
        }
        .resumeUP {
          width: 236px;
          height: 40px;
          background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          margin-left: 24px;
          margin-top: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          button {
            width: 56px;
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
            cursor: pointer;
          }
        }
        .resumeBot {
          width: 236px;
          height: 40px;
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          margin-left: 24px;
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .makeResume {
            width: 236px;
            height: 40px;
            background: #e9ecf6;
            border-radius: 4px 4px 4px 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            p {
              width: 84px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #2446a8;
              line-height: 20px;
            }
          }
          .videoUp {
            width: 112px;
            height: 40px;
            background: #e9ecf6;
            border-radius: 4px 4px 4px 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            p {
              width: 56px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #2446a8;
              line-height: 20px;
              -webkit-background-clip: text;
            }
          }
        }
      }
      .onlineResume {
        width: 284px;
        height: 52px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        margin-top: 16px;
        padding: 2px;
        box-sizing: border-box;
        opacity: 1;
        .onlineResumeBg {
          width: 280px;
          height: 48px;
          display: flex;
          border-radius: 4px 4px 4px 4px;
          background: url('~@/assets/image/userCenter/32person.png');
          .onlineResumeLeft {
            width: 118px;
            height: 48px;
            margin-left: 24px;
            display: flex;
            align-items: center;
            p {
              width: 64px;
              height: 22px;
              font-size: 16px;
              font-family: PingFang SC-Medium, PingFang SC;
              font-weight: 500;
              color: #3d3d3d;
              line-height: 22px;
              -webkit-background-clip: text;
            }
          }
          .onlineResumeRight {
            width: 118px;
            height: 48px;
            display: flex;
            align-items: center;
            p {
              width: 28px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #3d3d3d;
              line-height: 20px;
              display: block;
              -webkit-background-clip: text;
              margin-left: 67px;
              &:hover {
                cursor: pointer;
              }
            }
            img {
              width: 12px;
              height: 12px;
              margin-left: 9px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .attention {
        width: 284px;
        height: 393px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        margin-top: 16px;
        padding: 2px;
        box-sizing: border-box;
        .attention_a {
          width: 280px;
          height: 390px;
          .lookMe {
            width: 280px;
            height: 48px;
            background: url('~@/assets/image/userCenter/32person.png');
            h3 {
              width: 48px;
              height: 44px;
              font-size: 16px;
              font-family: PingFang SC-Medium, PingFang SC;
              font-weight: 500;
              color: #2446a8;
              line-height: 22px;
              -webkit-background-clip: text;
              display: flex;
              align-items: center;
              margin-left: 57px;
            }
            div {
              width: 32px;
              height: 4px;
              background: #2446a8;
              border-radius: 2px 2px 2px 2px;
              opacity: 1;
              margin-left: 65px;
            }
          }
          .line {
            width: 236px;
            opacity: 1;
            border: 1px dashed #e8ebf0;
            margin-left: 22px;
          }
          .HRBP {
            width: 237px;
            height: 44px;
            border-radius: 0px 0px 0px 0px;
            opacity: 1;
            margin-left: 22px;
            margin-top: 24px;
            display: flex;
            img {
              width: 32px;
              height: 32px;
              opacity: 1;
            }
            .HRInfo {
              width: 195px;
              height: 44px;
              margin-left: 10px;
              .InfoTop {
                width: 195px;
                height: 22px;
                display: flex;
                justify-content: space-between;
                .name {
                  width: 95px;
                  height: 22px;
                  font-size: 16px;
                  font-family: PingFang SC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #3d3d3d;
                  line-height: 22px;
                  -webkit-background-clip: text;
                  display: flex;
                }
                .company {
                  width: 74px;
                  height: 22px;
                  font-size: 12px;
                  font-family: PingFang SC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  line-height: 22px;
                  -webkit-background-clip: text;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
              .InfoBottom {
                width: 195px;
                height: 22px;
                display: flex;
                justify-content: space-between;
                .HrPostion {
                  min-width: 100px;
                  height: 22px;
                  font-size: 12px;
                  font-family: PingFang SC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  line-height: 22px;
                  -webkit-background-clip: text;
                  display: flex;
                }
                .HrPay {
                  min-width: 58px;
                  height: 20px;
                  font-size: 14px;
                  font-family: PingFang SC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #f44335;
                  line-height: 20px;
                  -webkit-background-clip: text;
                }
              }
            }
          }
        }
      }
      .picture {
        margin-top: 16px;
        border-radius: 2px 2px 2px 2px;
        width: 284px;
        height: 200px;
        img {
          border-radius: 2px 2px 2px 2px;
          width: 284px;
          height: 200px;
        }
      }
    }
  }
}

.dialog-content {
  .myicon {
    width: 48px;
    height: 48px;
    display: block;
    margin: 54px auto 8px;
  }
  .tip-text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .accept-text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin: 10px auto 8px;
  }
  .size-text {
    font-size: 14px;
    color: #ff7200;
    margin-bottom: 30px;
  }
  .upload-button {
    margin: auto;
    cursor: pointer;
    width: 156px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
    border-radius: 4px;
  }
}
::v-deep .el-dialog__header {
  padding: 24px 22px 12px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 694px;
  height: 420px;
  background-image: url(~@/assets/image/login/avatar-bg.png);
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 44px;
}

::v-deep .el-upload-dragger {
  width: 100%;
  height: 320px;
  background: transparent;
}

::v-deep .el-upload {
  display: block;
}
@media screen and (max-with: 76.25rem) {
}
</style>
