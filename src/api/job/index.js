import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class Job {
  /**
   * 首页职位搜索
   *
   */
  static queryPositonByKeyWords(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryPositonByKeyWords',
      data,
      handleError: true,
    })
  }

  /**
   * 热门城市
   *
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
   * 城市下拉
   *
   */
  static queryCityList(data) {
    return _axios({
      method: 'post',
      url: '/system/city/queryCityList',
      data,
      handleError: true,
    })
  }
  /**
   * 海外城市下拉
   *
   */
  static queryOverseasCityList(level, pid) {
    return _axios({
      method: 'post',
      url: '/system/city/foreign/city-list',
      data:{
		  level,
		  pid
	  },
      handleError: true,
    })
  }
  /**
   * 行业下拉
   *
   */
  static queryAllIndustryType(data) {
    return _axios({
      method: 'post',
      url: '/system/industry/queryAllIndustryType',
      data,
      handleError: true,
    })
  }
  /**
   * 热门职位标签
   *
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
   * 首页职位搜索
   *
   */
  static queryPositonByKeyWords(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryPositonByKeyWords',
      data,
      handleError: true,
    })
  }
  /**
   * 看过的职位记录
   *
   */
  static queryLookedPositionList(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryLookedPositionList',
      data,
      handleError: true,
    })
  }
  /**
   * 首页职位明细
   *
   */
  static queryPositionInfoByPerson(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryPositionInfoByPerson',
      data,
      handleError: true,
    })
  }
  /**
   * 首页热门行业查询
   *
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
   * 热门企业
   *
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
   * 根据热门行业查热门职位
   *
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
   * 名企职位
   *
   */
  static queryHotCompanyPositionList(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryHotCompanyPositionList',
      data,
      handleError: true,
    })
  }
  /**
   * 首页公司详情
   *
   */
  static queryCompanyInfoByPerson(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryCompanyInfoByPerson',
      data,
      handleError: true,
    })
  }
  /**
   * 首页公司下的职位列表
   *
   */
  static queryCompanyPositionByComId(data) {
    return _axios({
      method: 'post',
      url: '/system/homepage/queryCompanyPositionByComId',
      data,
      handleError: true,
    })
  }
  /**
   * 成为专家
   *
   */
  static expertAdd(data) {
    return _axios({
      method: 'post',
      url: '/api-user/expert-add',
      data,
      handleError: true,
    })
  }
  /**
   * 专家等级
   *
   */
  static expertLevel(data) {
    return _axios({
      method: 'post',
      url: '/api-user/expert-level',
      data,
      handleError: true,
    })
  }
  /**
   * 对职位收藏
   *
   */
  static addUserCollectPosition(data) {
    return _axios({
      method: 'post',
      url: '/system/position/addUserCollectPosition',
      data,
      handleError: true,
    })
  }
  /**
   * 取消职位收藏
   *
   */
  static deleteUserCollectPosition(data) {
    return _axios({
      method: 'post',
      url: '/system/position/deleteUserCollectPosition',
      data,
      handleError: true,
    })
  }
  /**
   * 成为专家得行业接口
   *
   */
  static expertCat(data) {
    return _axios({
      method: 'post',
      url: '/api-user/expert-cat',
      data,
      handleError: true,
    })
  }

  /**
   * 咨询问题
   */
  static askQuestion(data) {
    return _axios({
      method: 'post',
      url: '/api-common/ask-question',
      data,
      handleError: true,
    })
  }

  static queryShieldCompanyList(data) {
    return _axios({
      method: 'post',
      url: '/system/company/queryShieldCompanyList',
      data,
      handleError: true,
    })
  }

  static shieldCompany(data) {
    return _axios({
      method: 'post',
      url: '/system/company/shieldCompany',
      data,
      handleError: true,
    })
  }

  static deleteShieldCompany(data) {
    return _axios({
      method: 'post',
      url: '/system/company/deleteShieldCompany',
      data,
      handleError: true,
    })
  }

  static queryCompanyList(data) {
    return _axios({
      method: 'post',
      url: '/system/company/queryCompanyList',
      data,
      handleError: true,
    })
  }
}
