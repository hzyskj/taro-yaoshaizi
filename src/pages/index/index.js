/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-20 10:28:36
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { setUserInfo, authorizeUserInfo, getUserUnionid, setJybUserInfo } from '../../actions/user';
import wxLogin from '../../utils/login';
import Banner from './banner';
import Prize from './prize';
import Shaizi from '../../component/shaizi';
import HelpList from './helplist';
import Guize from './guize';
import { getJybUserInfo, getHelpList } from '../../api/login';
import './index.scss';

@connect(({ shaizi, user, home }) => {
  return {
    shaizi,
    user,
    home
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
  },
  getUserUnionid(res) {
    dispatch(getUserUnionid(res));
  }
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props);
    this.state = {
      banner: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/banner.png?v=4',
      activeKnow: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/jieshao.png?v=3',
      guizeIcon: 'https://g1.jyblc.cn/pic/activity/2019_/05/card-skill/guize.png',
      cupIcon: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/cup.png',
      shareCelan: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/share.png',
      showHelpList: false,
      showGuize: false,
      helpList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  // 用户手动点击button获取个人信息
  getInfo(e) {
    try {
      if (e.target.errMsg.indexOf('fail') > -1) return;
      this.props.authorizeUserInfo();
      this.props.setUserInfo(e.target);
      this.props.getUserUnionid({
        iv: e.target.iv,
        encryptedData: e.target.encryptedData,
        openid: Taro.getStorageSync('openid')
      });
    } catch (error) {
      console.log(error);
    }
  }
  // 显示转发
  showShare() {
    Taro.showShareMenu({
      withShareTicket: true
    });
  }
  hideShare() {
    Taro.hideShareMenu();
  }
  // 如果已经授权 自动获取用户信息
  async autoGetUserInfo() {
    const { authSetting } = await Taro.getSetting();
    if (authSetting['scope.userInfo']) {
      this.props.authorizeUserInfo();
      const userInfo = await Taro.getUserInfo({
        withCredentials: true
      });
      this.props.getUserUnionid({
        iv: userInfo.iv,
        encryptedData: userInfo.encryptedData
      });
      this.props.setUserInfo(userInfo);
    }
  }
  async componentDidMount() {
    this.hideShare(); // 默认隐藏分享
  }

  async componentDidShow() {
    await wxLogin(); //  登录
    const { data } = await getJybUserInfo(1); // 获取金元宝用户信息
    this.props.setJybUserInfo(data);
    this.autoGetUserInfo(); // 如果已授权更新userinfo信息
  }

  onShareAppMessage() {
    return {
      title: `帮${this.props.user.userName}摇一下,你也能得现金奖励哦！`,
      path: `/pages/share/index?pavatar=${this.props.user.avatar}&pname=${this.props.user.userName}&popen=${Taro.getStorageSync('openid')}`,
      imageUrl: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/share.jpg'
    };
  }

  async showAlert(key) {
    if (key === 'showHelpList') {
      const { data } = await getHelpList();
      this.setState({
        helpList: data
      });
    }
    this.setState({
      [key]: true
    });
  }
  hideAlert(key) {
    this.setState({
      [key]: false
    });
  }
  getJinduWidth() {
    const sum = this.props.user.totalpoint;
    const requir = this.props.home.price.map(item => item.requir);
    const [req1, req2, req3] = requir;
    if (sum === req1) return 17;
    if (sum === req2) return 50.2;
    if (sum === req3) return 85;
    if (sum < req1) {
      return sum * (17 / req1);
    }
    if (sum > req1 && sum < req2) {
      return 17 + ((sum - req1) * (50.2 - 17) / (req2 - req1));
    }
    if (sum > req2 && sum < req3) {
      return 50.2 + ((sum - req2) * (85 - 50.2) / (req3 - req2));
    }
    if (sum > req3) {
      const w = 85 + (sum - req3) * 1.16;
      return w > 100 ? 100 : w;
    }
  }
  render() {
    if (this.props.user.is_new === 1 && this.props.user.userName) this.showShare();
    const width = this.getJinduWidth();
    return (
      <View className='page-index'>
        <Banner
          banner={this.state.banner}
          className='banner'
        />
        <View className='page-content'>
          <Prize width={width} />
          <View className='shaizi-block'>
            <View className='flex justcenter'>
              <View className='user-index-sum flex flex-x-center flex-y-center fff-color'>
                <Image className='cup-icon'
                  src={this.state.cupIcon}
                />
                <Text>已获总点数:</Text>
                <Text className='bold font-big main-color'>{this.props.user.totalpoint}</Text>
              </View>
              <View>

                <Text className='bold main-color friend-help-list'
                  onClick={this.showAlert.bind(this, 'showHelpList')}
                >助力记录</Text>
              </View>
            </View>

            <Shaizi />
            <View className='get-jihui-block'>
              <View className='tc'>
                <Text className='bold'>好友点击助力，机会+1</Text>
              </View>
              {
                this.props.user.status === 0 ?
                  this.props.user.userName ?
                    (
                      <Button open-type='share'>立即发给好友&gt;&gt;</Button>
                    )
                    :
                    (
                      <Button onGetUserInfo={this.getInfo}
                        open-type='getUserInfo'
                      >立即发给好友&gt;&gt;</Button>
                    )
                  :
                  (null)
              }
            </View>
            <View className='celan'>
              {
                this.props.user.status === 0 ?
                  this.props.user.userName ?
                    (
                      <Button
                        class='celan-share-btn'
                        open-type='share'
                      >
                        <Image className='celan-share-img'
                          src={this.state.shareCelan}
                        />
                      </Button>
                    )
                    :
                    (
                      <Button
                        class='celan-share-btn'
                        onGetUserInfo={this.getInfo}
                        open-type='getUserInfo'
                      >
                        <Image className='celan-share-img'
                          src={this.state.shareCelan}
                        />
                      </Button>
                    )
                  :
                  (null)
              }
              <Image
                className='celan-img'
                onClick={this.showAlert.bind(this, 'showGuize')}
                src={this.state.guizeIcon}
              />
            </View>
            {
              this.state.showHelpList ?
                <HelpList
                  close={() => this.hideAlert.bind(this)('showHelpList')}
                  list={this.state.helpList}
                />
                :
                null
            }
            {
              this.state.showGuize ?
                <Guize
                  close={() => this.hideAlert.bind(this)('showGuize')}
                />
                :
                null
            }
          </View>
          <View className='active-know'>
            <Image
              className='w-100 h-100'
              src={this.state.activeKnow}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
