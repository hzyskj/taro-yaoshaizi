/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors:
 * @Date: 2019-05-08 14:19:16
 * @LastEditTime: 2019-05-08 14:19:28
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';



class FriendList extends Component {
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View className='friend-list'>
        <View className='friend-list-title flex flex-x-center flex-y-center'>
          <Text>已为ta助力好友</Text>
        </View>
        <View className='swiper'>
          <Swiper
            autoplay
            circular
            className='h-100'
            display-multiple-items={this.props.list.length >= 4 ? 4 : this.props.list.length}
          >
            {
              this.props.list.map((item,index) => {
                return (
                  <SwiperItem key={index}>
                    <View className='h-100 swiper-item flex flex-column flex-x-center flex-y-center'>
                      <Image className='avatar'
                        src={item.photo}
                      />
                      <Text className='fff-color font-small'>{item.nick_name}</Text>
                    </View>
                  </SwiperItem>
                );
              })
            }
          </Swiper>
        </View>
      </View>
    );
  }
}

export default FriendList;
