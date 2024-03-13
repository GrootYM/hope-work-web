<!-- 首页 -->
<template>
  <div class="main">
    <!-- <img class="bg1" src="@/assets/image/job/bg1.png" alt="" /> -->
    <div class="jobInfoBox">
      <div class="jobInfoCon">
        <p class="status">{{ jobInfo.status }}</p>
        <div class="jobInfo">
          <h2>
            {{ jobInfo.positionName
            }}<span>{{ jobInfo.lowSalary }}-{{ jobInfo.topSalary }}k</span>
          </h2>
          <div class="jobLabel">
            <p v-for="(item, index) in company.benefitsName" :key="index">
              {{ item }}
            </p>
          </div>
        </div>
        <div class="jobDesc">
          <p>
            <img src="@/assets/image/job/dw.png" alt="" />{{ jobInfo.cityName }}
          </p>
          <p>
            <img src="@/assets/image/job/gzjy.png" alt="" />{{
              jobInfo.experience
            }}
          </p>
          <p>
            <img src="@/assets/image/job/xl.png" alt="" />{{
              jobInfo.education
            }}
          </p>
        </div>
        <div class="jobAbout">
          <div @click="toInter">
            <img
              v-if="!jobInfo.collect"
              src="@/assets/image/job/likeIcon.png"
              alt=""
            />
            <img
              v-if="jobInfo.collect"
              src="@/assets/image/job/likedIcon.png"
              alt=""
            />
            <p>{{ jobInfo.collect ? "取消感兴趣" : "感兴趣" }}</p>
          </div>
          <div @click="toImmediately">
            <p>立即沟通</p>
          </div>
        </div>
        <div class="vitaAbout">
          <div @click="toMuBan">
            <img src="@/assets/image/job/icon1.png" alt="" />
            <p>在线完善简历</p>
          </div>
          <div @click="toJianli">
            <img src="@/assets/image/job/icon2.png" alt="" />
            <p>上传附件简历</p>
          </div>
        </div>
      </div>
    </div>
    <div class="jobIntro">
      <div class="introLeft">
        <div class="introBox">
          <div class="titleBox">
            <h2>职位描述</h2>
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
          <div class="jobLabel">
            <p v-for="(item, index) in jobInfo.zws" :key="index">
              {{ item.name }}
            </p>
          </div>
          <div class="jobSecBox">
            <!-- <h2>岗位职责：</h2> -->
            <div>
              <p
                v-html="jobInfo.responsibility"
                style="white-space: pre-wrap"
              ></p>
              <!-- <p>{{ jobInfo.responsibility }}</p> -->
            </div>
          </div>
          <!-- <div class="jobSecBox">
            <h2>任职要求：</h2>
            <div>
              <p>{{ jobInfo.skillRequire }}</p>
            </div>
          </div> -->
          <div class="zpBox" v-if="bossInfo.userName">
            <img :src="bossInfo.headImg" alt="" />
            <div class="zpInfo">
              <h2>{{ bossInfo.userName }}</h2>
              <p>{{ bossInfo.companyName }}·{{ bossInfo.roleName }}</p>
            </div>
          </div>
        </div>
        <div class="saveBox">
          <img class="bj" src="@/assets/image/job/saveBj.png" alt="" />
          <h2 class="title">安全提示</h2>
          <p>
            {{ anquan }}请立即举报
            <!-- <span>请立即举报</span> -->
          </p>
          <img class="saveIcon" src="@/assets/image/job/saveIcon.png" alt="" />
        </div>
        <div class="introBox mt20">
          <div class="titleBox">
            <h2>公司介绍</h2>
          </div>
          <p>{{ company.introduce }}</p>
          <div class="businessBox">
            <div class="titleBox">
              <h2>工商信息</h2>
            </div>
            <div class="businessCon">
              <div class="businessItem1">
                <div>
                  <h2>公司名称</h2>
                  <p>{{ company.companyName }}</p>
                </div>
                <div>
                  <h2>企业类型</h2>
                  <p>{{ company.companyType }}</p>
                </div>
              </div>
              <div class="businessItem2">
                <div>
                  <h2>法定代表人</h2>
                  <p>{{ company.legalUser }}</p>
                </div>
                <div>
                  <h2>经营状态</h2>
                  <p>{{ company.businessStatus }}</p>
                </div>
              </div>
              <div class="businessItem3">
                <div>
                  <h2>成立日期</h2>
                  <p>{{ company.establishTime }}</p>
                </div>
                <div>
                  <h2>注册资金</h2>
                  <p v-if="company.registeredCapital > 0">
                    {{ company.registeredCapital }}万
                  </p>
                </div>
              </div>
              <div class="moreBox" @click="toCompany">
                <p>查看更多</p>
                <img src="@/assets/image/job/bottom.png" alt="" />
              </div>
            </div>
          </div>
          <div class="locationBox">
            <div class="titleBox">
              <h2>工作地址</h2>
            </div>
            <div class="locationCon">
              <!-- <div class="locationItem" v-for="(item, index) in locations" :key="index">
                <div :class="[mapIndex == index ? 'showMap' : '']">
                  <img src="@/assets/image/job/locationIcon.png" alt="" />
                  <p>{{ item.name }}</p>
                </div>
                <img v-if="mapIndex == index" :src="item.map" alt="" />
              </div> -->
              <div class="locationItem">
                <div class="showMap">
                  <img src="@/assets/image/job/locationIcon.png" alt="" />
                  <p>{{ jobInfo.workAddress }}</p>
                </div>
                <Map v-if="position[0]" :position="position" />
                <!-- <img src="@/assets/image/job/map.png" alt="" /> -->
              </div>
            </div>
          </div>
        </div>
        <div class="introBox mt20">
          <div class="titleBox">
            <h2>看过该职位的人还看了</h2>
            <div class="titleRight blueBox" @click="toAllJob">
              <p>
                更多职位
                <img src="@/assets/image/job/right.png" alt="" />
              </p>
            </div>
          </div>
          <div class="lookCon">
            <div
              class="lookItem"
              @click.stop="toInfo(item)"
              v-for="(item, index) in lookArr"
              :key="index"
            >
              <div class="lookLeft">
                <h2 class="one-text">{{ item.positionName }}</h2>
                <p class="one-text" @click.stop="toCompany(1, item)">
                  {{ item.companyName }}
                </p>
              </div>
              <div class="lookRight">
                <h2>
                  {{ item.lowSalary }}-{{ item.topSalary }}k·{{
                    item.yearSalary
                  }}薪
                </h2>
                <p>{{ item.cityName }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="introBox mt20">
          <div class="titleBox">
            <h2>精选职位</h2>
          </div>
          <el-carousel
            indicator-position="outside"
            arrow="never"
            :interval="30000"
          >
            <el-carousel-item v-for="(item, index) in careArr" :key="index">
              <div class="lookCon">
                <div
                  class="lookItem"
                  @click.stop="toInfo(item1)"
                  v-for="(item1, index1) in item"
                  :key="index1"
                >
                  <div class="lookLeft">
                    <h2 class="one-text">{{ item1.positionName }}</h2>
                    <p class="one-text" @click.stop="toCompany(1, item1)">
                      {{ item1.companyName }}
                    </p>
                  </div>
                  <div class="lookRight">
                    <h2>
                      {{ item1.lowSalary }}-{{ item1.topSalary }}k·{{
                        item1.yearSalary
                      }}薪
                    </h2>
                    <p>{{ item1.cityName }}</p>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <!-- <div class="searchJobBtnBox">
            <div class="searchJobBox">
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
            </div>
          </div> -->
          <JobSearch
            :location="location"
            :searchStr="searchStr"
            :hotCity="recommendArr"
            @change="changeLocation($event)"
            @changeV="changeVal($event)"
            @search="toJob"
          />
        </div>
        <div class="introBox recommendBox">
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
            <div
              class="recommendItem"
              v-for="(item, index) in recommendArr"
              :key="index"
            >
              <p>{{ item.name || item.industryName || item.companyName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="introRight">
        <div class="bossBox">
          <div class="lookTitle">
            <img class="bj" src="@/assets/image/job/lookTitleBj.png" alt="" />
            <h2>公司基本信息</h2>
          </div>
          <div class="compayInfoBox" @click="toCompany">
            <img :src="company.headUrl" alt="" />
            <h2>{{ company.companyName }}</h2>
          </div>
          <div class="workTimeCon">
            <div class="workTimeItem">
              <img src="@/assets/image/job/icon5.png" alt="" />
              <p>{{ company.finance }}</p>
            </div>
            <div class="workTimeItem">
              <img src="@/assets/image/job/icon7.png" alt="" />
              <p>{{ company.companyScale }}</p>
            </div>
            <div class="workTimeItem">
              <img src="@/assets/image/job/icon6.png" alt="" />
              <p>{{ company.industryName }}</p>
            </div>
          </div>
          <div class="moreJob" @click="toCompanyAllJob">
            <p>查看全部职位</p>
          </div>
        </div>
        <div class="bossBox mt20">
          <div class="lookTitle">
            <img class="bj" src="@/assets/image/job/lookTitleBj.png" alt="" />
            <h2>相似职位</h2>
          </div>
          <div class="bossCon">
            <div class="lookCon">
              <div
                class="lookItem"
                v-for="(item, index) in similarArr"
                :key="index"
              >
                <div class="lookLeft">
                  <h2 class="one-text">{{ item.positionName }}</h2>
                  <p class="one-text">{{ item.companyName }}</p>
                </div>
                <div class="lookRight">
                  <h2 v-if="item.lowSalary && item.topSalary">
                    {{ item.lowSalary }}-{{ item.topSalary }}k
                  </h2>
                  <p>{{ item.cityName }}·{{ item.areaName }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="moreJob" @click="toAllJob">
            <p>查看全部职位</p>
          </div>
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
import Map from "@/component/Job/map";
import JobSearch from "@/component/Job/jobSearch";

export default {
  components: {
    Map,
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
      // position: [121.5273285, 31.21515044],
      position: [],
      id: "",
      adArr: [],
      recommendArr: [],
      tabActive: 0,
      tabArr: [
        {
          name: "热门城市",
        },
        {
          name: "热门行业",
        },
        {
          name: "热门企业",
        },
      ],
      location: "",
      searchStr: "",
      anquan:
        "严禁用人单位和招聘者用户做出任何损害求职者合法权益的违法违规行为，包括但不限于扣押求职者证件、收取求职者财物、向求职者集资、让求职者入股、诱导求职者异地入职、异地参加培训、违法违规使用求职者简历等，您一旦发现此类行为，",
      jobInfo: {},
      bossInfo: {},
      mapIndex: 0,
      locations: [
        {
          name: "南京雨花台区南京天溯科技园1层",
          map: require("@/assets/image/job/map.png"),
        },
        {
          name: "上海黄浦区都市总部大楼",
          map: require("@/assets/image/job/map.png"),
        },
        {
          name: "广州番禺区恒峰大厦地铁7号线员岗站(C出口)",
          map: require("@/assets/image/job/map.png"),
        },
      ],
      company: {},
      similarArr: [],
      careArr: [],
      lookArr: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.$bus.$emit("EVENT_SCROLL", 0);
    }, 500);
    this.id = this.$route.query.id;
    this.queryPositionInfoByPerson();
    this.getLookArr();
    this.queryHotPositonByIndustry();
    this.getRecommend();
    // this.getBannerList();
    this.location = this.cityName;
  },
  methods: {
    changeLocation(value) {
      this.location = value;
      // this.$store.commit('SET_NOW_CITY', value)
    },
    changeVal(value) {
      this.searchStr = value;
    },
    toJob() {
      this.$router.push({
        path: "/index/job",
        query: { cityName: this.location, keyWords: this.searchStr },
      });
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
    async getBannerList() {
      let params = {
        bannerCode: "position_info",
      };
      let res = await Home.getBannerList(params);
      if (res.code == 200) {
        this.adArr = res.data;
      }
    },
    bannerJump(banner) {
      this.$util.jumpLink(banner.type, banner.jumpUrl);
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
    toCompany(type, item) {
      if (type == 1) {
        const { href } = this.$router.resolve({
          path: "/index/company",
          query: { id: item.companyId },
        });
        window.open(href, "_blank");
        // this.$router.push({ path: '/index/company', query: { id: item.companyId } })
      } else {
        const { href } = this.$router.resolve({
          path: "/index/company",
          query: { id: this.company.id },
        });
        window.open(href, "_blank");
        // this.$router.push({ path: '/index/company', query: { id: this.company.id } })
      }
    },
    toCompanyAllJob() {
      const { href } = this.$router.resolve({
        path: "/index/company",
        query: { id: this.company.id, tabId: 2 },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/company', query: { id: this.company.id, tabId: 2 } })
    },
    toAllJob() {
      this.$router.push({ path: "/index/job" });
    },
    toInfo(item) {
      const { href } = this.$router.resolve({
        path: "/index/info",
        query: { id: item.id },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/info', query: { id: item.id } })
    },
    // 立即沟通
    toImmediately() {
      sessionStorage.setItem("jobInfo", JSON.stringify(this.jobInfo));
      const { href } = this.$router.resolve({
        path: "/index/immediately",
        query: {},
      });
      window.open(href, "_blank");
      // this.$router.push({
      //   path: '/index/immediately',
      // })
    },
    async queryPositionInfoByPerson() {
      let params = {
        id: this.id || "",
        personId: this.userId || "",
      };
      let res = await Job.queryPositionInfoByPerson(params);
      if (res.code == 200) {
        this.jobInfo = res.data;
        this.bossInfo = res.data.userInfo || {};
        this.company = res.data.companyInfo || {};
        this.position.push(res.data.longitude - 0);
        this.position.push(res.data.latitude - 0);
        this.queryPositonByKeyWords();
      }
    },
    async queryPositonByKeyWords() {
      let params = {
        currentPage: 1,
        pageSize: 8,
        keyWords: this.jobInfo.positionName,
      };
      let res = await Job.queryPositonByKeyWords(params);
      if (res.code == 200) {
        this.similarArr = res.data.list;
      }
    },
    async getLookArr() {
      let params = {
        currentPage: 1,
        pageSize: 6,
        companyIndustryId: null,
      };
      let res = await Job.queryHotPositonByIndustry(params);
      if (res.code == 200) {
        this.lookArr = res.data.list;
      }
    },
    async queryHotPositonByIndustry() {
      let params = {
        currentPage: 1,
        pageSize: 12,
        companyIndustryId: null,
      };
      let res = await Job.queryHotPositonByIndustry(params);
      if (res.code == 200) {
        let arr = [];
        if (res.data.list.length < 6) {
          this.careArr.push(res.data.list);
        } else {
          res.data.list.forEach((item) => {
            if (arr.length < 6) {
              arr.push(item);
            } else {
              this.careArr.push(arr);
              arr = [];
            }
          });
          if (arr.length < 6) {
            this.careArr.push(arr);
            arr = [];
          }
        }
      }
    },
    toCheckTab(index) {
      if (index == this.tabActive) {
        return;
      }
      this.tabActive = index;
      this.getRecommend();
    },
    getRecommend() {
      switch (this.tabActive) {
        case 0:
          this.queryHotCityList();
          break;
        case 1:
          this.queryHotIndustryType();
          break;
        case 2:
          this.queryHotCompanyList();
          break;
        default:
          break;
      }
    },
    async queryHotCityList() {
      let params = {};
      let res = await Job.queryHotCityList(params);
      if (res.code == 200) {
        this.recommendArr = res.data;
      }
    },
    async queryHotIndustryType() {
      let params = {};
      let res = await Job.queryHotIndustryType(params);
      if (res.code == 200) {
        this.recommendArr = res.data;
      }
    },
    async queryHotCompanyList() {
      let params = {
        currentPage: 1,
        pageSize: 10,
      };
      let res = await Job.queryHotCompanyList(params);
      if (res.code == 200) {
        this.recommendArr = res.data.list;
      }
    },
    async toInter() {
      if (!this.userId) {
        this.$router.push({ path: "/login" });
      } else {
        let params = {
          id: this.jobInfo.id,
          personId: this.userId,
        };
        let res;
        if (this.jobInfo.collect) {
          res = await Job.deleteUserCollectPosition(params);
        } else {
          res = await Job.addUserCollectPosition(params);
        }
        if (res.code == 200) {
          this.queryPositionInfoByPerson();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css");
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
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
  }
  .lookCon {
    display: flex;
    flex-wrap: wrap;
    .lookItem {
      padding: 16px 16px 18px 16px;
      box-sizing: border-box;
      width: 262px;
      height: 94px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      margin-right: 16px;
      border-radius: 2px 2px 2px 2px;
      border: 1px solid rgba(36, 70, 168, 0.1);
      cursor: pointer;
      p {
        font-size: 12px;
        color: #666666;
        line-height: 17px;
      }
      .lookLeft {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        h2 {
          width: 124px;
          font-size: 16px;
          color: #3d3d3d;
          line-height: 22px;
          margin-bottom: 4px;
          text-align: left;
        }
        p {
          width: 124px;
          text-align: left;
          cursor: pointer;
        }
      }
      .lookRight {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        h2 {
          font-size: 14px;
          color: #f44335;
          line-height: 20px;
        }
      }
    }
    .lookItem:nth-child(3n) {
      margin-right: 0;
    }
  }
  .jobLabel {
    display: flex;
    p {
      width: 72px;
      height: 25px;
      background: rgba(243, 245, 249, 0.1);
      border-radius: 4px 4px 4px 4px;
      text-align: center;
      line-height: 25px;
      color: #fff;
      font-size: 12px;
      margin-left: 8px;
    }
  }
  .jobInfoBox {
    width: 100%;
    height: 210px;
    background: #293b60;
    .jobInfoCon {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .status {
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        padding-top: 16px;
        text-align: left;
      }
      .jobInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        h2 {
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          line-height: 39px;
          span {
            color: #ff733c;
            margin-left: 32px;
          }
        }
      }
      .jobDesc {
        display: flex;
        align-items: center;
        margin-top: 16px;
        p {
          font-size: 14px;
          line-height: 20px;
          color: #fff;
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
        margin-top: 18px;
        > div {
          width: 134px;
          height: 45px;
          background: rgba(255, 255, 255, 0);
          border-radius: 4px 4px 4px 4px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          font-size: 18px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 16px;
          cursor: pointer;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
        > div:nth-child(2) {
          width: 126px;
          border: none;
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
          cursor: pointer;
          img {
            width: 22px;
            height: 22px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .jobIntro {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 16px;
    .introLeft {
      width: 884px;
      // border-radius: 4px 4px 4px 4px;
      // background: #ffffff;
      // padding: 24px 32px;
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
        position: relative;
        border-radius: 4px 4px 4px 4px;
        background: #ffffff;
        padding: 24px 32px;
        box-sizing: border-box;
        > p {
          font-size: 15px;
          color: #222222;
          line-height: 28px;
          text-align: left;
        }
      }
      .jobLabel p {
        background: #f3f5f9;
        color: #666666;
        margin-bottom: 16px;
        margin-right: 8px;
        margin-left: 0;
      }
      .jobSecBox {
        color: #222222;
        font-size: 14px;
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
        height: 56px;
        margin-top: 40px;
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
      .saveBox {
        width: 100%;
        height: 196px;
        margin-top: 18px;
        position: relative;
        border-radius: 4px 4px 4px 4px;
        background: #ffffff;
        padding: 24px 32px;
        box-sizing: border-box;
        > p {
          width: 624px;
          font-size: 15px;
          color: #222222;
          line-height: 28px;
          text-align: left;
          span {
            color: #ff8032;
          }
        }
        .saveIcon {
          width: 290px;
          height: 196px;
          position: absolute;
          right: 0;
          top: 0;
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
      .titleBox .titleRight.blueBox {
        color: #2446a8;
      }
      .el-carousel__container {
        height: 220px;
      }
      .el-carousel__indicator--horizontal {
        padding: 0;
        width: 8px;
        height: 8px;
        background: #2446a8;
        border-radius: 50%;
        opacity: 0.1;
        margin: 0 8px;
      }
      .el-carousel__indicator--horizontal.is-active {
        width: 16px;
        height: 8px;
        background: #2446a8;
        opacity: 1;
        border-radius: 58px 58px 58px 58px;
      }
      .el-carousel__button {
        display: none;
      }
      .searchJobBtnBox {
        display: flex;
        margin-top: 24px;
        .searchJobBox {
          display: flex;
          align-items: center;
          width: 100%;
          height: 48px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid rgba(36, 70, 168, 0.3);
          font-size: 16px;
          .selBox {
            width: 124px;
            height: 100%;
            position: relative;
            padding: 0 16px 0 24px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .selIcon img {
              width: 12px;
              height: 12px;
            }
          }
          .selBox::after {
            content: "";
            width: 1px;
            height: 22px;
            background: #bec4d4;
            display: block;
            position: absolute;
            top: 13px;
            right: 0;
          }
          .searchBox {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 16px;
            box-sizing: border-box;
            img {
              width: 12px;
              height: 12px;
            }
            input {
              flex: 1;
              height: 100%;
              padding-left: 6px;
            }
          }
          button {
            width: 122px;
            height: 44px;
            background: #2446a8;
            border-radius: 2px;
            color: #ffffff;
            font-size: 18px;
            margin-right: 1px;
          }
        }
      }
      .recommendBox {
        padding: 20px 32px;
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
    .introRight {
      width: 284px;
      .bossBox {
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        padding-bottom: 24px;
        .compayInfoBox {
          display: flex;
          align-items: center;
          padding: 0 24px;
          margin-top: 25px;
          cursor: pointer;
          img {
            width: 54px;
            height: 54px;
            border-radius: 4px 4px 4px 4px;
            border: 1px solid rgba(36, 70, 168, 0.1);
            margin-right: 16px;
          }
          h2 {
            font-size: 16px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #3d3d3d;
            line-height: 22px;
            text-align: left;
          }
        }
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
        .bossCon {
          padding: 0 24px;
          margin-top: 20px;
          .lookItem {
            border: none;
            height: 44px;
            padding: 0;
            margin-right: 0;
            margin-bottom: 24px;
          }
          .lookItem:last-child {
            margin-bottom: 0;
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
          margin-top: 32px;
          cursor: pointer;
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
