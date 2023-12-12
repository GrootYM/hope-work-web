<template>
  <div class="">
    <div class="oxTitle" v-if="!title">
      <div :class="['oxt', step == 1 ? 'active' : '']">
        <p>1</p>
        <h2>工作时间</h2>
      </div>
      <div class="lineJ"></div>
      <div :class="['oxt', step == 2 ? 'active' : '']">
        <p>2</p>
        <h2>公司福利</h2>
        <span>11/20</span>
      </div>
    </div>
    <div class="oxTitle" v-if="title">
      <div class="oxt active">
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div class="shareBox">
      <h2>{{ question }}</h2>
      <p>{{ answer }}</p>
    </div>
    <div class="dashedLine"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    step: {
      type: Number,
      default: 1,
    },
    title: String,
    question: {
      type: String,
      default: '分享工作时间有什么用？',
    },
    answer: {
      type: String,
      default:
        '工作时间是公司基本信息之一，调研显示85%的牛人看公司时会关注工作时同及休假安排，建议进行完善。*标准时何仅为求职者提供参考，不代表公司下所有职位工作时间。',
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.oxmain {
  width: 100%;
}
.shareBox {
  width: 745px;
  // height: 103px;
  background: #f8f8f8;
  border-radius: 2px 2px 2px 2px;
  padding: 16px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 16px;
  text-align: left;
  margin-top: 10px;
  h2 {
    color: #333333;
    font-weight: 600;
  }
  p {
    color: #999999;
    margin-top: 8px;
  }
}

.oxTitle {
  display: flex;
  align-items: center;
  .oxt {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    color: #999999;
    line-height: 34px;
    p {
      width: 20px;
      height: 20px;
      background: #eeeeee;
      border-radius: 50%;
      font-size: 14px;
      color: #999999;
      line-height: 20px;
      text-align: center;
      font-weight: 500;
      margin-right: 10px;
    }
  }
  .oxt.active {
    color: #3d3d3d;
    p {
      background: #2446a8;
      color: #fff;
    }
  }
}
.lineJ {
  width: 114px;
  height: 0px;
  border-top: 1px dashed #d8d8d8;
  margin: 0 16px;
  position: relative;
}
.lineJ::after {
  content: '>';
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  font-size: 12px;
  line-height: 20px;
  margin-top: -10px;
  color: #d8d8d8;
}
</style>
