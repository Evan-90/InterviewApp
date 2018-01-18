import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import { WingBlank, WhiteSpace, Card} from 'antd-mobile'

@connect(state=>state.chatuser, {getUserList})
class Boss extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    const list = this.props.userlist
    console.log(list)
    return (
      <WingBlank>
        {list.map(v=>(
          v.avatar?<Card key={v.user}>
            <Card.Header
              title={v.user}
              thumb='https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png'
              extra={<span>{v.title}</span>}
            />
            <Card.Body>
              {v.desc.split('\n').map(v=>(
                <div style={{marginTop:5, marginBottom:5}} key={v}>{v}</div>
              ))}
            </Card.Body>
          </Card>:null
        ))}
      </WingBlank>
    )
  }
}
export default Boss