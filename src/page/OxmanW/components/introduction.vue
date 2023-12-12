<template>
  <div class="oxmain">
    <div class="oxtop">
      <MainTitle
        title="编辑公司介绍"
        question="填写公司介绍有什么用？"
        answer="公司介绍是公司基本信息之一，详细公司介绍帮助牛人全面认识公司、了解公司，降低沟通成本，有效吸引牛人。* 你可以根据优质范例，使用内容模版高效填写哦"
      />
      <!-- <div class="busCon">
        <h2>一句话介绍<span>（非必填）</span></h2>
        <div class="busIntro">
          <el-input
            v-model="companyInfo.formerName"
            type="textarea"
            placeholder="一句话介绍公司，请输入20字以内的文字"
            maxlength="20"
            show-word-limit
          ></el-input>
        </div>
      </div> -->
      <div class="busCon">
        <h2>公司介绍</h2>
        <div class="busIntro">
          <el-input
            type="textarea"
            v-model="companyInfo.introduce"
            placeholder="详细介绍公司"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>法定代表人</h2>
        <div class="busIntro">
          <el-input type="text" v-model="companyInfo.legalUser" placeholder="法定代表人"></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>经营状态</h2>
        <div class="busIntro">
          <el-select v-model="businessStatus" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in jyArr" :key="index"></el-option>
          </el-select>
        </div>
      </div>
      <div class="busCon">
        <h2>注册资金(万)</h2>
        <div class="busIntro">
          <el-input type="text" v-model="companyInfo.registeredCapital" placeholder="注册资金"></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>注册地址</h2>
        <div class="busIntro">
          <el-input type="text" v-model="companyInfo.registerAddress" placeholder="注册地址"></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>所属地区</h2>
        <div class="busIntro">
          <el-input type="text" v-model="companyInfo.cityName" placeholder="所属地区"></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>曾用名</h2>
        <div class="busIntro">
          <el-input type="text" v-model="companyInfo.formerName" placeholder="曾用名"></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>登记机关</h2>
        <div class="busIntro">
          <el-input type="text" v-model="companyInfo.registerOrgan" placeholder="登记机关"></el-input>
        </div>
      </div>
      <div class="busCon">
        <h2>企业类型</h2>
        <div class="busIntro">
          <el-select v-model="companyType" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in lxArr" :key="index"></el-option>
          </el-select>
        </div>
      </div>
      <div class="busCon">
        <h2>成立日期</h2>
        <div class="busIntro">
          <el-date-picker format="yyyy-MM-dd" v-model="companyInfo.establishTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="busCon">
        <h2>营业期限</h2>
        <div class="busIntro">
          <el-date-picker format="yyyy-MM-dd" v-model="companyInfo.closeTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="busCon">
        <h2>核准日期</h2>
        <div class="busIntro">
          <el-date-picker format="yyyy-MM-dd" v-model="companyInfo.approveTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <!-- <div class="busTab">
        <div class="tabBox">
          <div @click="toCheckTab(index)" :class="['tabItem', tabActive == 1 ? 'active' : '']">
            <p>优质范例</p>
          </div>
          <div @click="toCheckTab(index)" :class="['tabItem', tabActive == 2 ? 'active' : '']">
            <p>内容模板</p>
          </div>
        </div>
        <div class="showMore">
          <p>展开更多</p>
          <img src="@/assets/image/oxman/bottomB.png" alt="" />
        </div>
      </div>
      <div class="busCon">
        <h2>发展历程<span>（非必填）</span></h2>
        <div class="busIntro">
          <el-input type="textarea" placeholder="发展时间线，记录重要大事记" maxlength="800" show-word-limit></el-input>
        </div>
      </div>
      <div class="busTab">
        <div class="tabBox">
          <div @click="toCheckTab(index)" :class="['tabItem', tabActive == 1 ? 'active' : '']">
            <p>优质范例</p>
          </div>
        </div>
        <div class="showMore">
          <p>展开更多</p>
          <img src="@/assets/image/oxman/bottomB.png" alt="" />
        </div>
      </div>
      <div class="busCon">
        <h2>获得荣誉<span>（非必填）</span></h2>
        <div class="busIntro">
          <el-input type="textarea" placeholder="奖项、荣誉、专利、作品" maxlength="500" show-word-limit></el-input>
        </div>
      </div>
      <div class="busTab">
        <div class="tabBox">
          <div @click="toCheckTab(index)" :class="['tabItem', tabActive == 1 ? 'active' : '']">
            <p>优质范例</p>
          </div>
        </div>
        <div class="showMore">
          <p>展开更多</p>
          <img src="@/assets/image/oxman/bottomB.png" alt="" />
        </div>
      </div>
      <div class="busCon">
        <h2>企业文化<span>（非必填）</span></h2>
        <div class="busIntro">
          <el-input
            type="textarea"
            placeholder="企业使命、愿景、战略、经营宗旨"
            maxlength="500"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="busTab">
        <div class="tabBox">
          <div @click="toCheckTab(index)" :class="['tabItem', tabActive == 1 ? 'active' : '']">
            <p>优质范例</p>
          </div>
        </div>
        <div class="showMore">
          <p>展开更多</p>
          <img src="@/assets/image/oxman/bottomB.png" alt="" />
        </div>
      </div>-->
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
      tabActive: 1,
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
          id: '1',
        },
        {
          name: '股份有限公司',
          id: '2',
        },
        {
          name: '个人独资企业',
          id: '3',
        },
        {
          name: '合资企业',
          id: '4',
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
        cityName: this.companyInfo.cityName || '',
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
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
}
.oxtop {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
}
.oxtop::-webkit-scrollbar {
  display: none;
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
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 12px;
  input {
    height: 100%;
    flex: 1;
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
  }
}

::v-deep .el-textarea__inner {
  //height: 86px;
  height: 200px;
  //height: calc(100vh - 500px);
}
::v-deep .el-select,
::v-deep .el-date-editor {
  width: 100%;
}
.busTab {
  width: 100%;
  height: 40px;
  background: #f8f8f8;
  border: 1px solid #dadde2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  margin-top: 12px;
  padding: 0 32px;
  box-sizing: border-box;
  .tabBox {
    background: none;
    height: 100%;
    padding: 0;
    .tabItem {
      font-size: 14px;
      line-height: 20px;
    }
    .tabItem.active {
      color: #666666;
    }
    .tabItem.active::after {
      width: 24px;
      height: 2px;
      bottom: 0;
    }
  }
  .showMore {
    display: flex;
    align-items: center;
    img {
      width: 12px;
      height: 12px;
      margin-left: 4px;
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
    cursor: pointer;
  }
}
</style>
