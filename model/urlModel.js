const mongoose = require('mongoose')
/**
 * @description Schema definition
 */
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'please add a url'],
        unique: true,
    },
    expireAt: {
        type: Date,
        default: null,
        expires: 3600*24
    },
})
urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
urlModel = mongoose.model('url', urlSchema)
module.exports = urlModel
