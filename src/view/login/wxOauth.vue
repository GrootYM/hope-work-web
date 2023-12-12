<template></template>

<script>
import Auth from '@/api/auth'
import CompanyAuth from '@/api/enterprise/auth'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: null,
    }
  },
  created() {
    this.loading = this.$loading({
      lock: true,
      text: '加载中……',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)',
    })
    this.oauth()
  },
  methods: {
    async oauth() {
      //调用接口获取微信登录的token
      const { code, state, userType } = this.$route.query
      const res = await Auth.wechatCallback({ code, userType: parseInt(userType) })
      if (res.code != 200) {
        this.loading.close()
        this.$message.error(res.data)
        return
      }
      const { data } = res
      this.loading.close()
      if (data.userExists == 1) {
        // 用户已注册
        sessionStorage.setItem('userInfo', JSON.stringify(data))
        this.$store.dispatch('setToken', data.token)
        this.$store.dispatch('setUserId', data.userId)
        if (data.userType == 2) {
          this.$store.dispatch('setUserMobile', data.mobile)
          this.companyUser(data)
          return
        }
        this.getUserInfo(data.userId, data)
      } else {
        // 新用户需要绑定手机号码
        this.$store.dispatch('setUserInfo', data)
        this.$router.push({ path: '/login/wxBindMobile', query: { openId: data.openId, userType: data.userType } })
      }
    },
    async companyUser(info) {
      if (!info.companyId) {
        // 新企业端用户跳至企业审核页面
        this.$router.push({ path: '/login/companyUserCheck' })
      } else {
        let res = await CompanyAuth.getCompanyUserInfo({ mobile: info.mobile })
        this.$store.dispatch('setUserInfo', res.data)
        if (res.data.companyStatus != 2) {
          // 审核中的企业端用户跳至企业审核页面，显示审核中
          this.$router.push({ path: '/login/companyUserCheck' })
        } else {
          // 审核通过的企业端用户跳至企业端首页
          this.$router.replace({ path: '/oxHome' })
        }
      }
    },
    async getUserInfo(userId, obj) {
      // 已注册用户微信登录，直接获取用户信息后跳转首页
      let res = await Auth.queryUserInfo({ userId })
      this.$store.dispatch('setUserInfo', res.data)
      this.$router.push({ path: '/index' })
    },
  },
}
</script>

<style></style>
