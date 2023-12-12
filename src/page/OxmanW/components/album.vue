<template>
  <div class="oxmain">
    <MainTitle
      title="编辑公司介绍"
      question="填写公司基本信息有什么用？"
      answer="丰富的公司介绍，能获得更多求职者的青睐，为份的职位带来更多查看与沟通。"
    />
    <div class="oxtop">
      <div class="busCon">
        <h2>相册列表</h2>
        <!-- <div>
          <p>自定义排序</p>
          <img src="@/assets/image/oxman/wenIcon.png" alt="" />
          <el-switch v-model="isSelf" active-color="#2446A8" inactive-color="#DCDCDC"> </el-switch>
        </div> -->
      </div>
      <div class="picBox">
        <div v-for="(item, index) in picList" :key="index">
          <img :src="item" alt="" />
          <div class="imgMask">
            <div @click="toPreview(item, index)">
              <i class="el-icon-zoom-in"></i>
            </div>
            <div @click="toDelete(item, index)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <el-upload
          class="avatar-uploader"
          action="/api-recruit/api-common/oss/file-upload"
          :data="params"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          accept="jpg, png,jpeg"
          :show-file-list="false"
        >
          <!-- <img v-if="img" :src="form.img" class="avatar" /> -->
          <div class="addBox">
            <img src="@/assets/image/oxman/add.png" alt="" />
            <h2>添加公司照片</h2>
            <p>图片大小不超过4M</p>
          </div>
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </div>
    </div>
    <div class="warnBox">
      <div>
        <!-- <p>上传注意事项</p>
        <img src="@/assets/image/oxman/wenIcon.png" alt="" /> -->
      </div>
      <button class="save" @click="updateCompanyInfo">保存</button>
    </div>
    <el-dialog :visible.sync="dialogImgVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
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
      dialogImgVisible: false,
      dialogImageUrl: '',
      params: {
        type: 2,
      },
      picList: [],
      img: '',
      isSelf: false,
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
    console.log(this.companyInfo)
    setTimeout(() => {
      this.picList = this.companyInfo.picList
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
      console.log(this.picList)
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
    toPreview(item, index) {
      this.dialogImageUrl = item
      this.dialogImgVisible = true
    },
    toDelete(item, index) {
      this.picList.splice(index, 1)
      // this.dialogImgVisible=true;
    },
    handlePreview(file, fileList) {},
    handleRemove() {},
    handleSuccess(res, file, fileList) {
      this.picList.push(res.data.url)
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
        picFileIdList: this.picList || [],
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
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
}
.oxtop {
  margin-top: 24px;
  flex: 1;
}
::v-deep .avatar-uploader {
  width: 200px;
  height: 142px;
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
.addBox {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  line-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 40px !important;
    height: 40px !important;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 14px;
    color: #666666;
  }
}
.busCon {
  margin: 20px 0 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  div {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    img {
      width: 16px;
      height: 16px;
      margin-left: 4px;
      margin-right: 12px;
    }
  }
}
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
  }
}
.picBox {
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 200px;
    height: 142px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }

    .imgMask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      display: none;
      > div {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  > div:hover {
    .imgMask {
      display: flex;
    }
  }
}
</style>
