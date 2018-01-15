import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from "../../component/avatar-selector/avatar-selector"

class bossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
    this.avatarSelector = this.avatarSelector.bind(this)
  }
  handleChange(key, value){
    this.setState({
      [key]: value
    })
  }
  avatarSelector(text){
    this.setState({
      avatar: text
    })
  }
  render(){
    return(
      <div>
        <NavBar>BOSS信息完善</NavBar>
        <AvatarSelector avatarSelector={this.avatarSelector} />
        <InputItem onChange={v=>this.handleChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={v=>this.handleChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={v=>this.handleChange('money', v)}>职位薪资</InputItem>
        <TextareaItem onChange={v=>this.handleChange('desc', v)} title="职位要求" autoHeight={true} ></TextareaItem>
        <WhiteSpace/>
        <Button type="primary" >保存</Button>
      </div>
    )
  }
}
export default bossInfo