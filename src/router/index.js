import appConfig from "@/config/index";
import Util from "@/lin/util/util";
import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import routes from "./route";

Vue.use(Router);

// 判断是否需要登录访问, 配置位于 config 文件夹
let isLoginRequired = (routeName) => {
  // 首次执行时缓存配置
  let { notLoginRoute } = appConfig;
  const notLoginMark = {};

  // 构建标记对象
  if (Array.isArray(notLoginRoute)) {
    for (let i = 0; i < notLoginRoute.length; i += 1) {
      notLoginMark[notLoginRoute[i].toString()] = true;
    }
  }

  notLoginRoute = null; // 释放内存

  // 重写初始化函数
  isLoginRequired = (name) => {
    if (!name) {
      return true;
    }
    // 处理 Symbol 类型
    const target = typeof name === "symbol" ? name.description : name;
    return !notLoginMark[target];
  };

  return isLoginRequired(routeName);
};

const router = new Router({
  mode: "history",
  scrollBehavior: () => ({
    y: 0,
  }),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.meta && to.meta.fetchMeta) {
    fetchMetaData(to.meta.fetchMeta.endpoint, to.meta.fetchMeta.params).then(metaData => {
      updateDocumentHead(metaData);
      next();
    }).catch(error => {
      console.error('Failed to fetch meta data:', error);
      next();
    });
  }

  // 登录验证
  if (isLoginRequired(to.name) && !store.state.logined) {
    next({ path: "/index" });
    return;
  }

  // TODO: tab 模式重复点击验证

  // 权限验证
  if (store && store.state && store.getters) {
    const { permissions, user, userInfo } = store.getters;
    if (
      to.path !== "/about" &&
      !Util.hasPermission(permissions, to.meta, user)
    ) {
      Vue.prototype.$notify({
        title: "无权限",
        dangerouslyUseHTMLString: true,
        message: '<strong class="my-notify">您无此页面的权限哟</strong>',
      });
      next({ path: "/about" });
      return;
    }
    if (userInfo.userType == 2 && to.path.indexOf("/index") > -1) {
      next({ path: "/oxHome" });
      return;
    }
  }

  // 路由发生变化重新计时
  Vue.prototype.$_lin_jump();

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});
const originalPush = router.push;
const originalReplace = router.replace;
router.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
router.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

function fetchMetaData(endpoint, params) {
  let url = new URL(endpoint, window.location.origin);
  url.search = new URLSearchParams(params).toString();

  return fetch(url)
      .then(response => response.json())
      .then(data => data);
}

function updateDocumentHead(metaData) {
  const head = document.head;
  // 清除旧的<meta>标签
  Array.from(head.querySelectorAll('meta[name="keywords"], meta[name="description"]')).forEach(tag => tag.remove());
  if (metaData.data.description) {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', "description");
    metaTag.setAttribute('content', metaData.data.description);
    head.appendChild(metaTag);
  }
  if (metaData.data.keyword) {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', "keywords");
    metaTag.setAttribute('content', metaData.data.keyword);
    head.appendChild(metaTag);
  }
}
export default router;
