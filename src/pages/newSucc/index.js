/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-16 11:27:57
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import TextScrollX from '../../component/textScroollX/index';
import { getDanmu } from '../../api/login';
import './index.scss';


@connect(({ user }) => {
  return {
    user
  };
}, () => ({

}))
class NewPerson extends Component {
  config = {
    navigationBarTitleText: '提现我的助力现金红包'
  }
  constructor(props) {
    super(props);
    this.state = {
      bg: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/sigin_succ_bg.png?v=2',
      logo: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/logo.png',
      erweima: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/erweima.png',
      btn: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/btn.png',
      danmuList: [],
      android: false
    };
  }
  componentDidMount() {
    this.getMobilePlatform();
    this.getDanmuList();
  }
  getMobilePlatform() {
    try {
      const res = Taro.getSystemInfoSync();
      this.setState({
        android: res.platform === 'android'
      });
    } catch( error ) {
      console.log(error);
    }
  }
  async getDanmuList() {
    const { data } = await getDanmu();
    this.setState({
      danmuList: [...data, ...data]
    });
  }

  adDown() {
    if(this.state.android) {
      Taro.navigateTo({
        url: '/pages/webview/index'
      });
    }
  }
  showCode() {
    Taro.previewImage({
      current: '金元宝App', // 当前显示图片的http链接
      urls: ['https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/erweima-prev.png'] // 需要预览的图片http链接列表
    });
  }
  render() {
    return (
      <View className='sigin-succ'>
        <TextScrollX
          sigin='1'
          xList={this.state.danmuList}
        />
        <Image className='bg'
          src={this.state.bg}
        />
        <Text className='money bold'>{this.props.user.totalpoint * 2}.00</Text>
        <View className='what-get-money'>
          <Text className='title'>如何领取提现:</Text>
          <View className='step'>
            <View style='margin-top:10px'>1.下载金元宝APP&gt;&gt;</View>
            <View>安卓用户直接点击右方图标下载</View>
            <View style='margin-top:10px'>苹果手机用户：</View>
            <View style='width:94%'>①打开App Store搜索“金元宝”下载APP</View>
            <View style='width:94%'>②点击右侧二维码，长按保存后在微信中打开，长按识别后，即可下载金元宝APP</View>
            <View style='margin-top:10px'>2.通过账户：{this.props.user.user_id}登录，登录密码：{this.props.user.password}；</View>
            <View style='margin-top:10px'>3.进入首页-“摇点数赢大奖”活动-按提示领取现金</View>
          </View>
          <View className='step-right'>
            <View className='logo tc'>
              <Image
                className='w-100 h-100'
                onClick={this.adDown.bind(this)}
                src={this.state.logo}
              />
              <View className='bold'>金元宝</View>
            </View>
            <View className='logo evcode'
              onClick={this.showCode.bind(this)}
            >
              <Image className='w-100 h-100'
                src={this.state.erweima}
              />
            </View>
          </View>
        </View>
        <View className='footer-btn'>
          <Image
            className='w-100 h-100'
            onClick={this.showCode.bind(this)}
            src={this.state.btn}
          />
        </View>
      </View>
    );
  }
}

export default NewPerson;
