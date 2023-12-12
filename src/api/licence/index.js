import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class School {
  /**
   * 许可证图片
   *@param {object} data
   */
  static getQueryPositonList(data) {
    return _axios({
      method: 'post',
      url: '',
      data,
      handleError: true,
    })
  }
}
