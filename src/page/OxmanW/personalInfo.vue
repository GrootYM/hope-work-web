<template>
  <div class="resume-bg">
    <div class="goBackBox">
      <el-button class="goBack" @click="goBack()">返回</el-button>
    </div>
    <div class="container">
      <div class="online-layout">
        <div class="nav">
          <div :class="isOver ? 'nav-fixed' : ''">
            <div class="nav-title">简历目录</div>
            <el-menu default-active="0" class="el-menu-vertical-demo">
              <el-menu-item v-for="(item, index) in menuList" :key="index" :index="`${index}`" @click="goto(item)">
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="resume">
          <div class="resume-header">在线简历</div>
          <div class="basic-info" :id="menuList[0].to">
            <div class="show">
              <div class="base">
                <div class="left-part">
                  <div class="name">{{ basicInfo.userName }}</div>
                  <div style="display: flex">
                    <div class="field">
                      <img src="@/assets/image/userCenter/icon-bag.png" class="base-icon" />
                      {{ basicInfo.workExperience }}
                    </div>
                    <div class="field">
                      <img src="@/assets/image/userCenter/icon-hat.png" class="base-icon" />
                      {{ educationDict[basicInfo.education] }}
                    </div>
                    <div class="field" style="border: none">
                      <img src="@/assets/image/userCenter/icon-person.png" class="base-icon" />
                      {{ lookWorkStatusDict[basicInfo.lookWorkStatus] }}
                    </div>
                  </div>
                  <div style="display: flex">
                    <div class="field">
                      <img src="@/assets/image/userCenter/icon-clock.png" class="base-icon" />
                      {{ basicInfo.joinWorkDate }}
                    </div>
                    <div class="field">
                      <img src="@/assets/image/userCenter/icon-phone.png" class="base-icon" />
                      {{ basicInfo.phone }}
                    </div>
                    <div class="field" style="border: none">
                      {{ hopePositionTypeDict[basicInfo.hopePositionType] }}
                    </div>
                  </div>
                </div>
                <div class="right-part">
                  <img :src="basicInfo.headPath" style="width: 64px; height: 64px; border-radius: 50%" />
                </div>
              </div>
            </div>
          </div>
          <div class="advantage" :id="menuList[1].to">
            <div class="show">
              <div class="info-header">
                <div class="side-bar"></div>
                <div class="title">个人优势</div>
              </div>
              <div class="detail-text">{{ basicInfo.advantage }}</div>
            </div>
          </div>
          <div class="expected-position" :id="menuList[2].to">
            <div class="show">
              <div class="info-header">
                <div class="side-bar"></div>
                <div class="title">期望职位</div>
              </div>
              <div style="display: flex; padding-top: 24px">
                <div class="field" v-if="basicInfo.positionTypeId">
                  <img src="@/assets/image/userCenter/icon-tie.png" class="base-icon" />
                  {{ basicInfo.positionTypeName }}
                </div>
                <div class="field" v-if="basicInfo.startSalary || basicInfo.endSalary">
                  <img src="@/assets/image/userCenter/icon-money.png" class="base-icon" />
                  {{ basicInfo.startSalary }}-{{ basicInfo.endSalary }}k
                </div>
                <div class="field" v-if="basicInfo.industryMxId">
                  <img src="@/assets/image/userCenter/icon-analysis.png" class="base-icon" />
                  {{ basicInfo.industryMxName }}
                </div>
                <div class="field" v-if="basicInfo.cityName" style="border: none">
                  <img src="@/assets/image/userCenter/icon-location.png" class="base-icon" />
                  {{ basicInfo.cityName }}
                </div>
              </div>
            </div>
          </div>
          <div class="work-experience" :id="menuList[3].to">
            <div class="show">
              <div class="info-header">
                <div class="side-bar"></div>
                <div class="title">工作经历</div>
              </div>
              <div class="career" v-for="(item, index) in jobExperience" :key="index" v-show="item.company">
                <div class="name-area">
                  <span class="name">{{ item.company }}</span>
                  <span class="time">{{ item.startTime }}~{{ item.endTime }}</span>
                </div>
                <div class="type-area">
                  <span class="type">{{ item.positionTypeName }}</span>
                </div>
                <p class="content-area">
                  <span style="font-size: 16px; font-weight: 600; color: #333333">内容：</span>{{ item.workContent }}
                </p>
                <div class="tags">
                  <div class="tag" v-for="(skill, i) in item.skillList" :key="i">
                    {{ skill.labelName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="project-experience" :id="menuList[4].to">
            <div class="show">
              <div class="info-header">
                <div class="side-bar"></div>
                <div class="title">项目经历</div>
              </div>
              <div class="career" v-for="(item, index) in proExperience" :key="index" v-show="item.projectName">
                <div class="name-area">
                  <span class="name">{{ item.projectName }}</span>
                  <span class="time">{{ item.startTime }}~{{ item.endTime }}</span>
                </div>
                <div class="type-area">
                  <span class="type">{{ item.projectRole }}</span>
                </div>
                <p class="content-area">
                  <span style="font-size: 16px; font-weight: 600; color: #333333">内容：</span>{{ item.workDescribe }}
                </p>
              </div>
            </div>
          </div>
          <div class="education-experience" :id="menuList[5].to">
            <div class="show">
              <div class="info-header">
                <div class="side-bar"></div>
                <div class="title">教育经历</div>
              </div>
              <div class="career" v-for="(item, index) in eduExperience" :key="index" v-show="item.schoolName">
                <div class="name-area">
                  <span class="name">{{ item.schoolName }}</span>
                  <span class="time">{{ item.startTime }}~{{ item.endTime }}</span>
                </div>
                <div class="type-area">
                  <span class="type">{{ item.major }}</span>
                  <span class="type">{{ educationDict[item.education] }}</span>
                </div>
                <p class="content-area">{{ item.honor }}</p>
              </div>
            </div>
          </div>
          <button class="handleHello" @click="handleHello">打招呼</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/api/auth'

export default {
  components: {},
  data() {
    return {
      userId: '',
      menuList: [
        { title: '个人信息', to: 'basicInfo' },
        { title: '个人优势', to: 'advantage' },
        { title: '期望职位', to: 'expectedPosition' },
        { title: '工作经历', to: 'jobExperience' },
        { title: '项目经历', to: 'proExperience' },
        { title: '教育经历', to: 'eduExperience' },
      ],
      basicInfo: {},
      jobExperience: [
        {
          id: null,
          company: null,
          startTime: null,
          endTime: null,
          positionTypeId: null,
          positionTypeName: null,
          workContent: null,
          skillList: [],
        },
      ],
      proExperience: [
        {
          id: null,
          projectName: null,
          startTime: null,
          endTime: null,
          projectRole: null,
          workDescribe: null,
          performance: null,
        },
      ],
      eduExperience: [
        {
          id: null,
          schoolName: null,
          education: null,
          major: null,
          startTime: null,
          endTime: null,
          honor: null,
        },
      ],
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
      lookWorkStatusDict: {
        1: '离职-随时到岗',
        2: '在职-月内到岗',
        3: '在职-考虑机会',
        4: '在职-暂不考虑',
      },
      hopePositionTypeDict: {
        1: '全职',
        2: '兼职',
        3: '灵活就业',
        4: '实习',
      },
      isOver: false,
    }
  },
  watch: {
    $route: {
      handler(v, from) {
        if (from.name == 'searchOxman') {
          this.$bus.$emit('EVENT_HOME_SCROLL', 0)
          this.userId = this.$route.query.userId
          this.getUserInfo()
          this.getJob()
          this.getPro()
          this.getEdu()
        }
      },
    },
  },
  mounted() {
    document.addEventListener('scroll', this.updateScrollTop)
    this.userId = this.$route.query.userId
    this.getUserInfo()
    this.getJob()
    this.getPro()
    this.getEdu()
  },
  destroyed() {
    document.removeEventListener('scroll', this.updateScrollTop)
  },
  methods: {
    goBack() {
      this.routerGo(-1)
    },
    handleHello(){
      this.$router.push({
        path: '/oxHome/communicate',
      })
      this.$store.dispatch('setOxTitle', '沟通')
    },
    updateScrollTop() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 兼容多个浏览器
      this.isOver = scrollTop >= 80
    },
    goto(menu) {
      document.getElementById(menu.to).scrollIntoView(true)
    },
    async getUserInfo() {
      let res = await Auth.queryPersonInfo({ userId: this.userId })
      this.basicInfo = res.data
      console.log(res.data, '999')
    },
    async getJob() {
      this.chosenSkills = []
      this.jobInfoItem = {}
      let res = await Auth.queryPersonJobExperience({ userId: this.userId })
      if (res.data && res.data.length) {
        this.jobExperience = res.data.splice(0, 3) // 只取三次经历
      } else {
        this.jobExperience = [
          {
            id: null,
            company: null,
            startTime: null,
            endTime: null,
            positionTypeId: null,
            positionTypeName: null,
            workContent: null,
            skillList: [],
          },
        ]
      }
    },
    async getPro() {
      this.proInfoItem = {}
      let res = await Auth.queryPersonProjectExperience({ userId: this.userId })
      if (res.data && res.data.length) {
        this.proExperience = res.data.splice(0, 3)
      } else {
        this.proExperience = [
          {
            id: null,
            projectName: null,
            startTime: null,
            endTime: null,
            projectRole: null,
            workDescribe: null,
            performance: null,
          },
        ]
      }
    },
    async getEdu() {
      this.eduInfoItem = {}
      let res = await Auth.queryPersonEducationExperience({ userId: this.userId })
      if (res.data && res.data.length) {
        this.eduExperience = res.data.splice(0, 3)
      } else {
        this.eduExperience = [
          {
            id: null,
            schoolName: null,
            education: null,
            major: null,
            startTime: null,
            endTime: null,
            honor: null,
          },
        ]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.resume-bg {
  background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  padding-top: 20px;

  .container {
    width: 1200px;
    margin: auto;
  }
}

.online-layout {
  display: flex;

  .nav {
    width: 160px;

    .nav-fixed {
      position: fixed;
      top: 20px;
      width: 160px;
    }

    .nav-title {
      background-image: url(~@/assets/image/userCenter/rect-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: #ffffff;
      text-align: left;
      padding: 15px 0 15px 24px;
    }
  }

  .resume {
    margin-left: 16px;
    flex: 1;
    background-color: #ffffff;

    .resume-header {
      height: 50px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      font-weight: 500;
      color: #3d3d3d;
      background-image: url(~@/assets/image/userCenter/rect-bg-long.png);
      background-size: 100% 100%;

      .action {
        font-size: 14px;
        color: #2446a8;
        cursor: pointer;
      }
    }

    .show {
      position: relative;
      padding: 0 24px 20px;
    }
    .field {
      display: flex;
      align-items: center;
      padding-right: 16px;
      border-right: 1px solid #dadde2;
      margin-bottom: 14px;
      font-size: 14px;
      color: #666666;
      padding-left: 16px;

      &:first-child {
        padding-left: 0;
      }
    }

    .base-icon {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }

    .basic-info {
      .base {
        display: flex;
        justify-content: space-between;
        position: relative;
        padding-top: 20px;

        .left-part {
          .name {
            font-size: 24px;
            font-weight: 500;
            color: #3d3d3d;
            margin-bottom: 24px;
            text-align: left;
          }
        }
        .right-part {
          padding-right: 20px;
        }
      }
    }

    .advantage,
    .expected-position,
    .work-experience,
    .project-experience,
    .education-experience {
    }

    .info-header {
      display: flex;
      align-items: center;
      // margin-bottom: 24px;
      padding-top: 8px;
      .side-bar {
        width: 3px;
        height: 16px;
        background: #2446a8;
        border-radius: 2px;
      }

      .title {
        margin-left: 8px;
        font-size: 18px;
        color: #444444;
        height: 25px;
        line-height: 25px;
      }
    }

    .detail-text {
      text-align: left;
      font-size: 14px;
      color: #666666;
      padding: 24px 11px 0 8px;
      white-space: pre-wrap;
      line-height: 26px;
    }

    .career {
      padding: 24px 16px 20px 8px;
      text-align: left;

      .name-area {
        margin-bottom: 24px;
        .name {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
        }
        .time {
          margin-left: 20px;
          font-size: 14px;
          color: #666666;
        }
      }

      .type-area {
        margin-bottom: 24px;
        .type {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          padding-right: 16px;
          &:nth-child(2) {
            padding-left: 16px;
            border-left: 1px solid #dadde2;
          }
        }
      }

      .content-area {
        font-size: 14px;
        line-height: 26px;
        color: #666666;
        white-space: pre-wrap;
      }

      .tags {
        display: flex;
        margin-top: 16px;

        .tag {
          height: 25px;
          line-height: 25px;
          background: #f3f5f9;
          border-radius: 4px;
          padding: 0 12px;
          font-size: 12px;
          color: #666666;
          margin-right: 8px;
        }
      }
    }
  }
}
.goBackBox {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
::v-deep .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}

::v-deep .el-menu {
}

::v-deep .el-menu-vertical-demo {
  border: none;
  padding-top: 0;
}

::v-deep .el-menu-item {
  padding-left: 24px !important;

  &:hover {
    background: rgba(36, 70, 168, 0.05);
    color: #2446a8;
  }
}

::v-deep .el-menu-item.is-active {
  background: rgba(36, 70, 168, 0.05);
  color: #2446a8;
}

::v-deep .el-input__suffix {
  display: block;
  line-height: 40px;
}

.handleHello {
    width: 93px;
    font-size: 13px;
    display: inline-block;
    margin-left: 70%;
    font-size: 14px;
    background: #2446A8;
    color: #ffffff;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 4px 4px 4px 4px;
  }
</style>
