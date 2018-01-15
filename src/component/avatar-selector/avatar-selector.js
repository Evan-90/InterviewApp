import React from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = ['Evan', 'Eline','libai','bixiaorun','xiaomin','react','bixiaorun','react'].map(item =>({
      icon: require(`../../img/${item}.jpg`),
      text: item
    }))
    const gridHeader = this.state.icon?(
      <div>
        <span>已选择图像</span>
        <img style={{width: 20}} src={this.state.icon}/>
      </div>
    ):'请选择图像'
    return(
      <div>
        <List renderHeader={()=>gridHeader} >
          <Grid data={avatarList}
                onClick={ele =>{
                  this.setState(ele)
                  this.props.avatarSelector(ele.text)
                }}
                activeStyle={{background: 'red'}} />
        </List>
      </div>
    )
  }
}
export default AvatarSelector