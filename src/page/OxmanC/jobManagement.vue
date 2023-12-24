<template>
  <div class="main">
    <div class="jobBox">
      <!-- 发布职位加搜索 -->
      <div class="jobTitle">
        <div class="postJob" @click="toAddJob()">
          <img src="@/assets/image/oxman/Coxman/sendJob.png" alt="" />
          <p>新增职位</p>
        </div>
        <!-- <div class="searchJob">
          <input type="text" placeholder="搜索" />
          <img src="@/assets/image/oxman/Coxman/icon-search.png" alt="" />
        </div> -->
        <div class="screenJob">
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="招聘类型"
            @change="changeJob($event)"
          >
            <el-option label="全部" value=""></el-option>
            <el-option label="社招" value="1"></el-option>
            <el-option label="校招" value="2"></el-option>
            <el-option label="海归" value="3"></el-option>
            <el-option label="兼职" value="4"></el-option>
            <el-option label="灵活就业" value="5"></el-option>
          </el-select>
        </div>
      </div>
      <!-- 职位状态 -->
      <div class="jobStatus">
        <el-button
          type="text"
          @click="changeColor(item.id)"
          :class="['statusSelect', i1 === item.id ? 'active' : '']"
          v-for="(item, index) in status"
          :key="item.id"
        >
          {{ item.name }}
        </el-button>
      </div>
      <!-- 职位详情 -->
      <div class="jobContent">
        <div class="jobBac" v-for="(item, index) in jobCard" :key="item.id">
          <div class="jobCard">
            <div class="jobName">
              <div class="jobNameTop">{{ item.positionName }}</div>
              <div class="jobNameBottom">
                <p class="info">{{ item.cityName }}</p>
                <span>|</span>
                <p class="info">{{ item.experience }}</p>
                <span>|</span>
                <p class="info">{{ item.education }}</p>
                <span>|</span>
                <p class="info">{{ item.lowSalary }}-{{ item.topSalary }}K</p>
              </div>
            </div>
            <div class="jobChat">
              <div class="jobChatLeft">
                <p class="chatNum">{{ item.lookMe }}</p>
                <p class="chatTitle">看过我</p>
              </div>
              <div class="jobChatLeft">
                <p class="chatNum">{{ item.chated }}</p>
                <p class="chatTitle">沟通过</p>
              </div>
              <div class="jobChatLeft">
                <p class="chatNum">{{ item.interested }}</p>
                <p class="chatTitle">感兴趣</p>
              </div>
            </div>
            <div class="status">
              <div class="dot"></div>
              <p>{{ item.status }}</p>
            </div>
            <div class="jobOperation">
              <div
                @click="changeStatus(item.id, item.status)"
                v-if="item.status == '待发布'"
              >
                发布
              </div>
              <div
                @click="editJob(item.id, item.status)"
                v-if="item.status != '招聘中'"
              >
                编辑
              </div>
              <div
                @click="closeJob(item.id, item.status)"
                v-if="item.status == '招聘中'"
              >
                关闭
              </div>
              <div
                @click="deleteJob(item.id, item.status)"
                v-if="item.status != '招聘中'"
              >
                删除
              </div>
              <!-- <img src="@/assets/image/oxman/Coxman/more.png" alt="" /> -->
            </div>
          </div>
        </div>
        <div class="hintCard" v-if="jobCard.length == 0">暂无数据</div>
        <div class="pageBox">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
            v-if="jobCard.length != 0"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- <div class="weChat">
      <img class="gouTong" src="@/assets/image/oxman/Coxman/liaotian111.png" alt="" />
      <div class="chatNumber"><p>26</p></div>
    </div> -->

    <!-- 编辑模态框背景 -->
    <!-- <div class="mainBg" v-show="showEdit"></div> -->
    <!-- 编辑模态框 -->
    <el-dialog class="formBox" :visible.sync="showEdit">
      <div class="jobInfo">
        <div class="allNum">
          <div class="num1">1</div>
          <div class="num2">2</div>
        </div>

        <div class="infoRight">
          <h3>职位基本信息</h3>
          <p>职位发布成功后，招聘类型、职位名称、职位类型，将无法更改</p>
          <div class="companyBox">
            <el-form
              ref="addJob"
              v-model="editForm"
              label-width="110px"
              label-position="right"
            >
              <el-form-item label="公司:">
                <label slot="label"
                  >公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司:</label
                >
                <p class="gsName">{{ companyName }}</p>
              </el-form-item>
              <el-form-item label="招聘类型:">
                <el-select
                  v-model="recruitType"
                  placeholder="请选择"
                  style="width: 473px; height: 40px"
                  disabled
                >
                  <el-option
                    v-for="item in zhaopinType"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称:">
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="editForm.positionName"
                  maxlength="10"
                  show-word-limit
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="职位描述:">
                <el-input
                  type="textarea"
                  :rows="8"
                  placeholder="请输入内容"
                  v-model="editForm.responsibility"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="任职要求:">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="editForm.skillRequire"></el-input>
              </el-form-item> -->
              <el-form-item label="职位类型:">
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="editForm.positionTypeName"
                  show-word-limit
                  @focus="showCard()"
                  disabled
                ></el-input>
              </el-form-item>
              <!-- 下面表单 -->
              <h3 class="yaoQiu">职位要求</h3>
              <p class="p4">
                我们将通过以下条件，为你精确推荐合适的牛人。请尽量详细填写
              </p>
              <el-form-item label="经验和学历:" required class="formButtom">
                <div class="JyAndXl">
                  <el-form-item>
                    <el-select
                      v-model="experience"
                      placeholder="请选择经验"
                      style="width: 154px; height: 40px"
                    >
                      <el-option
                        v-for="item in jingyanArr"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      v-model="education"
                      placeholder="请选择学历"
                      style="width: 154px; height: 40px"
                    >
                      <el-option
                        v-for="item in xueliArr"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item class="XinZi" label="薪资范围:">
                <div class="Xz">
                  <el-select
                    v-model="editForm.lowSalary"
                    placeholder="请选择底薪"
                    style="width: 154px; height: 40px"
                  >
                    <el-option
                      v-for="item in XzLowArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="editForm.topSalary"
                    placeholder="请选择高薪"
                    style="width: 154px; height: 40px"
                  >
                    <el-option
                      v-for="item in XzTopArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="editForm.yearSalary"
                    placeholder="请选择几薪"
                    style="width: 154px; height: 40px"
                  >
                    <el-option
                      v-for="item in XzYearArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <!-- <el-form-item label="职位关键词:">
                <el-button style="width: 80px; height: 40px"
                  ><img src="@/assets/image/oxman/Coxman/add.png" alt=""
                /></el-button>
              </el-form-item> -->
              <el-form-item class="chengshi" label="城市选择:">
                <div class="cityBox">
                  <el-input
                    type="text"
                    readonly
                    placeholder="请输入内容"
                    v-model="cityString"
                  ></el-input>
                  <p @click="toChooseCity">修改</p>
                </div>
              </el-form-item>
              <el-form-item label="工作地点:">
                <!-- <div class="addressBox"> -->
                <el-select
                  v-model="editForm.workAddress"
                  placeholder="请选择工作地点"
                  @change="changeAd($event)"
                  style="width: 473px; height: 40px"
                >
                  <el-option
                    v-for="(item, index) in DdArr"
                    :key="item.id"
                    :label="item.completeAddress"
                    :value="item.completeAddress"
                  >
                  </el-option>
                </el-select>
                <!-- <button class="addBtn">添加地址</button>
                </div> -->
              </el-form-item>
              <el-form-item>
                <div class="cancel" @click="cancelForm('editForm')">取消</div>
                <div class="save" @click="beforeSave('editForm')">保存</div>
              </el-form-item>
            </el-form>
            <p class="jieShao" v-if="email">
              简历将发送到
              {{
                email
              }}，如需更改邮箱，请在【个人中心】中修改已阅读并遵守《希望工厂职位信息发布规则》
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="showCity"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
        <div class="title">
          <h2>公司信息填写须知</h2>
          <img
            src="@/assets/image/login/close.png"
            class="close-btn"
            @click="cancelChoose"
          />
        </div>
        <div class="cityMask">
          <div class="hot-city-list">当前城市</div>
          <h2 v-if="this.cityInfo.name">
            {{ this.cityInfo.name }}-{{ this.areaInfo.name || "全区域" }}
          </h2>
          <h2 v-else>暂未选择</h2>
          <div class="hot-city-list">选择省份</div>
          <div class="city-list">
            <el-select
              v-model="province"
              placeholder="请选择"
              @change="changeProvince"
            >
              <el-option
                v-for="item in provinceArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="hot-city-list">选择城市</div>
          <div class="city-list">
            <el-select v-model="city" placeholder="请选择" @change="changeCity">
              <el-option
                v-for="item in cityArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="hot-city-list">选择区</div>
          <div class="city-list">
            <a
              class="city-btn"
              href="javascript:void(0)"
              @click="changeArea({})"
            >
              全区域
            </a>
            <a
              v-for="area in areas"
              :key="area.id"
              class="city-btn"
              href="javascript:void(0)"
              @click="changeArea(area)"
            >
              {{ area.name }}
            </a>
          </div>
          <div class="btnBox">
            <button class="cancel" @click="cancelChoose">取消</button>
            <button @click="sureChoose">确认</button>
          </div>
        </div>
      </div>
    </el-dialog>
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
import { mapActions, mapMutations, mapGetters } from "vuex";

import jobManagement from "../../api/jobManagement/index";
import Home from "@/api/home";
import Oxman from "@/api/oxman";
import Job from "@/api/job";
export default {
  computed: {
    ...mapGetters(["userId", "userInfo"]),
    cityString() {
      if (this.cityInfo.name) {
        return this.cityInfo.name + "-" + (this.areaInfo.name || "全区域");
      }
      return (
        this.editForm.cityName + "-" + (this.editForm.areaName || "全区域")
      );
    },
  },
  props: {
    title: String,
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.getQueryPositonList();
      vm.queryCompanyAddrList();
    });
  },
  data() {
    let self = this;
    return {
      name: "发布职位",
      i1: null,
      select: "",
      status: [
        { name: "全部职位", id: null },
        { name: "已发布", id: 1 },
        { name: "待发布", id: 0 },
        { name: "停止招聘", id: 2 },
      ],
      searchStr: "",
      jobCard: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      editForm: {},
      recruitType: "",
      experience: "",
      education: "",
      workAddress: "",
      loading: false,
      rules: {},
      showEdit: false,
      showbigCard: false,
      jobOptions: [],
      nowPosition: {},
      sideVisible: false,
      companyName: "",
      // companyId: '30',
      saveId: 0,
      value: "",
      zhaopinType: [
        {
          label: "社招",
          id: 1,
        },
        {
          label: "校招",
          id: 2,
        },
        {
          label: "海归",
          id: 3,
        },
        {
          label: "兼职",
          id: 4,
        },
        {
          label: "灵活就业",
          id: 5,
        },
      ],
      jingyanArr: [
        {
          label: "不限",
          id: 0,
        },
        {
          label: "在校/应届",
          id: 1,
        },
        {
          label: "一年以内",
          id: 2,
        },
        {
          label: "1-3年",
          id: 3,
        },
        {
          label: "3-5年",
          id: 4,
        },
        {
          label: "5-10年",
          id: 5,
        },
        {
          label: "10年以上",
          id: 6,
        },
      ],
      xueliArr: [
        {
          label: "不限",
          id: 0,
        },
        {
          label: "小学",
          id: 1,
        },
        {
          label: "初中",
          id: 2,
        },
        {
          label: "高中",
          id: 3,
        },
        {
          label: "大专",
          id: 4,
        },
        {
          label: "本科",
          id: 5,
        },
        {
          label: "硕士",
          id: 6,
        },
        {
          label: "博士",
          id: 7,
        },
      ],
      XzLowArr: [
        {
          label: "1K",
          id: 1,
        },
        {
          label: "2K",
          id: 2,
        },
        {
          label: "3K",
          id: 3,
        },
        {
          label: "4K",
          id: 4,
        },
        {
          label: "5K",
          id: 5,
        },
        {
          label: "6K",
          id: 6,
        },
        {
          label: "7K",
          id: 7,
        },
        {
          label: "8K",
          id: 8,
        },
        {
          label: "9K",
          id: 9,
        },
        {
          label: "10K",
          id: 10,
        },
        {
          label: "11K",
          id: 11,
        },
        {
          label: "12K",
          id: 12,
        },
        {
          label: "13K",
          id: 13,
        },
        {
          label: "14K",
          id: 14,
        },
        {
          label: "15K",
          id: 15,
        },
        {
          label: "16K",
          id: 16,
        },
        {
          label: "17K",
          id: 17,
        },
        {
          label: "18K",
          id: 18,
        },
        {
          label: "19K",
          id: 19,
        },
        {
          label: "20K",
          id: 20,
        },
        {
          label: "21K",
          id: 21,
        },
        {
          label: "22K",
          id: 22,
        },
        {
          label: "23K",
          id: 23,
        },
        {
          label: "24K",
          id: 24,
        },
        {
          label: "25K",
          id: 25,
        },
        {
          label: "26K",
          id: 26,
        },
        {
          label: "27K",
          id: 27,
        },
        {
          label: "28K",
          id: 28,
        },
        {
          label: "29K",
          id: 29,
        },
        {
          label: "30K",
          id: 30,
        },
      ],
      XzTopArr: [
        {
          label: "1K",
          id: 1,
        },
        {
          label: "2K",
          id: 2,
        },
        {
          label: "3K",
          id: 3,
        },
        {
          label: "4K",
          id: 4,
        },
        {
          label: "5K",
          id: 5,
        },
        {
          label: "6K",
          id: 6,
        },
        {
          label: "7K",
          id: 7,
        },
        {
          label: "8K",
          id: 8,
        },
        {
          label: "9K",
          id: 9,
        },
        {
          label: "10K",
          id: 10,
        },
        {
          label: "11K",
          id: 11,
        },
        {
          label: "12K",
          id: 12,
        },
        {
          label: "13K",
          id: 13,
        },
        {
          label: "14K",
          id: 14,
        },
        {
          label: "15K",
          id: 15,
        },
        {
          label: "16K",
          id: 16,
        },
        {
          label: "17K",
          id: 17,
        },
        {
          label: "18K",
          id: 18,
        },
        {
          label: "19K",
          id: 19,
        },
        {
          label: "20K",
          id: 20,
        },
        {
          label: "21K",
          id: 21,
        },
        {
          label: "22K",
          id: 22,
        },
        {
          label: "23K",
          id: 23,
        },
        {
          label: "24K",
          id: 24,
        },
        {
          label: "25K",
          id: 25,
        },
        {
          label: "26K",
          id: 26,
        },
        {
          label: "27K",
          id: 27,
        },
        {
          label: "28K",
          id: 28,
        },
        {
          label: "29K",
          id: 29,
        },
        {
          label: "30K",
          id: 30,
        },
        {
          label: "31K",
          id: 31,
        },
        {
          label: "32K",
          id: 32,
        },
        {
          label: "33K",
          id: 33,
        },
        {
          label: "34K",
          id: 34,
        },
        {
          label: "35K",
          id: 35,
        },
      ],
      XzYearArr: [
        { label: "12", id: 1 },
        { label: "13", id: 2 },
        { label: "14", id: 3 },
        { label: "15", id: 4 },
        { label: "16", id: 5 },
      ],
      DdArr: [],
      email: "",
      radio: 0,
      positionTypeId: 0,
      province: "",
      provinceInfo: {},
      provinceArr: [],
      city: "",
      cityInfo: {},
      cityArr: [],
      areaInfo: {},
      areas: [],
      showCity: false,
      searchPlugin: null,
      center: [121.5273285, 31.21515044], // 地图中心
      events: {
        init(o) {}, // 地图事件
      },
      plugin: [
        {
          pName: "PlaceSearch",
          events: {
            init(instance) {
              // 实例化高德地图的PlaceSearch插件
              self.searchPlugin = instance;
            },
          },
        },
      ],
    };
  },
  created() {
    this.queryCompanyAddrList();
    console.log(this.userInfo, "我是信息");
    this.queryCompanyInfo();
    setTimeout(() => {
      this.getQueryPositonList();
    }, 500);
    this.getQueryPersonInfo();
    this.queryCityList(1, "");
  },
  mounted() {},
  methods: {
    async queryCityList(level, id) {
      let params = {
        regionLevel: level,
        id: id,
      };
      let res = await Job.queryCityList(params);
      if (res.code == 200) {
        if (level == 1) {
          this.provinceArr = res.data;
          console.log(this.provinceArr);
        }
        if (level == 2) {
          let cityArr = res.data;
          cityArr.forEach((item) => {
            if (item.name == "市辖区") {
              item.name = this.provinceInfo.name;
            }
          });
          this.cityArr = cityArr;
        }
        if (level == 3) {
          let areas = res.data;
          areas.forEach((item) => {
            if (item.name == "市辖区") {
              item.name = this.cityInfo.name;
            }
          });
          this.areas = areas;
        }
      }
    },
    changeProvince(val) {
      this.province = val;
      this.queryCityList(2, this.province);
      this.city = "";
      this.areas = [];
      this.provinceArr.forEach((item) => {
        if (item.id == val) {
          this.provinceInfo = item;
        }
      });
    },
    changeCity(val) {
      this.city = val;
      this.cityArr.forEach((item) => {
        if (item.id == val) {
          this.cityInfo = item;
        }
      });
      this.queryCityList(3, this.city);
    },
    changeArea(area) {
      this.areaInfo = area;
    },
    //选择枚举
    returnIndex(val, arr) {
      let index = -1;
      arr.forEach((item, i) => {
        if (item.id == val) {
          index = i;
        }
      });
      return index;
    },
    // 跳转新增职位页面
    toAddJob() {
      this.$store.dispatch("setOxTitle", this.name);
      this.$router.push({ name: "addJob" });
    },
    //选择职位类型
    async changeJob(value) {
      this.select = value;
      console.log(this.select, "职位类型");
      let data = {
        companyId: this.userInfo.companyId,
        status: this.i1,
        recruitType: value,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      let res = await jobManagement.getQueryPositonList(data);
      console.log(res, "根据职位类型切换");
      this.jobCard = res.data.list;
      this.total = res.data.total;
    },
    //切换颜色 横向tab 筛选 全部 待发布 招聘中
    async changeColor(id) {
      this.i1 = id;
      let data = {
        companyId: this.userInfo.companyId,
        status: id,
        recruitType: this.select,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      let res = await jobManagement.getQueryPositonList(data);
      console.log("根据状态切换", res, this.i1, id);
      this.jobCard = res.data.list;
      this.total = res.data.total;
    },

    //发布职位 修改状态
    async changeStatus(id, status) {
      console.log(id, "我是id");
      let data = {
        companyId: this.userInfo.companyId,
        id: id,
      };
      console.log(status, "我是状态");
      if (status == "待发布") {
        try {
          let res = await jobManagement.releasePositonInfo(data);
          console.log(res.code, "我是修改后");
          if (res.code == 200) {
            this.$message("发布成功");
          } else {
            this.$message(res.data);
          }
        } catch (error) {
          console.log(res.data);
          this.$message("发布失败");
        }
      } else {
        this.$message("该职位已发布或已停止招聘");
      }
      this.changeColor(this.i1);
    },

    // 关闭职位
    async closeJob(id, status) {
      let data = {
        id: id,
      };
      if (status == "招聘中") {
        try {
          let res = await jobManagement.stopPositonInfo(data);
          console.log(res.code);
          if (res.code == 200) {
            this.$message("关闭成功");
          }
        } catch (error) {
          this.$message("关闭失败");
        }
      } else {
        this.$message("非招聘中职位不能关闭");
      }
      this.changeColor(this.i1);
    },
    //删除职位
    async deleteJob(id, status) {
      let data = {
        id: id,
      };
      try {
        await jobManagement.deletePositonInfo(data);
        this.$message({
          message: "删除成功",
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: "删除失败",
          type: "error",
        });
      }
      let params = {
        companyId: this.userInfo.companyId,
        status: this.i1,
        recruitType: null,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      let res = await jobManagement.getQueryPositonList(params);
      console.log(res, "全部职位");
      this.jobCard = res.data.list;
      this.total = res.data.total;
    },

    //编辑职位
    async editJob(id, status) {
      if (status !== "招聘中") {
        this.showEdit = true;
        let data = {
          id: id,
        };
        let res = await jobManagement.queryPositonInfo(data);
        console.log(res.data, "这是职位详情");
        // this.companyName = this.companyName
        this.editForm = res.data;
        this.saveId = id;
        this.education = res.data.educationCode;
        this.experience = res.data.experienceCode;
        this.recruitType = res.data.recruitTypeCode;

        this.recruitType =
          this.returnIndex(this.recruitType, this.zhaopinType) > -1
            ? this.zhaopinType[
                this.returnIndex(this.recruitType, this.zhaopinType)
              ].id
            : "";
        this.experience =
          this.returnIndex(this.experience, this.jingyanArr) > -1
            ? this.jingyanArr[
                this.returnIndex(this.experience, this.jingyanArr)
              ].id
            : "";
        this.education =
          this.returnIndex(this.education, this.xueliArr) > -1
            ? this.xueliArr[this.returnIndex(this.education, this.xueliArr)].id
            : "";
        console.log(
          this.recruitType,
          this.experience,
          this.education,
          "我是测试回填数据的"
        );
      } else {
        this.$message("该职位在招聘中或已停止招聘,无法编辑");
      }
    },
    //模态框
    // 展示职位选择数据
    showSide(index) {
      this.nowPosition = this.jobOptions[index];
      this.sideVisible = true;
    },
    // 隐藏职位选择
    hideSide() {
      this.sideVisible = false;
      this.nowPosition = {};
    },
    // 选择职业类型方法
    selectJob(value, id) {
      console.log(value, "1111111111111111111");
      this.editForm.positionTypeName = value;
      this.showbigCard = false;
      this.positionTypeId = id;
    },
    //地址获取
    async queryCompanyAddrList() {
      let data = {
        companyId: this.userInfo.companyId,
      };
      let res = await jobManagement.queryCompanyAddrList(data);
      this.DdArr = res.data.list;
      console.log(this.DdArr, "这是地址");
    },
    //地址选择事件
    changeAd(val) {
      const _this = this;
      this.searchPlugin.search(val, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          if (!result.poiList.pois.length) {
            _this.$message.error("未查询到该地址，请重新选择");
          } else {
            let lng = result.poiList.pois[0].location.lng;
            let lat = result.poiList.pois[0].location.lat;
            _this.editForm.longitude = lng;
            _this.editForm.latitude = lat;
            console.log("经纬度：");
            console.log(lng, lat);
          }
        } else {
          _this.$message.error("未查询到该地址，请重新选择");
        }
      });
    },
    beforeSave() {
      console.log("cityInfo", this.cityInfo);
      let workCityCode = this.cityInfo.zipcode
        ? this.cityInfo.zipcode
        : this.editForm.cityCode;
      let workAreaCode = this.areaInfo.zipcode
        ? this.areaInfo.zipcode
        : this.editForm.areaCode;
      this.DdArr.forEach((item) => {
        if (item.completeAddress == this.editForm.workAddress) {
          if (workCityCode == item.cityCode && workAreaCode == item.areaCode) {
            this.editForm.el = item;
          }
        }
      });
      console.log(111, this.editForm.el);
      if (!this.editForm.el || !this.editForm.el.workAddress) {
        this.editForm.el = {};
        this.$confirm(
          "您当前职位地址与公司地址不一致，是否需要新增公司地址？",
          "提示",
          {
            distinguishCancelAndClose: true,
            confirmButtonText: "新增地址",
            cancelButtonText: "继续提交",
          }
        )
          .then(() => {
            this.showEdit = false;
            this.$router.push({ path: "/oxHome/userCenter/address" });
          })
          .catch((action) => {
            console.log(this.editForm.el);
            if (action == "cancel") {
              this.saveForm();
            }
          });
      } else {
        console.log(this.editForm.el);
        this.saveForm();
      }
    },
    //保存
    async saveForm() {
      let data1 = {
        companyId: this.userInfo.companyId,
      };
      // let res = await jobManagement.queryCompanyAddrList(data1)
      // this.DdArr = res.data.list
      // for (let i = 0; i < this.DdArr.length; i++) {
      //   const el = this.DdArr[i]
      //   this.editForm.el = el
      // }
      let data = {
        id: this.saveId || "",
        companyId: this.userInfo.companyId,
        companyName: this.companyName,
        positionName: this.editForm.positionName || "",
        recruitType: this.recruitType + "" || "",
        responsibility: this.editForm.responsibility || "",
        skillRequire: "",
        topSalary: parseInt(this.editForm.topSalary) || "",
        lowSalary: parseInt(this.editForm.lowSalary) || "",
        yearSalary: this.editForm.yearSalary || "",
        education: this.education + "" || "",
        experience: this.experience + "" || "",
        workAddress: this.editForm.workAddress,
        longitude: this.editForm.longitude,
        latitude: this.editForm.latitude,
        welfare: "",
        positionTypeId: this.editForm.positionTypeId || "",
        cityCode:
          this.cityInfo.zipcode ||
          this.editForm.el.cityCode ||
          this.editForm.cityCode,
        cityName: this.cityInfo.name || this.editForm.cityName,
        areaCode: this.cityInfo.zipcode
          ? this.areaInfo.zipcode || ""
          : this.editForm.el.areaCode || this.editForm.areaCode,
        areaName: this.cityInfo.zipcode
          ? this.areaInfo.name || ""
          : this.editForm.el.areaName || this.editForm.areaName,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      console.log(data, "我是编辑的data");
      try {
        const res = await jobManagement.updatePositonInfo(data);
        console.log(res.code, res.data, "我是测试");
        this.$message.success("编辑成功");
      } catch (error) {
        this.$message.error("编辑失败");
      }
      console.log(data, "我是编辑");
      this.showEdit = false;
      this.changeColor(this.i1);
    },
    //取消
    cancelForm() {
      this.showEdit = false;
      this.editForm = {};
    },

    //获取职位列表
    async getQueryPositonList() {
      let params = {
        companyId: this.userInfo.companyId,
        status: null,
        recruitType: null,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      let res = await jobManagement.getQueryPositonList(params);
      console.log(res, "全部职位");
      this.jobCard = res.data.list;
      this.total = res.data.total;
    },

    //获取公司信息
    async queryCompanyInfo() {
      let params = {
        // id: 24,
        id: this.userInfo.companyId || "24",
      };
      let res = await Oxman.queryCompanyInfo(params);
      console.log(this.userInfo.companyId, "我是公司Id");
      // console.log(res.data, '我是公司信息')
      this.companyName = res.data.companyName;
    },

    //获取公司个人信息
    async getQueryPersonInfo() {
      let data = { userId: this.userId };
      let res = await Oxman.queryPersonInfo(data);
      this.email = res.data.email;
      console.log(res, "我是公司用户信息");
    },

    // 分页跳转
    currentChange(val) {
      if (val == this.currentPage) {
        return;
      }
      this.currentPage = val;
      this.getQueryPositonList();
    },
    toChooseCity() {
      this.showCity = true;
      this.cityInfo = {
        name: this.editForm.cityName,
      };
      this.areaInfo = {
        name: this.editForm.areaName,
      };
    },
    cancelChoose() {
      this.cityInfo = {};
      this.areaInfo = {};
      this.province = "";
      this.provinceInfo = {};
      this.city = "";
      this.cityArr = [];
      this.areas = [];
      this.showCity = false;
    },
    sureChoose() {
      this.province = "";
      this.city = "";
      this.cityArr = [];
      this.areas = [];
      this.showCity = false;
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
@import url("//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css");
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
.main {
  // width: 100%;
  // height: auto;
  background: linear-gradient(
    180deg,
    rgba(36, 70, 168, 0.25) 0%,
    rgba(36, 70, 168, 0) 100%
  );
  padding: 32px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  // div {
  //   border: 1px solid red;
  // }
  .jobBox {
    width: 1000px;
    height: auto;
    .jobTitle {
      width: 1000px;
      height: 40px;
      display: flex;
      .postJob {
        width: 113px;
        height: 40px;
        background: #2446a8;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          margin-left: 12px;
        }
        p {
          width: 61px;
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
          letter-spacing: 1px;
          -webkit-background-clip: text;
          margin-left: 4px;
        }
      }
      .searchJob {
        width: 174px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #dadde2;
        margin-left: 726px;
        display: flex;
        align-items: center;
        input {
          width: 122px;
          height: 20px;
          margin-left: 20px;
        }
        img {
          width: 12px;
          height: 12px;
          z-index: 1;
        }
      }
      .screenJob {
        width: 174px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #dadde2;
        margin-left: 705px;
      }
    }
    .jobStatus {
      display: flex;
      margin-top: 20px;
      .statusSelect {
        width: 80px;
        height: 32px;
        opacity: 1;
        color: #333333;
        cursor: pointer;
      }
      .active {
        width: 80px;
        height: 32px;
        background: rgba(36, 70, 168, 0.1);
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        color: #2446a8;
        border: 1px solid #2446a8;
      }
    }
    .jobContent {
      width: 1000px;
      margin-top: 24px;
      .jobBac {
        width: 1000px;
        height: 94px;
        border-radius: 4px 4px 4px 4px;
        background: #ffffff;
        padding: 2px;
        box-sizing: border-box;
        margin-top: 16px;
        .jobCard {
          width: 996px;
          height: 90px;
          background: url("~@/assets/image/oxman/Coxman/Bg32@2x.png");
          display: flex;
          .jobName {
            min-width: 232px;
            height: 100%;
            padding-left: 18px;
            padding-top: 18px;
            box-sizing: border-box;
            .jobNameTop {
              min-width: 55px;
              display: flex;
              height: 22px;
              font-size: 16px;
              font-family: PingFang SC-Semibold, PingFang SC;
              font-weight: 600;
              color: #222222;
              line-height: 22px;
              -webkit-background-clip: text;
            }
            .jobNameBottom {
              min-width: 232px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 20px;
              -webkit-background-clip: text;
              margin-top: 12px;
              display: flex;
              .info {
                // min-width: 68px;
                font-size: 13px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 20px;
                -webkit-background-clip: text;
                display: flex;
                margin-left: 5px;
              }
              .info:first-child {
                margin-left: 0px;
              }
              span {
                // display: inline-block;
                margin-left: 8px;
                color: #dadde2;
              }
            }
          }
          .jobChat {
            width: 174px;
            height: 100%;
            margin-left: 140px;
            display: flex;
            .jobChatLeft {
              width: 58px;
              height: 100%;
              padding-top: 22px;
              box-sizing: border-box;
              .chatNum {
                min-width: 20px;
                height: 22px;
                font-size: 16px;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 22px;
                -webkit-background-clip: text;
              }
              .chatTitle {
                width: 42px;
                height: 20px;
                font-size: 14px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 20px;
                -webkit-background-clip: text;
                margin-top: 4px;
                margin-left: 7px;
              }
            }
          }
          .status {
            min-width: 60px;
            height: 100%;
            margin-left: 80px;
            display: flex;
            align-items: center;
            .dot {
              width: 8px;
              height: 8px;
              background: #26c583;
              border-radius: 50%;
              opacity: 1;
            }
            p {
              min-width: 60px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #3d3d3d;
              line-height: 20px;
              -webkit-background-clip: text;
              margin-left: 5px;
              display: flex;
            }
          }
          .jobOperation {
            // width: 198px;
            height: 100%;
            margin-left: 98px;
            display: flex;
            align-items: center;
            // justify-content: space-between;
            div {
              width: 28px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #2446a8;
              line-height: 20px;
              -webkit-background-clip: text;
              margin-left: 24px;
              cursor: pointer;
            }
            img {
              width: 16px;
              height: 16px;
              margin-left: 24px;
            }
          }
        }
      }
      .hintCard {
        padding: 100px 0;
        box-sizing: border-box;
        text-align: center;
        font-size: 30px;
        color: #494949;
      }
      .pageBox {
        margin: 32px 0 40px 0;
      }
    }
  }
  // .weChat {
  //   position: absolute;
  //   right: 47px;
  //   bottom: 98px;
  //   .gouTong {
  //     width: 40px;
  //     height: 40px;
  //   }
  //   .chatNumber {
  //     width: 22px;
  //     height: 16px;
  //     background: #ff3525;
  //     border-radius: 16px 16px 16px 16px;
  //     opacity: 1;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     position: absolute;
  //     right: -8px;
  //     top: -8px;
  //     p {
  //       width: 13px;
  //       height: 14px;
  //       font-size: 10px;
  //       font-family: PingFang SC-Regular, PingFang SC;
  //       font-weight: 400;
  //       color: #ffffff;
  //       line-height: 14px;
  //       -webkit-background-clip: text;
  //     }
  //   }
  // }
}

//弹框内容样式
.formBox {
  // width: 700px;
  // // height: 100%;
  // margin-left: -350px;
  // border-radius: 0px 0px 0px 0px;
  // position: absolute;
  // margin-top: 31px;
  // background: #ffffff;
  // opacity: 1;
  // padding: 20px;
  // box-sizing: border-box;
  // border-radius: 4px;
  // left: 50%;

  .jobInfo {
    // width: 605px;
    // height: 500px;
    padding: 60px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .allNum {
      .num1 {
        width: 17px;
        height: 605px;
        font-size: 40px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2446a8;
        line-height: 56px;
      }
      .num2 {
        width: 17px;
        height: 530px;
        font-size: 40px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #2446a8;
        line-height: 56px;
      }
    }

    .infoRight {
      width: 588px;
      // height: 500px;
      margin-left: 15px;
      h3 {
        width: 108px;
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        line-height: 25px;
        margin-left: 10px;
      }
      p {
        width: 462px;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        -webkit-background-clip: text;
        margin-top: 12px;
        margin-left: 10px;
      }
      .companyBox {
        margin-top: 24px;
        height: auto;
        .gsName {
          // width: 200px;
          height: 20px;
          display: flex;
          margin-left: 1px;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          margin-top: 10px;
          display: flex;
        }
        .yaoQiu {
          width: 108px;
          height: 25px;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          line-height: 25px;
          display: flex;
          margin-top: 32px;
        }
        .p4 {
          width: 462px;
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          -webkit-background-clip: text;
          margin-top: 12px;
          display: flex;
        }
        .formButtom {
          margin-top: 25px;
          height: 60px;
          .JyAndXl {
            display: flex;
            width: 325px;
            justify-content: space-between;
          }
        }
        .XinZi {
          .Xz {
            display: flex;
            justify-content: space-between;
          }
        }
        .jieShao {
          // width: 447px;
          height: 40px;
          font-size: 14px;
          font-weight: 400;
          color: #3d3d3d;
          line-height: 20px;
          margin-left: 70px;
          margin-top: -30px;
        }
        .save {
          width: 100px;
          height: 40px;
          background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
          border-radius: 4px 4px 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
          right: 120px;
          bottom: -140px;
          cursor: pointer;
          .fabu {
            width: 28px;
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
          }
        }
        .cancel {
          width: 100px;
          height: 40px;
          background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
          border-radius: 4px 4px 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
          right: 350px;
          bottom: -140px;
          cursor: pointer;
          .fabu {
            width: 28px;
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
          }
        }
      }
    }
  }
}

.dropdown-child {
  position: absolute;
  top: 52px;
  left: 805px;
  width: 810px;
  height: 500px;
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

::v-deep .el-form-item__label {
  margin-bottom: -20px;
}
::v-deep .el-form-item__label {
  color: #666666;
  text-align: center;
}
::v-deep .el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

// .addressBox{
//   display: flex;
//   align-items: center;
//   .addBtn{
//     width: 100px;
//     height: 40px;
//     background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
//     border-radius: 4px 4px 4px 4px;
//     font-size: 14px;
//     color: #ffffff;
//     cursor: pointer;
//   }
// }

.cityBox {
  display: flex;
  align-items: center;
  .el-input {
    width: 100%;
  }
  p {
    width: 50px !important;
    cursor: pointer;
    margin: 0 !important;
  }
}
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
.dialog-content {
  position: relative;
  width: 100%;
  // height: 250px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  padding-bottom: 24px;
  .title {
    position: relative;
    padding: 24px 24px 0px 24px;
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #222222;
      display: flex;
      align-items: flex-end;
      span {
        font-size: 14px;
        color: #999999;
      }
    }
    .close-btn {
      position: absolute;
      top: 24px;
      right: 22px;
    }
  }
}
.cityMask {
  padding: 0 20px 80px 20px;
  h2 {
    text-align: left;
  }
  .hot-city-list {
    text-align: left;
    color: #222222;
    font-weight: 500;
    font-size: 16px;
    margin: 20px 0 16px;
  }
  .city-list {
    text-align: left;
    .city-btn {
      display: inline-block;
      min-width: 90px;
      height: 32px;
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #d4d5d6;
      transition: all 0.2s linear;
      padding: 0 12px;
      box-sizing: border-box;
      margin: 0 8px 16px 8px;

      &:hover,
      &:focus {
        border: 1px solid #0470b8;
        color: #0470b8;
      }
    }
  }
  .btnBox {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 20px;
    bottom: 20px;
    button {
      width: 100px;
      height: 40px;
      background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px 4px 4px 4px;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .cancel {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid #dadde2;
      color: #333333;
      margin-right: 16px;
    }
  }
}
.map-hidden {
  display: none;
}
</style>
