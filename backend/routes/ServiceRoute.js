
const { addService, getAllServices, deleteService, serviceById, updateServices } = require('../controllers/ServiceController');
const upload = require('../middlewares/fileUpload');
const verifyToken = require('../middlewares/verifyToken');

const router=require('express').Router()

router.post('/addService',verifyToken,upload.single('image'),addService)
router.get('/allServices',getAllServices)
router.delete('/deleteService/:id',verifyToken,deleteService)
router.get('/singleService/:id',verifyToken,serviceById)
router.patch('/updateService/:id',verifyToken,upload.single('image'),updateServices)

module.exports=router;