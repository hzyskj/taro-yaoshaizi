/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-14 10:18:28
 * @LastEditTime: 2019-05-14 10:26:50
 */
import Taro, { Component } from '@tarojs/taro';
import { WebView } from '@tarojs/components';

class WebViewC extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <WebView src='https://g1.jyblc.cn/pic/test/xcx_shaizi_apk/index.html' />
    );
  }
}

export default WebViewC;