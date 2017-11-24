"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const UserModel = require("../models/user-model");

const controller = require('../controllers/user-views-controller');



// Step #1: Show the SIGNUP form
router.get('/signup', controller.signup );


// STEP #2: process the sign up form
router.post('/process-signup', controller.process_signup );




// STEP #1: show the LOGIN form
router.get('/', controller.login );



// STEP #2: process the log in form
router.post('/process-login', controller.process_login );




router.get('/slothboard', controller.dashboard );





// Log Out 
router.get('/logout', controller.logout );



module.exports = router;