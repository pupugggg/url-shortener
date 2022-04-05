var should = require('should')
const axios = require('axios')
var mlog = require('mocha-logger')
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

describe('urlController.js', () => {
    describe('#shortenUrl()', () => {
        it('should return a json that contains error message about invalid Url.',async ()=>{
            const InvalidUrl = 'wefs'
            const expectedStatus = 400
            const errMsg = "Invalid url"
            let res
            try {
                res = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/urls',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        url: InvalidUrl,
                    },
                })
            } catch (error) {
                error.response.data["Message"].should.equal(errMsg)                
                error.response.status.should.equal(expectedStatus)
            }
        })
    })
})

describe('urlController.js', () => {
    describe('#shortenUrl()', () => {
        it('should return a json that conatains valid url, id and status code as same as the shortened url added before.', async () => {
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
            var {
                data: { url,_id },
                status,
            } = { ...res }
            const firstUrl = url
            const firstId = _id
            const firstStatus = status
            const secondRes = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/v1/urls',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    url: expectedUrl,
                },
            })
            var {
                data: { url,_id },
                status,
            } = { ...secondRes }
            const SecondUrl = url
            const SecondId = _id
            const SecondStatus = status
            SecondUrl.should.equal(firstUrl)
            SecondId.should.equal(SecondId)
            SecondStatus.should.equal(expectedStatus)
        })
    })
})

describe('urlController.js', () => {
    describe('#redirectById()', () => {
        it('should return a json that conatains valid url, id and status code as same as the shortened url added before.', async () => {
            const expectedUrl = 'https://www.google.com.tw/'
            const expectedStatus =  200
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
            var {
                data: { url,_id },
                status,
            } = { ...res }
            const firstId = _id
            const firstStatus = status
            firstStatus.should.equal(200)
            const secondRes = await axios({
                method: 'get',
                url: `http://localhost:5000/${firstId}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            var {
                status
            } = { ...secondRes }
            const SecondStatus = status
            SecondStatus.should.equal(expectedStatus)
        })
    })
})


describe('urlController.js', () => {
    describe('#redirectById()', () => {
        it('should return a json that contains error message about Url not found.',async ()=>{
            const InvalidId = 'wefs'
            const expectedStatus = 400
            const errMsg = "Url not found"
            let res
            try {
                res = await axios({
                    method: 'get',
                    url: `http://localhost:5000/${InvalidId}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch (error) {
                error.response.data["Message"].should.equal(errMsg)                
                error.response.status.should.equal(expectedStatus)
            }
        })
    })
})
