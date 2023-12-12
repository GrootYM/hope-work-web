<template>
  <div class="basic-info-form">
    <div class="header">
      <div class="logo-title">
        <img class="logo" src="@/assets/image/login/logo-small.png" />
        <div class="title-area">
          <div class="main-title">您期望的职位</div>
          <div class="sub-title">完善简历信息您将被送到更多招聘者眼前</div>
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
      <el-form :model="info" :rules="rules" ref="expectedForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="期望的职位" prop="positionTypeId">
              <el-cascader
                v-model="info.positionTypeId"
                :options="positionTypeList"
                style="width: 100%; height: 40px"
                :show-all-levels="false"
                clearable
                ref="positionSelect"
                :props="positionProps"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="期望的薪资范围">
              <el-input
                v-model.number="info.startSalary"
                oninput="value=value.replace(/^0|[^0-9]/g,'')"
                type="number"
                style="width: 49.5%"
              >
                <span slot="suffix">k</span>
              </el-input>
              <el-input
                v-model.number="info.endSalary"
                oninput="value=value.replace(/^0|[^0-9]/g,'')"
                type="number"
                style="width: 49.5%; margin-left: 1%"
              >
                <span slot="suffix">k</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="期望工作的行业" prop="industryMxId">
              <el-select
                ref="industrySelect"
                v-model="info.industryMxId"
                placeholder="选择行业"
                style="width: 100%; height: 40px"
              >
                <el-option
                  v-for="(industry, index) in industryList"
                  :key="industry.id"
                  :label="industry.industryName"
                  :value="industry.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="期望的工作地点" prop="cityName">
              <el-select
                ref="citySelect"
                v-model="info.cityCode"
                placeholder="选择工作地点"
                style="width: 100%; height: 40px"
              >
                <el-option v-for="(city, index) in cityList" :key="city.id" :label="city.name" :value="city.zipcode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="个人优势" prop="advantage" style="margin-bottom: 7.2vh !important">
              <el-input
                type="textarea"
                placeholder="您可以总结一下之前的工作成果，也可以向招聘者展示您擅长的工作技能和方向"
                v-model="info.advantage"
                maxlength="140"
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
        <div class="next-btn" @click.stop.prevent="previewInfo">预览</div>
        <div class="next-btn" @click="nextStep">完成</div>
      </div>
    </div>
    <el-dialog :visible.sync="previewVisible" :show-close="false" :close-on-click-modal="false" :append-body="true">
      <div slot="title" class="dialog-header">
        <div></div>
        <img src="@/assets/image/login/close.png" class="close-btn" @click="closeDialog" />
      </div>
      <div class="dialog-content">
        <div class="preview-page">
          <div class="top-section">
            <div class="basic-info">
              <div class="user-name">{{ userBasicInfo.userName }}</div>
              <div class="user-detail">
                <div style="display: flex; margin-bottom: 12px">
                  <div class="right-bd">{{ userBasicInfo.sex | sexFilter }}</div>
                  <div class="right-bd">年龄：{{ userBasicInfo.birthday | ageFilter }}岁</div>
                  <div class="right-bd">{{ userBasicInfo.phone }}</div>
                  <div>期望行业：{{ info.industryMxName }}</div>
                </div>
                <div style="display: flex">
                  <div class="right-bd">{{ userBasicInfo.joinWorkDate | ageFilter }}年工作经验</div>
                  <div class="right-bd">求职意向：{{ info.positionTypeName }}</div>
                  <div class="right-bd">期望薪资：{{ info.startSalary }}-{{ info.endSalary }}K</div>
                  <div>期望城市：{{ info.cityName }}</div>
                </div>
              </div>
            </div>
            <img class="user-head-img" :src="userBasicInfo.headPath" />
          </div>
          <div class="section">
            <div class="section-title">个人优势</div>
            <div class="section-content">
              <p class="desc-text">{{ info.advantage }}</p>
            </div>
          </div>
          <div class="section">
            <div class="section-title">工作经历</div>
            <div class="section-content">
              <div class="first">
                <div>
                  <span class="main-text" v-if="userLastExperience.company">
                    {{ userLastExperience.company }}
                  </span>
                  <span class="sub-text" v-if="userLastExperience.positionTypeName">
                    {{ userLastExperience.positionTypeName }}
                  </span>
                </div>
                <div class="time-text" v-if="userLastExperience.startTime">
                  {{ userLastExperience.startTime }}-{{ userLastExperience.endTime }}
                </div>
              </div>
              <div class="desc-text" v-if="userLastExperience.workContent">{{ userLastExperience.workContent }}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">教育经历</div>
            <div class="section-content">
              <div class="first">
                <div>
                  <span class="main-text" v-if="userEduInfo.schoolName">
                    {{ userEduInfo.schoolName }}
                  </span>
                  <span class="sub-text" v-if="userEduInfo.education">
                    {{ educationDict[userEduInfo.education] }}
                  </span>
                  <span class="sub-text" v-if="userEduInfo.major">
                    {{ userEduInfo.major }}
                  </span>
                </div>
                <div class="time-text" v-if="userEduInfo.startTime">
                  {{ userEduInfo.startTime }}-{{ userEduInfo.endTime }}
                </div>
              </div>
              <div class="desc-text" v-if="userEduInfo.honor">{{ userEduInfo.honor }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Auth from '@/api/auth'
import Job from '@/api/job'
import Home from '@/api/home'
import { mapGetters } from 'vuex'
import moment from 'moment'

const sexDict = {
  1: '男',
  2: '女',
}

export default {
  filters: {
    sexFilter(value) {
      return sexDict[value]
    },
    ageFilter(value) {
      return value ? moment().diff(value, 'years') : ''
    },
  },
  data() {
    return {
      info: {
        industryMxId: null,
        industryMxName: null,
        cityName: null,
        advantage: '',
        startSalary: null,
        endSalary: null,
        cityCode: null,
        cityName: null,
        advantage: null,
        positionTypeId: null,
        positionTypeName: null,
      },
      rules: {
        positionTypeId: [{ required: true, message: '请选择职业类型', trigger: 'blur' }],
        industryMxId: [{ required: true, message: '请选择行业', trigger: 'blur' }],
        cityName: [{ required: true, message: '请选择求职城市', trigger: 'blur' }],
        advantage: [{ required: true, message: '请填写个人优势', trigger: 'blur' }],
      },
      positionTypeList: [],
      cityList: [],
      industryList: [],
      positionProps: {
        emitPath: false,
      },
      previewVisible: false,
      educationDict: {
        0: '不限',
        1: '小学',
        2: '初中',
        3: '高中',
        4: '大专',
        5: '本科',
        6: '硕士',
        7: '博士',
      },
    }
  },
  computed: {
    ...mapGetters(['userId', 'userExpectedPosition', 'userBasicInfo', 'userEduInfo', 'userLastExperience']),
  },
  methods: {
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
    async getIndustryOptions() {
      let res = await Job.queryAllIndustryType({})
      this.industryList = res.data
    },
    async getCityOptions() {
      let res = await Auth.queryHotCityList({})
      this.cityList = res.data
    },
    lastStep() {
      this.$emit('changeStep', 2)
    },
    nextStep() {
      this.info.userId = this.userId
      const that = this
      if (Number(this.info.startSalary) >= Number(this.info.endSalary)) {
        this.$message.error('起薪应低于最高薪')
        return
      }
      if (this.$refs.industrySelect && this.$refs.industrySelect.selected) {
        this.info.industryMxName = this.$refs.industrySelect.selected.label
      }
      if (this.$refs.positionSelect && this.$refs.positionSelect.getCheckedNodes()[0]) {
        this.info.positionTypeName = this.$refs.positionSelect.getCheckedNodes()[0].pathNodes[2].label
      }
      if (this.$refs.citySelect && this.$refs.citySelect.selected) {
        this.info.cityName = this.$refs.citySelect.selected.label
      }
      this.$refs.expectedForm.validate(async valid => {
        if (valid) {
          that.$store.commit('REGISTER_EXPECTED_POSITION', that.info)
          that.complete()
          // let res = await await Auth.userDetailEdit(that.info)
          // if (res.code == 200) {
          //   this.$router.replace({ path: '/index/home' })
          // } else {
          //   that.$message.error(`${res.message}`)
          // }
        } else {
          return false
        }
      })
    },
    complete() {
      const loading = this.$loading({
        lock: true,
        text: '提交注册信息中……',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)',
      })
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
            this.$router.replace({ path: '/index/home' })
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          loading.close()
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
    uploadResume() {
      this.$emit('openFileDialog')
    },
    previewInfo() {
      if (this.$refs.industrySelect && this.$refs.industrySelect.selected) {
        this.info.industryMxName = this.$refs.industrySelect.selected.label
      }
      if (this.$refs.positionSelect && this.$refs.positionSelect.getCheckedNodes()[0]) {
        this.info.positionTypeName = this.$refs.positionSelect.getCheckedNodes()[0].pathNodes[2].label
      }
      if (this.$refs.citySelect && this.$refs.citySelect.selected) {
        this.info.cityName = this.$refs.citySelect.selected.label
      }
      this.previewVisible = true
    },
    closeDialog() {
      this.previewVisible = false
    },
  },
  created() {
    if (this.userExpectedPosition && this.userExpectedPosition !== {}) {
      this.info = Object.assign({}, this.userExpectedPosition)
    }
    this.getPositonType()
    this.getIndustryOptions()
    this.getCityOptions()
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
      width: 75px;
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
  .preview-page {
    background: #ffffff;
    height: 75vh;
    overflow-y: scroll;
    padding: 2.96vh;
    margin: auto;

    .top-section {
      display: flex;

      .basic-info {
        flex: 1;
        text-align: left;
        .user-name {
          font-size: 24px;
          font-weight: 600;
          color: #222222;
          height: 58px;
          width: 80px;
        }

        .user-detail {
          font-size: 12px;
          color: #333333;

          div {
            div {
              padding: 0 4px;
              &:nth-child(1) {
                padding-left: 0;
              }
            }
          }
        }

        .right-bd {
          border-right: 1px solid #dadde2;
        }
      }

      .user-head-img {
        width: 78px;
        height: 90px;
      }
    }

    .section {
      .section-title {
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        color: #222222;
        padding-bottom: 6px;
        border-bottom: 1px solid #dadde2;
        margin-top: 16px;
      }

      .section-content {
        position: relative;
        padding-top: 6px;
        font-size: 10px;
        color: #333333;
        text-align: left;

        .first {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
          line-height: 26px;
          height: 26px;
        }

        .main-text {
          font-size: 12px;
          font-weight: 600;
          color: #222222;
        }

        .sub-text {
          font-size: 12px;
          margin-left: 10px;
        }

        .time-text {
          font-size: 12px;
          color: #999999;
        }

        .desc-text {
          font-size: 10px;
          white-space: pre-wrap;
          line-height: 18px;
        }
      }
    }
  }
}

::v-deep .el-dialog__header {
  padding: 24px 22px 12px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 58vw !important;
  height: 90vh !important;
  background-image: url(~@/assets/image/login/avatar-bg.png);
  background-size: 100% 100%;
  margin-top: 1% !important;
}

::v-deep .el-dialog__body {
  padding: 0 44px;
}
</style>
