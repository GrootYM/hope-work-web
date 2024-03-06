<template>
  <div class="make-resume-page">
    <div class="edit-section">
      <div class="header-left">
        <el-button class="goBack" @click="goBack">返回</el-button>
        <el-input
          v-model="title"
          placeholder="请填写附件名称"
          style="max-width: 200px"
          :disabled="!isTitleEdit"
          @change="setTitle"
        ></el-input>
        <img
          src="@/assets/image/userCenter/edit-input.png"
          class="title-input"
          @click="isTitleEdit = !isTitleEdit"
        />
      </div>
      <div class="edit-content-out">
        <div class="model">
          <div class="model-name">个人信息</div>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">姓名</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.userName"
                  clearable
                  @change="savePersonInfo"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="display: flex; align-items: center">
                <img :src="personInfo.headUrl" class="head-img" alt="照片" />
                <el-upload
                  action="/api-recruit/api-common/oss/file-upload"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :limit="1"
                  :data="params"
                  accept="image/*"
                  ref="avatar"
                  :show-file-list="false"
                >
                  <div class="editBtn" slot="default">编辑</div>
                  <div
                    class="deleteBtn"
                    slot="default"
                    @click.stop="handleRemove"
                  >
                    删除
                  </div>
                </el-upload>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">期望职位</div>
              <div class="form-input">
                <el-cascader
                  v-model="personInfo.positionTypeName"
                  :options="positionTypeList"
                  style="width: 100%"
                  :show-all-levels="false"
                  clearable
                  :props="positionProps"
                  @change="savePersonInfo"
                >
                </el-cascader>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-label">性别</div>
              <div class="form-input">
                <el-select
                  style="width: 100%"
                  v-model="personInfo.sex"
                  @change="savePersonInfo"
                >
                  <el-option
                    v-for="(item, index) in sexOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">参加工作时间</div>
              <div class="form-input">
                <el-date-picker
                  type="date"
                  v-model="personInfo.joinWorkDate"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                  @change="savePersonInfo"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-label">生日</div>
              <div class="form-input">
                <el-date-picker
                  type="date"
                  v-model="personInfo.birthday"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                  @change="savePersonInfo"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">邮箱</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.email"
                  clearable
                  @change="savePersonInfo"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-label">电话</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.phone"
                  clearable
                  @change="savePersonInfo"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">微信号</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.wechat"
                  clearable
                  @change="savePersonInfo"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-label">期望城市</div>
              <div class="form-input">
                <el-select
                  v-model="personInfo.cityName"
                  placeholder="选择工作地点"
                  style="width: 100%"
                  @change="savePersonInfo"
                >
                  <el-option
                    v-for="(city, index) in cityList"
                    :key="city.id"
                    :label="city.name"
                    :value="city.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">薪资要求</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.startSalary"
                  type="number"
                  style="width: 45%"
                  @change="savePersonInfo"
                >
                  <span slot="suffix">k</span>
                </el-input>
                <span class="to-text">至</span>
                <el-input
                  v-model="personInfo.endSalary"
                  type="number"
                  style="width: 45%"
                  @change="savePersonInfo"
                >
                  <span slot="suffix">k</span>
                </el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-label">籍贯</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.hometown"
                  clearable
                  @change="savePersonInfo"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="40" class="mb-24">
            <el-col :span="12">
              <div class="form-label">政治面貌</div>
              <div class="form-input">
                <el-input
                  v-model="personInfo.politicFace"
                  clearable
                  @change="savePersonInfo"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="model">
          <div class="model-name">个人优势</div>
          <div>
            <el-input
              type="textarea"
              placeholder="您可以总结一下之前的工作成果，也可以向招聘者展示您擅长的工作技能和方向"
              v-model="personInfo.advantage"
              maxlength="200"
              show-word-limit
              rows="8"
              resize="none"
              @change="savePersonInfo"
            >
            </el-input>
          </div>
        </div>
        <div class="model">
          <div class="model-name">工作经历</div>
          <div class="show-model">
            <div
              class="content-box"
              v-if="!isEdit_1"
              @mouseover="edit_1 = true"
              @mouseout="edit_1 = false"
            >
              <div
                class="edit-btn"
                :class="edit_1 ? 'show-edit-btn' : ''"
                @click="isEdit_1 = true"
              >
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-delete" @click.stop="delExperience(1)"></i>
              </div>
              <div class="content-title">
                {{ jobExperience[0].company }}
              </div>
              <div class="sub-title">
                <div
                  class="sub-item"
                  :class="{ 'right-line': jobExperience[0].positionTypeName }"
                >
                  {{ jobExperience[0].positionTypeName }}
                </div>
                <div class="sub-item" v-if="jobExperience[0].startTime">
                  {{ jobExperience[0].startTime }}-{{
                    jobExperience[0].endTime
                  }}
                </div>
              </div>
              <div class="desc">{{ jobExperience[0].workContent }}</div>
            </div>
            <div class="edit" v-else>
              <div class="edit-header">编辑工作经历</div>
              <div class="edit-content">
                <el-row :gutter="12" style="margin-bottom: 24px">
                  <el-col :span="12">
                    <div class="input-label">公司全称</div>
                    <div class="input-content">
                      <el-input
                        v-model="jobExperience[0].company"
                        style="width: 100%"
                        placeholder="例如：华为技术有限公司"
                        clearable
                      >
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="input-label">在职时间</div>
                    <div class="input-content">
                      <el-date-picker
                        v-model="jobExperience[0].startTime"
                        type="date"
                        placeholder="入职年月"
                        style="width: 45%"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                      至
                      <el-date-picker
                        v-model="jobExperience[0].endTime"
                        type="date"
                        placeholder="离职年月"
                        style="width: 45%"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="margin-bottom: 24px">
                  <el-col :span="12">
                    <div class="input-label">所任职位</div>
                    <div class="input-content">
                      <el-cascader
                        v-model="jobExperience[0].positionTypeName"
                        :options="positionTypeList"
                        style="width: 100%"
                        :show-all-levels="false"
                        :props="positionProps"
                        clearable
                        ref="positionSelect2"
                      >
                      </el-cascader>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="input-label">工作内容</div>
                    <div class="input-content">
                      <el-input
                        type="textarea"
                        placeholder="请输入工作内容描述"
                        v-model="jobExperience[0].workContent"
                        maxlength="1600"
                        show-word-limit
                        rows="9"
                      >
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <div class="action-buttons">
                  <div class="cancel" @click="cancelEdit(1)">取消</div>
                  <div class="confirm" @click="confirmEdit(1)">完成</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="model">
          <div class="model-name">项目经历</div>
          <div class="show-model">
            <div
              class="content-box"
              v-if="!isEdit_2"
              @mouseover="edit_2 = true"
              @mouseout="edit_2 = false"
            >
              <div
                class="edit-btn"
                :class="edit_2 ? 'show-edit-btn' : ''"
                @click="isEdit_2 = true"
              >
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-delete" @click.stop="delExperience(2)"></i>
              </div>
              <div class="content-title">
                {{ proExperience[0].projectName }}
              </div>
              <div class="sub-title">
                <div
                  class="sub-item"
                  :class="{ 'right-line': proExperience[0].projectRole }"
                >
                  {{ proExperience[0].projectRole }}
                </div>
                <div class="sub-item" v-if="proExperience[0].startTime">
                  {{ proExperience[0].startTime }}-{{
                    proExperience[0].endTime
                  }}
                </div>
              </div>
              <div class="desc">{{ proExperience[0].workDescribe }}</div>
            </div>
            <div class="edit" v-else>
              <div class="edit-header">编辑项目经历</div>
              <div class="edit-content">
                <el-row :gutter="12" style="margin-bottom: 24px">
                  <el-col :span="12">
                    <div class="input-label">项目名称</div>
                    <div class="input-content">
                      <el-input
                        v-model="proExperience[0].projectName"
                        style="width: 100%"
                        placeholder="请填写项目名称"
                        clearable
                      >
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="input-label">项目周期</div>
                    <div class="input-content">
                      <el-date-picker
                        v-model="proExperience[0].startTime"
                        type="date"
                        placeholder="开始时间"
                        style="width: 45%"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                      至
                      <el-date-picker
                        v-model="proExperience[0].endTime"
                        type="date"
                        placeholder="结束时间"
                        style="width: 45%"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="margin-bottom: 24px">
                  <el-col :span="12">
                    <div class="input-label">项目角色</div>
                    <div class="input-content">
                      <el-input
                        v-model="proExperience[0].projectRole"
                        style="width: 100%"
                        placeholder="请填写您所担任的项目角色"
                        clearable
                      >
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="input-label">工作描述</div>
                    <div class="input-content">
                      <el-input
                        type="textarea"
                        placeholder="请输入工作描述"
                        v-model="proExperience[0].workDescribe"
                        maxlength="1600"
                        show-word-limit
                        rows="9"
                      >
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <div class="action-buttons">
                  <div class="cancel" @click="cancelEdit(2)">取消</div>
                  <div class="confirm" @click="confirmEdit(2)">完成</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="model">
          <div class="model-name">教育经历</div>
          <div class="show-model">
            <div
              class="content-box"
              v-if="!isEdit_3"
              @mouseover="edit_3 = true"
              @mouseout="edit_3 = false"
            >
              <div
                class="edit-btn"
                :class="edit_3 ? 'show-edit-btn' : ''"
                @click="isEdit_3 = true"
              >
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-delete" @click.stop="delExperience(3)"></i>
              </div>
              <div class="content-title">
                {{ eduExperience[0].schoolName }}
              </div>
              <div class="sub-title">
                <div
                  class="sub-item"
                  :class="{ 'right-line': eduExperience[0].education }"
                >
                  {{ eduExperience[0].education }}
                </div>
                <div
                  class="sub-item"
                  :class="{ 'right-line': eduExperience[0].major }"
                >
                  {{ eduExperience[0].major }}
                </div>
                <div class="sub-item" v-if="eduExperience[0].startTime">
                  {{ eduExperience[0].startTime }}-{{
                    eduExperience[0].endTime
                  }}
                </div>
              </div>
              <div class="desc">{{ eduExperience[0].honor }}</div>
            </div>
            <div class="edit" v-else>
              <div class="edit-header">编辑教育经历</div>
              <div class="edit-content">
                <el-row :gutter="12" style="margin-bottom: 24px">
                  <el-col :span="12">
                    <div class="input-label">学校</div>
                    <div class="input-content">
                      <el-input v-model="eduExperience[0].schoolName" clearable>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="input-label">学历</div>
                    <div class="input-content">
                      <el-select
                        v-model="eduExperience[0].education"
                        placeholder="选择学历"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="(edu, index) in educationList"
                          :value="edu.label"
                          :label="edu.label"
                          :key="edu.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="margin-bottom: 24px">
                  <el-col :span="12">
                    <div class="input-label">所学专业</div>
                    <div class="input-content">
                      <el-input v-model="eduExperience[0].major" clearable>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="input-label">时间</div>
                    <div class="input-content">
                      <el-date-picker
                        v-model="eduExperience[0].startTime"
                        type="date"
                        placeholder="入学年月"
                        style="width: 45%"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                      至
                      <el-date-picker
                        v-model="eduExperience[0].endTime"
                        type="date"
                        placeholder="毕业年月"
                        style="width: 45%"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </div>
                  </el-col>
                </el-row>
                <el-input
                  type="textarea"
                  placeholder="可填写在校期间学习到的主要技能及获得的荣誉"
                  v-model="eduExperience[0].honor"
                  maxlength="200"
                  show-word-limit
                  rows="9"
                >
                </el-input>
                <div class="action-buttons">
                  <div class="cancel" @click="cancelEdit(3)">取消</div>
                  <div class="confirm" @click="confirmEdit(3)">完成</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-section">
      <div class="header-right">
        <div :class="{ 'has-saved': hasSaved }" class="saved-text">
          <i class="el-icon-circle-check"></i>
          草稿保存成功
        </div>
        <div class="action-btns">
          <div class="download-btn" @click="pdfDownload">下载</div>
          <!-- <div class="upload-btn">上传至嗨聘</div> -->
        </div>
      </div>
      <div class="preview-content">
        <div class="preview-page" ref="pdf">
          <div class="top-section">
            <div class="basic-info">
              <div class="user-name">{{ personInfo.userName }}</div>
              <div class="user-detail">
                <div style="display: flex; margin-bottom: 12px">
                  <div class="right-bd">{{ personInfo.sex }}</div>
                  <div class="right-bd">
                    年龄：{{ personInfo.birthday | ageFilter }}岁
                  </div>
                  <div>{{ personInfo.phone }}</div>
                </div>
                <div style="display: flex">
                  <div class="right-bd">
                    {{ personInfo.joinWorkDate | ageFilter }}年工作经验
                  </div>
                  <div class="right-bd">
                    求职意向：{{ personInfo.positionTypeName }}
                  </div>
                  <div class="right-bd">
                    期望薪资：{{ personInfo.startSalary }}-{{
                      personInfo.endSalary
                    }}K
                  </div>
                  <div>期望城市：{{ personInfo.cityName }}</div>
                </div>
              </div>
            </div>
            <img class="user-head-img" :src="personInfo.headUrl" />
          </div>
          <div class="section">
            <div class="section-title">个人优势</div>
            <div class="section-content">
              <p class="desc-text">{{ personInfo.advantage }}</p>
            </div>
          </div>
          <div class="section">
            <div class="section-title">工作经历</div>
            <div class="section-content">
              <div class="first">
                <div>
                  <span class="main-text" v-if="jobExperience[0].company">
                    {{ jobExperience[0].company }}
                  </span>
                  <span
                    class="sub-text"
                    v-if="jobExperience[0].positionTypeName"
                  >
                    {{ jobExperience[0].positionTypeName }}
                  </span>
                </div>
                <div class="time-text" v-if="jobExperience[0].startTime">
                  {{ jobExperience[0].startTime }}-{{
                    jobExperience[0].endTime
                  }}
                </div>
              </div>
              <div class="desc-text" v-if="jobExperience[0].workContent">
                {{ jobExperience[0].workContent }}
              </div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">项目经历</div>
            <div class="section-content">
              <div class="first">
                <div>
                  <span class="main-text" v-if="proExperience[0].projectName">
                    {{ proExperience[0].projectName }}
                  </span>
                  <span class="sub-text" v-if="proExperience[0].projectRole">
                    {{ proExperience[0].projectRole }}
                  </span>
                </div>
                <div class="time-text" v-if="proExperience[0].startTime">
                  {{ proExperience[0].startTime }}-{{
                    proExperience[0].endTime
                  }}
                </div>
              </div>
              <div class="desc-text" v-if="proExperience[0].workDescribe">
                {{ proExperience[0].workDescribe }}
              </div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">教育经历</div>
            <div class="section-content">
              <div class="first">
                <div>
                  <span class="main-text" v-if="eduExperience[0].schoolName">
                    {{ eduExperience[0].schoolName }}
                  </span>
                  <span class="sub-text" v-if="eduExperience[0].education">
                    {{ eduExperience[0].education }}
                  </span>
                  <span class="sub-text" v-if="eduExperience[0].major">
                    {{ eduExperience[0].major }}
                  </span>
                </div>
                <div class="time-text" v-if="eduExperience[0].startTime">
                  {{ eduExperience[0].startTime }}-{{
                    eduExperience[0].endTime
                  }}
                </div>
              </div>
              <div class="desc-text" v-if="eduExperience[0].honor">
                {{ eduExperience[0].honor }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@/api/home";
import Auth from "@/api/auth";
import { mapGetters } from "vuex";
import moment from "moment";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";

export default {
  filters: {
    ageFilter(value) {
      return value ? moment().diff(value, "years") : "";
    },
  },
  data() {
    return {
      hasSaved: false,
      isEdit_1: false,
      isEdit_2: false,
      isEdit_3: false,
      edit_1: false,
      edit_2: false,
      edit_3: false,
      isTitleEdit: false,
      title: "",
      personInfo: {
        userName: "",
        headUrl: "",
        positionTypeName: "",
        sex: "",
        joinWorkDate: "",
        birthday: "",
        advantage: "",
        email: "",
        phone: "",
        wechat: "",
        cityName: "",
        startSalary: "",
        endSalary: "",
        hometown: "",
        politicFace: "",
      },
      jobExperience: [
        {
          company: "",
          positionTypeName: "",
          startTime: "",
          endTime: "",
          workContent: "",
        },
      ],
      proExperience: [
        {
          projectName: "",
          startTime: "",
          endTime: "",
          projectRole: "",
          workDescribe: "",
        },
      ],
      eduExperience: [
        {
          schoolName: "",
          startTime: "",
          endTime: "",
          education: "",
          major: "",
          honor: "",
        },
      ],
      positionTypeList: [],
      cityList: [],
      sexOptions: [
        { value: "1", label: "男" },
        { value: "2", label: "女" },
      ],
      positionProps: {
        emitPath: false,
        value: "label",
      },
      fileList: [],
      params: {
        type: 1,
      },
      educationList: [
        { value: "0", label: "不限" },
        { value: "1", label: "小学" },
        { value: "2", label: "初中" },
        { value: "3", label: "高中" },
        { value: "4", label: "大专" },
        { value: "5", label: "本科" },
        { value: "6", label: "硕士" },
        { value: "7", label: "博士" },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    goBack() {
      this.routerGo(-1);
    },
    setTitle() {
      this.hasSaved = true;
      sessionStorage.setItem("resumeTitle", this.title);
      setTimeout(() => {
        this.hasSaved = false;
      }, 3500);
    },
    savePersonInfo() {
      this.hasSaved = true;
      sessionStorage.setItem("personInfo", JSON.stringify(this.personInfo));
      setTimeout(() => {
        this.hasSaved = false;
      }, 3500);
    },
    delExperience(flag) {
      switch (flag) {
        case 1:
          this.jobExperience = [
            {
              company: "",
              positionTypeName: "",
              startTime: "",
              endTime: "",
              workContent: "",
            },
          ];
          this.confirmEdit(1);
          break;
        case 2:
          this.proExperience = [
            {
              projectName: "",
              startTime: "",
              endTime: "",
              projectRole: "",
              workDescribe: "",
            },
          ];
          this.confirmEdit(2);
          break;
        case 3:
          this.eduExperience = [
            {
              schoolName: "",
              startTime: "",
              endTime: "",
              education: "",
              major: "",
              honor: "",
            },
          ];
          this.confirmEdit(3);
          break;
      }
    },
    cancelEdit(flag) {
      switch (flag) {
        case 1:
          this.isEdit_1 = false;
          let tempJob = JSON.parse(sessionStorage.getItem("jobExperience"));
          if (tempJob) this.jobExperience = Object.assign({}, tempJob);
          break;
        case 2:
          this.isEdit_2 = false;
          let tempPro = JSON.parse(sessionStorage.getItem("proExperience"));
          if (tempPro) this.proExperience = Object.assign({}, tempPro);
          break;
        case 3:
          this.isEdit_3 = false;
          let tempEdu = JSON.parse(sessionStorage.getItem("eduExperience"));
          if (tempEdu) this.eduExperience = Object.assign({}, tempEdu);
          break;
      }
    },
    confirmEdit(flag) {
      switch (flag) {
        case 1:
          this.isEdit_1 = false;
          sessionStorage.setItem(
            "jobExperience",
            JSON.stringify(this.jobExperience)
          );
          break;
        case 2:
          this.isEdit_2 = false;
          sessionStorage.setItem(
            "proExperience",
            JSON.stringify(this.proExperience)
          );
          break;
        case 3:
          this.isEdit_3 = false;
          sessionStorage.setItem(
            "eduExperience",
            JSON.stringify(this.eduExperience)
          );
          break;
      }
      this.hasSaved = true;
      setTimeout(() => {
        this.hasSaved = false;
      }, 3500);
    },
    handleRemove(file) {
      this.fileList = [];
      this.personInfo.headUrl = "";
      this.$refs.avatar.clearFiles();
    },
    handleSuccess(response, file, fileList) {
      this.personInfo.headUrl = response.data.url;
    },
    async getPositonType() {
      let res = await Home.positionType({});
      if (res.code == 200) {
        let positionTypeList = res.data;
        positionTypeList.forEach((p) => {
          p.value = p.pid;
          p.label = p.pname;
          if (p.childLists && p.childLists.length) {
            p.children = p.childLists;
            p.children.forEach((c) => {
              c.value = c.id;
              c.label = c.typeName;
              if (c.subChildLists && c.subChildLists.length) {
                c.children = c.subChildLists;
                c.children.forEach((s) => {
                  s.value = s.subId;
                  s.label = s.subTypeName;
                });
              }
            });
          }
        });
        this.positionTypeList = positionTypeList;
      }
    },
    async getCityOptions() {
      let res = await Auth.queryHotCityList({});
      this.cityList = res.data;
    },
    init() {
      // 先查看用户是否暂存了简历信息
      let title = sessionStorage.getItem("resumeTitle");
      let tempPersonInfo = JSON.parse(sessionStorage.getItem("personInfo"));
      let tempJob = JSON.parse(sessionStorage.getItem("jobExperience"));
      let tempPro = JSON.parse(sessionStorage.getItem("proExperience"));
      let tempEdu = JSON.parse(sessionStorage.getItem("eduExperience"));
      if (title) this.title = title;
      if (tempPersonInfo) this.personInfo = Object.assign({}, tempPersonInfo);
      if (tempJob) this.jobExperience = Object.assign({}, tempJob);
      if (tempPro) this.proExperience = Object.assign({}, tempPro);
      if (tempEdu) this.eduExperience = Object.assign({}, tempEdu);
    },
    pdfDownload() {
      const _this = this;
      let dom = this.$refs.pdf;
      html2canvas(dom, {
        useCORS: true, //是否尝试使用CORS从服务器加载图像
        allowTaint: true,
        dpi: 300, //解决生产图片模糊
        scale: 3, //清晰度--放大倍数
      }).then(function (canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = (contentWidth / 592.28) * 841.89; // 一页pdf显示html页面生成的canvas高度;
        let leftHeight = contentHeight; //未生成pdf的html页面高度
        let position = 0; //pdf页面偏移
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        // let imgWidth = 595.28
        let imgWidth = 560.28; //宽度
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        let PDF = new JsPDF("", "pt", "a4");

        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 20, 20, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 20, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        PDF.save(
          `${_this.title || _this.personInfo.userName || "个人简历"}.pdf`
        ); //下载标题
        setTimeout(() => {
          _this.$message({
            message: "您的简历已下载完毕",
            type: "success",
            duration: 2000,
            customClass: "my-message",
          });
        }, 3000);
      });
    },
  },
  mounted() {
    if (!this.personInfo.headUrl) {
      this.personInfo.headUrl = this.userInfo.headUrl;
    }
  },
  created() {
    this.init();
    this.getPositonType();
    this.getCityOptions();
  },
};
</script>

<style lang="scss" scoped>
.make-resume-page {
  width: 100%;
  min-height: 100vh;
  display: flex;

  .edit-section {
    width: 50%;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);

    .header-left {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #dadde2;

      .goBack {
        position: absolute;
        top: 9px;
        left: 40px;
      }

      .title-input {
        width: 16px;
        height: 16px;
        margin-left: 12px;
        cursor: pointer;
      }

      &::v-deep .el-input__inner {
        border: none;
      }
    }

    .edit-content-out {
      height: calc(100vh - 51px);
      overflow-y: scroll;
      box-sizing: border-box;
      padding: 0 40px 40px;

      .model {
        position: relative;
        .model-name {
          font-size: 20px;
          font-weight: 600;
          color: #3d3d3d;
          margin-bottom: 12px;
          margin-top: 60px;
          text-align: left;
        }
        &::v-deep .el-textarea__inner {
          background-color: #f3f5f9;
        }
      }

      .head-img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }
    }
  }

  .preview-section {
    flex: 1;
    background-color: rgba(36, 70, 168, 0.06);

    .header-right {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom: 1px solid #dadde2;
      padding: 0 40px;

      .saved-text {
        font-size: 14px;
        color: #666666;
        display: none;
        transition: display 0.8s linear;
        position: fixed;
        top: 15px;
        left: calc(50% + 40px);
      }

      .has-saved {
        display: block;
      }

      .action-btns {
        display: flex;

        .download-btn {
          width: 72px;
          height: 30px;
          line-height: 30px;
          background: #f2f4fa;
          border-radius: 4px;
          border: 1px solid #2446a8;
          font-size: 14px;
          color: #2446a8;
          margin-right: 16px;
          cursor: pointer;
        }

        .upload-btn {
          width: 170px;
          height: 40px;
          line-height: 40px;
          background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
          border-radius: 4px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }

    .preview-content {
      padding: 2.87vh 7% 0;

      .preview-page {
        background: #ffffff;
        height: 77.96vh;
        overflow-y: scroll;
        padding: 2.96vh;

        .top-section {
          display: flex;

          .basic-info {
            flex: 1;
            text-align: left;
            .user-name {
              font-size: 24px;
              font-weight: 600;
              color: #222222;
              height: 58px;
              width: 80px;
            }

            .user-detail {
              font-size: 12px;
              color: #333333;

              div {
                div {
                  padding: 0 4px;
                  &:nth-child(1) {
                    padding-left: 0;
                  }
                }
              }
            }

            .right-bd {
              border-right: 1px solid #dadde2;
            }
          }

          .user-head-img {
            width: 78px;
            height: 90px;
          }
        }

        .section {
          .section-title {
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: #222222;
            padding-bottom: 6px;
            border-bottom: 1px solid #dadde2;
            margin-top: 16px;
          }

          .section-content {
            position: relative;
            padding-top: 6px;
            font-size: 10px;
            color: #333333;
            text-align: left;

            .first {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 4px;
              line-height: 26px;
              height: 26px;
            }

            .main-text {
              font-size: 12px;
              font-weight: 600;
              color: #222222;
            }

            .sub-text {
              font-size: 12px;
              margin-left: 10px;
            }

            .time-text {
              font-size: 12px;
              color: #999999;
            }

            .desc-text {
              font-size: 10px;
              white-space: pre-wrap;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
}

.form-label {
  text-align: left;
  font-size: 14px;
  color: #666666;
  margin-bottom: 12px;
}

.form-input {
  .to-text {
    font-size: 14px;
    color: #3d3d3d;
    margin: 0 5px;
  }
  &::v-deep .el-input__inner {
    border: none;
    width: 100%;
    height: 40px;
    background: #f3f5f9;
    border-radius: 4px;
  }
}

.mb-24 {
  margin-bottom: 24px;
}

::v-deep .el-input__suffix {
  display: block;
  line-height: 40px;
}

.editBtn {
  font-size: 14px;
  color: #2446a8;
}

.deleteBtn {
  margin-top: 8px;
  font-size: 14px;
  color: #929ab0;
}

.content-box {
  border-radius: 4px;
  border: 1px solid #dadde2;
  padding: 24px;
  text-align: left;

  .content-title {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }

  .sub-title {
    display: flex;
    margin: 24px 0 24px;

    .sub-item {
      font-size: 14px;
      color: #666666;
      padding: 0 16px 0 16px;

      &:first-child {
        padding-left: 0;
      }
    }

    .right-line {
      border-right: 1px solid #dadde2;
    }
  }

  .desc {
    font-size: 14px;
    color: #666666;
    white-space: pre-wrap;
  }
}

.edit {
  background: rgba(36, 70, 168, 0.05);
  padding: 32px 24px 20px;

  .edit-header {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    color: #3d3d3d;
    margin-bottom: 32px;
  }

  .edit-content {
    padding: auto 0 !important;
    .input-label {
      text-align: left;
      font-size: 14px;
      color: #666666;
      margin-bottom: 12px;
    }
    .action-buttons {
      padding-top: 24px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;

      .cancel {
        cursor: pointer;
        width: 100px;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #dadde2;
        font-size: 14px;
        color: #333333;
      }

      .confirm {
        cursor: pointer;
        margin-left: 16px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}

.edit-btn {
  text-align: right;
  display: none;
  position: absolute;
  top: 40px;
  right: 46px;
  width: 200px;
  height: 100px;
  z-index: 1;
  cursor: pointer;

  .el-icon-edit-outline {
    font-size: 24px;
    cursor: pointer;
  }

  .el-icon-delete {
    margin-left: 16px;
    font-size: 24px;
    cursor: pointer;
  }
}

.show-edit-btn {
  display: block;
}
</style>
<style lang="scss">
.my-message {
  height: 60px;
  min-width: 420px;
  top: 50% !important;
  left: 50%;
  right: unset;
  transform: translateY(-50%) translateX(-50%) !important;

  .el-icon-success {
    font-size: 28px;
  }

  .el-message__content {
    font-size: 20px;
  }
}
</style>
