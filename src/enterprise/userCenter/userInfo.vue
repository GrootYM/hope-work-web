<template>
  <div class="main">
    <div class="person-info">
      <el-button class="goBack" @click="goBack">返回</el-button>
      <div class="header">
        个人信息
        <el-button type="text" @click="isEdit = true" v-if="!isEdit">编辑</el-button>
      </div>
      <div v-if="!isEdit" class="show">
        <div class="basic-info">
          <div class="left-info">
            <div class="label-value">姓名：{{ personInfo.userName }}</div>
            <div class="label-value">职务：{{ personInfo.roleName }}</div>
          </div>
          <div class="right-info">
            <img :src="personInfo.headImg || userInfo.headUrl" />
          </div>
        </div>
        <div class="label-value">
          手机号：<span>{{ personInfo.phone | mixData }}</span>
        </div>
        <div class="label-value">
          微信号：<span>{{ personInfo.wechat | mixData }}</span>
        </div>
        <div class="label-value">
          接收简历邮箱：<span>{{ personInfo.email | mixData }}</span>
        </div>
      </div>
      <div v-else class="edit">
        <el-upload
          ref="headUpload"
          action="/api-recruit/api-common/oss/file-upload"
          :on-success="handleHeadSuccess"
          :on-exceed="handleHeadExceed"
          :file-list="fileList"
          :limit="1"
          list-type="picture-card"
          :class="personInfo.headImg ? 'upload-avatar avatar-line' : 'avatar-line'"
        >
          <img class="avatar-upload" src="@/assets/image/login/camera.png" />
          <div slot="file" slot-scope="{ file }">
            <img class="avatar-upload" :src="file.url" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleHeadRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-form :model="personInfo" :rules="rules" ref="personForm" label-position="right" label-width="120px">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="personInfo.userName" style="width: 100%" placeholder="请填写您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="roleName">
            <el-input v-model="personInfo.roleName" style="width: 100%" placeholder="请填写您的职务"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="personInfo.phone" style="width: 100%" disabled></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="wechat">
            <el-input v-model="personInfo.wechat" style="width: 100%" placeholder="请填写您的微信号"></el-input>
          </el-form-item>
          <el-form-item label="接收简历邮箱" prop="email">
            <el-input v-model="personInfo.email" style="width: 100%" placeholder="请填写您的接收简历邮箱"></el-input>
          </el-form-item>
        </el-form>
        <div class="bottom-buttons">
          <div class="cancel" @click="isEdit = false">取消</div>
          <div class="confirm" @click="save">保存</div>
        </div>
      </div>
    </div>
    <!-- <div class="weChat">
      <img class="gouTong" src="@/assets/image/oxman/Coxman/liaotian111.png" alt="" />
      <div class="chatNumber"><p>26</p></div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CompanyAuth from '@/api/enterprise/auth'

export default {
  data() {
    return {
      isEdit: false,
      personInfo: {},
      rules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入职务', trigger: 'blur' }],
        wechat: [{ required: true, message: '请输入微信号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      },
      fileList: [],
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
    ...mapGetters(['userId', 'userInfo', 'userMobile']),
  },
  methods: {
    handleHeadSuccess(response, file, fileList) {
      this.personInfo.headImg = response.data.url
    },
    handleHeadExceed(file, fileList) {
      this.$message.error('只能选择一张图片')
    },
    handleHeadRemove(file) {
      this.$refs.headUpload.clearFiles()
      this.personInfo.headImg = null
      this.fileList = []
    },
    //返回上一页
    goBack() {
      this.routerGo(-1)
    },
    async getInfo() {
      let res = await CompanyAuth.queryPersonInfo({ userId: this.userId })
      this.personInfo = res.data
      this.fileList = [{ url: res.data.headImg }]
    },
    async getUserInfo() {
      let res = await CompanyAuth.getCompanyUserInfo({ mobile: this.userMobile })
      this.$store.dispatch('setUserInfo', res.data)
    },
    save() {
      if (!this.personInfo.headImg) {
        this.$message.warning('请上传头像')
        return
      }
      const _this = this
      this.$refs.personForm.validate(async valid => {
        if (valid) {
          _this.personInfo = { id: _this.userId, ..._this.personInfo }
          let res = await CompanyAuth.editPersonInfo(_this.personInfo)
          if (res.code == 200) {
            _this.$message.success('编辑个人信息成功')
            _this.isEdit = false
            _this.getInfo()
            _this.getUserInfo()
          }
        }
      })
    },
  },
  created() {
    this.getInfo()
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 1.85vh 12.5vw 2.87vh;

  .person-info {
    height: calc(95.28vh - 80px);
    background-color: #ffffff;
    border-radius: 4px;
    background-image: url(~@/assets/image/recruitUser/addr-header.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    box-sizing: border-box;
    position: relative;

    .goBack {
      position: absolute;
      top: 0;
      left: -72px;
    }

    .header {
      padding: 40px 3.33vw 17px;
      font-size: 24px;
      font-weight: 500;
      color: #3d3d3d;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
    .add-btn {
      width: 104px;
      height: 40px;
      line-height: 40px;
      background: #2446a8;
      border-radius: 4px;
      margin: 0 0 15px 3.33vw;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }

    .show {
      padding: 24px 3.33vw 0;
      .basic-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 45px;

        .left-info {
          .label-value {
            font-size: 14px;
            &:first-child {
              margin-top: 0;
            }
          }
        }

        .right-info {
          img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
          }
        }
      }

      .label-value {
        text-align: left;
        font-size: 16px;
        color: #333333;
        margin-top: 16px;

        span {
          font-size: 14px;
        }
      }
    }

    .edit {
      padding: 24px 24vw 0 3.33vw;

      .avatar-line {
        margin-bottom: 16px;
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
    }
  }
}

::v-deep .el-form-item {
  &:last-child {
    margin-bottom: 0 !important;
  }
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

.avatar-upload {
  width: 90px;
  height: 90px;
  border-radius: 45px;
}

::v-deep .el-upload--picture-card {
  width: 90px;
  height: 90px;
  line-height: 90px;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}

::v-deep .el-upload--picture-card {
  border: none;
  background-color: transparent;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  border: none;
  margin: 0;
  background-color: transparent;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item-actions {
  background-color: transparent;
}

::v-deep .upload-avatar .el-upload--picture-card {
  display: none !important;
}
</style>
