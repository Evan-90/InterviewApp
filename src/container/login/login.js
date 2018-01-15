import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from "../../component/logo/logo"
import {login} from "../../redux/user.redux"

@connect(state=>state.user, { login })
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleChange(key, v) {
    this.setState({
      [key]: v
    })
  }
  login(){
    this.props.login(this.state)
  }
  render() {
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null }
        <Logo/>
        <h2>登陆页面</h2>
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.login}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login