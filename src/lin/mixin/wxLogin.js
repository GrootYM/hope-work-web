export default {
  mounted() {
    this.loadScript()
  },
  methods: {
    loadScript() {
      const script = document.createElement('script')
      script.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
      script.onload = this.initWxLogin
      document.body.appendChild(script)
    },
    initWxLogin() {
      const { userType } = this.$route.query
      const res = new WxLogin({
        self_redirect: false,
        id: 'wx-qrcode', // 二维码容器id
        appid: 'wx3ac20ad7dc02068d', // 应用唯一标识，在微信开放平台提交应用审核通过后获得
        scope: 'snsapi_login', // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
        redirect_uri: encodeURIComponent(`http://www.hopeworkshop.cn/#/login/wxOauth?userType=${userType}`), // 重定向地址，需要进行UrlEncode
        href: 'data:text/css;base64,I3d4LXFyY29kZSB7DQogIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgbGVmdDogNTAlOw0KICByaWdodDogNTAlOw0KICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTsNCn0=',
      })
    },
  },
}
