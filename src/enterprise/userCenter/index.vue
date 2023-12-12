<template>
  <div class="user-main">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('setOxTitle', '个人中心')
  },
}
</script>

<style lang="scss" scoped>
.user-main {
  height: 100%;
  overflow-y: auto;
}
</style>
