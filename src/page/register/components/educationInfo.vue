<template>
  <div class="basic-info-form">
    <div class="header">
      <div class="logo-title">
        <img class="logo" src="@/assets/image/login/logo-small.png" />
        <div class="title-area">
          <div class="main-title">您的学历信息</div>
          <div class="sub-title">完善学历信息您将被送到更多招聘者眼前</div>
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
      <el-form :model="info" :rules="rules" ref="eduForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="学校名称" prop="schoolName">
              <el-input
                v-model="info.schoolName"
                style="width: 100%; height: 40px"
                placeholder="例如：北京大学"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="学历" prop="education">
              <el-select
                v-model="info.education"
                placeholder="选择学历"
                style="width: 100%; height: 40px"
              >
                <el-option
                  v-for="(edu, index) in educationList"
                  :value="edu.value"
                  :label="edu.label"
                  :key="edu.value"
                >
                </el-option>
              </el-select>
              <el-radio-group v-model="info.course" class="course">
                <el-radio-button :label="0">全日制</el-radio-button>
                <el-radio-button :label="1">非全日制</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所学专业" prop="major">
              <el-input
                v-model="info.major"
                style="width: 100%; height: 40px"
                placeholder="例如：计算机科学与技术"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="时间">
              <el-date-picker
                v-model="info.startTime"
                type="date"
                placeholder="入学年月"
                style="width: 49.5%"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <el-date-picker
                v-model="info.endTime"
                type="date"
                placeholder="毕业年月"
                style="width: 49.5%; margin-left: 1%"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="在校荣誉"
              style="margin-bottom: 6vh !important"
            >
              <el-input
                type="textarea"
                placeholder="可填写在校期间学习到的主要技能及获得的荣誉"
                v-model="info.honor"
                maxlength="300"
                show-word-limit
                rows="8"
              >
              </el-input>
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
      <div class="steps">
        <div class="last-btn" @click="lastStep">上一步</div>
        <div class="next-btn" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/api/auth";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      info: {
        id: null,
        schoolName: "",
        major: "",
        honor: "",
        startTime: "",
        endTime: "",
        education: "0",
      },
      rules: {
        schoolName: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
        ],
        education: [{ required: true, message: "请选择学历", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业名称", trigger: "blur" }],
        honor: [{ required: true, message: "请填写在校荣誉", trigger: "blur" }],
      },
      educationList: [
        { value: "0", label: "不限" },
        { value: "1", label: "小学" },
        { value: "2", label: "初中" },
        { value: "3", label: "高中" },
        { value: "4", label: "大专" },
        { value: "5", label: "本科" },
        { value: "6", label: "硕士" },
        { value: "7", label: "博士" },
      ],
    };
  },
  computed: {
    ...mapGetters(["userId", "userEduInfo"]),
  },
  methods: {
    lastStep() {
      this.$emit("changeStep", 0);
    },
    nextStep() {
      this.info.userId = this.userId;
      const that = this;
      this.$refs.eduForm.validate(async (valid) => {
        if (valid) {
          that.$store.commit("REGISTER_EDU", that.info);
          that.$emit("changeStep", 2);
          // let res = await Auth.userEducationEdit(this.info)
          // if (res.code == 200) {
          //   that.$emit('changeStep', 2)
          // } else {
          //   that.$message.error(`${res.message}`)
          // }
        } else {
          return false;
        }
      });
    },
    uploadResume() {
      this.$emit("openFileDialog");
    },
  },
  created() {
    if (this.userEduInfo && this.userEduInfo !== {}) {
      this.info = Object.assign({}, this.userEduInfo);
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
    overflow: scroll;

    .avatar-upload {
      width: 90px;
      height: 90px;
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
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }

    .course {
      margin-top: 16px;
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

    .steps {
      display: flex;
    }

    .last-btn {
      cursor: pointer;
      width: 100px;
      height: 38px;
      line-height: 38px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      border: 1px solid #dadde2;
      font-size: 14px;
      font-weight: 500;
      color: #333333;
    }

    .next-btn {
      margin-left: 16px;
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
</style>
