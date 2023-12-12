<template>
  <div class="oxmain">
    <MainTitle
      title="编辑公司主营业务"
      question="填写公司主营业务有什么用？"
      answer="添加主营业务，方便求职者快速了解公司；平台也将根据你所填写的业务，更好的为您推荐符合要求的牛人；公司未来将出现在相应业务榜单下，增加公司曝光度。"
    />
    <div class="busCon">
      <h2>主营业务<span>（非必填）</span></h2>
      <div class="busIntro">
        <input type="text" v-model="companyInfo.mainBusiness" placeholder="一句话介绍公司，请输入20字以内的文字" />
        <!-- <p @click="toAdd">添加主营业务</p> -->
      </div>
      <div class="btnBox">
        <button class="save" @click="updateCompanyInfo">保存</button>
      </div>
    </div>

    <!-- <el-dialog :visible.sync="showAdd" :show-close="false" :close-on-click-modal="false">
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
        <div class="title">
          <h2>添加主营业务<span>（最多选择10个）</span></h2>
          <img src="@/assets/image/login/close.png" class="close-btn" @click="closeDialog" />
        </div>
        <div class="conBox">
          <div class="busIntro">
            <input type="text" placeholder="业务名称控制住10个字以内" />
          </div>
          <div class="btnBox">
            <button class="cancel">取消</button>
            <button class="save">确定</button>
          </div>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import MainTitle from '@/page/OxmanW/components/mainTitle'
import Oxman from '@/api/oxman'

export default {
  components: {
    MainTitle,
  },
  props: {
    companyInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      showAdd: false,
      rzArr: [
        {
          name: '未融资',
          id: 1,
        },
        {
          name: '天使轮',
          id: 2,
        },
        {
          name: 'A轮',
          id: 3,
        },
        {
          name: 'B轮',
          id: 4,
        },
        {
          name: 'C轮',
          id: 5,
        },
        {
          name: 'D轮及以上',
          id: 6,
        },
        {
          name: '已上市',
          id: 7,
        },
        {
          name: '不需要融资',
          id: 8,
        },
      ],
      gmArr: [
        {
          name: '0-20人',
          id: 1,
        },
        {
          name: '20-99人',
          id: 2,
        },
        {
          name: '100-499人',
          id: 3,
        },
        {
          name: '500-999人',
          id: 4,
        },
        {
          name: '1000-9999人',
          id: 5,
        },
        {
          name: '10000+',
          id: 6,
        },
      ],
      lxArr: [
        {
          name: '有限责任公司',
          id: 1,
        },
        {
          name: '股份有限公司',
          id: 2,
        },
        {
          name: '个人独资企业',
          id: 3,
        },
        {
          name: '合资企业',
          id: 4,
        },
      ],
      jyArr: [
        {
          name: '在营',
          id: 1,
        },
        {
          name: '停业',
          id: 2,
        },
        {
          name: '吊销',
          id: 3,
        },
        {
          name: '注销',
          id: 4,
        },
      ],
      finance: '',
      companyScale: '',
      companyType: '',
      businessStatus: '',
    }
  },
  mounted() {
    setTimeout(() => {
      this.finance =
        this.returnIndex(this.companyInfo.finance, this.rzArr) > -1
          ? this.rzArr[this.returnIndex(this.companyInfo.finance, this.rzArr)].id
          : ''
      this.companyScale =
        this.returnIndex(this.companyInfo.companyScale, this.gmArr) > -1
          ? this.gmArr[this.returnIndex(this.companyInfo.companyScale, this.gmArr)].id
          : ''
      this.companyType =
        this.returnIndex(this.companyInfo.companyType, this.lxArr) > -1
          ? this.lxArr[this.returnIndex(this.companyInfo.companyType, this.lxArr)].id
          : ''
      this.businessStatus =
        this.returnIndex(this.companyInfo.businessStatus, this.jyArr) > -1
          ? this.jyArr[this.returnIndex(this.companyInfo.businessStatus, this.jyArr)].id
          : ''
    }, 500)
  },
  methods: {
    returnIndex(val, arr) {
      let index = -1
      arr.forEach((item, i) => {
        if (item.name == val) {
          index = i
        }
      })
      return index
    },
    closeDialog() {
      this.showAdd = false
    },
    toAdd() {
      this.showAdd = true
    },
    async updateCompanyInfo() {
      // this.$confirm('修改信息会导致公司进入审核状态，请谨慎处理！', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(async () => {
      let params = {
        id: this.companyInfo.id,
        introduce: this.companyInfo.introduce || '',
        headUrl: this.companyInfo.headUrl,
        shortName: this.companyInfo.shortName,
        companyName: this.companyInfo.companyName,
        industryList: this.companyInfo.companyIndustryList,
        finance: this.finance || '',
        companyScale: this.companyScale || '',
        mainBusiness: this.companyInfo.mainBusiness || '',
        companyCode: this.companyInfo.companyCode || '',
        companyType: this.companyType || '',
        cityCode: this.companyInfo.cityCode || '',
        limitRecruit: this.companyInfo.limitRecruit || null,
        registeredCapital: this.companyInfo.registeredCapital || 0,
        establishTime: this.companyInfo.establishTime || '',
        legalUser: this.companyInfo.legalUser || '',
        address: this.companyInfo.address || '',
        holsType: this.companyInfo.holsType || '',
        startTime: this.companyInfo.startTime || '',
        endTime: this.companyInfo.endTime || '',
        benefits: this.companyInfo.benefits || '',
        longitude: this.companyInfo.longitude || '',
        latitude: this.companyInfo.latitude || '',
        businessStatus: this.businessStatus || '',
        promotion: this.companyInfo.promotion || '',
        incentive: this.companyInfo.incentive || '',
        abilityDevelop: this.companyInfo.abilityDevelop || '',
        picFileIdList: this.companyInfo.picFileIdList || [],
        registerAddress: this.companyInfo.registerAddress || '',
        formerName: this.companyInfo.formerName || '',
        openTime: this.companyInfo.openTime || '',
        closeTime: this.companyInfo.closeTime || '',
        approveTime: this.companyInfo.approveTime || '',
        registerOrgan: this.companyInfo.registerOrgan || '',
      }
      let res = await Oxman.updateCompanyInfo(params)
      if (res.code == 200) {
        this.$message.success('保存成功')
        this.$emit('getCompany')
      }
      // })
      // .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.oxmain {
  width: 100%;
  height: 100%;
  padding: 30px 24px;
  box-sizing: border-box;
}
.busCon {
  margin-top: 20px;
  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    display: flex;
    align-items: flex-end;
    span {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
  }
}
.busIntro {
  width: 100%;
  height: 40px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dadde2;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 12px;
  input {
    height: 100%;
    flex: 1;
  }
  p {
    color: #2446a8;
    cursor: pointer;
  }
}
.btnBox {
  display: flex;
  margin-top: 12px;
  .save {
    width: 100px;
    height: 40px;
    background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
    border-radius: 4px 4px 4px 4px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
  }
}
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
::v-deep .el-dialog {
  width: 422px;
}
.dialog-content {
  position: relative;
  width: 100%;
  // height: 250px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  padding-bottom: 24px;
  .title {
    position: relative;
    padding: 24px 24px 54px 24px;
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #222222;
      display: flex;
      align-items: flex-end;
      span {
        font-size: 14px;
        color: #999999;
      }
    }
    .close-btn {
      position: absolute;
      top: 24px;
      right: 22px;
    }
  }
  .conBox {
    padding: 0 24px;
    .btnBox {
      justify-content: flex-end;
      margin-top: 48px;
      .cancel {
        width: 100px;
        height: 40px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #dadde2;
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        margin-right: 16px;
      }
    }
  }
}
</style>
