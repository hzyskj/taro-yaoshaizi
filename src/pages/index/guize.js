/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 15:17:51
 * @LastEditTime: 2019-05-17 15:05:06
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Icon, ScrollView} from '@tarojs/components';

class HelpList extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props);
  }
  hanleClose() {
    this.props.close('showGuize');
  }
  render() {
    return (
      <View className='alert-box help-list'>
        <View className='alert-cont'>
          <View className='font-big help-list-title tc flex flex-y-center flex-x-center'>活动规则</View>
          <Icon
            className='close'
            color='#ffffff'
            onClick={this.hanleClose.bind(this)}
            type='clear'
          />
          <View className='help-list-box font-small'
            style={`height:${Taro.pxTransform(550)}`}
          >
            <ScrollView scroll-y
              style={`height:${Taro.pxTransform(540)}`}
            >
              <View>一、活动时间：5月24日-5月31日</View>
              <View>二、活动对象：</View>
              <View>（1）截止2019年5月23日持仓＞0的宝友</View>
              <View>（2）本次活动参与助力的新宝友。</View>
              <View>三、活动说明：</View>
              <View>1、摇骰子赢大奖，总点数累计达到10点、20点、40点即可获得元宝奖励；</View>
              <View>2、首次进入活动可得1次摇奖机会，发送给新人助力，新人点击助力之后，你可获得1次摇奖机会；</View>
              <View>3、新人点击即可助力，在助力后会获得一次摇奖机会，点数越大，获得的现金奖励越高，登录金元宝即可领取；</View>
              <View>4、新人领取的现金，48小时内审核完会发放到存管账户，到账后即可提现。若在活动结束后，对应账户内的奖励未提现，系统将自动扣回；</View>
              <View>5、活动期间，同一微信号，手机号均视为同一用户。一个新用户仅能帮点赞一次。</View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
export default HelpList;