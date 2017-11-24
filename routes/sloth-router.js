"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const UserModel = require("../models/user-model");

const controller = require('../controllers/sloth-controller');



// Show the User Dashboard 
router.get('/slothboard', controller.dashboard );










module.exports = router;