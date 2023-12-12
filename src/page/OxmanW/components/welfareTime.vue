<template>
  <div class="oxmain">
    <MainTitle
      question="分享工作时间有什么用？"
      answer="工作时间是公司基本信息之一，调研显示85%的牛人看公司时会关注工作时同及休假安排，建议进行完善。*标准时何仅为求职者提供参考，不代表公司下所有职位工作时间。"
    />
    <div class="oxtop">
      <div class="wItem">
        <div class="wLabel">
          <span>*</span>
          <h2>工作时间：</h2>
        </div>
        <div class="wCon">
          <el-time-select
            v-model="companyInfo.startTime"
            prefix-icon="el-icon-arrow-down"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '24:00',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
          <p class="line"></p>
          <el-time-select
            v-model="companyInfo.endTime"
            prefix-icon="el-icon-arrow-down"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '24:00',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </div>
      </div>
      <div class="wItem">
        <div class="wLabel">
          <h2>加班情况：</h2>
        </div>
        <div class="wCon">
          <div
            @click="chooseJX(item)"
            :class="['conTab', holsType2 == item.id ? 'active' : '']"
            v-for="(item, index) in jbArr"
            :key="index"
          >
            <p>{{ item.name }}</p>
          </div>
          <!-- <div class="conTab">
            <p>偶尔加班</p>
          </div>
          <div class="conTab">
            <p>弹性工作</p>
          </div> -->
        </div>
      </div>
      <div class="wItem">
        <div class="wLabel">
          <h2>休息时间：</h2>
        </div>
        <div class="wCon">
          <div
            @click="chooseJX(item)"
            :class="['conTab', holsType1 == item.id ? 'active' : '']"
            v-for="(item, index) in xxArr"
            :key="index"
          >
            <p>{{ item.name }}</p>
          </div>
          <!-- <div class="conTab">
            <p>单休</p>
          </div>
          <div class="conTab">
            <p>单双轮休</p>
          </div>
          <div class="conTab">
            <p>弹性工作</p>
          </div> -->
        </div>
      </div>
      <div class="btnBox" @click="toNext">
        <button>下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from '@/page/OxmanW/components/mainTitle'

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
      // time1: '',
      // time2: '',
      jbArr: [
        {
          name: '不加班',
          id: '5',
        },
        {
          name: '偶尔加班',
          id: '6',
        },
        {
          name: '弹性工作',
          id: '7',
        },
      ],
      xxArr: [
        {
          name: '双休',
          id: '1',
        },
        {
          name: '单休',
          id: '2',
        },
        {
          name: '单双休',
          id: '3',
        },
        {
          name: '弹性工作',
          id: '4',
        },
      ],
      holsType1: '', //休息时间
      holsType2: '', //加班情况
      holsTypeArr: [],
    }
  },
  mounted() {
    setTimeout(() => {
      this.holsTypeArr = this.companyInfo.holsType.split(',') || []
      this.holsTypeArr.forEach(item => {
        if (item <= 4) {
          this.holsType1 = item
        } else {
          this.holsType2 = item
        }
      })
    }, 500)
  },
  methods: {
    toNext() {
      this.$emit('toNext', 2)
      let holsTypeArr = []
      holsTypeArr.push(this.holsType1, this.holsType2)
      let obj = {
        startTime: this.companyInfo.startTime,
        endTime: this.companyInfo.endTime,
        holsTypeArr: holsTypeArr,
      }
      this.$emit('setWelfare', obj)
    },
    chooseJX(item) {
      // let index = this.holsTypeArr.indexOf(item.id)
      if (item.id <= 4) {
        this.holsType1 = item.id
      } else {
        this.holsType2 = item.id
      }
    },
    // chooseXx(item){

    // },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
.wItem {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .wLabel {
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    position: relative;
    margin-right: 16px;
    span {
      font-size: 14px;
      color: #ff3525;
      line-height: 20px;
      position: absolute;
      left: -14px;
      top: 50%;
      margin-top: -10px;
    }
  }
  .wCon {
    display: flex;
    align-items: center;
    .line {
      width: 12px;
      height: 1px;
      background: #d8d8d8;
      margin: 0 16px;
    }
    .conTab {
      width: 84px;
      height: 39px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #dadde2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
      color: #333333;
      margin-right: 16px;
    }
    .conTab.active {
      background: rgba(36, 70, 168, 0.08);
      border: 1px solid #2446a8;
      color: #2446a8;
    }
  }
}
.btnBox {
  display: flex;
  box-sizing: border-box;
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
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 168px;
  height: 40px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dadde2;
}

::v-deep .el-input--prefix .el-input__inner {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  border: none;
  ::after {
    content: '';
  }
}
::v-deep .el-input__prefix {
  // display: none;
  // position: absolute;
  left: 130px;
}
</style>
