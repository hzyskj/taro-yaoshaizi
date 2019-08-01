/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-08 17:26:45
 * @LastEditTime: 2019-05-14 13:29:16
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class TextScrollX extends Component {
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };
  }
  scroll() {

  }
  componentDidMount() {
    setTimeout(() => {
      this.getWidth();
    },1000);
  }
  refScroll = (node) => {
    this.scrollBox = node;
  }
  getWidth() {
    const textLen = this.props.xList.reduce((prev,curr) => {
      return prev + curr;
    });
    const len = this.props.xList.length;
    this.setState({
      style: {
        'width': `${textLen.length * 14}px`,
        'transform': `translateX(-${textLen.length * 14}px)`,
        'transition': `all ${len * 10}s linear;`
      }
    });
  }
  render() {
    return (
      <View className='text-scroll-x flex'>
        <View
          ref={this.refScroll}
          className='h-100 text-box flex flex-y-center'
          style={this.state.style}
        >
          {
            this.props.sigin ?
              this.props.xList.map((item, index) => {
                return (
                  <Text
                    key={index}
                    className='list-item'
                  >{item.nick_name}成功领取{item.point * 2}元</Text>
                );
              })
            :
              this.props.xList.map((item,index) => {
                return (
                <Text
                  key={index}
                  className='list-item'
                >{item.nick_name}摇到了{item.point}点，获得了{item.point * 2}元的红包奖励~</Text>
                );
              })
          }
        </View>
     </View>
    );
  }
}
export default TextScrollX;