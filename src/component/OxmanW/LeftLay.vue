<template>
  <div class="box">
    <div class="logoBox">
<!--      <img src="https://hope-service.oss-cn-beijing.aliyuncs.com/images/logo-2024-2.jpg" alt />-->
      <img src="@/assets/image/oxman/logo.png" alt />
    </div>
    <div class="mainTab" :key="timeKey">
      <div
        @click="qieTab(item)"
        :class="['mainTabItem', title == item.name ? 'active' : '']"
        v-for="(item, index) in oxTabArr"
        :key="index"
      >
        <img class="icon" :src="item.icon" alt />
        <img class="iconed" :src="item.iconed" alt />
        <p :class="{ unreadP: item.name == '沟通' }">
          {{ item.name }}
          <span
            class="unreadSpan"
            v-show="$route.name != 'communicate' && item.name == '沟通' && unreadSum && unreadSum > 0"
            >{{ unreadSum }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import webIMmixin from '@/lin/mixin/webIMmixin'
export default {
  mixins: [webIMmixin],
  props: {
    title: String,
  },
  data() {
    return {
      flag: true,
      oxTabArr: [
        {
          name: '职位管理',
          icon: require('@/assets/image/oxman/zwgl.png'),
          iconed: require('@/assets/image/oxman/zwgled.png'),
          router: '/oxHome/jobManagement',
        },
        {
          name: '沟通',
          icon: require('@/assets/image/oxman/gt.png'),
          iconed: require('@/assets/image/oxman/gted.png'),
          router: '/oxHome/communicate',
        },
        {
          name: '推荐人才',
          icon: require('@/assets/image/oxman/tjnr.png'),
          iconed: require('@/assets/image/oxman/tjnred.png'),
          router: '/oxHome/recOxman',
        },
        {
          name: '搜索人才',
          icon: require('@/assets/image/oxman/ssnr.png'),
          iconed: require('@/assets/image/oxman/ssnred.png'),
          router: '/oxHome/searchOxman',
        },
        {
          name: '人才管理',
          icon: require('@/assets/image/oxman/nrgl.png'),
          iconed: require('@/assets/image/oxman/nrgled.png'),
          router: '/oxHome/OxmanManagement',
        },
        {
          name: '公司主页',
          icon: require('@/assets/image/oxman/gszy.png'),
          iconed: require('@/assets/image/oxman/gszyed.png'),
          router: '/oxHome/companyHome',
        },
        {
          name: '设置打招呼语',
          icon: require('@/assets/image/oxman/gszy.png'),
          iconed: require('@/assets/image/oxman/gszyed.png'),
          router: '/oxHome/settingPage',
        },
      ],
    }
  },
  mounted() {
    // console.log(this.$route.path);
    let path = this.$route.path
    this.oxTabArr.forEach(item => {
      if (path == item.router) {
        this.$store.dispatch('setOxTitle', item.name)
      }
    })
  },
  methods: {
    qieTab(item) {
      if (item.name != '沟通') {
        sessionStorage.removeItem('perInfo')
      }
      let info = JSON.parse(sessionStorage.getItem('userInfo'))
      if (!info.username) {
        this.getImUnReadCount()
      } else {
        Object.assign(info, {
          unreadSum: this.unreadSum,
        })
        sessionStorage.setItem('userInfo', JSON.stringify(info))
      }
      this.$store.dispatch('setOxTitle', item.name)
      this.$router.push({
        path: item.router,
        query: {
          update: 1,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 240px;
  height: 100%;
  background: #202329;
  .logoBox {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    img {
      width: 138px;
      height: 40px;
    }
  }
  .mainTab {
    padding: 0 8px;
    margin-top: 32px;
    cursor: pointer;
    .mainTabItem {
      width: 224px;
      height: 48px;
      border-radius: 4px 4px 4px 4px;
      display: flex;
      // justify-content: center;
      align-items: center;
      p {
        font-size: 16px;
        color: #797b7f;
        // color: #ffffff;
        // opacity: 0.5;
        &.unreadP {
          position: relative;
          .unreadSpan {
            color: #fff;
            font-size: 10px;
            display: inline-block;
            position: absolute;
            right: -18px;
            top: -6px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            text-align: center;
            line-height: 16px;
            background: red;
          }
        }
      }
      img {
        width: 16px;
        height: auto;
        margin-left: 54px;
        margin-right: 18px;
      }
      .iconed {
        display: none;
      }
    }
    .mainTabItem.active {
      background: rgba(255, 255, 255, 0.1);
      p {
        // opacity: 1;
        color: #fff;
      }
      .icon {
        display: none;
      }
      .iconed {
        display: block;
      }
    }
  }
}
</style>
