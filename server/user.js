const express = require('express')
const utils = require('utility')
const Router = express.Router()

const model = require('./model') // 读取所有model
const User = model.getModel('user') // 获得user的model
const Chat = model.getModel('chat') // 获得chat的model
const _filter = {'pwd': 0}
/** 获取所有用户列表**/
Router.get('/list', function (req, res) {
  const { type } = req.query
  User.find({type}, function (err, data) {
    return res.json({code:0, data})
  })
})
/** 用户登录**/
Router.post('/login', function (req, res) {
  let {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, data) {
    if (err) {
      return res.json({code: 1, msg: '服务器错误'})
    }
    if (!data) {
      return res.json({code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', data._id) // 设置cookie
    return res.json({code: 0, data})
  })
})
/** 用户注册**/
Router.post('/register', function (req, res) {
  let {user, pwd, type} = req.body
  User.findOne({user}, function (err, data) { // 检查是否已经存在用户信息
    if(data){
      return res.json({code: 1, msg:'用户名已经存在'})
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd)})
    userModel.save(function (e, data) {
      if(e) {
        return res.json({code: 1, msg: '服务端出错'})
      }
      const { user, type, _id} = data
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})
/** cookie**/
Router.get('/info', function (req, res) {
  const { userid } = req.cookies
  if(!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, data) {
    if (err){
      return res.json({code: 1, msg: '服务器出错'})
    }
    if(data){
      return res.json({code: 0, data})
    }
  })
})
/** 用户完善信息**/
Router.post('/update', function (req, res) {
  const { userid } = req.cookies
  const body = req.body
  if(!userid) {
    return res.json({code: 1})
  }
  User.findByIdAndUpdate( userid, body, function (err, d) {
    if (err){
      return res.json({code: 1, msg: '服务器出错'})
    }
    if(d){
      const data = Object.assign({},{
        user: d.user,
        type: d.type
      },body)
      return res.json({code: 0, data})
    }
  })
})
/** 聊天模块**/
Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userid
  User.find({}, function (err, doc) {
    if(!err){
      const users = {}
      doc.forEach(v=>{
        users[v._id]= {name: v.user, avatar: v.avatar}
      })
      Chat.find({'$or':[{from: user},{to: user}]}, function (err, doc) {
        if(!err) {
          return res.json({code: 0, msg: doc, users})
        }
      })
    }
  })
})
function md5Pwd(pwd) { // md5加密
  const salt = 'Interview_app@#56430!+=ui-6'
  return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router