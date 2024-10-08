import * as types from './mutation-type'
import { removeToken } from '@/lin/util/token'

export default {
  setUserAndState({ commit }, user) {
    // 如果登陆成功，设置logined标志位
    commit(types.SET_LOGINED, true)
    // 设置全局用户状态
    commit(types.SET_USER, user)
  },

  // loginOut({ commit }) {
  //   removeToken()
  //   commit(types.REMOVE_LOGINED, false)
  // },

  readMessage({ commit }, message) {
    commit(types.REMOVE_UNREAD_MESSAGE, message.id)
    commit(types.ADD_READED_MESSAGE, message)
  },

  setUserInfo({ commit }, data) {
    commit(types.SET_USER_INFO, data)
  },

  setToken({ commit }, data) {
    commit(types.SET_TOKEN, data)
  },

  setUserId({ commit }, data) {
    commit(types.SET_USER_ID, data)
  },

  loginOut({ commit }) {
    commit(types.LOGINOUT)
  },

  setOxTitle({ commit }, data) {
    commit(types.SET_OXTITLE, data)
  },

  setUserMobile({ commit }, data) {
    commit(types.SET_USER_MOBILE, data)
  },
}
