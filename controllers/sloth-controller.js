"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const SlothModel = require("../models/sloth-model");

const mongoose = require("mongoose");


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

		slackEntry
			.save()
			.then(slackEntry => {
				res.json(slackEntry);
			})
	 		.catch(err => {
	 			throw Error(err);
	 		});
	 	
	console.log('It Worked!');

}; // POST /createSlackModel Entry



// exports.createSlothModel = async (req, res ) => {
// 	const slackEntry = new SlothModel(req.body);
// 	await slackEntry.save();
// 	console.log('It Worked!');

// }; // POST /createSlackEntry













/* Template Example 


exports.homepage = (req, res) => {
	
	res.render('index');
};


*/