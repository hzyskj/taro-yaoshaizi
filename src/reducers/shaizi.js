/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 21:20:38
 * @LastEditTime: 2019-05-13 15:20:06
 */
import { YAO, ROCK } from '../constants/shaizi';

const INITIAL_STATE = {
  isShare: false,
  yaoFlag: true,
  diceNum: 6,  // 摇到几点
  diceImgUrl: 'https://g1.jyblc.cn/pic/activity/2019_/04/zhounianqing/yaoxin/6.png', // 摇中的图片
  diceRockImgUrl: 'https://g1.jyblc.cn/pic/activity/2019_/04/zhounianqing/yaoxin/shaizi.gif' // 摇的过程图片
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROCK:
      return {
        ...state,
        yaoFlag: false,
        yaoCishu: state.yaoCishu -= 1,
        diceImgUrl: state.diceRockImgUrl
      };
    case YAO:
      if (action.share === 'share') {
        return {
          ...state,
          isShare: true,
          diceNum: action.num,
          diceImgUrl: `https://g1.jyblc.cn/pic/activity/2019_/04/zhounianqing/yaoxin/${action.num}.png`
        };
      } else {
        return {
          ...state,
          diceNum: action.num,
          yaoFlag: true,
          sumNum: action.num + state.sumNum,
          diceImgUrl: `https://g1.jyblc.cn/pic/activity/2019_/04/zhounianqing/yaoxin/${action.num}.png`
        };
      }

    default:
      return state;
  }
}
