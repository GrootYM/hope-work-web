<template>
  <div class="loginPage">
    <div class="login-form">
      <div class="title">绑定手机号</div>
      <div class="input-container">
        <el-input
          v-model="form.phone"
          placeholder="请输入手机号"
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
      <div class="submit" @click="onSubmit">绑定</div>
    </div>
  </div>
</template>

<script>
import Auth from "@/api/auth";
import CompanyAuth from "@/api/enterprise/auth";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      role: "employer",
      form: {
        openId: null,
        phone: "",
        userType: null,
      },
      errorPhone: false,
    };
  },
  computed: {},
  mounted() {
    const { openId, userType } = this.$route.query;
    this.form.openId = openId;
    this.form.userType = parseInt(userType);
  },
  methods: {
    async onSubmit() {
      if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        this.errorPhone = true;
        return false;
      }
      const res = await Auth.bindPhone(this.form);
      if (res.code != 200) {
        this.$message.error(res.data);
        return;
      }
      // sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      this.$store.dispatch("setToken", res.data.token);
      this.$store.dispatch("setUserId", res.data.userId);
      if (res.data.userType == 2) {
        this.$store.dispatch("setUserMobile", this.form.phone);
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
          mobile: this.form.phone,
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
  },
  beforeDestroy() {},
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
    height: 25vh;
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
      margin: 2.22vh auto;
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
