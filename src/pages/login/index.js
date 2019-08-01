/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-14 11:09:32
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button, Input } from '@tarojs/components';
import { login } from '../../api/login';
import './index.scss';

class YaoSucc extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor(props) {
    super(props);
    this.state = {
      bg: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/login/login_bg.png',
      user_name: '',
      password: ''
      // wechartIcon: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/login/wechart.png'
    };
    this.login = this.login.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  async componentDidMount() {

  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  async login() {
    const { user_name, password} = this.state;
    await login({
      user_name,
      password
    });
    Taro.navigateTo({
      url: '/pages/index/index'
    });
  }
  updata(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }
  // async getPhoneNumber(e) {
  //   const { iv, encryptedData } = e.detail;
  //   await getPhone({
  //     iv,
  //     encryptedData
  //   });
  //   console.log('getPhoneNumber成功');
  //   const type = this.props.share === '1' ? 2 : 1;
  //   const { data } = await getJybUserInfo(type); // 获取金元宝用户信息
  //   console.log(data);
  //   this.props.setJybUserInfo(data);
  // }

  render() {
    return (
      <View className='page-login'>
        <Image className='bg'
          src={this.state.bg}
        />
        <View className='title w-100 tc bold'>金元宝送好礼</View>
        <View className='login-box'>
          <View className='input-box'>
            <Input className='h-100'
              onChange={(e) => this.updata(e,'user_name')}
              placeholder='请输入金元宝账号'
              placeholder-class='phcolor'
              type='number'
            />
          </View>
          <View className='input-box'>
            <Input className='h-100'
              onChange={(e) => this.updata(e,'password')}
              placeholder='请输入金元宝密码'
              placeholder-class='phcolor'
              type='password'
            />
          </View>
          <Button onClick={this.login}>登录</Button>
        </View>
        {/* <View className='wx-login w-100 tc'>
          <View className='flex flex-y-center flex-x-center'>
            <View className='line-icon' />
            <View style='margin:0 4px;'>其他方式登录</View>
            <View className='line-icon' />
          </View>
          <Button className='wechart-icon-box'
            onGetPhoneNumber={this.getPhoneNumber}
            open-type='getPhoneNumber'
          >
            <Image className='wechart-icon'
              src={this.state.wechartIcon}
            />
          </Button>
        </View> */}
      </View>
    );
  }
}

export default YaoSucc;
