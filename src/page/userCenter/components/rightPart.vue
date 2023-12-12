<template>
  <div>
    <div class="manage">
      <div class="model-title">附件管理</div>
      <div class="model-content">
        <div class="file-list">
          <div v-for="(item, index) in myFileList" :key="index" class="file-item">
            <div class="name">{{ item.vitaeName }}</div>
            <img
              class="del-icon"
              src="@/assets/image/userCenter/delete.png"
              alt=""
              @click="deleteResume(item.vitaeId)"
            />
          </div>
        </div>
        <div class="upload-button" @click="openDialog">上传简历</div>
        <div class="make-button" @click="toResumeTemplate">制作附件简历</div>
      </div>
    </div>
    <!-- <div class="manage">
      <div class="model-title mt-16">隐私设置</div>
      <div class="model-content pt-15 pb-15">
        <div class="model-item">上传简历</div>
        <div class="model-item">制作附件简历</div>
      </div>
    </div> -->
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
          ref="resumeUpload"
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
import Auth from '@/api/auth'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fileShow: false,
      fileList: [],
      params: {
        type: 2,
      },
      vitaeId: null,
      myFileList: [],
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  methods: {
    handlePreview() {},
    handleRemove() {
      if (!this.vitaeId) return
      Auth.deleteResumeById({ vitaeId: this.vitaeId }).then(res => {})
    },
    deleteResume(vitaeId) {
      const _this = this
      Auth.deleteResumeById({ vitaeId }).then(res => {
        if (res.code == 200) {
          _this.$message.success('删除成功')
          _this.getResumeList()
        }
      })
    },
    handleSuccess(res, file, fileList) {
      const params = {
        userId: this.userId,
        fileId: res.data.fileId,
      }
      const _this = this
      Auth.userDetailEdit(params).then(res => {
        _this.getResumeList()
        _this.closeDialog()
      })
    },
    async getResumeList() {
      let res = await Auth.queryResumeByUserId({ userId: this.userId })
      this.vitaeId = res.data && res.data.length ? res.data[0].vitaeId : null
      this.myFileList = res.data
    },
    openDialog() {
      this.fileShow = true
    },
    closeDialog() {
      this.fileShow = false
      this.$refs.resumeUpload.clearFiles()
      this.fileList = []
    },
    toResumeTemplate() {
      this.$router.push({ name: 'resumeMake' })
    },
  },
  mounted() {
    this.getResumeList()
  },
}
</script>

<style lang="scss" scoped>
.manage {
  .model-title {
    background-image: url(~@/assets/image/userCenter/rect-bg-right.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #ffffff;
    text-align: left;
    padding: 15px 0 15px 24px;
  }

  .model-content {
    background-color: #ffffff;
    padding: 17px 24px 24px;

    .file-list {
      padding: 0 0 16px;
      border-bottom: 1px solid #e8ebf0;
      margin-bottom: 16px;

      .file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 20px;

        .name {
          font-size: 14px;
          color: #333333;
        }

        .del-icon {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }

    .upload-button {
      height: 40px;
      line-height: 40px;
      background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }

    .make-button {
      margin-top: 12px;
      height: 40px;
      line-height: 40px;
      background: rgba(36, 70, 168, 0.1);
      border-radius: 4px;
      font-size: 14px;
      color: #2446a8;
      cursor: pointer;
    }
  }
}

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

.pt-15 {
  padding-top: 15px;
}

.pb-15 {
  padding-bottom: 15px;
}

.mt-16 {
  margin-top: 16px;
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
