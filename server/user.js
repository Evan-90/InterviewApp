const express = require('express')
const Router = express.Router()
// 读取所有model
const model = require('./model')
// 获得user的model
const User = model.getModel('user')

Router.get('/list', function (req, res) {
  User.find({}, function (err, data) {
    return res.json(data)
  })
})
Router.post('/register', function (req, res) {
  console.log(req.body)
  let {user, pwd, type} = req.body
  // 检查是否已经存在用户信息
  User.findOne({user}, function (err, data) {
    if(data){
      return res.json({code: 1, msg:'用户名已经存在'})
    }
    // 新建用户信息
    User.create({user, pwd, type}, function (e, d) {
      if(e) {
        return res.json({code: 1, msg: '服务端出错'})
      }
      return res.json({code: 0})
    })
  })
})
Router.get('/info', function (req, res) {
  return res.json({code: 2})
})

module.exports = Router