<template>
  <div>
    <div class="login-bg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  metaInfo() {
    console.log("!456");
    console.log(this.$route);
    return {
      meta: [{ name: "viewport", content: this.$route.meta.keywords }],
    };
  },
};
</script>

<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  min-height: 100vh;
  background-image: url(~@/assets/image/login/login-bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
