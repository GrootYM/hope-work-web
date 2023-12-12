import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class Oxman {
  /**
   * 下拉职位接口全部【牛人简历那用到】
   *
   */
  static queryPositonAll(data) {
    return _axios({
      method: 'post',
      url: '/system/position/queryPositonAll',
      data,
      handleError: true,
    })
  }
  /**
   * 技能标签
   *
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
   * 查询系统推荐牛人简历
   *
   */
  static querySystemRecommendVitaeList(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/querySystemRecommendVitaeList',
      data,
      handleError: true,
    })
  }

  /**
   * 查询推荐_简历新牛人
   *
   */
  static querySystemRecommendNewVitaeList(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/querySystemRecommendNewVitaeList',
      data,
      handleError: true,
    })
  }

  /**
   * 企业搜索简历
   *
   */
  static queryMySearchVitaeList(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/queryMySearchVitaeList',
      data,
      handleError: true,
    })
  }
  /**
   * 企业明细
   *
   */
  static queryCompanyInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/company/queryCompanyInfo',
      data,
      handleError: true,
    })
  }
  // 聊天用户数据
  static queryPersonChatVitaeList(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/queryPersonChatVitaeList',
      data,
      handleError: true,
    })
  }
  /*
   * 企业新增接口
   *
   */
  static insertCompanyInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/company/insertCompanyInfo',
      data,
      handleError: true,
    })
  }
  // 获取企业用户个人信息
  static queryPersonInfo(data) {
    return _axios({
      method: 'post',
      url: '/firm/queryPersonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 企业修改接口
   *
   */
  static updateCompanyInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/company/updateCompanyInfo',
      data,
      handleError: true,
    })
  }
  // 获取客服信息
  static getCustomer(data) {
    return _axios({
      method: 'post',
      url: '/api-common/chat-customer',
      data,
      handleError: true,
    })
  }
  // 获取附件简历
  static queryPersonVitaeByUserId(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonVitaeByUserId',
      data,
      handleError: true,
    })
  }
  // 简历投递
  static send(data) {
    return _axios({
      method: 'post',
      url: '/user-vite/send',
      data,
      handleError: true,
    })
  }
  // 发送消息
  static sendMessage(data) {
    return _axios({
      method: 'post',
      url: '/chat/sendMessage',
      data,
      handleError: true,
    })
  }
  // 消息记录
  static queryMessageHistory(data) {
    return _axios({
      method: 'post',
      url: '/chat/queryMessageHistory',
      data,
      handleError: true,
    })
  }
  // 聊天投诉
  static addComplaint(data) {
    return _axios({
      method: 'post',
      url: '/chat/addComplaint',
      data,
      handleError: true,
    })
  }
  // 职位信息
  static queryMessagePositionInfo(data) {
    return _axios({
      method: 'post',
      url: '/chat/queryMessagePositionInfo',
      data,
      handleError: true,
    })
  }
  // 打招呼列表
  static hiMessageList(data) {
    return _axios({
      method: 'post',
      url: '/api-common/hi-message-list',
      data,
      handleError: true,
    })
  }
  // 选择打招呼
  static hiMessageCheck(data) {
    return _axios({
      method: 'post',
      url: '/api-common/hi-message/check',
      data,
      handleError: true,
    })
  }
  // 聊天前置消息
  static hiMessageSend(data) {
    return _axios({
      method: 'post',
      url: '/api-common/hi-message/send',
      data,
      handleError: true,
    })
  }

  static queryPositonNameList(data) {
    return _axios({
      method: 'post',
      url: '/system/position/queryPositonNameList',
      data,
      handleError: true,
    })
  }
  // 查询企业是否接收简历
  static acceptVited(data) {
    return _axios({
      method: 'post',
      url: '/user-vite/acceptVited',
      data,
      handleError: true,
    })
  }
  //查询当前人所存的条件
  static querySerachConditionList(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/querySerachConditionList',
      data,
      handleError: true,
    })
  }
  // 编辑企业是否接收简历
  static addAcceptVited(data) {
    return _axios({
      method: 'post',
      url: '/user-vite/addAcceptVited',
      data,
      handleError: true,
    })
  }
  //保存搜索条件接口
  static saveSerachCondition(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/saveSerachCondition',
      data,
      handleError: true,
    })
  }
  //删除搜索条件
  static deleteSerachCondition(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/deleteSerachCondition',
      data,
      handleError: true,
    })
  }
  //自定义打招呼
  static addMessageInfo(data) {
    return _axios({
      method: 'post',
      url: '/api-common/hi-message/addMessageInfo',
      data,
      handleError: true,
    })
  }
  //未读消息
  static getImUnReadCount(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/getImUnReadCount',
      data,
      handleError: true,
    })
  }
}
