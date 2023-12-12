<template>
  <div class="main">
    <el-button class="goBack" @click="goBack">返回</el-button>
    <div class="main-left">
      <div
        class="list-div"
        :class="{ active: item.checked }"
        v-for="(item, i) in list"
        :key="i"
        @click="checkedClick(item)"
      >
        <img :src="item.img || img" alt />
        <div class="info-div">
          <div class="title-info">
            <span
              class="username"
              :title="`${item.listname} ${item.companyName} ${item.roleName}`"
            >
              {{ item.listname }}
              <span class="mintitle"
                >{{ item.companyName }} {{ item.roleName }}</span
              >
            </span>
            <span class="date">{{ item.date }}</span>
          </div>
          <div class="body-div">
            <p>{{ item.lastMsg }}</p>
            <span class="unread-span" v-show="item.unreadNum > 0">{{
              item.unreadNum
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-right">
      <div class="nochecked" v-if="list.filter((e) => e.checked).length == 0">
        <img src="@/assets/image/oxman/person.png" alt />
        <p>未选中联系人</p>
        <!-- <p>列表仅展示近30天的联系人</p> -->
      </div>
      <div class="right-wrap" v-else>
        <div class="jubao" @click="toJb">
          <p>举报</p>
        </div>
        <div class="title-div">
          <span class="name">{{ toInfo.listname }}</span>
          <span>{{ toInfo.companyName }}</span>
          <span>{{ toInfo.roleName }}</span>
        </div>
        <div
          class="reportInfo-div"
          v-if="toInfo.warnList && toInfo.warnList.length > 0"
        >
          <p
            class="report-title"
            v-if="toInfo.warnList.length > 0"
            @click="warnShow = !warnShow"
          >
            当前用户曾被举报，点击查看
          </p>
          <div v-show="warnShow" class="warn-div">
            <span v-for="(warnItem, i) in toInfo.warnList" :key="warnItem.id"
              >{{ i + 1 }}、{{ warnItem.complainTypeName
              }}{{ i == toInfo.warnList.length - 1 ? "" : "；" }}</span
            >
          </div>
        </div>
        <div
          class="edu-div"
          v-show="toInfo.positionName || toInfo.salary || toInfo.cityName"
        >
          <span class="text">{{ toInfo.positionName }}</span>
          <span class="name">{{ toInfo.salary }}</span>
          <span class="text">{{ toInfo.cityName }}</span>
        </div>

        <div class="body-div" id="contentRef" ref="contentRef">
          <div class="content-div">
            <div
              class="row-div"
              v-for="(item, i) in toInfo.messageList"
              :key="i"
            >
              <div
                class="left"
                :class="{ right: item.from == userInfo.username }"
              >
                <!-- <div class="message-p" v-if="item.info.startsWith('http')">
                  <span class="bg-div">
                    <a :href="item.info">{{ item.info }}</a>
                  </span>
                </div>-->
                <div
                  class="message-p"
                  :class="{ 'file-p': item.msgType == 'file' }"
                >
                  <span class="bg-div">
                    {{ item.info }}
                    <!-- <a class="file-a" v-if="item.msgType == 'file'" :href="item.fileUrl" :download="item.filename"
                      >点击下载</a
                    > -->
                    <span
                      class="file-a"
                      v-if="item.msgType == 'file'"
                      @click="downloadClick(item)"
                      >点击下载</span
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-div">
          <div class="btn-list">
            <input
              type="file"
              class="hide"
              ref="inputDom"
              @change="fileChange"
            />
            <button @click="fileClick('file')">发简历</button>
            <el-popover
              placement="top-start"
              class="commonhi"
              width="360"
              trigger="hover"
            >
              <div>
                <ul class="commonhi-box">
                  <li
                    v-for="(item, index) in messageList"
                    :key="index"
                    @click="message = item.message"
                  >
                    {{ item.message }}
                  </li>
                </ul>
              </div>
              <el-button size="medium" slot="reference">常用语</el-button>
            </el-popover>
          </div>
          <div class="content-div">
            <textarea v-model="message" @keyup.enter="sendMessage()"></textarea>
            <div class="btn-div">
              <button @click="sendMessage()">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="jbDialog"
      :visible.sync="showJb"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt />
        <div class="title">
          <div @click="toBack">
            <img v-if="jbStep == 2" src="@/assets/image/oxman/left.png" alt />
            <h2>{{ jbStep == 1 ? "选择举报类型" : "补充举报证据" }}</h2>
          </div>
          <img
            src="@/assets/image/login/close.png"
            class="close-btn"
            @click="showJb = false"
          />
        </div>
        <div class="conBox" v-if="jbStep == 1">
          <div class="reportCon">
            <div
              :class="[
                'reportItem',
                reportInfo.name == item.name ? 'active' : '',
              ]"
              v-for="(item, index) in reportArr"
              :key="index"
              @click="toNext(item)"
            >
              <div>
                <h2>{{ item.name }}</h2>
                <p>{{ item.desc }}</p>
              </div>
              <img src="@/assets/image/oxman/right.png" alt />
            </div>
          </div>
          <!-- <div class="btnBox">
            <button class="save" @click="sureJb">确定</button>
          </div>-->
        </div>
        <div class="conBox" v-if="jbStep == 2">
          <el-form
            ref="form"
            label-position="left"
            v-on:submit.prevent
            label-width="100px"
          >
            <el-form-item label="补充说明：">
              <el-input
                type="textarea"
                v-model="desc"
                placeholder="请简要描述你得问题和意见（必填）"
              ></el-input>
            </el-form-item>
            <el-form-item label="证据截图：">
              <el-upload
                class="avatar-uploader"
                action="/api-recruit/api-common/oss/file-upload"
                list-type="picture-card"
                :data="params"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                accept="jpg, png, jpeg"
              >
                <div class="addBox">
                  <img src="@/assets/image/oxman/add.png" alt />
                  <h2>上传图片</h2>
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div class="btnBox">
            <button class="save" @click="sureJb">确定</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-dialog class="file-dialog" :visible.sync="dialogVisibleFile">
      <p class="title">请选择需要投递的附件简历</p>
      <p class="mintitle">文件附件</p>
      <div class="body-dialog">
        <el-radio-group v-model="radioChecked">
          <el-radio
            v-for="(item, i) in fileList"
            :key="i"
            :label="item.vitaeId"
          >
            <span class="name">{{ item.vitaeName }}</span>
            <span>{{ item.upTime }}</span>
          </el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFile = false">取 消</el-button>
        <el-button type="primary" @click="confirmClickFile">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      class="uploadfileDialog"
      :visible.sync="fileShowDialog"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-header">
        <div></div>
        <img
          src="@/assets/image/login/close.png"
          class="close-btn"
          @click="fileShowDialog = false"
        />
      </div>
      <div class="dialog-content">
        <el-upload
          class="upload-demo"
          drag
          action="/api-recruit/api-common/oss/file-upload"
          :limit="1"
          :data="paramsFileDialog"
          :on-preview="handlePreviewFileDialog"
          :on-remove="handleRemoveFileDialog"
          :on-success="handleSuccessFileDialog"
          :file-list="fileListDialog"
          accept=".pdf, .doc, .docx, jpg, png"
        >
          <img src="@/assets/image/login/upload-doc.png" class="myicon" />
          <div class="tip-text">点击或将文件拖拽到这里上传</div>
          <div class="accept-text">
            简历建议使用 PDF 文件，也支持DOC、DOCX、JPG、PNG 格式
          </div>
          <div class="size-text">文件大小不超过20M</div>
          <div class="upload-button">上传附件简历</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import WebIM from '@/lin/util/WebIM'
// import moment from 'moment'
import { mapActions, mapMutations, mapGetters } from "vuex";
import webIMmixin from "@/lin/mixin/webIMmixin";
import Oxman from "@/api/oxman";

export default {
  name: "immediately",
  mixins: [webIMmixin],
  computed: {
    ...mapGetters(["userId"]),
  },
  data() {
    return {
      jbStep: 1,
      showJb: false,
      reportInfo: {},
      reportArr: [
        // {
        //   name: "面试爽约",
        //   desc: "招聘者存在面试舞弊的行为",
        //   id: 1,
        // },
        {
          name: "广告",
          desc: "招聘者存在推广产品或寻求投资、合作等行为",
          id: 2,
        },
        {
          name: "色情",
          desc: "招聘者发布含有色情类的信息",
          id: 3,
        },
        {
          name: "违法政治-政治敏感",
          desc: "招聘者宣传涉政违法等敏感言论或存在违法行为",
          id: 4,
        },
        // {
        //   name: "个人简历不真实",
        //   desc: "招聘者简历虚假或存在非本人求职情况",
        //   id: 5,
        // },
        {
          name: "人身攻击",
          desc: "招聘者存在辱骂、骚扰等语言或肢体上的不当行为",
          id: 6,
        },
        {
          name: "索取隐私",
          desc: "招聘者无正常求职恶意索取隐私猎头",
          id: 7,
        },
        {
          name: "猎头骚扰",
          desc: "猎头、中介等机构冒充招聘者寻求合作或反向招聘",
          id: 8,
        },
        {
          name: "其他",
          desc: "除以上类型之外行为",
          id: 9,
        },
      ],
      params: {
        type: 2,
      },
      desc: "",
      imgList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      messageList: [],
    };
  },
  created() {
    sessionStorage.removeItem("perInfo");
    this.hiMessageList();
  },
  methods: {
    // 打招呼列表
    hiMessageList() {
      Oxman.hiMessageList({}).then((res) => {
        this.messageList = res.data;
      });
    },
    //返回上一页
    goBack() {
      sessionStorage.removeItem("jobInfo");
      this.$router.go(-1);
    },
    toNext(item) {
      this.reportInfo = item;
      this.jbStep = 2;
    },
    toBack() {
      if (this.jbStep == 1) {
        return;
      }
      this.jbStep = 1;
    },
    toJb() {
      this.showJb = true;
    },
    handlePreview() {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.imgList = fileList;
    },
    handleSuccess(res, file, fileList) {
      console.log(res, file, fileList);
      this.imgList = fileList;
    },
    closeJb() {
      this.showJb = false;
      this.jbStep = 1;
      this.reportInfo = {};
      this.desc = "";
      this.imgList = [];
    },
    async sureJb() {
      if (!this.desc) {
        this.$message.error("请输入投诉内容");
        return;
      }
      let imgList = [];
      this.imgList.forEach((item) => {
        imgList.push(item.response.data.url);
      });
      let params = {
        complainUserId: this.userId,
        complainUserType: 1,
        respondentUserId: this.toInfo.userId,
        respondentUserType: 2,
        content: this.desc,
        complainType: this.reportInfo.id,
        picList: imgList,
      };
      console.log("params==>", params);
      let res = await Oxman.addComplaint(params);
      if (res.code == 200) {
        this.$message.success("已提交举报信息");
        this.closeJb();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css");
* {
  box-sizing: border-box;
}
.commonhi-box {
  padding-left: 10px;
  li {
    cursor: pointer;
    font-size: 13px;
    margin-bottom: 10px;
    color: #333;
    list-style: auto;
    border-bottom: 1px dashed #999;
  }
}
.commonhi {
  margin-left: 10px;
  button {
    height: 27px;
    line-height: 17px;
  }
}
.main {
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 30px 16%;
  height: 500px;
  position: relative;

  .goBack {
    position: absolute;
    top: 0;
    left: -72px;
  }
}
.main-left,
.main-right {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 6px 2px #f1f1f1;
}
.main-left {
  width: 37%;
  max-width: 400px;
  height: 100%;
  overflow-y: scroll;
  margin-right: 10px;
  padding: 0 8px;
  &::-webkit-scrollbar {
    width: 4px;
    // height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: #8b8b8b;
  }
  .list-div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 6px;
    width: 100%;
    margin: 8px 0;
    padding: 0 8px;
    &.active {
      background: #f6f7fa;
    }
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin: 8px 8px 8px 0;
    }
    .info-div {
      // flex: 1;
      width: calc(100% - 56px);
      text-align: left;
      line-height: 24px;
      .title-info {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        // margin-bottom: 8px;
        .username {
          width: calc(100% - 104px);
          min-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .mintitle {
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .date {
          color: #a4a4a4;
          font-size: 14px;
        }
      }
      .body-div {
        color: #a4a4a4;
        font-size: 14px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 18px;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .unread-span {
          display: flex;
          width: 15px;
          height: 15px;
          align-items: center;
          background: red;
          border-radius: 50%;
          justify-content: center;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
}
.main-right {
  flex: 1;
  // padding: 18px 28px;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  .right-wrap {
    display: flex;
    flex-direction: column;
    // align-items: stretch;
    justify-content: space-between;
    height: 100%;
    position: relative;
    .jubao {
      font-size: 14px;
      color: #999;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .title-div,
    .titleinfo-div {
      text-align: left;
      padding: 20px 0 20px 20px;
      font-size: 16px;
      color: #676767;
      border-bottom: 1px dotted #a4a4a4;
      span {
        margin-right: 14px;
        &.salary-span {
          color: #ff733c;
        }
        &.position-span {
          color: #000;
        }
      }
    }
    .name {
      font-weight: bold;
      font-size: 18px;
    }
    .huoyue {
      color: #3963bc;
    }
    .titleinfo-div {
      background: #f9fbfb;
      margin: 0 0 10px;
      padding: 10px 20px;
    }
  }
  .nochecked {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #676767;
    font-size: 12px;
    line-height: 18px;
    width: 100%;
    height: 100%;
    img {
      width: 100px;
    }
  }
  .body-div {
    flex: 1;
    margin: 0 10px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
      // height: 0px;
    }
    &::-webkit-scrollbar-thumb {
      width: 4px;
      background: #8b8b8b;
    }
    // border-bottom: 1px solid #a4a4a4;
    .content-div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .title-div {
    text-align: left;
  }
  .edu-div {
    background: #fafbfd;
    box-shadow: 0 2px 5px 0px #f1f1f1;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    padding: 0 50px;
    span.name {
      margin: 0 18px;
      color: #f4516c;
    }
  }
  .row-div {
    margin-bottom: 8px;
    text-align: left;
    .time {
      color: #bbb;
      font-size: 12px;
      margin-left: 8px;
    }
    .message-p {
      color: #333;
      text-align: left;
      max-width: 50%;
      font-size: 15px;
      overflow: hidden;
      a {
        white-space: pre-wrap;
        word-break: break-all;
      }
      .file-a {
        cursor: pointer;
        font-size: 12px;
        color: #777;
        text-decoration: underline;
      }
    }
    .left {
      text-align: left;
      align-items: flex-start;
      .message-p {
        border-radius: 0 10px 10px 10px;
      }
      .bg-div {
        padding: 15px 8px;
        background: #f2f4f7;
        border-radius: 0 10px 10px 10px;
        display: inline-block;
      }
    }
    .right {
      width: 100%;
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .message-p {
        border-radius: 6px 0 6px 6px;
        .bg-div {
          border-radius: 6px 0 6px 6px;
        }
      }
    }
  }

  .reportInfo-div {
    font-size: 12px;
    // color: #a4a4a4;
    color: red;
    text-align: left;
    line-height: 20px;
    cursor: pointer;
    margin: 10px 30px;
  }

  .footer-div {
    border-top: 1px solid #ececec;
    padding: 10px 28px;
    .btn-list {
      text-align: left;
      .hide {
        opacity: 0;
        display: none;
      }
      button {
        padding: 4px 12px;
        border-radius: 4px;
        border: 1px solid #a4a4a4;
        color: #a4a4a4;
        cursor: pointer;
      }
    }
    .content-div {
      width: 100%;
      display: flex;
      flex-direction: column;
      ::v-deep {
        textarea {
          outline: none;
          resize: none;
          height: 100px;
          padding: 4px;
          box-sizing: border-box;
          margin: 10px 0;
          border: 1px solid #a4a4a4;
          border-radius: 4px;
        }
        .btn-div {
          text-align: right;
          button {
            width: 100px;
            height: 40px;
            background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
            border-radius: 4px 4px 4px 4px;
            font-size: 14px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.file-dialog {
  .title {
    margin-left: 20px;
    line-height: 50px;
  }
  .mintitle {
    text-align: left;
    margin-left: 40px;
    color: #777;
  }
  .body-dialog {
    width: 100%;
    padding: 0 40px;
    line-height: 40px;
    .name {
      margin-right: 20px;
      display: inline-block;
      line-height: 30px;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  ::v-deep {
    .el-radio {
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .el-radio__label {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
  ::v-deep .el-dialog__header {
    display: none;
  }
  ::v-deep .el-dialog__body {
    padding: 0;
  }
  ::v-deep .el-dialog {
    width: 600px;
  }
}

.jbDialog {
  .dialog-content {
    position: relative;
    width: 100%;
    // height: 250px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    padding-bottom: 24px;
    .title {
      position: relative;
      padding: 24px 24px 24px 30px;
      display: flex;
      div {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
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
        right: 30px;
      }
    }
    .conBox {
      // padding: 0 24px;
      position: relative;
      z-index: 100;
      height: 500px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .reportCon {
        .reportItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 30px;
          box-sizing: border-box;
          border-bottom: 1px solid #eaeaea;
          text-align: left;
          cursor: pointer;
          h2 {
            font-size: 14px;
            color: #666;
            line-height: 22px;
            font-weight: bold;
            // margin-bottom: 4px;
          }
          p {
            font-size: 12px;
            color: #a4a4a4;
            line-height: 20px;
          }
          img {
            width: 16px;
            height: 16px;
          }
        }
        .reportItem:hover {
          background: #f3f4f8;
        }
        .reportItem.active {
          background: #f3f4f8;
        }
      }
      .btnBox {
        display: flex;
        justify-content: flex-end;
        margin-top: 48px;
        padding-right: 30px;
        .save {
          width: 100px;
          height: 40px;
          background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
          border-radius: 4px 4px 4px 4px;
          font-size: 14px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
  ::v-deep .avatar-uploader {
    // width: 100px;
    // height: 100px;
    // background: #ffffff;
    // border-radius: 4px 4px 4px 4px;
    display: flex;
    // border: 1px solid #dcdcdc;
  }
  ::v-deep .el-form-item__label {
    color: #666666;
  }
  ::v-deep .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .addBox {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    line-height: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 40px !important;
      height: 40px !important;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 14px;
      color: #666666;
    }
  }

  .el-form {
    padding: 0 30px;
  }
  ::v-deep .el-textarea__inner {
    height: 120px;
  }
  ::v-deep .el-upload-list--picture-card {
    display: flex;
    flex-wrap: wrap;
  }
  ::v-deep .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
}

.uploadfileDialog {
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
    .myicon {
      width: 48px;
      height: 48px;
      display: block;
      margin: 54px auto 8px;
    }
    .tip-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
    }
    .accept-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin: 10px auto 8px;
    }
    .size-text {
      font-size: 14px;
      color: #ff7200;
      margin-bottom: 30px;
    }
    .upload-button {
      margin: auto;
      cursor: pointer;
      width: 156px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      background: linear-gradient(270deg, #2559c2 0%, #63a5f6 100%);
      border-radius: 4px;
    }
  }
  ::v-deep .el-dialog__header {
    padding: 24px 22px 12px;
  }

  ::v-deep .el-dialog {
    border-radius: 4px;
    width: 694px;
    height: 420px;
    background-image: url(~@/assets/image/login/avatar-bg.png);
    background-size: 100% 100%;
  }

  ::v-deep .el-dialog__body {
    padding: 0 44px;
  }

  ::v-deep .el-upload-dragger {
    width: 100%;
    height: 320px;
    background: transparent;
  }

  ::v-deep .el-upload {
    display: block;
  }
}
</style>
