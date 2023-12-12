<template>
  <div>
    <Header :isnow="1" :info="userInfo" />
    <router-view></router-view>
    <ScrollTop />
    <Footer />
    <div class="map-hidden">
      <el-amap
        ref="map"
        :vid="'hiddenMap'"
        class="amap-demo"
        style="height: 500px; width: 800px"
        :plugin="plugin"
        :events="events"
      ></el-amap>
    </div>
  </div>
</template>

<script>
import ScrollTop from '@/component/index/scrollTop.vue'
import Header from '@/component/index/Header.vue'
import Footer from '@/component/index/footerNew.vue'
import Auth from '@/api/auth'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    ScrollTop,
    Footer,
  },
  data() {
    let self = this
    return {
      center: [121.5273285, 31.21515044],
      events: {
        init(o) {},
      },
      plugin: [
        {
          pName: 'CitySearch',
          events: {
            init(instance) {
              instance.getLocalCity((status, result) => {
                console.log(status, result)
                if (status === 'complete' && result.info === 'OK') {
                  self.showCity(result)
                }
              })
            },
          },
        },
      ],
      userInfo: {},
    }
  },
  computed: {
    ...mapGetters(['userId', 'cityName', 'provinceObj']),
  },
  methods: {
    async getUserInfo() {
      if (!this.userId) {
        return
      }
      let res = await Auth.queryUserInfo({ userId: this.userId })
      if (sessionStorage.getItem('userInfo')) {
        let info = JSON.parse(sessionStorage.getItem('userInfo'))
        Object.assign(info, { ...res.data })
        sessionStorage.setItem('userInfo', JSON.stringify(info))
      }
      this.userInfo = res.data
      this.$store.dispatch('setUserInfo', res.data)
    },
    showCity(result) {
      if (!this.cityName) {
        this.$store.commit('SET_NOW_CITY', result.city)
      }
      if (!this.provinceObj && this.provinceObj === {}) {
        this.$store.commit('SET_NOW_PROVINCE', { province: result.province, zipcode: result.adcode })
      }
    },
  },
  created() {
    this.getUserInfo()
  },
}
</script>

<style lang="scss" scoped>
.map-hidden {
  display: none;
}
</style>
