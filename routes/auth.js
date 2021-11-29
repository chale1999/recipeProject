const router = require("express").Router();
const User = require("../models/User");
const bcrpyt = require("bcrypt");


const { register, login, forgotpassword, resetpassword, verifyemail} = require('../controllers/auth');

// Register 
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// forgot password
router.route("/forgotpassword").post(forgotpassword);

// reset password
router.route("/resetpassword/:resetToken").put(resetpassword);

//verify user email
router.route("/emailverify/:verifyToken").put(verifyemail);

module.exports = router;