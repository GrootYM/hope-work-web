<template>
  <div class="registerPage">
    <BasicInfo v-if="step === 0" @changeStep="onStepChange" @openFileDialog="openDialog" />
    <EducationInfo v-if="step === 1" @changeStep="onStepChange" @openFileDialog="openDialog" />
    <LastExperience v-if="step === 2" @changeStep="onStepChange" @openFileDialog="openDialog" />
    <ExpectedPosition v-if="step === 3" @changeStep="onStepChange" @openFileDialog="openDialog" />
    <el-dialog :visible.sync="fileShow" :show-close="false" :close-on-click-modal="false">
      <div slot="title" class="dialog-header">
        <div></div>
        <img src="@/assets/image/login/close.png" class="close-btn" @click="closeDialog" />
      </div>
      <div class="dialog-content">
        <el-upload
          class="upload-demo"
          drag
          action="/api-recruit/api-common/oss/file-upload"
          :limit="1"
          :data="params"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          accept=".pdf,.doc,.docx, jpg, png"
        >
          <img src="@/assets/image/login/upload-doc.png" class="myicon" />
          <div class="tip-text">点击或将文件拖拽到这里上传</div>
          <div class="accept-text">简历建议使用 PDF 文件，也支持DOC、DOCX、JPG、PNG 格式</div>
          <div class="size-text">文件大小不超过20M</div>
          <div class="upload-button">上传附件简历</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BasicInfo from '@/page/register/components/basicInfo'
import EducationInfo from '@/page/register/components/educationInfo'
import ExpectedPosition from '@/page/register/components/expectedPosition'
import LastExperience from '@/page/register/components/lastExperience'
import Auth from '@/api/auth'
import { mapGetters } from 'vuex'

export default {
  components: {
    BasicInfo,
    EducationInfo,
    ExpectedPosition,
    LastExperience,
  },
  data() {
    return {
      step: 0,
      fileShow: false,
      fileList: [],
      params: {
        type: 2,
      },
      vitaeId: null,
    }
  },
  computed: {
    ...mapGetters(['userId', 'userExpectedPosition', 'userBasicInfo', 'userEduInfo', 'userLastExperience']),
  },
  methods: {
    handlePreview() {},
    handleRemove() {
      if (!this.vitaeId) return
      Auth.deleteResumeById({ vitaeId: this.vitaeId }).then(res => {})
    },
    handleSuccess(res, file, fileList) {
      const params = {
        userId: this.userId,
        fileId: res.data.fileId,
      }
      const _this = this
      _this.getResumeAnalysiInfo(res.data.url)
      Auth.userDetailEdit(params).then(res => {
        _this.getResumeList()
      })
    },
    async getResumeAnalysiInfo(filePath) {
      const loading = this.$loading({
        lock: true,
        text: '提交注册信息中……',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)',
      })
      let res = await Auth.getResumeAnalysiInfo({ filePath: filePath })
      console.log(res)
      loading.close()
      if (res.code == 200) {
        this.$router.push({ name: 'onlineResume' })
      } else {
        this.$message.error(`${res.data}`)
      }
    },
    async getResumeList() {
      let res = await Auth.queryResumeByUserId({ userId: this.userId })
      this.vitaeId = res.data[0].vitaeId

      this.complete()
    },
    onStepChange(step) {
      this.step = step
    },
    openDialog() {
      this.fileShow = true
    },
    closeDialog() {
      this.fileShow = false
    },

    complete() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '提交注册信息中……',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(255, 255, 255, 0.7)',
      // })
      Promise.all([this.updateBasicInfo(), this.updateEduInfo(), this.updateJobInfo(), this.updateExpected()])
        .then(res => {
          let suceessed = true
          res.forEach(item => {
            if (item.code != 200) {
              this.$message.error(`${item.data}`)
              suceessed = false
            }
          })
          if (suceessed) {
            this.$store.commit('CLEAR_REGISTER_DATA')
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          // setTimeout(() => {
          //   loading.close()
          // }, 2000)
        })
    },
    async updateBasicInfo() {
      let res = await Auth.userDetailEdit(this.userBasicInfo)
      return res
    },
    async updateEduInfo() {
      let res = await Auth.userEducationEdit(this.userEduInfo)
      return res
    },
    async updateJobInfo() {
      let res = await Auth.userExperienceEdit(this.userLastExperience)
      return res
    },
    async updateExpected() {
      let res = await Auth.userDetailEdit(this.info)
      return res
    },
  },
}
</script>

<style lang="scss" scoped>
.registerPage {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close-btn {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .dialog-content {
    .myicon {
      width: 48px;
      height: 48px;
      display: block;
      margin: 54px auto 8px;
    }
    .tip-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
    }
    .accept-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin: 10px auto 8px;
    }
    .size-text {
      font-size: 14px;
      color: #ff7200;
      margin-bottom: 30px;
    }
    .upload-button {
      margin: auto;
      cursor: pointer;
      width: 156px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px;
    }
  }
}

::v-deep .el-dialog__header {
  padding: 24px 22px 12px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 694px;
  height: 420px;
  background-image: url(~@/assets/image/login/avatar-bg.png);
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 44px;
}

::v-deep .el-upload-dragger {
  width: 100%;
  height: 320px;
  background: transparent;
}

::v-deep .el-upload {
  display: block;
}
</style>
