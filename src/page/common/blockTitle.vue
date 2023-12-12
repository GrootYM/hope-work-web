<template>
  <div class="block-title">
    <img src="@/assets/image/home/block-title-icon-left.png" />
    <div class="title-text">{{ title }}</div>
    <img src="@/assets/image/home/block-title-icon-right.png" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.block-title {
  display: flex;
  justify-content: center;
  align-items: center;

  .title-text {
    margin: 0 24px;
    font-size: 32px;
    font-weight: 600;
    color: #333333;
  }

  img {
    width: 108px;
    height: 12px;
  }
}
</style>
