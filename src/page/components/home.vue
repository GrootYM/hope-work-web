<!-- 首页 -->
<template>
  <div>
    <div class="top-banner">
      <img
        src="https://hope-service.oss-cn-beijing.aliyuncs.com/images/top-banner-2024-3.jpg"
      />
<!--      <img src="@/assets/image/about/top-banner1.png" />-->
    </div>
    <Search />
    <div class="main">
      <BlockTitle title="顾问莅场" />
      <div class="all-cat">
        <!-- <div class="cat-select">
          <div class="cat-header">
            <div>全部分类</div>
            <img src="@/assets/image/home/all-cat.png" />
          </div>
          <div class="cat-list">
            <div class="type-item" v-for="(item, index) in jobOptions" :key="item.pid" @mouseover="showSide(index)">
              <div class="type-name">{{ item.pname }}</div>
              <a v-if="item.childLists.length && item.childLists.length > 0">{{ item.childLists[0].typeName }}</a>
              <a v-if="item.childLists.length && item.childLists.length > 1">{{ item.childLists[1].typeName }}</a>
              <a v-if="item.childLists.length && item.childLists.length > 2">{{ item.childLists[2].typeName }}</a>
              <img src="@/assets/image/home/cat-arrow.png" class="type-arrow" />
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
                  @click.stop.prevent="gotoJob(child.subTypeName)"
                >
                  {{ child.subTypeName }}
                </a>
              </div>
            </div>
          </div>
        </div> -->
        <div
          class="ads"
          v-if="midBanners.length"
          @click="goLink(midBanners[0])"
        >
          <img :src="midBanners[0].imgUrl" />
          <div class="tag">广告</div>
        </div>
        <div class="ads-area" v-if="banners.length">
          <div
            class="ad-item"
            v-for="(ad, index) in banners"
            :key="ad.id"
            @click="goLink(ad)"
          >
            <img :src="ad.imgUrl" />
          </div>
          <!-- <div class="main-ad" @click="goLink(banners[0])">
            <img :src="banners[0].imgUrl" />
            <div class="tag">广告</div>
          </div>
          <div class="sub-ads">
            <div class="ad" @click="goLink(banners[1])">
              <img :src="banners[1].imgUrl" />
              <div class="tag">广告</div>
            </div>
            <div class="ad" @click="goLink(banners[2])">
              <img :src="banners[2].imgUrl" />
              <div class="tag">广告</div>
            </div>
            <div class="ad" @click="goLink(banners[3])">
              <img :src="banners[3].imgUrl" />
              <div class="tag">广告</div>
            </div>
            <div class="ad" @click="goLink(banners[4])">
              <img :src="banners[4].imgUrl" />
              <div class="tag">广告</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="block">
        <BlockTitle title="热门职位" />
        <el-radio-group v-model="jobIndex" class="tabs">
          <el-radio-button
            v-for="(item, index) in jobCat"
            :key="index"
            :label="item.id"
          >
            {{ item.industryName }}
          </el-radio-button>
        </el-radio-group>
        <div class="block-content">
          <div class="job-cards">
            <div
              class="card"
              v-for="(item, index) in hotPositionsByIndustryType"
              @click="gotoPosition(item.id)"
            >
              <div class="job-title">
                <div class="job-name">{{ item.positionName }}</div>
                <div class="salary">
                  {{ item.lowSalary }}-{{ item.topSalary }}k
                </div>
              </div>
              <div class="job-base">
                <div class="city">{{ item.cityName }}</div>
                <div class="interval"></div>
                <div class="years">{{ item.experience }}</div>
                <div class="interval"></div>
                <div class="educate">{{ item.education }}</div>
              </div>
              <div class="company">
                <img :src="item.headUrl" alt="公司logo" />
                <div class="info">
                  <div class="company-name">{{ item.companyName }}</div>
                  <div class="company-base">
                    <div class="trade">{{ item.companyIndustryName }}</div>
                    <div class="interval"></div>
                    <div class="number">{{ item.companyScale }}</div>
                    <div class="interval"></div>
                    <div class="list-condition">{{ item.finance }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="see-more" @click="toMore('job')">查看更多</div>
      </div>
      <div class="block">
        <BlockTitle title="热门企业" />
        <div class="block-content">
          <div class="companies">
            <!-- <div class="ads" v-if="midBanners.length" @click="goLink(midBanners[0])">
              <img :src="midBanners[0].imgUrl" />
              <div class="tag">广告</div>
            </div> -->
            <div class="cat-select">
              <div class="cat-header">
                <div>全部分类</div>
                <img src="@/assets/image/home/all-cat.png" />
              </div>
              <div class="cat-list">
                <div
                  class="type-item"
                  v-for="(item, index) in jobOptions"
                  :key="item.pid"
                  @mouseover="showSide(index)"
                >
                  <div class="type-name">{{ item.pname }}</div>
                  <a
                    v-if="item.childLists.length && item.childLists.length > 0"
                    >{{ item.childLists[0].typeName }}</a
                  >
                  <a
                    v-if="item.childLists.length && item.childLists.length > 1"
                    >{{ item.childLists[1].typeName }}</a
                  >
                  <a
                    v-if="item.childLists.length && item.childLists.length > 2"
                    >{{ item.childLists[2].typeName }}</a
                  >
                  <img
                    src="@/assets/image/home/cat-arrow.png"
                    class="type-arrow"
                  />
                </div>
              </div>
              <div
                class="dropdown-child"
                v-show="sideVisible"
                @mouseenter="sideVisible = true"
                @mouseleave="hideSide"
              >
                <div class="title">{{ nowPosition.pname }}</div>
                <div
                  class="child-item"
                  v-for="(item, index) in nowPosition.childLists"
                  :key="index"
                >
                  <div class="type-name">{{ item.typeName }}</div>
                  <div class="children">
                    <a
                      href="javascript:void(0)"
                      v-for="(child, i) in item.subChildLists"
                      @click.stop.prevent="gotoJob(child.subTypeName)"
                    >
                      {{ child.subTypeName }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="company-cards">
              <div
                class="card"
                v-for="(item, index) in hotCompanies"
                @click="gotoCompany(item.id)"
              >
                <img :src="item.headUrl" alt="公司logo" class="logo" />
                <div class="company-name">{{ item.companyName }}</div>
                <div class="company-info">
                  <div>{{ item.industryName }}</div>
                  <div class="interval"></div>
                  <div>{{ item.companyScale }}</div>
                  <div class="interval"></div>
                  <div>{{ item.finance }}</div>
                </div>
                <div class="recruit">
                  <div>
                    <div class="num">{{ item.positionNum }}</div>
                    <div class="label">在招职位</div>
                  </div>
                  <!--                  <div class="interval-long"></div>-->
                  <!--                  <div>-->
                  <!--                    <div class="num">-->
                  <!--                      {{ item.positionChatNum }}-->
                  <!--                    </div>-->
                  <!--                    <div class="label">沟通次数</div>-->
                  <!--                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="see-more" @click="toMore('company')">查看更多</div>
      </div>
      <!-- <div class="block">
        <BlockTitle title="名企职位" />
        <div class="block-content">
          <div class="post-cards">
            <div class="card" v-for="(item, index) in hotCompanyPositions">
              <div class="company-info" @click="gotoCompany(item.id)">
                <img :src="item.headUrl" alt="公司logo" />
                <div class="info">
                  <div class="company-name">{{ item.companyName }}</div>
                  <div class="company-base">
                    <div class="trade">{{ item.industryName }}</div>
                    <div class="interval"></div>
                    <div class="number">{{ item.companyScale }}</div>
                    <div class="interval"></div>
                    <div class="list-condition">{{ item.finance }}</div>
                  </div>
                </div>
              </div>
              <div class="job-list">
                <div
                  class="job"
                  v-for="(position, i) in item.positionDtoList"
                  @click="gotoPosition(position.positionId)"
                >
                  <div class="job-title">
                    <div class="job-name">{{ position.positionName }}</div>
                    <div class="salary">
                      {{ position.lowSalary }}-{{ position.topSalary }}k {{ position.yearSalary
                      }}{{ position.yearSalary ? '薪' : '' }}
                    </div>
                  </div>
                  <div class="job-base">
                    <div class="city">{{ position.cityName }}</div>
                    <div class="interval"></div>
                    <div class="years">{{ position.experience }}</div>
                    <div class="interval"></div>
                    <div class="educate">{{ position.education }}</div>
                  </div>
                </div>
              </div>
              <div class="more" @click="gotoJob(item.companyName)">更多职位</div>
            </div>
          </div>
        </div>
        <div class="see-more" @click="toMore('info')">查看更多</div>
      </div> -->
    </div>
    <el-dialog
      :visible.sync="notifyVisible"
      :show-close="false"
      :close-on-click-modal="false"
      fullscreen
    >
      <div slot="title" class="dialog-header">
        <div></div>
        <img
          src="@/assets/image/login/close.png"
          class="close-btn"
          @click="closeDialog"
        />
      </div>
      <div class="dialog-content" v-html="notifyContent"></div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "@/component/index/Search";
import BlockTitle from "@/page/common/blockTitle";
import Home from "@/api/home";
import Seo from "../../api/seo";

export default {
  inject: ["eventBus"],
  components: {
    Search,
    BlockTitle,
  },
  data() {
    return {
      jobIndex: null,
      jobCat: [],
      activeName: "first",
      jobOptions: [],
      nowPosition: {},
      sideVisible: false,
      hotPositionsByIndustryType: [],
      hotCompanies: [],
      hotCompanyPositions: [],
      banners: [],
      notifyVisible: false,
      notifyContent: "",
      midBanners: [],
      dynamicKeywords: '',
      dynamicDescription : ''
    };
  },
  created() {
    this.getBannerList();
    this.getBannerList2();
    this.getPositionType();
    this.getHotIndustryType();
    this.getHotCompanyList();
    this.getHotCompanyPositionList();
    this.fetchMetaData();
  },
  watch: {
    jobIndex(val) {
      this.getHotPositonByIndustry();
    },
  },
  methods: {
    async fetchMetaData() {
      const head = document.head;
      // 清除旧的<meta>标签
      Array.from(head.querySelectorAll('meta[name="keywords"], meta[name="description"]')).forEach(tag => tag.remove());
      let { endpoint, params } = this.$route.meta.fetchMetaData;
      let response = await Seo.getSeoInfo(params)
      this.dynamicKeywords = response.data.keyword;
      this.dynamicDescription = response.data.description;
    },
    gotoCompany(id) {
      const { href } = this.$router.resolve({
        path: "/index/company",
        query: { id: id },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/company', query: { id } })
    },
    gotoPosition(id) {
      const { href } = this.$router.resolve({
        path: "/index/info",
        query: { id: id },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: '/index/info', query: { id } })
    },
    gotoJob(kw) {
      this.$router.push({ path: "/index/job", query: { keyWords: kw } });
    },
    goLink(banner) {
      if (banner.type != 2) {
        this.$util.jumpLink(banner.type, banner.jumpUrl);
      } else {
        this.showNotify(banner);
      }
    },
    showNotify(banner) {
      this.notifyContent = banner.bannerDesc;
      this.notifyVisible = true;
    },
    closeDialog() {
      this.notifyVisible = false;
      this.notifyContent = "";
    },
    changeType(index) {
      this.jobIndex = this.jobCat[index].id;
    },
    showSide(index) {
      this.nowPosition = this.jobOptions[index];
      this.sideVisible = true;
    },
    hideSide() {
      this.sideVisible = false;
      this.nowPosition = {};
    },
    async getHotCompanyPositionList() {
      let res = await Home.queryHotCompanyPositionList({
        currentPage: 1,
        pageSize: 9,
      });
      this.hotCompanyPositions = res.data.list;
    },
    async getHotCompanyList() {
      let res = await Home.queryHotCompanyList({
        currentPage: 1,
        pageSize: 6,
      });
      this.hotCompanies = res.data.list;
    },
    async getHotPositonByIndustry() {
      let res = await Home.queryHotPositonByIndustry({
        currentPage: 1,
        pageSize: 9,
        companyIndustryId: this.jobIndex,
      });
      this.hotPositionsByIndustryType = res.data.list;
    },
    async getHotIndustryType() {
      let res = await Home.queryHotIndustryType({});
      this.jobCat = res.data;
      if (this.jobIndex === null) {
        this.changeType(0);
      }
    },
    async getBannerList() {
      let res = await Home.getBannerList({ bannerCode: "index" });
      this.banners = res.data;
    },
    async getBannerList2() {
      let res = await Home.getBannerList({ bannerCode: "index_middle" });
      this.midBanners = res.data;
    },
    async getPositionType() {
      let res = await Home.positionType({});
      this.jobOptions = res.data;
    },
    toMore(flag) {
      switch (flag) {
        case "job":
          this.$router.push({
            path: "/index/job",
          });
          this.eventBus.$emit("changeTab", "2");
          break;
        case "company":
          this.$router.push({
            path: "/index/job",
          });
          this.eventBus.$emit("changeTab", "2");
          break;
        case "info":
          this.$router.push({
            path: "/index/job",
          });
          this.eventBus.$emit("changeTab", "2");
          break;
        default:
          break;
      }
    },
  },
  metaInfo() {
    return {
      meta: [{ name: "keywords", content: this.dynamicKeywords }, {name: "description", content: this.dynamicDescription}],
    };
  },
};
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css");
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;

#app {
  min-width: $nx-width;

  .main {
    // background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  }

  .friend {
    width: 100%;

    .friendList {
      width: 76rem;
      margin: 0 auto;

      .f_list {
        display: inline-block;
        font-size: 0.8rem;
        color: #777;
        padding: 1rem 1rem 4rem 0;

        &:hover {
          color: $nx-color;
          text-decoration: underline;
        }
      }
    }
  }

  .top-banner {
    width: 100%;
    height: 208px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (max-with: 76.25rem) {
}
</style>
<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  background-image: url(~@/assets/image/home/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 120%;
  padding-bottom: 1px;
  padding-top: 72px;

  .cat-select {
    width: 344px;
    height: 490px;
    background: #ffffff;
    border-radius: 4px;
    padding: 16px 20px 20px;
    margin-right: 16px;
    position: relative;

    .cat-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
      font-size: 14px;
      font-weight: 600;
      color: #3d3d3d;

      img {
        width: 16px;
        height: 16px;
      }
    }

    .cat-list {
      max-height: 92.1%;
      overflow-y: scroll;
      padding-right: 4px;

      .type-item {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

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

  .ads {
    width: 280px;
    margin-right: 20px;
    padding: 2px;
    background: #ffffff;
    position: relative;

    img {
      width: 100%;
      height: 522px;
      cursor: pointer;
    }

    .tag {
      width: 56px;
      height: 26px;
      line-height: 26px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 2px;
      right: 2px;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 1px;
    }
  }

  .all-cat {
    width: 1200px;
    margin: 32px auto 0;
    display: flex;

    .ads-area {
      flex: 1;
      .ad-item {
        display: inline-block;
        width: 287px;
        height: 253px;
        cursor: pointer;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
        }

        &:nth-child(3),
        &:nth-child(6) {
          margin-right: 0;
        }

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          margin-bottom: 16px;
        }
      }

      .main-ad {
        padding: 2px;
        height: 372px;
        background: #ffffff;
        border-radius: 4px;
        position: relative;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }

        .tag {
          font-size: 12px;
          width: 56px;
          height: 26px;
          line-height: 26px;
        }
      }

      .sub-ads {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;

        .ad {
          border-radius: 4px;
          padding: 2px;
          width: 182px;
          height: 126px;
          background: #ffffff;
          position: relative;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .tag {
          font-size: 8px;
          width: 38px;
          height: 16px;
          line-height: 16px;
        }
      }

      .tag {
        position: absolute;
        text-align: center;
        bottom: 2px;
        right: 2px;
        background: rgba(0, 0, 0, 0.3);
        color: #ffffff;
      }
    }
  }

  .block {
    margin-top: 72px;

    .tabs {
      margin-top: 32px;
      margin-bottom: 32px;
    }

    .block-content {
      width: 1200px;
      margin: auto;
      .job-cards {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        .card {
          cursor: pointer;
          width: 344px;
          height: 126px;
          background: #ffffff;
          border-radius: 4px;
          padding: 16px 20px;
          margin-right: 16px;
          margin-bottom: 16px;

          .job-title {
            display: flex;
            justify-content: space-between;

            .job-name {
              font-size: 16px;
              font-weight: 600;
              color: #222222;
            }

            .salary {
              font-size: 16px;
              color: #f44335;
            }
          }

          .job-base {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666666;
            margin: 12px 0 32px;
          }

          .company {
            display: flex;
            align-items: center;

            img {
              width: 40px;
              height: 40px;
            }

            .info {
              margin-left: 12px;
              .company-name {
                text-align: left;
                font-size: 14px;
                color: #222222;
                margin-bottom: 3px;
              }

              .company-base {
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #666666;
              }
            }
          }
        }
      }

      .companies {
        display: flex;
        width: 100%;
        padding-top: 32px;

        .company-cards {
          display: flex;
          flex-wrap: wrap;
          flex: 1;

          .card {
            cursor: pointer;
            padding: 32px 15px;
            width: 220px;
            height: 183px;
            background: #ffffff;
            border-radius: 4px;
            margin-right: 16px;
            margin-bottom: 24px;

            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6) {
              margin-bottom: 0;
            }

            .logo {
              width: 72px;
              height: 72px;
              margin: auto;
            }

            .company-name {
              margin-top: 12px;
              font-size: 14px;
              font-weight: 500;
              color: #222222;
            }

            .company-info {
              margin-top: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #666666;
            }

            .recruit {
              display: flex;
              align-items: center;
              justify-content: space-around;
              margin-top: 20px;

              .num {
                font-size: 14px;
                color: #2446a8;
              }

              .interval-long {
                width: 1px;
                height: 32px;
                background: #edf0f6;
              }

              .label {
                margin-top: 4px;
                font-size: 12px;
                color: #666666;
              }
            }
          }
        }
      }

      .post-cards {
        display: flex;
        width: 100%;
        padding-top: 32px;
        flex-wrap: wrap;

        .card {
          width: 336px;
          height: 381px;
          background: #ffffff;
          border-radius: 4px;
          padding: 24px 20px;
          margin-right: 16px;
          margin-bottom: 16px;

          .company-info {
            display: flex;
            align-items: center;
            margin-bottom: 48px;
            cursor: pointer;

            img {
              width: 64px;
              height: 64px;
              margin-right: 16px;
            }

            .info {
              flex: 1;

              .company-name {
                text-align: left;
                font-size: 16px;
                font-weight: 600;
                color: #222222;
                margin-bottom: 7px;
              }

              .company-base {
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #666666;
              }
            }
          }

          .job-list {
            .job {
              cursor: pointer;
              margin-bottom: 16px;
              .job-title {
                display: flex;
                justify-content: space-between;

                .job-name {
                  font-size: 16px;
                  font-weight: 600;
                  color: #222222;
                }

                .salary {
                  font-size: 16px;
                  color: #f44335;
                }
              }

              .job-base {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #666666;
                margin-top: 20px;
              }
            }
          }

          .more {
            cursor: pointer;
            width: 192px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            border: 1px solid rgba(36, 70, 168, 0.8);
            margin: 32px auto 0;
            font-size: 14px;
            color: #2446a8;
          }
        }
      }

      .interval {
        width: 1px;
        height: 12px;
        background: #dadde2;
        margin: 0 8px;
      }
    }

    .see-more {
      width: 273px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: rgba(36, 70, 168, 0.1);
      border-radius: 6px;
      font-size: 14px;
      color: #2446a8;
      margin: 32px auto 72px;
      cursor: pointer;
    }

    ::v-deep .el-radio-button {
      margin-right: 22px;

      .el-radio-button__inner {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 6px;
        font-size: 14px;
        color: #444444;
        letter-spacing: 1px;
        border: 1px solid rgba(36, 70, 168, 0.6);
      }
    }

    ::v-deep .is-active {
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        border-radius: 4px;
        font-weight: 600;
        color: #ffffff;
        background: #2446a8;
        border: 1px solid rgba(36, 70, 168, 0.6);
      }
    }
  }
}

.dropdown-child {
  position: absolute;
  top: 52px;
  left: 390px;
  width: 810px;
  height: 465px;
  padding: 4px 0;
  background: #fff;
  box-shadow: 0 10px 40px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  z-index: 1;
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
}

::v-deep .el-dialog__header {
  padding: 24px 22px 12px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  // width: 96vw;
  // height: 80vh;
  background-image: url(~@/assets/image/login/avatar-bg.png);
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 44px;
}

::v-deep .el-dialog.is-fullscreen {
  width: 96%;
  height: 96%;
  margin-top: 1%;
}

::-webkit-scrollbar {
  width: 7px;
  height: 5px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow-: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
}
</style>
