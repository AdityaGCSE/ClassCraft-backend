const router = require("express").Router();
const passport = require("passport");
const User = require('../models/User');


router.get("/login/success", async (req, res) => {
	if(req.user)
	{
		const existingUser = await User.findOne({ email: req.user._json.email });
		if (existingUser) {
			res.status(200).json({
				error: false,
				message: "Successfully Loged In",
				user: req.user,
			});
		}
		else
		{
			res.status(403).json({ error: true, message: "Not Authorized" });
		}
	}
	 else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

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
	
		  if (existingUser) {
			// User found, redirect to home page
			return res.redirect(process.env.CLIENT_URL);
		  } else {
			// User not found, redirect to signup page
			return res.redirect(`${process.env.CLIENT_URL}/signup`);
		  }
		} catch (err) {
		  console.error(err);
		  return res.status(500).json({ error: true, message: "Internal Server Error" });
		}
	  }
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
