const router = require('express').Router();
const {getAllUsers} = require('../controllers/test')

router.get('/getAllUsers',getAllUsers);

module.exports = router;