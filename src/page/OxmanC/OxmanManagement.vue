<template>
  <div class="main">
    <div class="xomanBox">
      <!-- <button class="solo"><p>单聊</p></button> -->
      <div class="cardTabBox">
        <div :class="['cardTabItem', tabIndex == 1 ? 'active' : '']" @click="qieTab(1)">
          <p>沟通过</p>
        </div>
        <div :class="['cardTabItem', tabIndex == 2 ? 'active' : '']" @click="qieTab(2)">
          <p>浏览过</p>
        </div>
      </div>
      <div id="table">
        <div id="tableSelect" style="margin-top: 20px">
          <div class="tableSelect_a">
            <div class="termBox">
              <div class="termItem" v-for="(item1, index1) in moreArr" :key="index1">
                <div :class="['select', selectMore[index1] ? 'active' : '']">
                  <p>{{ item1.name }}<span v-if="selectMore[index1]">(1)</span></p>
                  <img class="selIcon" src="@/assets/image/oxman/Coxman/xiala1.png" alt="" />
                  <img class="bottom" src="@/assets/image/job/bottom.png" alt="" />
                </div>
                <div class="selectSBox" v-if="moreArr[index1].child && moreArr[index1].child.length > 0">
                  <div class="selectSCon" v-for="(item2, index2) in item1.child" :key="index2">
                    <p
                      :class="['one-text', selectMore[index1] == item2.id ? 'active' : '']"
                      @click="toChooseSelect(index1, item2)"
                    >
                      {{ item2.name || item2.positionName }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="clear" @click="toClear">
                <p>重置</p>
              </div>
            </div>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%" :row-style="tableRowClassName" :cell-style="cellStyle">
          <el-table-column label="" width="20"> </el-table-column>

          <el-table-column label="姓名" width="120">
            <template v-slot="{ row }"
              ><div class="list-img">
                <el-avatar :size="20" :src="row.headPath"></el-avatar>
              </div>
              <div class="user">{{ row.userName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="基本信息" width="210">
            <template v-slot="{ row }">
              {{ row.education }} <span class="span1">|</span>{{ row.age }}岁<span class="span1">|</span
              >{{ row.workTime }}<span v-if="!isNaN(row.workTime)">年</span><span class="span1">|</span
              >{{ row.startSalary }}-{{ row.endSalary }}K
            </template>
          </el-table-column>
          <el-table-column label="最近工作经历" width="230">
            <template v-slot="{ row }"> {{ row.lastPositionName }}&nbsp;&nbsp;{{ row.lastcCompanyName }} </template>
          </el-table-column>
          <el-table-column label="教育经历" width="210">
            <template v-slot="{ row }">
              {{ row.startTime }}-{{ row.endTime }}&nbsp;&nbsp;{{ row.schoolName }}
            </template>
          </el-table-column>
          <el-table-column prop="positionName" label="应聘职位" width="120"> </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">沟通</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="tableContent">
          <div class="tableHead">
            <div class="box"><el-checkbox v-model="checked"></el-checkbox></div>
            <div class="headName">牛人</div>
            <div class="headInfo">基本信息</div>
            <div class="headExperience">最近工作经历</div>
            <div class="headEducation">教育经历</div>
            <div class="headJob">应聘职位</div>
            <div class="headCaozuo">操作</div>
          </div>
          <div
            :class="['tableBody', i === index ? 'active' : '']"
            v-for="(item, index) in tableData"
            :key="index"
            @mouseenter="changeBac(index)"
            @mouseleave="clearBac(index)"
          >
            <div class="box">
              <el-checkbox v-model="checked"></el-checkbox>
            </div>
            <div class="bodyName">
              <img :src="item.headUrl" alt="" />
              <p>{{ item.name }}</p>
            </div>
            <div class="bodyInfo">
              <p class="p1">{{ item.info1 }}</p>
              <span></span>
              <p>{{ item.info2 }}岁</p>
              <span></span>
              <p>{{ item.info3 }}年</p>
              <span></span>
              <p>{{ item.info4 }}-{{ item.info5 }}K</p>
            </div>
            <div class="bodyExperience">
              <p>{{ item.positionName }}</p>
              <p class="p2">{{ item.companyName }}</p>
            </div>
            <div class="bodyEducation">
              <p>{{ item.startTime }}-{{ item.endTime }}</p>
              <p class="p2">{{ item.university }}</p>
            </div>
            <div class="bodyJob">
              {{ item.toPositionName }}
            </div>
            <div class="bodyCaozuo">
              <p>沟通</p>
              <span v-if="item.chatNum">{{ item.chatNum }}</span>
              <img src="@/assets/image/oxman/Coxman/more@2x.png" alt="" />
            </div>
          </div>
        </div> -->
      </div>
      <div class="pageBox">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
    <!-- <div class="weChat">
      <img class="gouTong" src="@/assets/image/oxman/Coxman/liaotian111.png" alt="" />
      <div class="chatNumber"><p>26</p></div>
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import jobManagement from '@/api/jobManagement/index'
import Oxman from '@/api/oxman'

export default {
  computed: {
    ...mapGetters(['userId', 'userInfo']),
  },
  data() {
    return {
      moreArr: [
        {
          name: '应聘职位',
        },
        {
          name: '学历',
        },
        {
          name: '工作经验',
        },
        {
          name: '年龄',
        },
        {
          name: '求职状态',
        },
        // {
        //   name: '新招呼',
        // },
        // {
        //   name: '我发起',
        // },
      ],
      selectMore: ['', '', '', '', ''],
      selectAgeArr: [],
      tableData: [],
      i: -1,
      total: 0,
      checked: '',
      cellStyle: {
        fontsize: '14px',
      },
      currentPage: 1,
      tabIndex: 1,
    }
  },
  created() {
    // this.queryActiveVitaeList()
    // this.queryPositonAll()
    // this.setMore()
  },
  activated() {
    if (this.$route.query.update) {
      this.currentPage = 1
      this.selectMore = ['', '', '', '', '']
      this.selectAgeArr = []
      this.queryActiveVitaeList()
      this.queryPositonAll()
      this.setMore()
    }
  },
  methods: {
    qieTab(type) {
      if (type == this.tabIndex) {
        return
      }
      this.tabIndex = type
      this.toClear()
    },
    async queryPositonAll() {
      let params = {
        // companyId: this.userInfo.companyId || '30',
        companyId: this.userInfo.companyId || '',
        personId: '',
      }
      let res = await Oxman.queryPositonAll(params)
      if (res.code == 200) {
        let arr = res.data
        let obj = { ...this.moreArr[0] }
        obj.child = arr
        this.moreArr.splice(0, 1, obj)
      }
    },
    setMore() {
      let arr1 = [
        {
          name: '小学',
          id: '1',
        },
        {
          name: '初中',
          id: '2',
        },
        {
          name: '高中',
          id: '3',
        },
        {
          name: '大专',
          id: '4',
        },
        {
          name: '本科',
          id: '5',
        },
        {
          name: '硕士',
          id: '6',
        },
        {
          name: '博士',
          id: '7',
        },
      ]
      let arr2 = [
        {
          name: '在校/应届',
          id: '1',
        },
        {
          name: '1年以内',
          id: '2',
        },
        {
          name: '1-3年',
          id: '3',
        },
        {
          name: '3-5年',
          id: '4',
        },
        {
          name: '5-10年',
          id: '5',
        },
        {
          name: '10年以上',
          id: '6',
        },
      ]
      let arr3 = [
        {
          id: '1',
          name: '20-25',
          startAge: 20,
          endAge: 25,
        },
        {
          id: '2',
          name: '25-30',
          startAge: 25,
          endAge: 30,
        },
        {
          id: '3',
          name: '30-35',
          startAge: 30,
          endAge: 35,
        },
        {
          id: '4',
          name: '35-40',
          startAge: 35,
          endAge: 40,
        },
        {
          id: '5',
          name: '40-50',
          startAge: 40,
          endAge: 50,
        },
        {
          id: '6',
          name: '50以上',
          startAge: 50,
          endAge: 999,
        },
      ]
      let arr4 = [
        {
          name: '离职-随时到岗',
          id: 1,
        },
        {
          name: '在职-暂不考虑',
          id: 2,
        },
        {
          name: '在职-考虑机会',
          id: 3,
        },
        {
          name: '在职-月内到岗',
          id: 4,
        },
      ]
      let obj1 = { ...this.moreArr[1] },
        obj2 = { ...this.moreArr[2] },
        obj3 = { ...this.moreArr[3] },
        obj4 = { ...this.moreArr[4] }
      obj1.child = arr1
      obj2.child = arr2
      obj3.child = arr3
      obj4.child = arr4
      this.moreArr.splice(1, 1, obj1)
      this.moreArr.splice(2, 1, obj2)
      this.moreArr.splice(3, 1, obj3)
      this.moreArr.splice(4, 1, obj4)
    },
    toClear() {
      this.currentPage = 1
      this.selectMore = ['', '', '', '', '']
      this.selectAgeArr = []
      this.queryActiveVitaeList()
    },
    toChooseSelect(pIndex, item) {
      if (pIndex == 3) {
        if (this.selectMore[pIndex] == item.id) {
          this.selectMore[pIndex] = ''
          this.selectAgeArr = []
        } else {
          this.selectMore.splice(pIndex, 1, item.id)
          let selectAgeArr = []
          selectAgeArr.push(item.startAge)
          selectAgeArr.push(item.endAge)
          this.selectAgeArr = selectAgeArr
        }
      } else {
        if (this.selectMore[pIndex] == item.id) {
          this.selectMore[pIndex] = ''
        } else {
          this.selectMore.splice(pIndex, 1, item.id)
        }
      }
      // console.log(this.selectMore);
      this.queryActiveVitaeList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //鼠标移到表格中背景颜色改变
    changeBac(index) {
      this.i = index
    },
    // 鼠标移出背景颜色清除
    clearBac() {
      this.i = -1
    },
    // 分页
    currentChange() {
      if (val == this.currentPage) {
        return
      }
      this.currentPage = val
      this.queryActiveVitaeList()
    },
    //选择职位类型
    changeJob(value) {
      this.select = value
      console.log(this.select)
    },

    //改变表格内数据样式
    tableRowClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 3) {
        return {
          'vertical-align': 'top',
          'text-align': 'center',
        }
      }
    },

    //私聊按钮
    handleClick(row) {
      console.log(row)
      sessionStorage.setItem('perInfo', JSON.stringify(row))
      this.$router.push({
        path: '/oxHome/communicate',
      })
    },
    //获取表格数据
    async queryActiveVitaeList() {
      let data = {
        operationType: this.tabIndex,
        userId: this.userId || 2,
        pageSize: 10,
        currentPage: this.currentPage,
        startAge: this.selectAgeArr[0] || '',
        endAge: this.selectAgeArr[1] || '',
        positionId: this.selectMore[0] || '',
        education: this.selectMore[1] || '',
        experiecne: this.selectMore[2] || '',
        lookWorkStatus: this.selectMore[4] || '',
      }
      let res = await jobManagement.queryActiveVitaeList(data)
      this.tableData = res.data.list
      this.total = res.data.total
      console.log(this.tableData, '我是牛人列表')
    },
  },
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css');
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
.main {
  background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  .xomanBox {
    width: 1000px;
    margin-top: 12px;
    border-radius: 4px 4px 4px 4px;
    .solo {
      width: 52px;
      height: 32px;
      background: rgba(36, 70, 168, 0.1);
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
      border: 1px solid #2446a8;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        width: 28px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #2446a8;
        line-height: 20px;
        -webkit-background-clip: text;
      }
    }
    #table {
      width: 100%;
      #tableSelect {
        height: 52px;
        background: #f9fafc;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 4px 4px 0 0;
        .tableSelect_a {
          width: 996px;
          height: 48px;
          background: url('~@/assets/image/oxman/Coxman/mengceng32.png');
          .termBox {
            display: flex;
            // flex-wrap: wrap;
            align-items: center;
            position: relative;
            .clear {
              font-size: 14px;
              color: #999999;
              line-height: 20px;
              margin-left: 24px;
              cursor: pointer;
            }
            .termItem {
              color: #333333;
              margin: 10px 10px;
              cursor: pointer;
              position: relative;
              .active {
                color: #2446a8;
              }
              .select {
                // width: 96px;
                height: 32px;
                // background: #f8f9fc;
                border-radius: 4px;
                padding: 0 12px;
                font-size: 14px;
                font-weight: 400;
                color: #333333;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img {
                  width: 10px;
                  height: auto;
                  margin-left: 4px;
                }
                .bottom {
                  display: none;
                }
              }
              .select.active {
                color: #2446a8;
                .selIcon {
                  display: none;
                }
                .bottom {
                  display: block;
                }
              }
              .selectSBox {
                width: 150px;
                max-height: 300px;
                overflow-y: auto;
                background: #fff;
                border: 1px solid #e8ebf0;
                border-radius: 4px;
                padding: 4px 8px;
                box-sizing: border-box;
                position: absolute;
                left: 0;
                top: 32px;
                display: none;
                z-index: 10000;
                .selectSCon {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  p {
                    height: 32px;
                    width: 100%;
                    line-height: 32px;
                    text-align: left;
                    padding: 0 4px;
                    box-sizing: border-box;
                    font-size: 14px;
                  }
                  p.active {
                    color: #2446a8;
                  }
                  img {
                    width: 12px;
                    height: 12px;
                  }
                }
                .selectSCon:hover {
                  background: #f8f8f8;
                }
              }
              .selectTBox {
                padding-left: 30px;
                position: absolute;
                left: 115px;
                top: 35px;
                z-index: 1000;
              }
              .selectTCon {
                width: 860px;
                height: 300px;
                overflow-y: auto;
                background: #fff;
                border: 1px solid #e8ebf0;
                border-radius: 4px;
                padding: 24px 20px;
                box-sizing: border-box;
                .selectTItem {
                  display: flex;
                  font-size: 14px;
                  h2 {
                    width: 20%;
                    font-weight: 600;
                    text-align: left;
                  }
                  div {
                    width: 80%;
                    display: flex;
                    flex-wrap: wrap;
                    p {
                      width: 20%;
                      text-align: left;
                      margin-bottom: 16px;
                    }
                    p.active {
                      color: #2446a8;
                    }
                  }
                }
              }
            }
            //.termItem:nth-child(2) .selectSBox {
            //  display: block;
            //}

            .termItem:hover .selectSBox {
              display: block;
            }
          }
        }
      }
      .tableContent {
        width: 100%;
        div {
          // border: 1px solid red;
        }
        .tableHead {
          width: 100%;
          display: flex;
          height: 48px;
          background: #f3f5f9;
          align-items: center;
          .box {
            width: 55px;
          }
          .headName {
            width: 130px;
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            -webkit-background-clip: text;
          }
          .headInfo {
            width: 230px;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            -webkit-background-clip: text;
            display: flex;
          }
          .headExperience {
            width: 260px;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            -webkit-background-clip: text;
            display: flex;
          }
          .headEducation {
            width: 240px;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            -webkit-background-clip: text;
            display: flex;
          }
          .headJob {
            width: 140px;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            -webkit-background-clip: text;
            display: flex;
          }
          .headCaozuo {
            width: 130px;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            -webkit-background-clip: text;
            display: flex;
          }
        }
        .tableBody {
          width: 100%;
          display: flex;
          height: 64px;
          align-items: center;
          background: #ffffff;
          border-bottom: 1px solid #f2f4f7;
          .box {
            width: 55px;
          }
          .bodyName {
            width: 130px;
            display: flex;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
              opacity: 1;
              border-radius: 50%;
            }
            p {
              height: 22px;
              font-size: 16px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #222222;
              line-height: 22px;
              -webkit-background-clip: text;
              margin-left: 16px;
            }
          }
          .bodyInfo {
            display: flex;
            width: 230px;
            align-items: center;
            p {
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              line-height: 20px;
              -webkit-background-clip: text;
              margin-left: 8px;
            }
            .p1 {
              margin-left: 0px;
            }
            span {
              height: 12px;
              width: 1px;
              display: inline-block;
              background: #dadde2;
              margin-left: 8px;
            }
          }
          .bodyExperience {
            width: 260px;
            display: flex;
            p {
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              line-height: 20px;
              -webkit-background-clip: text;
            }
            .p2 {
              margin-left: 10px;
            }
          }
          .bodyEducation {
            width: 240px;
            display: flex;
            align-items: center;
            p {
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 20px;
              -webkit-background-clip: text;
            }
            .p2 {
              margin-left: 8px;
              color: #333333;
            }
          }
          .bodyJob {
            width: 140px;
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
            -webkit-background-clip: text;
          }
          .bodyCaozuo {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #666666;
            line-height: 20px;
            p {
              width: 28px;
              height: 20px;
              font-size: 14px;
              font-weight: 400;
              color: #2446a8;
              line-height: 20px;
              cursor: pointer;
            }
            span {
              display: inline-block;
              width: 14px;
              height: 14px;
              background: #ff3525;
              opacity: 1;
              color: #ffffff;
              border-radius: 50%;
              line-height: 14px;
              margin-left: 3px;
            }
            img {
              width: 16px;
              height: 16px;
              position: absolute;
              right: 10px;
            }
          }
        }
        .tableBody:last-child {
          border-radius: 0 0 4px 4px;
        }
        .active {
          background: #f5f7fa;
        }
      }
    }
    .pageBox {
      margin-top: 24px;
    }
  }
  .weChat {
    position: absolute;
    right: 47px;
    bottom: 98px;
    .gouTong {
      width: 40px;
      height: 40px;
    }
    .chatNumber {
      width: 22px;
      height: 16px;
      background: #ff3525;
      border-radius: 16px 16px 16px 16px;
      opacity: 1;
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
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 14px;
        -webkit-background-clip: text;
      }
    }
  }

  .list-img {
    float: left;
    margin-right: 5px;
    margin-top: 5px;
  }
  .user {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 400;
    color: #222222;
  }
  .span1 {
    width: 1px;
    height: 12px;
    margin-left: 5px;
    margin-right: 5px;
    opacity: 0.5;
  }
}
.cardTabBox {
  display: flex;
  .cardTabItem {
    height: 32px;
    padding: 0 12px;
    border-radius: 4px 4px 4px 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
  }
  .cardTabItem.active {
    border: 1px solid #2446a8;
    background: rgba(36, 70, 168, 0.1);
    color: #2446a8;
  }
}
</style>
