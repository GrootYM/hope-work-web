<template>
  <div class="minMain">
    <div class="box">
      <div class="boxTop">
        <h2>首页</h2>
        <div>在此可管理自己的信息、隐私和安全</div>
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
  props: ['setTitle'],
  data() {
    return {
      cardList: [
        {
          imgUrl: require('@/assets/image/accountCenter/1390.png'),
          title: '您有2个安全建议',
          hint: '了解和查看当前账号安全状态',
        },
        {
          imgUrl: require('@/assets/image/accountCenter/19313.png'),
          title: '隐私权和个性化',
          hint: '了解和查看已提供的权限和信息',
        },
        {
          imgUrl: require('@/assets/image/accountCenter/1392.png'),
          title: '个人信息查看',
          hint: '了解和查看现有的个人信息',
        },
      ],
    }
  },
}
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
      background: url('~@/assets/image/accountCenter/321home.png');
      h2 {
        width: 48px;
        height: 34px;
        font-size: 24px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #3d3d3d;
        line-height: 34px;
        -webkit-background-clip: text;
      }
      div {
        width: 224px;
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
