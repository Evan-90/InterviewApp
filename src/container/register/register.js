import React from 'react'
import { Toast, List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from "../../component/logo/logo";
import AuthRoute from "../../component/authRoute/authRoute";
import { connect } from 'react-redux'
import { register} from "../../redux/user.redux"

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' // 或者boss
    }
    this.login = this.login.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  login() {
    this.props.history.push('/login')
  }
  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  handleRegister() {
    console.log(this.state)
    this.props.register(this.state)
    // 是否有错误信息（未能注册成功），如果有弹出提示框
    //this.props.msg? Toast.info(`${this.props.msg}`, 3): null
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <AuthRoute/>
        <Logo/>
        <h2>注册页面</h2>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem onChange={v=> this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=> this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=> this.handleChange('repeatpwd', v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type === 'genius'} onChange={()=> this.handleChange('type', 'genius')}>牛人</RadioItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.type === 'boss'} onChange={()=> this.handleChange('type', 'boss')}>BOSS</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.login}>去登录</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register