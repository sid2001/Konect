const router = require('express').Router();
const {postRegister, postLogIn,getUser,postTokenLogin} = require('../controllers/auth');
const {getTokens,verifyToken} = require('../middlewares/GoogleAuth');

router.get('/getUser',getUser);
router.post('/login',postLogIn);
router.post('/register',postRegister);
router.post('/auth/token',getTokens,verifyToken,postTokenLogin);

module.exports = router;
