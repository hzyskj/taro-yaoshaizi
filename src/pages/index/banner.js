/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 15:17:51
 * @LastEditTime: 2019-05-07 15:41:53
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

class Banner extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className='banner'>
        <Image
          className='w-100 h-100'
          src={this.props.banner}
        />
      </View>
    );
  }
}
export default Banner;