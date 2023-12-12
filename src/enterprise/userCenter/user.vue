<template>
  <div class="main">
    <div class="user-center">
      <div class="left-con">
        <div class="person-info">
          <div class="info-bg info-header">
            <div class="info-title">个人信息</div>
            <div class="action" @click="goEdit">编辑</div>
          </div>
          <div class="top-info">
            <div class="left-info">
              <div class="avatar">
                <img :src="personInfo.headImg || userInfo.headUrl" />
              </div>
              <div class="name-role">
                <div class="name">{{ personInfo.userName || personInfo.phone }}</div>
                <div class="role">{{ personInfo.roleName || '' }}</div>
              </div>
            </div>
            <div class="right-info">
              <div>
                手机号：<span class="hidden-value">{{ personInfo.phone | mixData }}</span>
              </div>
              <div style="margin: 8px 0 8px">
                微信号：<span class="hidden-value">{{ personInfo.wechat | mixData }}</span>
              </div>
              <div>
                接收简历邮箱：<span class="hidden-value">{{ personInfo.email | mixData }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="company-info">
          <div class="info-bg info-header">
            <div class="info-title">我的公司</div>
            <div class="action" @click="visible = true">更换公司</div>
          </div>
          <div class="mid-info">
            <div class="company-name">
              <img :src="personInfo.headUrl" />
              <div class="name-type">
                <div class="name">{{ personInfo.companyName }}</div>
                <div></div>
              </div>
            </div>
            <div class="to-company" @click="goCompany">公司主页</div>
          </div>
        </div>
        <!-- <div class="feeling">
          <div class="info-bg info-header">
            <div class="info-title">在职感受</div>
          </div>
        </div> -->
      </div>
      <div class="right-con">
        <div class="info-bg info-header">
          <div class="info-title">更多功能</div>
          <div class="action"></div>
        </div>
        <div class="info-content">
          <el-row style="padding-top: 24px">
            <el-col :span="8">
              <div class="more-features-item" @click="goPage">
                <img src="@/assets/image/recruitUser/addr-icon.png" />
                <div>地址管理</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- <div class="weChat">
      <img class="gouTong" src="@/assets/image/oxman/Coxman/liaotian111.png" alt="" />
      <div class="chatNumber"><p>26</p></div>
    </div> -->
    <el-dialog :visible.sync="visible" :show-close="false" :close-on-click-modal="false">
      <div slot="title" class="dialog-header">
        <div class="title-text"><img src="~@/assets/image/recruitUser/warning.png" />更换公司可能造成影响：</div>
        <img src="@/assets/image/login/close.png" class="close-btn" @click="onClose" />
      </div>
      <div class="effect">
        <ul>
          <li>认证取消，需重新认证</li>
          <li>已保存或发布的职位将不可再开启</li>
          <li>
            正在使用中的付费职位、道具。相关权益将不再生效并且不做退还；如有披管理员分配的来使用的权普或道具，将退还始管理员
          </li>
          <li>当前手机号注册了店长直聘，以上影响也会发生在店长直聘的招聘</li>
        </ul>
      </div>
      <div class="bottom-buttons">
        <div class="cancel" @click="onClose">放弃更换</div>
        <div class="confirm" @click="changeCompany">继续更换</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CompanyAuth from '@/api/enterprise/auth'

export default {
  data() {
    return {
      personInfo: {},
      visible: false,
    }
  },
  filters: {
    mixData(value) {
      if (!value) return ''
      if (value) {
        if (value.length < 3) {
          return value
        } else if (value.length < 8) {
          return value.substring(0, 3) + '****'
        }
      }
      return value.substring(0, 3) + '****' + value.substring(7)
    },
  },
  computed: {
    ...mapGetters(['userInfo', 'userId']),
  },
  methods: {
    async getInfo() {
      let res = await CompanyAuth.queryPersonInfo({ userId: this.userId })
      this.personInfo = res.data
    },
    goPage() {
      this.$router.push({ path: '/oxHome/userCenter/address' })
    },
    goEdit() {
      this.$router.push({ path: '/oxHome/userCenter/userInfo' })
    },
    goCompany() {
      this.$router.push({ path: '/oxHome/companyHome' })
    },
    onClose() {
      this.visible = false
    },
    async changeCompany() {
      let res = await CompanyAuth.companyChange({ userId: this.userId })
      if (res.code == 200) {
        this.$router.push({ path: '/login/companyUserCheck' })
      } else {
        this.$message.error(res.data)
      }
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>

<style lang="scss" scoped>
@import './style.scss';

.user-center {
  display: flex;

  .info-header {
    box-sizing: border-box;
    height: 66px;
    padding: 30px 24px 13px;
    display: flex;
    justify-content: space-between;

    .info-title {
      height: 25px;
      font-size: 18px;
      font-weight: 600;
      color: #3d3d3d;
      line-height: 25px;
    }

    .action {
      cursor: pointer;
      height: 20px;
      font-size: 14px;
      color: #2446a8;
      line-height: 20px;
    }
  }

  .info-content {
    padding: 11px 24px 24px;
  }

  .left-con {
    width: 41.2vw;

    .info-bg {
      background-image: url(~@/assets/image/recruitUser/header-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .person-info {
      box-sizing: border-box;
      width: 100%;
      height: 167px;
      background: #ffffff;
      border-radius: 4px;
    }

    .company-info {
      box-sizing: border-box;
      margin-top: 1.5vh;
      width: 100%;
      height: 167px;
      background: #ffffff;
      border-radius: 4px;
    }

    .feeling {
      box-sizing: border-box;
      margin-top: 1.5vh;
      width: 100%;
      height: 39.4vh;
      background: #ffffff;
      border-radius: 4px;
    }
  }

  .right-con {
    margin-left: 16px;
    flex: 1;
    height: 73.3vh;
    background-color: #ffffff;
    background-image: url(~@/assets/image/recruitUser/more-bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    border-radius: 4px;

    .more-features-item {
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      color: #3d3d3d;
      img {
        width: 40px;
        height: 40px;
        margin: 0 auto 12px;
      }
    }
  }

  .top-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 24px 0;

    .left-info {
      display: flex;
      .avatar {
        img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
      }
      .name-role {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
        .name {
          font-size: 16px;
          font-weight: 600;
          color: #3d3d3d;
        }
        .role {
          font-size: 14px;
          color: #3d3d3d;
        }
      }
    }
    .right-info {
      font-size: 14px;
      color: #999999;
      text-align: left;

      .hidden-value {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .mid-info {
    display: flex;
    justify-content: space-between;
    padding: 11px 24px 0;
    .company-name {
      display: flex;

      img {
        width: 64px;
        height: 64px;
        border-radius: 4px 4px 4px 4px;
      }
      .name-type {
        margin-left: 16px;

        .name {
          font-size: 16px;
          font-weight: 600;
          color: #3d3d3d;
        }
      }
    }

    .to-company {
      cursor: pointer;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #2446a8;
      font-size: 14px;
      color: #2446a8;
    }
  }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-text {
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 9px;
    }
  }

  .close-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.effect {
  text-align: left;
  color: #999999;
  margin-bottom: 12px;
  font-size: 14px;
  color: #3d3d3d;
  line-height: 26px;
  padding: 0 32px;

  ul {
    li {
      list-style: disc;
    }
  }
}

.bottom-buttons {
  display: flex;
  justify-content: flex-end;

  .cancel {
    cursor: pointer;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    border: 1px solid #dadde2;
    font-size: 14px;
    color: #333333;
  }

  .confirm {
    cursor: pointer;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
    margin-left: 16px;
  }
}

.confirm-btn {
  cursor: pointer;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 40px auto 0;
}

::v-deep .el-dialog__header {
  padding: 24px 24px 32px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 500px !important;
  height: 360px !important;
  background-image: url(~@/assets/image/login/avatar-bg.png) !important;
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 24px 0;
}

.weChat {
  position: fixed;
  right: 47px;
  bottom: 98px;
  cursor: pointer;

  .gouTong {
    width: 40px;
    height: 40px;
  }

  .chatNumber {
    width: 22px;
    height: 16px;
    background: #ff3525;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -8px;
    top: -8px;

    p {
      width: 13px;
      height: 14px;
      font-size: 10px;
      color: #ffffff;
    }
  }
}
</style>
