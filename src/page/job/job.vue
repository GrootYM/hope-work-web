<!-- 首页 -->
<template>
  <div class="main">
    <!-- <img class="bg1" src="@/assets/image/job/bg1.png" alt="" /> -->
    <div class="jobBox">
      <!-- 搜索框 -->
      <div class="searchJobBtnBox">
        <div class="searchComBox">
          <JobSearch
            :showAll="true"
            :location="location"
            :searchStr="searchStr"
            :hotCity="csArr"
            @change="changeLocation($event)"
            @changeV="changeVal($event)"
            @search="queryPositonByKeyWords"
            @changeAll="changeLocationAll($event)"
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
        <button class="logBtn" v-if="!userId" @click="toLog">
          登录，查看更多职位
        </button>
      </div>
      <!-- 热门职位 -->
      <div class="hotJobBox">
        <p class="label">热门职位：</p>
        <div class="hotJob">
          <div
            class="hotJobItem"
            @click="clickHotHob(item)"
            v-for="(item, index) in hotJobs"
            :key="index"
          >
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
          <div class="filterCon">
            <h2>城市</h2>
            <div class="termBox">
              <div
                class="termItem mb8"
                v-for="(item1, index1) in csArr"
                :key="index1"
                @click="toChooseCity(item1)"
              >
                <p :class="[item1.id == selectCityInfo.id ? 'active' : '']">
                  {{ item1.name }}
                </p>
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
              <div
                @click="toChooseXz(item1)"
                class="termItem"
                v-for="(item1, index1) in xzArr"
                :key="index1"
              >
                <p :class="[item1.name == selectXz ? 'active' : '']">
                  {{ item1.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="filterItem">
          <div class="filterCon">
            <h2>经验</h2>
            <div class="termBox">
              <div
                class="termItem"
                @click="toChooseJy(item1)"
                v-for="(item1, index1) in jyArr"
                :key="index1"
              >
                <p :class="[item1.id === selectJy ? 'active' : '']">
                  {{ item1.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="filterItem moreItem">
          <div class="filterCon filterConMore">
            <h2 style="line-height: 30px">更多</h2>
            <div class="termBox">
              <div
                class="termItem"
                v-for="(item1, index1) in moreArr"
                :key="index1"
              >
                <div :class="['select', selectMore[index1] ? 'active' : '']">
                  <p>
                    {{ item1.name }}<span v-if="selectMore[index1]">(1)</span>
                  </p>
                  <img
                    class="selIcon"
                    src="@/assets/image/job/selIcon.png"
                    alt=""
                  />
                  <img
                    class="bottom"
                    src="@/assets/image/job/bottom.png"
                    alt=""
                  />
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
                      :class="[
                        'one-text',
                        selectMore[index1] == item2.id ? 'active' : '',
                      ]"
                      @click="toChooseSelect(index1, item2)"
                    >
                      {{ item2.name || item2.industryName || item2.pname }}
                    </p>
                    <img
                      v-if="index1 == 1"
                      src="@/assets/image/job/sellconR.png"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  v-if="index1 == 1 && selectTArr.length > 0"
                  class="selectTBox"
                  @mouseenter="selectTEnter"
                  @mouseleave="selectSLeave"
                >
                  <div class="selectTCon">
                    <div
                      class="selectTItem"
                      v-for="(item2, index2) in selectTArr"
                      :key="index2"
                    >
                      <h2>{{ item2.typeName }}</h2>
                      <div>
                        <p
                          :class="[
                            selectMore[index1] == item3.subId ? 'active' : '',
                          ]"
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

    <div class="jobCardBox">
      <div class="jobCardLeft">
        <div class="cardBox">
          <div
            class="cardItem"
            @click.stop="toInfo(item)"
            v-for="(item, index) in cardList"
            :key="index"
          >
            <div class="cardTop">
              <img class="bj" src="@/assets/image/job/cardTopBj.png" alt="" />
              <div class="cardTopLeft">
                <h2>
                  {{ item.positionName }} [{{ item.cityName }}-{{
                    item.areaName || "全区域"
                  }}]
                </h2>
                <div class="cardLabel">
                  <p v-if="item.lowSalary || item.topSalary || item.cityName">
                    <span v-if="item.lowSalary > 0 && item.topSalary > 0"
                      >{{ item.lowSalary }}-{{ item.topSalary }}k</span
                    >
                    <span v-else>面议</span>
                    {{ item.cityName }}
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
                <div
                  class="welfareItem"
                  v-for="(item1, index1) in item.benefitsList"
                  :key="index1"
                >
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
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div class="jobCardright">
        <div class="uploadBox">
          <div class="uploadCon">
            <img
              class="bj uploadBj1"
              src="@/assets/image/job/uploadBj1.png"
              alt=""
            />
            <img
              class="bj uploadBj2"
              src="@/assets/image/job/uploadBj2.png"
              alt=""
            />
            <button class="mb20" @click="toJianli">上传附件简历</button>
            <button @click="toMuBan">简历模板</button>
          </div>
        </div>
        <div class="tabs-box">
          <el-tabs v-model="tabsName">
            <el-tab-pane label="看过的职位" name="first">
              <div class="lookBox">
                <!-- <div class="lookTitle">
                  <img class="bj" src="@/assets/image/job/lookTitleBj.png" alt="" />
                  <h2>看过的职位</h2>
                </div> -->
                <div class="lookCon">
                  <div
                    class="lookItem"
                    v-for="(item, index) in lookArr"
                    :key="index"
                  >
                    <div class="lookLeft">
                      <h2 class="one-text">{{ item.positionName }}</h2>
                      <p class="one-text">{{ item.companyName }}</p>
                    </div>
                    <div class="lookRight">
                      <h2>{{ item.lowSalary }}-{{ item.topSalary }}k</h2>
                      <p>{{ item.cityName }}·{{ item.areaName }}</p>
                    </div>
                  </div>
                  <div v-if="!lookArr.length" class="nodata">暂无数据~</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="看过我" name="second">
              <div class="lookBox">
                <!-- <div class="lookTitle">
                  <img class="bj" src="@/assets/image/job/lookTitleBj.png" alt="" />
                  <h2>看过我</h2>
                </div> -->
                <div class="lookCon">
                  <div
                    class="lookItem"
                    v-for="(item, index) in lookDataList"
                    :key="index"
                  >
                    <div class="lookLeft">
                      <h2 class="one-text">{{ item.userName }}</h2>
                      <p class="one-text">{{ item.companyName }}</p>
                    </div>
                    <div class="lookRight">
                      <h2 style="color: #666666">{{ item.positionName }}</h2>
                      <p style="text-align: right">
                        {{ item.lowSalary }}-{{ item.topSalary }}k
                      </p>
                    </div>
                  </div>
                  <div v-if="!lookDataList.length" class="nodata">
                    暂无数据~
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="adBox">
          <div
            class="adItem"
            v-for="(item, index) in adArr"
            :key="index"
            @click="bannerJump(item)"
          >
            <img :src="item.imgUrl" alt="" />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="fileShow"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-header">
        <div></div>
        <img
          src="@/assets/image/login/close.png"
          class="close-btn"
          @click="closeDialog"
        />
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
          <div class="accept-text">
            简历建议使用 PDF 文件，也支持DOC、DOCX、JPG、PNG 格式
          </div>
          <div class="size-text">文件大小不超过20M</div>
          <div class="upload-button">上传附件简历</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Home from "@/api/home";
import Job from "@/api/job";
import Auth from "@/api/auth";
import User from "@/api/userCenter";
import Seo from "../../api/seo";

import JobSearch from "@/component/Job/jobSearch";

export default {
  components: {
    JobSearch,
  },
  computed: {
    ...mapGetters(["userId", "cityName"]),
  },
  data() {
    return {
      fileShow: false,
      fileList: [],
      params: {
        type: 2,
      },
      vitaeId: null,

      location: "",
      locationArr: [
        {
          name: "南京",
        },
        {
          name: "北京",
        },
      ],
      searchStr: "",
      hotJobs: [],
      csArr: [],
      selectXz: "",
      selectXzArr: [],
      xzArr: [
        {
          startSalary: 0,
          endSalary: 3,
          name: "3k以下",
        },
        {
          startSalary: 3,
          endSalary: 5,
          name: "3k-5k",
        },
        {
          startSalary: 5,
          endSalary: 10,
          name: "5k-10k",
        },
        {
          startSalary: 10,
          endSalary: 20,
          name: "10k-20k",
        },
        {
          startSalary: 20,
          endSalary: 40,
          name: "20k-40k",
        },
        // {
        //   name: '自定义',
        // },
      ],
      selectJy: "",
      jyArr: [
        {
          name: "不限",
          id: "",
        },
        {
          name: "应届生",
          id: 1,
        },
        // {
        //   name: '实习生',
        // },
        {
          name: "1年以内",
          id: 2,
        },
        {
          name: "1-3年",
          id: 3,
        },
        {
          name: "3-5年",
          id: 4,
        },
        {
          name: "5-10年",
          id: 5,
        },
        {
          name: "10年以上",
          id: 6,
        },
      ],
      selectMore: ["", "", "", "", ""],
      moreArr: [
        {
          name: "公司行业",
        },
        {
          name: "职业类型",
        },
        {
          name: "求职类型",
        },
        {
          name: "学历要求",
        },
        {
          name: "公司规模",
        },
        {
          name: "融资阶段",
        },
      ],
      selectTArr: [],
      selectTIndex: -1,
      // filterTerms: [],
      selectCityInfo: {
        // pid: '914',
        // id: '915',
        // name: '南京市',
      },
      selectArea: "",
      areas: [],
      cardList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      lookArr: [],
      adArr: [],
      lookDataList: [],
      tabsName: "first",
      dynamicKeywords: '',
      dynamicDescription : ''
    };
  },
  mounted() {
    this.location = this.$route.query.cityName || this.cityName;
    // this.$bus.$emit('EVENT_SCROLL',0)
    console.log("userInfo", this.userId);
    if (this.$route.query.keyWords) {
      this.searchStr = this.$route.query.keyWords;
    }
    if (this.$route.query.jobTypeId) {
      this.selectMore.splice(1, 1, this.$route.query.jobTypeId);
    }
    this.getBannerList();
    this.queryHotPositionType();
    this.queryHotCityList();
    this.queryAllIndustryType();
    this.positionType();
    this.setMoreArr();
    // this.queryPositonByKeyWords()

    if (this.userId) {
      this.queryLookedPositionList();
      this.getUserInfo();
    }
  },

  methods: {
    async fetchMetaData() {
      let { endpoint, params } = this.$route.meta.fetchMetaData;
      let response = await Seo.getSeoInfo(params)
      this.dynamicKeywords = response.data.keyword;
      this.dynamicDescription = response.data.description;
    },
    async getUserInfo() {
      let params = { userId: this.userId };
      let res = await User.getUserInfo(params);
      if (res.code == 200) {
        this.lookDataList = res.data.lookDataList;
        console.log("lookDataList==>", this.lookDataList);
      }
    },
    getSelectCityInfo() {
      this.csArr.forEach((item) => {
        if (item.name.indexOf(this.location) > -1) {
          this.selectCityInfo = item;
          this.queryPositonByKeyWords();
        }
      });
    },
    bannerJump(banner) {
      this.$util.jumpLink(banner.type, banner.jumpUrl);
    },
    handlePreview() {},
    handleRemove() {
      if (!this.vitaeId) return;
      Auth.deleteResumeById({ vitaeId: this.vitaeId }).then((res) => {});
    },
    handleSuccess(res, file, fileList) {
      const params = {
        userId: this.userId,
        fileId: res.data.fileId,
      };
      const _this = this;
      Auth.userDetailEdit(params).then((res) => {
        _this.getResumeList();
      });
      _this.fileShow = false;
    },
    async getResumeList() {
      let res = await Auth.queryResumeByUserId({ userId: this.userId });
      this.vitaeId = res.data[0].vitaeId;
    },
    closeDialog() {
      this.fileShow = false;
    },
    currentChange(val) {
      if (val == this.currentPage) {
        return;
      }
      this.currentPage = val;
      this.queryPositonByKeyWords();
      this.$bus.$emit("EVENT_SCROLL", 400);
    },
    toInfo(item) {
      const { href } = this.$router.resolve({
        path: "/index/info",
        query: { id: item.id },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/info', query: { id: item.id } })
    },
    toCompay(item) {
      const { href } = this.$router.resolve({
        path: "/index/company",
        query: { id: item.companyId },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/company', query: { id: item.companyId } })
    },
    clickHotHob(item) {
      this.searchStr = item.typeName;
      this.queryPositonByKeyWords();
    },
    changeLocation(value) {
      this.location = value;
      // this.$store.commit('SET_NOW_CITY', value)
      this.getSelectCityInfo();
    },
    changeLocationAll(value) {
      console.log("value==>", value);
      this.location = value.name;
      this.selectCityInfo = value;
      this.queryPositonByKeyWords();
    },
    changeVal(value) {
      this.searchStr = value;
      // console.log(this.searchStr)
    },
    toChooseJy(item) {
      if (this.selectJy == item.id) {
        this.selectJy = "";
      } else {
        this.selectJy = item.id;
      }
      this.queryPositonByKeyWords();
    },
    toChooseXz(item) {
      // console.log(item)
      if (this.selectXz == item.name) {
        this.selectXz = "";
        this.selectXzArr = [];
      } else {
        this.selectXz = item.name;
        let selectXzArr = [];
        selectXzArr.push(item.startSalary);
        selectXzArr.push(item.endSalary);
        this.selectXzArr = selectXzArr;
      }
      this.queryPositonByKeyWords();
    },
    toChooseCity(item) {
      if (item == this.selectCityInfo) {
        this.selectCityInfo = {};
        this.selectArea = "";
        this.location = "不限";
      } else {
        this.selectCityInfo = item;
        this.selectArea = "";
        this.queryCityList();
        this.location = item.name;
      }
      this.queryPositonByKeyWords();
    },
    toChooseArea(item) {
      if (this.selectArea == item.zipcode) {
        this.selectArea = "";
      } else {
        if (item == -1) {
          this.selectArea = "";
        } else {
          this.selectArea = item.zipcode;
        }
      }
      this.queryPositonByKeyWords();
    },
    toChooseSelect(pIndex, item) {
      if (pIndex == 1) {
        if (this.selectMore[pIndex] == item.subId) {
          this.selectMore.splice(pIndex, 1, "");
        } else {
          this.selectMore.splice(pIndex, 1, item.subId);
        }
      } else {
        if (this.selectMore[pIndex] == item.id) {
          this.selectMore.splice(pIndex, 1, "");
        } else {
          this.selectMore.splice(pIndex, 1, item.id);
        }
      }
      // console.log(pIndex,this.selectMore)
      this.queryPositonByKeyWords();
    },
    async getBannerList() {
      let params = {
        bannerCode: "position",
      };
      let res = await Home.getBannerList(params);
      if (res.code == 200) {
        this.adArr = res.data;
      }
    },
    async queryPositonByKeyWords() {
      // let cityCode = this.selectArea === '' ? this.selectCityInfo.zipcode : this.selectArea
      // let cityCode = '320100'
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keyWords: this.searchStr,
        positionTypeId: this.selectMore[1] || "",
        cityCode: this.selectCityInfo.zipcode || "",
        areaCode: this.selectArea,
        recruitType: this.selectMore[2] || "",
        education: this.selectMore[3] || "",
        experience: this.selectJy || "",
        startSalary: this.selectXzArr[0],
        endSalary: this.selectXzArr[1] || "",
        companyIndustryId: this.selectMore[0] || "",
        companyScale: this.selectMore[4] || "",
        finance: this.selectMore[5] || "",
      };
      let res = await Job.queryPositonByKeyWords(params);
      if (res.code == 200) {
        this.cardList = res.data.list;
        this.total = res.data.total;
      }
    },
    async queryHotPositionType() {
      let params = {};
      let res = await Job.queryHotPositionType(params);
      if (res.code == 200) {
        this.hotJobs = res.data;
      }
    },
    async queryHotCityList() {
      let params = {};
      let res = await Job.queryHotCityList(params);
      if (res.code == 200) {
        this.csArr = res.data;
        this.getSelectCityInfo();
      }
    },
    async queryCityList() {
      let params = {
        regionLevel: 3,
        id: this.selectCityInfo.id,
      };
      let res = await Job.queryCityList(params);
      if (res.code == 200) {
        this.areas = res.data;
      }
    },
    async queryAllIndustryType() {
      let params = {
        keyWords: "",
        cityCode: "南京",
        positionTypeId: "",
      };
      let res = await Job.queryAllIndustryType(params);
      if (res.code == 200) {
        let obj = { ...this.moreArr[0] };
        obj.child = res.data;
        this.moreArr.splice(0, 1, obj);
      }
    },
    async positionType() {
      let res = await Home.positionType({});
      if (res.code == 200) {
        let obj = { ...this.moreArr[1] };
        obj.child = res.data;
        this.moreArr.splice(1, 1, obj);
        // this.selectTArr=res.data[0].childLists;
      }
    },
    async queryLookedPositionList() {
      let params = {
        personId: this.userId || "",
      };
      let res = await Job.queryLookedPositionList(params);
      if (res.code == 200) {
        this.lookArr = res.data;
      }
    },
    setMoreArr() {
      let arr2 = [
          {
            name: "社招",
            id: 1,
          },
          {
            name: "校招",
            id: 2,
          },
          {
            name: "海归",
            id: 3,
          },
          {
            name: "兼职",
            id: 4,
          },
        ],
        arr3 = [
          {
            name: "不限",
            id: "",
          },
          {
            name: "小学",
            id: 1,
          },
          {
            name: "初中",
            id: 2,
          },
          {
            name: "高中",
            id: 3,
          },
          {
            name: "大专",
            id: 4,
          },
          {
            name: "本科",
            id: 5,
          },
          {
            name: "硕士",
            id: 6,
          },
          {
            name: "博士",
            id: 7,
          },
        ],
        arr4 = [
          {
            name: "不限",
            id: "",
          },
          {
            name: "0-20人",
            id: 1,
          },
          {
            name: "20-99人",
            id: 2,
          },
          {
            name: "100-499人",
            id: 3,
          },
          {
            name: "500-999人",
            id: 4,
          },
          {
            name: "1000-9999人",
            id: 5,
          },
          {
            name: "10000+",
            id: 6,
          },
        ],
        arr5 = [
          {
            name: "不限",
            id: "",
          },
          {
            name: "未融资",
            id: 1,
          },
          {
            name: "天使轮",
            id: 2,
          },
          {
            name: "A轮",
            id: 3,
          },
          {
            name: "B轮",
            id: 4,
          },
          {
            name: "C轮",
            id: 5,
          },
          {
            name: "D轮及以上",
            id: 6,
          },
          {
            name: "已上市",
            id: 7,
          },
          {
            name: "不需要融资",
            id: 8,
          },
        ];
      let obj2 = { ...this.moreArr[2] },
        obj3 = { ...this.moreArr[3] },
        obj4 = { ...this.moreArr[4] },
        obj5 = { ...this.moreArr[5] };
      (obj2.child = arr2),
        (obj3.child = arr3),
        (obj4.child = arr4),
        (obj5.child = arr5);
      this.moreArr.splice(2, 1, obj2),
        this.moreArr.splice(3, 1, obj3),
        this.moreArr.splice(4, 1, obj4),
        this.moreArr.splice(5, 1, obj5);
    },
    selectSEnter(i, index) {
      if (i != 1) {
        return;
      }
      console.log(index);
      this.selectTIndex = index;
      this.selectTArr = this.moreArr[1].child[index].childLists;
    },
    selectTEnter() {
      this.selectTArr = this.moreArr[1].child[this.selectTIndex].childLists;
    },
    selectSLeave() {
      this.selectTArr = [];
    },
    toLog() {
      this.$router.push({ path: "/login" });
    },
    toJianli() {
      if (!this.userId) {
        this.$router.push({ path: "/login" });
        return;
      }
      this.fileShow = true;
    },
    toMuBan() {
      this.$router.push({ path: "/resumeMake" });
    },
  },
  created() {
    this.fetchMetaData()
  },
  metaInfo() {
    return {
      meta: [{ name: "keywords", content: this.dynamicKeywords }, {name: "description", content: this.dynamicDescription}],
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css");
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
.tabs-box {
  background-color: #fff;
  margin-top: 20px;
  ::v-deep .el-tabs__header {
    margin-bottom: 0 !important;
    .el-tabs__nav-wrap {
      padding-left: 10px;
    }
  }
  .nodata {
    padding-top: 60px;
    font-size: 14px;
  }
}
#app {
  min-width: $nx-width;
  .main {
    background: linear-gradient(
      180deg,
      rgba(36, 70, 168, 0.25) 0%,
      rgba(36, 70, 168, 0) 100%
    );
    padding: 20px 0;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    overflow-y: auto;
  }
  .jobBox {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 32px 20px;
    box-sizing: border-box;
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
        cursor: pointer;
      }
    }
    .hotJobBox {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #929ab0;
      padding: 16px 0;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      .hotJob {
        display: flex;
        margin-left: 4px;
        .hotJobItem {
          margin: 0 12px;
          cursor: pointer;
        }
      }
    }
    .filterBox {
      .filterItem {
        padding: 16px 0;
        font-size: 14px;
        border-bottom: 1px dotted #e8ebf0;
        .filterCon {
          display: flex;
          // align-items: center;
          .filterConMore h2 {
            line-height: 32px;
          }
          h2 {
            color: #222222;
            font-weight: 600;
            flex-shrink: 0;
          }
          .termBox {
            display: flex;
            flex-wrap: wrap;
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
              .selectTBox {
                padding-left: 30px;
                position: absolute;
                left: 115px;
                top: 35px;
                z-index: 100000;
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
          // height: 40px;
          background: #f8f9fc;
          border-radius: 4px 4px 4px 4px;
          display: flex;
          flex-wrap: wrap;
          // align-items: center;
          margin-top: 8px;
          padding: 8px 8px;
          line-height: 24px;
          p {
            color: #333333;
            margin-right: 20px;
            cursor: pointer;
            flex-shrink: 0;
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
  .jobCardBox {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .jobCardLeft {
      width: 884px;
      // margin-right: 20px;
      .cardBox {
        // height: 1650px;
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
                text-align: left;
              }
            }
            .cardTopRight {
              display: flex;
              align-items: flex-end;
              padding-bottom: 1px;
              position: relative;
              z-index: 100;
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
          .cardBottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
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
    .jobCardright {
      width: 284px;
      .uploadBox {
        width: 100%;
        height: 212px;
        background: #fff;
        .uploadCon {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .uploadBj1 {
          z-index: 1;
        }
        .uploadBj2 {
          z-index: 10;
        }
        button {
          position: relative;
          z-index: 10;
          width: 195px;
          height: 40px;
          background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
          border-radius: 4px 4px 4px 4px;
          font-size: 14px;
          color: #ffffff;
          border: none;
          cursor: pointer;
        }
      }
      .lookBox {
        background: #fff;
        padding-top: 2px;
        .lookTitle {
          width: 280px;
          height: 50px;
          position: relative;
          font-size: 16px;
          color: #3d3d3d;
          display: flex;
          align-items: center;
          padding-left: 22px;
          box-sizing: border-box;
          margin-left: 2px;
          h2 {
            font-weight: 700;
          }
        }
        .lookCon {
          padding: 0 24px 19px 24px;
          min-height: 129px;
          // margin-top: 19px;
          .lookItem {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            p {
              font-size: 12px;
              color: #666666;
              line-height: 17px;
            }
            .lookLeft {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              h2 {
                width: 124px;
                font-size: 16px;
                color: #3d3d3d;
                line-height: 22px;
                margin-bottom: 4px;
                text-align: left;
                font-weight: 600;
              }
              p {
                width: 124px;
                text-align: left;
              }
            }
            .lookRight {
              h2 {
                font-size: 14px;
                color: #f44335;
                line-height: 20px;
              }
            }
          }
        }
      }
      .adBox {
        .adItem {
          width: 284px;
          height: 200px;
          margin-top: 16px;
          border: 1px dotted #e8ebf0;
          box-sizing: border-box;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
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
