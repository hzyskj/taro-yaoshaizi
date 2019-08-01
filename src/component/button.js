/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-08 14:58:58
 * @LastEditTime: 2019-05-08 15:36:07
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

class FButton extends Component {
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props);
  }
  test() {
    this.props.butClick();
  }
  render() {
    return (
      <View class='yao-btn-block'>
      {
          this.props.type === 'getPhone' ?
            <Button
              className='yao-btn bold'
              open-type='getPhoneNumber'
            >
              {this.props.text}
            </Button>
            :
            <Button
              className='yao-btn bold'
              onClick={this.test}

            >
              {this.props.text}
            </Button>
      }

      </View>
    );
  }
}

export default FButton;