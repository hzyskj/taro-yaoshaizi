/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-08 11:45:26
 * @LastEditTime: 2019-05-17 17:05:03
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { setUserInfo, authorizeUserInfo, getUserUnionid, setJybUserInfo } from '../actions/user';
import { getPhone, getJybUserInfo } from '../api/login';

import { yao } from '../actions/shaizi';
import './shaizi.scss';

@connect(({ shaizi, user }) => {
  return {
    shaizi,
    user
  };
}, (dispatch) => ({
  setJybUserInfo(type) {
    dispatch(setJybUserInfo(type));
  },
  yao(share = 0, popen, jihui) {
    dispatch(yao(share, popen, jihui)).then(res => {
      console.log(res);
    });
  },
  setUserInfo(res) {
    dispatch(setUserInfo(res));
  },
  authorizeUserInfo() {
    dispatch(authorizeUserInfo());
  },
  getUserUnionid(res) {
    dispatch(getUserUnionid(res));
  }
}))

class ShaiZi extends Component {
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props);
    this.state = {
      shaiBg: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/block_shaizi.png'
    };
  }
  handleNewYaoEvent() {
    if (this.props.user.status === 4) {
      Taro.navigateTo({
        url: '/pages/yaoSucc/index'
      });
      return;
    }
    if (this.props.user.status === 5) {
      Taro.navigateTo({
        url: '/pages/newSucc/index'
      });
      return;
    }
    if (this.props.user.status === 2) {
      Taro.showToast({
        title: '你已是老朋友，不能给他助力',
        icon: 'none'
      });
      return;
    }
    if (this.props.user.status === 0) {
      Taro.showToast({
        title: '亲,已经是元宝老人了,去首页摇自己的骰子吧',
        icon: 'none'
      });
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/index/index'
        });
      }, 1500);
    }
    if (this.props.user.status === 3) {
      this.props.yao('share', this.props.popen);
    }
  }
  goYao() {
    if (this.props.share === '1') {
      this.handleNewYaoEvent();
    } else {
      if (this.props.user.status === 2) {
        Taro.showToast({
          title: '亲您的持仓为0，不符合活动条件',
          icon: 'none'
        });
        return;
      }
      if (this.props.shaizi.yaoFlag) this.props.yao(null, null, this.props.user.jihui);
    }
  }
  goLogin() {
    Taro.navigateTo({
      url: '/pages/login/index'
    });
  }
  async getPhoneNumber(e) {
    const { iv, encryptedData } = e.detail;
    await getPhone({
      iv,
      encryptedData
    });
    const type = this.props.share === '1' ? 2 : 1;
    const { data } = await getJybUserInfo(type); // 获取金元宝用户信息
    this.props.setJybUserInfo(data);
    this.goYao();
  }

  render() {
    return (
      <View>
        <View className='shaiziBg'>
          <Image class='w-100 h-100'
            src={this.state.shaiBg}
          />
          <Image
            className='shaizi'
            src={this.props.shaizi.diceImgUrl}
          />
        </View>
        {
          this.props.share === '1' ?
            (
              this.props.user.status === 1 ?
                <View class='yao-btn-block'>
                  <Button
                    className='yao-btn bold'
                    onGetPhoneNumber={this.getPhoneNumber}
                    open-type='getPhoneNumber'
                  >
                    点击摇奖助力
                  </Button>
                </View>
                :
                <View class='yao-btn-block'>
                  <Button
                    className='yao-btn bold'
                    onClick={this.goYao}
                  >
                    点击摇奖助力
                </Button>
                </View>
            )
            :
            (
              this.props.user.status === 1 ?
                (
                  this.props.user.asdf === 1 ?
                    <View class='yao-btn-block'>
                      <Button
                        className='yao-btn bold'
                        onClick={this.goLogin}
                      >
                        点击摇奖:
                        <Text className='font-big bold'>
                          {this.props.user.jihui}
                        </Text>
                        次
                      </Button>
                    </View>
                    :
                    <View class='yao-btn-block'>
                      <Button
                        className='yao-btn bold'
                        onGetPhoneNumber={this.getPhoneNumber}
                        open-type='getPhoneNumber'
                      >
                        点击摇奖:
                        <Text className='font-big bold'>
                          {this.props.user.jihui}
                        </Text>
                        次
                      </Button>
                    </View>
                )
                :
                <View class='yao-btn-block'>
                  <Button className='yao-btn'
                    onClick={this.goYao}
                  >
                    点击摇奖:
                <Text className='font-big bold'>
                      {this.props.user.jihui}
                    </Text>
                    次
                </Button>
                </View>
            )
        }
      </View>
    );
  }
}

export default ShaiZi;