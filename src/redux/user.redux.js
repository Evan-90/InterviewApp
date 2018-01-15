import axios from 'axios'
import { getRedirectPath } from "../util/util"
import {Toast} from 'antd-mobile'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const INFO_SUCCESS = 'INFO_SUCCESS'
const ERROR_MDG = 'ERROR_MDG'
const initState = {
  // 页面跳转路径
  redirectTo: '',
  // 用户信息
  user: '',
  pwd: '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch (action.type){
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case INFO_SUCCESS:
      return {...state,isAuth: true, ...action.payload}
    case ERROR_MDG:
      return {...state, msg: action.msg, isAuth: false}
    default:
      return state
  }
}

function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload: data}
}
function errorMsg(msg) {
  // 提示错误信息
  Toast.info(msg, 2)
  return {msg, type: ERROR_MDG}
}
/** cookie **/
export function loadData(data) {
  return {type: INFO_SUCCESS, payload: data}
}
/** 用户注册 **/
export function register({user, pwd, repeatpwd, type}) {
  if(!user || !pwd || !type){
    return errorMsg('用户名和密码不能为空')
  }
  if(pwd !== repeatpwd){
    return errorMsg('两次输入的密码必须相同')
  }
  return dispatch =>{
    axios.post('/user/register', {user, pwd, type}).then(res=>{
      if(res.status === 200 && res.data.code === 0){
        dispatch(authSuccess({user, pwd, type}))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
/** 用户登录 **/
export function login({user, pwd}) {
  if(!user || !pwd ){
    return errorMsg('用户名和密码不能为空')
  }
  return dispatch =>{
    axios.post('/user/login', {user, pwd}).then(res=>{
      if(res.status === 200 && res.data.code === 0){
        dispatch(authSuccess(res.data.data))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
/** boss完善信息 **/
export function update({title, company, money, desc, avatar}) {
  if(!title || !company || !money || !desc || !avatar){
    return errorMsg('请完善信息')
  }
  return dispatch =>{
    axios.post('/user/update', {title, company, money, desc, avatar}).then(res=>{
      if(res.status === 200 && res.data.code === 0){
        dispatch(authSuccess(res.data.data))
      }else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}