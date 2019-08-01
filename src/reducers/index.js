/*
 * @Description:
 * @Author: linZengFa
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-06 19:38:42
 * @LastEditTime: 2019-05-08 13:24:32
 */
import { combineReducers } from 'redux';
import home from './home';
import user from './user';
import shaizi from './shaizi';

export default combineReducers({
  home,
  user,
  shaizi
});
