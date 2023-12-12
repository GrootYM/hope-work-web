import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class School {
  /**
   * 职位列表
   *@param {object} data
   */
  static getQueryPositonList(data) {
    return _axios({
      method: 'post',
      url: '/system/position/queryPositonList',
      data,
      handleError: true,
    })
  }
  /**
   * 发布职位
   *@param {object} data
   */
  static releasePositonInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/position/releasePositonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 关闭职位
   *@param {object} data
   */
  static stopPositonInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/position/stopPositonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 职位详情
   *@param {object} data
   */
  static queryPositonInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/position/queryPositonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 工作地址
   *@param {object} data
   */
  static queryCompanyAddrList(data) {
    return _axios({
      method: 'post',
      url: '/firm/companyAddr/queryCompanyAddrList',
      data,
      handleError: true,
    })
  }
  /**
   * 新增职位
   *@param {object} data
   */
  static insertPositonInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/position/insertPositonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 编辑职位
   *@param {object} data
   */
  static updatePositonInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/position/updatePositonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 删除职位
   *@param {object} data
   */
  static deletePositonInfo(data) {
    return _axios({
      method: 'post',
      url: '/system/position/deletePositonInfo',
      data,
      handleError: true,
    })
  }
  /**
   * 牛人管理列表
   *@param {object} data
   */
  static queryActiveVitaeList(data) {
    return _axios({
      method: 'post',
      url: '/system/companyvitae/queryActiveVitaeList',
      data,
      handleError: true,
    })
  }
}
