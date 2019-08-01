/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-17 17:00:11
 */
import {
  YAO,
  ROCK
} from '../constants/shaizi';

import {
  SET_JYB_USER_INFO
} from '../constants/user';
import { goYaoShaizi, goNewYaoShaizi } from '../api/login';

// 首页action
export const rock = () => {
  return {
    type: ROCK
  };
};

export const yao = (share, popen, userJihui) => {
  return async dispatch => {
    if (share) {
      dispatch(rock());
      const { data: { point, user_id, password } } = await goNewYaoShaizi(popen);
      dispatch({
        type: YAO,
        num: point,
        share
      });
      dispatch({
        type: SET_JYB_USER_INFO,
        data: {
          user_id,
          password,
          totalpoint: point
        }
      });
      // resolve(share);
    } else {
      console.log('userJihui->'+userJihui);
      if (userJihui && userJihui > 0) dispatch(rock());
      const { data: { point, jihui, totalpoint } } = await goYaoShaizi();
      setTimeout(() => {
        dispatch({
          type: YAO,
          num: point,
          share
        });
        dispatch({
          type: SET_JYB_USER_INFO,
          data: {
            totalpoint,
            jihui
          }
        });
      },2000);
      // resolve(share);
    }
  };
};
