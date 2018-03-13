import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace} from 'antd-mobile'
import cookies from 'browser-cookies'
@connect(
  state => state.user
)
class User extends React.Component{
  logout = () =>{
    cookies.erase('userid')
    window.location.href = '/login'
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
        <Result
          img={<img src='https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png' alt="" />}
          title={this.props.user}
          message={this.props.type === 'boss'?this.props.company:null}
        />
        <List renderHeader={()=>'简介'}>
          <Item>
            {this.props.title}
            {this.props.desc.split('\n').map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    )
  }
}
export default User