import _axios from '@/lin/plugin/axios'

export default class Common {
  /**
   * 公司列表
   * @param {object} data
   */
  static getCompanyList(data) {
    return _axios({
      method: 'post',
      url: '/system/company/list',
      data,
      handleError: true,
    })
  }
}
