<template>
  <div>
    <div id="wx-qrcode"></div>
  </div>
</template>

<script>
import wxLoginMixin from '@/lin/mixin/wxLogin'

export default {
  mixins: [wxLoginMixin],
}
</script>

<style lang="scss" scoped>
#wx-qrcode {
}
</style>
