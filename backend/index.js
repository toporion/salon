const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
require('./config/db') // Assuming this file connects to MongoDB

const port = process.env.PORT ||8080;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
