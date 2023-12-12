import _axios from '@/lin/plugin/axios'

export default class CompanyAuth {
  /**
   * 用户信息获取
   * @param {object} data
   */
  static getCompanyUserInfo(data) {
    return _axios({
      method: 'post',
      url: '/api-user/company-user/info',
      data,
      handleError: true,
    })
  }

  /**
   * 企业用户提交审核
   * @param {object} data
   */
  static checkCompanyUser(data) {
    return _axios({
      method: 'post',
      url: '/api-user/company-user/check',
      data,
      handleError: true,
    })
  }

  /**
   * 获取企业用户个人信息
   * @param {*} data
   * @returns
   */
  static queryPersonInfo(data) {
    return _axios({
      method: 'post',
      url: '/firm/queryPersonInfo',
      data,
      handleError: true,
    })
  }

  /**
   * 编辑企业用户个人信息
   * @param {*} data
   * @returns
   */
  static editPersonInfo(data) {
    return _axios({
      method: 'post',
      url: '/firm/editPersonInfo',
      data,
      handleError: true,
    })
  }

  /**
   * 获取公司地址列表
   * @param {*} data
   * @returns
   */
  static queryAddrList(data) {
    return _axios({
      method: 'post',
      url: '/firm/companyAddr/queryCompanyAddrList',
      data,
      handleError: true,
    })
  }

  /**
   * 创建公司地址
   * @param {*} data
   * @returns
   */
  static insertAddr(data) {
    return _axios({
      method: 'post',
      url: '/firm/companyAddr/insertCompanyAddr',
      data,
      handleError: true,
    })
  }

  /**
   * 编辑公司地址
   * @param {*} data
   * @returns
   */
  static editAddr(data) {
    return _axios({
      method: 'post',
      url: '/firm/companyAddr/editCompanyAddr',
      data,
      handleError: true,
    })
  }

  /**
   * 删除公司地址
   * @param {*} data
   * @returns
   */
  static delAddr(data) {
    return _axios({
      method: 'post',
      url: '/firm/companyAddr/delCompanyAddr',
      data,
      handleError: true,
    })
  }

  /**
   * 更换公司
   * @param {*} data
   * @returns
   */
  static companyChange(data) {
    return _axios({
      method: 'post',
      url: '/api-user/company-change',
      data,
      handleError: true,
    })
  }
}
