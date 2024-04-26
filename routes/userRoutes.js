const router = require('express').Router();
const {Login,Signup,getUser} = require('../controllers/userController');
const {updateContact} = require('../controllers/contactController');
const checkUser = require('../middlewares/auth')

router.post('/login',Login)
router.post('/signup',Signup)
router.get('/getUser',checkUser ,getUser)


module.exports = router;