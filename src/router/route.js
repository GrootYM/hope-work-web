// import homeRouter from "./home-router";

import homeRouter from "./home-router";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/about",
    component: () => import("@/view/home/home"),
    children: [...homeRouter],
  },
  {
    path: "/login",
    name: "login",
    redirect: "/login/login",
    component: () => import("@/view/login"),
    children: [
      {
        path: "login",
        name: "loginPage",
        component: () => import("@/view/login/loginPage"),
        meta: {
          keywords: "求职者、招聘者登录/注册通道",
        },
      },
      {
        path: "companyUserCheck",
        name: "companyUserCheck",
        component: () => import("@/view/login/company"),
      },
      {
        path: "goLogin",
        name: "goLogin",
        component: () => import("@/view/login/goLogin"),
      },
      {
        path: "userTypeSelect",
        name: "userTypeSelect",
        component: () => import("@/view/login/userTypeSelect"),
      },
      {
        path: "wxLogin",
        name: "qrCodeScan",
        component: () => import("@/view/login/wxLogin"),
      },
      {
        path: "wxOauth",
        name: "wxOauth",
        component: () => import("@/view/login/wxOauth"),
      },
      {
        path: "wxBindMobile",
        name: "wxBindMobile",
        component: () => import("@/view/login/wxBindMobile"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    redirect: "/register/register",
    component: () => import("@/view/login"),
    children: [
      {
        path: "register",
        name: "registerPage",
        component: () => import("@/page/register"),
      },
    ],
  },
  {
    /**
     * 无需登录的路由,需要在config/index.js里的notLoginRoute里面加上路由的name
     * 页面组件写在page目录的components目录下
     */
    path: "/index",
    name: "index",
    redirect: "/index/home",
    component: () => import("@/page"),
    children: [
      //cyx
      {
        path: "returnee",
        name: "returneePage",
        component: () => import("@/page/components/returnee"),
        meta: {
          // keywords: "留学归国人员招聘，留学归国人员找工作，逛嗨聘，就对了！",
          keywords: "出国务工，招海外人才，就逛嗨聘。嗨聘，助力中国企业出海！",
        },
      },
      {
        path: "accountCenter",
        name: "accountCenter",
        component: () => import("@/page/accountCenter/accountCenter"),
        children: [],
      },
      {
        path: "userCenter",
        name: "userCenter",
        component: () => import("@/page/userCenter/userCenter"),
        children: [],
      },
      {
        path: "shieldCompany",
        name: "shieldCompany",
        component: () => import("@/page/job/shieldCompany"),
        children: [],
      },
      {
        path: "videoList",
        name: "videoList",
        component: () => import("@/page/videoList/videoList"),
        children: [],
      },
      {
        path: "articleInfo",
        name: "articleInfo",
        component: () => import("@/page/articleInfo/articleInfo"),
        children: [],
      },
      {
        path: "licence",
        name: "licence",
        component: () => import("@/page/licence/licence"),
        children: [],
      },
      {
        path: "guide",
        name: "guide",
        component: () => import("@/page/guide/guide"),
        children: [],
      },
      {
        path: "home",
        name: "homePage",
        component: () => import("@/page/components/home"),
        meta: {
          keywords:
            "逛嗨聘，找工作，玩转职场！在线招聘，猎头服务，专家咨询，管理咨询，一站搞定！国内求职，出国务工，应届生找工作，灵活就业。",
        },
      },
      // ws
      {
        path: "job",
        name: "job",
        component: () => import("@/page/job/job"),
        children: [],
        meta: {
          keywords:
            "针对薪资要求、经验、行业、职业类型、求职类型、学历要求、公司规模、融资阶段等提供热门职位信息",
        },
      },
      {
        path: "company",
        name: "company",
        component: () => import("@/page/job/company"),
        children: [
          // {
          //   path: 'companyInfo',
          //   name: 'companyInfo',
          //   component: () => import('@/page/job/companyInfo'),
          //   children: [],
          // },
          // {
          //   path: 'recruitJob',
          //   name: 'recruitJob',
          //   component: () => import('@/page/job/recruitJob'),
          //   children: [],
          // },
        ],
      },
      {
        path: "info",
        name: "info",
        component: () => import("@/page/job/info"),
        children: [],
      },
      {
        path: "schoolRec",
        name: "schoolRec",
        component: () => import("@/page/job/schoolRec"),
        children: [],
        meta: {
          keywords: "校园招聘，毕业生找工作，校外实习，校外兼职，逛嗨聘，一网搞定！",
        },
      },
      {
        path: "socialRec",
        name: "socialRec",
        component: () => import("@/page/job/socialRec"),
        children: [],
        meta: {
          keywords: "遭遇职业瓶颈，找工作，突破职场危机，玩转职场，逛嗨聘，全搞定！",
        },
      },
      {
        path: "videoTopic",
        name: "videoTopic",
        component: () => import("@/page/videoList/videoTopic"),
        children: [],
      },
      {
        path: "beExpert",
        name: "beExpert",
        component: () => import("@/page/job/beExpert"),
        children: [],
        meta: {
          keywords: "卷不动的职场人就来逛嗨聘！管理咨询，商业咨询，专家访谈，专家咨询，尽在嗨聘！",
          // keywords: "求职者上传简历，筛选后可进入行业专家库，优先精准匹配高薪职位和名企",
        },
      },
      {
        path: "onlineResume",
        name: "onlineResume",
        component: () => import("@/page/userCenter/onlineResume"),
      },
      {
        path: "settingPageGreetings",
        name: "settingPageGreetings",
        component: () => import("@/page/OxmanW/settingPage"),
        children: [],
      },
      {
        path: "immediately",
        name: "immediately",
        component: () => import("@/page/enterprise/immediately"), //立即沟通
      },
      {
        path: "resumeTemplate",
        name: "resumeTemplate",
        component: () => import("@/view/resume/resume-modify"),
      },
      {
        path: "ask",
        name: "ask",
        component: () => import("@/page/job/ask"),
        meta: {
          keywords: "接收用户后台反馈",
        },
      },
      {
        path: "flexible",
        name: "flexible",
        component: () => import("@/page/job/flexible"),
        meta: {
          keywords: "布局数字零工市场，促进灵活就业。业余兼职、钟点工、、派遣工、季节工和自由接单服务，逛嗨聘，全搞定！",
        },
      },
    ],
  },
  {
    path: "/oxHome",
    name: "oxHome",
    redirect: "/oxHome/jobManagement",
    component: () => import("@/page/OxmanW/home"),
    children: [
      {
        path: "recOxman",
        name: "recOxman",
        component: () => import("@/page/OxmanW/recOxman"),
        children: [],
      },
      {
        path: "searchOxman",
        name: "searchOxman",
        component: () => import("@/page/OxmanW/searchOxman"),
        children: [],
      },
      {
        path: "companyHome",
        name: "companyHome",
        component: () => import("@/page/OxmanW/companyHome"),
        children: [],
      },
      {
        path: "communicate",
        name: "communicate",
        component: () => import("@/page/OxmanW/communicate"),
      },
      {
        path: "userCenter",
        name: "recruitUserCenter",
        component: () => import("@/enterprise/userCenter"),
        redirect: "/oxHome/userCenter/user",
        children: [
          {
            path: "user",
            name: "recruitUser",
            component: () => import("@/enterprise/userCenter/user"),
          },
          {
            path: "userInfo",
            name: "recruitUserInfo",
            component: () => import("@/enterprise/userCenter/userInfo"),
          },
          {
            path: "address",
            name: "addressConfig",
            component: () => import("@/enterprise/userCenter/address"),
          },
        ],
      },
      {
        path: "jobManagement",
        name: "jobManagement",
        component: () => import("@/page/OxmanC/jobManagement"),
        children: [],
        meta: {
          keywords: "求职者、招聘者登录/注册通道",
        },
      },
      {
        path: "OxmanManagement",
        name: "OxmanManagement",
        component: () => import("@/page/OxmanC/OxmanManagement"),
        children: [],
      },
      {
        path: "addJob",
        name: "addJob",
        component: () => import("@/page/OxmanC/addJob"),
        children: [],
      },
      {
        path: "personalInfo",
        name: "personalInfo",
        component: () => import("@/page/OxmanW/personalInfo"),
      },
      {
        path: "settingPage",
        name: "settingPage",
        component: () => import("@/page/OxmanW/settingPage"),
      },
    ],
  },
  {
    path: "/resumeMake",
    name: "resumeMake",
    component: () => import("@/page/userCenter/resumeMake"), // 简历制作
  },
  {
    redirect: "/404",
    path: "*",
  },
];

export default routes;
