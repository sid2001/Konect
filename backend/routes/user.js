const router = require('express').Router();
const {auth} = require('../middlewares/Auth');
const {getContacts} = require('../controllers/user');

router.get('/getContacts',getContacts);

module.exports = router;