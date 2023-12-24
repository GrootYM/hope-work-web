<template>
  <div class="loginPage">
    <div class="login-form">
      <div class="wx-btn">
        <el-tooltip
          class="item"
          effect="light"
          content="微信扫码登录"
          placement="right"
        >
          <img
            src="@/assets/image/login/scan.png"
            class="scan"
            @click="wxCode"
          />
        </el-tooltip>
      </div>
      <div class="title">验证码登录/注册</div>
      <div class="tabs-area">
        <div
          class="tab-item"
          :class="form.loginType == 1 ? 'active' : ''"
          @click="form.loginType = 1"
        >
          我要找工作
        </div>
        <div
          class="tab-item"
          :class="form.loginType == 2 ? 'active' : ''"
          @click="form.loginType = 2"
        >
          我要招聘
        </div>
      </div>
      <div class="input-container">
        <el-input
          v-model="form.mobile"
          placeholder="手机号"
          class="input-with-select"
          clearable
          @change="errorPhone = false"
        >
          <template slot="prepend">
            <div class="add-pre">
              +86
              <img src="@/assets/image/login/dropdown.png" />
            </div>
          </template>
        </el-input>
        <div class="el-form-item__error" v-if="errorPhone">
          请填写正确的手机号
        </div>
      </div>
      <div class="input-container">
        <el-input
          v-model="form.captcha"
          placeholder="短信验证码"
          class="input-with-select"
          clearable
        >
          <el-button
            slot="append"
            type="text"
            @click="sendCaptcha"
            :disabled="captchaDisabled"
            >{{
              captchaDisabled
                ? `${countdown >= 10 ? countdown : "0" + countdown}秒后再发送`
                : "发送验证码"
            }}</el-button
          >
        </el-input>
      </div>
      <div class="submit" @click="onSubmit">登录/注册</div>
      <div class="agree">
        <el-checkbox v-model="checked"></el-checkbox>
        <div class="agree-content">
          同意希望工场
          <span @click="goLink(1)">《用户协议》</span>
          <span @click="goLink(2)">《隐私政策》</span>
          <span @click="goLink(3)">《希望工场平台协议及隐私政策》</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/api/auth";
import CompanyAuth from "@/api/enterprise/auth";
import { mapGetters } from "vuex";
import WebIM from "@/lin/util/WebIM";

let interval = null;

export default {
  data() {
    return {
      role: "employer",
      form: {
        captcha: "",
        mobile: "",
        loginType: 1,
      },
      checked: false,
      links: [
        "https://hope-service.oss-cn-beijing.aliyuncs.com/file/%E5%B8%8C%E6%9C%9B%E5%B7%A5%E5%9C%BA%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE%281%29.docx",
        "https://hope-service.oss-cn-beijing.aliyuncs.com/file/%E5%B8%8C%E6%9C%9B%E5%B7%A5%E5%9C%BA%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96.docx",
        "https://hope-service.oss-cn-beijing.aliyuncs.com/file/%E5%B8%8C%E6%9C%9B%E5%B7%A5%E5%9C%BA%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.docx",
      ],
      errorPhone: false,
      countdown: 60,
      captchaDisabled: false,
    };
  },
  watch: {
    // role(val) {
    //   this.form.loginType = val === 'employer' ? 1 : 2
    // },
  },
  computed: {},
  mounted() {
    if (this.$route.query.loginType == 2) {
      this.form.loginType = 2;
    }
  },
  methods: {
    wxCode() {
      this.$router.push({ path: "/login/userTypeSelect" });
    },
    goLink(index) {
      window.open(this.links[index - 1], "_blank");
    },
    async onSubmit() {
      if (!/^1[3456789]\d{9}$/.test(this.form.mobile)) {
        this.errorPhone = true;
        return false;
      }
      if (!this.checked) {
        this.$message.error("请勾选同意用户协议和隐私政策！");
        return;
      }
      const res = await Auth.login(this.form);
      if (res.code != 200) {
        this.$message.error(res.data);
        return;
      }
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
      this.$store.dispatch("setToken", res.data.token);
      this.$store.dispatch("setUserId", res.data.userId);
      if (res.data.userType == 2) {
        this.$store.dispatch("setUserMobile", this.form.mobile);
        this.companyUser(res.data);
        return;
      }
      this.getUserInfo(res.data.userId, res.data);
    },
    async companyUser(info) {
      if (!info.companyId) {
        this.$router.push({ path: "/login/companyUserCheck" });
      } else {
        let res = await CompanyAuth.getCompanyUserInfo({
          mobile: this.form.mobile,
        });
        this.$store.dispatch("setUserInfo", res.data);
        if (res.data.companyStatus != 2) {
          this.$router.push({ path: "/login/companyUserCheck" });
        } else {
          this.$router.replace({ path: "/oxHome" });
        }
      }
    },
    async getUserInfo(userId, obj) {
      let res = await Auth.queryUserInfo({ userId });
      this.$store.dispatch("setUserInfo", res.data);
      console.log(obj);
      if (obj && obj.newUser) {
        this.$router.push({ path: "/register" });
      } else {
        this.$router.push({ path: "/index" });
      }
    },
    async sendCaptcha() {
      if (!/^1[3456789]\d{9}$/.test(this.form.mobile)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      const res = await Auth.sendCaptcha({ phone: this.form.mobile });
      if (res.code == 200) {
        this.captchaDisabled = true;
        interval = setInterval(() => {
          this.countdown--;
        }, 1000);
      }
    },
  },
  watch: {
    countdown(val) {
      if (val <= 0) {
        interval && clearInterval(interval);
        this.captchaDisabled = false;
        this.countdown = 60;
      }
    },
  },
  beforeDestroy() {
    interval && clearInterval(interval);
  },
};
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  .login-form {
    width: 50vh;
    height: 50vh;
    padding: 50px 80px 60px;
    background-image: url(~@/assets/image/login/formBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;

    .wx-btn {
      position: absolute;
      top: 16px;
      left: 13px;

      .scan {
        width: 48px;
        height: 48px;
      }
    }

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #222222;
    }

    .tabs-area {
      width: 37.04vh;
      height: 48px;
      background: #f4f5f7;
      border-radius: 4px;
      margin: 3.33vh auto 2.22vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .tab-item {
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        width: 18.1vh;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }
      .active {
        font-weight: 600;
        color: #2446a8;
        background: #ffffff;
        border-radius: 4px;
      }
    }

    .input-container {
      width: 37.04vh;
      background: #ffffff;
      margin: 0 auto 2.22vh;
      position: relative;

      .add-pre {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #333333;

        img {
          margin-left: 16px;
          width: 12px;
          height: 12px;
        }
      }

      &:focus,
      &:hover {
        border: 1px solid#2446A8;
        border-radius: 4px;
      }

      ::v-deep .el-input__inner {
        border-left: none;
        &:hover,
        &:focus {
          border-color: #dadde2;
        }
      }

      ::v-deep .el-input-group__prepend {
        background: transparent;
        border-top: 1px solid #dadde2;
        border-left: 1px solid #dadde2;
        border-bottom: 1px solid #dadde2;
        border-right: none;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }
      ::v-deep .el-input-group--append {
        .el-input__inner {
          border-left: 1px solid #dadde2;
          border-right: none;
        }
      }
      ::v-deep .el-input-group__append {
        background: transparent;
        border-color: #dadde2;
        border-left: none;
        font-size: 16px;
        color: #2446a8;
      }
    }

    .submit {
      width: 37.04vh;
      height: 48px;
      line-height: 48px;
      background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px;
      margin: auto;
      font-weight: 500;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
    }

    .agree {
      display: flex;
      align-items: baseline;
      width: 37.04vh;
      margin: 5vh auto 0;

      .agree-content {
        margin-left: 5px;
        font-size: 12px;
        color: #3d3d3d;
        line-height: 22px;

        span {
          cursor: pointer;
          color: #2559c2;
        }
      }
    }
  }
}

::v-deep .el-input__suffix {
  display: block;
  line-height: 4.44vh;
  height: 4.44vh;
  margin: 0;
  padding: 0;
}
</style>
