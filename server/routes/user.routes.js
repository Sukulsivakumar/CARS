const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const {upload, bulkRegister, createUser} = require('../controllers/user.controller')

const router = express.Router();

router.post('/bulkregister',authMiddleware, upload.single('file'), bulkRegister)
router.post('/create',authMiddleware, createUser)
module.exports = router;
