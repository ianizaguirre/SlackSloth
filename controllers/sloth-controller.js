"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const SlothModel = require("../models/sloth-model");




exports.dashboard = (req, res) => {

    if (!req.user) {
        res.redirect("/");


        // (prevents the rest of the code from running)
        return;
    }

  res.render('user-views/dashboard');
};












exports.createSlothModel = (req, res, next) => {


const slackEntry = new SlothModel(req.body);

slackEntry.save();
 




}; // POST /createSlackEntry

















/* Template Example 


exports.homepage = (req, res) => {
	
	res.render('index');
};


*/