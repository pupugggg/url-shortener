const asyncHandler = require('express-async-handler')
const urlModel = require('../model/urlModel')
const validUrl = require('valid-url')
// TODO TTL url validation traffic control
const shortenUrl =asyncHandler(async (req,res)=>{
    const {url} = req.body
    // check if uri is valid
    if(! validUrl.isWebUri(url)){
        res.status(400)
        throw new Error("Invalid url")
        return
    }
    const isCollision = await urlModel.findOne({url:url})
    if(isCollision){
        res.status(200).json(isCollision)
        return
    }
    const shortenedUrl = await urlModel.create({
        url:url
    })
    if(!shortenedUrl){
        res.status(400)
        throw new Error('Failed to create new object')
        return
    }
    res.status(200).json(shortenedUrl)
})
//  TODO
const redirectById =asyncHandler(async (req,res) =>{
    const url_id = req.params.url_id
    const targetUrl = await urlModel.findById(url_id)
    if(!targetUrl){
        res.status(400)
        throw new Error('Url not found')
    }
    res.status(200).json(targetUrl)
})

// for unit testing should be removed in the furture
const clearDb = asyncHandler(async (req,res)=>{
    const result = await urlModel.deleteMany({})
    res.status(200).json(result)
})

module.exports = {shortenUrl,redirectById,clearDb}