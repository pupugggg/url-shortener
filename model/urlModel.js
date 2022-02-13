const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'please add a shortenedUrl'],
      unique: true,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Url', urlSchema)