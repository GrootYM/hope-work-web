<template>
  <div class="modalBox" v-if="isVisility">
    <div class="modalCon">
      <img class="bj" src="@/assets/image/job/modalBj.png" alt="" />
      <div class="closeBox" v-if="showClose" @click="closeModal">
        <img src="@/assets/image/job/closeBtn.png" alt="" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    isShow: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isVisility: false,
    }
  },
  watch: {
    isShow: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.isVisility = newVal
      },
    },
  },
  methods: {
    closeModal() {
      // this.isVisility = false;
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped lang="scss">
.modalBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .modalCon {
    width: 1000px;
    height: 632px;
    border-radius: 2px 2px 2px 2px;
    position: relative;
    .closeBox {
      position: absolute;
      top: 24px;
      right: 20px;
      cursor: pointer;
      z-index: 99999;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
