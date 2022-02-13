const asyncHandler = require('express-async-handler')
const urlModel = require('../model/urlModel')

// TODO TTL url validation traffic control
const shortenUrl =asyncHandler(async (req,res)=>{
    const {url} = req.body
    const isCollision = await urlModel.find({url:url})
    if(isCollision){
        res.status(200).json({...isCollision,isCollision:true})
        return
    }
    const shortenedUrl = await urlModel.create({
        url:url
    })
    if(!shortenedUrl){
        res.status(400)
        throw new Error('Failed to create new object')
    }
    res.status(200).json({shortenedUrl})
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

module.exports = {shortenUrl,redirectById}