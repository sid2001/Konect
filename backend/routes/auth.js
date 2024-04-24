const router = require('express').Router();
const {postRegister, postLogIn,getUser,postTokenLogin,postLogOut} = require('../controllers/auth');
const {getTokens,verifyToken} = require('../middlewares/GoogleAuth');
const {userAuth} = require('../middlewares/Auth.js');

router.get('/getUser',getUser);

router.post('/login',postLogIn);

router.post('/register',postRegister);

router.post('/auth/token',getTokens,verifyToken,postTokenLogin);

router.post('/logout',userAuth,postLogOut);

module.exports = router;
