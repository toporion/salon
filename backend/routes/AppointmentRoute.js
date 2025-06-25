const { createAppointment } = require('../controllers/AppointmentController')
const verifyToken = require('../middlewares/verifyToken')

const router=require('express').Router()

router.post('/appointment',verifyToken,createAppointment)


module.exports=router;