const { APPCIRCLE } = require('ci-info')
const express = require('express')
const { append } = require('vary')
require('./db/mongoose')
const User = require('./models/user')
const userRoute = require('./route/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoute)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})