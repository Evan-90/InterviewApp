import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
@withRouter
class AuthRoute extends React.Component{
  componentDidMount() {
    const pathArray = ['/login', '/register']
    // 获取当前页面 path
    const pathName = this.props.location.pathname
    // 如果当前页面在登录和注册页面 则不获取用户信息
    if(pathArray.indexOf(pathName) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then(res =>{
      if(res.status === 200) {
        if(res.data.code === 0){
          // 有登录信息 doSomethings
        }else {
          // 没有登录信息 跳转到登录页
          this.props.history.push('/login')
        }

      }
    })
    // 用户是否登录
    // 现在的url地址  login是不需要跳转的
    // 用户的type身份是boss还是牛人
    // 用户是否完善信息（选择图像 个人简介）
  }
  render() {
    return '判断跳转的地方'
  }
}
export default AuthRoute