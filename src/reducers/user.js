/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 11:02:55
 * @LastEditTime: 2019-05-16 18:41:40
 */
import { AUTHORIZE_USER_INFO, SET_USER_INFO, SET_JYB_USER_INFO } from '../constants/user';

const INITIAL_STATE = {
  userName: null,
  avatar: null,
  authorizeUserInfo: false,

  // jybuserinfo
  asdf: null,
  status: null,
  jihui: null,
  totalpoint: null,
  user_id: null,
  password: null
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHORIZE_USER_INFO:
      return {
        ...state,
        authorizeUserInfo: true
      };
    case SET_USER_INFO:
      return {
        ...state,
        userName: action.res.nickName,
        avatar: action.res.avatarUrl
      };
    case SET_JYB_USER_INFO:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}

