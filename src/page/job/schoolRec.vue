<template>
  <div class="main" @click="clickMain">
    <img class="adImg" :src="adImg.imgUrl" alt="" @click="bannerJump(adImg)" />
    <div class="searchRecBox">
      <div class="searchRecCon">
        <div class="searchRecTab">
          <p class="active">找全职</p>
          <!-- <p>找实习</p> -->
        </div>
        <div class="searchJobBtnBox">
          <JobSearch
            :location="location"
            :searchStr="searchStr"
            :hotCity="csArr"
            :showClear="false"
            @change="changeLocation($event)"
            @changeV="changeVal($event)"
            @search="toJob(1)"
          />
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
            <button @click="toJob(1)">搜索</button>
          </div> -->
        </div>
      </div>
    </div>
    <div class="screenBox">
      <div class="screenLeft">
        <div class="screenTitle">
          <img src="@/assets/image/job/icon8.png" alt="" />
          <p>按职类筛选</p>
        </div>
        <div class="screenCon">
          <div
            :class="specialityIndex == index ? 'active' : ''"
            @click.stop="toChooseZl(index)"
            v-for="(item, index) in specialityArr"
            :key="index"
          >
            <span>{{ item.pname }}</span>
            <img
              v-if="specialityIndex == index"
              src="@/assets/image/job/right.png"
              alt=""
            />
          </div>
        </div>
        <div class="screenInfoBox" v-if="specialityIndex > -1">
          <div class="screenInfoCon">
            <div
              class="screenInfoItem"
              v-for="(item, index) in specialityInfo"
              :key="index"
            >
              <h2>{{ item.typeName }}</h2>
              <div class="subInfoBox">
                <p
                  class="subInfoItem"
                  @click="toJob(2, item1)"
                  v-for="(item1, index1) in item.subChildLists"
                  :key="index1"
                >
                  {{ item1.subTypeName }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="screenAd screenCenter">
        <div>
          <img :src="ad1.imgUrl" alt="" @click="bannerJump(ad1)" />
        </div>
        <div>
          <img :src="ad2.imgUrl" alt="" @click="bannerJump(ad2)" />
        </div>
      </div>
      <div class="screenAd screenRight">
        <div
          v-for="(item, index) in ad3Arr"
          :key="index"
          @click="bannerJump(item)"
        >
          <img :src="item.imgUrl" alt="" />
        </div>
      </div>
    </div>
    <!-- <div class="hopeJobBox">
      <div class="hopeJobTitle">
        <h2>热门职位</h2>
        <div class="hopeJobTab">
          <p :class="[nowTab == item.name ? 'active' : '']" v-for="(item, index) in jobTabs" :key="index">
            {{ item.name }}
          </p>
        </div>
      </div>
      <div class="hopeJobCards">
        <div class="hopeJobItem" v-for="(item, index) in jobArr" :key="index">
          <img class="bjW" src="@/assets/image/job/hopeBj.png" alt="" />
          <div class="label">校招</div>
          <div class="hopeJobInfo">
            <img :src="item.img" alt="" />
            <div class="hopeJobCompany">
              <h2>{{ item.name }}</h2>
              <div class="cardLabel">
                <p v-for="(item1, index1) in item.tabs" :key="index1">{{ item1 }}</p>
              </div>
            </div>
          </div>
          <div class="hopeTabBox">
            <p v-for="(item2, index2) in item.welfares" :key="index2">{{ item2 }}</p>
          </div>
          <div class="hopeOther">
            <p>校招职位</p>
            <p>实习职位</p>
            <p>公司评价</p>
          </div>
        </div>
      </div>
    </div> -->
    <div class="hopeJobBox hopeSJobBox">
      <div class="hopeJobTitle">
        <h2>热门校招</h2>
        <div class="hopeJobTab">
          <!-- <p class="active">全职</p> -->
<!--          <p :class="[recruitType == 2 ? 'active' : '']" @click="toQie(2)">-->
<!--            校招-->
<!--          </p>-->
<!--          <p :class="[recruitType == 4 ? 'active' : '']" @click="toQie(4)">-->
<!--            兼职-->
<!--          </p>-->
        </div>
      </div>
      <div class="hopeJobCards">
        <div
          class="hopeJobItem"
          @click.stop="toInfo(item.id)"
          v-for="(item, index) in jobsArr"
          :key="index"
        >
          <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
          <div class="hopeSJob">
            <div class="hopeSJobInfo">
              <h2>{{ item.positionName }}</h2>
              <p v-if="item.lowSalary && item.topSalary">
                {{ item.lowSalary }}-{{ item.topSalary }}k
              </p>
            </div>
            <div class="cardLabel">
              <p>{{ item.cityName }}</p>
              <p>{{ item.experience }}</p>
              <p>{{ item.education }}</p>
              <p>{{ item.roleName }}</p>
              <!-- <p v-for="(item1, index1) in item.labels" :key="index1">{{ item1 }}</p> -->
            </div>
          </div>
          <div class="hopeJobInfo" @click.stop="toCompay(item.companyId)">
            <img :src="item.headUrl" alt="" />
            <div class="hopeJobCompany">
              <h2>{{ item.companyName }}</h2>
              <div class="cardLabel">
                <p v-if="item.companyIndustryName">
                  {{ item.companyIndustryName }}
                </p>
                <p v-if="item.companyScale">{{ item.companyScale }}</p>
                <p v-if="item.finance">{{ item.finance }}</p>
                <!-- <p v-for="(item1, index1) in item.tabs" :key="index1">{{ item1 }}</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lookMoreBtn" @click="toMore">
        <p>查看更多</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import School from "@/api/school";
import Job from "@/api/job";
import JobSearch from "@/component/Job/jobSearch";

export default {
  components: {
    JobSearch,
  },
  props: {},
  computed: {
    ...mapGetters(["cityName"]),
  },
  data() {
    return {
      searchStr: "",
      adImg: {},
      specialityIndex: -1,
      specialityArr: [],
      specialityInfo: {},
      ad1: {},
      ad2: {},
      ad3Arr: [],
      location: "",
      locationArr: [
        {
          name: "南京",
        },
        {
          name: "北京",
        },
      ],
      jobTabs: [
        {
          name: "南京",
        },
        {
          name: "北京",
        },
        {
          name: "上海",
        },
        {
          name: "广州",
        },
      ],
      nowTab: "南京",
      jobArr: [],
      jobsArr: [],
      currentPage: 1,
      pageSize: 9,
      recruitType: 2, //2校招，4兼职
      csArr: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.$bus.$emit("EVENT_SCROLL", 0);
    }, 500);
    this.queryHotPosition();
    this.bannerList();
    this.bannerList1();
    this.positionType();
    this.queryHotCityList();
    this.location = this.cityName;
  },
  methods: {
    toMore() {
      this.$router.push({ path: "/index/job" });
    },
    changeLocation(value) {
      this.location = value;
      // this.$store.commit('SET_NOW_CITY', value)
    },
    changeVal(value) {
      this.searchStr = value;
    },
    async queryHotCityList() {
      let params = {};
      let res = await Job.queryHotCityList(params);
      if (res.code == 200) {
        this.csArr = res.data;
      }
    },
    async queryHotPosition() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        recruitType: this.recruitType, //2校招，4兼职
      };
      let res = await School.queryHotPosition(params);
      if (res.code == 200) {
        this.jobsArr = res.data.list;
      }
    },
    async bannerList() {
      let params = {
        bannerCode: "school_banner",
      };
      let res = await School.bannerList(params);
      if (res.code == 200) {
        this.adImg = res.data[0] || {};
      }
    },
    async bannerList1() {
      let params = {
        bannerCode: "school",
      };
      let res = await School.bannerList(params);
      if (res.code == 200) {
        // this.adImg = res.data[0] || {}
        this.ad1 = res.data[0] || {};
        this.ad2 = res.data[1] || {};
        res.data[2] && this.ad3Arr.push(res.data[2]);
        res.data[3] && this.ad3Arr.push(res.data[3]);
        res.data[4] && this.ad3Arr.push(res.data[4]);
      }
    },
    bannerJump(banner) {
      this.$util.jumpLink(banner.type, banner.jumpUrl);
    },
    async positionType() {
      let params = {};
      let res = await School.positionType(params);
      if (res.code == 200) {
        this.specialityArr = res.data;
        this.specialityIndex = -1;
        // this.specialityInfo=this.specialityArr[0].childLists;
      }
    },
    clickMain() {
      this.specialityIndex = -1;
    },
    toChooseZl(index) {
      this.specialityIndex = index;
      this.specialityInfo = this.specialityArr[index].childLists;
    },
    toInfo(id) {
      const { href } = this.$router.resolve({
        path: "/index/info",
        query: { id: id },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/info', query: { id: id } })
    },
    toCompay(id) {
      const { href } = this.$router.resolve({
        path: "/index/company",
        query: { id: id },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/company', query: { id: id } })
    },
    toJob(type, item) {
      if (type == 1) {
        this.$router.push({
          path: "/index/job",
          query: { cityName: this.location, keyWords: this.searchStr },
        });
      } else {
        this.$router.push({
          path: "/index/job",
          query: { jobTypeId: item.subId },
        });
      }
    },
    toQie(type) {
      this.recruitType = type;
      this.queryHotPosition();
    },
  },
  metaInfo() {
    return {
      meta: [{ name: "viewport", content: this.$route.meta.keywords }],
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: linear-gradient(
    180deg,
    rgba(36, 70, 168, 0.25) 0%,
    rgba(36, 70, 168, 0) 100%
  );
  box-sizing: border-box;
  position: relative;
}
.searchJobBtnBox {
  display: flex;
  .searchJobBox {
    display: flex;
    align-items: center;
    width: 900px;
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
.searchRecBox {
  width: 100%;
  height: 200px;
  background: #fff;
  .searchRecCon {
    width: 900px;
    margin: 0 auto;
    // margin-top: 60px;
    .searchRecTab {
      width: 260px;
      display: flex;
      border-radius: 4px;
      overflow: hidden;
      padding-top: 60px;
      box-sizing: border-box;
      p {
        width: 130px;
        height: 40px;
        color: #333333;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        background: rgba(36, 70, 168, 0.1);
      }
      .active {
        color: #fff;
        border-radius: 4px;
        background: #2446a8;
        opacity: 1;
      }
    }
  }
}

.screenBox {
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  .screenLeft {
    width: 384px;
    height: 422px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    // padding: 14px 18px;
    padding: 14px 0;
    box-sizing: border-box;
    position: relative;
    .screenInfoBox {
      position: absolute;
      left: 386px;
      top: 0;
      width: 814px;
      height: 422px;
      overflow: hidden;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      padding: 24px 20px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 20px;
      color: #3d3d3d;
      .screenInfoCon {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
      .screenInfoItem {
        display: flex;
        h2 {
          width: 20%;
          text-align: left;
        }
        .subInfoBox {
          width: 80%;
          display: flex;
          flex-wrap: wrap;
          p {
            width: 25%;
            text-align: left;
            margin-bottom: 12px;
            cursor: pointer;
          }
          p:hover {
            color: #2446a8;
          }
        }
      }
    }
    .screenTitle {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #2446a8;
      line-height: 20px;
      padding: 0 18px;
      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    }
    .screenCon {
      // display: flex;
      // flex-wrap: wrap;
      // margin-left: -4px;
      margin-top: 20px;
      padding: 0 6px;
      div {
        width: 100%;
        height: 36px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 14px;
        color: #3d3d3d;
        text-align: left;
        // margin-bottom: 20px;
        cursor: pointer;
        // background: #f8f8f8;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 12px;
          height: 12px;
        }
      }
      div:hover {
        background: #f8f8f8;
      }
      div.active {
        background: #f8f8f8;
        color: #2446a8;
      }
    }
  }
  .screenAd {
    > div {
      margin-bottom: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    > div:last-child {
      margin-bottom: 0;
    }
  }
  .screenCenter {
    > div {
      width: 484px;
    }
    > div:nth-child(1) {
      height: 276px;
    }
    > div:nth-child(2) {
      height: 130px;
    }
  }
  .screenRight {
    > div {
      width: 282px;
      height: 130px;
    }
  }
}
.hopeJobBox {
  width: 1200px;
  margin: 0 auto;
  margin-top: 75px;
  .hopeJobTitle {
    display: flex;
    align-items: center;
    h2 {
      font-size: 32px;
      font-weight: 600;
      color: #333333;
      line-height: 45px;
      margin-right: 32px;
    }
    .hopeJobTab {
      display: flex;
      p {
        cursor: pointer;
        width: 78px;
        height: 40px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 6px 6px 6px 6px;
        border: 1px solid rgba(36, 70, 168, 0.6);
        font-size: 14px;
        color: #444444;
        line-height: 40px;
        margin-right: 22px;
      }
      p.active {
        background: #2446a8;
        color: #fff;
      }
    }
  }
  .hopeJobCards {
    display: flex;
    flex-wrap: wrap;
    margin-top: 32px;
    .hopeJobItem {
      width: 389px;
      height: 197px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      margin-right: 16px;
      position: relative;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 18px;
      cursor: pointer;
      .label {
        width: 56px;
        height: 26px;
        background: rgba(36, 70, 168, 0.1);
        border-bottom-left-radius: 8px;
        font-size: 12px;
        color: #2446a8;
        line-height: 26px;
        position: absolute;
        top: 0;
        right: 0;
      }
      .hopeJobInfo {
        display: flex;
        align-items: center;
        margin-top: 22px;
        img {
          width: 64px;
          height: 64px;
          margin-right: 16px;
        }
        .hopeJobCompany {
          h2 {
            font-size: 16px;
            font-weight: 600;
            color: #222222;
            line-height: 22px;
            text-align: left;
          }
          > div {
            margin-top: 25px;
          }
        }
      }
      .hopeTabBox {
        display: flex;
        margin-top: 16px;
        > p {
          width: 72px;
          height: 25px;
          background: #f3f5f9;
          border-radius: 4px 4px 4px 4px;
          font-size: 12px;
          color: #666666;
          line-height: 25px;
          margin-right: 8px;
        }
        > p:last-child {
          margin-right: 0;
        }
      }
      .hopeOther {
        margin-top: 20px;
        border-top: 1px dotted #edf0f6;
        padding: 16px 10px 0 10px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
      }
    }
    .hopeJobItem:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.hopeSJobBox {
  margin-top: 52px;
  .hopeJobCards {
    .hopeJobItem {
      height: 158px;
      .hopeSJob {
        padding-top: 14px;
        .hopeSJobInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          h2 {
            font-size: 16px;
            font-weight: 600;
            color: #222222;
            line-height: 22px;
          }
          p {
            font-size: 16px;
            color: #f44335;
            line-height: 22px;
          }
        }
      }
      .hopeJobInfo {
        margin-top: 16px;
        img {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
        .hopeJobCompany {
          h2 {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
          > div {
            margin-top: 3px;
          }
        }
      }
    }
  }
}
.lookMoreBtn {
  width: 273px;
  height: 40px;
  margin: 0 auto;
  margin-top: 14px;
  margin-bottom: 72px;
  background: rgba(36, 70, 168, 0.1);
  border-radius: 6px 6px 6px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #2446a8;
}
</style>
