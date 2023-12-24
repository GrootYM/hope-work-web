<template>
  <div class="main">
    <div class="jobBox">
      <div class="clearScreen" @click="toClear"><p>清空筛选</p></div>
      <!-- 搜索框 -->
      <div class="searchJobBtnBox">
        <div class="selBox" @click="toChooseLocation">
          <p>{{ cityInfo.name || "不限" }}</p>
          <div class="selIcon">
            <img src="@/assets/image/job/selIcon.png" alt="" />
          </div>
        </div>
        <!-- <div class="selBox">
          <p>{{ positionType.cityName }}-{{ positionType.positionName }}</p>
          <div class="selIcon">
            <img src="@/assets/image/job/selIcon.png" alt="" />
          </div>
          <div class="selectSBox">
            <div class="selectSCon" v-for="(item2, index2) in positionTypeArr" :key="index2">
              <p :class="['one-text', positionType.id == item2.id ? 'active' : '']" @click="toChooseType(item2)">
                {{ item2.cityName }}-{{ item2.positionName }}
              </p>
            </div>
          </div>
        </div> -->
        <div class="searchJobBox">
          <!-- <div class="selBox">
            <p v-if="positionType.id">{{ positionType.cityName }}-{{ positionType.positionName }}</p>
            <p v-else>不限</p>
            <div class="selIcon">
              <img src="@/assets/image/job/selIcon.png" alt="" />
            </div>
            <div class="selectSBox">
              <div class="selectSCon">
                <p :class="['one-text', !positionType.id ? 'active' : '']" @click="toChooseType(-1)">不限</p>
              </div>
              <div class="selectSCon" v-for="(item2, index2) in positionTypeArr" :key="index2">
                <p :class="['one-text', positionType.id == item2.id ? 'active' : '']" @click="toChooseType(item2)">
                  {{ item2.cityName }}-{{ item2.positionName }}
                </p>
              </div>
            </div>
          </div> -->
          <div class="searchBox">
            <img src="@/assets/image/job/searchIcon.png" alt="" />
            <input
              class="minFont"
              type="text"
              v-model="searchStr"
              placeholder="请用空格隔开多个中文关键词，逗号隔开多个英文词组（如：designer,tester）"
            />
          </div>
          <button @click="toSearch">搜索</button>
        </div>
        <button class="saveTj" @click="toSave">保存搜索条件</button>
      </div>
      <div class="searchJobBtnBox searchJobBtnBox2">
        <div class="selBoxOut">
          <h2>职位名称</h2>
          <div class="selBox">
            <el-select
              v-model="positionCheckArr"
              multiple
              filterable
              remote
              placeholder="请输入职位关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              @change="remoteChange"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.positionName"
                :value="item.positionName"
              >
              </el-option>
            </el-select>
          </div>
          <!-- <div class="selBox">
            <p v-if="positionType.id">{{ positionType.cityName }}-{{ positionType.positionName }}</p>
            <p v-else>不限</p>
            <div class="selIcon">
              <img src="@/assets/image/job/selIcon.png" alt="" />
            </div>
            <div class="selectSBox">
              <div class="selectSCon">
                <p :class="['one-text', !positionType.id ? 'active' : '']" @click="toChooseType(-1)">不限</p>
              </div>
              <div class="selectSCon" v-for="(item2, index2) in positionTypeArr" :key="index2">
                <p :class="['one-text', positionType.id == item2.id ? 'active' : '']" @click="toChooseType(item2)">
                  {{ item2.cityName }}-{{ item2.positionName }}
                </p>
              </div>
            </div>
          </div> -->
        </div>
        <div class="selBoxOut">
          <h2>公司名称</h2>
          <div class="searchJobBox">
            <div class="searchBox">
              <input
                type="text"
                v-model="companyName"
                placeholder="空格隔开多个中文公司名称，逗号隔开英文"
              />
              <div class="selBox selBoxL">
                <p v-if="workStatus">{{ workStatus == 1 ? "目前" : "以前" }}</p>
                <p v-else>不限</p>
                <div class="selIcon">
                  <img src="@/assets/image/job/selIcon.png" alt="" />
                </div>
                <div class="selectSBox">
                  <div class="selectSCon">
                    <p
                      :class="['one-text', !workStatus ? 'active' : '']"
                      @click="toChooseStatus(-1)"
                    >
                      不限
                    </p>
                  </div>
                  <div class="selectSCon">
                    <p
                      :class="['one-text', workStatus == 1 ? 'active' : '']"
                      @click="toChooseStatus(1)"
                    >
                      目前
                    </p>
                  </div>
                  <div class="selectSCon">
                    <p
                      :class="['one-text', workStatus == 2 ? 'active' : '']"
                      @click="toChooseStatus(2)"
                    >
                      以前
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 热门职位 -->
      <!-- <div class="hotJobBox">
        <p class="label">热词：</p>
        <div class="hotJob">
          <div class="hotJobItem" @click="clickHotHob(item)" v-for="(item, index) in hotJobs" :key="index">
            <p>{{ item.typeName }}</p>
            <img v-if="item.isHot" src="@/assets/image/oxman/hotIcon.png" alt="" />
          </div>
        </div>
      </div> -->
      <!-- 筛选条件 -->
      <div class="filterBox">
        <div class="filterItem">
          <div class="filterCon">
            <h2>学历要求</h2>
            <div class="termBox">
              <div
                :class="['termItem', 'bx', !xl ? 'active' : '']"
                @click="toChooseXl(-1)"
              >
                <p>不限</p>
              </div>
              <div
                :class="['termItem', 'bx', xl == item1.id ? 'active' : '']"
                v-for="(item1, index1) in xlyqArr"
                :key="index1"
                @click="toChooseXl(item1)"
              >
                <p>{{ item1.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="filterItem">
          <div class="filterCon">
            <h2>院校要求</h2>
            <div class="termBox">
              <div class="termItem" v-for="(item1, index1) in yxyqArr" :key="index1">
                <p :class="[yx == item1.name ? 'active' : '']">{{ item1.name }}</p>
              </div>
            </div>
          </div>
        </div> -->
        <div class="filterItem">
          <div class="filterCon">
            <h2>工作年限</h2>
            <div class="termBox">
              <div
                :class="['termItem', 'bx', !jy ? 'active' : '']"
                @click="toChooseJy(-1)"
              >
                <p>不限</p>
              </div>
              <div
                :class="['termItem', 'bx', jy == item1.id ? 'active' : '']"
                v-for="(item1, index1) in jyyqArr"
                :key="index1"
                @click="toChooseJy(item1)"
              >
                <p>{{ item1.name }}</p>
              </div>
              <div
                v-if="!jyZdy && jyEnd"
                :class="['termItem', 'bx', jy == '7' ? 'active' : '']"
                @click="toChooseJy({ id: '7' })"
              >
                <p>{{ jyStart }}-{{ jyEnd }}年</p>
              </div>
              <div :class="['termItem', 'bx']">
                <p v-if="!jyZdy" @click="toJyZdy" style="color: #a39f9f">
                  自定义
                </p>
                <div class="zdyBox" v-else>
                  <el-input
                    type="number"
                    size="mini"
                    v-model="jyStart1"
                    placeholder="开始"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    type="number"
                    size="mini"
                    v-model="jyEnd1"
                    placeholder="结束"
                  ></el-input>
                </div>
                <p v-if="jyZdy" @click="sureJyZdy" style="margin-left: 10px">
                  确认
                </p>
                <p v-if="jyZdy" @click="cancelJyZdy" style="margin-left: 10px">
                  取消
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="filterItem">
          <div class="filterCon">
            <h2>年龄要求</h2>
            <div class="termBox">
              <div
                :class="['termItem', 'bx', !nl ? 'active' : '']"
                @click="toChooseNl(-1)"
              >
                <p>不限</p>
              </div>
              <div
                :class="['termItem', 'bx', nl == item1.name ? 'active' : '']"
                v-for="(item1, index1) in nlyqArr"
                :key="index1"
                @click="toChooseNl(item1)"
              >
                <p>{{ item1.name }}</p>
              </div>
              <div
                v-if="!ageZdy && zdyAgeEnd"
                :class="[
                  'termItem',
                  'bx',
                  nl == zdyAgeStart + '-' + zdyAgeEnd ? 'active' : '',
                ]"
                @click="
                  toChooseNl({
                    name: zdyAgeStart + '-' + zdyAgeEnd,
                    startAge: zdyAgeStart,
                    endAge: zdyAgeEnd,
                  })
                "
              >
                <p>{{ zdyAgeStart }}-{{ zdyAgeEnd }}</p>
              </div>
              <div :class="['termItem', 'bx']">
                <p v-if="!ageZdy" @click="toAgeZdy" style="color: #a39f9f">
                  自定义
                </p>
                <div class="zdyBox" v-else>
                  <el-input
                    type="number"
                    size="mini"
                    v-model="zdyAgeStart1"
                    placeholder="开始"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    type="number"
                    size="mini"
                    v-model="zdyAgeEnd1"
                    placeholder="结束"
                  ></el-input>
                </div>
                <p v-if="ageZdy" @click="sureAgeZdy" style="margin-left: 10px">
                  确认
                </p>
                <p
                  v-if="ageZdy"
                  @click="cancelAgeZdy"
                  style="margin-left: 10px"
                >
                  取消
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="filterItem moreItem">
          <div class="filterCon">
            <h2>其他筛选</h2>
            <div class="termBox">
              <div
                class="termItem"
                v-for="(item1, index1) in moreArr"
                :key="index1"
              >
                <div :class="['select', selectMore[index1] ? 'active' : '']">
                  <p>
                    {{ item1.name }}<span v-if="selectMore[index1]">(1)</span>
                  </p>
                  <img
                    class="selIcon"
                    src="@/assets/image/job/selIcon.png"
                    alt=""
                  />
                  <img
                    class="bottom"
                    src="@/assets/image/job/bottom.png"
                    alt=""
                  />
                </div>
                <div class="selectSBox">
                  <div
                    class="selectSCon"
                    v-for="(item2, index2) in item1.child"
                    :key="index2"
                  >
                    <p
                      :class="[
                        'one-text',
                        selectMore[index1] == item2.id ||
                        selectMore[index1] == (item2.name || item2.industryName)
                          ? 'active'
                          : '',
                      ]"
                      @click="toChooseSelect(index1, item2)"
                    >
                      {{ item2.name || item2.industryName }}
                    </p>
                    <!-- <img v-if="index1 == 1" src="@/assets/image/job/sellconR.png" alt="" /> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="filterItem" v-if="saveList.length > 0">
          <div class="filterCon filterSavedCon">
            <h2>保存的搜索条件</h2>
            <div class="termBox termSavedBox">
              <div
                class="termItem"
                @click="chooseOneSave(item)"
                v-for="(item, index) in saveList"
                :key="index"
              >
                {{ item.conditionName }}
                <img
                  @click.stop="removeSave(item)"
                  src="@/assets/image/login/close.png"
                  alt=""
                />
              </div>
              <!-- <div class="termItem" @click="chooseSaved(1)" v-if="savedObj.cityInfo.name">
                城市：{{ savedObj.cityInfo.name }}
                <img @click.stop="remove(1)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(2)" v-if="savedObj.keyWords">
                关键词：{{ savedObj.keyWords }}
                <img @click.stop="remove(2)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(3)" v-if="savedObj.positionCheckStr">
                职位：{{ savedObj.positionCheckStr }}
                <img @click.stop="remove(3)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(4)" v-if="savedObj.companyName">
                公司：{{ savedObj.companyName }}
                <img @click.stop="remove(4)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(12)" v-if="savedObj.workStatus">
                时间：{{ savedObj.workStatus ? (savedObj.workStatus == 1 ? '目前' : '以前') : '不限' }}
                <img @click.stop="remove(12)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(5)" v-if="savedObj.education">
                学历：{{ xlyqArr[savedObj.education - 3].name }}
                <img @click.stop="remove(5)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(6)" v-if="savedObj.experience">
                经验：{{ jyyqArr[savedObj.experience - 1].name }}
                <img @click.stop="remove(6)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(7)" v-if="savedObj.nl">
                年龄：{{ savedObj.nl }}
                <img @click.stop="remove(7)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(8)" v-if="savedObj.sex">
                性别：{{ sexArr[savedObj.sex - 1].name }}
                <img @click.stop="remove(8)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(9)" v-if="savedObj.xzName">
                薪资：{{ savedObj.xzName }}
                <img @click.stop="remove(9)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(10)" v-if="savedObj.lookWorkStatus">
                求职状态：{{ lookWorkArr[savedObj.lookWorkStatus - 1].name }}
                <img @click.stop="remove(10)" src="@/assets/image/login/close.png" alt="" />
              </div>
              <div class="termItem" @click="chooseSaved(11)" v-if="savedObj.industryMxIdStr">
                行业：{{ savedObj.industryMxIdStr }}
                <img @click.stop="remove(11)" src="@/assets/image/login/close.png" alt="" />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="jsBox">
      <h2>根据热门词为您检索到一下牛人</h2>
      <div class="cardBox">
        <div class="cardTabBox">
          <div :class="['cardTabItem', tabIndex == 1 ? 'active' : '']" @click="qieTab(1)">
            <p>推荐</p>
          </div>
          <div :class="['cardTabItem', tabIndex == 2 ? 'active' : '']" @click="qieTab(2)">
            <p>精选牛人</p>
          </div>
          <div :class="['cardTabItem', tabIndex == 3 ? 'active' : '']" @click="qieTab(3)">
            <p>新牛人</p>
          </div>
        </div>
        <div class="checkBox">
          <div class="cardTabItem">
            <input type="checkbox" />
            <p>过滤近14天查看</p>
          </div>
          <div class="cardTabItem">
            <input type="checkbox" />
            <p>过滤近14天查看</p>
          </div>
        </div>
      </div>
    </div> -->
    <div class="hintCard" v-if="recArr.length == 0">
      <img src="@/assets/image/oxman/empty.png" alt="" />
      <div>
        <p>暂无相关人才 请扩大搜索范围！</p>
      </div>
    </div>
    <div class="jobCardBox">
      <div class="cardBox">
        <div
          class="recItem"
          v-for="(item, index) in recArr"
          :key="index"
          @click="toPerson(item)"
        >
          <img class="bjW" src="@/assets/image/oxman/recBj.png" alt="" />
          <div class="callBtn" @click.stop="toImmediately(item)">
            <p class="tellHe"><i class="el-icon-service"></i>联系Ta</p>
          </div>
          <img
            v-if="item.sex == '男'"
            class="gender"
            src="@/assets/image/oxman/male.png"
            alt=""
          />
          <img
            v-if="item.sex == '女'"
            class="gender"
            src="@/assets/image/oxman/female.png"
            alt=""
          />
          <div class="userBox">
            <img
              :src="
                item.headPath ||
                'https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/e3cf9840-7f29-4901-b812-f587e8d7e6b7.jpeg'
              "
              alt=""
            />
            <div class="nameBox">
              <div class="name">
                <h2 v-html="item.userName"></h2>
                <p class="hot" v-if="item.isHot">热搜</p>
                <span>{{ item.activityStatus }}</span>
              </div>
              <div class="cardLabel">
                <p>{{ item.age }}岁</p>
                <p>
                  {{
                    item.workTime.indexOf("年") > -1
                      ? item.workTime
                      : item.workTime + "年"
                  }}
                </p>
                <p v-html="item.education"></p>
                <p>{{ item.lookWorkStatus }}</p>
                <p class="">{{ item.startSalary }}-{{ item.endSalary }}k</p>
              </div>
              <p class="two-text">
                求职期望：{{ item.cityName }} · {{ item.positionTypeName }}
              </p>
              <p class="two-text cardp" v-html="item.advantage"></p>
            </div>
            <div class="experienceBox">
              <div
                class="qwItem qwItemS"
                v-if="item.workExperienceList.length > 0"
              >
                <img src="@/assets/image/job/icon6.png" alt="" />
                <!-- <h2>期望：</h2> -->
                <!-- <p class="one-text">{{ item.cityName }} · {{ item.positionTypeName }}</p> -->
                <div>
                  <p
                    class="one-text cardp"
                    v-for="(s, i) in item.workExperienceList"
                    :key="i"
                  >
                    <span v-html="s.company"></span> ·
                    <span v-html="s.positionTypeName"></span>
                    <span class="stime">{{
                      s.startTime + "-" + s.endTime
                    }}</span>
                  </p>
                </div>
              </div>
              <div
                class="qwItem qwItemS"
                v-if="item.educationExperienceList.length > 0"
              >
                <img src="@/assets/image/oxman/xlicon.png" alt="" />
                <!-- <h2>院校：</h2> -->
                <div>
                  <p
                    class="one-text cardp"
                    v-for="(s, i) in item.educationExperienceList"
                    :key="i"
                  >
                    <span v-html="s.schoolName"></span> ·
                    <span v-html="s.major"></span> ·
                    <span v-html="s.education"></span>
                    <span class="stime">{{
                      s.startTime + "-" + s.endTime
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pageBox">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isShow" :show-close="false">
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
        <div class="title">
          <h2>城市选择</h2>
          <img
            src="@/assets/image/login/close.png"
            class="close-btn"
            @click="isShow = false"
          />
        </div>
        <div class="conBox">
          <div class="hot-city-list">选择省份</div>
          <div class="city-list">
            <el-select
              v-model="province"
              placeholder="请选择"
              @change="changeProvince"
            >
              <el-option
                v-for="item in provinceArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="hot-city-list">选择城市</div>
          <div class="city-list">
            <a
              v-for="city in cities"
              :key="city.id"
              class="city-btn"
              href="javascript:void(0)"
              @click="sureLocation(city)"
            >
              {{ city.name }}
            </a>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="isShowSave" :show-close="false">
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
        <div class="title">
          <h2>保存搜索条件</h2>
          <img
            src="@/assets/image/login/close.png"
            class="close-btn"
            @click="isShowSave = false"
          />
        </div>
        <div class="conBox disBox">
          <el-input
            type="text"
            placeholder="请输入保存关键词"
            v-model="saveName"
          ></el-input>
          <el-button @click="saveSerachCondition">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- <JobModal :isShow="isShow" @closeModal="isShow=false">
      <div class="mConBox">
        <h2>请选择城市</h2>
        <div class="tabBox">
          <div :class="['tabItem', 'active']">
            <p>热门城市</p>
          </div>
        </div>
        <div class="tabCon">
          <div class="conItem" v-for="(item, index) in csArr" :key="index" @click="sureLocation(item)">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </JobModal> -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Home from "@/api/home";
import Job from "@/api/job";
import Oxman from "@/api/oxman";

import JobModal from "@/component/Job/modal";

export default {
  components: {
    JobModal,
  },
  computed: {
    ...mapGetters(["userId", "userInfo"]),
  },
  data() {
    return {
      jyZdy: false,
      isShow: false,
      cityInfo: {},
      positionTypeArr: [],
      positionType: {},
      searchStr: "",
      hotJobs: [
        {
          typeName: "Java",
          isHot: 1,
        },
        {
          typeName: "销售",
        },
      ],
      csArr: [],
      selectXzArr: [],
      xzArr: [
        {
          startSalary: 0,
          endSalary: 3,
          name: "3k以下",
        },
        {
          startSalary: 3,
          endSalary: 5,
          name: "3k-5k",
        },
        {
          startSalary: 5,
          endSalary: 10,
          name: "5k-10k",
        },
        {
          startSalary: 10,
          endSalary: 20,
          name: "10k-20k",
        },
        {
          startSalary: 20,
          endSalary: 40,
          name: "20k-40k",
        },
        {
          startSalary: 40,
          endSalary: 9999999999999,
          name: "40k以上",
        },
        // {
        //   name: '自定义',
        // },
      ],
      jy: "",
      jyArr: [
        {
          name: "不限",
          id: "",
        },
        {
          name: "应届生",
          id: 1,
        },
        // {
        //   name: '实习生',
        // },
        {
          name: "1年以内",
          id: 2,
        },
        {
          name: "1-3年",
          id: 3,
        },
        {
          name: "3-5年",
          id: 4,
        },
        {
          name: "5-10年",
          id: 5,
        },
        {
          name: "10年以上",
          id: 6,
        },
      ],
      selectMore: ["", "", "", ""],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      xl: "",
      xlyqArr: [
        // {
        //   name: '小学',
        //   id: '1',
        // },
        // {
        //   name: '初中',
        //   id: '2',
        // },
        {
          name: "高中及以下",
          id: "3",
        },
        {
          name: "大专",
          id: "4",
        },
        {
          name: "本科",
          id: "5",
        },
        {
          name: "硕士",
          id: "6",
        },
        {
          name: "博士",
          id: "7",
        },
      ],
      yx: "",
      yxyqArr: [
        {
          name: "统招本科",
        },
        {
          name: "双一流院校",
        },
        {
          name: "211院校",
        },
        {
          name: "985院校",
        },
        {
          name: "留学生",
        },
      ],
      jy: "",
      jyyqArr: [
        {
          name: "在校/应届",
          id: "1",
        },
        {
          name: "1年以内",
          id: "2",
        },
        {
          name: "1-3年",
          id: "3",
        },
        {
          name: "3-5年",
          id: "4",
        },
        {
          name: "5-10年",
          id: "5",
        },
        {
          name: "10年以上",
          id: "6",
        },
      ],
      nl: "",
      nlArr: [],
      nlyqArr: [
        {
          name: "20-25",
          startAge: 20,
          endAge: 25,
        },
        {
          name: "25-30",
          startAge: 25,
          endAge: 30,
        },
        {
          name: "30-35",
          startAge: 30,
          endAge: 35,
        },
        {
          name: "35-40",
          startAge: 35,
          endAge: 40,
        },
        {
          name: "40-50",
          startAge: 40,
          endAge: 50,
        },
        {
          name: "50以上",
          startAge: 50,
          endAge: 9999999,
        },
      ],
      moreArr: [
        {
          name: "性别",
        },
        {
          name: "薪资区间",
        },
        // {
        //   name: '牛人活跃度',
        // },
        {
          name: "求职状态",
        },
        {
          name: "行业明细",
        },
      ],
      recArr: [],
      tabIndex: 1,
      // companyId: '30',
      province: "",
      provinceInfo: {},
      provinceArr: [],
      cities: [],
      industryList: [],
      companyName: "",
      savedObj: {},
      sexArr: [
        // {
        //   name: '不限',
        //   id: '',
        // },
        {
          name: "男",
          id: 1,
        },
        {
          name: "女",
          id: 2,
        },
      ],
      lookWorkArr: [
        // {
        //   name: '不限',
        //   id: -1,
        // },
        {
          name: "离职-随时到岗",
          id: 1,
        },
        {
          name: "在职-暂不考虑",
          id: 2,
        },
        {
          name: "在职-考虑机会",
          id: 3,
        },
        {
          name: "在职-月内到岗",
          id: 4,
        },
      ],
      industryMxIdStr: "",
      hasSavedObj: false,
      searchParams: {},
      options: [],
      loading: false,
      positionCheckArr: [],
      allOptions: [],
      positionCheckAllArr: [],
      workStatus: "",
      jyStart: "",
      jyEnd: "",
      jyStart1: "",
      jyEnd1: "",
      saveList: [],
      isShowSave: false,
      saveName: "",
      ageZdy: false,
      zdyAgeStart: "",
      zdyAgeEnd: "",
      zdyAgeStart1: "",
      zdyAgeEnd1: "",
    };
  },
  created() {
    window.addEventListener("keydown", this.handkeyCode, true); //开启监听键盘按下事件
  },
  mounted() {
    this.setSearchParams();
    this.queryHotCityList();
    this.setMoreArr();
    this.queryPositonAll();
    this.queryCityList();
    this.getIndustryOptions();
    this.querySerachConditionList();
  },
  activated() {
    if (this.$route.query.update) {
      this.currentPage = 1;
      this.xl = "";
      this.jy = "";
      this.nl = "";
      this.nlArr = [];
      this.selectMore = ["", "", "", ""];
      this.selectXzArr = [];

      this.setSearchParams();
      this.queryHotCityList();
      this.setMoreArr();
      this.queryPositonAll();
      this.queryCityList();
      this.getIndustryOptions();
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handkeyCode, true);
  },
  methods: {
    async querySerachConditionList() {
      let params = {};
      let res = await Oxman.querySerachConditionList(params);
      if (res.code == 200) {
        this.saveList = res.data;
      }
    },
    async saveSerachCondition() {
      if (!this.saveName) {
        this.$message({
          type: "error",
          message: "请输入保存关键词",
        });
        return;
      }
      let params = {
        conditionName: this.saveName,
        keyWords: this.savedObj.keyWords,
        companyName: this.savedObj.companyName,
        positionCode: "",
        positionName: JSON.stringify(this.savedObj.positionCheckAllArr),
        educationName: "",
        educationCode: this.savedObj.education,
        experienceCode: this.savedObj.experience,
        experienceStart: this.jyStart,
        experienceEnd: this.jyEnd,
        ageStart: this.savedObj.startAge,
        ageEnd: this.savedObj.endAge,
        sex: this.savedObj.sex,
        salaryStart: this.savedObj.startSalary,
        salaryEnd: this.savedObj.endSalary,
        findWorkState: this.savedObj.lookWorkStatus,
        industryId: this.savedObj.industryMxId,
        industryName: "",
        cityCode: this.savedObj.cityInfo.zipcode,
      };
      let res = await Oxman.saveSerachCondition(params);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        this.querySerachConditionList();
        this.isShowSave = false;
        this.saveName = "";
      }
    },
    async deleteSerachCondition(item) {
      let params = {
        id: item.id,
      };
      let res = await Oxman.deleteSerachCondition(params);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.querySerachConditionList();
      }
    },
    chooseOneSave(item) {
      let searchParams = {
        currentPage: 1,
        keyWords: item.keyWords,
        positionType: "",
        cityInfo: {
          zipcode: item.cityCode,
        },
        education: item.educationCodeList
          ? item.educationCodeList.join(",")
          : "",
        startSalary: item.salaryStart,
        endSalary: item.salaryEnd,
        experience: item.experienceCode,
        startExperience: item.experienceStart,
        endExperience: item.experienceEnd,
        sex: item.sex,
        xzName:
          item.salaryStart == 40
            ? "40k以上"
            : item.salaryStart + "k-" + item.salaryEnd + "k",
        lookWorkStatus: item.findWorkState,
        industryMxId: item.industryId,
        nl: item.ageStart == 50 ? "50以上" : item.ageStart + "-" + item.ageEnd,
        startAge: item.ageStart,
        endAge: item.ageEnd,
        companyName: item.companyName,
        workStatus: "",
        positionCheckAllArr: JSON.parse(item.positionName),
      };
      this.searchParams = searchParams;
      localStorage.setItem("searchParams", JSON.stringify(this.searchParams));
      this.setSearchParams();
      this.queryMySearchVitaeList();
    },
    removeSave(item) {
      let that = this;
      this.$confirm("确认删除该保存条件？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        if (res == "confirm") {
          that.deleteSerachCondition(item);
        }
      });
    },
    toJyZdy() {
      this.jyZdy = true;
      this.jyStart1 = this.jyStart;
      this.jyEnd1 = this.jyEnd;
    },
    sureJyZdy() {
      if (parseInt(this.jyEnd1) > parseInt(this.jyStart1)) {
        this.jyStart = this.jyStart1;
        this.jyEnd = this.jyEnd1;
        this.jy = "7";
        this.jyZdy = false;
        this.queryMySearchVitaeList();
      } else {
        this.$message.error("请输入正确区间");
      }
    },
    cancelJyZdy() {
      this.jyZdy = false;
      this.jyStart1 = "";
      this.jyEnd1 = "";
    },
    toAgeZdy() {
      this.ageZdy = true;
      this.zdyAgeStart1 = this.zdyAgeStart;
      this.zdyAgeEnd1 = this.zdyAgeEnd;
    },
    sureAgeZdy() {
      if (parseInt(this.zdyAgeEnd1) > parseInt(this.zdyAgeStart1)) {
        this.zdyAgeStart = this.zdyAgeStart1;
        this.zdyAgeEnd = this.zdyAgeEnd1;
        this.nl = this.zdyAgeStart + "-" + this.zdyAgeEnd;
        let nlArr = [];
        nlArr.push(this.zdyAgeStart);
        nlArr.push(this.zdyAgeEnd);
        this.nlArr = nlArr;
        this.ageZdy = false;
        this.queryMySearchVitaeList();
      } else {
        this.$message.error("请输入正确区间");
      }
    },
    cancelAgeZdy() {
      this.ageZdy = false;
      this.zdyAgeStart1 = "";
      this.zdyAgeEnd1 = "";
    },
    handkeyCode(e) {
      if (e.keyCode == 13) {
        this.toSearch();
      }
    },
    toChooseStatus(status) {
      if (status == -1) {
        this.workStatus = "";
      } else {
        this.workStatus = status;
      }
      this.queryMySearchVitaeList();
    },
    async remoteMethod(query) {
      if (query) {
        this.loading = true;
        let res = await Oxman.queryPositonNameList({
          positionName: query,
        });
        this.options = res.data;
        this.loading = false;
      } else {
        this.options = [];
      }
      let allOptions = [...this.allOptions];
      allOptions = allOptions.concat(this.options);
      this.allOptions = this.quchong(allOptions);
    },
    quchong(arr) {
      let obj = {};
      arr = arr.reduce(function (item, next) {
        obj[next.positionName]
          ? ""
          : (obj[next.positionName] = true && item.push(next));
        return item;
      }, []);
      return arr;
    },
    remoteChange(value) {
      console.log(value);
      let positionCheckAllArr = [];
      this.allOptions.forEach((item) => {
        value.forEach((v) => {
          if (item.positionName == v) {
            positionCheckAllArr.push(item);
          }
        });
      });
      this.positionCheckAllArr = positionCheckAllArr;
    },
    toPerson(item) {
      this.$router.push({
        path: "/oxHome/personalInfo",
        query: { userId: item.userId },
      });
    },
    setSearchParams() {
      let searchParams = JSON.parse(localStorage.getItem("searchParams")) || {};
      console.log(searchParams);
      this.currentPage = searchParams.currentPage;
      this.searchStr = searchParams.keyWords;
      this.positionType = searchParams.positionType || {};
      this.cityInfo = searchParams.cityInfo || {};
      this.xl = searchParams.education;
      this.selectXzArr[0] = searchParams.startSalary;
      this.selectXzArr[1] = searchParams.endSalary;
      this.jy = searchParams.experience;
      this.jyStart = searchParams.startExperience;
      this.jyEnd = searchParams.endExperience;
      this.selectMore[0] = searchParams.sex;
      this.selectMore[1] = searchParams.xzName;
      this.selectMore[2] = searchParams.lookWorkStatus;
      this.selectMore[3] = searchParams.industryMxId;
      this.nl = searchParams.nl;
      this.nlArr[0] = searchParams.startAge;
      this.nlArr[1] = searchParams.endAge;
      let nlArr = [25, 30, 35, 40, 50, 9999999];
      if (nlArr.indexOf(this.nlArr[1]) == -1) {
        this.zdyAgeStart = this.nlArr[0];
        this.zdyAgeEnd = this.nlArr[1];
      }
      this.companyName = searchParams.companyName;
      this.workStatus = searchParams.workStatus;
      if (searchParams.positionCheckAllArr) {
        let positionCheckArr = [];
        searchParams.positionCheckAllArr.forEach((item) => {
          positionCheckArr.push(item.positionName);
        });
        this.positionCheckArr = positionCheckArr;
        this.positionCheckAllArr = searchParams.positionCheckAllArr;
      }
      // this.selectXzArr[0] = searchParams.startSalary
      // this.selectXzArr[1] = searchParams.endSalary
      this.searchParams = searchParams;
      let savedObj = { ...this.searchParams };
      savedObj.industryMxIdStr = this.industryMxIdStr;
      savedObj.positionCheckStr = this.positionCheckArr.join(",");
      this.savedObj = savedObj;
      // this.hasSavedObj = this.isHavaParams(savedObj)
    },
    async getIndustryOptions() {
      let res = await Job.queryAllIndustryType({});
      this.industryList = res.data;
      let obj = { ...this.moreArr[3] };
      obj.child = this.industryList;
      this.moreArr.splice(3, 1, obj);
    },
    closeDialog() {
      this.isShow = false;
    },
    async queryCityList() {
      let params = {
        regionLevel: 1,
        id: "",
      };
      let res = await Job.queryCityList(params);
      if (res.code == 200) {
        this.provinceArr = res.data;
      }
    },
    async queryCityList1() {
      let params = {
        regionLevel: 2,
        id: this.province,
      };
      let res = await Job.queryCityList(params);
      if (res.code == 200) {
        let cities = res.data;
        cities.forEach((item) => {
          if (item.name == "市辖区") {
            item.name = this.provinceInfo.name;
          }
        });
        this.cities = cities;
      }
    },
    changeProvince(val) {
      this.province = val;
      this.provinceArr.forEach((item) => {
        if (val == item.id) {
          this.provinceInfo = item;
          this.$store.commit("SET_NOW_PROVINCE", {
            province: item.name,
            zipcode: item.adcode,
          });
        }
      });
      this.queryCityList1();
    },
    toClear() {
      this.currentPage = 1;
      this.xl = "";
      this.jy = "";
      this.nl = "";
      this.nlArr = [];
      this.selectMore = ["", "", ""];
      this.selectXzArr = [];
      this.queryMySearchVitaeList();
    },
    async queryPositonAll() {
      let params = {
        // companyId: this.companyId,
        companyId: this.userInfo.companyId || "",
        personId: "",
      };
      let res = await Oxman.queryPositonAll(params);
      if (res.code == 200) {
        this.positionTypeArr = res.data;
        // this.positionType = res.data[0] || {}
        let searchParams =
          JSON.parse(localStorage.getItem("searchParams")) || {};
        if (this.isHavaParams(searchParams)) {
          this.queryMySearchVitaeList();
        }
        // this.queryMySearchVitaeList()
      }
    },
    isHavaParams(obj) {
      let isHave = false;
      for (let key in obj) {
        let item = obj[key];
        if (key != "currentPage" && key != "pageSize") {
          if (item instanceof Array) {
            item.forEach((a) => {
              if (a) {
                isHave = true;
              }
            });
          } else if (item instanceof Object) {
            for (let k in item) {
              if (item[k]) {
                isHave = true;
              }
            }
          } else {
            if (item) {
              isHave = true;
            }
          }
        }
      }
      console.log(isHave);
      return isHave;
    },
    // 打招呼
    toImmediately(item) {
      item.positionId = this.positionType.positionTypeId;
      item.positionName = this.positionType.positionName;
      sessionStorage.setItem("perInfo", JSON.stringify(item));
      this.$router.push({
        path: "/oxHome/communicate",
      });
      this.$store.dispatch("setOxTitle", "沟通");
    },
    toChooseType(item) {
      if (item == -1) {
        this.positionType = {};
      } else {
        this.positionType = item;
      }
      this.queryMySearchVitaeList();
    },
    clickHotHob(item) {
      this.searchStr = item.typeName;
      this.queryMySearchVitaeList();
    },
    toChooseNl(item) {
      if (this.nl == item.name) {
        this.nl = "";
        this.nlArr = [];
      } else {
        this.nl = item.name;
        let nlArr = [];
        nlArr.push(item.startAge);
        nlArr.push(item.endAge);
        this.nlArr = nlArr;
      }
      this.queryMySearchVitaeList();
    },
    toChooseJy(item) {
      this.jy == item.id ? (this.jy = "") : (this.jy = item.id);
      this.queryMySearchVitaeList();
    },
    toChooseXl(item) {
      this.xl == item.id ? (this.xl = "") : (this.xl = item.id);
      this.queryMySearchVitaeList();
    },
    toChooseSelect(pIndex, item) {
      if (pIndex == 1) {
        if (this.selectMore[pIndex] == item.name) {
          this.selectMore[pIndex] = "";
          this.selectXzArr = [];
        } else {
          this.selectMore.splice(pIndex, 1, item.name);
          let selectXzArr = [];
          selectXzArr.push(item.startSalary);
          selectXzArr.push(item.endSalary);
          this.selectXzArr = selectXzArr;
        }
      } else {
        if (this.selectMore[pIndex] == item.id) {
          this.selectMore[pIndex] = "";
          this.industryMxIdStr = "";
        } else {
          this.selectMore.splice(pIndex, 1, item.id);
          if (pIndex == 3) {
            this.industryMxIdStr = item.industryName;
          }
        }
      }
      this.queryMySearchVitaeList();
    },
    toSearch() {
      // let params = {
      //   positionTypeId: this.positionType.positionTypeId || '',
      //   currentPage: this.currentPage,
      //   pageSize: this.pageSize,
      //   keyWords: this.searchStr,
      //   cityCode: this.cityInfo.zipcode || '',
      //   education: this.xl,
      //   startSalary: this.selectXzArr[0] || '',
      //   endSalary: this.selectXzArr[1] || '',
      //   experience: this.jy,
      //   lookWorkStatus: this.selectMore[2] || '',
      //   startAge: this.nlArr[0] || '',
      //   endAge: this.nlArr[1] || '',
      //   sex: this.selectMore[0] || '',
      //   industryMxId: this.selectMore[3] || '',
      // }
      // if (this.isHavaParams(params)) {
      //   this.queryMySearchVitaeList()
      // }
      // console.log(this.searchStr, this.positionCheckAllArr, this.companyName)
      this.currentPage = 1;
      if (
        !this.searchStr &&
        this.positionCheckAllArr.length == 0 &&
        !this.companyName
      ) {
        this.$message.error("请输入关键词");
      } else {
        this.queryMySearchVitaeList();
      }
    },
    async queryMySearchVitaeList() {
      // console.log(this.positionType.positionTypeId)
      let positionTypeIdList = [];
      this.positionCheckAllArr.forEach((item) => {
        positionTypeIdList.push(item.positionTypeId);
      });
      let params = {
        positionTypeIdList: positionTypeIdList,
        positionTypeId: this.positionType.positionTypeId || "",
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keyWords: this.searchStr,
        cityCode: this.cityInfo.zipcode || "",
        education: this.xl,
        startSalary: this.selectXzArr[0] || "",
        endSalary: this.selectXzArr[1] || "",
        lookWorkStatus: this.selectMore[2] || "",
        startAge: this.nlArr[0] || "",
        endAge: this.nlArr[1] || "",
        sex: this.selectMore[0] || "",
        industryMxId: this.selectMore[3] || "",
        companyName: this.companyName,
        workStatus: this.workStatus,
        experience: this.jy,
        startExperience: this.jyStart,
        endExperience: this.jyEnd,
      };
      let res = await Oxman.queryMySearchVitaeList(params);
      if (res.code == 200) {
        const list = res.data.list;
        list.forEach((item) => {
          item.workExperienceList = item.workExperienceList.splice(0, 4);
          item.educationExperienceList = item.educationExperienceList.splice(
            0,
            2
          );
        });
        this.recArr = list;
        this.total = res.data.total;

        let searchParams = { ...params };
        searchParams.xzName = this.selectMore[1];
        searchParams.positionType = this.positionType;
        searchParams.cityInfo = this.cityInfo;
        searchParams.nl = this.nl;
        searchParams.positionCheckAllArr = this.positionCheckAllArr;
        this.searchParams = searchParams;
        let savedObj = { ...searchParams };
        savedObj.industryMxIdStr = this.industryMxIdStr;
        this.savedObj = savedObj;
        // this.hasSavedObj = this.isHavaParams(savedObj);
        localStorage.setItem("searchParams", JSON.stringify(searchParams));
      }
    },
    toSave() {
      let savedObj = { ...this.searchParams };
      savedObj.industryMxIdStr = this.industryMxIdStr;
      savedObj.positionCheckStr = this.positionCheckArr.join(",");
      this.savedObj = savedObj;
      this.isShowSave = true;
      // this.hasSavedObj = this.isHavaParams(savedObj)
      // localStorage.setItem('searchParams', JSON.stringify(this.searchParams))
      // this.$message({
      //   type: 'success',
      //   message: '保存成功!',
      // })
    },
    chooseSaved(type) {
      switch (type) {
        case 1:
          this.searchParams.cityInfo = this.savedObj.cityInfo;
          break;
        case 2:
          this.searchParams.keyWords = this.savedObj.keyWords;
          break;
        case 3:
          this.searchParams.positionType = this.savedObj.positionType;
          this.searchParams.positionCheckArr = this.savedObj.positionCheckArr;
          this.searchParams.positionCheckAllArr =
            this.savedObj.positionCheckAllArr;
          this.searchParams.positionCheckStr = this.savedObj.positionCheckStr;
          break;
        case 4:
          this.searchParams.companyName = this.savedObj.companyName;
          break;
        case 5:
          this.searchParams.education = this.savedObj.education;
          break;
        case 6:
          this.searchParams.experience = this.savedObj.experience;
          break;
        case 7:
          this.searchParams.nl = this.savedObj.nl;
          this.searchParams.startAge = this.savedObj.startAge;
          this.searchParams.endAge = this.savedObj.endAge;
          break;
        case 8:
          this.searchParams.sex = this.savedObj.sex;
          break;
        case 9:
          this.searchParams.xzName = this.savedObj.xzName;
          this.searchParams.startSalary = this.savedObj.startSalary;
          this.searchParams.endSalary = this.savedObj.endSalary;
          break;
        case 10:
          this.searchParams.lookWorkStatus = this.savedObj.lookWorkStatus;
          break;
        case 11:
          this.searchParams.industryMxId = this.savedObj.industryMxId;
          this.searchParams.industryMxIdStr = this.savedObj.industryMxIdStr;
          this.industryMxIdStr = this.savedObj.industryMxIdStr;
        case 12:
          this.searchParams.workStatus = this.savedObj.workStatus;
          break;
          break;
        default:
          break;
      }
      localStorage.setItem("searchParams", JSON.stringify(this.searchParams));
      this.setSearchParams();
      this.queryMySearchVitaeList();
    },
    remove(type) {
      switch (type) {
        case 1:
          this.savedObj.cityInfo = {};
          break;
        case 2:
          this.savedObj.keyWords = "";
          break;
        case 3:
          this.savedObj.positionType = {};
          this.savedObj.positionCheckAllArr = [];
          this.savedObj.positionCheckArr = [];
          this.savedObj.positionCheckStr = "";
          break;
        case 4:
          this.savedObj.companyName = "";
          break;
        case 5:
          this.savedObj.education = "";
          break;
        case 6:
          this.savedObj.experience = "";
          break;
        case 7:
          this.savedObj.nl = "";
          this.savedObj.startAge = "";
          this.savedObj.endAge = "";
          break;
        case 8:
          this.savedObj.sex = "";
          break;
        case 9:
          this.savedObj.xzName = "";
          this.savedObj.startSalary = "";
          this.savedObj.endSalary = "";
          break;
        case 10:
          this.savedObj.lookWorkStatus = "";
          break;
        case 11:
          this.savedObj.industryMxId = "";
          this.savedObj.industryMxIdStr = "";
          this.industryMxIdStr = "";
          break;
        case 12:
          this.savedObj.workStatus = "";
          break;
        default:
          break;
      }
      this.hasSavedObj = this.isHavaParams(this.savedObj);
      this.searchParams = { ...this.savedObj };
      localStorage.setItem("searchParams", JSON.stringify(this.searchParams));
      this.setSearchParams();
      this.queryMySearchVitaeList();
    },
    currentChange(val) {
      if (val == this.currentPage) {
        return;
      }
      this.currentPage = val;
      this.queryMySearchVitaeList();
      this.$bus.$emit("EVENT_HOME_SCROLL", 0);
    },
    async queryHotCityList() {
      let params = {};
      let res = await Job.queryHotCityList(params);
      if (res.code == 200) {
        this.csArr = res.data;
        // this.cityInfo = res.data[0]
      }
    },
    setMoreArr() {
      let arr1 = this.sexArr,
        arr2 = [
          {
            id: 1,
            startSalary: 0,
            endSalary: 3,
            name: "3k以下",
          },
          {
            id: 2,
            startSalary: 3,
            endSalary: 5,
            name: "3k-5k",
          },
          {
            id: 3,
            startSalary: 5,
            endSalary: 10,
            name: "5k-10k",
          },
          {
            id: 4,
            startSalary: 10,
            endSalary: 20,
            name: "10k-20k",
          },
          {
            id: 5,
            startSalary: 20,
            endSalary: 40,
            name: "20k-40k",
          },
          {
            id: 6,
            startSalary: 40,
            endSalary: 999999,
            name: "40k以上",
          },
          // {
          //   name: '自定义',
          // },
        ],
        arr3 = this.lookWorkArr;
      let obj1 = { ...this.moreArr[0] },
        obj2 = { ...this.moreArr[1] },
        obj3 = { ...this.moreArr[2] };
      obj1.child = arr1;
      obj2.child = arr2;
      obj3.child = arr3;
      this.moreArr.splice(0, 1, obj1);
      this.moreArr.splice(1, 1, obj2);
      this.moreArr.splice(2, 1, obj3);
    },
    qieTab(type) {
      if (this.tabIndex == type) {
        return;
      }
      this.tabIndex = type;
    },
    toChooseLocation() {
      this.isShow = true;
    },
    sureLocation(item) {
      this.cityInfo = item;
      this.isShow = false;
      this.queryMySearchVitaeList();
    },
    // toChooseType() {},
    // toSearch() {},
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css");
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;
#app {
  min-width: $nx-width;
  .main {
    background: linear-gradient(
      180deg,
      rgba(36, 70, 168, 0.25) 0%,
      rgba(36, 70, 168, 0) 100%
    );
    padding: 20px 0;
    box-sizing: border-box;
    position: relative;
  }
  .jobBox {
    width: 1000px;
    margin: 0 auto;
    background: #fff;
    padding: 32px 20px;
    box-sizing: border-box;
    position: relative;
    .clearScreen {
      font-size: 14px;
      font-weight: 500;
      color: #999999;
      line-height: 20px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      bottom: 18px;
    }
    .searchJobBtnBox {
      display: flex;
      > .selBox::after {
        display: none;
      }
      > .selBox {
        min-width: 124px;
        padding: 0 12px;
        height: 48px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid rgba(36, 70, 168, 0.3);
        margin-right: 16px;
      }
    }

    .searchJobBtnBox2 {
      margin-top: 10px;
      justify-content: space-between;
      .selBoxOut {
        width: 48%;
        display: flex;
        align-items: center;
        h2 {
          color: #999999;
          font-weight: 600;
          font-size: 14px;
          margin-right: 10px;
        }
        > .selBox::after {
          display: none;
        }
        > .selBox {
          flex: 1;
          padding: 0 12px;
          height: 48px;
          background: #ffffff;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid rgba(36, 70, 168, 0.3);
        }
        .searchJobBox {
          flex: 1;
        }
        input {
          border-radius: 4px;
        }
      }
    }
    .hotJobBox {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #929ab0;
      padding: 16px 0;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      .hotJob {
        display: flex;
        margin-left: 4px;
        .hotJobItem {
          margin: 0 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
            margin-left: 2px;
          }
        }
      }
    }
    .filterBox {
      .filterItem {
        padding: 16px 0;
        font-size: 14px;
        border-bottom: 1px dotted #e8ebf0;
        .filterCon {
          display: flex;
          align-items: center;
          h2 {
            color: #999999;
            font-weight: 600;
          }
          .termBox {
            display: flex;
            align-items: center;
            .termItem {
              color: #333333;
              margin: 0 10px;
              cursor: pointer;
              position: relative;

              .active {
                color: #2446a8;
              }
              .select {
                height: 32px;
                padding: 0 12px;
                background: #f8f9fc;
                border-radius: 4px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img {
                  width: 10px;
                  height: auto;
                  margin-left: 7px;
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
                top: 35px;
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
            }
            .bx {
              min-width: 52px;
              height: 28px;
              padding: 0 12px;
              border-radius: 4px 4px 4px 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
            }
            .bx.active {
              color: #2446a8;
              background: rgba(36, 70, 168, 0.1);
            }
            .termItem:hover .selectSBox {
              display: block;
            }
          }

          .termSavedBox {
            flex-wrap: wrap;
            .termItem {
              height: 24px;
              padding: 0px 10px;
              border: 1px solid #929ab0;
              font-size: 12px;
              color: #929ab0;
              border-radius: 4px;
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              box-sizing: border-box;
              img {
                width: 15px;
                height: 15px;
                margin-left: 8px;
                cursor: pointer;
              }
            }
          }
        }
        .filterSavedCon {
          align-items: flex-start;
          h2 {
            flex-shrink: 0;
            margin-top: 5px;
          }
        }
      }
      .filterItem:last-child {
        border-bottom: none;
      }
      .moreItem {
        padding-bottom: 10px;
        .termBox {
          margin-bottom: -10px;
          .termItem {
            padding-bottom: 10px;
          }
        }
      }
    }
  }
  .jobCardBox {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .cardBox {
      width: 100%;
    }
  }
}
.recItem {
  min-height: 142px;
  padding-bottom: 10px;
  .tellHe {
    font-size: 13px;
    i {
      display: inline-block;
      margin-right: 5px;
      font-size: 14px;
    }
  }
  .callBtn {
    width: 90px;
  }
  cursor: pointer;
  .userBox {
    // img {
    //   margin-top: 10px;
    // }
    .nameBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        h2 span {
          font-size: 16px !important;
        }
        .hot {
          width: 40px;
          height: 21px;
          background: rgba(255, 53, 37, 0.1);
          border-radius: 4px 4px 4px 4px;
          color: #ff3525;
          text-align: center;
          line-height: 21px;
          font-size: 12px;
          margin-left: 12px;
        }
      }
      > p {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        margin-top: 8px;
        text-align: left;
        &:last-child {
          letter-spacing: 1px;
          line-height: 30px;
        }
      }
    }
    .experienceBox {
      flex-direction: column;
      // justify-content: flex-end;
      align-items: flex-start;
      margin-top: 0 !important;
      .qwItem {
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        h2 {
          flex-shrink: 0;
        }
        .stime {
          color: #bcbcbc;
          margin-left: 5px;
          font-size: 13px;
        }
      }
      .qwItemS {
        align-items: flex-start;
        > div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
.jsBox {
  width: 1000px;
  margin: 0 auto;
  padding: 24px 0 26px 0;
  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #222222;
    line-height: 22px;
    text-align: left;
  }
  .cardBox {
    display: flex;
    margin-top: 20px;
    .cardTabBox {
      display: flex;
    }
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
      input {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }
    }
    .cardTabItem.active {
      border: 1px solid #2446a8;
      background: rgba(36, 70, 168, 0.1);
      color: #2446a8;
    }
    .checkBox {
      display: flex;
      padding-left: 20px;
      position: relative;
    }
    .checkBox::before {
      content: "";
      display: block;
      width: 1px;
      height: 12px;
      background: #999999;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -6px;
    }
  }
}

.searchJobBox {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid rgba(36, 70, 168, 0.3);
  font-size: 16px;
  box-sizing: border-box;
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
    input::placeholder {
      color: #bec4d4 !important;
      font-size: 14px;
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
    cursor: pointer;
  }
}
.selBox::after {
  content: "";
  width: 1px;
  height: 22px;
  background: #bec4d4;
  display: block;
  position: absolute;
  top: 13px;
  right: 0;
}
.selBox {
  min-width: 124px;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  padding: 0 16px 0 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .selIcon img {
    width: 12px;
    height: 12px;
    margin-left: 10px;
  }
}
.selBoxL {
  min-width: 60px;
  margin-left: 10px;
  .selectSBox {
    width: 100px;
  }
}
.selBoxL::after {
  left: 0;
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
.selBox {
  position: relative;
}
.selBox:hover {
  .selectSBox {
    display: block;
  }
}
.selectSBox {
  width: 224px;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e8ebf0;
  border-radius: 4px;
  padding: 4px 8px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 45px;
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

.hot-city-list {
  text-align: left;
  color: #222222;
  font-weight: 500;
  font-size: 16px;
  margin: 20px 0 16px;
}

.city-list {
  text-align: left;
  .city-btn {
    display: inline-block;
    min-width: 90px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #d4d5d6;
    transition: all 0.2s linear;
    padding: 0 12px;
    box-sizing: border-box;
    margin: 0 8px 16px 8px;

    &:hover,
    &:focus {
      border: 1px solid #0470b8;
      color: #0470b8;
    }
  }
}
::v-deep .el-dialog__header {
  display: none;
}
::v-deep .el-dialog__body {
  padding: 0;
}
.dialog-content {
  position: relative;
  width: 100%;
  // height: 250px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  padding-bottom: 24px;
  .title {
    position: relative;
    padding: 24px 24px 10px 24px;
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #222222;
      display: flex;
      align-items: flex-end;
      span {
        font-size: 14px;
        color: #999999;
      }
    }
    .close-btn {
      position: absolute;
      top: 24px;
      right: 22px;
    }
  }
  .conBox {
    padding: 0 24px;
  }
}
.hintCard {
  padding: 50px 0;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 160px;
    height: auto;
    margin-right: 20px;
  }
  > div {
    margin-top: 20px;
  }
}
.saveTj {
  width: 180px;
  height: 48px;
  border: 1px solid rgba(36, 70, 168, 0.3);
  color: rgba(36, 70, 168, 0.9);
  border-radius: 4px;
  font-size: 17px;
  margin-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
}

.selBox ::v-deep .el-select {
  width: 100%;
  height: 100%;
  padding: 0 4px;
}
.selBox ::v-deep .el-select > .el-input {
  height: 100%;
}
.selBox ::v-deep .el-input--suffix .el-input__inner {
  border: none;
  height: 100% !important;
  padding: 0;
  font-size: 16px;
  margin: 0;
}
.selBox ::v-deep .el-select__input {
  margin: 0;
}
.selBox ::v-deep .el-select__tags {
  min-width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.cardp {
  line-height: 1.6;
  margin-bottom: 4px;
}
.zdyBox {
  display: flex;
  align-items: center;
  span {
    margin: 0 5px;
  }
  ::v-deep .el-input {
    width: 60px;
    padding: 0;
  }
  ::v-deep .el-input__inner {
    padding: 0 5px;
  }
}
.disBox {
  display: flex;
  button {
    margin-left: 20px;
    color: #fff;
    background: #2446a8;
    border-radius: 4px;
    z-index: 10;
  }
}
@media screen and (max-with: 76.25rem) {
}
</style>
