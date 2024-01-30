const router = require('express').Router();
const {postRegister, postLogIn,getUser} = require('../controllers/auth');

router.get('/getUser',getUser);
router.post('/login',postLogIn);
router.post('/register',postRegister);

module.exports = router;
