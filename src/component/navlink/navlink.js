import React from 'react'
import PropTypes from 'prop-types'
import { TabBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component{
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(v => !v.hide)
    const {pathname} = this.props.location
    return(
      <div className="interview">
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
              key={v.path}
              title={v.text}
              icon={<Icon type="check"/>}
              selectedIcon={<Icon type="check-circle"/>}
              selected={pathname === v.path}
              onPress = {() => {
                this.props.history.push(v.path)
              }}
            ></TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
}
export default NavLinkBar