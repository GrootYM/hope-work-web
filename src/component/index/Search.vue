<!-- 首页搜素框模块 -->
<template>
  <div>
    <div style="margin-left: 20%; text-align: center">
      <position-detail
        v-if="showDetail"
        @detailClose="detailClose"
        :detailPositionID="detailPositionID"
        :temp="1"
      >
      </position-detail>
    </div>
    <div class="searchIndex" v-if="!showDetail">
      <div class="contains" :width="nxw">
        <div class="search">
          <div style="position: relative">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索职位/公司/关键词"
              class="input-with-select"
              clearable
            >
              <template slot="prepend">
                <el-select
                  value="职位类型"
                  placeholder="职位类型"
                  size="medium"
                  @visible-change="onSelect"
                >
                  <el-option
                    v-for="(item, index) in jobOptions"
                    :key="item.pid"
                    :value="item.pid"
                  >
                    <div class="opt" @mouseover="showSide(index)">
                      {{ item.pname }}
                      <img src="@/assets/image/home/cat-arrow.png" />
                    </div>
                  </el-option>
                </el-select>
              </template>
              <el-button
                @click="onQueryChange"
                slot="append"
                icon="el-icon-search"
                >搜索</el-button
              >
            </el-input>
            <div class="dropdown-child" v-if="sideVisible">
              <div class="title">{{ nowPosition.pname }}</div>
              <div
                class="child-item"
                v-for="(item, index) in nowPosition.childLists"
                :key="index"
              >
                <div class="type-name">{{ item.typeName }}</div>
                <div class="children">
                  <div
                    v-for="(child, i) in item.subChildLists"
                    @click="gotoJob(child.subTypeName)"
                    :key="child.subId"
                  >
                    {{ child.subTypeName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="s_hot">
            热门职位：&nbsp;
            <span
              v-for="(item, index) in tags"
              :key="index"
              class="s_hot_like"
              @click="gotoJob(item.typeName)"
            >
              {{ item.typeName }}
            </span>
          </div>
        </div>
        <template v-if="!showDetail">
          <div class="workList">
            <ul class="work_list">
              <li
                v-for="(work, index) in tableData"
                :key="index"
                class="cardWork"
              >
                <div @click.prevent="handleDetail(work)">
                  <div class="cardWork_Up">
                    <div>
                      <strong class="card_workNT"
                        ><span class="card_workName" :title="work.title">{{
                          work.title
                        }}</span></strong
                      >
                    </div>
                    <div style="margin-top: 8px">
                      <span>职位浏览量：</span>
                      <span>{{ work.hits }}</span>
                    </div>
                    <div style="margin-top: 8px">
                      <span>工作地点：</span>
                      <span>{{ work.city }}</span>
                    </div>
                    <div
                      style="
                        color: #fa606b;
                        margin-left: 75px;
                        margin-top: 10px;
                      "
                    >
                      <span style="float: left">薪资：</span>
                      <span style="float: left">{{ work.salary_down }}</span>
                      <span style="float: left">~</span>
                      <span style="float: left">{{ work.salary_up }}</span>
                    </div>
                  </div>
                  <div class="cardWork_Down">
                    <div class="card_workImg"><img :src="work.logo" /></div>
                    <div style="margin-top: 10px; margin-right: 30px">
                      <p style="line-height: 20px">{{ work.requirement }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!-- 职位详情 -->
</template>

<script>
import WorkListVue from "./WorkList.vue";
import { Position } from "@/model/position";
import Button from "../../plugin/lin-cms-ui/view/basic/button/button.vue";
import LinSearch from "@/component/base/search/lin-search";
import PositionDetail from "@/view/position/position-detail";
import Home from "@/api/home";

export default {
  components: {
    WorkListVue,
    Button,
    LinSearch,
    PositionDetail,
  },
  data() {
    return {
      worklist: [],
      // sWidth:this.nxw,
      list: this.slist,
      showDetail: false, // 是否显示职位详情页
      showHot: false, // 是否显示热招职位列表
      tableData: [], // 表格数据
      totalNums: 0, // 数据总数
      currentPage: 1, // 当前页数
      pageCount: 12, // 每页的数据量
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新 Pagination 组件
      detailPositionID: 0, // 职位id
      searchKeyword: "", // 搜索时输入的关键字
      keyword: null, // 查询关键字,用于显示搜索提示
      form: {}, //投递简历时传入的列表数据
      list: {}, //收藏职位时传入的列表数据
      jobCat: null,
      tags: [],
      jobOptions: [],
      nowPosition: {}, // 搜索下拉选中的职位类型
      positions: [
        {
          id: 208,
          typeName: "后端开发",
          subChildLists: [
            { subId: 209, subTypeName: "Java" },
            { subId: 210, subTypeName: "Java" },
            { subId: 211, subTypeName: "Java" },
            { subId: 212, subTypeName: "Java" },
            { subId: 213, subTypeName: "Java" },
            { subId: 214, subTypeName: "Java" },
            { subId: 209, subTypeName: "Java" },
            { subId: 210, subTypeName: "Java" },
            { subId: 211, subTypeName: "Java" },
            { subId: 212, subTypeName: "Java" },
            { subId: 213, subTypeName: "Java" },
            { subId: 214, subTypeName: "Java" },
            { subId: 209, subTypeName: "Java" },
            { subId: 210, subTypeName: "Java" },
            { subId: 211, subTypeName: "Java" },
            { subId: 212, subTypeName: "Java" },
            { subId: 213, subTypeName: "Java" },
            { subId: 214, subTypeName: "Java" },
          ],
        },
        {
          id: 215,
          typeName: "前端/移动开发",
          subChildLists: [
            { subId: 216, subTypeName: "Java" },
            { subId: 217, subTypeName: "Java" },
            { subId: 218, subTypeName: "Java" },
            { subId: 219, subTypeName: "Java" },
            { subId: 220, subTypeName: "Java" },
            { subId: 221, subTypeName: "Java" },
            { subId: 216, subTypeName: "Java" },
            { subId: 217, subTypeName: "Java" },
            { subId: 218, subTypeName: "Java" },
            { subId: 219, subTypeName: "Java" },
            { subId: 220, subTypeName: "Java" },
            { subId: 221, subTypeName: "Java" },
            { subId: 216, subTypeName: "Java" },
            { subId: 217, subTypeName: "Java" },
            { subId: 218, subTypeName: "Java" },
            { subId: 219, subTypeName: "Java" },
            { subId: 220, subTypeName: "Java" },
            { subId: 221, subTypeName: "Java" },
          ],
        },
      ],
      sideVisible: false,
    };
  },
  props: ["nxw", "slist", "searchValue"],
  mounted() {
    if (this.keywordValue) {
      this.keyword = this.keywordValue;
    }
    // this.searchPositionList(this.keyword)
    this.getTags();
    this.getPositionType();
  },
  // watch: {
  // 	/**
  // 	 * 关键字搜索
  // 	 */
  // 	searchKeyword(newVal) {
  // 		if (newVal) {
  // 			this.keyword = newVal
  // 			if (this.searchUser) {
  // 				this.keyword = `${newVal}`
  // 			}
  // 		} else {
  // 			this.keyword = ''
  // 			this.$refs.searchKeyword.clear()
  // 		}
  // 		this.searchPositionList()
  // 	},
  // },
  methods: {
    // async getHotIndustryType() {
    //   let res = await Home.queryHotIndustryType({})
    //   this.getHotPositonByIndustry()
    // },
    onSelect(e) {
      if (!e) {
        setTimeout(() => {
          this.hideSide();
        }, 500);
      }
    },
    showSide(index) {
      this.nowPosition = this.jobOptions[index];
      this.sideVisible = true;
    },
    hideSide(e) {
      this.sideVisible = false;
      this.nowPosition = {};
    },
    async getPositionType() {
      let res = await Home.positionType({});
      this.jobOptions = res.data;
    },
    async getTags() {
      let res = await Home.queryHotPositionType({});
      this.tags = res.data;
    },
    async getByState() {
      const page = this.currentPage - 1;
      const count = this.pageCount;
      // 首页展示所有审核通过的职位
      const positions = await Position.getByState(1, page, count);
      this.tableData = positions.items;
      this.totalNums = positions.total;
    },
    // 通过查询关键字分页搜索职位列表
    async searchPositionList() {
      this.$router.push({
        path: "/index/job",
        query: { keyWords: this.searchKeyword },
      });
    },
    gotoJob(kw) {
      this.$router.push({ path: "/index/job", query: { keyWords: kw } });
      // this.sideVisible = false
    },
    // 清空检索
    async backInit() {
      this.searchKeyword = "";
      this.keyword = "";
      this.tableData = [];
      this.loading = true;
      this.searchPositionList();
      this.loading = false;
    },
    /**
     * 监听输入查询关键字
     */
    async onQueryChange() {
      this.searchKeyword = this.searchKeyword.trim();
      this.searchPositionList();
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.searchPositionList();
      this.loading = false;
    },
    handleDetail(val) {
      this.showDetail = true;
      this.detailPositionID = val.id;
    },
    handleHot() {
      this.showHot = true;
    },
    rowClick() {},
    detailClose() {
      this.showDetail = false;
      this.searchPositionList();
    },
    hotClose() {
      this.showHot = false;
      this.showDetail = false;
      this.searchPositionList();
    },
    // 投递简历
    async handleDelivery(val) {
      // 根据用户id和职位id判断用户是否已经投递过该职位，避免重复投递
      const flag = await Application.getByPositionIdAndUserId(
        val.id,
        this.$store.getters.user.id
      );
      if (flag === false) {
        // 不能重复投递
        this.$message.error("你已投递过该职位，不可重复投递");
      } else {
        // 获取当前登录求职者的用户id
        this.form.user_id = this.$store.getters.user.id;
        // 获取当前投递简历的职位id
        this.form.position_id = val.id;
        // 根据用户id查询绑定的简历id
        const temp = await Resume.getByUserId(this.$store.getters.user.id);
        this.form.resume_id = temp.resume_id;
        console.log(temp);
        // 根据职位id查询该职位所对应的hr_id
        const result = await Position.getById(val.id);
        this.form.hr_id = result.hr_id;
        this.form.company_id = val.company_id;
        // 调用创建申请的方法
        const res = await Application.create(this.form);
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`);
        }
      }
    },
    // 收藏职位
    async handleCollect(val) {
      // 获取当前登录求职者的用户id
      this.list.user_id = this.$store.getters.user.id;
      // 获取当前收藏的职位id
      this.list.position_id = val.id;
      // 调用添加收藏的方法
      const res = await Favor.create(this.list);
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`);
      }
    },
  },
};
</script>

<style lang="scss">
.searchIndex {
  width: 100%;
  background: #fff;

  .contains {
    width: 1200px;
    margin: 48px auto 0;

    .search {
      // width: 50rem;
      // height: 10rem;
      // margin: 0 auto;
      text-align: center;
      position: relative;

      .search1 {
        width: initial;
        margin: center;
        text-align: center;
        position: relative;
      }

      .s_box {
        height: 5rem;
        padding-top: 2rem;

        .search_input,
        .search_button {
          float: left;
          box-sizing: content-box;
          width: 39.5rem;
          border: 1px solid #ddd;

          // margin-top: 20px;
          &:focus {
            outline: 0px;
            outline-offset: 0px;
          }
        }

        .search_input {
          height: 19px;
          padding: 16px;
          font-size: 16px;
          border-right: none;

          &:focus {
            border: 1px solid #3cbef9;
            border-right: 0px;
          }
        }

        .search_button {
          width: 8rem;
          height: 51px;
          font-size: 20px;
          line-height: 51px;
          text-align: center;
          cursor: pointer;
          color: #fff;
          border: 1px solid #3cbef9;
          background: #3cbef9;
        }
      }

      .s_hot {
        clear: both;
        margin-top: 32px;
        font-size: 14px;
        text-align: left;
        font-size: 16px;
        color: #929ab0;

        .s_hot_like {
          margin-right: 16px;
          cursor: pointer;
        }
      }

      .nosee {
        display: none;
      }
    }
  }
}

.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 25px;
      font-weight: 500;
      margin-left: 450px;
    }
  }

  .search3 {
    height: 52px;
    width: 100%;
    background: rgba(57, 99, 188, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 24px;

    .search-tip {
      margin-left: 40px;
      height: 52px;
      line-height: 52px;
      color: #354058;
      font-size: 14px;

      .search-keyword {
        color: $theme;
      }

      .search-num {
        color: #f4516c;
      }
    }

    .search-back {
      margin: 8px 20px;
      height: 32px;
      background: #f4516c;
      border: none;
      border-radius: 2px;
      color: #fff;
      padding: 0 13px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .left {
      margin-left: 280px;
    }

    .right {
      height: 59px;
      line-height: 59px;
      color: $right-side-font-color;
      font-size: 18px;
      font-weight: 400;
      margin-left: 50px;
      cursor: pointer;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 30px;
  }
}

$nx-color2: #0470b8;
$nx-width: 76rem;

.workList {
  width: 100%;
  cursor: pointer;

  .work_list {
    width: $nx-width;
    margin: 1rem auto;
    zoom: 1;

    &:after {
      display: block;
      content: ".";
      clear: both;
      line-height: 0;
      visibility: hidden;
    }

    .cardWork {
      float: left;
      width: 17.6rem;
      height: 16.75rem;
      border: 1px solid #eee;
      margin: 1rem 1rem 0 0;

      > div {
        width: 100%;
        height: 100%;
        padding: 1rem;
        overflow: hidden;
        text-align: center;

        .cardWork_Up {
          color: #999;

          .card_workNT {
            display: inline-block;
            font-weight: 400;

            .card_workName {
              float: left;
              max-width: 12rem;
              font-size: 1rem;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;

              &:hover {
                color: $nx-color2;
              }
            }

            .card_workTime {
              font-size: 0.8rem;
            }
          }

          .card_workMoney {
            float: right;
            color: #fa606b;
          }

          .card_workExp {
            font-size: 0.8rem;
            color: #888;
          }

          ul {
            height: 4rem;
            border-bottom: 1px dashed #ddd;

            .card_workTags {
              float: left;
              font-size: 0.6rem;
              border: 1px solid #eee;
              padding: 0.2rem 0.3rem;
              margin: 0.6rem 0.6rem 2rem 0;
            }
          }
        }

        .cardWork_Down {
          float: left;
          width: 100%;
          height: 2.5rem;
          margin-top: 0.5rem;

          .card_workImg img {
            width: 6rem;
            margin-right: 1rem;
          }

          div {
            display: inline-block;

            span {
              font-size: 0.9rem;
            }

            ul .card_workIncTags {
              float: left;
              font-size: 0.8rem;
              color: #aaa;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.opt {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 12px;
    height: 12px;
  }
}

.dropdown-child {
  position: absolute;
  top: 52px;
  left: 170px;
  width: 948px;
  height: 250px;
  padding: 4px 0;
  background: #fff;
  box-shadow: 0 10px 40px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  z-index: 3;
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

      div {
        cursor: pointer;
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
::v-deep .el-input {
  .el-input--suffix {
    background: transparent;
    font-size: 16px;
  }
}

::v-deep .el-input-group__prepend {
  width: 124px;
  background: #ffffff;
  border: 1px solid rgba(36, 70, 168, 0.3);

  div.el-select {
    .el-input__inner {
      color: #333333;
      text-align: center;
      &::placeholder {
        color: #333333;
        text-align: center;
      }
    }
  }
}

::v-deep .el-select {
  .el-input {
    .el-select__caret {
      color: rgba(36, 70, 168, 0.3);
    }
  }
}
</style>
