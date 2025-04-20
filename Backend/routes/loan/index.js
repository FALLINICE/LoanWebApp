const express = require('express');
const router = express.Router();
const {createLoan, updateLoan,getLoanByUserId} = require("../../controllers/loanController");

router.use('/create',createLoan);
router.use('/update',updateLoan);
router.get('/user/:userId', getLoanByUserId); 
module.exports =router;