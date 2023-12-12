import * as types from './mutation-type'
import WebIM from '@/lin/util/WebIM'

export default {
  [types.SET_LOGINED](state) {
    /* eslint no-param-reassign: 0 */
    state.logined = true
  },

  [types.REMOVE_LOGINED](state) {
    state.logined = false
    state.user = null
  },

  [types.SET_USER](state, payload) {
    state.user = payload
  },

  [types.ADD_READED_MESSAGE](state, payload) {
    state.readedMessages.push(payload)
  },

  [types.ADD_UNREAD_MESSAGE](state, payload) {
    // console.log('===:  ', payload)
    state.unreadMessages.push(payload)
  },

  [types.REMOVE_UNREAD_MESSAGE](state, payload) {
    // payload => message.id
    const { unreadMessages } = state
    const index = unreadMessages.findIndex(el => el.id === payload)
    unreadMessages.splice(index, 1)
  },

  [types.SET_USER_PERMISSIONS](state, permissions) {
    const _permissions = []
    for (let i = 0; i < permissions.length; i++) {
      for (const key in permissions[i]) {
        // console.log(i, state.user.permissions[i][key])
        for (let j = 0; j < permissions[i][key].length; j++) {
          _permissions.push(permissions[i][key][j].permission)
        }
      }
    }
    state.permissions = _permissions
  },

  [types.SET_REFERSH_OPTION](state, option) {
    state.refreshOptions = option
  },

  [types.SET_USER_INFO](state, data) {
    state.userInfo = data
    sessionStorage.setItem('hopeUserInfo', JSON.stringify(data))
  },

  [types.SET_TOKEN](state, data) {
    state.token = data
    sessionStorage.setItem('hopeToken', data)
  },

  [types.SET_USER_ID](state, data) {
    state.userId = data
    sessionStorage.setItem('hopeUserId', data)
  },

  [types.REGISTER_BASIC](state, data) {
    state.userBasicInfo = data
  },

  [types.REGISTER_EDU](state, data) {
    state.userEduInfo = data
  },

  [types.REGISTER_EXPECTED_POSITION](state, data) {
    state.userExpectedPosition = data
  },

  [types.REGISTER_LAST_EXPERIENCE](state, data) {
    state.userLastExperience = data
  },

  [types.LOGINOUT](state) {
    state.userInfo = {}
    state.token = ''
    state.userId = ''
    WebIM.conn.close()
    sessionStorage.clear()
    localStorage.clear()
  },

  [types.SET_OXTITLE](state, data) {
    state.oxTitle = data
    localStorage.setItem('oxTitle', data)
  },

  [types.SET_NOW_CITY](state, data) {
    state.cityName = data
    sessionStorage.setItem('nowCityName', data)
  },

  [types.SET_NOW_PROVINCE](state, data) {
    state.province = data
    sessionStorage.setItem('nowProvince', JSON.stringify(data))
  },

  [types.SET_USER_MOBILE](state, data) {
    state.mobile = data
    sessionStorage.setItem('userMobile', data)
  },

  [types.CLEAR_REGISTER_DATA](state) {
    state.userBasicInfo = {}
    state.userEduInfo = {}
    state.userLastExperience = {}
    state.userExpectedPosition = {}
  },
}
