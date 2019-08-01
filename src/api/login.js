/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 14:59:30
 * @LastEditTime: 2019-05-14 17:53:11
 */
import Taro from '@tarojs/taro';
import request from '../utils/request';

// 获取用户sessionkey
export function getSessionKey(code) {
  return request({
    url: 'https://jyblc.cn/smallroutine/wxlogincode',
    type: 'POST',
    data: {
      code
    }
  });
}

// 获取用户唯一Unionid
export function getUnionid({ iv, encryptedData }) {
  return request({
    url: 'https://jyblc.cn/smallroutine/gengxinuserUnionid',
    type: 'POST',
    data: {
      openid: Taro.getStorageSync('openid'),
      iv,
      encryptedData
    }
  });
}

// 获取用户基本信息
export function getJybUserInfo(type) {
  console.log('getJybUserInfo->type->'+type);
  return request({
    url: 'https://jyblc.cn/smallroutine/getuserinfo',
    type: 'POST',
    data: {
      openid: Taro.getStorageSync('openid'),
      type
    }
  });
}

// 用户授权 获取用户手机号
export function getPhone({ iv, encryptedData }) {
  return request({
    url: 'https://jyblc.cn/smallroutine/getUserPhone',
    type: 'POST',
    data: {
      openid: Taro.getStorageSync('openid'),
      iv,
      encryptedData
    }
  });
}

export function getOpenGid({ iv, encryptedData}) {
  return request({
    url: 'https://jyblc.cn/smallroutine/getShareMessage',
    type: 'POST',
    data: {
      openid: Taro.getStorageSync('openid'),
      iv,
      encryptedData
    }
  });
}

// 摇色子
export function goYaoShaizi() {
  return request({
    url: 'https://jyblc.cn/smallroutine/yaoshaizi',
    type: 'POST',
    data: {
      openid: Taro.getStorageSync('openid')
    }
  });
}

// 新人摇色子
export function goNewYaoShaizi(popen) {
  return request({
    url: 'https://jyblc.cn/smallroutine/weihaoyouzhuli',
    type: 'POST',
    data: {
      openid: Taro.getStorageSync('openid'),
      parent_opend_id: popen
    }
  });
}

// 获取弹幕数据
export function getDanmu() {
  return request({
    url: 'https://jyblc.cn/smallroutine/getdanmu',
    type: 'POST'
  });
}

// 获取助力列表
export function getHelpList(openid = Taro.getStorageSync('openid')) {
  return request({
    url: 'https://jyblc.cn/smallroutine/invitelist',
    type: 'POST',
    data: {
      openid
    }
  });
}

// 账号密码登录
export function login({ openid = Taro.getStorageSync('openid'), user_name, password}) {
  return request({
    url: 'https://jyblc.cn/smallroutine/userLogin',
    type: 'POST',
    data: {
      openid,
      user_name,
      password
    }
  });
}