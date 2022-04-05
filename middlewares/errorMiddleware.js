/**
 * @description express middleware
 * @param  {} err Error
 * @param  {} req request
 * @param  {} res response
 * @param  {} next next callback
 */
const errorMiddleware = (err,req,res,next)=>{
    const statusCode = res.statusCode? res.statusCode : 500
    res.status(statusCode).json({
        'Message' : err.message
    })
    next()
}

module.exports = errorMiddleware