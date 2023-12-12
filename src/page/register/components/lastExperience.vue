<template>
  <div class="basic-info-form">
    <div class="header">
      <div class="logo-title">
        <img class="logo" src="@/assets/image/login/logo-small.png" />
        <div class="title-area">
          <div class="main-title">您最近的一份工作经历</div>
          <div class="sub-title">完善基本信息后会遇到更多对你感兴趣的招聘者</div>
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
      <el-form :model="info" :rules="rules" ref="expForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司全称" prop="company">
              <el-input
                v-model="info.company"
                style="width: 100%; height: 40px"
                placeholder="例如：华为技术有限公司"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所任职位" prop="positionTypeId">
              <el-cascader
                v-model="info.positionTypeId"
                :options="positionTypeList"
                style="width: 100%; height: 40px"
                :show-all-levels="false"
                clearable
                @change="posChange"
                ref="positionSelect"
                :props="positionProps"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="在职时间">
              <el-date-picker
                v-model="info.startTime"
                type="date"
                placeholder="入职年月"
                style="width: 49.5%"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <el-date-picker
                v-model="info.endTime"
                type="date"
                placeholder="离职年月"
                style="width: 49.5%; margin-left: 1%"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="该份工作需要的技能">
              <el-select
                v-model="info.skillList"
                placeholder="请选择"
                style="width: 100%; height: 40px"
                multiple
                :multiple-limit="3"
                @change="selectSkills"
              >
                <el-option v-for="(opt, index) in skills" :key="opt.id" :label="opt.labelName" :value="opt.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工作内容" prop="workContent" style="margin-bottom: 7.5vh !important">
              <el-input
                type="textarea"
                placeholder="请输入工作内容描述"
                v-model="info.workContent"
                maxlength="1600"
                show-word-limit
                rows="9"
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
import { mapGetters } from 'vuex'
import Auth from '@/api/auth'
import Home from '@/api/home'

export default {
  data() {
    return {
      info: {
        id: null,
        company: '',
        startTime: '',
        positionTypeId: '',
        positionTypeName: null,
        industryId: null,
        industryMxName: null,
        department: null,
        endTime: '',
        skillList: [],
        workContent: '',
        performance: null,
      },
      rules: {
        company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        positionTypeId: [{ required: true, message: '请选择职位', trigger: 'blur' }],
        // skillList: [{ required: true, message: '请选择技能', trigger: 'blur' }],
        workContent: [{ required: true, message: '请输入工作内容', trigger: 'blur' }],
      },
      positionTypeList: [],
      skills: [],
      chosenSkills: [],
      positionProps: {
        emitPath: false,
      },
    }
  },
  computed: {
    ...mapGetters(['userId', 'userLastExperience']),
  },
  methods: {
    selectSkills(val) {
      this.chosenSkills = val.map(id => {
        const index = this.skills.findIndex(s => s.id === id)
        return this.skills[index]
      })
      console.log(this.chosenSkills)
    },
    posChange(value) {
      this.getSkills(value)
    },
    async getSkills(positionTypeId) {
      let res = await Auth.queryUserSkillList({ positionTypeId })
      this.skills = res.data
    },
    async getPositonType() {
      let res = await Home.positionType({})
      if (res.code == 200) {
        let positionTypeList = res.data
        positionTypeList.forEach(p => {
          p.value = p.pid
          p.label = p.pname
          if (p.childLists && p.childLists.length) {
            p.children = p.childLists
            p.children.forEach(c => {
              c.value = c.id
              c.label = c.typeName
              if (c.subChildLists && c.subChildLists.length) {
                c.children = c.subChildLists
                c.children.forEach(s => {
                  s.value = s.subId
                  s.label = s.subTypeName
                })
              }
            })
          }
        })
        this.positionTypeList = positionTypeList
      }
    },
    lastStep() {
      this.$emit('changeStep', 1)
    },
    nextStep() {
      this.info.userId = this.userId
      this.info.skillList = this.chosenSkills
      if (this.$refs.positionSelect && this.$refs.positionSelect.getCheckedNodes()[0]) {
        this.info.positionTypeName = this.$refs.positionSelect.getCheckedNodes()[0].pathNodes[2].label
      }
      const that = this
      this.$refs.expForm.validate(async valid => {
        if (valid) {
          that.$store.commit('REGISTER_LAST_EXPERIENCE', that.info)
          that.$emit('changeStep', 3)
          // let res = await Auth.userExperienceEdit(that.info)
          // if (res.code == 200) {
          //   that.$emit('changeStep', 3)
          //   that.chosenSkills = []
          // } else {
          //   that.$message.error(`${res.message}`)
          // }
        } else {
          return false
        }
      })
    },
    uploadResume() {
      this.$emit('openFileDialog')
    },
  },
  created() {
    if (this.userLastExperience && this.userLastExperience !== {}) {
      this.info = Object.assign({}, this.userLastExperience)
    }
    if (this.userLastExperience.positionTypeId) {
      this.getSkills(this.userLastExperience.positionTypeId)
    }
    if (this.userLastExperience.skillList && this.userLastExperience.skillList.length) {
      this.info.skillList = this.userLastExperience.skillList.map(s => s.id)
      this.chosenSkills = this.userLastExperience.skillList
    }
    this.getPositonType()
  },
}
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
    background: linear-gradient(180deg, rgba(36, 70, 168, 0.1) 0%, rgba(36, 70, 168, 0) 10%);
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
    background: linear-gradient(180deg, rgba(36, 70, 168, 0.1) 0%, rgba(36, 70, 168, 0) 10%);
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
    width: 228px;
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
