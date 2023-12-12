import config from './WebIMConfig'
import websdk from 'easemob-websdk'

// 初始化IM SDK
let WebIM = {}
WebIM = window.WebIM = websdk
WebIM.config = config
WebIM.conn = new WebIM.connection({
  isReport: false,
  appKey: WebIM.config.appkey,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery,

  // 公有云 isHttpDNS 默认配置为true
  isHttpDNS: WebIM.config.isHttpDNS,
})

WebIM.WebRTC = window.webrtc // 本项目引入 UMD 文件有问题，暂时这样引入
WebIM.EMedia = window.emedia
// WebIM.AgoraRTC = AgoraRTC;
// WebIM.rtc = rtc;

export default WebIM
