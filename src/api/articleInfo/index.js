import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class ArticleInfo {
  /**
   * 获取文章详情
   *@param {object} data
   */
  static getArticleInfo(data) {
    return _axios({
      method: 'post',
      url: '/media/article-info',
      data,
      handleError: true,
    })
  }
}
