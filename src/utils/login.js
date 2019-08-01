/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 18:58:10
 * @LastEditTime: 2019-05-13 14:30:42
 */
import Taro from '@tarojs/taro';
import { getSessionKey } from '../api/login';

const wxLogin =  () => {
  return new Promise(async (resolve) => {
    try {
      await Taro.checkSession();
      if (!Taro.getStorageSync('openid')) {
        throw new Error('本地没有缓存token');
      }
      resolve(Taro.getStorageSync('openid'));
    } catch (error) {
      const { code } = await Taro.login();
      const { openid } = await getSessionKey(code);
      Taro.setStorageSync('openid', openid);
      resolve(openid);
    }
  });
};

export default wxLogin;

