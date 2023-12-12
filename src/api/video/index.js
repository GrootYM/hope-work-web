import _axios, { post, get, put } from '@/lin/plugin/axios'
import { saveTokens } from '@/lin/util/token'
import store from '@/store'

export default class Video {
  /**
   * 视频列表
   *
   */
  static videoList(data) {
    return _axios({
      method: 'post',
      url: '/media/video-list',
      data,
      handleError: true,
    })
  }
  /**
   * 视频详情
   *
   */
  static videoInfo(data) {
    return _axios({
      method: 'post',
      url: '/media/video-info',
      data,
      handleError: true,
    })
  }
}
