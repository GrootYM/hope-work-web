<template>
  <div class="loginPage">
    <div class="login-form">
      <div class="title">请选择您的身份</div>
      <div class="input-container">
        <el-radio-group v-model="userType" class="status" @input="errorType = false">
          <el-radio-button label="1">我要找工作</el-radio-button>
          <el-radio-button label="2">我要招聘</el-radio-button>
        </el-radio-group>
        <div class="el-form-item__error" v-if="errorType">请选择您的身份</div>
      </div>
      <div class="submit" @click="onSubmit">确定</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      userType: null,
      errorType: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    async onSubmit() {
      if (!this.userType) {
        this.errorType = true
        return
      }
      this.$router.push({ path: '/login/wxLogin', query: { userType: this.userType } })
    },
  },
}
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

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #222222;
    }

    .input-container {
      width: 37.04vh;
      margin: 2.22vh auto;
      position: relative;
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
  }
}

::v-deep .el-radio-button {
  margin-right: 16px;

  &:first-of-type {
    margin-right: 16px;
  }

  &:nth-of-type(2) {
    margin-right: 0;
  }

  &:nth-of-type(3) {
    margin-top: 16px;
    margin-right: 16px;
  }

  &:nth-of-type(4) {
    margin-top: 16px;
  }

  &:last-of-type {
    margin-right: 0;
  }

  .el-radio-button__inner {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    font-size: 16px;
    color: #444444;
    letter-spacing: 1px;
    border: 1px solid #dadde2;
    min-width: 105px;
    height: 40px;
    font-weight: 500;
  }
}

::v-deep .el-radio-button.is-active {
  .el-radio-button__inner {
    background: rgba(36, 70, 168, 0.08);
    border: 1px solid #2446a8 !important;
    color: #333333;
  }
}
</style>
