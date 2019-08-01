/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 11:00:48
 * @LastEditTime: 2019-05-10 15:11:33
 */
import {
  AUTHORIZE_USER_INFO,
  SET_USER_INFO,
  GET_UNION_ID,
  SET_JYB_USER_INFO
} from '../constants/user';

import { getUnionid } from '../api/login';

export const authorizeUserInfo = () => {
  return {
    type: AUTHORIZE_USER_INFO
  };
};

export const setUserInfo = (res) => {
  return {
    type: SET_USER_INFO,
    res: res.userInfo
  };
};

export const setJybUserInfo = (data) => {
  return {
    type: SET_JYB_USER_INFO,
    data
  };
};

export const getUserUnionid = ({ iv, encryptedData, openid}) => {
  return dispatch => {
    getUnionid({
      iv, encryptedData, openid
    }).then(unionRes => {
      dispatch({
        type: GET_UNION_ID,
        unionid: unionRes.unionid
      });
    });
  };
};

