const express = require('express');
const router = express.Router();
const {create, signIn, isAuthenticated} = require("../../controllers/adminController");

router.use('/create',create);

router.use('/signIn', signIn);

router.use('/isAuth',isAuthenticated);
module.exports =router;