const express = require('express')
const cors=require('cors')
const app = express()
require('dotenv').config()
require('./config/db') // Assuming this file connects to MongoDB
const UserRoute = require('./routes/UserRoute') // Assuming this file contains user-related routes
const ServiceRoute=require('./routes/ServiceRoute')
const StaffRoute=require('./routes/StaffRoute')
const AppointmentRoute=require('./routes/AppointmentRoute')
const BookingRoute=require('./routes/BookingRoute')
const port = process.env.PORT ||8080;

app.use(cors())
app.use(express.json())

app.use('/api',UserRoute)
app.use('/api',ServiceRoute)
app.use('/api',StaffRoute)
app.use('/api',AppointmentRoute)
app.use('/api',BookingRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
