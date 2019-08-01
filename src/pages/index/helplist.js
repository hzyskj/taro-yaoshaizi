/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 15:17:51
 * @LastEditTime: 2019-05-16 14:09:10
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Icon, ScrollView } from '@tarojs/components';

class HelpList extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props);
  }
  hanleClose() {
    this.props.close('showHelpList');
  }
  render() {
    return (
      <View className='alert-box help-list'>
        <View className='alert-cont'>
          <View className='font-big help-list-title tc flex flex-y-center flex-x-center'>助力记录</View>
          <Icon
            className='close'
            color='#ffffff'
            onClick={this.hanleClose.bind(this)}
            type='clear'
          />
          <View className='help-list-box flex'>
            {
              this.props.list && this.props.list.length > 0 ?
                <ScrollView scroll-y
                  style={`height:${Taro.pxTransform(330)}`}
                >
                  {
                    this.props.list.map(item => {
                      return (
                        <View
                          key={item.id}
                          className='help-item flex flex-y-center justcenter'
                        >
                          <View className='flex flex-y-center'>
                            <Image className='avatar'
                              src={item.avatar}
                            />
                            <Text className='font-small bold'
                              style='margin-left:4px'
                            >{item.nick_name}</Text>
                          </View>
                          <Text className='font-small prize-type'>{item.times}</Text>
                          <Text className='font-small prize-type'>助力成功</Text>
                        </View>
                      );
                    })
                  }
                </ScrollView>
              :
              <View class='flex flex-x-center flex-y-center w-100'>亲，暂时没有人帮你助力哦！</View>
            }
          </View>
        </View>
      </View>
    );
  }
}
export default HelpList;