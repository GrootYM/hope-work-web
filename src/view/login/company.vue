<template>
  <div class="loginPage">
    <div class="tips" v-if="isChecking">您已提交成功，请等待审核!</div>
    <div class="login-form" v-else>
      <div class="title">企业审核</div>
      <div
        style="
          display: flex;
          margin: 0 auto 24px;
          position: relative;
          width: 37.04vh;
        "
      >
        <div style="font-size: 14px; color: #666666; margin-right: 16px">
          头像
        </div>
        <el-upload
          ref="headUpload"
          class="upload-demo"
          action="/api-recruit/api-common/oss/file-upload"
          :on-success="handleHeadSuccess"
          :on-exceed="handleHeadExceed"
          :file-list="fileList"
          :limit="1"
          list-type="picture-card"
        >
          <img
            class="avatar-upload"
            src="@/assets/image/login/camera.png"
            v-if="!form.headImg"
          />
          <div slot="file" slot-scope="{ file }">
            <img class="avatar-upload" :src="file.url" />
            <span class="el-upload-list__item-actions">
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleHeadRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </div>
      <div class="input-container">
        <el-input
          v-model="form.userName"
          placeholder="请填写您的姓名"
          clearable
          @change="errorUserName = false"
        >
        </el-input>
        <div class="el-form-item__error" v-if="errorUserName">
          请填写您的姓名
        </div>
      </div>
      <div class="input-container">
        <el-autocomplete
          style="width: 100%"
          v-model="form.companyName"
          :fetch-suggestions="querySearch"
          placeholder="请输入您所在的公司"
          :trigger-on-focus="false"
          @select="handleSelect"
          @input="
            isCompanyExisted = false;
            form.companyId = null;
          "
        >
        </el-autocomplete>
        <div class="el-form-item__error" v-if="errorCompany">
          请选择您所在的公司
        </div>
      </div>
      <div class="input-container" v-if="!isCompanyExisted">
        <el-input
          v-model="form.companyCode"
          placeholder="请填写贵公司的社会信用代码"
          clearable
          @change="errorCompanyCode = false"
        >
        </el-input>
        <div class="el-form-item__error" v-if="errorCompanyCode">
          请填写正确的社会信用代码
        </div>
      </div>
      <div class="img-upload" v-if="!isCompanyExisted">
        <div class="label">请上传贵公司营业执照</div>
        <el-upload
          action="/api-recruit/api-common/oss/file-upload"
          list-type="picture-card"
          :limit="1"
          :data="params"
          accept="image/*"
          :on-success="handleSuccess"
          :on-exceed="handleHeadExceed"
          ref="licenseUpload"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <div class="el-form-item__error" v-if="errorFile">
          请上传贵公司营业执照
        </div>
      </div>
      <div class="input-container">
        <el-input
          v-model="form.roleName"
          placeholder="请填写您的职务"
          clearable
          @change="errorRoleName = false"
        >
        </el-input>
        <div class="el-form-item__error" v-if="errorRoleName">
          请填写您的职务
        </div>
      </div>
      <div class="submit" @click="onSubmit">提交审核</div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Common from "@/api/enterprise/common";
import CompanyAuth from "@/api/enterprise/auth";

export default {
  data() {
    return {
      params: {
        type: 1,
      },
      companyList: [],
      form: {
        headImg: null,
        userName: "",
        companyId: null,
        companyName: "",
        companyCode: "",
        roleName: "",
        fileId: null,
        userId: null,
      },
      errorUserName: false,
      errorRoleName: false,
      errorCompany: false,
      errorCompanyCode: false,
      errorFile: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      isChecking: true,
      companyName: "",
      isCompanyExisted: false,
      fileList: [],
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["userId", "userMobile"]),
  },
  methods: {
    handleHeadSuccess(response, file, fileList) {
      this.form.headImg = response.data.url;
    },
    handleHeadExceed(file, fileList) {
      this.$message.error("只能选择一张图片");
    },
    handleSuccess(response, file, fileList) {
      this.form.fileId = response.data.fileId;
      this.errorCompanyCode = false;
    },
    handleHeadRemove(file) {
      this.$refs.headUpload.clearFiles();
      this.form.headImg = null;
    },
    handleRemove(file) {
      this.$refs.licenseUpload.clearFiles();
      this.form.fileId = null;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    async querySearch(kw, cb) {
      let results = await Common.getCompanyList({ companyName: kw });
      const list = results.data.map((c) => {
        c.value = c.companyName;
        return c;
      });
      cb(list);
    },
    handleSelect(item) {
      this.form.companyId = item.id;
      this.form.companyName = item.companyName;
      this.isCompanyExisted = true;
    },
    async getCompanyList(companyName) {
      let res = await Common.getCompanyList({ companyName });
      return res.data;
    },
    async getUserInfo() {
      const loading = this.$loading({
        lock: true,
        text: "提交注册信息中……",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      let res = await CompanyAuth.getCompanyUserInfo({
        mobile: this.userMobile,
      });
      loading.close();
      if (res.code != 200) {
        this.$message.error(res.data);
        return;
      }
      if (res.data.companyId == 0) {
        this.isChecking = false;
      } else if (res.data.companyStatus == 2) {
        this.$router.replace({ path: "/oxHome" });
      } else if (res.data.companyStatus == 1) {
        this.isChecking = true;
      }
    },
    async onSubmit() {
      if (!this.form.userName) {
        this.errorUserName = true;
        return false;
      }
      if (!this.form.companyName) {
        this.errorCompany = true;
        return false;
      }
      const len = this.form.companyCode.length;
      if (!this.form.companyId && (!len || len < 18)) {
        this.errorCompanyCode = true;
        return false;
      }
      if (!this.form.companyId && !this.form.fileId) {
        this.errorFile = true;
        return false;
      }
      if (!this.form.roleName) {
        this.errorRoleName = true;
        return false;
      }
      this.form.userId = this.userId;
      const res = await CompanyAuth.checkCompanyUser(this.form);
      if (res.code != 200) {
        this.$message.error(res.data);
        return;
      } else {
        this.getUserInfo();
      }
    },
  },
  created() {
    this.getUserInfo();
    this.getCompanyList();
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

  .tips {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
  }

  .login-form {
    width: 50vh;
    // height: 50vh;
    padding: 40px 60px 40px;
    background-image: url(~@/assets/image/login/formBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #222222;
      margin-bottom: 24px;
    }

    .input-container {
      width: 37.04vh;
      height: 4.44vh;
      background: #ffffff;
      margin: 0 auto 24px;
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
        height: 4.44vh;
        // border-left: none;
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

    .img-upload {
      text-align: left;
      width: 37.04vh;
      margin: 0 auto 24px;
      position: relative;

      .label {
        font-size: 14px;
        color: #666666;
        margin-bottom: 12px;
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

.upload-demo {
  ::v-deep .el-upload--picture-card {
    border: none;
  }

  ::v-deep .el-upload-list--picture-card .el-upload-list__item {
    border: none;
  }
}
</style>
