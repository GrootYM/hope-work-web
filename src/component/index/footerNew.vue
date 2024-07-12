<!-- 页面的页脚模块（用于显示版权信息） -->
<template>
  <div class="footer">
    <!-- <div class="footerContain">
      <div class="footeright">
        <span v-for="(list, index) in lists" :key="index">{{ list }}</span>
        <p>&copy;2022 京ICP备55555号-7&nbsp;&nbsp;京公网备777777777号</p>
      </div>
    </div> -->
    <div class="footerContent">
      <div class="top-part">
        <el-row>
          <el-col :span="6">
            <div class="links">
              <div class="link-title">联系我们</div>
<!--              <div class="link-title">联系嗨聘</div>-->
              <div class="link">希望工场（苏州）网络技术有限公司</div>
              <div class="link">
                公司地址: 江苏省苏州市东吴南路79号B-901室
              </div>
              <div class="link">联系电话: 400-1788-556</div>
              <div class="link">电子邮箱: jobmall@126.com</div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="links">
              <div class="link-title">产品与服务</div>
              <!--              企业招聘、猎头服务、专家咨询、管理咨询-->
              <div class="link"><a href="/login/login">在线招聘</a></div>
              <div class="link">猎头服务</div>
              <div class="link">专家咨询</div>
              <div class="link">管理咨询</div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="links">
              <div class="link-title">使用与帮助</div>
              <div class="link">
                <a
                    target="_blank"
                    href="https://hope-service.oss-cn-beijing.aliyuncs.com/files/%E4%BD%BF%E7%94%A8%E5%B8%AE%E5%8A%A9.docx">
                  使用与帮助
                </a>
              </div>
              <div class="link2">
                <a
                  target="_blank"
                  href="https://hope-service.oss-cn-beijing.aliyuncs.com/files/%E9%98%B2%E9%AA%97%E6%8C%87%E5%8D%97%EF%BC%88%E5%97%A8%E8%81%98%EF%BC%89.docx"
                  >防骗指南</a
                >
              </div>
              <div class="link">
                <a
                  target="_blank"
                  href="https://hope-service.oss-cn-beijing.aliyuncs.com/files/%E5%97%A8%E8%81%98%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE%EF%BC%88%E5%B7%B2%E5%AE%A1%E6%A0%B8%EF%BC%89.docx"
                  >协议与规则</a
                >
              </div>
              <div class="link">
                <a
                  target="_blank"
                  href="https://hope-service.oss-cn-beijing.aliyuncs.com/files/%E5%97%A8%E8%81%98%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96%EF%BC%88%E5%B7%B2%E5%AE%A1%E6%A0%B8%EF%BC%89.docx"
                  >隐私政策</a
                >
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="5">
            <div class="right-part">
              <img
                src="https://hope-service.oss-cn-beijing.aliyuncs.com/images/logo-2024-2.jpg"
                style="height: auto"
              />
<!--                            <img src="@/assets/image/about/logo-2024-2.jpg" style="height: auto" />-->
<!--              <img src="@/assets/image/home/bottom-logo.png" style="height: auto" />-->
              <div class="qrcode">
                <img
                  src="https://hope-service.oss-cn-beijing.aliyuncs.com/images/wechat_qrcode.jpg"
                />
                <div class="link">服务号</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bottom-part">
        <div class="filings">
          <div class="single">苏州人社局热线电话:0512-12333</div>
          <div class="single"><a target="_blank" href="https://www.12377.cn/">网上有害信息举报专区</a></div>
          <div class="single"><a target="_blank" href="http://gonganju.suzhou.gov.cn/">苏州网警</a></div>
          <div class="single"><img src="@/assets/image/home/beian.png" /><a href="https://beian.mps.gov.cn/#/query/webSearch?code=32050602012537" rel="noreferrer" target="_blank">苏公网安备32050602012537</a></div>
<!--          <div class="single"><img src="@/assets/image/home/business-license.jpg" /><a target="_blank" href="https://hope-service.oss-cn-beijing.aliyuncs.com/images/business-license-1.jpg-->
<!--">电子营业执照</a></div>-->
<!--          <div class="single">联系电话：400-1788-556</div>-->
          <div class="single">ICP经营许可证：苏B2-20241058</div>
          <!-- <div class="single">京公网安备xxxxxxxxxx号</div>
          <div class="single">京公网安备xxxxxxxxxx号</div>
          <div class="single">京公网安备xxxxxxxxxx号</div>
          <div class="single">
            <img src="@/assets/image/home/business-license.png" />
            电子营业执照
          </div>
          <div class="single">
            <img src="@/assets/image/home/national-emblem.png" />
            京公网安备xxxxxxxxxxxx
          </div> -->
        </div>
        <div class="copy-right">
          Copyright©2023-2024版权所有
          <div class="single">
            <a target="_blank" href="https://beian.miit.gov.cn"
              >苏ICP备2024068051号</a
            >
          </div>
          <div class="licence" @click="toLicence"><img style="width: 24px; height: 24px; margin-right: 8px; vertical-align: middle; display: inline-block;" src="@/assets/image/home/business-license.jpg" />电子营业执照</div>
          <div class="licence" @click="toGuide">人力资源服务许可证</div>
<!--          <div class="licence" >人力资源服务许可证</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        "招聘APP",
        "企业员工招聘系统",
        "招聘微信",
        "招聘小程序",
        "帮助中心",
        "联系我们",
        "招聘解决方案",
        "服务热线：00544-44944",
      ],
    };
  },
  methods: {
    toLicence() {
      // this.$router.push({ name: "licence" });
      window.open('/index/licence', '_blank')
    },
    toGuide() {
      window.open('/index/guide', '_blank');
      // this.$router.push({ name: "guide" });
    },
  },
};
</script>

<style lang="scss">
$nx-color3: #62b7f3;
$nx-color4: #0f46a0;
.footer {
  width: 100%;
  height: 409px;
  border-top: 1px solid #ddd;
  background-color: #202329;
  overflow: hidden;

  .footerContent {
    position: relative;

    &::after {
      content: "";
      height: 1px;
      width: 100vw;
      background-color: #d5dff0;
      position: absolute;
      top: 275px;
      left: 0;
    }

    .top-part {
      max-width: 1200px;
      height: 275px;
      margin: auto auto 10px;
      padding-top: 64px;
      color: #ffffff;
      font-size: 12px;
      box-sizing: border-box;

      .links {
        text-align: left;
        .link-title {
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          height: 30px;
          line-height: 30px;
          margin-bottom: 10px;
        }

        .link {
          //height: 24px;
          line-height: 24px;
        }
        .link2 {
          line-height: 24px;
          cursor: pointer;
        }
      }

      img {
        height: 29px;
        width: 99px;
      }

      .qrcode {
        padding-left: 12px;
        img {
          margin-top: 24px;
          width: 80px;
          height: 80px;
        }
        .link {
          //text-align: center;
          width: 80px;
          margin-top: 10px;
        }
      }
    }

    .bottom-part {
      max-width: 1200px;
      margin: auto;
      padding-top: 32px;
      .filings {
        font-size: 12px;
        color: #ffffff;
        display: flex;
        justify-content: center;

        .single {
          display: flex;
          align-items: center;
          margin-right: 24px;

          img {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
        }
      }
      .copy-right {
        margin-top: 16px;
        // text-align: center;
        font-size: 12px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        .single {
          margin-left: 24px;
        }
        .licence {
          margin-left: 24px;
          cursor: pointer;
          &:hover {
            color: rgb(166, 166, 202);
          }
        }
      }
    }
  }

  .footerContain {
    position: relative;
    width: 76.25rem;
    margin: 2rem auto;
    .footeright {
      position: absolute;
      top: 0;
      left: 13rem;
      padding-left: 2rem;
      span {
        display: inline-block;
        padding: 0.6rem 1rem 1rem 0;
        color: #666666;
        cursor: pointer;
        &:hover {
          color: $nx-color4;
          text-decoration: underline;
        }
      }
      p {
        padding-bottom: 0.6rem;
        color: #222222;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep .el-divider--vertical {
  height: 153px;
  background-color: #d5dff0;
}
</style>
