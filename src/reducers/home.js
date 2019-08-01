/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 21:20:38
 * @LastEditTime: 2019-05-16 17:41:50
 */

const INITIAL_STATE = {
  // 奖品
  price: [{
    value: '100',
    type: '元宝',
    requir: 10
  }, {
    value: '300',
    type: '元宝',
    requir: 20
  }, {
    value: '500',
    type: '元宝',
    requir: 40
  }]
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
