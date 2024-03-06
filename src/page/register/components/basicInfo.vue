<template>
  <div class="basic-info-form">
    <div class="header">
      <div class="logo-title">
        <img class="logo" src="@/assets/image/login/logo-small.png" />
        <div class="title-area">
          <div class="main-title">您的基本信息</div>
          <div class="sub-title">
            完善基本信息后会遇到更多对你感兴趣的招聘者
          </div>
        </div>
      </div>
      <!-- <div class="bottom">
        可上传已有的附件简历，我们会尝试为您识别成在线内容<a
          href="javascript:void(0);"
          @click.stop.prevent="uploadResume"
          >去上传</a
        >
      </div> -->
    </div>
    <div class="form">
      <el-form :model="info" :rules="rules" ref="baseForm">
        <el-row>
          <el-col :span="20">
            <el-form-item label="姓名" prop="userName">
              <el-input
                v-model="info.userName"
                style="width: 228px; height: 40px"
                placeholder="输入您的姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <img
              class="avatar-upload"
              src="@/assets/image/login/camera.png"
              v-if="!info.headPath"
              @click="headUploadShow = true"
            />
            <img
              class="avatar-upload"
              :src="info.headPath"
              v-else
              @click="headUploadShow = true"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="info.sex" class="gender">
                <el-radio-button label="1"> 男 </el-radio-button>
                <el-radio-button label="2"> 女 </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="求职身份" prop="userJobStatus">
              <el-radio-group v-model="info.userJobStatus" class="status">
                <el-radio-button label="1">
                  职场人 <span class="sub-text">有正式工作经历</span>
                </el-radio-button>
                <el-radio-button label="2">
                  学生 <span class="sub-text">在校/应届/往届</span>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="出生年月" prop="birthday">
              <el-date-picker
                v-model="info.birthday"
                type="date"
                placeholder="请选择出生年月"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <div class="tips">
                根据《劳动法》《未成年人保护法》等相关法律规定，申请注册嗨聘，请选择与你身份证一致的真实年龄并确保你已年满16周岁。
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工作时间" prop="joinWorkDate">
              <el-date-picker
                v-model="info.joinWorkDate"
                type="date"
                placeholder="参加工作时间"
                style="width: 100%"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="当前求职状态" prop="lookWorkStatus">
              <el-radio-group v-model="info.lookWorkStatus" class="status">
                <el-radio-button label="1"> 离职-随时到岗 </el-radio-button>
                <el-radio-button label="4"> 在职-月内到岗 </el-radio-button>
                <el-radio-button label="3"> 在职-考虑机会 </el-radio-button>
                <el-radio-button label="2"> 在职-暂不考虑 </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="求职类型" prop="hopePositionType">
              <el-select
                v-model="info.hopePositionType"
                style="width: 100%; margin-bottom: 7.5vh"
              >
                <el-option
                  v-for="(item, index) in hopePositionTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer">
      <div class="upload-btn" @click="uploadResume">
        <img src="@/assets/image/login/upload.png" />
        上传简历
      </div>
      <div class="next-btn" @click="nextStep">下一步</div>
    </div>
    <el-dialog
      :visible.sync="headUploadShow"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-header">
        <div class="title-text">默认头像</div>
        <img
          src="@/assets/image/login/close.png"
          class="close-btn"
          @click="onClose"
        />
      </div>
      <div class="dialog-content">
        <div class="default-avatar" @mouseleave="selectedDefautIndex = null">
          <el-row :gutter="24">
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/696b369d-859e-42cd-814c-64cbab6955f5.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 0"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 0 || lastSelected === 0"
                @mousedown="
                  selectedDefautIndex = 0;
                  lastSelected = 0;
                "
              />
            </el-col>
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/ebd5ef8d-9633-48af-b67c-25cb53e897c1.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 1"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 1 || lastSelected === 1"
                @mousedown="
                  selectedDefautIndex = 1;
                  lastSelected = 1;
                "
              />
            </el-col>
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/4e66e54f-2b0c-47f3-a646-3f8b5fe938ec.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 2"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 2 || lastSelected === 2"
                @mousedown="
                  selectedDefautIndex = 2;
                  lastSelected = 2;
                "
              />
            </el-col>
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/3eee183f-a10c-408c-acef-ca6dd7af1abb.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 3"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 3 || lastSelected === 3"
                @mousedown="
                  selectedDefautIndex = 3;
                  lastSelected = 3;
                "
              />
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 24px">
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/242bc3de-fed9-4f30-b51f-f571400cdcf0.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 4"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 4 || lastSelected === 4"
                @mousedown="
                  selectedDefautIndex = 4;
                  lastSelected = 4;
                "
              />
            </el-col>
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/329fa85a-5723-4795-9b40-9864b237c8f2.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 5"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 5 || lastSelected === 5"
                @mousedown="
                  selectedDefautIndex = 5;
                  lastSelected = 5;
                "
              />
            </el-col>
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/b7ac962f-219a-4ee9-ae8e-e92bb0fd6eac.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 6"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 6 || lastSelected === 6"
                @mousedown="
                  selectedDefautIndex = 6;
                  lastSelected = 6;
                "
              />
            </el-col>
            <el-col :span="6">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/fa4c64d1-19a0-46c4-b012-7c65b4207c56.png"
                class="avatar"
                @mouseover="selectedDefautIndex = 7"
              />
              <img
                src="@/assets/image/login/avatar-selected.png"
                class="selected-avatar"
                v-if="selectedDefautIndex === 7 || lastSelected === 7"
                @mousedown="
                  selectedDefautIndex = 7;
                  lastSelected = 7;
                "
              />
            </el-col>
          </el-row>
        </div>
        <el-upload
          class="upload-demo upload-area"
          action="/api-recruit/api-common/oss/file-upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture"
          :limit="1"
          :data="params"
          accept="image/*"
        >
          <div class="upload-btn-in">
            <img src="@/assets/image/login/upload-btn.png" />上传头像
          </div>
          <div slot="tip" class="el-upload__tip">
            支持jpg、png、jpeg、bmp格式，小于10M
          </div>
        </el-upload>
        <div class="confirm-btn" @click="onConfirmHeadUrl">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Auth from "@/api/auth";
import { mapGetters } from "vuex";

const defaultImgs = [
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/696b369d-859e-42cd-814c-64cbab6955f5.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/ebd5ef8d-9633-48af-b67c-25cb53e897c1.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/4e66e54f-2b0c-47f3-a646-3f8b5fe938ec.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/3eee183f-a10c-408c-acef-ca6dd7af1abb.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/242bc3de-fed9-4f30-b51f-f571400cdcf0.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/329fa85a-5723-4795-9b40-9864b237c8f2.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/b7ac962f-219a-4ee9-ae8e-e92bb0fd6eac.png",
  "https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/fa4c64d1-19a0-46c4-b012-7c65b4207c56.png",
];

export default {
  data() {
    return {
      info: {
        userId: 0,
        userName: "",
        sex: null,
        userJobStatus: null,
        lookWorkStatus: null,
        birthday: "",
        joinWorkDate: "",
        headPath: "",
      },
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        userJobStatus: [
          { required: true, message: "请选择身份", trigger: "blur" },
        ],
        birthday: [
          { required: true, message: "请选择出生年月", trigger: "blur" },
        ],
        joinWorkDate: [
          { required: true, message: "请选择参加工作时间", trigger: "blur" },
        ],
        lookWorkStatus: [
          { required: true, message: "请选择求职状态", trigger: "blur" },
        ],
        hopePositionType: [
          { required: true, message: "请选择求职类型", trigger: "blur" },
        ],
      },
      headUploadShow: false,
      selectedDefautIndex: null,
      lastSelected: null,
      fileList: [],
      params: {
        type: 1,
      },
      tempHeadUrl: "",
      hopePositionTypeOptions: [
        { value: "1", label: "全职" },
        { value: "2", label: "兼职" },
        { value: "3", label: "灵活就业" },
        { value: "4", label: "实习" },
      ],
    };
  },
  computed: {
    ...mapGetters(["userId", "userBasicInfo"]),
  },
  methods: {
    onClose() {
      this.headUploadShow = false;
      this.tempHeadUrl = "";
    },
    handleSuccess(response, file, fileList) {
      this.lastSelected = null;
      this.selectedDefautIndex = null;
      this.tempHeadUrl = response.data.url;
    },
    handleRemove() {},
    handlePreview() {},
    nextStep() {
      if (!this.info.headPath) {
        this.$message.warning("请选择头像");
        return;
      }
      this.info.userId = this.userId;
      const that = this;
      this.$refs.baseForm.validate(async (valid) => {
        if (valid) {
          this.$store.commit("REGISTER_BASIC", that.info);
          that.$emit("changeStep", 1);
          // let res = await await Auth.userDetailEdit(that.info)
          // if (res.code == 200) {
          //   that.$emit('changeStep', 1)
          // } else {
          //   that.$message.error(`${res.message}`)
          // }
        } else {
          return false;
        }
      });
    },
    confirmHeadImg() {
      this.tempHeadUrl = defaultImgs[this.lastSelected];
    },
    onConfirmHeadUrl() {
      if (!this.tempHeadUrl) {
        if (this.lastSelected || this.lastSelected === 0) {
          this.confirmHeadImg();
        }
      }
      this.$set(this.info, "headPath", this.tempHeadUrl);
      this.onClose();
    },
    uploadResume() {
      this.$emit("openFileDialog");
    },
  },
  created() {
    if (this.userBasicInfo && this.userBasicInfo !== {}) {
      this.info = Object.assign({}, this.userBasicInfo);
    }
  },
};
</script>

<style lang="scss" scoped>
.basic-info-form {
  height: 90vh;
  width: 576px;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;

  .header {
    height: 12.78vh;
    background: linear-gradient(
      180deg,
      rgba(36, 70, 168, 0.1) 0%,
      rgba(36, 70, 168, 0) 10%
    );
    padding: 1.64vh 0;
    box-sizing: border-box;

    .logo-title {
      height: 9.5vh;
      display: flex;
      align-items: center;
      padding-left: 48px;

      .logo {
        width: 56px;
        height: 56px;
      }

      .title-area {
        margin-left: 12px;
        text-align: left;
        .main-title {
          font-size: 20px;
          font-weight: 600;
          color: #222222;
        }
        .sub-title {
          margin-top: 11px;
          font-size: 12px;
          color: #929ab0;
        }
      }
    }

    .bottom {
      height: 3.28vh;
      line-height: 3.28vh;
      background-color: rgba(228, 183, 106, 0.2);
      font-size: 14px;
      color: #ee9f29;
      text-align: left;
      padding-left: 48px;

      a {
        font-weight: 500;
        text-decoration: underline;
      }
    }
  }

  .form {
    padding: 24px 48px;
    max-height: 69.92vh;
    overflow-y: scroll;

    &::-webkit-scrollbar-thumb {
      width: 4px;
      background: #63a5f6;
    }

    .avatar-upload {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      cursor: pointer;
    }

    .tips {
      margin-top: 8px;
      line-height: 1.5;
      font-size: 12px;
      color: #b2b2b2;
    }

    .gender {
    }

    .status {
      .sub-text {
        font-size: 12px;
        color: #666666;
      }
    }
  }

  .footer {
    border-top: 1px solid #d5dff0;
    position: absolute;
    bottom: 0;
    height: 68px;
    width: 408px;
    background: linear-gradient(
      180deg,
      rgba(36, 70, 168, 0.1) 0%,
      rgba(36, 70, 168, 0) 10%
    );
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 84px;

    .upload-btn {
      cursor: pointer;
      width: 108px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #2446a8;
      font-size: 14px;
      font-weight: 500;
      color: #2446a8;

      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    }

    .next-btn {
      cursor: pointer;
      width: 100px;
      height: 40px;
      background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px;
      line-height: 40px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }
  }
}

::-webkit-scrollbar-thumb {
  width: 4px;
  background: #63a5f6;
}

::v-deep .el-form-item__label {
  width: 100%;
  text-align: left;
}

::v-deep .el-form-item__content {
  text-align: left;
  margin-bottom: 0;
}

::v-deep .el-form-item {
  margin-bottom: 4px !important;
}

::v-deep .el-radio-button {
  margin-right: 22px;

  &:first-of-type {
    margin-right: 24px;
  }

  &:nth-of-type(2) {
    margin-right: 0;
  }

  &:nth-of-type(3) {
    margin-top: 16px;
    margin-right: 24px;
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
    font-size: 14px;
    color: #444444;
    letter-spacing: 1px;
    border: 1px solid #dadde2;
    width: 218px;
    height: 40px;
    font-weight: 600;
  }
}

::v-deep .el-radio-button.is-active {
  .el-radio-button__inner {
    background: rgba(36, 70, 168, 0.08);
    border: 1px solid #2446a8 !important;
    color: #333333;
  }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-text {
    font-size: 16px;
    font-weight: 400;
    color: #222222;
  }

  .close-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.dialog-content {
  .default-avatar {
    padding-bottom: 20px;
    .avatar {
      width: 64px;
      height: 64px;
      margin: auto;
    }

    .selected-avatar {
      width: 64px;
      height: 64px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  .upload-area {
    margin-top: 40px;

    .upload-btn-in {
      width: 108px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      border: 1px solid #dadde2;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      margin: auto;

      img {
        width: 16px;
        height: 16px;
        margin-right: 2px;
      }
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
}

::v-deep .el-dialog__header {
  padding: 24px 24px 32px;
}

::v-deep .el-dialog {
  border-radius: 0;
  width: 422px !important;
  height: 545px !important;
  background-image: url(~@/assets/image/login/avatar-bg.png) !important;
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 24px 0;

  .el-col-6 {
    position: relative;
  }
}

::v-deep .el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 30px;
  height: 30px;
}

::v-deep
  .el-upload-list--picture
  .el-upload-list__item.is-success
  .el-upload-list__item-name {
  line-height: 1;
}

::v-deep .el-upload-list--picture .el-upload-list__item {
  height: auto;
}
</style>
