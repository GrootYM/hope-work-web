import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class School {
  /**
   * 海归职位搜索/岗位类型点击搜索接口
   *
   */
  static getPositonSearch(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/positonSearch',
      data,
      handleError: true,
    })
  }
  /**
   * 海归热门职位标签列表
   *
   */
  static getHotPositionType(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/hotPositionType',
      data,
      handleError: true,
    })
  }
  /**
   * 海归职位搜索下拉列表
   *
   */
  static getPositionType(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/positionType',
      data,
      handleError: true,
    })
  }

  /**
   * 海归海报图列表
   *
   */
  static getBannerList(params) {
    return _axios({
      method: 'get',
      url: '/personal/returnees/bannerList',
      params,
      handleError: true,
    })
  }

  /**
   * 海归热门职位列表
   *
   */
  // static queryHotPosition(data) {
  //   return _axios({
  //     method: 'post',
  //     url: '/personal/returnees/queryHotPosition',
  //     data,
  //     handleError: true,
  //   })
  // }
  /**
   * 海归-热门职位一级标签
   *
   */
  static getQueryHotPositionFirstType(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/queryHotPositionFirstType',
      data,
      handleError: true,
    })
  }
  /**
   * 根据职位标签去查热门职位
   *@param {object} data
   */
  static getQueryHotPositionByTypeList(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/queryHotPositionByTypeList',
      data,
      handleError: true,
    })
  }
  /**
   * 海归热门企业
   *@param {object} data
   */
  static getQueryHotCompanyList(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/queryHotCompanyList',
      data,
      handleError: true,
    })
  }

  /**
   * 短期实习职位
   *
   */
  static getQueryPracticePositionList(data) {
    return _axios({
      method: 'post',
      url: '/personal/returnees/queryPracticePositionList',
      data,
      handleError: true,
    })
  }
}
