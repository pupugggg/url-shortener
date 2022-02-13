const express = require('express')
const {shortenUrl,redirectById} = require('../controllers/urlController')
const router = express.Router()

router.post('/api/v1/urls',shortenUrl)
router.get('/:url_id',redirectById)

module.exports = router