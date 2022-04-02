const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'please add a url'],
      unique: true,
    },
    createdAt: { type: Date, expires: '30d', default: Date.now }
  }
)
module.exports = mongoose.model('Url', urlSchema)
