<template>
  <div class="main">
    <div class="shieldBox">
      <h2 class="title">屏蔽公司</h2>
      <p>添加屏蔽公司后，你和这些公司，都不会被互相推荐，你的查看也不会告知对方</p>
      <div class="selBox">
        <el-select
          v-model="companyId"
          filterable
          remote
          placeholder="搜索公司全称、简称"
          :remote-method="remoteMethod"
          :loading="loading"
          @change="remoteChange"
        >
          <el-option v-for="(item, index) in options" :key="index" :label="item.companyName" :value="item.id">
          </el-option>
        </el-select>
        <button @click="shieldCompany">确定</button>
      </div>
      <div class="shieldCon">
        <h2>
          手动屏蔽<span>{{ shieldList.length }}</span
          >家公司
        </h2>
        <div class="shieldList">
          <div v-for="(item, index) in shieldList" :key="index">
            <p>{{ item.companyName }}</p>
            <div class="closeBox" @click="toDelete(item)">
              <img src="@/assets/image/login/close.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Job from '@/api/job'
export default {
  components: {},
  computed: {
    ...mapGetters(['userId', 'cityName']),
  },
  watch: {},
  data() {
    return {
      options: [],
      shieldList: [],
      loading: false,
      companyId: '',
    }
  },
  mounted() {
    this.queryShieldCompanyList()
  },
  methods: {
    async queryShieldCompanyList() {
      let params = {}
      let res = await Job.queryShieldCompanyList(params)
      if (res.code == 200) {
        this.shieldList = res.data
      }
    },
    async remoteMethod(query) {
      if (query) {
        this.loading = true
        let res = await Job.queryCompanyList({
          companyName: query,
          companyCode: '',
          cityCode: '',
          currentPage: 1,
          pageSize: 99999,
        })
        this.options = res.data.list
        this.loading = false
      } else {
        this.options = []
      }
    },
    remoteChange(value) {
      this.companyId = value
    },
    async shieldCompany() {
      let params = {
        companyId: this.companyId,
      }
      let res = await Job.shieldCompany(params)
      if (res.code == 200) {
        this.$message({
          type: 'success',
          message: '已屏蔽',
        })
        this.queryShieldCompanyList()
      }
    },
    async toDelete(item) {
      let params = {
        id: item.id,
      }
      let res = await Job.deleteShieldCompany(params)
      if (res.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功',
        })
        this.queryShieldCompanyList()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css');

$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
#app {
  min-width: $nx-width;
  .main {
    background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  }
  .shieldBox {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    padding: 20px 30px;
    box-sizing: border-box;
    p {
      font-size: 14px;
      color: #666;
      line-height: 2;
      text-align: left;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
    }
    .shieldCon {
      margin-bottom: 50px;
      h2 {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        span {
          color: #0470b8;
        }
      }
      .shieldList {
        margin-top: 20px;
        > div {
          width: 500px;
          height: 30px;
          padding: 0 20px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          .closeBox {
            display: none;
            img {
              width: 16px;
              height: auto;
            }
          }
        }
        > div:hover {
          background: rgba(4, 112, 184, 0.1);
          .closeBox {
            display: block;
          }
        }
      }
    }
    .selBox {
      width: 500px;
      height: 40px;
      padding: 0 5px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      border: 1px solid #eee;
      margin: 30px 0;
      button {
        cursor: pointer;
        width: 80px;
        height: 36px;
        color: #fff;
        background: #2446a8;
        border-radius: 4px;
      }
    }
  }
  .selBox /deep/ .el-select {
    width: 100%;
    height: 100%;
    padding: 0 4px;
  }
  .selBox /deep/ .el-select > .el-input {
    height: 100%;
  }
  .selBox /deep/ .el-input--suffix .el-input__inner {
    border: none;
    height: 100% !important;
    padding: 0;
    font-size: 16px;
    margin: 0;
  }
  .selBox /deep/ .el-select__input {
    margin: 0;
  }
}
</style>
