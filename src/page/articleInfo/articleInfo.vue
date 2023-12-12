<template>
  <div class="main">
    <div class="articleBox">
      <h1>{{ articleInfo.title }}</h1>
      <div class="createInfo">
        <img :src="articleInfo.headimg" alt="" />
        <div class="infoRight">
          <p class="pName">{{ articleInfo.nickname }}</p>
          <p class="Identity" v-for="(item, index) in strArr" :key="index">{{ item }}</p>
        </div>
      </div>
      <div class="infoContent" v-html="articleInfo.articleContent"></div>
    </div>
  </div>
</template>
<script>
import Article from '@/api/articleInfo/index'
export default {
  data() {
    return {
      articleInfo: {},
      id: '',
      strArr: [],
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getArticleInfo()
  },
  mounted() {},

  methods: {
    async getArticleInfo() {
      let data = { id: this.id }
      let res = await Article.getArticleInfo(data)
      if (res.code == 200) {
        this.articleInfo = res.data
        console.log(this.articleInfo, '我是文章详情')
        console.log('我是文章详情的职位', this.articleInfo.job)
        console.log('我是文章详情的职位22', res.data.job)
        let strArr = this.articleInfo.job.split(',')
        this.strArr = strArr
        // console.log('我是修改过后的文章详情职位', strArr);
        // let str = '原新智认知数字科技股份有限公司总裁'
        // let newArr = str.split(/[(\r\n)\r\n]+/)
        // console.log('我还是新的', newArr);
      }
    },
  },
  //   /media/article-info
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_631781_4v61w1yz6y74x6r.css');
$nx-color: #0470b8;
$all-padding: 0;
$nx-width: 76.25rem;

.main {
  background: linear-gradient(180deg, rgba(36, 70, 168, 0.25) 0%, rgba(36, 70, 168, 0) 100%);
  padding: 40px 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  .articleBox {
    // width: 1200px;
    background-color: #ffffff;
    padding: 80px 20px;
    box-sizing: border-box;
    border-radius: 4px;
    h1 {
      font-size: 40px;
      font-weight: 700;
      color: rgb(43, 42, 42);
    }
    .createInfo {
      padding: 50px 40px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      img {
        width: 220px;
        height: 220px;
        border-radius: 50%;
      }
      .infoRight {
        margin-left: 40px;
        padding: 4px 0;
        box-sizing: border-box;
        .pName {
          text-align: left;
          font-size: 24px;
        }
        .Identity {
          margin-top: 12px;
          text-align: left;
          font-size: 16px;
          color: rgb(168, 166, 166);
        }
      }
    }
  }
}
</style>
