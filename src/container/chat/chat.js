import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getChatId} from "../../util/util"
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  handleSubmit = () =>{
    // socket.emit('sendMsg', {text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmjio: false
    })
  }
  toggleEmjio = () =>{
    this.setState({
      showEmjio: !this.state.showEmjio
    })
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  render(){
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    const chatMsgs = this.props.chat.chatmsg.filter(v=> v.chatid === getChatId(userid, this.props.user._id))
    const emjio = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 😬 😰 😱 😳 😵 😡 😠 😷 🤒 🤕 🤢 🤧 😇 🤠 🤡 🤥 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙊 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐚 🐞 🐜 🕷 🕸 🐢 🐍 🦎 🦂 🦀 🦑 🐙 🦐 🐠 🐟 🐡 🐬 🦈 🐳 🐋 🐊 🐆 🐅 🐃 🐂 🐄 🦌 🐪 🐫 🐘 🦏 🦍 🐎 🐖 🐐 🐏 🐑 🐕 🐩 🐈 🐓 🦃 🕊 🐇 🐁 🐀 🐿 🐾 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌻 🌼 🌸 🌺 🌎 🌍 🌏 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌚 🌝 🌞 🌛 🌜 🌙 💫 ⭐️ 🌟 ✨ ⚡️ 🔥 💥 ☄️ ☀️ 🌤 ⛅️ 🌥 🌦 🌈 ☁️ 🌧 ⛈ 🌩 🌨 '.split(' ').filter(v=> v).map(v=>({text: v }))
    return (
      <div id="chat-page">
        {
          users[userid]? (
            <NavBar
              mode="dark"
              icon={<Icon type="left"/>}
              onLeftClick={()=>{
                this.props.history.goBack()
              }}
            >
              {users[userid].name}
            </NavBar>
          ):null
        }
        {chatMsgs.map(v =>{
          const avatar = require(`../../img/${users[v.from].avatar}.jpg`)
          return v.from == userid?(
            <List key={ v._id } >
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ):(
            <List key={ v._id } >
              <Item extra={<img src={avatar} alt="" />} className="chat-me">{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入信息"
              value={this.state.text}
              onChange={v=>this.setState({text:v})}
              extra={
                <div>
                  <span
                    style={{marginRight:15}}
                    onClick={this.toggleEmjio}
                  >😀</span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            >信息</InputItem>
          </List>
          {
            this.state.showEmjio? (<Grid
            data={emjio}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el=>{
              this.setState({
                text: this.state.text + el.text
              })
            }}
          />):null
          }

        </div>
      </div>

    )
  }
}
export default Chat