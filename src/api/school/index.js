import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class School {
  /**
   * 校招职位搜索/岗位类型点击搜索接口
   *
   */
  static positonSearch(data) {
    return _axios({
      method: 'post',
      url: '/personal/schRecru/positonSearch',
      data,
      handleError: true,
    })
  }

  /**
   * 校招职位搜索下拉列表
   *
   */
  static positionType(data) {
    return _axios({
      method: 'post',
      url: '/personal/schRecru/positionType',
      data,
      handleError: true,
    })
  }

  /**
   * 校招海报图列表
   *
   */
  static async bannerList(data) {
    let res = await get('/personal/schRecru/bannerList', data)
    return res
  }

  /**
   * 热门校招列表
   *
   */
  static queryHotPosition(data) {
    return _axios({
      method: 'post',
      url: '/personal/schRecru/queryHotPosition',
      data,
      handleError: true,
    })
  }
}
