const express = require('express')
const dotenv = require('dotenv').config()
const {connectDB} = require('./config/db')
const compression = require('compression')
const errorMiddleware = require('./middlewares/errorMiddleware')
connectDB()

const app = express()
app.use(compression())
//allow express middleware parse string or array data then convert it into json data
app.use(express.json())
app.use(express.urlencoded({extended:false}))




app.use('/',require('./routes/urlRoute'))
const PORT = process.env.PORT || 5000

//allow middleware to handle error
app.use(errorMiddleware)
app.listen(PORT,()=>console.log(`server open on PORT ${PORT}`))