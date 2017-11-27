"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const SlothModel = require("../models/sloth-model");

const controller = require('../controllers/sloth-controller');




// Step #1: Show the Slack Entry Form

// Show the User Dashboard, if they are logged in.
router.get('/slothboard', controller.fetchEntry );



// Step #2: Process the new Slack Entry Submission 

// Creates a "Slack Entry" 
// When user input data and clicks "save", 
// save their entry onto their dashboard.
router.post('/process-slackInfoForm', controller.createSlothModel );






























module.exports = router;