const { addStaff, getStaffData, updateStaffData, getSingleStaff } = require('../controllers/StaffController')
const upload = require('../middlewares/fileUpload')
const verifyRole = require('../middlewares/verifyRole')
const verifyToken = require('../middlewares/verifyToken')

const router=require('express').Router()

router.post('/staff',verifyToken,upload.single('image'),verifyRole('admin'),addStaff)
router.get('/get-staff',verifyToken, getStaffData)
router.patch('/update-staff/:id',verifyToken,upload.single('image'),updateStaffData)
router.get('/staff/:id', verifyToken, getSingleStaff);



module.exports=router;