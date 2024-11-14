<template>
  <div class="main">
    <div class="formBox">
      <el-button class="goBack" @click="goBack">返回</el-button>
      <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        @submit.native.prevent
        label-width="80px"
      >
        <el-form-item label="姓名：" prop="userName">
          <el-input type="text" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input type="text" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="行业类型：" prop="labelId">
          <el-select v-model="form.labelId" placeholder="请选择行业类型">
            <el-option
              :label="item.industryName"
              :value="item.id"
              v-for="(item, index) in recommendArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="专家等级：">
          <el-select v-model="form.level" placeholder="请选择专家等级">
            <el-option
              :label="item.expertTitle"
              :value="item.expertLevel"
              v-for="(item, index) in levelArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="申请描述：" prop="expertDesc">
          <el-input type="textarea" v-model="form.expertDesc"></el-input>
        </el-form-item>
        <el-form-item label="简历：">
          <el-upload
            class="upload-demo"
            action="/api-recruit/api-common/oss/file-upload"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :limit="1"
          >
            <button>上传简历</button>
          </el-upload>
        </el-form-item>
        <div class="btnBox">
          <button @click="toHome">取消</button>
          <button @click="expertAdd">提交</button>
        </div>
      </el-form>
      <!-- <div class="submitedBox" v-if="userInfo.expertStatus == 1 || userInfo.expertStatus == 2">
        <img src="@/assets/image/job/successsIcon.png" alt="" />
        <p v-if="userInfo.expertStatus == 1">您已提交成功，请等待审核！</p>
        <p v-if="userInfo.expertStatus == 2">已审核成功</p>
        <button @click="toHome">返回首页</button>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Seo from "../../api/seo";


import Job from "@/api/job";
import Button from "../../plugin/lin-cms-ui/view/basic/button/button.vue";
export default {
  components: { Button },
  watch: {},
  computed: {
    ...mapGetters(["userInfo", "userId"]),
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      //手机号码校验
      const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
      if (!value) {
        return callback(new Error("请输入正确的手机号"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的手机号"));
          }
        }
      }, 100);
    };
    return {
      form: {
        userName: "",
        mobile: "",
        labelId: null,
        expertDesc: "",
        fileId: null,
      },
      recommendArr: [],
      levelArr: [],
      submited: true,
      fileList: [],
      fileInfo: {},
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [
          { validator: checkPhone, trigger: "blur" },
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        labelId: [
          { required: true, message: "请选择行业类型", trigger: "blur" },
        ],
        expertDesc: [
          { required: true, message: "请输入申请描述", trigger: "blur" },
        ],
      },
      dynamicKeywords: '',
      dynamicDescription : ''
    };
  },
  mounted() {
    // if (!this.userId) {
    //   this.$router.push({ path: '/login/login' })
    //   return
    // }
    this.expertLevel();
    this.queryHotIndustryType();
  },
  created() {
    this.fetchMetaData();
  },
  methods: {
    async fetchMetaData() {
      const head = document.head;
      // 清除旧的<meta>标签
      Array.from(head.querySelectorAll('meta[name="keywords"], meta[name="description"]')).forEach(tag => tag.remove());
      let { endpoint, params } = this.$route.meta.fetchMetaData;
      let response = await Seo.getSeoInfo(params)
      this.dynamicKeywords = response.data.keyword;
      this.dynamicDescription = response.data.description;
    },
    handleExceed(file, fileList) {
      this.$message.error("请先删除已上传文件");
    },
    handleSuccess(res, file, fileList) {
      // console.log(res, file, fileList)
      this.fileInfo = res.data;
      this.fileList = fileList;
    },
    //返回上一页
    goBack() {
      this.routerGo(-1);
    },
    toHome() {
      this.$router.push({
        path: "/",
      });
    },
    async expertLevel() {
      let params = {};
      let res = await Job.expertLevel(params);
      if (res.code == 200) {
        this.levelArr = res.data;
      }
    },
    async queryHotIndustryType() {
      let params = {};
      let res = await Job.expertCat(params);
      if (res.code == 200) {
        this.recommendArr = res.data;
      }
    },
    async expertAdd() {
      // if (!this.form.userName) {
      //   this.$message.error('请输入姓名')
      //   return
      // }
      // if (!/^1[3456789]\d{9}$/.test(this.form.mobile)) {
      //   this.$message.error('请输入正确的手机号')
      //   return
      // }
      // if (!this.form.labelId) {
      //   this.$message.error('请选择行业类型')
      //   return
      // }
      // if (!this.form.expertDesc) {
      //   this.$message.error('请输入申请描述')
      //   return
      // }
      // if (!this.fileInfo.fileId) {
      //   this.$message.error('请上传简历')
      //   return
      // }
      let params = {
        expertDesc: this.form.expertDesc,
        labelId: this.form.labelId,
        fileId: this.fileInfo.fileId,
        mobile: this.form.mobile,
        userName: this.form.userName,
        // level: this.form.level,
        // userId: this.userId,
      };
      const _this = this;
      this.form.fileId = this.fileInfo.fileId;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res = await Job.expertAdd(params);
          if (res.code == 200) {
            _this.$message({
              message: "感谢您的信任，我们的工作人员在必要时会和您联系。",
              type: "success",
              duration: 2000,
              customClass: "my-message",
            });
            _this.form = {
              userName: "",
              mobile: "",
              labelId: null,
              expertDesc: "",
              fileId: null,
            };
            _this.fileInfo = {};
            _this.fileList = [];
            _this.$refs.form.clearValidate();
          } else {
            _this.$message.error(res.message);
          }
        }
      });
    },
  },
  metaInfo() {
    return {
      meta: [{ name: "keywords", content: this.dynamicKeywords }, {name: "description", content: this.dynamicDescription}],
    };
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
    padding-top: 20px;
    background: linear-gradient(
      180deg,
      rgba(36, 70, 168, 0.25) 0%,
      rgba(36, 70, 168, 0) 100%
    );
  }
  .formBox {
    width: 1200px;
    height: 651px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    margin-bottom: 20px;
    position: relative;

    .goBack {
      position: absolute;
      top: 0;
      left: -72px;
    }
  }
  .el-form {
    width: 100%;
    height: 100%;
    padding: 70px 0 40px 0;
    box-sizing: border-box;
    position: relative;
    z-index: 100;
    .el-form-item {
      display: flex;
      justify-content: center;
    }
    .btnBox {
      display: flex;
      justify-content: center;
      margin-top: 80px;
      button {
        width: 100px;
        height: 40px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #dadde2;
        font-size: 14px;
        color: #333333;
        margin: 0 8px;
        cursor: pointer;
      }
      button:last-child {
        background: linear-gradient(90deg, #2559c2 0%, #63a5f6 100%);
        border: none;
        color: #fff;
      }
    }
  }
  .submitedBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 112px;
      height: 112px;
    }
    p {
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.9);
      line-height: 22px;
      margin: 24px 0;
    }
    button {
      width: 92px;
      height: 40px;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #2446a8;
      font-size: 14px;
      color: #2446a8;
      background: #fff;
      cursor: pointer;
    }
  }
}
.main ::v-deep .el-form-item__label {
  padding: 0;
  color: #666666;
}
.main ::v-deep .el-form-item__content {
  padding: 0;
  width: 483px;
  margin-left: 16px !important;
  margin-bottom: 0px;
  .el-select {
    width: 100%;
  }
  .el-textarea__inner {
    height: 192px;
  }
}

.upload-demo {
  width: 100%;
  display: flex;
  justify-content: flex-start;
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
