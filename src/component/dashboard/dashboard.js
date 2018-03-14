import React from 'react'
import { connect } from 'react-redux'
import {NavBar} from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from "../navlink/navlink";
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from "../msg/msg";
import {getMsgList, recvMsg} from '../../redux/chat.redux'
@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component{
  // constructor(props){
  //   super(props)
  // }
  componentDidMount() {
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        title: '牛人列表',
        icon: 'boss',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: '职位',
        title: '职位列表',
        icon: 'genius',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        title: '消息列表',
        icon: 'msg',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        title: '个人中心',
        icon: 'user',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="dashboard-navbar" mode="light" >{navList.find(v=> v.path === pathname).title}</NavBar>
        <div className="dashboard-con">
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}
export default Dashboard