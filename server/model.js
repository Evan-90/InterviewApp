const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/interview'
mongoose.connect(DB_URL)