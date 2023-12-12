<template>
  <div class="oxmain">
    <MainTitle
      title="公司基本信息"
      question="填写公司基本信息有什么用？"
      answer="丰富的公司介绍，能获得更多求职者的青睐，为份的职位带来更多查看与沟通。"
    />
    <div class="oxtop">
      <el-form :model="companyInfo" label-width="100px">
        <el-form-item label="公司Logo：">
          <el-upload
            class="avatar-uploader"
            action="/api-recruit/api-common/oss/file-upload"
            :limit="1"
            :data="params"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            accept="jpg, png,jpeg"
            :show-file-list="false"
          >
            <img v-if="companyInfo.headUrl" :src="companyInfo.headUrl" class="avatar" />
            <div v-else class="addBox">
              <img src="@/assets/image/oxman/add.png" alt="" />
              <p>上传logo</p>
            </div>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="公司简称：">
          <el-input v-model="companyInfo.shortName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="公司全称：">
          <el-input v-model="companyInfo.companyName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所在行业：">
          <el-select v-model="industry.industryMxId" placeholder="请选择" @change="hyChange">
            <el-option
              :label="item.industryName"
              :value="item.id"
              v-for="(item, index) in recommendArr"
              :key="index"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="companyInfo.companyType" placeholder="请输入"></el-input> -->
        </el-form-item>
        <el-form-item label="融资阶段：">
          <el-select v-model="finance" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in rzArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员规模：">
          <el-select v-model="companyScale" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in gmArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="warnBox">
      <div>
        <!-- <p>上传注意事项</p>
        <img src="@/assets/image/oxman/wenIcon.png" alt="" /> -->
      </div>
      <button class="save" @click="updateCompanyInfo">保存</button>
    </div>
  </div>
</template>

<script>
import MainTitle from '@/page/OxmanW/components/mainTitle'
import Job from '@/api/job'
import Auth from '@/api/auth'
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
      params: {
        type: 2,
      },
      // form: {},
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
      industry: {},
      recommendArr: [],
      finance: '',
      companyScale: '',
      companyType: '',
      businessStatus: '',
    }
  },
  mounted() {
    this.queryHotIndustryType()
    console.log(this.companyInfo)
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
      if (!this.companyInfo.companyIndustryList || this.companyInfo.companyIndustryList.length == 0) {
        this.industry = {}
      } else {
        let item = this.companyInfo.companyIndustryList[0]
        let obj = {
          industryMxId: item.industryMxId - 0,
          industryName: item.industryName,
        }
        this.industry = obj.industryMxId ? obj : {}
      }
      // console.log(this.industry)
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
    handlePreview() {},
    handleRemove() {},
    handleSuccess(res, file, fileList) {
      this.companyInfo.headUrl = res.data.url
      console.log(this.companyInfo)
      // const params = {
      //   userId: this.userId,
      //   fileId: res.data.fileId,
      // }
      // const _this = this
      // Auth.userDetailEdit(params).then(res => {
      //   _this.getResumeList()
      // })
    },
    async queryHotIndustryType() {
      let params = {}
      let res = await Job.queryHotIndustryType(params)
      if (res.code == 200) {
        this.recommendArr = res.data
      }
    },
    hyChange(val) {
      this.recommendArr.forEach(item => {
        if (item.id == val) {
          let industry = {
            industryMxId: item.id,
            industryName: item.industryName,
          }
          this.industry = { ...industry }
        }
      })
    },
    async updateCompanyInfo() {
      // this.$confirm('修改信息会导致公司进入审核状态，请谨慎处理！', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(async () => {
      let industryList = []
      industryList.push(this.industry)
      let params = {
        id: this.companyInfo.id,
        headUrl: this.companyInfo.headUrl,
        shortName: this.companyInfo.shortName,
        companyName: this.companyInfo.companyName,
        industryList: industryList,
        finance: this.finance || '',
        // finance: '1',
        companyScale: this.companyScale || '',
        // companyScale: '1',
        mainBusiness: this.companyInfo.mainBusiness || '',
        companyCode: this.companyInfo.companyCode || '',
        companyType: this.companyType || '',
        // companyType:'1',
        cityCode: this.companyInfo.cityCode || '',
        limitRecruit: this.companyInfo.limitRecruit || null,
        registeredCapital: this.companyInfo.registeredCapital || 0,
        establishTime: this.companyInfo.establishTime || '',
        legalUser: this.companyInfo.legalUser || '',
        address: this.companyInfo.address || '',
        introduce: this.companyInfo.introduce || '',
        holsType: this.companyInfo.holsType || '',
        startTime: this.companyInfo.startTime || '',
        endTime: this.companyInfo.endTime || '',
        benefits: this.companyInfo.benefits || '',
        longitude: this.companyInfo.longitude || '',
        latitude: this.companyInfo.latitude || '',
        businessStatus: this.businessStatus || '',
        // businessStatus:'1',
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
      console.log(11111111111, res)
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
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
}
.oxtop {
  margin-top: 24px;
  flex: 1;
}
::v-deep .avatar-uploader {
  width: 120px;
  height: 120px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dcdcdc;
}
::v-deep .el-upload {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-form-item__label {
  color: #666666;
}
::v-deep .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .el-form-item__content {
  display: flex;
  justify-content: flex-start;
}
::v-deep .el-input {
  width: 420px;
}
::v-deep .el-select {
  width: 420px;
}
.addBox {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }
}
//   .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 178px;
//     height: 178px;
//     line-height: 178px;
//     text-align: center;
//   }
//   .avatar {
//     width: 178px;
//     height: 178px;
//     display: block;
//   }

.warnBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
  background: #fff;
  border-top: 1px solid #d5dff0;
  padding: 0 24px;
  box-sizing: border-box;
  flex-shrink: 0;
  div {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    img {
      width: 16px;
      height: 16px;
    }
  }
  button {
    width: 100px;
    height: 40px;
    background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
    border-radius: 4px 4px 4px 4px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
