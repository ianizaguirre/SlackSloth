"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const UserModel = require("../models/user-model");

exports.signup = (req, res) => {
    // redirect to home if you are already logged in
    if (req.user) {
        res.redirect("/");

        // early return to stop the function since there's an error
        // (prevents the rest of the code from running)
        return;
    }
	res.render("user-views/signup-page");
};




exports.process_signup = (req, res, next) => {
	// check if password is invalid
	if (req.body.signupPassword.length < 5 ||
	    req.body.signupPassword.match(/[^a-z0-9]/i) === null
	) {                          //          |
	                             // if no special characters
	    // display the form again if it is
	    res.locals.errorMessage = "Password is invalid.";
	    res.render("user-views/signup-page");

	    // early return to stop the function since there's an error
	    // (prevents the rest of the code from running)
	    return;
	}

	    // query the database to see if the email is taken
    UserModel.findOne({ email: req.body.signupEmail })
      .then((userFromDb) => {
          // "userFromDb" will be null if the email IS NOT taken

          // display the form again if the email is taken
          if (userFromDb !== null) {
              res.locals.errorMessage = "Email is taken.";
              res.render("user-views/signup-page");

              // early return to stop the function since there's an error
              // (prevents the rest of the code from running)
              return;
          }

          // generate a new salt for this user's password
          const salt = bcrypt.genSaltSync(10);

                                     // encrypt the password submitted
                                     // by the user from the form
          const scrambledPassword =  //    |
            bcrypt.hashSync(req.body.signupPassword, salt);

           /* ========== THIS Connects to our Form html in an ejs ======= */
          const theUser = new UserModel({
              fullName: req.body.signupFullName,
              email:    req.body.signupEmail,
              encryptedPassword: scrambledPassword
          });
          /* ======================================================= */

          // return the promise of the next database query
          // to continue the sequence
          return theUser.save();
      })
      .then(() => {
          // redirect to the home page on a successful sign up
          res.redirect("/");
      })
      .catch((err) => {
          next(err);
      });
}; // POST /process-signup





exports.logout = (req, res) => {
	// Passport defines the "req.logout()" method
	// for us to specify when to log out a user (clear them from the session)
	req.logout();

	res.redirect("/");
};




/*


exports.homepage = (req, res) => {
	
	res.render('index');
};



*/