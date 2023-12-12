import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class School {
  /**
   * 用户信息获取
   *@param {object} data
   */
  static getUserInfo(data) {
    return _axios({
      method: 'post',
      url: '/api-user/info',
      data,
      handleError: true,
    })
  }
  /**
   * 获取个人简历列表
   *@param {object} data
   */
  static getUserResume(data) {
    return _axios({
      method: 'post',
      url: '/api-user/queryPersonVitaeByUserId',
      data,
      handleError: true,
    })
  }
  /**
   * 删除简历
   *
   */
  static deleteUserResume(data) {
    return _axios({
      method: 'post',
      url: '/api-user/deletePersonVitaeById',
      data,
      handleError: true,
    })
  }
}
