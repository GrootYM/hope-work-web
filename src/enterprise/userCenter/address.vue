<template>
  <div class="main">
    <div class="address-config">
      <el-button class="goBack" @click="goBack">返回</el-button>
      <div class="header">公司名称</div>
      <div class="add-btn" @click="openAddDialog">添加地址</div>
      <div class="table-area">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="地址" prop="fullAddress"> </el-table-column>
          <el-table-column label="区域" prop="areaName">
            <template slot-scope="scope"> {{ scope.row.cityName }}-{{ scope.row.areaName }} </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="updateItem(scope.row)">编辑</el-button>
              <el-button type="text" @click="delItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="visible" :show-close="false" :close-on-click-modal="false">
      <div slot="title" class="dialog-header">
        <div class="title-text">{{ title }}</div>
        <img src="@/assets/image/login/close.png" class="close-btn" @click="onClose" />
      </div>
      <div class="sub-title">请填写真实地址，若查实造假，账号将被冻结。</div>
      <div class="form">
        <el-form :model="info" :rules="rules" ref="addressForm" label-position="left" label-width="90px">
          <el-form-item label="工作省份" prop="provinceName">
            <el-select
              v-model="nowProvince.id"
              style="width: 100%"
              ref="provinceSelect"
              placeholder="选择工作省份"
              @change="onProvinceChange"
              clearable
            >
              <el-option v-for="(city, index) in provinceArr" :key="city.id" :label="city.name" :value="city.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作城市" prop="cityName">
            <el-select
              v-model="info.cityId"
              style="width: 100%"
              ref="citySelect"
              placeholder="选择工作城市"
              @change="onCityChange"
              clearable
            >
              <el-option v-for="(city, index) in cityList" :key="city.id" :label="city.name" :value="city.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作地区" prop="areaName">
            <el-select v-model="info.areaId" style="width: 100%" ref="citySelect2" placeholder="选择工作地区" clearable>
              <el-option v-for="(area, index) in areaList" :key="area.id" :label="area.name" :value="area.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作地点" prop="workAddress">
            <el-input v-model="info.workAddress" style="width: 100%" clearable placeholder="请填写工作地点"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="fullAddress">
            <el-input v-model="info.fullAddress" style="width: 100%" clearable placeholder="请填写详细地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="confirm-btn" @click="save">保存</div>
    </el-dialog>
    <!-- <div class="weChat">
      <img class="gouTong" src="@/assets/image/oxman/Coxman/liaotian111.png" alt="" />
      <div class="chatNumber"><p>26</p></div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CompanyAuth from '@/api/enterprise/auth'
import Auth from '@/api/auth'
import Job from '@/api/job'

const newInfo = {
  companyId: null,
  cityName: null,
  cityId: null,
  areaName: null,
  areaId: null,
  workAddress: null,
  fullAddress: null,
}

export default {
  data() {
    return {
      list: [{}],
      visible: false,
      title: '',
      info: {},
      rules: {
        // provinceName: [{ required: true, message: '请选择省份', trigger: 'blur' }],
        cityName: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        areaName: [{ required: true, message: '请选择地区', trigger: 'blur' }],
        workAddress: [{ required: true, message: '请输入工作地点', trigger: 'blur' }],
        fullAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
      },
      cityList: [],
      areaList: [],
      isAdd: false,
      provinceArr: [],
      nowProvince: {},
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    //返回上一页
    goBack() {
      this.routerGo(-1)
    },
    async queryCityList() {
      let params = {
        regionLevel: 1,
        id: '',
      }
      let res = await Job.queryCityList(params)
      if (res.code == 200) {
        this.provinceArr = res.data
      }
    },
    async queryCityList1() {
      let params = {
        regionLevel: 2,
        id: this.nowProvince.id,
      }
      let res = await Job.queryCityList(params)
      if (res.code == 200) {
        let cityList = res.data
        cityList.forEach(item => {
          if (item.name == '市辖区') {
            item.name = this.nowProvince.name
          }
        })
        this.cityList = cityList
      }
    },
    onProvinceChange(val) {
      this.provinceArr.forEach(item => {
        if (val == item.id) {
          this.nowProvince = item
          this.queryCityList1()
        }
      })
    },
    onCityChange(value) {
      this.info.areaId = ''
      this.info.areaName = ''
      this.getAreaOptions(value)
    },
    async getCityOptions() {
      let res = await Auth.queryHotCityList({})
      this.cityList = res.data
    },
    async getAreaOptions(id) {
      let regionLevel = 3
      if ([1, 19, 896, 2661].indexOf(id) > -1) {
        regionLevel = 2
      }
      let res = await Job.queryCityList({ id, regionLevel })
      this.areaList = res.data
      this.visible = true
    },
    async getList() {
      let res = await CompanyAuth.queryAddrList({ companyId: this.userInfo.companyId })
      this.list = res.data.list
    },
    openAddDialog() {
      this.title = '添加公司地址'
      this.info = Object.assign({}, newInfo)
      this.visible = true
      this.isAdd = true
    },
    onClose() {
      this.visible = false
      this.info = {}
      this.isAdd = false
      this.title = ''
      this.$refs.addressForm.clearValidate()
    },
    updateItem(info) {
      this.title = '编辑公司地址'
      this.isAdd = false
      this.info = Object.assign({}, info)
      this.getAreaOptions(info.cityId)
    },
    save() {
      if (this.$refs.citySelect && this.$refs.citySelect.selected) {
        this.info.cityName = this.$refs.citySelect.selected.label
      }
      if (this.$refs.citySelect2 && this.$refs.citySelect2.selected) {
        this.info.areaName = this.$refs.citySelect2.selected.label
      }
      this.cityList.forEach(c => {
        if (c.id === this.info.cityId) {
          this.info.cityCode = c.zipcode
        }
      })
      this.areaList.forEach(a => {
        if (a.id === this.info.areaId) {
          this.info.areaCode = a.zipcode
        }
      })
      this.info.companyId = this.userInfo.companyId
      const _this = this
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          if (_this.isAdd) {
            _this.addAddr()
          } else {
            _this.updateAddr()
          }
        }
      })
    },
    async addAddr() {
      let res = await CompanyAuth.insertAddr(this.info)
      if (res.code == 200) {
        this.$message.success('添加成功')
        this.getList()
        setTimeout(() => {
          this.onClose()
        }, 500)
      }
    },
    async updateAddr() {
      let res = await CompanyAuth.editAddr(this.info)
      if (res.code == 200) {
        this.$message.success('编辑成功')
        this.getList()
        setTimeout(() => {
          this.onClose()
        }, 500)
      }
    },
    delItem(info) {
      const _this = this
      this.$confirm('确认删除该地址？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(res => {
        if (res == 'confirm') {
          CompanyAuth.delAddr({ id: info.id, companyId: _this.userInfo.companyId }).then(res => {
            if (res.code == 200) {
              _this.$message.success('删除成功')
              _this.getList()
            }
          })
        }
      })
    },
  },
  created() {
    this.getList()
    // this.getCityOptions()
    this.queryCityList()
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 1.85vh 12.5vw 2.87vh;

  .address-config {
    height: calc(95.28vh - 80px);
    background-color: #ffffff;
    border-radius: 4px;
    background-image: url(~@/assets/image/recruitUser/addr-header.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    box-sizing: border-box;
    position: relative;

    .goBack {
      position: absolute;
      top: 0;
      left: -72px;
    }

    .header {
      padding: 40px 3.33vw 17px;
      font-size: 32px;
      font-weight: 500;
      color: #3d3d3d;
      text-align: left;
    }
    .add-btn {
      width: 104px;
      height: 40px;
      line-height: 40px;
      background: #2446a8;
      border-radius: 4px;
      margin: 0 0 15px 3.33vw;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }

    .table-area {
      padding: 0 3.33vw 15px;
    }
  }
}

::v-deep .el-table .el-table__header-wrapper tr {
  background: #f8f8f8;
}

::v-deep .el-table th.el-table__cell {
  background: #f8f8f8;
}

::v-deep thead tr {
  height: 40px;
}

::v-deep .el-table thead tr th .cell {
  font-weight: 600;
  font-size: 14px;
  color: #333333;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-text {
    font-size: 16px;
    font-weight: 400;
    color: #222222;
  }

  .close-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.sub-title {
  text-align: left;
  color: #999999;
  margin-bottom: 12px;
}

.confirm-btn {
  cursor: pointer;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 20px auto 0;
}

::v-deep .el-dialog__header {
  padding: 24px 24px 32px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 500px !important;
  height: 600px !important;
  background-image: url(~@/assets/image/login/avatar-bg.png) !important;
  background-size: 100% 100%;
}

::v-deep .el-dialog__body {
  padding: 0 24px 0;
}

.weChat {
  position: fixed;
  right: 47px;
  bottom: 98px;
  cursor: pointer;

  .gouTong {
    width: 40px;
    height: 40px;
  }

  .chatNumber {
    width: 22px;
    height: 16px;
    background: #ff3525;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -8px;
    top: -8px;

    p {
      width: 13px;
      height: 14px;
      font-size: 10px;
      color: #ffffff;
    }
  }
}
</style>
