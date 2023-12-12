<template>
  <div id="app">
    <div class="main">
      <div class="F_main">
        <div class="mainBox">
          <div class="leftLayout">
            <div class="leftLayout_a">
              <h2>账号与安全中心</h2>
              <div
                class="LayoutTitle"
                v-for="(item, index) in tabList"
                :key="index"
                @click="changeView(index)"
                :class="{ bginner: isActive == index }"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="rightInfo">
            <keep-alive>
              <component :is="currentView"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import component from '../../plugin/lin-cms-ui/component/component.vue'
import perHome from './perHome.vue'
import account from './account.vue'
import pInfo from './pInfo.vue'
import loginDeviceManagement from './loginDeviceManagement.vue'
export default {
  components: { component, perHome, account, pInfo, loginDeviceManagement },
  data() {
    return {
      isActive: 0,
      index: 0,
      arr: ['perHome', 'account', 'pInfo', 'loginDeviceManagement'],
      tabList: [{ name: '首页' }, { name: '账号管理' }, { name: '个人信息管理' }, { name: '登录设备管理' }],
    }
  },
  computed: {
    currentView() {
      return this.arr[this.index]
    },
  },
  methods: {
    changeView(index) {
      this.index = index
      this.isActive = index
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
    background: url('~@/assets/image/returnee/bg@2x.png');
    div {
      // border: 1px solid red;
    }
    .F_main {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .mainBox {
        width: 1184px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 20px;
        .leftLayout {
          width: 240px;
          height: 551px;
          background: #ffffff;
          padding: 2px;
          box-sizing: border-box;
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          .leftLayout_a {
            width: 236px;
            height: 547px;
            h2 {
              width: 168px;
              height: 34px;
              font-size: 24px;
              font-family: PingFang SC-Medium, PingFang SC;
              font-weight: 500;
              color: #3d3d3d;
              line-height: 34px;
              background: url('~@/assets/image/accountCenter/bg32@2x.png');
              border-radius: 2px 2px 2px 2px;
              -webkit-background-clip: text;
              margin-top: 32px;
              margin-left: 30px;
              margin-bottom: 31px;
            }
            .LayoutTitle {
              width: 236px;
              height: 56px;
              font-size: 16px;
              border-left: 3px solid white;
              margin-left: -2px;
              font-family: PingFang SC-Semibold, PingFang SC;
              font-weight: 600;
              color: #666666;
              line-height: 22px;
              display: flex;
              padding: 17px 30px;
              box-sizing: border-box;
            }
            .bginner {
              width: 240px;
              height: 56px;
              border-left: 3px solid #2446a8;
              background: rgba(214, 227, 251, 0.15);
              border-radius: 0px 0px 0px 0px;
              margin-left: -2px;
              font-size: 16px;
              font-family: PingFang SC-Semibold, PingFang SC;
              font-weight: 600;
              color: #2446a8;
              line-height: 22px;
              padding: 17px 30px;
              box-sizing: border-box;
            }
          }
        }
        .rightInfo {
          width: 928px;
          height: 551px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
