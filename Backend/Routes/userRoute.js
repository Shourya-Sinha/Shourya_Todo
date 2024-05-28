const { Register, Login, forgotPassword, getAndProtectUser, resetPassword, updateMe, getUserProfile } = require('../Controller/userController');

const router = require('express').Router();

router.post('/register', Register);

router.post('/login',Login);

router.post('/forgotPassword',getAndProtectUser, forgotPassword);

router.post('/resetPassword', getAndProtectUser, resetPassword);

router.post('/update-me',getAndProtectUser,updateMe);

router.get('/getuser-data', getAndProtectUser, getUserProfile);
module.exports = router;