const express = require('express')
const dotenv = require('dotenv').config()
const {connect} = require('mongoose')

// ROUTERS
const contact = require('./routes/contactRoute')
const user = require('./routes/userRoute')

const errorHandler = require('./middlewares/errorHandler')
const connectDb = require('./config/dbConnection')

connectDb()
const app = express()

const port = process.env.PORT || 5000


app.use(express.json())
app.use('/api/v1/contact', contact)
app.use('/api/v1/user', user)
app.use(errorHandler)

app.listen(port, () => {
     console.log(`Server is now running on: localhost:${port}`)
            
})


