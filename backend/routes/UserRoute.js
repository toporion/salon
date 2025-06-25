const { registerUser, loginUser, getUserByEmail, getAllUsers, deleteUser, makeRole } = require('../controllers/UserController');
const upload = require('../middlewares/fileUpload');
const verifyRole = require('../middlewares/verifyRole');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();


router.post('/register',upload.single('profilePicture'),registerUser);
router.post('/login',loginUser);
router.get('/user-by-email',getUserByEmail)
router.get('/allUsers',verifyToken,verifyRole('admin'),getAllUsers) 
router.delete('/deleteUser/:id',verifyToken,verifyRole('admin'),deleteUser) 
router.patch('/make-role/:id',verifyToken,verifyRole('admin'),makeRole) 

module.exports = router;