import React from 'react'
import { WingBlank, Card} from 'antd-mobile'
import PropTypes from 'prop-types'
class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  render(){
    return (
      <WingBlank>
        {this.props.userlist.map(v=>(
          v.avatar?<Card key={v.user}>
            <Card.Header
              title={v.user}
              thumb='https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png'
              extra={<span>{v.title}</span>}
            />
            <Card.Body>
              {v.type === 'boss'? <div>公司：{v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div style={{marginTop:5, marginBottom:5}} key={d}>{d}</div>
              ))}
              {v.type === 'boss'? <div>薪资：{v.money}</div>:null}
            </Card.Body>
          </Card>:null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard