/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-14 11:09:32
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import TextScrollX from '../../component/textScroollX/index';
import { setUserInfo, authorizeUserInfo, getUserUnionid } from '../../actions/user';
import { getDanmu } from '../../api/login';
import './index.scss';


@connect(({ shaizi, user }) => {
  return {
    shaizi, user
  };
}, (dispatch) => ({
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
class YaoSucc extends Component {
  config = {
    navigationBarTitleText: '助力成功，送你一个红包'
  }
  constructor(props) {
    super(props);
    this.state = {
      bg: 'https://g1.jyblc.cn/pic/activity/2019_/05/xcx_yaoshaizi/new/zhongjiang.png',
      danmuList: [],
      djsTime: '----'
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
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
    this.autoGetUserInfo();
    this.getDanmuList();
    this.setDjsTime({
      startTime: this.props.user.start_time * 1000,
      endTime: this.props.user.end_time * 1000
    });
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  async getDanmuList() {
    const { data } = await getDanmu();
    this.setState({
      danmuList: [...data, ...data]
    });
  }
  setDjsTime(time) {
    const startTime = time.startTime;//开始时间
    const nowtime = time.endTime;//结束时间
    const lefttime = parseInt((nowtime - startTime) / 1000); //计算差的秒数
    //一天24小时 一小时60分钟 一分钟60秒
    let d = parseInt(lefttime / 3600 / 24);
    let h = parseInt((lefttime / 3600) % 24);
    let m = parseInt((lefttime / 60) % 60);
    let s = parseInt(lefttime % 60);
    m < 10 ? m = '0' + m : m;
    s < 10 ? s = '0' + s : s;

    if (lefttime > 0) {
      setTimeout(function () {
        this.setDjsTime({
          startTime: startTime,
          endTime: nowtime - 1000
        });
      }.bind(this), 1000);
      if (d > 0) {
        this.setState({
          djsTime: d + '天' + h + ':' + m + ':' + s
        });
      } else {
        if (h == 0) {
          this.setState({
            djsTime: m + ':' + s
          });
        }
        if (h > 0) {
          this.setState({
            djsTime: h + ':' + m + ':' + s
          });
        }
      }
    }
    if (lefttime == 0) {
      this.showDjs = false;
      this.pic.firstAlert = this.pic.startAlert;
      return true;
    }
  }
  getHb() {
    Taro.navigateTo({
      url: '/pages/newSucc/index'
    });
  }
  getUserInfo(e) {
    console.log(e);
    try {
      if (e.target.errMsg.indexOf('fail') > -1) return;
      this.props.authorizeUserInfo();
      this.props.setUserInfo(e.target);
      this.props.getUserUnionid({
        iv: e.target.iv,
        encryptedData: e.target.encryptedData
      });
      this.getHb();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const diceNum = this.props.shaizi.diceNum;
    return (
      <View className='page-yao-succ'>
        <TextScrollX xList={this.state.danmuList} />
        <View className='djs'>
          <Text className='djs-time'>{this.state.djsTime}</Text>
          <Text>后红包过期</Text>
        </View>
        <Image className='bg'
          src={this.state.bg}
        />
        <Text class='slign-num'>{diceNum}</Text>
        <Image className='dice-image'
          src={this.props.shaizi.diceImgUrl}
        />
        <View className='tc mg-t-10 page-text-tip'>
          <Text className='font-big bold fff-color'>获得{diceNum}倍幸运奖励</Text>
        </View>
        <View className='tc'>
          <Text className='main-color'>2x{diceNum}</Text>
          <Text className='fff-color'>=</Text>
          <Text className='main-color font-big'
            style='font-size:30px'
          >{2 * diceNum}</Text>
          <Text className='fff-color'>元现金红包</Text>
        </View>
        <View className='tc mg-t-10 font-0'>
          <Text className='font-small main-color'>可直接提现哦</Text>
        </View>
        <View class='yao-btn-block'>
          {
            this.props.user.userName ?
              <Button
                className='yao-btn bold'
                onClick={this.getHb.bind(this)}
              >点击领取</Button>
              :
              <Button
                className='yao-btn bold'
                onGetUserInfo={this.getUserInfo}
                open-type='getUserInfo'
              >点击领取</Button>
          }
        </View>
      </View>
    );
  }
}

export default YaoSucc;
