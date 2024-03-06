<template>
  <div class="minMain">
    <div class="box">
      <div class="boxTop">
        <h2>账号管理</h2>
        <div>在此可查看以及了解您账号的一些绑定设置信息</div>
      </div>
      <div class="line"></div>
      <div class="boxPhone">
        <h3>绑定手机</h3>
        <div class="dPhone">
          修改手机号请前往嗨聘APP端“我的-设置-账号与安全中心-账号管理”进行修改
        </div>
        <div class="bPhone">
          <p>手机号</p>
          <div class="nPhone">
            <span>{{ phone }}</span>
          </div>
        </div>
      </div>
      <div class="line2"></div>
      <div class="boxChatNumber">
        <h3>绑定微信号</h3>
        <div class="dChat">
          考虑您的账号安全，微信绑定请前往嗨聘APP端“我的-设置-账号与安全中心-账号管理-微信绑定”
        </div>
        <div class="chatNumber">
          <img src="@/assets/image/accountCenter/weixin.png" alt="" /><span>{{
            bindingState
          }}</span>
        </div>
      </div>
      <div class="line2"></div>
      <div class="boxBottom">
        <h2>注销账号</h2>
        <div>
          注销，请前往嗨聘APP端“我的-设置-账号与安全中心-账号管理”进行注销
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardList: [],
      phone: "189****5678",
      bindingState: "未绑定",
    };
  },
};
</script>
<style lang="scss" scoped>
.minMain {
  .box {
    width: 928px;
    height: 551px;
    border-radius: 4px 4px 4px 4px;
    background: #ffffff;
    padding: 1px;
    box-sizing: border-box;
    .boxTop {
      width: 926px;
      height: 100px;
      padding-top: 30px;
      padding-left: 54px;
      border-radius: 2px 2px 2px 2px;
      box-sizing: border-box;
      background: url("~@/assets/image/accountCenter/321home.png");
      h2 {
        width: 96px;
        height: 34px;
        font-size: 24px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 34px;
        -webkit-background-clip: text;
      }
      div {
        width: 294px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        -webkit-background-clip: text;
        margin-top: 8px;
      }
    }
    .line {
      width: 816px;
      border: 1px dashed #e8ebf0;
      margin-left: 56px;
      margin-top: 16px;
    }
    .boxPhone {
      width: 926px;
      height: 135px;
      padding-top: 24px;
      //   padding-bottom: 24px;
      padding-left: 54px;
      box-sizing: border-box;
      h3 {
        width: 64px;
        height: 22px;
        font-size: 16px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 22px;
        -webkit-background-clip: text;
      }
      .dPhone {
        width: 530px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        -webkit-background-clip: text;
        display: flex;
        margin-top: 8px;
      }
      .bPhone {
        display: flex;
        align-items: center;
        margin-top: 12px;
        p {
          width: 42px;
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          -webkit-background-clip: text;
          display: block;
        }
        .nPhone {
          width: 94px;
          height: 25px;
          background: #f3f5f9;
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 8px;
          span {
            width: 70px;
            height: 17px;
            font-size: 12px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 17px;
            -webkit-background-clip: text;
          }
        }
      }
    }
    .line2 {
      width: 816px;
      border: 1px dashed #e8ebf0;
      margin-left: 56px;
      margin-top: 2px;
    }
    .boxChatNumber {
      width: 926px;
      height: 130px;
      padding-top: 24px;
      //   padding-bottom: 24px;
      padding-left: 54px;
      box-sizing: border-box;
      h3 {
        width: 80px;
        height: 22px;
        font-size: 16px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 22px;
        -webkit-background-clip: text;
      }
      .dChat {
        width: 640px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        -webkit-background-clip: text;
        margin-top: 8px;
      }
      .chatNumber {
        display: flex;
        align-items: center;
        margin-top: 8px;
        img {
          width: 24px;
          height: 24px;
          opacity: 1;
        }
        span {
          width: 42px;
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          -webkit-background-clip: text;
          margin-left: 8px;
        }
      }
    }
    .boxBottom {
      width: 926px;
      height: 100px;
      padding-top: 24px;
      padding-left: 54px;
      box-sizing: border-box;
      h2 {
        width: 64px;
        height: 22px;
        font-size: 16px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 22px;
        -webkit-background-clip: text;
      }
      div {
        width: 495px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        -webkit-background-clip: text;
        margin-top: 8px;
      }
    }
  }
}
</style>
