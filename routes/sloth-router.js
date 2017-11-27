"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const SlothModel = require("../models/sloth-model");

const controller = require('../controllers/sloth-controller');





// Step: Process the new Slack Entry Submission 

// Creates a "Slack Entry" 
// When user input data and clicks "save", 
// save their entry onto their dashboard.
router.post('/process-slackInfoForm', controller.createSlothModel );



// ===================================


// Step: Fetch the Slack Entry Forms of the user

// Show the User Dashboard, if they are logged in.
router.get('/slothboard', controller.fetchEntry );




// Edit => Step: #1 => Show Edit Form
// Allow Users to Edit One Entry From "Fetch Entry" via Edit Button
router.get('/entrys/:prodId/edit', controller.fetchEntryEditOne );

// Edit => Step: #2 => Process Edit Form
router.post('/entrys/:prodId/', controller.fetchEntryProcessEdit );




// Delete
// Allow Users to Delete One Entry From "Fetch Entry" via Delete Button
router.get('/entrys/:prodId/delete', controller.fetchEntryDeleteOne );

















module.exports = router;