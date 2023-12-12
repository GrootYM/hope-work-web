<template>
  <div class="main">
    <div class="guideBox">这是防骗指南</div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>
<style lang="scss" scoped>
.main {
  background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  padding: 40px 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  .guideBox {
    width: 1200px;
    height: 800px;
    background-color: #ffffff;
    padding: 80px 20px;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
</style>
