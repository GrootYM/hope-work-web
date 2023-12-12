<template>
  <div class="main">
    <el-button class="goBack" v-if="userInfo.userType == 1" @click="goBack">返回</el-button>
    <div class="content">
      <div class="cur-div">
        <span>当前</span>
        <span class="cur-span">{{ curMsgObj.message }}</span>
      </div>
      <div class="set-div">
        <span>自定义</span>
        <el-input class="set-input" v-model="message" placeholder="请输入自定义打招呼语" clearable=""></el-input>
        <el-button @click="sureClick">确定</el-button>
      </div>
      <div class="list-div">
        <el-radio-group v-model="radio" @change="changeRadio">
          <el-radio v-for="(item, i) in messageList" :key="i" :label="item.id">{{ item.message }}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Oxman from '@/api/oxman'
export default {
  name: 'settingPage',

  data() {
    return {
      messageList: [], // 打招呼列表
      curMsgObj: {},
      radio: '',
      message: '',
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userId']),
  },
  async mounted() {
    try {
      await this.hiMessageSend()
    } catch (error) {}
    this.hiMessageList()
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    sureClick() {
      if (!this.message) {
        return this.$message.error('打招呼语不能为空！')
      }
      Oxman.addMessageInfo({
        message: this.message,
      }).then(res => {
        if (res.code == '200') {
          this.message = ''
          this.$message.success('设置成功')
          this.hiMessageList()
        }
      })
    },
    changeRadio(label) {
      let obj = this.messageList.filter(e => e.id == label)[0]
      this.curMsgObj = obj
      Oxman.hiMessageCheck({ messageId: label }).then(res => {
        if (res.code == '200') {
          this.$message.success('设置成功')
        }
      })
    },
    // 聊天前置消息
    async hiMessageSend() {
      let userInfo = sessionStorage.getItem('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      } else {
        userInfo = {}
      }
      await Oxman.hiMessageSend({
        positionId: userInfo.userId || '',
      }).then(async res => {
        if (res.code == '200' && res.message == 'OK') {
          this.curMsgObj.message = res.data
        }
      })
    },
    // 打招呼列表
    hiMessageList() {
      Oxman.hiMessageList({}).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].message == this.curMsgObj.message) {
            this.curMsgObj = res.data[i]
            this.radio = res.data[i].id
            break
          }
        }
        this.messageList = res.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  border-radius: 20px;
  // width: 1200px;
  height: calc(100% - 80px);
  margin: 40px 120px;
  display: flex;
  align-items: flex-start;
  // flex-direction: column;
  padding: 0 40px;
  .goBack {
    margin: 22px 20px 0 0;
  }
  .content {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .cur-div {
    text-align: left;
    margin: 20px 0 10px;
    .cur-span {
      display: inline-block;
      background: #f6f7fa;
      width: calc(100% - 64px);
      margin-left: 10px;
      padding: 8px 10px;
      border-radius: 4px;
      color: #a4a4a4;
    }
  }
  .set-div {
    display: flex;
    align-items: center;
    .set-input {
      width: 600px;
      margin: 0 10px;
    }
  }
  .list-div {
    // flex: 1;
    // border-top: 1px dotted #a4a4a4;
    // height: calc(100% - 50px);
    overflow-y: scroll;
    border: 1px solid #a4a4a4;
    margin: 10px 0 20px;
    ::v-deep {
      .el-radio {
        display: block;
        text-align: left;
        padding: 20px;
        border-bottom: 1px solid #a4a4a4;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
