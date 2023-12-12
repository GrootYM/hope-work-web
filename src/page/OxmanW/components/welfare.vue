<template>
  <div class="oxmain">
    <MainTitle
      :step="2"
      question="填写公司福利有什么用？"
      answer="公司福利是公司基本信息之一,调研显示85%的牛人看公司时会关注公司福利信息;完善后,该类信息可作为公亮点展示在不同推荐列表,吸引求职者关注"
    />
    <div class="oxtop">
      <div class="tabBox">
        <div @click="toCheckTab(1)" :class="['tabItem', tabActive == 1 ? 'active' : '']">
          <p>公司福利</p>
        </div>
        <div @click="toCheckTab(2)" :class="['tabItem', tabActive == 2 ? 'active' : '']">
          <p>晋升制度</p>
        </div>
        <div @click="toCheckTab(3)" :class="['tabItem', tabActive == 3 ? 'active' : '']">
          <p>激励机制</p>
        </div>
        <div @click="toCheckTab(4)" :class="['tabItem', tabActive == 4 ? 'active' : '']">
          <p>能力培养</p>
        </div>
        <!-- <div @click="toCheckTab(5)" :class="['tabItem', tabActive == 5 ? 'active' : '']">
          <p>自定义</p>
        </div> -->
      </div>
      <div class="flBottom" ref="scrollview" @mousewheel="scrollChange">
        <div class="flBox" ref="bxView">
          <h2>公司福利</h2>
          <div class="flItemBox">
            <div
              :class="['flItem', benefitsArr.indexOf(item.id) > -1 ? 'active' : '']"
              @click="chooseWelfare1(item)"
              v-for="(item, index) in welfareArr1"
              :key="index"
            >
              <img class="choseIcon" src="@/assets/image/oxman/chose-icon.png" alt="" />
              <img :src="item.icon" alt="" />
              <div>
                <h2>{{ item.name }}</h2>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flBox" ref="xzView">
          <h2>晋升制度</h2>
          <div class="flItemBox">
            <div
              :class="['flItem', promotionArr.indexOf(item.id) > -1 ? 'active' : '']"
              @click="chooseWelfare2(item)"
              v-for="(item, index) in welfareArr2"
              :key="index"
            >
              <img class="choseIcon" src="@/assets/image/oxman/chose-icon.png" alt="" />
              <img :src="item.icon" alt="" />
              <div>
                <h2>{{ item.name }}</h2>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flBox" ref="djView">
          <h2>激励机制</h2>
          <div class="flItemBox">
            <div
              :class="['flItem', incentiveArr.indexOf(item.id) > -1 ? 'active' : '']"
              @click="chooseWelfare3(item)"
              v-for="(item, index) in welfareArr3"
              :key="index"
            >
              <img class="choseIcon" src="@/assets/image/oxman/chose-icon.png" alt="" />
              <img :src="item.icon" alt="" />
              <div>
                <h2>{{ item.name }}</h2>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flBox" ref="shView">
          <h2>能力培养</h2>
          <div class="flItemBox">
            <div
              :class="['flItem', abilityDevelopArr.indexOf(item.id) > -1 ? 'active' : '']"
              @click="chooseWelfare4(item)"
              v-for="(item, index) in welfareArr4"
              :key="index"
            >
              <img class="choseIcon" src="@/assets/image/oxman/chose-icon.png" alt="" />
              <img :src="item.icon" alt="" />
              <div>
                <h2>{{ item.name }}</h2>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="flBox" ref="zdyView">
          <h2>自定义</h2>
          <div class="flItemBox" @click="addWelfare">
            <div class="flItem">
              <div>
                <img src="@/assets/image/oxman/add.png" alt="" />
              </div>
              <div>
                <h2>添加福利</h2>
                <p>如：五险一金，定期体检等</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="warnBox">
      <div>
        <!-- <p>上传注意事项</p>
        <img src="@/assets/image/oxman/wenIcon.png" alt="" /> -->
      </div>
      <button class="pre" @click="toPre">上一步</button>
      <button class="save" @click="updateCompanyInfo">保存</button>
    </div>

    <el-dialog :visible.sync="showAdd" :show-close="false" :close-on-click-modal="false">
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
        <div class="title">
          <h2>添加新福利</h2>
          <img src="@/assets/image/login/close.png" class="close-btn" @click="closeDialog" />
        </div>
        <div class="conBox">
          <div class="busIntro">
            <div :class="['leftBox', icon ? 'noBack' : '']" @click="toShowIcon">
              <img v-if="icon" class="icon" :src="icon" alt="" />
              <img v-if="!icon" class="add" src="@/assets/image/oxman/add.png" alt="" />
              <div class="iconBox" v-if="isShowIcon">
                <div>
                  <h2>更换图标</h2>
                  <div class="iconCon">
                    <div class="iconItem" @click="chooseIcon(item)" v-for="(item, index) in iconArr" :key="index">
                      <img :src="item.icon" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="rightBox">
              <div>
                <el-input type="text" placeholder="请输入福利名称" v-model="name" maxlength="10" show-word-limit>
                </el-input>
              </div>
              <div>
                <el-input type="text" placeholder="请输入福利详情" v-model="desc" maxlength="40" show-word-limit>
                </el-input>
              </div>
            </div>
          </div>
          <div class="btnBox">
            <button class="save" @click="toSureAdd">确定</button>
          </div>
        </div>
      </div>
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
    welfare: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      showAdd: false,
      tabActive: 1,
      iconArr: [
        {
          icon: require('@/assets/image/oxman/bc.png'),
        },
        {
          icon: require('@/assets/image/oxman/ylbx.png'),
        },
        {
          icon: require('@/assets/image/oxman/cb.png'),
        },
        {
          icon: require('@/assets/image/oxman/dxnj.png'),
        },
        {
          icon: require('@/assets/image/oxman/dqtj.png'),
        },
        {
          icon: require('@/assets/image/oxman/gpqq.png'),
        },
        {
          icon: require('@/assets/image/oxman/jbbz.png'),
        },
        {
          icon: require('@/assets/image/oxman/jtbz.png'),
        },
        {
          icon: require('@/assets/image/oxman/jrfl.png'),
        },
        {
          icon: require('@/assets/image/oxman/lsxwc.png'),
        },
      ],
      isShowIcon: false,
      icon: '',
      name: '',
      desc: '',
      addArr: [],
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
      welfareArr1: [
        {
          id: '1',
          name: '五险',
          desc: '缴纳养老保险、医疗保险、失业保险工伤保险和生育保险',
          icon: require('@/assets/image/oxman/dxnj.png'),
        },
        {
          id: '2',
          name: '五险一金',
          desc: '缴纳养老保险、医疗保险、失业保险工伤保险、生育保险和住房公积金',
          icon: require('@/assets/image/oxman/wxyj.png'),
        },
        {
          id: '3',
          name: '定期体检',
          desc: '阶段性职业健康检查',
          icon: require('@/assets/image/oxman/dqtj.png'),
        },
        {
          id: '4',
          name: '节日福利',
          desc: '法定或者特定节日时提供礼物',
          icon: require('@/assets/image/oxman/jrfl.png'),
        },
        {
          id: '5',
          name: '免费下午茶',
          desc: '为员工提供零食、饮料、水果作为下午茶',
          icon: require('@/assets/image/oxman/lsxwc.png'),
        },
        {
          id: '6',
          name: '定期培训',
          desc: '定期组织技能培训',
          icon: require('@/assets/image/oxman/dxjtc.png'),
        },
      ],
      welfareArr2: [
        {
          id: '1',
          name: '考核晋升',
          desc: '考察核实提升',
          icon: require('@/assets/image/oxman/ywx.png'),
        },
        {
          id: '2',
          name: '定期晋升',
          desc: '公司每年根据公司的营业情况，有某时间进行统一晋升',
          icon: require('@/assets/image/oxman/gpqq.png'),
        },
        {
          id: '3',
          name: '完善的晋升机制',
          desc: '公司有针对各种情况相对完整得晋升机制',
          icon: require('@/assets/image/oxman/ylbx.png'),
        },
      ],
      welfareArr3: [
        {
          id: '1',
          name: '定期普调',
          desc: '定期普遍调整工资',
          icon: require('@/assets/image/oxman/dqtj.png'),
        },
        {
          id: '2',
          name: '定期绩效调薪',
          desc: '定期根据绩效调整工资',
          icon: require('@/assets/image/oxman/jjrjbf.png'),
        },
        {
          id: '3',
          name: '晋级涨薪',
          desc: '晋级会有相对应得涨薪',
          icon: require('@/assets/image/oxman/jxjj.png'),
        },
        {
          id: '4',
          name: '项目奖金',
          desc: '完成项目会有相对应得奖金',
          icon: require('@/assets/image/oxman/qynj.png'),
        },
        {
          id: '5',
          name: '团队奖金',
          desc: '团队一起努力获得的奖金',
          icon: require('@/assets/image/oxman/fdjjrsx.png'),
        },
        {
          id: '6',
          name: '个人奖金',
          desc: '个人突出贡献获得的奖金',
          icon: require('@/assets/image/oxman/glj.png'),
        },
        {
          id: '7',
          name: '绩效提成',
          desc: '绩效+提成',
          icon: require('@/assets/image/oxman/nzj.png'),
        },
        {
          id: '8',
          name: '股票期权',
          desc: '对优秀员工提供股票期权',
          icon: require('@/assets/image/oxman/gpqq.png'),
        },
        {
          id: '9',
          name: '人才补贴',
          desc: '引进人才给予的补帖',
          icon: require('@/assets/image/oxman/tjjc.png'),
        },
      ],
      welfareArr4: [
        {
          id: '1',
          name: '老员工带新',
          desc: '老员工带新员工熟悉工作环境',
          icon: require('@/assets/image/oxman/bc.png'),
        },
        {
          id: '2',
          name: '导师一对一',
          desc: '一个导师对一个学生的教导',
          icon: require('@/assets/image/oxman/txbt.png'),
        },
        {
          id: '3',
          name: '岗前带薪培训',
          desc: '参加实训的过程中,公司给予一定的薪酬',
          icon: require('@/assets/image/oxman/srfl.png'),
        },
        {
          id: '4',
          name: '内部定期培训',
          desc: '公司定期组织技能培训',
          icon: require('@/assets/image/oxman/bz.png'),
        },
        {
          id: '5',
          name: '专业技能培训',
          desc: '公司根据员工技能专业进行针对性培训',
          icon: require('@/assets/image/oxman/ykt.png'),
        },
        {
          id: '6',
          name: '内部课程资源',
          desc: '公司内部有技能相关的免费课程资源',
          icon: require('@/assets/image/oxman/ybbz.png'),
        },
        {
          id: '7',
          name: '大牛带队',
          desc: '公司有业界大牛带队',
          icon: require('@/assets/image/oxman/wxw.png'),
        },
        {
          id: '8',
          name: '人脉积累',
          desc: '公司人力资源还可以',
          icon: require('@/assets/image/oxman/ygly.png'),
        },
        {
          id: '9',
          name: '国内外进修',
          desc: '公司针对优秀人才组织国内外进修',
          icon: require('@/assets/image/oxman/jtbz.png'),
        },
        {
          id: '10',
          name: '校招培养',
          desc: '公司针对校招员工进行技能培训',
          icon: require('@/assets/image/oxman/mfbc.png'),
        },
      ],
      benefitsArr: [],
      promotionArr: [],
      incentiveArr: [],
      abilityDevelopArr: [],
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
      this.benefitsArr = this.companyInfo.benefits.split(',') || []
      this.promotionArr = this.companyInfo.promotion.split(',') || []
      this.incentiveArr = this.companyInfo.incentive.split(',') || []
      this.abilityDevelopArr = this.companyInfo.abilityDevelop.split(',') || []
      console.log(this.benefitsArr, this.promotionArr, this.incentiveArr, this.abilityDevelopArr)
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
    toPre() {
      this.$emit('toPre', 1)
    },
    closeDialog() {
      this.showAdd = false
    },
    toCheckTab(type) {
      if (this.tabActive == type) {
        return
      }
      this.tabActive = type
      let arr = ['bxView', 'xzView', 'djView', 'shView', 'zdyView']
      this.$refs.scrollview.scrollTop = this.$refs[arr[type - 1]].offsetTop - 50
    },
    scrollChange(e) {
      // console.log(e)
      let viewHeight = this.$refs.scrollview.clientHeight
      let scrollTop = this.$refs.scrollview.scrollTop
      let bx = this.$refs.bxView.offsetTop
      let xz = this.$refs.xzView.offsetTop
      let dj = this.$refs.djView.offsetTop
      let sh = this.$refs.shView.offsetTop
      // let zdy = this.$refs.zdyView.offsetTop
      // console.log(viewHeight, scrollTop, bx, xz, dj, sh, zdy)
      if (bx - scrollTop >= 0 && bx - scrollTop <= viewHeight) {
        this.tabActive = 1
      } else if (xz - scrollTop >= 0 && xz - scrollTop <= viewHeight) {
        this.tabActive = 2
      } else if (dj - scrollTop >= 0 && dj - scrollTop <= viewHeight) {
        this.tabActive = 3
      } else if (sh - scrollTop >= 0 && sh - scrollTop <= viewHeight) {
        this.tabActive = 4
      }
      // else if (zdy - scrollTop >= 0 && zdy - scrollTop <= viewHeight) {
      //   this.tabActive = 5
      // }
    },
    addWelfare() {
      this.showAdd = true
    },
    toShowIcon() {
      this.isShowIcon = !this.isShowIcon
    },
    chooseIcon(item) {
      this.icon = item.icon
    },
    toSureAdd() {
      if (!this.icon) {
        this.$message.error('未选择图标')
        return
      }
      if (!this.name) {
        this.$message.error('未填写福利名称')
        return
      }
      if (this.name.length < 2 || this.name.length > 6) {
        this.$message.error('福利名称限2-6个字符')
        return
      }
      if (!this.desc) {
        this.$message.error('未填写福利详情')
        return
      }
      let obj = {
        icon: this.icon,
        name: this.name,
        desc: this.desc,
      }
      this.addArr.push(obj)
    },
    chooseWelfare1(item) {
      let index = this.benefitsArr.indexOf(item.id)
      if (index > -1) {
        this.benefitsArr.splice(index, 1)
      } else {
        this.benefitsArr.push(item.id)
      }
    },
    chooseWelfare2(item) {
      let index = this.promotionArr.indexOf(item.id)
      if (index > -1) {
        this.promotionArr.splice(index, 1)
      } else {
        this.promotionArr.push(item.id)
      }
    },
    chooseWelfare3(item) {
      let index = this.incentiveArr.indexOf(item.id)
      if (index > -1) {
        this.incentiveArr.splice(index, 1)
      } else {
        this.incentiveArr.push(item.id)
      }
    },
    chooseWelfare4(item) {
      let index = this.abilityDevelopArr.indexOf(item.id)
      if (index > -1) {
        this.abilityDevelopArr.splice(index, 1)
      } else {
        this.abilityDevelopArr.push(item.id)
      }
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
        openTime: this.welfare.openTime || '',
        closeTime: this.welfare.closeTime || '',
        holsType: this.welfare.holsTypeArr.join(','),
        benefits: this.benefitsArr.join(','),
        promotion: this.promotionArr.join(','),
        incentive: this.incentiveArr.join(','),
        abilityDevelop: this.abilityDevelopArr.join(','),
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
        startTime: this.companyInfo.startTime || '',
        endTime: this.companyInfo.endTime || '',
        longitude: this.companyInfo.longitude || '',
        latitude: this.companyInfo.latitude || '',
        businessStatus: this.businessStatus || '',
        picFileIdList: this.companyInfo.picFileIdList || [],
        registerAddress: this.companyInfo.registerAddress || '',
        formerName: this.companyInfo.formerName || '',
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
  overflow-y: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .tabBox {
    border-bottom: 1px solid #d5dff0;
    padding: 0;
    height: 40px;
    .tabItem {
      font-size: 14px;
    }
    .tabItem::after {
      width: 100%;
      bottom: 0;
      left: 0;
      margin-left: 0;
    }
  }
  .flBottom {
    flex: 1;
    overflow-y: auto;
  }
  .flBottom::-webkit-scrollbar {
    display: none;
  }
}
.oxtop::-webkit-scrollbar {
  display: none;
}
.flBox {
  margin-top: 30px;
  > h2 {
    text-align: left;
  }
  .flItemBox {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .flItem {
      width: 316px;
      height: 90px;
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #e6e8eb;
      padding: 14px 12px;
      box-sizing: border-box;
      text-align: left;
      margin-bottom: 8px;
      margin-right: 10px;
      cursor: pointer;
      position: relative;
      .choseIcon {
        width: 16px;
        height: 16px;
        position: absolute;
        margin: 0;
        right: 0;
        bottom: 0;
        display: none;
      }
      img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
        margin-left: 10px;
      }
      h2 {
        color: #171d26;
        font-size: 13px;
        line-height: 18px;
        margin-bottom: 4px;
      }
      p {
        font-size: 13px;
        color: #8d97a6;
        line-height: 20px;
      }
    }
    .flItem:nth-child(2n) {
      margin-right: 0px;
    }
    .flItem.active {
      background: rgba(36, 70, 168, 0.1);
      border: 1px solid #2446a8;
      .choseIcon {
        display: block;
      }
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
  .pre {
    background: #fff;
    border: 1px solid #2446a8;
    color: #2446a8;
  }
}

::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
::v-deep .el-dialog {
  width: 520px;
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
    padding: 24px 24px 34px 24px;
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
    .busIntro {
      display: flex;
      align-items: center;
      .leftBox {
        width: 70px;
        height: 70px;
        background: #f8f8f8;
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: relative;
        cursor: pointer;
        .icon {
          width: 40px;
          height: 40px;
        }
        .add {
          width: 20px;
          height: 20px;
        }
        .iconBox {
          width: 300px;
          // background: #fff;
          position: absolute;
          left: 90px;
          top: -30px;
          border: 1px solid #e7e9ee;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          z-index: 100;
          text-align: left;
          h2 {
            margin-left: 10px;
            color: #333;
          }
          > div {
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            background: #fff;
            position: relative;
            z-index: 1000;
          }
          .iconCon {
            display: flex;
            flex-wrap: wrap;
            .iconItem {
              width: 30px;
              height: 30px;
              margin: 10px 8px 0;
              cursor: pointer;
            }
          }
        }
        .iconBox::before {
          background: #fff;
          box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.09);
          content: '';
          height: 12px;
          position: absolute;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          width: 12px;
          left: -6px;
          top: 50%;
          margin-top: -6px;
          z-index: -1;
        }
      }
      .noBack {
        background: none;
      }
      .rightBox {
        width: 100%;
        > div:first-child {
          width: 220px;
          margin-bottom: 16px;
        }
        > div:last-child {
          width: 100%;
        }
      }
    }
    .btnBox {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      button {
        width: 100px;
        height: 40px;
        background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
        border-radius: 4px 4px 4px 4px;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}
</style>
