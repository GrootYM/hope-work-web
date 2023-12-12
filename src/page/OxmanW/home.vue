<template>
  <div class="oxMain">
    <img class="bj" src="@/assets/image/oxman/bj.png" alt="" />
    <LeftLay :title="oxTitle" />
    <div class="mainCon">
      <Header :title="oxTitle" message="1" />
      <div class="routerBox" ref="scrollHomeApp">
        <keep-alive exclude="communicate">
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import CompanyAuth from '@/api/enterprise/auth'
import Header from '@/component/OxmanW/Header'
import LeftLay from '@/component/OxmanW/LeftLay'

export default {
  components: {
    Header,
    LeftLay,
  },
  computed: {
    ...mapGetters(['userId', 'oxTitle', 'userMobile']),
  },
  data() {
    return {}
  },
  mounted() {
    if (!this.userId) {
      this.$router.push({ path: '/login/login' })
      return
    }
    this.$bus.$on('EVENT_HOME_SCROLL', data => {
      console.log('EVENT_HOME_SCROLL', data)
      this.$refs.scrollHomeApp.scrollTop = data
      // console.log(this.$refs.scrollApp.scrollTop)
    })
    // if (!this.oxTitle) {
    //   this.$store.dispatch('setOxTitle', '职位管理')
    // }
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      let res = await CompanyAuth.getCompanyUserInfo({ mobile: this.userMobile })
      this.$store.dispatch('setUserInfo', res.data)
    },
  },
}
</script>

<style lang="scss" scoped>
.oxMain {
  width: 100vw;
  height: 100vh;
  display: flex;
  .mainCon {
    flex: 1;
    display: flex;
    flex-direction: column;
    .routerBox {
      flex: 1;
      overflow-y: auto;
    }
    .routerBox::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
