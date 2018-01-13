import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MDG = 'ERROR_MDG'
const initState = {
  isAuth: false,
  user: '',
  pwd: '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch (action.type){
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload}
    case ERROR_MDG:
      return {...state, msg: action.msg, isAuth: false}
    default:
      return state
  }
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}
function errorMsg(msg) {
  return {msg, type: ERROR_MDG}
}
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
        dispatch(registerSuccess({user, pwd, type}))
      }else {
        dispatch(errorMsg(res.date.msg))
      }
    })
  }
}