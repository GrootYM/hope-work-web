<template>
  <div class="resume-bg">
    <div class="container">
      <el-row :gutter="16">
        <el-col :span="17">
          <Online />
        </el-col>
        <el-col :span="7">
          <RightPart />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Online from '@/page/userCenter/components/online'
import RightPart from '@/page/userCenter/components/rightPart'

export default {
  components: {
    Online,
    RightPart,
  },
}
</script>

<style lang="scss" scoped>
.resume-bg {
  background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  padding-top: 20px;

  .container {
    width: 1200px;
    margin: auto;
  }
}
</style>
