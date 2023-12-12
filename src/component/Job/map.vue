<template>
  <div class="amap-wrapper">
    <!-- <el-amap
            ref="map"
            :vid="'amapDemo'"
            :center="position"
            :zoom="zoom"
            class="amap-demo"
            style="height: 500px;width: 800px">
           <el-amap-marker :position="position">
           </el-amap-marker>
        </el-amap> -->
    <el-amap
      ref="map"
      :vid="'amapDemo'"
      :center="position"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
      style="height: 500px; width: 800px"
    >
      <!-- <el-amap-marker v-for="(u,i) in markers" :position="u.position" :key="i">
           </el-amap-marker> -->
      <el-amap-marker :position="position"> </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
    position: Array,
  },
  data() {
    return {
      center: [121.5273285, 31.21515044],
      zoom: 12,
      // position: [121.5273285, 31.21515044],
      // icon: require('../../assets/icon/pika.jpg'),//自定义地图标记点图片
      events: {
        init(o) {
          console.log(o.getCenter())
        },
        zoomchange: e => {
          console.log(e)
        },
        zoomend: e => {
          //获取当前缩放zoom值
          console.log(this.$refs.map.$$getInstance().getZoom())
          console.log(e)
        },
        click: e => {
          // alert('map clicked')
        },
      },
      markers: [
        {
          position: [121.5273285, 31.21515044],
        },
        {
          position: [121.5174286, 31.21515044],
        },
      ],
      //使用其他组件
      plugin: [
        {
          pName: 'Scale',
          events: {
            init(instance) {
              console.log(instance)
            },
          },
        },
        {
          pName: 'ToolBar',
          events: {
            init(instance) {
              console.log(instance)
            },
          },
        },
      ],
    }
  },
  created() {
    console.log(this.position, this.center)
  },
  methods: {},
}
</script>

<style scoped lang="scss"></style>
