const asyncHandler = require('express-async-handler')
const urlModel = require('../model/urlModel')
const validUrl = require('valid-url')
/**
 * @description Route that shorten the url in the payload then return the unique shortened url id.
 * @name /api/v1/urls
 * @access public
 * @typedef {object} showRequestBody
 * @property {string} url this is url in request body
 * @property {string} expireAt this is expireAt in request body
 *
 * @typedef {object} showRequestQuery
 * @property {string} url this is url in request body
 * @property {string} expireAt this is expireAt in request body
 * @param {import('express').Request<{}, {}, showRequestBody, showRequestQuery>} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const shortenUrl = asyncHandler(async (req, res) => {
    const { url } = req.body
    const { expireAt } = req.body
    let exp = expireAt
    //date format checking
    if (exp) {
        try {
            exp = new Date(exp)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
    // check if uri is valid
    if (!validUrl.isWebUri(url)) {
        res.status(400)
        throw new Error('Invalid url')
    }
    const isCollision = await urlModel.findOne({ url: url })
    if (isCollision) {
        res.status(200).json(isCollision)
        return
    }
    const shortenedUrl = await urlModel.create({
        url: url,
        expireAt: exp,
    })
    if (!shortenedUrl) {
        res.status(400)
        throw new Error('Failed to create new object')
    }
    res.status(200).json(shortenedUrl)
})
/**
 * @description Route that redirect to target url according to :id
 * @name /:id
 * @param  {} req request
 * @param  {} res response
 * @access public
 */
const redirectById = asyncHandler(async (req, res) => {
    const url_id = req.params.url_id
    const targetUrl = await urlModel.findById(url_id)
    if (!targetUrl) {
        res.status(400)
        throw new Error('Url not found')
    }
    res.status(200).json(targetUrl)
})

/**
 * @description for unit testing, this route should be restricted in the furture.
 * @param  {} req
 * @param  {} res
 * @access private
 */
const clearDb = asyncHandler(async (req, res) => {
    const result = await urlModel.deleteMany({})
    res.status(200).json(result)
})

module.exports = { shortenUrl, redirectById, clearDb }
