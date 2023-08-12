const router = require("express").Router();
const passport = require("passport");
const User = require('../models/User');

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		// successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	}),
	async (req, res) => {
		// Check if the user exists in the User model
		try {
		  const existingUser = await User.findOne({ email: req.user._json.email });
	
		  if (!existingUser) {
			// User not found, redirect to signup page
            const newUser = new User({
                email: req.user._json.email,
                name: req.user._json.name
                // You can also set other user properties here
              });
      
              await newUser.save();
			
		  }
          return res.redirect(process.env.CLIENT_URL);
		} catch (err) {
		  console.error(err);
		  return res.status(500).json({ error: true, message: "Internal Server Error" });
		}
	  }
);


module.exports = router;
