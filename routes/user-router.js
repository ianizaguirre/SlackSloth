"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const UserModel = require("../models/user-model");

const controller = require('../controllers/user-views-controller');



// Step #1: Show the sign up form
router.get('/signup', controller.signup );


// STEP #2: process the sign up form
router.post('/process-signup', controller.process_signup );








// STEP #1: show the log in form
router.get("/", (req, res, next) => {
    // redirect to home if you are already logged in
    if (req.user) {
        res.redirect("/");

        // early return to stop the function since there's an error
        // (prevents the rest of the code from running)
        return;
    }

    res.render("user-views/login-page");
});

// STEP #2: process the log in form
router.post("/process-login", (req, res, next) => {
    // find a user document in the database with that email
    UserModel.findOne({ email: req.body.loginEmail })
      .then((userFromDb) => {
          // if we didn't find a user
          if (userFromDb === null) {
              // display the form again because the email is wrong
              res.locals.errorMessage = "Email incorrect.";
              // res.render("user-views/login-page");
              res.redirect("/");

              // early return to stop the function since there's an error
              // (prevents the rest of the code from running)
              return;
          }

          // if email is correct now we check the password
          const isPasswordGood =
            bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);

          if (isPasswordGood === false) {
              res.locals.errorMessage = "Password incorrect.";
              res.render("user-views/login-page");

              // early return to stop the function since there's an error
              // (prevents the rest of the code from running)
              return;
          }

          // CREDENTIALS ARE GOOD! We need log the user in.

          // Passport defines the "req.login()" method
          // for us to specify when to log in a user into the session
          req.login(userFromDb, (err) => {
              // check to see if the log in worked
              if (err) {
                  // if it didn't work show the error page
                  next(err);
              }
              else {
                  // if it worked redirect to the home page
                  res.redirect("/");
              }
          }); // req.login()
      }) // then()
      .catch((err) => {
          next(err);
      });
});








router.get('/logout', controller.logout );
module.exports = router;