<template>
  <div class="main">
    <div class="companyBox">
      <div class="companyCon">
        <div class="companyLeft">
          <img :src="company.headUrl" alt="" />
          <div class="companyInfo">
            <h2>{{ company.companyName }}</h2>
            <div class="cardLabel">
              <p v-if="company.finance">{{ company.finance }}</p>
              <p v-if="company.companyScale">{{ company.companyScale }}</p>
              <p v-if="company.industryName">{{ company.industryName }}</p>
            </div>
          </div>
        </div>
        <div class="companyRight">
          <div class="jobAbout">
            <p>
              <span>{{ company.positionNum }}</span
              >在招职位
            </p>
            <p>
              <span>{{ company.bossNum }}</span
              >位BOSS
            </p>
          </div>
        </div>
        <div class="vitaAbout">
          <div @click="toMuBan">
            <img src="@/assets/image/job/icon1.png" alt="" />
            <p>在线完善简历</p>
          </div>
          <div @click="toJianli">
            <img src="@/assets/image/job/icon2.png" alt="" />
            <p>上传附件简历</p>
          </div>
        </div>
      </div>
    </div>

    <div class="companyAbout">
      <div class="tabBox">
        <div :class="['tabItem', tabActive == 1 ? 'active' : '']" @click="qieTab(1)">
          <p>公司简介</p>
        </div>
        <div :class="['tabItem', tabActive == 2 ? 'active' : '']" @click="qieTab(2)">
          <p>招聘职位({{ company.positionNum }})</p>
        </div>
      </div>
      <CompanyInfo v-if="tabActive == 1" :id="id" :company="company" @changeTab="toChangeTab" />
      <RecruitJob v-if="tabActive == 2" :id="id" :company="company" />
    </div>
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
import { mapActions, mapMutations, mapGetters } from 'vuex'
import CompanyInfo from '@/component/Job/companyInfo'
import RecruitJob from '@/component/Job/recruitJob'
import Auth from '@/api/auth'
import Job from '@/api/job'
export default {
  components: {
    CompanyInfo,
    RecruitJob,
  },
  computed: {
    ...mapGetters(['userId', 'cityName']),
  },
  watch: {
    $route(to, from) {
      if (to.query.id != from.query.id) {
        this.id = to.query.id // 把最新id赋值给定义在data中的id
        this.queryCompanyInfoByPerson() // 重新调用加载数据方法
      }
    },
  },
  data() {
    return {
      fileShow: false,
      fileList: [],
      params: {
        type: 2,
      },
      vitaeId: null,
      id: '',
      company: {
        aliName: '广州希音国际进出口有限公司',
        type: '有限责任公司（外国法人独资）',
        legal: '顾晓庆',
        bDate: '2017-08-30',
        status: '在营',
        money: '65000万人民币',
        name: 'SHEIN(广州)',
        img: 'https://wx.dongdongmm.com/crmimg/MLSY/images/tab_btn_prof_n@2x.png',
        label: [
          {
            name: 'SHEIN(广州)',
          },
          {
            name: '1000-9999人',
          },
          {
            name: '电子商务',
          },
        ],
        jobNum: 48,
        bossNum: 4,
        hotJob: 56,
        allJobNum: 324,
        intro:
          'SHEIN是一家全球领先的时尚和生活方式在线零售商，致力于让“人人尽享时尚之美”。我们通过按需生产的模式赋能供应商共同打造敏捷柔性供应链，从而减少浪费，并向全球消费者提供丰富且具有性价比的时尚产品。',
      },
      tabActive: -1,
    }
  },
  mounted() {
    setTimeout(() => {
      this.$bus.$emit('EVENT_SCROLL', 0)
    }, 500)
    this.id = this.$route.query.id
    this.queryCompanyInfoByPerson()
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
      Auth.userDetailEdit(params).then(res => {
        _this.getResumeList()
      })
      _this.fileShow = false
    },
    async getResumeList() {
      let res = await Auth.queryResumeByUserId({ userId: this.userId })
      this.vitaeId = res.data[0].vitaeId
    },
    closeDialog() {
      this.fileShow = false
    },
    toChangeTab(value) {
      this.tabActive = value
    },
    qieTab(type) {
      if (type == this.tabActive) {
        return
      }
      this.tabActive = type
      // if (type == 1) {
      //   this.$router.push({ path: '/index/company/companyInfo' })
      // } else {
      //   this.$router.push({ path: '/index/company/recruitJob' })
      // }
    },
    toJianli() {
      if (!this.userId) {
        this.$router.push({ path: '/login' })
        return
      }
      this.fileShow = true
    },
    toMuBan() {
      this.$router.push({ path: '/resumeMake' })
    },
    async queryCompanyInfoByPerson() {
      let params = {
        id: this.id || '',
      }
      let res = await Job.queryCompanyInfoByPerson(params)
      if (res.code == 200) {
        this.company = res.data
        if (this.$route.query.tabId) {
          console.log(this.$route.query.tabId)
          this.tabActive = this.$route.query.tabId
        } else {
          this.tabActive = 1
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css');

$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
#app {
  min-width: $nx-width;
  .main {
    background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  }
  .companyBox {
    width: 100%;
    height: 188px;
    background: #293b60;
    .companyCon {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .companyLeft {
        display: flex;
        img {
          width: 72px;
          height: 72px;
          border-radius: 4px 4px 4px 4px;
          margin-right: 24px;
          border: 1px solid rgba(36, 70, 168, 0.1);
          box-sizing: border-box;
        }
        .companyInfo {
          h2 {
            font-size: 32px;
            color: #ffffff;
            line-height: 45px;
            text-align: left;
          }
          .cardLabel {
            color: rgba(255, 255, 255, 0.65);
            margin-top: 7px;
          }
        }
      }
      .companyRight {
        .jobAbout {
          display: flex;
          font-size: 16px;
          color: #ffffff;
          line-height: 23px;
          p {
            margin-left: 32px;
          }
          span {
            font-size: 46px;
            line-height: 67px;
            margin-right: 8px;
          }
        }
      }
      .vitaAbout {
        position: absolute;
        right: 0;
        bottom: 24px;
        display: flex;
        div {
          display: flex;
          align-items: flex-end;
          margin-left: 24px;
          color: #5cc5fc;
          font-size: 16px;
          line-height: 22px;
          img {
            width: 22px;
            height: 22px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .companyAbout {
    width: 1200px;
    margin: 0 auto;
    margin-top: 16px;
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
