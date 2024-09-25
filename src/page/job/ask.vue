<template>
  <div class="main">
    <div class="formBox">
      <el-button class="goBack" @click="goBack">返回</el-button>
      <img class="bjW" src="@/assets/image/job/hopeBj2.png" alt="" />
      <el-form
        ref="form"
        :model="form"
        @submit.native.prevent
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="姓名：" prop="userName">
          <el-input type="text" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input type="text" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="身份：" prop="askType">
          <el-select v-model="form.askType" placeholder="请选择身份">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in askTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询事项：" prop="askDesc">
          <el-input
            type="textarea"
            v-model="form.askDesc"
            maxlength="300"
            show-word-limit
            rows="8"
            resize="none"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="简历：" v-if="isEmployer">
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
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Job from "@/api/job";
import Button from "../../plugin/lin-cms-ui/view/basic/button/button.vue";
import Seo from "../../api/seo";
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
        askType: null,
        askDesc: "",
        fileId: null,
      },
      submited: true,
      fileList: [],
      fileInfo: {},
      askTypeList: [
        { value: 1, label: "个人" },
        { value: 2, label: "企业" },
      ],
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [
          { validator: checkPhone, trigger: "blur" },
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        askType: [
          { required: true, message: "请选择咨询身份", trigger: "blur" },
        ],
        askDesc: [
          { required: true, message: "请输入咨询事项", trigger: "blur" },
        ],
      },
      dynamicKeywords: '',
      dynamicDescription : ''
    };
  },
  mounted() {},
  computed: {
    isEmployer() {
      return this.form.askType === 1;
    },
  },
  created() {
    this.fetchMetaData();
  },
  methods: {
    async fetchMetaData() {
      let { endpoint, params } = this.$route.meta.fetchMetaData;
      let response = await Seo.getSeoInfo(params)
      this.dynamicKeywords = response.data.keyword;
      this.dynamicDescription = response.data.description;
    },
    handleExceed(file, fileList) {
      this.$message.error("请先删除已上传文件");
    },
    handleSuccess(res, file, fileList) {
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
    expertAdd() {
      const _this = this;
      this.form.fileId = this.fileInfo.fileId;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res = await Job.askQuestion(_this.form);
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
              askType: null,
              askDesc: "",
              fileId: null,
            };
            _this.fileInfo = {};
            _this.fileList = [];
            _this.$refs.form.clearValidate();
          } else {
            _this.$message.error(res.data);
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
