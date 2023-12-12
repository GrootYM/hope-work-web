<template>
  <div>
    <div class="online-layout">
      <div class="nav">
        <div :class="isOver ? 'nav-fixed' : ''">
          <div class="nav-title">简历目录</div>
          <el-menu default-active="0" class="el-menu-vertical-demo">
            <el-menu-item v-for="(item, index) in menuList" :key="index" :index="`${index}`" @click="goto(item)">
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="resume">
        <div class="resume-header">
          我的在线简历
          <div class="action" @click="previewInfo">预览</div>
        </div>
        <div class="basic-info" :id="menuList[0].to">
          <div class="show" v-if="!isEdit_1" @mouseover="edit_1 = true" @mouseleave="edit_1 = false">
            <div
              class="edit-btn"
              :class="edit_1 ? 'show-edit-btn' : ''"
              @click="
                isEdit_1 = true
                edit_1 = false
              "
              style="top: 4px"
            >
              <i class="el-icon-edit-outline"></i>
            </div>
            <div class="base">
              <div class="left-part">
                <div class="name">{{ basicInfo.userName }}</div>
                <div style="display: flex">
                  <div class="field">
                    <img src="@/assets/image/userCenter/icon-bag.png" class="base-icon" />
                    {{ basicInfo.workExperience }}
                  </div>
                  <div class="field">
                    <img src="@/assets/image/userCenter/icon-hat.png" class="base-icon" />
                    {{ educationDict[basicInfo.education] }}
                  </div>
                  <div class="field" style="border: none">
                    <img src="@/assets/image/userCenter/icon-person.png" class="base-icon" />
                    {{ lookWorkStatusDict[basicInfo.lookWorkStatus] }}
                  </div>
                </div>
                <div style="display: flex">
                  <div class="field">
                    <img src="@/assets/image/userCenter/icon-clock.png" class="base-icon" />
                    {{ basicInfo.joinWorkDate }}
                  </div>
                  <div class="field">
                    <img src="@/assets/image/userCenter/icon-phone.png" class="base-icon" />
                    {{ basicInfo.phone }}
                  </div>
                  <div class="field" style="border: none">
                    {{ hopePositionTypeDict[basicInfo.hopePositionType] }}
                  </div>
                </div>
              </div>
              <div class="right-part">
                <img
                  v-if="basicInfo.headPath"
                  :src="basicInfo.headPath"
                  style="width: 64px; height: 64px; border-radius: 50%"
                />
                <img
                  v-if="!basicInfo.headPath"
                  src="https://hope-service.oss-cn-beijing.aliyuncs.com/uploads/e3cf9840-7f29-4901-b812-f587e8d7e6b7.jpeg"
                  style="width: 64px; height: 64px; border-radius: 50%"
                />
              </div>
            </div>
          </div>
          <div class="edit" v-else>
            <div class="edit-header">编辑个人信息</div>
            <div class="edit-content">
              <el-row style="margin-bottom: 24px">
                <el-upload
                  ref="headUpload"
                  action="/api-recruit/api-common/oss/file-upload"
                  :on-success="handleHeadSuccess"
                  :on-exceed="handleHeadExceed"
                  :file-list="fileList"
                  :limit="1"
                  list-type="picture-card"
                  :class="basicInfo.headPath ? 'upload-avatar' : ''"
                >
                  <img class="avatar-upload" src="@/assets/image/login/camera.png" />
                  <div slot="file" slot-scope="{ file }">
                    <img class="avatar-upload" :src="file.url" />
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-delete" @click="handleHeadRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-row>
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">姓名</div>
                  <div class="input-content">
                    <el-input v-model="basicInfo.userName" clearable> </el-input>
                    <div class="el-form-item__error" v-if="errorUserName">请填写姓名</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">当前求职状态</div>
                  <div class="input-content">
                    <el-select style="width: 100%" v-model="basicInfo.lookWorkStatus">
                      <el-option
                        v-for="(item, index) in jobOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="errorLookWorkStatus">请选择当前求职状态</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">性别</div>
                  <div class="input-content">
                    <el-select style="width: 100%" v-model="basicInfo.sex">
                      <el-option
                        v-for="(item, index) in sexOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="errorSex">请选择性别</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">我的牛人身份</div>
                  <div class="input-content">
                    <el-select v-model="basicInfo.userJobStatus" style="width: 100%">
                      <el-option
                        v-for="(item, index) in userJobStatusOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="errorUserJobStatus">请选择身份</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">生日</div>
                  <div class="input-content">
                    <el-date-picker
                      type="date"
                      v-model="basicInfo.birthday"
                      style="width: 100%"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <div class="el-form-item__error" v-if="errorBirthday">请选择生日</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">电话</div>
                  <div class="input-content">
                    <el-input v-model="basicInfo.phone" disabled> </el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">参加工作时间</div>
                  <div class="input-content">
                    <el-date-picker
                      type="date"
                      v-model="basicInfo.joinWorkDate"
                      style="width: 100%"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <div class="el-form-item__error" v-if="errorJoinWorkDate">请选择参加工作时间</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">微信号（选填）</div>
                  <div class="input-content">
                    <el-input v-model="basicInfo.wechat"> </el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="12">
                <el-col :span="12">
                  <div class="input-label">邮箱（选填）</div>
                  <div class="input-content">
                    <el-input v-model="basicInfo.email" clearable> </el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">求职类型</div>
                  <div class="input-content">
                    <el-select v-model="basicInfo.hopePositionType" style="width: 100%">
                      <el-option
                        v-for="(item, index) in hopePositionTypeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
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
        <div class="advantage" :id="menuList[1].to">
          <div class="show" v-if="!isEdit_2" @mouseover="edit_2 = true" @mouseleave="edit_2 = false">
            <div class="edit-btn" :class="edit_2 ? 'show-edit-btn' : ''" @click="isEdit_2 = true">
              <i class="el-icon-edit-outline"></i>
            </div>
            <div class="info-header">
              <div class="side-bar"></div>
              <div class="title">个人优势</div>
            </div>
            <div class="detail-text">{{ basicInfo.advantage }}</div>
          </div>
          <div class="edit" v-else>
            <div class="edit-header">编辑个人优势</div>
            <div class="edit-content">
              <div style="position: relative">
                <el-input
                  type="textarea"
                  placeholder="您可以总结一下之前的工作成果，也可以向招聘者展示您擅长的工作技能和方向"
                  v-model="basicInfo.advantage"
                  maxlength="200"
                  show-word-limit
                  rows="9"
                >
                </el-input>
                <div class="el-form-item__error" v-if="errorAdvantage">请填写优势</div>
              </div>
              <div class="action-buttons">
                <div class="cancel" @click="cancelEdit(2)">取消</div>
                <div class="confirm" @click="confirmEdit(2)">完成</div>
              </div>
            </div>
          </div>
        </div>
        <div class="expected-position" :id="menuList[2].to">
          <div class="show" v-if="!isEdit_3" @mouseover="edit_3 = true" @mouseleave="edit_3 = false">
            <div class="edit-btn" :class="edit_3 ? 'show-edit-btn' : ''" @click="isEdit_3 = true">
              <i class="el-icon-edit-outline"></i>
            </div>
            <div class="info-header">
              <div class="side-bar"></div>
              <div class="title">期望职位</div>
            </div>
            <div style="display: flex; padding-top: 24px">
              <div class="field" v-if="basicInfo.positionTypeId">
                <img src="@/assets/image/userCenter/icon-tie.png" class="base-icon" />
                {{ basicInfo.positionTypeName }}
              </div>
              <div class="field" v-if="basicInfo.startSalary || basicInfo.endSalary">
                <img src="@/assets/image/userCenter/icon-money.png" class="base-icon" />
                {{ basicInfo.startSalary }}-{{ basicInfo.endSalary }}k
              </div>
              <div class="field" v-if="basicInfo.industryMxId">
                <img src="@/assets/image/userCenter/icon-analysis.png" class="base-icon" />
                {{ basicInfo.industryMxName }}
              </div>
              <div class="field" v-if="basicInfo.cityName" style="border: none">
                <img src="@/assets/image/userCenter/icon-location.png" class="base-icon" />
                {{ basicInfo.cityName }}
              </div>
            </div>
          </div>
          <div class="edit" v-else>
            <div class="edit-header">编辑期望职位</div>
            <div class="edit-content">
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">行业</div>
                  <div class="input-content">
                    <el-select
                      ref="industrySelect1"
                      v-model="basicInfo.industryMxId"
                      placeholder="选择行业"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="(industry, index) in industryList"
                        :key="industry.id"
                        :label="industry.industryName"
                        :value="industry.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">职位类型</div>
                  <div class="input-content">
                    <el-cascader
                      ref="positionSelect1"
                      v-model="basicInfo.positionTypeId"
                      :options="positionTypeList"
                      style="width: 100%; height: 40px"
                      :show-all-levels="false"
                      :props="positionProps"
                      clearable
                    >
                    </el-cascader>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="12">
                <el-col :span="12">
                  <div class="input-label">薪资范围</div>
                  <div class="input-content">
                    <el-input
                      v-model.number="basicInfo.startSalary"
                      oninput="value=value.replace(/^0|[^0-9]/g,'')"
                      type="number"
                      style="width: 49.5%"
                    >
                      <span slot="suffix">k</span>
                    </el-input>
                    <el-input
                      v-model.number="basicInfo.endSalary"
                      oninput="value=value.replace(/^0|[^0-9]/g,'')"
                      type="number"
                      style="width: 49.5%; margin-left: 1%"
                    >
                      <span slot="suffix">k</span>
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">工作地点</div>
                  <div class="input-content">
                    <el-select
                      ref="citySelect1"
                      v-model="basicInfo.cityCode"
                      placeholder="选择工作地点"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="(city, index) in cityList"
                        :key="city.zipcode"
                        :label="city.name"
                        :value="city.zipcode"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <div class="action-buttons">
                <div class="cancel" @click="cancelEdit(3)">取消</div>
                <div class="confirm" @click="confirmEdit(3)">完成</div>
              </div>
            </div>
          </div>
        </div>
        <div class="work-experience" :id="menuList[3].to">
          <div class="show" v-if="!isEdit_4" @mouseover="edit_4 = true" @mouseleave="edit_4 = false">
            <div
              v-if="jobExperience.length && jobExperience.length < 3"
              class="edit-btn add-icon"
              :class="edit_4 ? 'show-edit-btn add-btn' : ''"
              @click="onAddJob"
            >
              <i class="el-icon-plus"></i>
              <div>新增</div>
            </div>
            <div class="info-header">
              <div class="side-bar"></div>
              <div class="title">工作经历</div>
            </div>
            <div class="career" v-for="(item, index) in jobExperience" :key="index" v-show="item.company">
              <div class="edit-btn show-edit-btn">
                <i class="el-icon-edit-outline" @click.stop="editJobItem(index)"></i>
                <i class="el-icon-delete" @click.stop="delJobItem(index)"></i>
              </div>
              <div class="name-area">
                <span class="name">{{ item.company }}</span>
                <span class="time">{{ item.startTime }}~{{ item.endTime }}</span>
              </div>
              <div class="type-area">
                <span class="type">{{ item.positionTypeName }}</span>
              </div>
              <p class="content-area">
                <span style="font-size: 16px; font-weight: 600; color: #333333">内容：</span>{{ item.workContent }}
              </p>
              <div class="tags">
                <div class="tag" v-for="(skill, i) in item.skillList" :key="i">
                  {{ skill.labelName }}
                </div>
              </div>
            </div>
          </div>
          <div class="edit" v-else>
            <div class="edit-header">{{ isJobAdd ? '新增' : '编辑' }}工作经历</div>
            <div class="edit-content">
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">公司全称</div>
                  <div class="input-content">
                    <el-input
                      v-model="jobInfoItem.company"
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
                      v-model="jobInfoItem.startTime"
                      type="date"
                      placeholder="入职年月"
                      style="width: 45%"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      v-model="jobInfoItem.endTime"
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
                      v-model="jobInfoItem.positionTypeId"
                      :options="positionTypeList"
                      style="width: 100%"
                      :show-all-levels="false"
                      :props="positionProps"
                      clearable
                      ref="positionSelect2"
                      @change="posChange"
                    >
                    </el-cascader>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">技能</div>
                  <div class="input-content">
                    <el-select
                      v-model="chosenSkills"
                      placeholder="请选择技能"
                      style="width: 100%"
                      multiple
                      :multiple-limit="3"
                      @change="selectSkills"
                    >
                      <el-option v-for="(opt, index) in skills" :key="opt.id" :label="opt.labelName" :value="opt.id">
                      </el-option>
                    </el-select>
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
                      v-model="jobInfoItem.workContent"
                      maxlength="1600"
                      show-word-limit
                      rows="9"
                    >
                    </el-input>
                  </div>
                </el-col>
              </el-row>
              <div class="action-buttons">
                <div class="cancel" @click="cancelEdit(4)">取消</div>
                <div class="confirm" @click="confirmEdit(4)">完成</div>
              </div>
            </div>
          </div>
        </div>
        <div class="project-experience" :id="menuList[4].to">
          <div class="show" v-if="!isEdit_5" @mouseover="edit_5 = true" @mouseleave="edit_5 = false">
            <div
              v-if="proExperience.length && proExperience.length < 3"
              class="edit-btn add-icon"
              :class="edit_5 ? 'show-edit-btn add-btn' : ''"
              @click="onAddPro"
            >
              <i class="el-icon-plus"></i>
              <div>新增</div>
            </div>
            <div class="info-header">
              <div class="side-bar"></div>
              <div class="title">项目经历</div>
            </div>
            <div class="career" v-for="(item, index) in proExperience" :key="index" v-show="item.projectName">
              <div class="edit-btn show-edit-btn">
                <i class="el-icon-edit-outline" @click.stop="editProItem(index)"></i>
                <i class="el-icon-delete" @click.stop="delProItem(index)"></i>
              </div>
              <div class="name-area">
                <span class="name">{{ item.projectName }}</span>
                <span class="time">{{ item.startTime }}~{{ item.endTime }}</span>
              </div>
              <div class="type-area">
                <span class="type">{{ item.projectRole }}</span>
              </div>
              <p class="content-area">
                <span style="font-size: 16px; font-weight: 600; color: #333333">内容：</span>{{ item.workDescribe }}
              </p>
            </div>
          </div>
          <div class="edit" v-else>
            <div class="edit-header">{{ isProAdd ? '新增' : '编辑' }}项目经历</div>
            <div class="edit-content">
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">项目名称</div>
                  <div class="input-content">
                    <el-input
                      v-model="proInfoItem.projectName"
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
                      v-model="proInfoItem.startTime"
                      type="date"
                      placeholder="开始时间"
                      style="width: 45%"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      v-model="proInfoItem.endTime"
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
                      v-model="proInfoItem.projectRole"
                      style="width: 100%"
                      placeholder="请填写您所担任的项目角色"
                      clearable
                    >
                    </el-input>
                  </div>
                </el-col>
                <el-col :span="12"> </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="input-label">工作描述</div>
                  <div class="input-content">
                    <el-input
                      type="textarea"
                      placeholder="请输入工作描述"
                      v-model="proInfoItem.workDescribe"
                      maxlength="1600"
                      show-word-limit
                      rows="9"
                    >
                    </el-input>
                  </div>
                </el-col>
              </el-row>
              <div class="action-buttons">
                <div class="cancel" @click="cancelEdit(5)">取消</div>
                <div class="confirm" @click="confirmEdit(5)">完成</div>
              </div>
            </div>
          </div>
        </div>
        <div class="education-experience" :id="menuList[5].to">
          <div class="show" v-if="!isEdit_6" @mouseover="edit_6 = true" @mouseleave="edit_6 = false">
            <div
              v-if="eduExperience.length && eduExperience.length < 3"
              class="edit-btn add-icon"
              :class="edit_6 ? 'show-edit-btn add-btn' : ''"
              @click="onAddEdu"
            >
              <i class="el-icon-plus"></i>
              <div>新增</div>
            </div>
            <div class="info-header">
              <div class="side-bar"></div>
              <div class="title">教育经历</div>
            </div>
            <div class="career" v-for="(item, index) in eduExperience" :key="index" v-show="item.schoolName">
              <div class="edit-btn show-edit-btn">
                <i class="el-icon-edit-outline" @click.stop="editEduItem(index)"></i>
                <i class="el-icon-delete" @click.stop="delEduItem(index)"></i>
              </div>
              <div class="name-area">
                <span class="name">{{ item.schoolName }}</span>
                <span class="time">{{ item.startTime }}~{{ item.endTime }}</span>
              </div>
              <div class="type-area">
                <span class="type">{{ item.major }}</span>
                <span class="type">{{ educationDict[item.education] }}</span>
              </div>
              <p class="content-area">{{ item.honor }}</p>
            </div>
          </div>
          <div class="edit" v-else>
            <div class="edit-header">{{ isEduAdd ? '新增' : '编辑' }}教育经历</div>
            <div class="edit-content">
              <el-row :gutter="12" style="margin-bottom: 24px">
                <el-col :span="12">
                  <div class="input-label">学校</div>
                  <div class="input-content">
                    <el-input v-model="eduInfoItem.schoolName" clearable> </el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">学历</div>
                  <div class="input-content">
                    <el-select v-model="eduInfoItem.education" placeholder="选择学历" style="width: 100%">
                      <el-option
                        v-for="(edu, index) in educationList"
                        :value="edu.value"
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
                    <el-input v-model="eduInfoItem.major" clearable> </el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="input-label">时间</div>
                  <div class="input-content">
                    <el-date-picker
                      v-model="eduInfoItem.startTime"
                      type="date"
                      placeholder="入学年月"
                      style="width: 45%"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    至
                    <el-date-picker
                      v-model="eduInfoItem.endTime"
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
                v-model="eduInfoItem.honor"
                maxlength="200"
                show-word-limit
                rows="9"
              >
              </el-input>
              <div class="action-buttons">
                <div class="cancel" @click="cancelEdit(6)">取消</div>
                <div class="confirm" @click="confirmEdit(6)">完成</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="previewVisible" :show-close="false" :close-on-click-modal="false" :append-body="true">
      <div slot="title" class="dialog-header">
        <div></div>
        <img src="@/assets/image/login/close.png" class="close-btn" @click="closeDialog" />
      </div>
      <div class="dialog-content">
        <div class="preview-page">
          <div class="top-section">
            <div class="basic-info">
              <div class="user-name">{{ basicInfo.userName }}</div>
              <div class="user-detail">
                <div style="display: flex; margin-bottom: 12px">
                  <div class="right-bd">{{ basicInfo.sex | sexFilter }}</div>
                  <div class="right-bd">年龄：{{ basicInfo.birthday | ageFilter }}岁</div>
                  <div class="right-bd">{{ basicInfo.phone }}</div>
                  <div>期望行业：{{ basicInfo.industryMxName }}</div>
                </div>
                <div style="display: flex">
                  <div class="right-bd">{{ basicInfo.joinWorkDate | ageFilter }}年工作经验</div>
                  <div class="right-bd">求职意向：{{ basicInfo.positionTypeName }}</div>
                  <div class="right-bd">期望薪资：{{ basicInfo.startSalary }}-{{ basicInfo.endSalary }}K</div>
                  <div>期望城市：{{ basicInfo.cityName }}</div>
                </div>
              </div>
            </div>
            <img class="user-head-img" :src="basicInfo.headPath" />
          </div>
          <div class="section">
            <div class="section-title">个人优势</div>
            <div class="section-content">
              <p class="desc-text">{{ basicInfo.advantage }}</p>
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
                  <span class="sub-text" v-if="jobExperience[0].positionTypeName">
                    {{ jobExperience[0].positionTypeName }}
                  </span>
                </div>
                <div class="time-text" v-if="jobExperience[0].startTime">
                  {{ jobExperience[0].startTime }}-{{ jobExperience[0].endTime }}
                </div>
              </div>
              <div class="desc-text" v-if="jobExperience[0].workContent">{{ jobExperience[0].workContent }}</div>
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
                  {{ proExperience[0].startTime }}-{{ proExperience[0].endTime }}
                </div>
              </div>
              <div class="desc-text" v-if="proExperience[0].workDescribe">{{ proExperience[0].workDescribe }}</div>
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
                  {{ eduExperience[0].startTime }}-{{ eduExperience[0].endTime }}
                </div>
              </div>
              <div class="desc-text" v-if="eduExperience[0].honor">{{ eduExperience[0].honor }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Auth from '@/api/auth'
import Job from '@/api/job'
import Home from '@/api/home'
import { mapGetters } from 'vuex'
import moment from 'moment'

const sexDict = {
  1: '男',
  2: '女',
}

export default {
  filters: {
    sexFilter(value) {
      return sexDict[value]
    },
    ageFilter(value) {
      return value ? moment().diff(value, 'years') : ''
    },
  },
  data() {
    return {
      menuList: [
        { title: '个人信息', to: 'basicInfo' },
        { title: '个人优势', to: 'advantage' },
        { title: '期望职位', to: 'expectedPosition' },
        { title: '工作经历', to: 'jobExperience' },
        { title: '项目经历', to: 'proExperience' },
        { title: '教育经历', to: 'eduExperience' },
      ],
      basicInfo: {},
      jobExperience: [
        {
          id: null,
          company: null,
          startTime: null,
          endTime: null,
          positionTypeId: null,
          positionTypeName: null,
          workContent: null,
          skillList: [],
        },
      ],
      proExperience: [
        {
          id: null,
          projectName: null,
          startTime: null,
          endTime: null,
          projectRole: null,
          workDescribe: null,
          performance: null,
        },
      ],
      eduExperience: [
        {
          id: null,
          schoolName: null,
          education: null,
          major: null,
          startTime: null,
          endTime: null,
          honor: null,
        },
      ],
      edit_1: false,
      edit_2: false,
      edit_3: false,
      edit_4: false,
      edit_5: false,
      edit_6: false,
      isEdit_1: false,
      isEdit_2: false,
      isEdit_3: false,
      isEdit_4: false,
      isEdit_5: false,
      isEdit_6: false,
      educationDict: {
        0: '不限',
        1: '小学',
        2: '初中',
        3: '高中',
        4: '大专',
        5: '本科',
        6: '硕士',
        7: '博士',
      },
      lookWorkStatusDict: {
        1: '离职-随时到岗',
        2: '在职-月内到岗',
        3: '在职-考虑机会',
        4: '在职-暂不考虑',
      },
      jobOptions: [
        { value: '1', label: '离职-随时到岗' },
        { value: '4', label: '在职-月内到岗' },
        { value: '3', label: '在职-考虑机会' },
        { value: '2', label: '在职-暂不考虑' },
      ],
      userJobStatusDict: {
        1: '职场人',
        2: '应届生',
      },
      userJobStatusOptions: [
        { value: '1', label: '职场人' },
        { value: '2', label: '应届生' },
      ],
      sexOptions: [
        { value: '1', label: '男' },
        { value: '2', label: '女' },
      ],
      positionProps: {
        emitPath: false,
      },
      cityList: [],
      positionTypeList: [],
      industryList: [],
      educationList: [
        { value: '0', label: '不限' },
        { value: '1', label: '小学' },
        { value: '2', label: '初中' },
        { value: '3', label: '高中' },
        { value: '4', label: '大专' },
        { value: '5', label: '本科' },
        { value: '6', label: '硕士' },
        { value: '7', label: '博士' },
      ],
      hopePositionTypeOptions: [
        { value: '1', label: '全职' },
        { value: '2', label: '兼职' },
        { value: '3', label: '灵活就业' },
        { value: '4', label: '实习' },
      ],
      hopePositionTypeDict: {
        1: '全职',
        2: '兼职',
        3: '灵活就业',
        4: '实习',
      },
      isOver: false,
      errorUserName: false,
      errorLookWorkStatus: false,
      errorSex: false,
      errorUserJobStatus: false,
      errorBirthday: false,
      errorJoinWorkDate: false,
      errorAdvantage: false,
      skills: [],
      chosenSkills: [],
      previewVisible: false,
      jobInfoItem: {},
      proInfoItem: {},
      eduInfoItem: {},
      isJobAdd: false,
      isProAdd: false,
      isEduAdd: false,
      fileList: [],
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  mounted() {
    document.addEventListener('scroll', this.updateScrollTop)
  },
  destroyed() {
    document.removeEventListener('scroll', this.updateScrollTop)
  },
  methods: {
    handleHeadSuccess(response, file, fileList) {
      this.basicInfo.headPath = response.data.url
    },
    handleHeadExceed(file, fileList) {
      this.$message.error('只能选择一张图片')
    },
    handleHeadRemove(file) {
      this.$refs.headUpload.clearFiles()
      this.basicInfo.headPath = null
      this.fileList = []
    },
    onAddJob() {
      this.isEdit_4 = true
      this.isJobAdd = true
      this.jobInfoItem = {
        id: null,
        company: null,
        startTime: null,
        endTime: null,
        positionTypeId: null,
        positionTypeName: null,
        workContent: null,
        skillList: [],
      }
      this.chosenSkills = []
    },
    onAddPro() {
      this.isEdit_5 = true
      this.isProAdd = true
      this.proInfoItem = {
        id: null,
        projectName: null,
        startTime: null,
        endTime: null,
        projectRole: null,
        workDescribe: null,
        performance: null,
      }
    },
    onAddEdu() {
      this.isEdit_6 = true
      this.isEduAdd = true
      this.eduInfoItem = {
        id: null,
        schoolName: null,
        education: null,
        major: null,
        startTime: null,
        endTime: null,
        honor: null,
      }
    },
    editJobItem(index) {
      this.jobInfoItem = Object.assign({}, this.jobExperience[index])
      this.chosenSkills = this.jobInfoItem.skillList.map(s => s.skillId)
      this.getSkills(this.jobInfoItem.positionTypeId)
      setTimeout(() => {
        this.isEdit_4 = true
      }, 500)
    },
    editProItem(index) {
      this.proInfoItem = Object.assign({}, this.proExperience[index])
      this.isEdit_5 = true
    },
    editEduItem(index) {
      this.eduInfoItem = Object.assign({}, this.eduExperience[index])
      this.isEdit_6 = true
    },
    delJobItem(index) {
      const _this = this
      this.$confirm('确认删除该经历？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(res => {
          if (res == 'confirm') {
            Auth.deleteJobExperience({ id: _this.jobExperience[index].id }).then(res => {
              if (res.code == 200) {
                _this.$message.success('删除成功')
                _this.getJob()
              } else {
                _this.$message.error(data)
              }
            })
          } else {
          }
        })
        .catch(err => console.log(err))
    },
    delProItem(index) {
      const _this = this
      this.$confirm('确认删除该经历？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(res => {
          if (res == 'confirm') {
            Auth.deleteProjectExperience({ id: _this.proExperience[index].id }).then(res => {
              if (res.code == 200) {
                _this.$message.success('删除成功')
                _this.getPro()
              } else {
                _this.$message.error(data)
              }
            })
          } else {
          }
        })
        .catch(err => console.log(err))
    },
    delEduItem(index) {
      const _this = this
      this.$confirm('确认删除该经历？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(res => {
          if (res == 'confirm') {
            Auth.deleteEducationExperience({ id: _this.eduExperience[index].id }).then(res => {
              if (res.code == 200) {
                _this.$message.success('删除成功')
                _this.getEdu()
                _this.getUserInfo()
              } else {
                _this.$message.error(data)
              }
            })
          } else {
          }
        })
        .catch(err => console.log(err))
    },
    posChange(value) {
      this.jobInfoItem.skillList = []
      this.chosenSkills = []
      this.getSkills(value)
    },
    async getSkills(positionTypeId) {
      let res = await Auth.queryUserSkillList({ positionTypeId })
      this.skills = res.data
    },
    selectSkills(val) {
      this.jobInfoItem.skillList = val.map(id => {
        const index = this.skills.findIndex(s => s.id === id)
        return this.skills[index]
      })
    },
    updateScrollTop() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 兼容多个浏览器
      this.isOver = scrollTop >= 80
    },
    async getPositonType() {
      let res = await Home.positionType({})
      if (res.code == 200) {
        let positionTypeList = res.data
        positionTypeList.forEach(p => {
          p.value = p.pid
          p.label = p.pname
          if (p.childLists && p.childLists.length) {
            p.children = p.childLists
            p.children.forEach(c => {
              c.value = c.id
              c.label = c.typeName
              if (c.subChildLists && c.subChildLists.length) {
                c.children = c.subChildLists
                c.children.forEach(s => {
                  s.value = s.subId
                  s.label = s.subTypeName
                })
              }
            })
          }
        })
        this.positionTypeList = positionTypeList
      }
    },
    async getIndustryOptions() {
      let res = await Job.queryAllIndustryType({})
      this.industryList = res.data
    },
    async getCityOptions() {
      let res = await Auth.queryHotCityList({})
      this.cityList = res.data
    },
    goto(menu) {
      document.getElementById(menu.to).scrollIntoView(true)
    },
    async getUserInfo() {
      let res = await Auth.queryPersonInfo({ userId: this.userId })
      this.errorUserName = false
      this.errorLookWorkStatus = false
      this.errorSex = false
      this.errorUserJobStatus = false
      this.errorBirthday = false
      this.errorJoinWorkDate = false
      this.errorAdvantage = false
      this.basicInfo = res.data
      console.log(res.data, '999')
      this.fileList = [{ url: res.data.headPath }]
      this.queryUserInfo()
    },
    async queryUserInfo() {
      let res = await Auth.queryUserInfo({ userId: this.userId })
      this.$store.dispatch('setUserInfo', res.data)
    },
    async updatePersonInfo() {
      if (this.$refs.industrySelect1 && this.$refs.industrySelect1.selected) {
        this.basicInfo.industryMxName = this.$refs.industrySelect1.selected.label
      }
      if (this.$refs.positionSelect1 && this.$refs.positionSelect1.getCheckedNodes()[0]) {
        this.basicInfo.positionTypeName = this.$refs.positionSelect1.getCheckedNodes()[0].pathNodes[2].label
      }
      if (this.$refs.citySelect1 && this.$refs.citySelect1.selected) {
        this.basicInfo.cityName = this.$refs.citySelect1.selected.label
      }
      let res = await Auth.userDetailEdit({ ...this.basicInfo, userId: this.userId })
      if (res.code == 200) {
        this.$message.success('更新成功')
      } else {
        this.$message.error(res.data)
      }
    },
    async updateJob() {
      /**请求信息的接口返回的skillList字段
       * 每条数据是skillId和labelName，但是
       * 编辑信息的接口入参skillList是id和
       * labelName，所以更新前要转换一次*/
      if (this.$refs.positionSelect2 && this.$refs.positionSelect2.getCheckedNodes()[0]) {
        this.jobInfoItem.positionTypeName = this.$refs.positionSelect2.getCheckedNodes()[0].pathNodes[2].label
      }
      this.jobInfoItem.skillList = this.jobInfoItem.skillList.map(s => {
        const skill = {
          id: s.id || s.skillId, // 如果改变过技能选择，skillList里的是id，如果直接是工作经历查询接口取的就是skillId
          labelName: s.labelName,
        }
        return skill
      })
      let res = await Auth.updateJobExperience({ ...this.jobInfoItem, userId: this.userId })
      if (res.code == 200) {
        this.isEdit_4 = false
        this.$message.success(`${this.isJobAdd ? '新增' : '更新'}成功`)
        this.getJob()
        this.isJobAdd = false
      } else {
        this.$message.error(res.data)
      }
    },
    async updatePro() {
      let res = await Auth.updateProjectExperience({ ...this.proInfoItem, userId: this.userId })
      if (res.code == 200) {
        this.isEdit_5 = false
        this.$message.success(`${this.isProAdd ? '新增' : '更新'}成功`)
        this.getPro()
        this.isProAdd = false
      } else {
        this.$message.error(res.data)
      }
    },
    async updateEdu() {
      let res = await Auth.userEducationEdit({ ...this.eduInfoItem, userId: this.userId })
      if (res.code == 200) {
        this.isEdit_6 = false
        this.$message.success(`${this.isEduAdd ? '新增' : '更新'}成功`)
        this.getEdu()
        this.getUserInfo()
        this.isEduAdd = false
      } else {
        this.$message.error(res.message)
      }
    },
    async getJob() {
      this.chosenSkills = []
      this.jobInfoItem = {}
      let res = await Auth.queryPersonJobExperience({ userId: this.userId })
      if (res.data && res.data.length) {
        this.jobExperience = res.data.splice(0, 3) // 只取三次经历
      } else {
        this.jobExperience = [
          {
            id: null,
            company: null,
            startTime: null,
            endTime: null,
            positionTypeId: null,
            positionTypeName: null,
            workContent: null,
            skillList: [],
          },
        ]
      }
    },
    async getPro() {
      this.proInfoItem = {}
      let res = await Auth.queryPersonProjectExperience({ userId: this.userId })
      if (res.data && res.data.length) {
        this.proExperience = res.data.splice(0, 3)
      } else {
        this.proExperience = [
          {
            id: null,
            projectName: null,
            startTime: null,
            endTime: null,
            projectRole: null,
            workDescribe: null,
            performance: null,
          },
        ]
      }
    },
    async getEdu() {
      this.eduInfoItem = {}
      let res = await Auth.queryPersonEducationExperience({ userId: this.userId })
      if (res.data && res.data.length) {
        this.eduExperience = res.data.splice(0, 3)
      } else {
        this.eduExperience = [
          {
            id: null,
            schoolName: null,
            education: null,
            major: null,
            startTime: null,
            endTime: null,
            honor: null,
          },
        ]
      }
    },
    cancelEdit(flag) {
      switch (flag) {
        case 1:
          this.isEdit_1 = false
          this.getUserInfo()
          break
        case 2:
          this.isEdit_2 = false
          this.getUserInfo()
          break
        case 3:
          this.isEdit_3 = false
          this.getUserInfo()
          break
        case 4:
          this.isEdit_4 = false
          this.isJobAdd = false
          this.getJob()
          break
        case 5:
          this.isEdit_5 = false
          this.isProAdd = false
          this.getPro()
          break
        case 6:
          this.isEdit_6 = false
          this.isEduAdd = false
          this.getEdu()
          break
      }
    },
    confirmEdit(flag, index = 0) {
      switch (flag) {
        case 1:
          this.basicUpdate()
          break
        case 2:
          if (!this.basicInfo.advantage) {
            this.errorAdvantage = true
          } else {
            this.updatePersonInfo()
            setTimeout(() => {
              this.isEdit_2 = false
              this.getUserInfo()
            }, 1000)
          }
          break
        case 3:
          if (Number(this.basicInfo.startSalary) >= Number(this.basicInfo.endSalary)) {
            this.$message.error('起薪应低于最高薪')
          } else {
            this.updatePersonInfo()
            setTimeout(() => {
              this.isEdit_3 = false
              this.getUserInfo()
            }, 1000)
          }
          break
        case 4:
          this.updateJob()
          break
        case 5:
          this.updatePro()
          break
        case 6:
          this.updateEdu()
          break
      }
    },
    basicUpdate() {
      if (!this.basicInfo.headPath) {
        this.$message.warning('请上传头像')
        return
      }
      if (!this.basicInfo.userName) {
        this.errorUserName = true
        return
      }
      if (!this.basicInfo.lookWorkStatus) {
        this.errorLookWorkStatus = true
        return
      }
      if (!this.basicInfo.sex) {
        this.errorSex = true
        return
      }
      if (!this.basicInfo.userJobStatus) {
        this.errorUserJobStatus = true
        return
      }
      if (!this.basicInfo.birthday) {
        this.errorBirthday = true
        return
      }
      if (!this.basicInfo.joinWorkDate) {
        this.errorJoinWorkDate = true
        return
      }
      this.updatePersonInfo()
      setTimeout(() => {
        this.isEdit_1 = false
        this.getUserInfo()
      }, 1000)
    },
    previewInfo() {
      this.previewVisible = true
    },
    closeDialog() {
      this.previewVisible = false
    },
  },
  created() {
    this.getUserInfo()
    this.getJob()
    this.getPro()
    this.getEdu()
    this.getIndustryOptions()
    this.getPositonType()
    this.getCityOptions()
  },
}
</script>

<style lang="scss" scoped>
.online-layout {
  display: flex;

  .nav {
    width: 160px;

    .nav-fixed {
      position: fixed;
      top: 20px;
      width: 160px;
    }

    .nav-title {
      background-image: url(~@/assets/image/userCenter/rect-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: #ffffff;
      text-align: left;
      padding: 15px 0 15px 24px;
    }
  }

  .resume {
    margin-left: 16px;
    flex: 1;
    background-color: #ffffff;

    .resume-header {
      height: 50px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      font-weight: 500;
      color: #3d3d3d;
      background-image: url(~@/assets/image/userCenter/rect-bg-long.png);
      background-size: 100% 100%;

      .action {
        font-size: 14px;
        color: #2446a8;
        cursor: pointer;
      }
    }

    .edit-btn {
      text-align: right;
      display: none;
      position: absolute;
      right: 24px;
      width: 200px;
      height: 100px;
      z-index: 2;
      cursor: pointer;

      .el-icon-edit-outline {
        font-size: 24px;
      }

      .el-icon-plus {
        font-size: 24px;
      }

      .el-icon-delete {
        margin-left: 5px;
        font-size: 24px;
      }
    }

    .add-icon {
      height: 30px;
    }

    .show-edit-btn {
      display: flex;
      justify-content: flex-end;
    }

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 16px;
      color: #333333;
      z-index: 1;
      .el-icon-plus {
        margin-right: 2px;
      }
    }

    .show {
      position: relative;
      padding: 0 24px 20px;
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

    .field {
      display: flex;
      align-items: center;
      padding-right: 16px;
      border-right: 1px solid #dadde2;
      margin-bottom: 14px;
      font-size: 14px;
      color: #666666;
      padding-left: 16px;

      &:first-child {
        padding-left: 0;
      }
    }

    .base-icon {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }

    .basic-info {
      .base {
        display: flex;
        justify-content: space-between;
        position: relative;
        padding-top: 20px;

        .left-part {
          .name {
            font-size: 24px;
            font-weight: 500;
            color: #3d3d3d;
            margin-bottom: 24px;
            text-align: left;
          }
        }
        .right-part {
          padding-right: 20px;
        }
      }
    }

    .advantage,
    .expected-position,
    .work-experience,
    .project-experience,
    .education-experience {
    }

    .info-header {
      display: flex;
      align-items: center;
      // margin-bottom: 24px;
      padding-top: 8px;
      .side-bar {
        width: 3px;
        height: 16px;
        background: #2446a8;
        border-radius: 2px;
      }

      .title {
        margin-left: 8px;
        font-size: 18px;
        color: #444444;
        height: 25px;
        line-height: 25px;
      }
    }

    .detail-text {
      text-align: left;
      font-size: 14px;
      color: #666666;
      padding: 24px 11px 0 8px;
      white-space: pre-wrap;
      line-height: 26px;
    }

    .career {
      padding: 24px 16px 20px 8px;
      text-align: left;

      .name-area {
        margin-bottom: 24px;
        .name {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
        }
        .time {
          margin-left: 20px;
          font-size: 14px;
          color: #666666;
        }
      }

      .type-area {
        margin-bottom: 24px;
        .type {
          font-size: 16px;
          font-weight: 600;
          color: #333333;
          padding-right: 16px;
          &:nth-child(2) {
            padding-left: 16px;
            border-left: 1px solid #dadde2;
          }
        }
      }

      .content-area {
        font-size: 14px;
        line-height: 26px;
        color: #666666;
        white-space: pre-wrap;
      }

      .tags {
        display: flex;
        margin-top: 16px;

        .tag {
          height: 25px;
          line-height: 25px;
          background: #f3f5f9;
          border-radius: 4px;
          padding: 0 12px;
          font-size: 12px;
          color: #666666;
          margin-right: 8px;
        }
      }
    }
  }
}

::v-deep .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}

::v-deep .el-menu {
}

::v-deep .el-menu-vertical-demo {
  border: none;
  padding-top: 0;
}

::v-deep .el-menu-item {
  padding-left: 24px !important;

  &:hover {
    background: rgba(36, 70, 168, 0.05);
    color: #2446a8;
  }
}

::v-deep .el-menu-item.is-active {
  background: rgba(36, 70, 168, 0.05);
  color: #2446a8;
}

::v-deep .el-input__suffix {
  display: block;
  line-height: 40px;
}

textarea {
  white-space: pre-wrap;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.dialog-content {
  .preview-page {
    background: #ffffff;
    height: 75vh;
    overflow-y: scroll;
    padding: 2.96vh;
    margin: auto;

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
          // width: 80px;
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

.avatar-upload {
  width: 90px;
  height: 90px;
  border-radius: 45px;
}

::v-deep .el-upload--picture-card {
  width: 90px;
  height: 90px;
  line-height: 90px;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}

::v-deep .el-upload--picture-card {
  border: none;
  background-color: transparent;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  border: none;
  margin: 0;
  background-color: transparent;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item-actions {
  background-color: transparent;
}

::v-deep .upload-avatar .el-upload--picture-card {
  display: none !important;
}

::v-deep .el-dialog__header {
  padding: 24px 22px 12px;
}

::v-deep .el-dialog {
  border-radius: 4px;
  width: 58vw !important;
  height: 90vh !important;
  background-image: url(~@/assets/image/login/avatar-bg.png);
  background-size: 100% 100%;
  margin-top: 1% !important;
}

::v-deep .el-dialog__body {
  padding: 0 44px;
}
</style>
