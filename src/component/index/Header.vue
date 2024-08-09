<!-- 大部分页面的头部模块 -->
<!-- 内容主要包括登录和以及登录后需显示的信息，以及网站的几个大选项（如首页、公司等） -->
<template>
  <div>
    <!-- 注册框 -->
    <div>
      <el-drawer
        title="企业员工招聘系统"
        :visible.sync="showregister"
        :direction="direction"
        :before-close="handleClose1"
      >
        <el-card class="box-card" style="margin-top: 10%">
          <div slot="header" style="margin-top: 5%">
            <H1 style="margin-bottom: 5%">注册账号</H1>
            <el-form ref="form" :model="registerform" :rules="registerRules">
              <el-form-item label="账号" prop="username" label-width="25%">
                <el-input
                  type="text"
                  placeholder="请输入账号"
                  v-model="registerform.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="nickname" label-width="25%">
                <el-input
                  type="text"
                  placeholder="请输入姓名"
                  v-model="registerform.nickname"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="tel" label-width="25%">
                <el-input
                  type="text"
                  placeholder="请输入手机号"
                  v-model="registerform.tel"
                >
                  <template slot="append">
                    <el-button>发送验证码</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="验证码" label-width="25%">
                <el-input placeholder="请输入验证码" v-model="code"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="25%">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="registerform.password"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="confirm_password"
                label-width="25%"
              >
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="registerform.confirm_password"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户类型" prop="roletype" label-width="25%">
                <div>
                  <el-radio v-model="registerform.roletype" label="2"
                    >求职者</el-radio
                  >
                  <el-radio v-model="registerform.roletype" label="3"
                    >招聘者</el-radio
                  >
                </div>
              </el-form-item>
              <el-form-item inline-message>
                <el-button
                  type="primary"
                  @click="userRegister()"
                  style="width: 100%"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-drawer>
    </div>

    <!-- 登录框 -->
    <div>
      <el-drawer
        title="企业员工招聘系统"
        :visible.sync="showlogin"
        :direction="direction"
        :before-close="handleClose"
      >
        <el-card class="box-card" style="margin-top: 20%">
          <div slot="header" style="margin-top: 20%">
            <H1 style="margin-bottom: 5%">欢迎登录</H1>
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item label="账号" prop="username" label-width="15%">
                <el-input
                  type="text"
                  placeholder="请输入用户名"
                  v-model="form.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="15%">
                <el-input
                  type="password"
                  placeholder="请输入密码"
                  v-model="form.password"
                ></el-input>
              </el-form-item>
              <el-form-item inline-message>
                <el-row>
                  <el-col>
                    <el-button
                      type="primary"
                      @click.native.prevent="throttleLogin"
                      style="width: 100%"
                      >登录
                    </el-button>
                  </el-col>
                  <el-col>
                    <p
                      @click="
                        showlogin = false;
                        showfind = true;
                      "
                      style="cursor: pointer; text-decoration: underline"
                    >
                      忘记密码
                    </p>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-drawer>
    </div>

    <!-- 忘记密码 -->
    <div>
      <el-drawer
        title="企业员工招聘系统"
        :visible.sync="showfind"
        :direction="direction"
        :before-close="handleClose2"
      >
        <el-card class="box-card" style="margin-top: 20%">
          <div slot="header" style="margin-top: 8%">
            <H1 style="margin-bottom: 5%">找回密码</H1>
            <el-form
              ref="form"
              @submit.prevent="throttleLogin()"
              :model="form"
              :rules="rules"
            >
              <el-form-item label="账号" prop="username" label-width="25%">
                <el-input
                  type="text"
                  placeholder="请输入账号"
                  v-model="form.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="username" label-width="25%">
                <el-input
                  type="text"
                  placeholder="请输入手机号"
                  v-model="form.username"
                >
                  <template slot="append">
                    <el-button>发送验证码</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="username" label-width="25%">
                <el-input
                  type="text"
                  placeholder="请输入验证码"
                  v-model="form.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="25%">
                <el-input
                  type="password"
                  placeholder="请输入新密码"
                  v-model="form.password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password" label-width="25%">
                <el-input
                  type="password"
                  placeholder="请确认新密码"
                  v-model="form.password"
                ></el-input>
              </el-form-item>
              <el-form-item inline-message>
                <el-row>
                  <el-col>
                    <el-button
                      type="primary"
                      @click="throttleLogin()"
                      @keyup.enter="throttleLogin()"
                      style="width: 100%"
                      >提交</el-button
                    >
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-drawer>
    </div>

    <!-- 头部 -->
    <div id="headTop">
      <div class="contains">
        <div class="left">
<!--          <img src="@/assets/image/home/logo.png" class="home-icon" />-->
<!--                              <img src="@/assets/image/about/home-logo.png" class="home-icon" />-->
          <img src="https://hope-service.oss-cn-beijing.aliyuncs.com/images/logo-2024-2.jpg" class="home-icon"/>
          <div
            class="location"
            @click="citySelect"
            v-if="$route.path === '/index/home'"
          >
            <img src="@/assets/image/about/location-white.png" class="icon" />
            <div class="cur-city">{{ cityName }}</div>
            <div class="change-btn">[切换城市]</div>
          </div>
          <div class="tabs">
            <ul class="navlist" id="navNum">
              <li :class="{ now: this.activeRouter === 0 }" @click="num = '1'">
                <router-link to="/index">首页</router-link>
              </li>
              <li :class="{ now: this.activeRouter === 1 }" @click="num = '2'">
                <router-link to="/index/job">职位</router-link>
              </li>
              <li :class="{ now: this.activeRouter === 3 }" @click="num = '4'">
                <router-link to="/index/socialRec">社招</router-link>
              </li>
              <li :class="{ now: this.activeRouter === 2 }" @click="num = '3'">
                <router-link to="/index/schoolRec">校招</router-link>
              </li>
              <li :class="{ now: this.activeRouter === 4 }" @click="num = '5'">
                <router-link to="/index/returnee">海归</router-link>
              </li>
              <li :class="{ now: this.activeRouter === 8 }" @click="num = '6'">
                <router-link to="/index/flexible">灵活就业</router-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- <ul class="right2">
          <li v-if="this.userstate">
            <span>
              <el-button type="primary" round @click="tobacked">进入后台</el-button>&nbsp;
              <el-button type="danger" round @click="outLogin">注销</el-button>&nbsp;&nbsp;&nbsp;
            </span>
            <span style="font-size: 22x"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ nickname }}，欢迎使用系统</span
            >
          </li>
        </ul> -->
        <ul class="right" v-if="this.userstate && isemployee">
          <li style="font-size: 18px">
            <router-link to="/resume-create"
              >我的简历&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
          <li style="font-size: 18px">
            <router-link to="/box/wait"
              >投递箱&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
          <li style="font-size: 18px">
            <router-link to="/collection"
              >收藏夹&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
        </ul>
        <ul class="right" v-if="this.userstate && ishr">
          <li style="font-size: 18px">
            <router-link to="/company/modify"
              >我的企业&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
          <li style="font-size: 18px">
            <router-link to="/application/wait"
              >查看职位申请&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
          <li style="font-size: 18px">
            <router-link to="/interview/manage"
              >面试管理&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
        </ul>
        <ul class="right" v-if="this.userstate && isadmin">
          <li style="font-size: 18px">
            <router-link to="/company/examine/wait"
              >企业认证管理&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
          <li style="font-size: 18px">
            <router-link to="/position/examine/wait"
              >职位审核&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
        </ul>
        <ul class="right1">
          <li v-if="!showPro" :class="{ nowAt: activeRouter === 5 }">
            <router-link to="/index/beExpert">成为专家</router-link>
          </li>
          <li>
            <router-link :to="jobPath">我要求职</router-link>
          </li>
          <li>
            <router-link to="/login/login?loginType=2">我要招聘</router-link>
          </li>
          <li :class="{ nowAt: activeRouter === 6 }">
            <router-link to="/index/ask">我要咨询</router-link>
          </li>
          <li
            :class="{ nowAt: activeRouter === 7 }"
            v-if="isUser"
            class="unreadLi"
          >
            <router-link to="/index/immediately">
              通知
              <span
                class="unreadSpan"
                v-show="
                  $route.name != 'immediately' && unreadSum && unreadSum > 0
                "
                >{{ unreadSum }}</span
              >
            </router-link>
          </li>
          <li>
            <el-dropdown v-if="isUser">
              <div class="avatar">
                <div class="user-name">
                  {{ userInfo.userName || userInfo.mobile }}
                </div>
                <img :src="info.headUrl || info.headPath" />
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="gotoUserCenter"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item @click.native="gotoShieldCompany"
                  >隐私保护</el-dropdown-item
                >
                <el-dropdown-item @click.native="outLogin"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain @click="gotoLogin" v-else>登录/注册</el-button>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog :visible.sync="cityShow" :show-close="false">
      <div slot="title" class="dialog-header">
        <div class="title-text">城市选择</div>
        <img
          src="@/assets/image/login/close.png"
          class="close-btn"
          @click="closeDialog"
        />
      </div>
      <div class="cur-posi">当前定位</div>
      <div class="now-location">
        <img src="@/assets/image/about/location-white.png" class="icon" />
        <div class="cur-city">{{ cityName }}</div>
      </div>
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
      <!-- <div class="hot-city-list">热门城市</div> -->
      <div class="hot-city-list">选择城市</div>
      <div class="city-list">
        <a
          v-for="city in cities"
          :key="city.id"
          class="city-btn"
          href="javascript:void(0)"
          @click="locate(city)"
        >
          {{ city.name == "市辖区" ? provinceInfo.name : city.name }}
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import webIMmixin from "@/lin/mixin/webIMmixin";
import store from "@/store";
import { mapActions, mapMutations, mapGetters } from "vuex";
import Vue from "vue";
import Croppa from "vue-croppa";
import User from "@/lin/model/user";
import Utils from "@/lin/util/util";
import _axios, { post, get, put } from "@/lin/plugin/axios";
import Auth from "@/api/auth";
import Job from "@/api/job";

Vue.use(Croppa);

export default {
  mixins: [webIMmixin],
  data() {
    return {
      flag: true,
      provinceInfo: {},
      province: "",
      provinceArr: [],
      defaultHeadMan:
        "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/696b369d-859e-42cd-814c-64cbab6955f5.png",
      defaultHeadWoman:
        "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/242bc3de-fed9-4f30-b51f-f571400cdcf0.png",
      groupId: "",
      code: "",
      myFlag: true,
      num: 0,
      showfind: false,
      showlogin: false,
      showregister: false,
      isone: false,
      istwo: false,
      direction: "rtl",
      loading: false, // 加载动画
      wait: 2, // 2000ms之内不能重复发起请求
      throttleLogin: null, // 节流登录
      form: {
        username: "",
        password: "",
      },
      registerform: {
        roletype: "",
        nickname: "",
        username: "",
        password: "",
        confirm_password: "",
        tel: "",
        group_ids: [""],
      },
      registerRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        roletype: [
          {
            required: true,
            message: "请选择用户类型",
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
        ],
        confirm_password: [
          {
            required: true,
            message: "请确认输入密码",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur",
          },
        ],
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      cityShow: false,
      cities: [],
    };
  },
  props: ["isnow", "info"],
  inject: ["eventBus"],
  created() {},
  computed: {
    ...mapGetters(["userId", "cityName", "provinceObj"]), // 'userInfo',
    isUser() {
      return Boolean(this.userId);
    },
    activeRouter() {
      let pathStr = this.$route.path;
      let activeIndex = 0;
      switch (pathStr) {
        case "/index/home":
          activeIndex = 0;
          break;
        case "/index/job":
        case "/index/company":
        case "/index/info":
          activeIndex = 1;
          break;
        case "/index/schoolRec":
          activeIndex = 2;
          break;
        case "/index/socialRec":
          activeIndex = 3;
          break;
        case "/index/returnee":
          activeIndex = 4;
          break;
        case "/index/beExpert":
          activeIndex = 5;
          break;
        case "/index/ask":
          activeIndex = 6;
          break;
        case "/index/immediately":
          activeIndex = 7;
          break;
        case "/index/flexible":
          activeIndex = 8;
          break;
        default:
          activeIndex = -1;
          break;
      }
      return activeIndex;
    },
    showPro() {
      return this.$route.path.indexOf("schoolRec") > -1;
    },
    isemployee: function () {
      if (store.getters.user === null) {
        return false;
      }
      // 求职者groupId==2
      if (this.groupId === 2 || store.getters.groupId === 2) {
        return true;
      }
      return false;
    },
    ishr: function () {
      if (store.getters.user === null) {
        return false;
      }
      // hr groupId==3
      if (this.groupId === 3 || store.getters.groupId === 3) {
        return true;
      }
      return false;
    },
    isadmin: function () {
      if (store.getters.user === null) {
        return false;
      }
      // hr groupId==3
      if (this.groupId === 4 || store.getters.groupId === 4) {
        return true;
      }
      return false;
    },
    nickname: function () {
      if (store.getters.user === null) {
        return null;
      } else {
        console.log(store.getters);
        return store.getters.user.nickname;
      }
    },
    userstate: function () {
      if (store.getters.user === null) {
        return false;
      }
      return true;
    },
    jobPath() {
      return this.userId ? "/index/job" : "/login/goLogin";
    },
  },
  methods: {
    gotoShieldCompany() {
      this.$router.push({ path: "/index/shieldCompany" });
    },
    async queryCityList() {
      let params = {
        regionLevel: 1,
        id: "",
      };
      let res = await Job.queryCityList(params);
      if (res.code == 200) {
        this.provinceArr = res.data;
        res.data.forEach((p) => {
          if (p.name === this.provinceObj.province) {
            this.changeProvince(p.id);
          }
        });
        // console.log(this.provinceArr)
      }
    },
    async queryCityList1() {
      let params = {
        regionLevel: 2,
        id: this.province,
      };
      let res = await Job.queryCityList(params);
      if (res.code == 200) {
        this.cities = res.data;
        // console.log(this.cities)
      }
    },
    changeProvince(val) {
      this.province = val;
      this.provinceArr.forEach((item) => {
        if (val == item.id) {
          this.provinceInfo = item;
          this.$store.commit("SET_NOW_PROVINCE", {
            province: item.name,
            zipcode: item.adcode,
          });
        }
      });
      this.queryCityList1();
    },
    locate(city) {
      if (city.name == "市辖区") {
        city.name = this.provinceInfo.name;
      }
      this.$store.commit("SET_NOW_CITY", city.name);
      this.cityShow = false;
    },
    // async getCityList() {
    //   let res = await Auth.queryHotCityList({})
    //   this.cities = res.data
    //   if (!this.cityName) {
    //     this.$store.commit('SET_NOW_CITY', res.data[0].name)
    //   }
    // },
    citySelect() {
      this.cityShow = true;
    },
    closeDialog() {
      this.cityShow = false;
    },
    gotoUserCenter() {
      if (this.userInfo.userType == 1) {
        this.$router.push({ path: "/index/userCenter" });
      } else if (this.userInfo.userType == 2) {
        this.$router.push({ path: "/oxHome/userCenter" });
      }
    },
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    async userRegister() {
      try {
        this.registerform.group_ids[0] = this.registerform.roletype;
        const res = await User.register(this.registerform);
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`注册成功`);
          this.resetForm(formName);
        }
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleClose(done) {
      this.form = {
        username: "",
        password: "",
      };
      this.showlogin = false;
    },
    handleClose1(done) {
      this.form = {
        username: "",
        password: "",
      };
      this.showregister = false;
    },
    handleClose2(done) {
      this.form = {
        username: "",
        password: "",
      };
      this.showfind = false;
    },
    async login() {
      const { username, password } = this.form;
      try {
        this.loading = true;
        await User.getToken(username, password);
        await this.getInformation();
        this.loading = false;
        // this.$router.push('/about')
        this.handleClose();
        this.$message.success("登录成功");
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    async getInformation() {
      try {
        // 尝试获取当前用户信息
        const user = await User.getPermissions();
        this.setUserAndState(user);
        this.setUserPermissions(user.permissions);
        const id = store.getters.user === null ? "" : store.getters.user.id;
        const res = await get("recruit/user/getGroup/" + id);
        store.getters.groupId = res;
        this.groupId = res;
      } catch (e) {
        console.log(e);
      }
    },
    outLogin() {
      this.loginOut();
      setTimeout(() => {
        this.$message.success("退出登录成功");
        this.$router.replace({ path: "/index/home" });
      }, 500);
    },
    ...mapActions(["loginOut", "setUserAndState"]),
    ...mapMutations({
      setUserPermissions: "SET_USER_PERMISSIONS",
    }),
    async tobacked() {
      this.$router.push({
        path: "/about",
      });
    },
  },
  mounted() {
    this.queryCityList();
    this.num = this.isnow;
    this.eventBus.$on("changeTab", (tab) => {
      this.num = tab;
    });
  },
  created() {
    // 节流登录
    this.throttleLogin = Utils.throttle(this.login, this.wait);
    // this.getCityList()
  },
  watch: {},
};
</script>

<style lang="scss">
@import url("//at.alicdn.com/t/font_631781_uzwcwz6vcmcxr.css");
$nx-color: #449efe;
$nx-color2: #0470b8;
$all-padding: 0;
$nx-width: 1200px;

.loginbox {
  width: 60%;

  height: 60%;

  min-width: 400px;

  max-width: 500px;

  padding: 20px;

  overflow: auto;

  margin: auto;

  position: absolute;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.left {
  padding-left: $all-padding;
  display: flex;
  align-items: center;

  .home-icon {
    width: 171px;
    height: 65px;
    margin-right: 24px;
  }

  .location {
    transition: display 2s ease 0s;
    cursor: pointer;
    // margin-left: 24px;
    margin-right: 22px;
    display: flex;
    align-items: center;
    .icon {
      width: 16px;
      height: 16px;
    }
    .cur-city {
      height: 20px;
      line-height: 20px;
      margin: 0 8px 0 2px;
      font-size: 14px;
      color: #ffffff;
    }
    .change-btn {
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #ffffff;
      cursor: pointer;
    }
  }

  .tabs {
    .navlist {
      height: 100%;

      li {
        float: left;
        margin: 10px;
        // padding: 0 0 11px;
        font-size: 14px;
        color: #ffffff;
        position: relative;

        &.now,
        &:hover {
          color: #ffffff;
          a {
            font-weight: 700;
          }

          &:after {
            content: "";
            display: block;
            width: 16px;
            height: 2px;
            background-color: #ffffff;
            position: absolute;
            top: 29px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}

.right2 {
  font-size: large;
  margin-top: auto;
  float: right;
  padding-left: $all-padding;
}

.right {
  margin-top: 7px;
  cursor: pointer;
  float: right;
  padding-right: $all-padding;
}

.right1 {
  cursor: pointer;
  padding-right: $all-padding;
  display: flex;
  align-items: center;
  li {
    margin-right: 24px;

    a {
      color: #ffffff;
    }

    ::v-deep .el-button {
      border-radius: 4px;
      border: 1px solid #ffffff;
      color: #ffffff;
    }
  }
  li.nowAt {
    a {
      color: #63a5f6;
    }
  }
  li.unreadLi {
    a {
      position: relative;
      .unreadSpan {
        color: #fff;
        font-size: 10px;
        display: inline-block;
        position: absolute;
        right: -18px;
        top: -6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        background: red;
      }
    }
  }
}

#headTop {
  width: 100%;
  height: 80px;
  background: #202329;

  .contains {
    width: $nx-width;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    ul {
      height: 100%;

      .iconfont {
        float: left;
        line-height: 2rem;
        font-size: 1.3rem;
        color: $nx-color2;
      }

      // li {
      //   float: left;
      //   height: 100%;
      //   font-size: 14px;
      //   color: #c4c3c3;
      //   margin-top: 0.3rem;

      //   .lgstyle {
      //     color: $nx-color2;
      //     font-size: 28px;
      //   }
      // }
    }
  }
}

#headnav {
  width: 100%;
  height: 4rem;
  // padding: $all-padding;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  overflow: hidden;

  .contains {
    width: $nx-width;
    height: 100%;
    margin: 0 auto;

    .logo {
      width: 10rem;
      height: 1.2rem;
      margin-left: 4rem;
      margin-right: 2rem;

      img {
        margin: 5px;
        height: 50px;
      }

      span {
        float: right;
        display: inline-block;
        line-height: 80px;
        margin-left: 5px;
      }
    }

    .navlist {
      height: 100%;

      li {
        float: left;
        font-size: 20px;
        margin: 20px;
        padding: 0 6px 11px;

        &.now,
        &:hover {
          border-bottom: 2px solid #ffffff;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.right1 {
  .nowAt {
    li {
      a {
        color: #2559c2 !important;
      }
    }
  }
  li {
    ::v-deep .el-button {
      background-color: transparent;
      border-radius: 4px;
      border: 1px solid #ffffff;
      font-size: 14px;
      color: #ffffff;
    }

    .avatar {
      display: flex;
      align-items: center;
      .user-name {
        width: 45px;
        height: 15px;
        align-self: center;
        font-size: 14px;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      img {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-left: 6px;
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

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-text {
    font-size: 24px;
    font-weight: 600;
    color: #222222;
  }

  .close-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.cur-posi {
  text-align: left;
  color: #222222;
  font-weight: 500;
  font-size: 16px;
}

.now-location {
  display: flex;
  background: #0470b8;
  width: 90px;
  border-radius: 4px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin: 16px 0 12px;

  .icon {
    width: 16px;
    height: 16px;
  }
  .cur-city {
    margin: 0 8px 0 2px;
    font-size: 14px;
    color: #ffffff;
  }
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

::v-deep .el-dialog__header {
  padding: 24px 22px 12px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 694px;
  min-height: 420px;
  background-image: url(~@/assets/image/login/avatar-bg.png);
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 44px;
}
</style>
