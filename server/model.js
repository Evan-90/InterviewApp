const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/interview'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    // 个人简介或者职位简介
    'desc': {type: String},
    // 职位名字
    'title': {type: String},
    'company': {type: String},
    'money': {type: String},
  }
}
for(let m in models) {
  mongoose.model (m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}