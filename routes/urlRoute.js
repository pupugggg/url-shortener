const express = require('express')
const {shortenUrl,redirectById, clearDb} = require('../controllers/urlController')
const router = express.Router()
/**
 * @param  {string} '/api/v1/urls' express path
 * @param  {callback} shortenUrl express middleware
 */
router.post('/api/v1/urls',shortenUrl)
/**
 * @param  {string} '/:url_id' express path
 * @param  {callback} redirectById express middleware
 */
router.get('/:url_id',redirectById)
/**
 * @param  {} '/' express path
 * @param  {} clearDb redirectById express middleware
 */
router.delete('/',clearDb)
module.exports = router