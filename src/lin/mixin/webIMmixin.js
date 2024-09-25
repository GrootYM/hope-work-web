import Auth from "@/api/auth";
import Oxman from "@/api/oxman";
import WebIM from "@/lin/util/WebIM";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      moreInfoShow: true,
      show: require("@/assets/image/job/top.png"),
      hide: require("@/assets/image/login/dropdown.png"),
      img: require("@/assets/image/user/user.png"),
      fileList: [], // 附件简历
      list: [], // 会话列表
      messageList: [], // 打招呼列表
      toInfo: {}, // 当前聊天对象
      userInfo: {
        // 当前登录对象
        username: "",
      },
      message: "",
      dialogVisible: false,
      dialogVisibleFile: false,
      radioChecked: "", // 选中的附件简历
      newKey: new Date().getTime(),
      timer: null,
      fileShowDialog: false, // 上传简历弹框
      vitaeId: null,
      paramsFileDialog: {
        type: 2,
      },
      fileListDialog: [],
      warnShow: false, // 举报信息是否显示完整
      unreadSum: 0,
      timeKey: new Date().getTime(),
      metaContent: "",
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    getCount() {
      let a = 0;
      this.list.forEach((item) => {
        a += item.unreadNum;
      });
      return a;
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log(23, to, from);
    if (sessionStorage.getItem("userInfo")) {
      let info = JSON.parse(sessionStorage.getItem("userInfo"));
      if (from.name == "communicate" || from.name == "immediately") {
        info.unreadSum = this.getCount;
      } else {
        console.log(23, this.unreadSum);
        info.unreadSum = this.unreadSum;
      }
      sessionStorage.setItem("userInfo", JSON.stringify(info));
    }
    next();
  },
  watch: {
    $route: {
      handler(v, from) {
        console.log("aaaa");
        console.log(v, from, this.userId);
        // console.log(v.meta.keywords)
        if (sessionStorage.getItem("userInfo")) {
          this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        }
        if (v.name != "communicate" && v.name != "immediately" && this.flag) {
          let info = JSON.parse(sessionStorage.getItem("userInfo"));
          this.unreadSum = info.unreadSum;
          this.getMessage();
          if (this.userInfo.userType == "1") {
            if (!info.username) {
              this.getImUnReadCount();
            } else {
              Object.assign(info, {
                unreadSum: this.unreadSum,
              });
              sessionStorage.setItem("userInfo", JSON.stringify(info));
            }
          } else if (this.userInfo.userType == "2") {
            if (!info.username) {
              this.getImUnReadCount();
            }
          }
        }
        this.$forceUpdate();
      },
      deep: true,
      immediate: true,
    },
  },
  destroyed() {},
  created() {},
  mounted() {
    if (this.flag) return;
    console.log("route", this.$route);
    if (
      this.$route.name == "communicate" ||
      this.$route.name == "immediately"
    ) {
      if (!this.userId) {
        this.$router.push("/login/login");
        return;
      }
      if (sessionStorage.getItem("userInfo")) {
        this.flag = true;
        let info = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!info.username) {
          this.toRegister(info);
        } else {
          this.getInit();
        }
      } else {
        this.$router.push("/login/login");
      }
    } else {
      // this.getMessage()
      console.log("000000000", WebIM.conn.isOpened());
      // sessionStorage.removeItem('perInfo')
      // sessionStorage.removeItem('jobInfo')
    }
  },
  methods: {
    getImUnReadCount() {
      Oxman.getImUnReadCount({}).then((res) => {
        if (res.code == "200") {
          this.unreadSum = res.data;
        }
      });
    },
    async getInit(obj = {}) {
      let _this = this;
      this.list = [];
      // 个人端
      let jobInfo = sessionStorage.getItem("jobInfo");
      let perInfo = sessionStorage.getItem("perInfo");
      if (jobInfo) {
        jobInfo = JSON.parse(jobInfo);
        let obj = {
          isHis: false,
          userType: jobInfo.userInfo.userType,
          userId: jobInfo.userInfo.userId,
          positionId: jobInfo.id,
          listname:
            jobInfo.userInfo &&
            (jobInfo.userInfo.userName ||
              String(jobInfo.userInfo.userId) +
                String(jobInfo.userInfo.userType) ||
              "2"),
          companyName: jobInfo.userInfo && jobInfo.userInfo.companyName,
          roleName: jobInfo.userInfo && jobInfo.userInfo.roleName,
          positionName: jobInfo.positionName,
          cityName: jobInfo.cityName,
          salary: `${jobInfo.lowSalary} - ${jobInfo.topSalary}k`,
          username:
            jobInfo.userInfo &&
            (String(jobInfo.userInfo.userId) +
              String(jobInfo.userInfo.userType) ||
              "2"),
          messageList: [],
          checked: false,
        };
        this.toInfo = obj;
      } else if (perInfo) {
        // 企业端
        perInfo = JSON.parse(perInfo);
        let obj = {
          isHis: false,
          userType: "1",
          userId: perInfo.userId,
          positionId: perInfo.positionId,
          listname: perInfo.userName,
          positionTypeName: perInfo.positionTypeName,
          positionName: perInfo.positionName,
          img: perInfo.headPath,
          age: perInfo.age,
          cityName: perInfo.cityName,
          activityStatus: perInfo.activityStatus,
          username: String(perInfo.userId) + "1",
          messageList: [],
          checked: false,
          workTime: perInfo.workTime,
          education: perInfo.education,
          workStartTime:
            perInfo.workExperienceList &&
            perInfo.workExperienceList[0] &&
            perInfo.workExperienceList[0].startTime,
          workeEndTime:
            perInfo.workExperienceList &&
            perInfo.workExperienceList[0] &&
            perInfo.workExperienceList[0].endTime,
          company: perInfo.lastcCompanyName,
          workPositionTypeName: perInfo.lastPositionName,
          schoolName: perInfo.schoolName,
          major: perInfo.major,
          educationStartTime: perInfo.startTime,
          educationEndTime: perInfo.endTime,
          educationExperienceList: perInfo.educationExperienceList || [
            {
              startTime: perInfo.startTime || "",
              endTime: perInfo.endTime || "",
              schoolName: perInfo.schoolName || "",
              major: perInfo.major || "",
              education: perInfo.education || "",
            },
          ],
          workExperienceList: perInfo.workExperienceList,
        };
        this.toInfo = obj;
      }
      if (this.userInfo.username) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
          _this.getConversationlist();
        }, 1000);
      }

      console.log("55555555555");
      this.getMessage();
    },
    // 会话列表
    async getConversationlist() {
      let _this = this;
      await WebIM.conn
        .getConversationlist()
        .then(async (res) => {
          console.log("list", res);
          if (res.data.channel_infos && res.data.channel_infos.length > 0) {
            let listData = [];
            let personInfoRes = [];
            for (let i = 0; i < res.data.channel_infos.length; i++) {
              let item = res.data.channel_infos[i];
              let listname =
                item.lastMessage.from == _this.userInfo.username
                  ? item.lastMessage.to
                  : item.lastMessage.from;
              let userId = listname.substr(0, listname.length - 1);
              item.isHis = false;
              item.unreadNum = item.unread_num;
              item.listname = listname;
              item.username = listname;
              item.userId = userId;
              item.userType = item.username.substr(-1, 1);
              item.date = moment(item.lastMessage.time).format("YYYY-MM-DD");
              item.lastMsg =
                item.lastMessage.type == "file"
                  ? item.lastMessage.filename
                  : item.lastMessage.msg;
              item.checked = false;

              if (item.lastMsg && item.lastMsg.indexOf("--https://") > -1) {
                let a = item.lastMsg.split("--");
                item.lastMsg = a[0];
              }

              let msgObj = {
                to: item.lastMessage.to,
                from: item.lastMessage.from,
                time: item.date,
                info:
                  item.lastMessage.type == "file"
                    ? item.lastMessage.filename
                    : item.lastMessage.msg,
                msgType: item.lastMessage.type,
              };
              if (item.lastMessage.type == "file") {
                msgObj.fileUrl = item.lastMessage.url;
              }
              item.messageList = [msgObj];
              try {
                let resP = await Oxman.queryMessagePositionInfo({ userId });
                if (resP && resP.data) {
                  if (item.userType == "2") {
                    let dataObj = resP.data.personInfo || {};
                    Object.assign(item, {
                      ...dataObj,
                      warnList: resP.data.warnList || [],
                      listname: dataObj.userName || item.username || "",
                      img: dataObj.headImg || dataObj.headPath || _this.img,
                    });
                    if (dataObj.lowSalary) {
                      item.salary = `${dataObj.lowSalary}k`;
                    }
                    if (dataObj.topSalary) {
                      item.salary = `${dataObj.topSalary}k`;
                    }
                    if (dataObj.topSalary && dataObj.lowSalary) {
                      item.salary = `${dataObj.lowSalary} - ${dataObj.topSalary}k`;
                    }
                  } else if (item.userType == "1") {
                    let dataObj = (resP.data.list && resP.data.list[0]) || {};
                    Object.assign(item, {
                      ...dataObj,
                      isAccept: resP.data.isAccept || true,
                      warnList: resP.data.warnList || [],
                      listname: dataObj.userName || item.username || "",
                      img: dataObj.headPath || _this.img,
                    });
                  }
                  // if (item.username == _this.toInfo.username) {
                  //   _this.list.shift()
                  // }
                  personInfoRes.push(resP);
                }
              } catch (error) {
                console.log("get", error);
              }
              listData.push(item);
            }
            // 个人来源去重
            // const qCobj = listData.map(item => {
            //   return item.lastMessage.from
            // })
            // console.log(qCobj)
            // const newArr = Array.from(new Set(qCobj))
            // console.log(newArr)
            // const newArr1 = []
            // newArr.forEach(v => {
            //   let obj = null
            //   for(let i = 0; i < listData.length; i++) {
            //     let item = listData[i]
            //     if (item.lastMessage.from === v) {
            //       obj = item
            //       break
            //     }
            //   }
            //   newArr1.push(obj)
            // })
            // console.log(newArr1)
            _this.list = listData;
            await Promise.all(personInfoRes);
          }
          if (
            _this.toInfo &&
            (sessionStorage.getItem("perInfo") ||
              sessionStorage.getItem("jobInfo"))
          ) {
            let toIndex =
              _this.toInfo &&
              _this.list.findIndex((e) => e.userId == _this.toInfo.userId);
            if (toIndex > -1) {
              let obj = JSON.parse(JSON.stringify({ ..._this.list[toIndex] }));
              _this.list.splice(toIndex, 1);
              _this.list.unshift(obj);
            } else {
              // 企业端
              if (_this.toInfo.userType == "1") {
                try {
                  let resP = await Oxman.queryMessagePositionInfo({
                    userId: _this.toInfo.userId,
                  });
                  if (resP && resP.data) {
                    let dataObj = (resP.data.list && resP.data.list[0]) || {};
                    Object.assign(_this.toInfo, {
                      ...dataObj,
                      isAccept: resP.data.isAccept || true,
                      warnList: resP.data.warnList || [],
                      listname: dataObj.userName || _this.toInfo.username || "",
                      img: dataObj.headPath || _this.img,
                    });
                  }
                } catch (error) {}
              }
              _this.list.unshift(_this.toInfo);
            }
          }
          if (_this.list.length > 0) {
            await _this.checkedClick(_this.list[0]);
          }
          console.log("list1111111111111", _this.list);

          // 第一次聊天打招呼
          let _toInfo = null;
          let username = null;
          if (sessionStorage.getItem("jobInfo")) {
            _toInfo = JSON.parse(sessionStorage.getItem("jobInfo"));
            username = String(_toInfo.userInfo.userId) + "2";
          } else if (sessionStorage.getItem("perInfo")) {
            _toInfo = JSON.parse(sessionStorage.getItem("perInfo"));
            username = String(_toInfo.userId) + "1";
          }
          if (
            username &&
            username == _this.list[0].username &&
            _this.list[0].messageList.length == 0
          ) {
            _this.list[0].positionId = _toInfo.id || null;
            _this.toInfo.positionId = _toInfo.id || null;
            await _this.hiMessageSend();
          }
        })
        .catch((e) => {
          console.log("getConversationlist e", e);
          if (e.type == 700 || e.type == 39) {
            this.toLogin(_this.userInfo);
          }
        });
    },
    // 切换聊天目标
    async checkedClick(obj) {
      console.log("checkedClick", obj);
      obj.unreadNum = 0;
      // 清空IM会话未读消息
      if (obj.unread_num > 0) {
        let option = {
          chatType: "singleChat", // 会话类型，设置为单聊。
          type: "channel", // 消息类型。
          to: obj.username, // 接收消息对象的用户 ID。
        };
        let msg = WebIM.message.create(option);
        WebIM.conn.send(msg);
        obj.unread_num = 0;
      }
      if (obj) {
        try {
          await this.queryMessageHistory(obj);
        } catch (error) {
          console.log("error", error);
        }
        if (!obj.userName) {
          try {
            let resP = await Oxman.queryMessagePositionInfo({
              userId: obj.userId,
            });
            console.log("8888888888", obj);
            if (resP && resP.data) {
              if (obj.userType == "2") {
                let dataObj = resP.data.personInfo;
                Object.assign(obj, {
                  ...dataObj,
                  warnList: resP.data.warnList || [],
                  listname: dataObj.userName || obj.username || "",
                  img: dataObj.headImg || this.img,
                });
                if (dataObj.lowSalary) {
                  obj.salary = `${dataObj.lowSalary}k`;
                }
                if (dataObj.topSalary) {
                  obj.salary = `${dataObj.topSalary}k`;
                }
                if (dataObj.topSalary && dataObj.lowSalary) {
                  obj.salary = `${dataObj.lowSalary} - ${dataObj.topSalary}k`;
                }
              } else if (obj.userType == "1") {
                let dataObj = (resP.data.list && resP.data.list[0]) || {};
                Object.assign(obj, {
                  ...dataObj,
                  isAccept: resP.data.isAccept || true,
                  warnList: resP.data.warnList || [],
                  listname: dataObj.userName || obj.username || "",
                  img: dataObj.headPath || this.img,
                });
              }
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                if (item.username == obj.username) {
                  Object.assign(item, { ...obj });
                  break;
                }
              }
            }
          } catch (error) {}
        }
      }
      this.list.forEach((item) => {
        item.checked = item.username == obj.username;
      });
      console.log("000000", this.list, obj);
      this.toInfo = obj || {};

      // this.timeKey = new Date().getTime()
      this.$forceUpdate();
      this.$nextTick(function () {
        let dom = document.querySelector("#contentRef");
        if (dom) {
          dom.scrollTop = dom.scrollHeight;
        }
      });
    },
    // 删除指定会话
    delClick(obj) {
      console.log(obj);
      let _this = this;
      this.$confirm("确认删除？")
        .then((_) => {
          WebIM.conn
            .deleteConversation({
              channel: obj.username,
              chatType: "singleChat",
              deleteRoam: true,
            })
            .then((res) => {
              console.log("del", res);
              let findIndex = _this.list.findIndex(
                (e) => e.username == obj.username
              );
              if (findIndex > -1) {
                _this.list.splice(findIndex, 1);
              }
              // _this.toLogin()
              _this.$message.success("删除成功");
            })
            .catch((e) => {
              console.log("e", e);
            });
        })
        .catch((_) => {});
    },
    // 发送消息
    sendMessage(msgStr) {
      let message = msgStr || this.message;
      console.log(111111111111111, message);
      if (!message) {
        this.errorTips = "发送消息不能为空";
        return;
      }
      let _this = this;
      let id = WebIM.conn.getUniqueId(); // 生成本地消息id
      let msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: message,
        to: _this.toInfo.username,
        chatType: "singleChat",
        success: function (id, serverMsgId) {
          _this.$message.success("发送成功");
          let index = _this.list.findIndex((e) => e.checked);
          let date = _this.list[index].date;
          if (date != moment().format("YYYY-MM-DD")) {
            _this.list[index].date = moment().format("YYYY-MM-DD");
          }
          let msgList = JSON.parse(
            JSON.stringify(_this.list[index].messageList)
          );
          let obj = {
            to: _this.toInfo.username,
            from: _this.userInfo.username,
            time: moment().format("YYYY-MM-DD HH:mm"),
            info: message,
            msgType: msgStr ? "file" : "txt",
          };
          if (msgStr) {
            obj.info = msgStr.split("--")[0];
            obj.fileUrl = msgStr.split("--")[1];
          }
          msgList.push(obj);
          _this.list[index].lastMsg = message;
          _this.list[index].messageList = msgList;
          if (index > 0) {
            let obj = JSON.parse(JSON.stringify(_this.list[index]));
            _this.list.splice(index, 1);
            _this.list.unshift(obj);
            // _this.checkedClick(_this.list[0])
          }
          if (index != 0) {
            _this.checkedClick(_this.list[0]);
          }
          let params = {
            senderId: _this.userInfo.userId,
            receiverId: _this.toInfo.userId,
            msgType: msgStr ? "file" : "txt",
            senderUserType: _this.userInfo.userType,
            receiverUserType: _this.toInfo.userType,
            positionId: _this.toInfo.positionId,
            message,
          };
          // if (_this.userInfo.userType == '1') {
          // params.positionId = _this.toInfo.positionId
          // }
          Oxman.sendMessage(params);
          _this.$forceUpdate();
          _this.$nextTick(function () {
            let dom = document.querySelector("#contentRef");
            if (dom) {
              dom.scrollTop = dom.scrollHeight;
            }
          });
        },
        fail: function (e) {
          console.log("发送失败", e);
          _this.$message.success("发送失败");
        },
      });
      WebIM.conn.send(msg.body).catch((e) => {
        console.log("e", e);
        if (e.type == 700 || e.type == 39) {
          this.toLogin();
          // .then(()=>{
          // this.sendMessage(message)
          // })
        }
      });

      this.message = "";
    },
    // 接收消息
    getMessage() {
      let _this = this;
      console.log("666666666");
      WebIM.conn.listen({
        onOpened: function (message) {
          console.log("已上线", message);
        },
        onTextMessage: async function (message) {
          console.log("收收收收收收收", message);
          await _this.setMessageList(message);
          console.log("gemsg", _this.list);
        }, // 接收文本消息
        onFileMessage: function (message) {
          console.log("收file", message);
          _this.setMessageList(message);
        }, // 接收文件消息
        onClosed: function (message) {
          console.log("closed", message);
        }, // 连接关闭回调
        // SDK 与环信服务器连接成功。
        onConnected: function (message) {},
        // SDK 与环信服务器断开连接。
        onDisconnected: function (message) {},
        // 当前用户收到图片消息。
        onImageMessage: function (message) {},
        // 当前用户收到透传消息。
        onCmdMessage: function (message) {},
        // 当前用户收到语音消息。
        onAudioMessage: function (message) {},
        // 当前用户收到位置消息。
        onLocationMessage: function (message) {},
        // 当前用户收到自定义消息。
        onCustomMessage: function (message) {},
        // 当前用户收到视频消息。
        onVideoMessage: function (message) {},
        // 当前用户订阅的其他用户的在线状态更新。
        onPresence: function (message) {},
        // 当前用户收到好友邀请。
        onContactInvited: function (msg) {},
        // 联系人被删除。
        onContactDeleted: function (msg) {},
        // 新增联系人。
        onContactAdded: function (msg) {},
        // 当前用户发送的好友请求被拒绝。
        onContactRefuse: function (msg) {},
        // 当前用户发送的好友请求被同意。
        onContactAgreed: function (msg) {},
        // 当前用户收到群组邀请。
        onGroupEvent: function (message) {},
        // 本机网络连接成功。
        onOnline: function () {},
        // 本机网络掉线。
        onOffline: function () {},
        // 调用过程中出现错误。
        onError: function (message) {},
        // 当前用户收到的消息被消息发送方撤回。
        onRecallMessage: function (message) {
          console.log("onRecallMessage", message);
        },
        // 当前用户发送的消息被接收方收到。
        onReceivedMessage: function (message) {
          console.log("onReceivedMessage", message);
        },
        // 当前用户收到消息送达回执。
        onDeliveredMessage: function (message) {
          console.log("onDeliveredMessage", message);
        },
        // 当前用户收到消息已读回执。
        onReadMessage: function (message) {
          console.log("onReadMessage", message);
        },
        // 当前用户收到会话已读回执。
        onChannelMessage: function (message) {
          console.log("onChannelMessage", message);
        },
      });
    },
    async setMessageList(message) {
      let _this = this;
      let index = -1,
        activeIndex = -1;
      if (
        this.$route.name != "communicate" &&
        this.$route.name != "immediately"
      ) {
        this.unreadSum++;
        console.log(15, this.unreadSum);
        let info = JSON.parse(sessionStorage.getItem("userInfo"));
        Object.assign(info, {
          unreadSum: this.unreadSum,
        });
        sessionStorage.setItem("userInfo", JSON.stringify(info));
        return;
      }

      if (_this.list.length > 0) {
        index = _this.list.findIndex((e) => e.username == message.from);
        activeIndex = _this.list.findIndex((e) => e.checked);
      }
      console.log("7777777", index, activeIndex, message);
      let date = moment(Number(message.time)).format("YYYY-MM-DD");
      if (message.data && message.data.indexOf("--https://") > -1) {
        let a = message.data.split("--");
        message.contentsType = "file";
        message.filename = a[0];
        message.url = a[1];
      }

      message.contentsType = message.contentsType.toLowerCase();

      let info =
        message.contentsType == "file" ? message.filename : message.data;
      let objlist = {
        // ...message,
        msgType: message.contentsType,
        info,
        username: message.from,
        date,
        checked: false,
        lastMsg: info,
      };
      let userId = objlist.username.substr(0, objlist.username.length - 1);
      let userType = objlist.username.substr(-1, 1);
      Object.assign(objlist, {
        userId,
        userType,
      });

      let msgObj = {
        to: message.to,
        from: message.from,
        time: date,
        info,
        msgType: message.contentsType,
      };
      if (message.contentsType == "file") {
        msgObj.fileUrl = message.url;
      }
      if (index > -1) {
        Object.assign(_this.list[index], {
          ...objlist,
        });
        _this.list[index].messageList.push(msgObj);
        if (activeIndex != index) {
          _this.list[index].unreadNum++;
        } else {
          _this.list[index].checked = true;
          this.$forceUpdate();
          this.$nextTick(function () {
            let dom = document.querySelector("#contentRef");
            if (dom) {
              dom.scrollTop = dom.scrollHeight;
            }
          });
        }
      } else {
        objlist.unreadNum = 0;
        objlist.messageList = [msgObj];
        _this.list.unshift(objlist);
        await _this.checkedClick(_this.list[0]);
      }
    },
    toRegister(obj) {
      let _this = this;
      return new Promise((resolve, reject) => {
        let options = {
          nickname: obj.userName || obj.mobile, // 昵称
          username: String(obj.userId) + String(obj.userType), // 用户名
          password: obj.mobile, // 密码
          appKey: WebIM.config.appkey,
          success: async () => {
            Object.assign(obj, {
              username: String(obj.userId) + String(obj.userType),
              nickname: obj.userName || obj.mobile,
              pwd: obj.mobile,
            });
            this.userInfo = obj;
            sessionStorage.setItem("userInfo", JSON.stringify(obj));
            await this.toLogin(obj);
            resolve();
          },
          error: async (err) => {
            if (
              JSON.parse(err.data).error == "duplicate_unique_property_exists"
            ) {
              Object.assign(obj, {
                username: String(obj.userId) + String(obj.userType),
                nickname: obj.userName || obj.mobile,
                pwd: obj.mobile,
              });
              this.userInfo = obj;
              sessionStorage.setItem("userInfo", JSON.stringify(obj));
              // _this.$message.success('用户已存在！')
              console.log("toRegister e", err);
              await this.toLogin(obj);
              return resolve();
            } else if (JSON.parse(err.data).error == "illegal_argument") {
              if (
                JSON.parse(err.data).error_description === "USERNAME_TOO_LONG"
              ) {
                reject();
                return _this.$message.success("用户名超过64个字节！");
              }
              console.log("用户名不合法！");
            } else if (JSON.parse(err.data).error == "unauthorized") {
              console.log("注册失败，无权限！");
            } else if (JSON.parse(err.data).error == "resource_limited") {
              console.log("您的App用户注册数量已达上限");
            }
            reject();
          },
        };
        WebIM.conn.registerUser(options);
      });
    },
    // 重新登录
    toLogin(obj) {
      let _this = this;
      return new Promise((resolve, reject) => {
        let options = {
          user: (obj && obj.username) || _this.userInfo.username, // username
          pwd: (obj && obj.pwd) || _this.userInfo.pwd,
          appKey: WebIM.config.appkey,
          apiUrl: "https://a1.easecdn.com",
        };
        console.log(123, options);
        WebIM.conn
          .open(options)
          .then((res) => {
            console.log(345, obj);
            this.getInit({ isLogin: true });
            resolve(res);
          })
          .catch((e) => {
            console.log(222, e);
            resolve(e);
          });
      });
    },
    // 点击发送文件
    fileClick(type) {
      console.log("fileeeeeee", this.toInfo);
      if (type == "file") {
        this.queryPersonVitaeByUserId()
          .then(() => {
            this.dialogVisibleFile = true;
            console.log(this.fileList);
          })
          .catch(() => {
            this.$confirm("暂无附件简历，去上传").then(async () => {
              this.fileShowDialog = true;
            });
          });
      } else {
        let inputDom = this.$refs.inputDom;
        console.log(inputDom);
        inputDom && inputDom.click();
      }
    },
    //
    async fileChange(e) {
      console.log(11, e);
      console.log(11, e.target.files);
      let _this = this;
      let a = e.target;
      let file = WebIM.utils.getFileUrl(a);
      let url = "";
      if (!file.filename) {
        this.$refs.inputDom.value = null;
        return false;
      }
      let index = this.list.findIndex((e) => e.checked);
      const id = WebIM.conn.getUniqueId();
      const msg = new WebIM.message("file", id);
      console.log(2, file, _this.toInfo.username);
      let option = {
        chatType: "singleChat", // 会话类型，设置为单聊。
        type: "file", // 消息类型，设置为文件。
        to: _this.toInfo.username, // 消息接收方（用户 ID)。
        file: file,
        filename: file.filename,
        onFileUploadError: function (e) {
          // 消息上传失败。
          console.log("onFileUploadError", e);
        },
        onFileUploadProgress: function (progress) {
          // 上传进度的回调。
          console.log(progress);
        },
        onFileUploadComplete: function (e) {
          // 消息上传成功。
          console.log("onFileUploadComplete", e);
          _this.$message.success("发送成功");
          _this.list[index].messageList.push({
            to: _this.toInfo.username,
            from: _this.userInfo.username,
            time: moment().format("YYYY-MM-DD HH:mm"),
            info: file.filename,
            msgType: "file",
            fileUrl: e.uri + "/" + e.entities[0].uuid,
          });
          url = e.uri + "/" + e.entities[0].uuid;
        },
      };
      msg.set(option);
      try {
        await WebIM.conn
          .send(msg.body)
          .then(() => {
            console.log("success"); // 消息发送成功。
          })
          .catch((e) => {
            console.log("fail"); // 如禁言或拉黑后消息发送失败。
          });
      } catch (error) {}

      this.send(`${file.filename}--${url}`);
    },
    send(message) {
      let _this = this;
      let params = {
        senderId: _this.userInfo.userId,
        receiverId: _this.toInfo.userId,
        msgType: "file",
        senderUserType: _this.userInfo.userType,
        receiverUserType: _this.toInfo.userType,
        message,
      };
      if (this.userInfo.userType == "1") {
        params.positionId = _this.toInfo.positionId;
      }
      Oxman.sendMessage(params);
    },
    acceptViteChange(v) {
      console.log(v);
      Oxman.addAcceptVited({
        isAcceptVite: v === true ? "1" : "0",
        userId: this.toInfo.userId,
      }).then((res) => {
        this.toInfo.isAccept = v;
        this.$forceUpdate();
      });
    },
    // 下载简历
    downloadClick(obj) {
      let xml = new XMLHttpRequest();
      xml.open("GET", obj.fileUrl, true);
      xml.responseType = "blob";
      xml.onload = function () {
        let r_url = window.URL.createObjectURL(xml.response);
        let a = document.createElement("a");
        a.href = r_url;
        a.download = obj.info;
        // 使用a标签批量下载文件时最好使用_blank，否则只会下载最后一个文件
        a.setAttribute("target", "_blank");
        a.click();
        a.remove();
      };
      xml.send();
    },
    // 附件简历列表
    queryPersonVitaeByUserId() {
      return new Promise((resolve, reject) => {
        Oxman.queryPersonVitaeByUserId({ userId: this.toInfo.userId })
          .then((res) => {
            if (res.code == "200" && res.data && res.data.length > 0) {
              this.fileList = res.data;
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    // 点击弹框确定
    async confirmClickFile() {
      let jobInfo = sessionStorage.getItem("jobInfo");
      if (jobInfo) {
        jobInfo = JSON.parse(sessionStorage.getItem("jobInfo"));
      }
      let flag = false;
      await Oxman.acceptVited({
        hrId: this.toInfo.userId,
      })
        .then((res) => {
          if (res.code != 200) {
            this.$message.error(res.data);
            flag = true;
            this.dialogVisibleFile = false;
          }
        })
        .catch((e) => {
          this.dialogVisibleFile = false;
          this.$message.error("HR已拒绝接受简历");
          flag = true;
        });
      if (flag) return this.$forceUpdate();
      if (!this.radioChecked) {
        this.$message.error("请选择一个简历");
        return;
      }
      let fileObj = this.fileList.filter(
        (e) => e.vitaeId == this.radioChecked
      )[0];
      let params = {
        userId: this.userInfo.userId,
        // positionId: jobInfo.id, //职位ID
        hrId: this.toInfo.userId, //用户ID
      };
      if (jobInfo && this.toInfo.userId == jobInfo.userInfo.userId) {
        params.positionId = jobInfo.id;
      }
      await Oxman.send(params).then((res) => {
        if (res.code == "200") {
          // 发送消息
          this.sendMessage(`${fileObj.vitaeName}--${fileObj.fileUrl}`);
          this.dialogVisibleFile = false;
        }
      });
    },
    // 获取聊天记录
    queryMessageHistory(obj) {
      return new Promise((resolve, reject) => {
        if (!obj.isHis) {
          Oxman.queryMessageHistory({
            senderId: this.userInfo.userId,
            receiverId: obj.userId,
            currentPage: 1,
            pageSize: 999,
          })
            .then((res) => {
              if (res && res.code == "200" && res.data) {
                let list = [];
                if (res.data.list && res.data.list.length > 0) {
                  res.data.list.forEach((item) => {
                    let obj = {
                      to:
                        String(item.receiverId) + String(item.receiverUserType),
                      from: String(item.senderId) + String(item.senderUserType),
                      time: item.createTime,
                      info: item.message,
                      msgType: item.msgType,
                    };
                    if (item.msgType == "file" && item.message) {
                      obj.info = item.message.split("--")[0];
                      obj.fileUrl = item.message.split("--")[1];
                    } else {
                      obj.info = item.message;
                    }
                    list.push(obj);
                  });
                  if (res.data.positionInfo) {
                    obj.positionName = res.data.positionInfo.positionName || "";
                    obj.cityName = res.data.positionInfo.cityName || "";
                    if (res.data.positionInfo.lowSalary) {
                      obj.salary = `${res.data.positionInfo.lowSalary}k`;
                    }
                    if (res.data.positionInfo.topSalary) {
                      obj.salary = `${res.data.positionInfo.topSalary}k`;
                    }
                    if (
                      res.data.positionInfo.topSalary &&
                      res.data.positionInfo.lowSalary
                    ) {
                      obj.salary = `${res.data.positionInfo.lowSalary} - ${res.data.positionInfo.topSalary}k`;
                    }
                  }
                  list.reverse();
                  obj.isHis = true;
                  obj.messageList = list;
                  obj.lastMsg = list[list.length - 1].info;
                }
                resolve();
              } else {
                resolve();
              }
            })
            .catch(() => {
              resolve();
            });
        } else {
          resolve();
        }
      });
    },
    // 打招呼列表
    hiMessageList() {
      Oxman.hiMessageList({}).then((res) => {
        this.messageList = res.data;
      });
    },
    // 聊天前置消息
    async hiMessageSend() {
      await Oxman.hiMessageSend({
        positionId: this.toInfo.userId || "",
      }).then(async (res) => {
        if (res.code == "200" && res.message == "OK") {
          this.message = res.data;
          await this.sendMessage();
          console.log("33333333333333");
        }
      });
    },

    handlePreviewFileDialog() {},
    handleRemoveFileDialog() {
      if (!this.vitaeId) return;
      Auth.deleteResumeById({ vitaeId: this.vitaeId }).then((res) => {});
    },
    handleSuccessFileDialog(res, file, fileList) {
      const params = {
        userId: this.userId,
        fileId: res.data.fileId,
      };
      const _this = this;
      Auth.userDetailEdit(params).then((res) => {
        _this.getResumeList();
      });
      _this.fileShowDialog = false;
    },
    async getResumeList() {
      let res = await Auth.queryResumeByUserId({ userId: this.userId });
      this.vitaeId = res.data[0].vitaeId;
    },
  },
};
