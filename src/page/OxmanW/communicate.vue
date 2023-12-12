<template>
  <div class="home-div">
    <div class="tag-div">
      <el-tag :hit="true" color="#bbc3e0">全部</el-tag>
    </div>
    <div class="main">
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
              <span class="username" :title="item.listname">
                {{ item.listname }}
                <span class="mintitle">{{ item.positionTypeName }}</span>
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
          <div>
            <div class="title-div">
              <span class="name" v-html="toInfo.listname"></span>
              <span class="huoyue">{{ toInfo.activityStatus }}</span>
              <span>{{ toInfo.age ? `${toInfo.age}岁` : "" }}</span>
              <span>{{ toInfo.workTime ? `${toInfo.workTime}年` : "" }}</span>
              <span>{{ toInfo.education }}</span>
              <!-- <span>
                接收简历{{toInfo.isAccept}}
                <el-switch v-model="toInfo.isAccept" @change="acceptViteChange" />
              </span> -->
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
                <span
                  v-for="(warnItem, i) in toInfo.warnList"
                  :key="warnItem.id"
                  >{{ i + 1 }}、{{ warnItem.complainTypeName
                  }}{{ i == toInfo.warnList.length - 1 ? "" : "；" }}</span
                >
              </div>
            </div>
            <div class="edu-div">
              <div class="edu-wrap" v-show="moreInfoShow">
                <div class="left-div">
                  <div
                    class="row-div"
                    v-for="item in toInfo.workExperienceList"
                    :key="Number(item.id)"
                  >
                    <span class="name"
                      >{{ item.startTime }}-{{ item.endTime }}</span
                    >
                    <span
                      class="text"
                      :title="`${item.company} · ${item.positionTypeName}`"
                      >{{ item.company }} · {{ item.positionTypeName }}</span
                    >
                  </div>
                  <div
                    class="row-div"
                    v-for="item in toInfo.educationExperienceList"
                    :key="Number(item.id)"
                  >
                    <span class="name"
                      >{{ item.startTime }}-{{ item.endTime }}</span
                    >
                    <span
                      class="text"
                      :title="`${item.schoolName} · ${item.major} · ${item.education}`"
                      >{{ item.schoolName }} · {{ item.major }} ·
                      {{ item.education }}</span
                    >
                  </div>
                </div>
                <div class="right-div">
                  <div class="row-div">
                    <span class="name">沟通职位：</span>
                    <span class="text">{{ toInfo.positionTypeName }}</span>
                  </div>
                  <div class="row-div">
                    <span class="name">期望：</span>
                    <span class="text"
                      >{{ toInfo.cityName }} -
                      {{ toInfo.positionTypeName }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="footer-img" @click="moreInfoShow = !moreInfoShow">
                <img :src="moreInfoShow ? show : hide" alt />
              </div>
            </div>
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
                    <!-- <span class="bg-div"> -->

                    <!-- <a class="file-a" v-if="item.msgType == 'file'" :href="item.fileUrl" :download="item.info"
                        >点击下载</a
                      > -->
                    <!-- <span class="file-a" v-if="item.msgType == 'file'" @click="downloadClick(item)">点击下载</span> -->
                    <div v-if="item.msgType == 'file'" class="bg-div">
                      <div>
                        {{ item.info }}
                      </div>
                      <div
                        class="adress-button"
                        v-if="
                          toInfo.isAccept === '1' || toInfo.isAccept === true
                        "
                      >
                        <el-button
                          type="primary"
                          size="small"
                          @click="acceptAgreen(item)"
                          >下载</el-button
                        >
                        <el-button size="small" @click="acceptViteChange(false)"
                          >拒绝</el-button
                        >
                      </div>
                      <div v-else class="refuse">
                        已拒绝该简历,是否开启。
                        <el-button
                          type="primary"
                          size="small"
                          @click="acceptViteChange(true)"
                          >同意</el-button
                        >
                      </div>
                    </div>
                    <div v-else class="bg-div">
                      {{ item.info }}
                    </div>

                    <!-- </span> -->
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
              <button @click="fileClick()">发文件</button>
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
              <textarea
                v-model="message"
                @keyup.enter="sendMessage()"
              ></textarea>
              <div class="btn-div">
                <button @click="sendMessage()">发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
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
            @click="closeJb"
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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import webIMmixin from "@/lin/mixin/webIMmixin";
import Oxman from "@/api/oxman";

export default {
  name: "communicate",
  mixins: [webIMmixin],
  computed: {
    ...mapGetters(["userId", "oxTitle"]),
  },
  data() {
    return {
      jbStep: 1,
      showJb: false,
      reportInfo: {},
      reportArr: [
        {
          name: "面试爽约",
          desc: "求职者存在面试舞弊的行为",
          id: 1,
        },
        {
          name: "广告",
          desc: "求职者存在推广产品或寻求投资、合作等行为",
          id: 2,
        },
        {
          name: "色情",
          desc: "求职者发布含有色情类的信息",
          id: 3,
        },
        {
          name: "违法政治-政治敏感",
          desc: "求职者宣传涉政违法等敏感言论或存在违法行为",
          id: 4,
        },
        {
          name: "个人简历不真实",
          desc: "求职者简历虚假或存在非本人求职情况",
          id: 5,
        },
        {
          name: "人身攻击",
          desc: "求职者存在辱骂、骚扰等语言或肢体上的不当行为",
          id: 6,
        },
        {
          name: "索取隐私",
          desc: "求职者无正常求职恶意索取隐私猎头",
          id: 7,
        },
        {
          name: "猎头骚扰",
          desc: "猎头、中介等机构冒充求职者寻求合作或反向招聘",
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
  mounted() {
    this.showJb = false;
    sessionStorage.removeItem("jobInfo");
    this.hiMessageList();
  },
  methods: {
    acceptAgreen(item) {
      this.acceptViteChange(true);
      this.downloadClick(item);
    },
    // 打招呼列表
    hiMessageList() {
      Oxman.hiMessageList({}).then((res) => {
        this.messageList = res.data;
      });
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
    handlePreview(file) {
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
        complainUserType: 2,
        respondentUserId: this.toInfo.userId,
        respondentUserType: 1,
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
* {
  box-sizing: border-box;
}
.refuse {
  font-size: 12px;
  margin-top: 5px;
  color: #8b8b8b;
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
.adress-button {
  margin-top: 10px;
}
.home-div {
  width: 1200px;
  margin: auto;
  // padding: 20px 0;
  .tag-div {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 18px;
  }
  .main {
    display: flex;
    align-items: stretch;
    justify-content: center;
    margin: 16px 0;
    height: 570px;
    width: 100%;
  }
  .main-left,
  .main-right {
    background: #fff;
    border-radius: 6px;
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
            width: calc(100% - 24px);
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
      margin: 10px 10px 0;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 4px;
        // display: none;
        // height: 0px;
      }
      &::-webkit-scrollbar-thumb {
        width: 4px;
        background: #8b8b8b;
        // display: none;
      }
      // border-bottom: 1px solid #a4a4a4;
      .content-div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
          margin-left: 20px;
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
          margin-left: 0;
          .message-p {
            border-radius: 6px 0 6px 6px;
            .bg-div {
              border-radius: 6px 0 6px 6px;
            }
          }
        }
      }
    }

    .title-div {
      text-align: left;
    }
    .edu-div {
      background: #fafbfd;
      box-shadow: 0 2px 5px 0px #f1f1f1;
      .edu-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        text-align: left;
        line-height: 26px;
        padding: 10px 40px 4px;
        .left-div {
          width: 65%;
          .row-div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            span {
              display: inline-block;
            }
            .name {
              font-weight: normal;
              font-size: 16px;
              color: #bbb;
              margin-right: 10px;
              width: 130px;
            }
            .text {
              width: calc(100% - 180px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .right-div {
          width: 35%;
          span {
            display: inline-block;
          }
          .name {
            font-weight: normal;
            font-size: 14px;
            color: #bbb;
          }
        }
      }
      .footer-img {
        img {
          width: 18px;
          height: 18px;
          margin: auto;
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
          // background: #ededed;
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
              // background: #00c292;
              // padding: 4px 12px;
              // border-radius: 4px;
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
}
::v-deep {
  .el-tag {
    color: #3963bc;
    border-radius: 4px;
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
  display: flex;
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
</style>
