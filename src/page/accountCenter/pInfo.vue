<template>
  <div class="minMain">
    <div class="box">
      <div class="boxTop">
        <h2>个人信息管理</h2>
        <div>
          查看及管理您的个人信息，了解如何在嗨聘平台访问/修改、删除、导出您的个人信息以及改变授权范围
        </div>
      </div>
      <div class="line"></div>
      <div class="boxBottom">
        <div class="bottomDetail">
          <template>
            <div class="card" v-for="(item, index) in cardList" :key="index">
              <img :src="item.imgUrl" alt="" />
              <div class="cardContent">
                <h3>{{ item.title }}</h3>
                <div>{{ item.hint }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardList: [
        {
          imgUrl: require("@/assets/image/accountCenter/1392.png"),
          title: "个人信息浏览与导出",
          hint: "查看及管理您的个人信息",
        },
        {
          imgUrl: require("@/assets/image/accountCenter/1391.png"),
          title: "个人权利行使",
          hint: "帮您了解行使权利的路径",
        },
        {
          imgUrl: require("@/assets/image/accountCenter/13921.png"),
          title: "家庭住址信息",
          hint: "查看及管理您在嗨聘使用的地址信息",
        },
      ],
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
        width: 144px;
        height: 34px;
        font-size: 24px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 34px;
        -webkit-background-clip: text;
      }
      div {
        width: 679px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        -webkit-background-clip: text;
        margin-top: 8px;
        display: flex;
        text-align: left;
      }
    }
    .line {
      width: 816px;
      border: 1px dashed #e8ebf0;
      margin-left: 56px;
      margin-top: 16px;
    }
    .boxBottom {
      width: 924px;
      height: 430px;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      .bottomDetail {
        width: 816px;
        height: 256px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .card {
          width: 396px;
          height: 116px;
          display: flex;
          align-items: center;
          background: rgb(244, 246, 250);
          border-radius: 4px 4px 4px 4px;
          //   opacity: 0.05;
          img {
            width: 72px;
            height: 72px;
            margin-left: 24px;
          }
          .cardContent {
            height: 56px;
            h3 {
              min-width: 100px;
              height: 25px;
              font-size: 18px;
              font-family: PingFang SC-Medium, PingFang SC;
              font-weight: 500;
              color: #222222;
              line-height: 25px;
              -webkit-background-clip: text;
              display: flex;
            }
            div {
              min-width: 182px;
              height: 20px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 20px;
              display: flex;
              margin-top: 11px;
            }
          }
        }
        .card:nth-child(3) {
          margin-top: 24px;
        }
      }
    }
  }
}
</style>
