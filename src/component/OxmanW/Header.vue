<template>
  <div class="box">
    <div class="con">
      <h2 class="title">{{ title }}</h2>
      <div class="rightBox">
        <!-- <div class="messageBox">
          <img src="@/assets/image/oxman/messageIcon.png" alt="" />
          <p v-if="message">{{ message }}</p>
        </div> -->
        <!-- <p>帮助与反馈</p>
        <p>面试</p>
        <p>招聘数据</p>
        <p>账号权益</p>
        <p>升级VIP</p> -->
        <el-dropdown v-if="userId">
          <div class="recruiterBox">
            <p>{{ userInfo.userName || userMobile }}</p>
            <img :src="userInfo.headUrl" alt="" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="gotoUserCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    title: String,
    message: String,
    recruiter: {
      type: Object,
      default: function () {
        return {
          name: '招聘者',
          headImg: require('@/assets/image/job/icon7.png'),
        }
      },
    },
  },
  data() {
    return {
      defaultHead:
        '​https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/e3cf9840-7f29-4901-b812-f587e8d7e6b7.jpeg',
    }
  },
  computed: {
    ...mapGetters(['userId', 'userInfo', 'userMobile']),
  },
  methods: {
    ...mapActions(['loginOut']),
    gotoUserCenter() {
      this.$router.push({ path: '/oxHome/userCenter/user' })
    },
    outLogin() {
      this.loginOut()
      setTimeout(() => {
        this.$message.success('退出登录成功')
        this.$router.replace({ path: '/index/home' })
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 80px;
  background: #ffffff;
  .con {
    box-sizing: border-box;
    width: 100%;
    // width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12.5vw;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 23px;
    }
    .rightBox {
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        color: #3d3d3d;
        line-height: 20px;
        margin-right: 24px;
      }
      .messageBox {
        position: relative;
        margin-right: 20px;
        img {
          width: 16px;
          height: 16px;
        }
        p {
          width: 14px;
          height: 14px;
          background: #ff3525;
          border-radius: 50%;
          font-size: 10px;
          text-align: center;
          line-height: 14px;
          position: absolute;
          color: #fff;
          top: -7px;
          left: 7px;
        }
      }
      .recruiterBox {
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
