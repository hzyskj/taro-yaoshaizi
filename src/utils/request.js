/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 15:15:57
 * @LastEditTime: 2019-05-13 14:30:54
 */
import Taro from '@tarojs/taro';

const request = (data) => {
  return new Promise((resolve) => {
    Taro.showLoading({
      title: '拼命加载中...'
    });
    Taro.request(data).then(res => {
      Taro.hideLoading();
      if (res.data.code === 0) {
        resolve(res.data);
      } else {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none'
        });
        // reject();
      }
    });
  });
};

export default request;