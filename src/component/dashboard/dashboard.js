import React from 'react'
import { connect } from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from "../navlink/navlink";
function Boss() {
  return <h2>boss page</h2>
}
function Genius() {
  return <h2>genius page</h2>
}
function Msg() {
  return <h2>消息页面</h2>
}
function User() {
  return <h2>个人中心</h2>
}
@connect(
  state=>state
)
class Dashboard extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人列表',
        icon: 'boss',
        component: 'Boss',
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: '职位列表',
        icon: 'genius',
        component: 'Genius',
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        component: 'Msg'
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        component: 'User'
      }
    ]
    return (
      <div>
        <NavBar mode="light" >{navList.find(v=> v.path === pathname).text}</NavBar>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}
export default Dashboard