/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-16 14:50:37
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { setUserInfo, authorizeUserInfo, setJybUserInfo } from '../../actions/user';

import wxLogin from '../../utils/login';
import { getJybUserInfo, getHelpList } from '../../api/login';
import ShaiZi from '../../component/shaizi';
import FirendList from './friendList';
import './index.scss';


@connect(({ user, shaizi }) => {
  return {
    user,
    shaizi
  };
}, (dispatch) => ({
  setJybUserInfo(type) {
    dispatch(setJybUserInfo(type));
  },
  setUserInfo(res) {
    dispatch(setUserInfo(res));
  },
  authorizeUserInfo() {
    dispatch(authorizeUserInfo());
  }
}))
class Share extends Component {
  config = {
    navigationBarTitleText: '帮我点一下吧'
  }
  constructor(props) {
    super(props);
    this.state = {
      bg: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/share.png',
      pavatar: null,
      pname: '--',
      popen: null,
      to: false,
      helpList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 0 && !this.state.to) {
      this.setState({
        to: true
      });
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/index/index'
        });
      }, 0);
      return;
    }
    const isShare = nextProps.shaizi.isShare;
    if (isShare && !this.state.to) {
      this.setState({
        to: true
      });
      Taro.navigateTo({
        url: '/pages/yaoSucc/index'
      });
    }
  }
  setPInfo(router) {
    this.setState({
      pavatar: router.params.pavatar,
      pname: router.params.pname,
      popen: router.params.popen
    });
  }
  async getHelpList() {
    const { data } = await getHelpList(this.state.popen);
    this.setState({
      helpList: data
    });
  }
  async componentDidMount() {
    this.setPInfo(this.$router);
    await wxLogin(); //  登录
    const { data } = await getJybUserInfo(2); // 获取金元宝用户信息
    this.props.setJybUserInfo(data);
    this.getHelpList();
  }

  componentDidShow() {
    // 如果是本人打开 跳转首页
    if (this.$router.params.popen === Taro.getStorageSync('openid')) {
      Taro.navigateTo({
        url: '/pages/index/index'
      });
    }
  }

  render() {
    return (
      <View className='page-share'>
        <Image className='bg'
          src={this.state.bg}
        />
        <Image className='pavatar'
          src={this.state.pavatar}
        />
        <Text className='pname'>{this.state.pname}</Text>
        <ShaiZi
          popen={this.state.popen}
          share='1'
        />
        <View className='tc mg-t-10'>
          <Text className='font-big main-color bold'>点数越大，奖励越高</Text>
        </View>

        <View className='tc'>
          <Text className='font-big bold fff-color'>最高可得
            <Text className='main-color'>100</Text>元现金
          </Text>
        </View>
        <View className='tc mg-t-10 font-0'>
          <Text className='font-small fff-color'>可直接提现哦</Text>
        </View>
        <FirendList
          bg={this.state.bg}
          list={this.state.helpList}
        />
      </View>
    );
  }
}

export default Share;
