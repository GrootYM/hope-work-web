<template>
  <div class="main">
    <div class="formBox" v-loading="loading">
      <el-button class="goBack" @click="goBack()">返回</el-button>
      <div class="jobInfo">
        <div class="allNum">
          <div class="num1">1</div>
          <div class="num2">2</div>
        </div>

        <div class="infoRight">
          <h3>职位基本信息</h3>
          <p>职位发布成功后，招聘类型、职位名称、职位类型，将无法更改</p>
          <div class="companyBox">
            <el-form ref="addJob" :model="form" label-width="110px" label-position="right" :rules="rules">
              <el-form-item label="公司:">
                <label slot="label">公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司:</label>
                <p class="gsName">{{ companyName }}</p>
              </el-form-item>
              <el-form-item label="招聘类型:">
                <el-select
                  v-model="form.recruitType"
                  placeholder="请选择"
                  @change="changeContent($event)"
                  style="width: 473px; height: 40px"
                >
                  <el-option v-for="item in recruitType" :key="item.id" :label="item.label" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称:">
                <el-input type="text" placeholder="请输入内容" v-model="form.positionName" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="职位描述:">
                <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="form.responsibility"></el-input>
              </el-form-item>
              <!-- <el-form-item label="任职要求:">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.skillRequire"></el-input>
              </el-form-item> -->
              <el-form-item label="职位类型:">
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="form.positionTypeName"
                  show-word-limit
                  @focus="showCard()"
                ></el-input>
              </el-form-item>
              <!-- 下面表单 -->
              <h3 class="yaoQiu">职位要求</h3>
              <p class="p4">我们将通过以下条件，为你精确推荐合适的牛人。请尽量详细填写</p>
              <el-form-item label="经验和学历:" class="formButtom">
                <div class="JyAndXl">
                  <el-form-item>
                    <el-select
                      v-model="form.experience"
                      placeholder="请选择经验"
                      @change="changeJy($event)"
                      style="width: 154px; height: 40px"
                    >
                      <el-option v-for="item in experience" :key="item.id" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select
                      v-model="form.education"
                      placeholder="请选择学历"
                      @change="changeXl($event)"
                      style="width: 154px; height: 40px"
                    >
                      <el-option v-for="item in education" :key="item.id" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item class="XinZi" label="薪资范围:">
                <div class="Xz">
                  <el-select
                    v-model="form.lowSalary"
                    placeholder="请选择底薪"
                    @change="changeXz($event)"
                    style="width: 154px; height: 40px"
                  >
                    <el-option v-for="item in XzLowArr" :key="item.id" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="form.topSalary"
                    placeholder="请选择高薪"
                    @change="changeXz($event)"
                    style="width: 154px; height: 40px"
                  >
                    <el-option v-for="item in XzTopArr" :key="item.id" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="form.yearSalary"
                    placeholder="请选择几薪"
                    @change="changeXz($event)"
                    style="width: 154px; height: 40px"
                  >
                    <el-option v-for="item in XzYearArr" :key="item.id" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item class="chengshi" label="城市选择:">
                <div class="citySel">
                  <el-select
                    v-model="province"
                    placeholder="请选择省份"
                    style="width: 154px; height: 40px"
                    @change="changeProvince"
                  >
                    <el-option v-for="item in provinceArr" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="citySel"
                    multiple
                    placeholder="请选择城市"
                    style="width: 313px"
                    @change="changeCity"
                  >
                    <el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id"> </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="工作地点:" prop="workAddress">
                <el-select
                  v-model="form.workAddress"
                  placeholder="请选择工作地点"
                  @change="changeDd($event)"
                  style="width: 473px; height: 40px"
                  @focus="estimateAddress"
                >
                  <el-option
                    v-for="item in DdArr"
                    :key="item.id"
                    :label="item.completeAddress"
                    :value="item.completeAddress"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="send" @click="saveForm('form')">新增</div>
              </el-form-item>
            </el-form>
            <p class="jieShao" v-if="email">
              简历将发送到 {{ email }}，如需更改邮箱，请在【个人中心】中修改已阅读并遵守《希望工厂职位信息发布规则》
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="bigCard" :visible.sync="showbigCard" @close="hideCard()">
      <div class="searchT">
        <h4>请选择职位类别</h4>
        <div>
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"> </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.subTypeName }}</div>
              <span class="addr">{{ item.allName }}</span>
            </template>
          </el-autocomplete>
        </div>
      </div>
      <p class="p1">平台将根据职位类型推荐人才</p>
      <div class="smallCard">
        <el-tabs v-model="activeName" tab-position="left" :before-leave="leave" @tab-click="tabTop()">
          <el-tab-pane v-for="item in jobOptions" :key="item.pid" :label="item.pname" :name="item.pname">
            <div class="cat-list" ref="catdd" id="cat-list">
              <div class="type-item" v-for="list in item.childLists" :key="list.id">
                <div class="item-list" @click="showSide(list.id)">
                  <i class="el-icon-circle-plus-outline" v-if="!list.sideVisible"></i>
                  <i class="el-icon-remove-outline" v-if="list.sideVisible"></i>
                  <p class="nameP">{{ list.typeName }}</p>
                </div>
                <div class="click-child" ref="clickdd" id="click-child" v-show="list.sideVisible">
                  <!-- <el-card class="box-card">
                    <div v-for="(child, i) in list.subChildLists" :key="i" class="text item">
                      {{ child.subTypeName }}
                    </div>
                  </el-card> -->
                  <div>
                    <a
                      href="javascript:void(0)"
                      v-for="(child, i) in list.subChildLists"
                      :key="i"
                      @click.stop.prevent="selectJob(child.subTypeName, child.subId)"
                    >
                      {{ child.subTypeName }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    <!-- 城市和地址选择不一致提示 -->
    <el-dialog title="提示" :visible.sync="showTitle" width="30%" :before-close="handleClose">
      <span>您还没有添加工作地址</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible()">去添加</el-button>
        <el-button type="primary" @click="showTitle = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="map-hidden">
      <el-amap
        ref="map"
        :vid="'hiddenMap'"
        class="amap-demo"
        style="height: 500px; width: 800px"
        :plugin="plugin"
        :events="events"
      >
      </el-amap>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import Home from '@/api/home'
import Oxman from '@/api/oxman'
import Job from '@/api/job'

import jobManagement from '@/api/jobManagement/index'
export default {
  computed: {
    ...mapGetters(['userId', 'userInfo']),
  },

  data() {
    let self = this
    return {
      loading: false,
      form: {},
      companyName: '',
      value: '',
      recruitType: [
        {
          label: '社招',
          id: 1,
        },
        {
          label: '校招',
          id: 2,
        },
        {
          label: '海归',
          id: 3,
        },
        {
          label: '兼职',
          id: 4,
        },
        {
          label: '灵活就业',
          id: 5,
        },
      ],
      experience: [
        {
          label: '不限',
          id: 0,
        },
        {
          label: '在校/应届',
          id: 1,
        },
        {
          label: '一年以内',
          id: 2,
        },
        {
          label: '1-3年',
          id: 3,
        },
        {
          label: '3-5年',
          id: 4,
        },
        {
          label: '5-10年',
          id: 5,
        },
        {
          label: '10年以上',
          id: 6,
        },
      ],
      education: [
        {
          label: '不限',
          id: 0,
        },
        {
          label: '小学',
          id: 1,
        },
        {
          label: '初中',
          id: 2,
        },
        {
          label: '高中',
          id: 3,
        },
        {
          label: '大专',
          id: 4,
        },
        {
          label: '本科',
          id: 5,
        },
        {
          label: '硕士',
          id: 6,
        },
        {
          label: '博士',
          id: 7,
        },
      ],
      XzLowArr: [
        {
          label: '1K',
          id: 1,
        },
        {
          label: '2K',
          id: 2,
        },
        {
          label: '3K',
          id: 3,
        },
        {
          label: '4K',
          id: 4,
        },
        {
          label: '5K',
          id: 5,
        },
        {
          label: '6K',
          id: 6,
        },
        {
          label: '7K',
          id: 7,
        },
        {
          label: '8K',
          id: 8,
        },
        {
          label: '9K',
          id: 9,
        },
        {
          label: '10K',
          id: 10,
        },
        {
          label: '11K',
          id: 11,
        },
        {
          label: '12K',
          id: 12,
        },
        {
          label: '13K',
          id: 13,
        },
        {
          label: '14K',
          id: 14,
        },
        {
          label: '15K',
          id: 15,
        },
        {
          label: '16K',
          id: 16,
        },
        {
          label: '17K',
          id: 17,
        },
        {
          label: '18K',
          id: 18,
        },
        {
          label: '19K',
          id: 19,
        },
        {
          label: '20K',
          id: 20,
        },
        {
          label: '21K',
          id: 21,
        },
        {
          label: '22K',
          id: 22,
        },
        {
          label: '23K',
          id: 23,
        },
        {
          label: '24K',
          id: 24,
        },
        {
          label: '25K',
          id: 25,
        },
        {
          label: '26K',
          id: 26,
        },
        {
          label: '27K',
          id: 27,
        },
        {
          label: '28K',
          id: 28,
        },
        {
          label: '29K',
          id: 29,
        },
        {
          label: '30K',
          id: 30,
        },
      ],
      XzTopArr: [
        {
          label: '1K',
          id: 1,
        },
        {
          label: '2K',
          id: 2,
        },
        {
          label: '3K',
          id: 3,
        },
        {
          label: '4K',
          id: 4,
        },
        {
          label: '5K',
          id: 5,
        },
        {
          label: '6K',
          id: 6,
        },
        {
          label: '7K',
          id: 7,
        },
        {
          label: '8K',
          id: 8,
        },
        {
          label: '9K',
          id: 9,
        },
        {
          label: '10K',
          id: 10,
        },
        {
          label: '11K',
          id: 11,
        },
        {
          label: '12K',
          id: 12,
        },
        {
          label: '13K',
          id: 13,
        },
        {
          label: '14K',
          id: 14,
        },
        {
          label: '15K',
          id: 15,
        },
        {
          label: '16K',
          id: 16,
        },
        {
          label: '17K',
          id: 17,
        },
        {
          label: '18K',
          id: 18,
        },
        {
          label: '19K',
          id: 19,
        },
        {
          label: '20K',
          id: 20,
        },
        {
          label: '21K',
          id: 21,
        },
        {
          label: '22K',
          id: 22,
        },
        {
          label: '23K',
          id: 23,
        },
        {
          label: '24K',
          id: 24,
        },
        {
          label: '25K',
          id: 25,
        },
        {
          label: '26K',
          id: 26,
        },
        {
          label: '27K',
          id: 27,
        },
        {
          label: '28K',
          id: 28,
        },
        {
          label: '29K',
          id: 29,
        },
        {
          label: '30K',
          id: 30,
        },
        {
          label: '31K',
          id: 31,
        },
        {
          label: '32K',
          id: 32,
        },
        {
          label: '33K',
          id: 33,
        },
        {
          label: '34K',
          id: 34,
        },
        {
          label: '35K',
          id: 35,
        },
      ],
      XzYearArr: [
        { label: '12', id: 1 },
        { label: '13', id: 2 },
        { label: '14', id: 3 },
        { label: '15', id: 4 },
        { label: '16', id: 5 },
      ],
      DdArr: [],
      email: '',
      radio: 0,
      showbigCard: false,
      inputValue: '',
      restaurants: [],
      jobOptions: [],
      childArr: [],
      positionTypeId: '',
      activeName: '技术',
      provinceArr: [],
      visible: false,
      province: '',
      cities: [],
      citySel: [],
      cityList: [],
      allCities: [], //全部已展示的可选择城市

      showTitle: false,

      rules: {
        workAddress: [{ required: true, message: '工作地址必须选择', trigger: 'blur' }],
      },
      searchPlugin: null,
      center: [121.5273285, 31.21515044], // 地图中心
      events: {
        init(o) {}, // 地图事件
      },
      plugin: [
        {
          pName: 'PlaceSearch',
          events: {
            init(instance) {
              // 实例化高德地图的PlaceSearch插件
              self.searchPlugin = instance
            },
          },
        },
      ],
      findex: -1,
      index: -1,
    }
  },
  activated() {
    this.queryCompanyAddrList()
  },
  created() {
    this.getPositionType()
    this.queryCompanyInfo()
    this.getQueryPersonInfo()
    this.queryCityList()
    window.addEventListener('resize', () => {
      if (this.showbigCard && this.findex != -1 && this.index != -1) {
        this.toue(this.findex, this.index)
      }
    })
  },
  mounted() {},
  watch: {},
  methods: {
    //退回职位管理
    goBack() {
      // this.$router.push({ name: 'jobManagement' })
      this.routerGo(-1)
    },
    //招聘类型筛选
    changeContent(value) {},
    // 打开职位类型模态框
    showCard() {
      this.showbigCard = true
    },
    // 关闭模态框
    hideCard() {
      this.showbigCard = false
      ;(this.findex = -1), (this.index = -1)
      console.log('我是要关闭的', this.jobOptions)
      this.jobOptions.forEach(item => {
        item.childLists.forEach((res, index) => {
          res.sideVisible = false
        })
      })
    },
    //经验筛选
    changeJy(value) {
      // this.form.Jy = value
    },
    //学历筛选
    changeXl(value) {
      // this.form.Xl = value
    },
    //薪资筛选
    changeXz(value) {
      // this.form.Xz = value
    },
    //工作地点筛选
    changeDd(value) {
      const _this = this
      this.searchPlugin.search(value, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (!result.poiList.pois.length) {
            _this.$message.error('未查询到该地址，请重新选择')
          } else {
            let lng = result.poiList.pois[0].location.lng
            let lat = result.poiList.pois[0].location.lat
            _this.form.longitude = lng
            _this.form.latitude = lat
            console.log('经纬度：')
            console.log(lng, lat)
          }
        } else {
          _this.$message.error('未查询到该地址，请重新选择')
        }
      })
    },
    //搜索职位
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.subTypeName.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    loadAll() {},
    handleSelect(item) {
      this.form.positionTypeName = item.subTypeName
      this.showbigCard = false
      this.positionTypeId = item.subId
      this.jobOptions.forEach(item => {
        item.childLists.forEach((res, index) => {
          res.sideVisible = false
        })
      })
    },
    handleIconClick(ev) {
      console.log(ev, '2222222222222')
    },
    // 展示职位选择数据
    showSide(id) {
      // console.log(this.$refs.clickdd)
      this.jobOptions.forEach((item, findex) => {
        item.childLists.forEach((res, index) => {
          if (res.id == id) {
            res.sideVisible = !res.sideVisible
            this.$nextTick(function () {
              this.toue(findex, index)
            })
          } else {
            res.sideVisible = false
            let fatherWidth = this.$refs.clickdd[index]
            fatherWidth.style.position = 'relative'
            fatherWidth.style.left = 0 + 'px'
          }
        })
      })
    },
    leave(activeName, oldActive) {
      this.jobOptions.forEach(item => {
        item.childLists.forEach((res, index) => {
          res.sideVisible = false
        })
      })
    },
    toue(findex, index) {
      this.findex = findex
      this.index = index
      let childWidth = this.$refs.catdd[findex].getBoundingClientRect().left
      let itemList = this.$refs.catdd[findex].getElementsByClassName('item-list')[index]
      let fatherWidth = this.$refs.catdd[findex].getElementsByClassName('click-child')[index]
      const react = itemList.getBoundingClientRect().left
      console.log(findex, index, childWidth, react)
      fatherWidth.style.position = 'relative'
      // let i = index % 3
      // fatherWidth.style.left = -35 - 200 * i + 'px'
      fatherWidth.style.left = childWidth - react + 36 + 'px'
      // console.log(childWidth, react, fatherWidth.style.left, this.$refs.catdd[index])
    },
    //切换tab置顶
    tabTop() {
      let catLi = document.querySelectorAll('.bigCard')
      catLi[0].scrollTop = 0
    },
    // 隐藏职位选择
    // closeVisible() {
    //   console.log('我是一个小测试', this.jobOptions)
    //   let elLists = this.jobOptions.map(el => {
    //     return el.childLists
    //   })
    //   elLists.map(el2 => {
    //     el2.sideVisible = ''
    //     console.log('我是测试的sideVisible', el2.sideVisible)
    //   })
    // },
    // 获取职位数据
    async getPositionType() {
      let res = await Home.positionType({})
      this.jobOptions = res.data
      console.log('我是职位选择信息', this.jobOptions)
      this.jobOptions.forEach(item => {
        item.childLists = item.childLists.map(el => {
          this.$set(el, 'sideVisible', false)
          el.subChildLists.map(list => {
            this.$set(list, 'allName', `${item.pname}/${el.typeName}`)
            this.restaurants.push(list)
          })
          return el
        })
      })
    },
    // 选择职业类型方法
    selectJob(value, id) {
      console.log(value, '1111111111111111111')
      this.form.positionTypeName = value
      this.showbigCard = false
      this.positionTypeId = id
      this.jobOptions.forEach(item => {
        item.childLists.forEach((res, index) => {
          res.sideVisible = false
        })
      })
    },

    //省份城市选择
    async queryCityList() {
      let params = {
        regionLevel: 1,
        id: '',
      }
      let res = await Job.queryCityList(params)
      if (res.code == 200) {
        this.provinceArr = res.data
        // console.log(this.provinceArr)
      }
    },
    //选择省份触发方法
    changeProvince(val) {
      this.province = val
      this.provinceArr.forEach(item => {
        if (val == item.id) {
          this.provinceInfo = item
        }
      })
      this.queryCityList1()
    },
    //地级城市选择
    async queryCityList1() {
      let params = {
        regionLevel: 2,
        id: this.province,
      }
      let res = await Job.queryCityList(params)
      if (res.code == 200) {
        let cities = res.data
        cities.forEach(item => {
          if (item.name == '市辖区') {
            item.name = this.provinceInfo.name
          }
        })
        this.cities = cities
        this.allCities = this.allCities.concat(this.cities)
        let map = new Map()
        for (let item of this.allCities) {
          map.set(item.id, item)
        }
        this.allCities = [...map.values()]
        console.log(this.cities, '我是最终选择的城市列表')
      }
    },
    //城市选择触发方法
    changeCity(val) {
      console.log(this.citySel)
      console.log(val, '我是城市选择触发方法得到的val')
      this.cityList = this.allCities.filter(el => {
        return val.indexOf(el.id) > -1
      })
      console.log(this.cityList, '我是选择完之后的cityList')
      return
    },

    //地址选择
    async queryCompanyAddrList() {
      let data = {
        companyId: this.userInfo.companyId,
      }
      let res = await jobManagement.queryCompanyAddrList(data)
      console.log(res.data, '我是地址')
      this.DdArr = res.data.list
    },

    //判断地址下拉框是否有数据
    estimateAddress() {
      if (!this.DdArr.length) {
        this.showTitle = true
        console.log('22222222222222', this.DdArr)
      }
      console.log('111111111111', this.DdArr)
    },
    //前往地址管理页面添加地址
    dialogVisible() {
      this.showTitle = false
      this.$router.push({ path: 'userCenter/address' })
    },
    //根据地址获取经纬度
    // getAddrGeo(addr){
    // var location = [];
    //   //获取某地址的经纬度可用于移动端跳转app导航
    //   $.ajax({
    //     type: "GET",
    //     url:
    //       "http://restapi.amap.com/v3/geocode/geo?key=你的高德key&s=rsv3&address=" +
    //       addr.trim(),
    //     success: function (response) {
    //       location =
    //         response.geocodes[0] && response.geocodes[0].location.split(",");
    //     },
    //     error: function (e) {
    //       console.log("地址坐标获取失败", e);
    //     },
    //   });
    // },
    // 保存按钮
    saveForm() {
      let cityList = []
      this.cityList.forEach(item => {
        let obj = {
          cityId: item.id,
          cityName: item.name,
          cityCode: item.zipcode,
        }
        cityList.push(obj)
      })
      console.log('保存时候的cityList', cityList)
      let data = {
        userId: this.userId,
        companyId: this.userInfo.companyId,
        companyName: this.companyName,
        positionName: this.form.positionName || '',
        recruitType: this.form.recruitType + '' || '',
        responsibility: this.form.responsibility || '',
        skillRequire: '',
        topSalary: parseInt(this.form.topSalary) || '',
        lowSalary: parseInt(this.form.lowSalary) || '',
        yearSalary: this.form.yearSalary || '',
        education: this.form.education + '' || '',
        experience: this.form.experience + '' || '',
        workAddress: this.form.workAddress || '',
        longitude: this.form.longitude,
        latitude: this.form.latitude,
        welfare: '',
        positionTypeId: this.positionTypeId || '',
        positionLabelList: [{ labelId: this.positionTypeId || '', labelName: this.form.positionTypeName || '' }],
        cityCode: '',
        cityName: '',
        cityList: cityList,
        areaCode: '',
        areaName: '',
        pageSize: 10,
        currentPage: 1,
      }
      console.log(data, '我是新增点击之后的数据')
      this.$refs.addJob.validate(async valid => {
        if (valid) {
          console.log('123654987')
          try {
            const loading = this.$loading({
              lock: true,
              text: '新增职位中……',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.7)',
            })
            const res = await jobManagement.insertPositonInfo(data)
            loading.close()
            if (res.code == 200) {
              this.$message.success('新增成功')
            } else {
              this.$message(res.data)
            }
          } catch (error) {
            this.$message.error('新增失败')
          }
          console.log(data, '我是新增')
          this.$router.push({ name: 'jobManagement' })
          this.form = {}
          this.province = ''
          this.citySel = ''
        }
      })
    },

    //关闭城市地址提示框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    //获取公司信息
    async queryCompanyInfo() {
      let params = {
        // id: 24,
        id: this.userInfo.companyId || '24',
      }
      let res = await Oxman.queryCompanyInfo(params)
      console.log(res.data, '我是公司信息')
      this.companyName = res.data.companyName
    },
    //获取公司个人信息
    async getQueryPersonInfo() {
      let data = { userId: this.userId }
      let res = await Oxman.queryPersonInfo(data)
      this.email = res.data.email
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 1300px;
  background-color: #ffffff;
  border-top: 1px solid #d5dff0;
  position: relative;
  div {
    // border: 1px solid red;
  }
  .formBox {
    width: 699px;
    height: 100%;
    margin-left: 240px;
    border-radius: 0px 0px 0px 0px;
    position: relative;
    margin-top: 31px;
    .goBack {
      margin-left: -100px;
    }
    .jobInfo {
      width: 605px;
      // height: 500px;
      display: flex;
      .allNum {
        .num1 {
          width: 17px;
          height: 605px;
          font-size: 40px;
          font-family: PingFang SC-Semibold, PingFang SC;
          font-weight: 600;
          color: #2446a8;
          line-height: 56px;
        }
        .num2 {
          width: 17px;
          height: 530px;
          font-size: 40px;
          font-family: PingFang SC-Semibold, PingFang SC;
          font-weight: 600;
          color: #2446a8;
          line-height: 56px;
        }
      }

      .infoRight {
        width: 588px;
        // height: 500px;
        margin-left: 15px;
        h3 {
          width: 108px;
          height: 25px;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          line-height: 25px;
          margin-left: 10px;
        }
        p {
          width: 462px;
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          -webkit-background-clip: text;
          margin-top: 12px;
          margin-left: 10px;
        }
        .companyBox {
          margin-top: 24px;
          height: auto;
          .gsName {
            width: 200px;
            height: 20px;
            display: flex;
            margin-left: 1px;
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
            -webkit-background-clip: text;
            margin-top: 10px;
          }
          .yaoQiu {
            width: 108px;
            height: 25px;
            font-size: 18px;
            font-weight: 600;
            color: #333333;
            line-height: 25px;
            display: flex;
            margin-top: 32px;
          }
          .p4 {
            width: 462px;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
            -webkit-background-clip: text;
            margin-top: 12px;
            display: flex;
          }
          .formButtom {
            margin-top: 25px;
            height: 60px;
            .JyAndXl {
              display: flex;
              width: 315px;
              justify-content: space-between;
            }
          }
          .XinZi {
            .Xz {
              display: flex;
              justify-content: space-between;
            }
          }
          .chengshi {
            .citySel {
              display: flex;
              justify-content: space-between;
            }
          }
          .jieShao {
            // width: 447px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            color: #3d3d3d;
            line-height: 20px;
            margin-left: 70px;
            margin-top: -30px;
          }
          .send {
            width: 100px;
            height: 40px;
            background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
            border-radius: 4px 4px 4px 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            font-size: 14px;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 20px;
            right: 240px;
            bottom: -135px;
            cursor: pointer;
            .fabu {
              width: 28px;
              height: 20px;
              font-size: 14px;
              font-weight: 500;
              color: #ffffff;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
.bigCard {
  // box-shadow: 0 0 20px #c0baba;
  // overflow-y: auto;
  opacity: 1;
  .searchT {
    display: flex;
    padding: 10px 0;
    h4 {
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      color: #222222;
      line-height: 22px;
      display: flex;
      margin-top: -40px;
    }
    div {
      margin-top: -30px;
      margin-left: 15px;
    }
  }

  .p1 {
    height: 36px;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    line-height: 20px;
    display: flex;
    margin-top: 3px;
  }
  img {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 26px;
    right: 22px;
    cursor: pointer;
  }
  .smallCard {
    .cat-list {
      // width: 380px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-left: 20px;
      box-sizing: border-box;
      .type-item {
        width: 200px;
        padding: 15px;
        box-sizing: border-box;
        .item-list {
          display: flex;
          align-items: center;
          cursor: pointer;
          .addP {
            border: 1px solid #2559c2;
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2559c2;
          }
          .nameP {
            margin-left: 5px;
          }
        }
        .popoverList {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
      }
      .click-child {
        // margin-left: 36px;
        div {
          width: 450px;
          margin-top: 25px;
          margin-left: 16px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          text-align: left;
          a {
            width: 150px;
            height: 20px;
            margin-top: 5px;
            color: #6d6c70;
            &:hover {
              color: #2559c2;
            }
          }
        }
      }
    }
  }
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 5px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  box-sizing: border-box;
}
::v-deep .el-form-item__label {
  margin-bottom: -20px;
}
::v-deep .el-form-item__label {
  color: #666666;
  text-align: center;
}
::v-deep .el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-hidden {
  display: none;
}
</style>
