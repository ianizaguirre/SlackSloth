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





/* 
exports.createSlothModel = (req, res, next) => {
	const slackEntry = new SlothModel(req.body);

		slackEntry
			.save()
			.then(slackEntry => {
				//res.json(slackEntry);
			})
	 		.catch(err => {
	 			throw Error(err);
	 		});
	 	
	console.log('It Worked!');



}; // POST /createSlackModel Entry
*/


exports.createSlothModel = (req, res, next) => {

		// query the database to see if the URL is taken
   SlothModel.findOne({ email: req.body.slackTeamURL })
    .then((userFromDb) => {

	      // generate a new salt for this user's password
	    const salt = bcrypt.genSaltSync(10);

	                               // encrypt the password submitted
	                               // by the user from the form
	    const scrambledPassword =  //    |
	      bcrypt.hashSync(req.body.slackTeamPassword, salt);
		

	       /* ========== THIS Connects to our Form html in an ejs ======= */
	    const slackEntry = new SlothModel({
	        slackTeamURL: 		 req.body.slackTeamURL,
	        slackTeamEmail:    req.body.slackTeamEmail,
	        encryptedPassword: scrambledPassword
	    });
	    /* ======================================================= */



		
			console.log('==========================');
			console.log('It Worked!');
			console.log(slackEntry);
			console.log('==========================');

	    // return the promise of the next database query
	    // to continue the sequence

			return slackEntry.save();
 		 }) // END --> .then((userFromDb)

      .then(() => {
          // redirect after a successful sign up
          res.redirect("/slothboard");
      })
      .catch((err) => {
          next(err);
      });
	 	



}; // POST /createSlackModel Entry







// exports.createSlothModel = async (req, res ) => {
// 	const slackEntry = new SlothModel(req.body);
// 	await slackEntry.save();
// 	console.log('It Worked!');

// }; // POST /createSlackEntry




exports.fetchEntry = (req, res, next) => {

	SlothModel
		.find()
		.limit(25)
		.sort({ dateAdded: -1 })
		.exec()
		.then((slackEntryResultsList) => {
			// Setup above "slackEntry" RESULTS as a local variable for the EJs file
	    res.locals.slackEntry = slackEntryResultsList;
			

			// render only after the results have been retrieved
  		res.render('/slothboard');

	})
  .catch((err) => {
      // render the error page with our error
      next(err);
  });


}; // END "GET" --> Fetch Entry








/* Template Example 


exports.homepage = (req, res) => {
	
	res.render('index');
};


*/