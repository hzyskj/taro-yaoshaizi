/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 15:17:51
 * @LastEditTime: 2019-05-16 18:40:53
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';


@connect(({ home }) => home)

class Prize extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props);
    this.state = {
      mark: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/sign.png'
    };
  }
  getWidth() {
    if(this.props.width === 0) {
      return 0;
    }
    if (this.props.width === 17) {
      return this.props.width - 2;
    }
    if (this.props.width === 50.2) {
      return this.props.width - 2;
    }
    if (this.props.width === 85) {
      return this.props.width - 4;
    }
    if (this.props.width > 85 && this.props.width < 100) {
      return this.props.width - 3;
    }
    if (this.props.width >= 100) {
      return 100 - 6;
    }
    return this.props.width - 1;
  }
  render() {
    return (
      <View className='prize'>
        <View className='index-prize flex'>
          {
            this.props.price.map(item => {
              return (
                <View
                  key={item.value}
                  className='bold flex-1 flex flex-x-center flex-y-center main-color'
                >
                  <Text className='font-big'>{item.value}</Text>
                  <Text className='font-small prize-type'>{item.type}</Text>
                </View>
              );
            })
          }
        </View>
        <View className='user-jindu'>
          <View className='index-jindu'
            style={`width:${this.props.width}%`}
          />
        </View>
        <Image className='mark'
          src={this.state.mark}
          style={`left:${this.getWidth()}%`}
        />
        <View className='flex prize-requir'>
          {
            this.props.price.map(item => {
              return (
                <View
                  key={item.value}
                  className='flex-1 flex flex-column flex-x-center flex-y-center fff-color'
                >
                  <View className='dian' />
                  <View>
                    <Text className='font-small'>总点数≥</Text>
                    <Text className='font-small bold'>{item.requir}</Text>
                    <Text className='font-small'>点</Text>
                  </View>
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}
export default Prize;