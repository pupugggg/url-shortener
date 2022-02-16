var should = require('should')
const axios = require('axios')
// const mongoose =require('mongoose')

beforeEach(async () => {
    await axios({
        method: 'delete',
        url: 'http://localhost:5000/',
    })
})

describe('urlController.js', () => {
	describe('#shortenUrl()', () => {
        it('should return a json that conatains valid url, id and status code.', async () => {
            const expectedUrl = 'https://www.youtube.com/rgerg'
            const expectedStatus = 200
            const res = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/v1/urls',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    url: expectedUrl,
                },
            })
            const {
                data: { url },
                status,
            } = { ...res }
            url.should.equal(expectedUrl)
            status.should.equal(expectedStatus)
        })
    })
})
