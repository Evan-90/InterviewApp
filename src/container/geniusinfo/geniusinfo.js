import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AvatarSelector from "../../component/avatar-selector/avatar-selector"
import { update } from "../../redux/user.redux"

@connect(state=>state.user, { update })
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      title: '',
      desc: ''
    }
    this.avatarSelector = this.avatarSelector.bind(this)
  }
  handleChange(key, value){
    this.setState({
      [key]: value
    })
  }
  avatarSelector = (text) => {
    this.setState({
      avatar: text
    })
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return(
      <div>
        {redirect && redirect !== path? <Redirect to={this.props.redirectTo}></Redirect>: null}
        <NavBar>牛人信息完善</NavBar>
        <AvatarSelector avatarSelector={this.avatarSelector} />
        <InputItem onChange={v=>this.handleChange('title', v)}>求职岗位</InputItem>
        <TextareaItem onChange={v=>this.handleChange('desc', v)} title="个人简介" autoHeight={true} ></TextareaItem>
        <WhiteSpace/>
        <Button type="primary" onClick={()=>{this.props.update(this.state)}} >保存</Button>
      </div>
    )
  }
}
export default GeniusInfo