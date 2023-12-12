import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class Auth {
  /**
   * 发送手机验证码
   * @param {object} data
   */
  static sendCaptcha(data) {
    return _axios({
      method: 'post',
      url: '/api-user/captcha',
      data,
      handleError: true,
    })
  }

  /**
   * 注册
   * @param {object} data 注册信息
   */
  static register(data) {
    return _axios({
      method: 'post',
      url: '/api-user/register',
      data,
      handleError: true,
    })
  }

  /**
   * 手机验证码登录
   * @param {object} data
   */
  static login(data) {
    return _axios({
      method: 'post',
      url: '/api-user/login',
      data,
      handleError: true,
    })
  }

  /**
   * 用户信息添加/编辑
   * @param {object} data
   */
  static userDetailEdit(data) {
    return _axios({
      method: 'post',
      url: '/api-user/detail/edit',
      data,
      handleError: true,
    })
  }

  /**
   * 用户学历信息添加
   * @param {object} data
   */
  static userEducationAdd(data) {
    return _axios({
      method: 'post',
      url: '/api-user/education-experience/add',
      data,
      handleError: true,
    })
  }

  /**
   * 用户学历信息编辑
   * @param {object} data
   */
  static userEducationEdit(data) {
    return _axios({
      method: 'post',
      url: '/api-user/updateEducationExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 用户工作经历编辑
   * @param {object} data
   */
  static userExperienceEdit(data) {
    return _axios({
      method: 'post',
      url: '/api-user/updateJobExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 用户信息获取
   * @param {object} data
   */
  static queryUserInfo(data) {
    return _axios({
      method: 'post',
      url: '/api-user/info',
      data,
      handleError: true,
    })
  }

  /**
   * 热门城市获取
   * @param {object} data
   */
  static queryHotCityList(data) {
    return _axios({
      method: 'post',
      url: '/system/city/queryHotCityList',
      data,
      handleError: true,
    })
  }

  /**
   * 用户简历列表获取
   * @param {object} data
   */
  static queryResumeByUserId(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonVitaeByUserId',
      data,
      handleError: true,
    })
  }

  /**
   * 用户简历删除
   * @param {object} data
   */
  static deleteResumeById(data) {
    return _axios({
      method: 'post',
      url: '/api-user/deletePersonVitaeById',
      data,
      handleError: true,
    })
  }

  /**
   * 用户技能获取
   * @param {object} data
   */
  static queryUserSkillList(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryUserSkillList',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-用户基本信息
   * @param {object} data
   */
  static queryPersonInfo(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonInfo',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-用户工作经历集合
   * @param {object} data
   */
  static queryPersonJobExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonJobExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-用户项目经历集合
   * @param {object} data
   */
  static queryPersonProjectExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonProjectExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-用户教育经历集合
   * @param {object} data
   */
  static queryPersonEducationExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonEducationExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-编辑项目经验信息
   * @param {object} data
   */
  static updateProjectExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/updateProjectExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-编辑工作经验信息
   * @param {object} data
   */
  static updateJobExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/updateJobExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-删除工作经验信息
   * @param {object} data
   */
  static deleteJobExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/deletePersonJobExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-删除项目经验信息
   * @param {object} data
   */
  static deleteProjectExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/deletePersonProjectExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 在线简历-删除教育信息
   * @param {object} data
   */
  static deleteEducationExperience(data) {
    return _axios({
      method: 'post',
      url: '/api-user/deletePersonEduExperience',
      data,
      handleError: true,
    })
  }

  /**
   * 微信登录回调
   *
   */
  static wechatCallback(params) {
    return _axios({
      method: 'get',
      url: '/wechat/callback',
      params,
      handleError: true,
    })
  }

  /**
   * 绑定手机
   * @param {object} data
   */
  static bindPhone(data) {
    return _axios({
      method: 'post',
      url: '/wechat/bind-phone',
      data,
      handleError: true,
    })
  }

  /**
   * 同步简历信息
   * @param {object} data
   */
  static getResumeAnalysiInfo(data) {
    return _axios({
      method: 'post',
      url: '/resume/getResumeAnalysiInfo',
      data,
      handleError: true,
    })
  }
}
