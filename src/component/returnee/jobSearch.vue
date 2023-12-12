<template>
  <div class="jobSearchBox">
    <div class="searchJobBox">
      <div class="selBox" @click="toChooseLocation">
        <p>{{ location }}</p>
        <div class="selIcon">
          <img src="@/assets/image/job/selIcon.png" alt="" />
        </div>
      </div>
      <div class="searchBox">
        <img src="@/assets/image/job/searchIcon.png" alt="" />
        <input type="text" v-model="str" placeholder="搜索职位/公司/关键词" />
      </div>
      <button @click="toSearch">搜索</button>
    </div>
    <JobModal :isShow="isShow" @closeModal="isShow = false">
      <div class="mConBox">
        <h2>请选择城市</h2>
        <div class="tabBox">
          <div :class="['tabItem', tabActive == 1 ? 'active' : '']" @click="switchTab(1)">
            <p>热门城市</p>
          </div>
          <!-- <div :class="['tabItem', tabActive == 2 ? 'active' : '']" @click="switchTab(2)">
            <p>ABCDE</p>
          </div>
          <div :class="['tabItem', tabActive == 3 ? 'active' : '']" @click="switchTab(3)">
            <p>FGHJ</p>
          </div> -->
        </div>
        <div class="tabCon" v-if="tabActive == 1">
          <div class="conItem" v-for="(item, index) in hotCity" :key="index" @click="sureLocation(item)">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </JobModal>
  </div>
</template>

<script>
import JobModal from '@/component/returnee/modal'
import Job from '@/api/auth'
export default {
  name: 'JobSearch',
  components: {
    JobModal,
  },
  props: {
    location: String,
    searchStr: String,
    hotCity: Array,
  },
  watch: {
    searchStr: {
      handler(newVal, olaVal) {
        this.str = newVal
      },
    },
    str: {
      handler(newVal, olaVal) {
        this.$emit('changeV', newVal)
      },
    },
  },
  data() {
    return {
      isShow: false,
      tabActive: 1,
      searchKeyword: '', // 搜索时输入的关键字
      str: '',
      conArr: [],
    }
  },
  created() {},
  methods: {
    toJob() {
      this.$router.push({ path: '/index/job', query: { keyWords: this.searchKeyword } })
    },
    toSearch() {
      this.$emit('search')
    },
    toClear() {
      this.searchKeyword = ''
    },
    toChooseLocation() {
      this.isShow = !this.isShow
    },
    switchTab(type) {
      this.tabActive = type
    },
    sureLocation(item) {
      this.isShow = !this.isShow
      this.$emit('change', item.name)
    },
  },
}
</script>

<style scoped lang="scss">
.jobSearchBox {
  width: 100%;
}
.searchJobBox {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid rgba(36, 70, 168, 0.3);
  font-size: 16px;
  .selBox {
    width: 124px;
    height: 100%;
    position: relative;
    padding: 0 16px 0 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .selIcon img {
      width: 12px;
      height: 12px;
    }
  }
  .selBox::after {
    content: '';
    width: 1px;
    height: 22px;
    background: #bec4d4;
    display: block;
    position: absolute;
    top: 13px;
    right: 0;
  }
  .searchBox {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 16px;
    box-sizing: border-box;
    img {
      width: 12px;
      height: 12px;
    }
    input {
      flex: 1;
      height: 100%;
      padding-left: 6px;
    }
    .clear {
      width: 20px;
      height: 20px;
      font-size: 15px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      background: rgba(0, 0, 0, 0.1);
      color: #999;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  button {
    width: 122px;
    height: 44px;
    background: #2446a8;
    border-radius: 2px;
    color: #ffffff;
    font-size: 18px;
    margin-right: 1px;
  }
}
.mConBox {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
  h2 {
    font-size: 16px;
    font-weight: 400;
    color: #222222;
    line-height: 22px;
    text-align: left;
    padding-left: 24px;
  }
  .tabBox {
    background: none;
  }
  .tabCon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .conItem {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
</style>
