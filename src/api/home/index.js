import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class Home {
  /**
   * 首页海报图列表
   * @param {object} params
   */
  static async getBannerList(params) {
    let res = await get('/api-common/banner-list', params)
    return res
  }

  /**
   * 首页职位搜索下拉列表
   * @param {object} data
   */
  static positionType(data) {
    return _axios({
      method: 'post',
      url: '/api-common/position-type',
      data,
      handleError: true,
    })
  }

  /**
   * 热门职位标签查询
   * @param {object} data
   */
  static queryHotPositionType(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryHotPositionType',
      data,
      handleError: true,
    })
  }

  /**
   * 首页热门行业查询
   * @param {object} data
   */
  static queryHotIndustryType(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryHotIndustryType',
      data,
      handleError: true,
    })
  }

  /**
   * 根据热门行业查热门职位
   * @param {object} data
   */
  static queryHotPositonByIndustry(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryHotPositonByIndustry',
      data,
      handleError: true,
    })
  }

  /**
   * 热门企业
   * @param {object} data
   */
  static queryHotCompanyList(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryHotCompanyList',
      data,
      handleError: true,
    })
  }

  /**
   * 名企职位
   * @param {object} data
   */
  static queryHotCompanyPositionList(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryHotCompanyPositionList',
      data,
      handleError: true,
    })
  }
}
