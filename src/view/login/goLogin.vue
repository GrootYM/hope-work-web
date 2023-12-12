<template>
  <div class="loginPage">
    <div class="login-form">
      <div class="title">请上传您的简历</div>
      <div class="accept">支持DOC、DOCX、PDF格式简历文件</div>
      <div class="size">文件大小不超过8M</div>
      <div class="at-once" @click="toLogin">立即上传</div>
      <div class="without" @click="toLogin">
        没有附件简历
        <div class="online">在线填写</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    toLogin() {
      this.$router.push({ path: '/login/login' })
    },
  },
  created() {},
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
    height: 50vh;
    padding: 126px 80px 60px;
    background-image: url(~@/assets/image/login/formBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #222222;
      margin-bottom: 36px;
    }

    .accept {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
    }

    .size {
      margin-top: 12px;
      font-size: 14px;
      font-weight: 400;
      color: #ff7200;
    }

    .at-once {
      width: 37.04vh;
      height: 48px;
      line-height: 48px;
      background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px;
      margin: 52px auto 24px;
      font-weight: 500;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
    }

    .without {
      width: 37.04vh;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      border: 1px solid #2446a8;
      margin: auto;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      cursor: pointer;

      .online {
        color: #2446a8;
      }
    }
  }
}
</style>
