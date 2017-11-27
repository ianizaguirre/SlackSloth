"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

const SlothModel = require("../models/sloth-model");

const mongoose = require("mongoose");





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
	        encryptedPassword: req.body.slackTeamPassword,
	        user_id: 					 req.user._id
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









exports.fetchEntry = (req, res, next) => {


    if (!req.user) {
        res.redirect("/");

        // (prevents the rest of the code from running)
        return;
    }



	SlothModel
		.find(
			{
				user_id: req.user._id // Finds specific entries belonging to logged in user, 
				// instead of showing "All" entries for ALL users on his dashboard.
			}
		)
		.limit(25)
		.sort({ dateAdded: -1 })
		.exec()
		.then((slackEntryResultsList) => {
			// Setup "slackEntry" RESULTS as a local variable for the EJs file
	    res.locals.slackEntry = slackEntryResultsList;


	    console.log('==========================');
			console.log('It Worked *****FETCH ENTRY******!');
			console.log(slackEntryResultsList);
			console.log('==========================');
			

			// render only after the results have been retrieved
  		res.render('user-views/dashboard');

	})
  .catch((err) => {
      // render the error page with our error
      next(err);
  });


}; // END "GET" --> Fetch Entry






// STEP #1: show edit form
exports.fetchEntryEditOne = (req, res, next) => {
    // retrieve the document from the database
    SlothModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // create a local variable for the view to access the DB result
          // (this is so we can pre-fill the form)
          res.locals.entryDetails = productFromDb;

          res.render('user-views/entry-edit-page');
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
}; // END => fetchEntryEditOne





// STEP #2: receive edit submission
exports.fetchEntryProcessEdit = (req, res, next) => {
    // retrieve the document from the database
    SlothModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // update the document
          productFromDb.set({
       	    slackTeamURL: 		 req.body.slackTeamURL,
		        slackTeamEmail:    req.body.slackTeamEmail,
		        encryptedPassword: req.body.slackTeamPassword
		        //user_id: 					 req.user._id
          });                        
              
                   
          // set up the "entryDetails" local variable in case
          // we get validation errors and need to display the form again
          res.locals.entryDetails = productFromDb;

          // and then save the updates
          // (return the promise of the next database operation)
          return productFromDb.save();
      })
      .then(() => {


          // STEP #3: redirect after a SUCCESSFUL save


          // redirect 
          res.redirect(`/slothboard`);
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {
          // is this a validation error?
          // if it is then display the form with the error messages
          if (err.errors) {
              res.locals.validationErrors = err.errors;
              res.render('user-views/entry-edit-page');
          }
          // if it isn't then render the error page with our error
          else {
              next(err);
          }
      });
}; // END => fetchEntryProcessEdit



























exports.fetchEntryDeleteOne = (req, res, next) => {

	SlothModel.findByIdAndRemove(req.params.prodId)
	  .then((slackEntryResultsList) => {

	      // redirect
	      res.redirect("/slothboard");
	        // you CAN'T redirect to an EJS file
	        // you can ONLY redirect to a URL
	  })
	  .catch((err) => {
	      next(err);
	  });

}; // END "GET" --> Fetch Entry Delete One






/* Template Example 


exports.homepage = (req, res) => {
	
	res.render('index');
};


*/